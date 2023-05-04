from fastapi import FastAPI, Response, status, Form, UploadFile, File, Body, Request
from fastapi.encoders import jsonable_encoder
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import create_engine, Column, Integer, String, Float, Date
from sqlalchemy.orm import sessionmaker, declarative_base
from boto3.session import Session
from botocore.exceptions import ClientError
from botocore.config import Config
from pydantic import BaseModel
from typing import List, Annotated, Optional, Union
import os
from dotenv import load_dotenv, find_dotenv
load_dotenv(find_dotenv())

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base = declarative_base()

class Drug(Base):
    __tablename__ = "drugs"
    id = Column(Integer, primary_key=True)
    name = Column(String(50))
    price = Column(Float)
    expiration_date = Column(Date)
    image = Column(String(100))

    def __repr__(self):
        return f"Drug(id={self.id}, name='{self.name}', price={self.price}, expiration_date='{self.expiration_date}', image='{self.image}')"

class DrugModel(BaseModel):
    name: str
    price: float
    expiration_date: str
    image: str

class DrugRequest(BaseModel):
    id: Optional[int]
    name: Optional[str]
    price: Optional[float]
    expiration_date: Optional[str]
    image: Optional[str]

class DrugResponse(BaseModel):
    id: int
    name: str
    price: float
    expiration_date: str
    image: str

class DrugSearchResponse(BaseModel):
    results: List[DrugResponse]

DATABASE_URL = os.getenv('DB')
BUCKET = os.getenv('BUCKET')
ENDPOINT_URL = os.getenv('ENDPOINT')
S3_ACCESS_KEY_ID = os.getenv('KEY_ID')
S3_SECRET_ACCESS_KEY = os.getenv('APPLICATION_KEY')
LOCAL_DIR = os.getenv('LOCAL_DIR')

engine = create_engine(DATABASE_URL, echo=True)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def get_session():
    session = SessionLocal()
    try:
        yield session
    finally:
        session.close()

session = Session()
s3 = session.resource(service_name='s3', endpoint_url=f'https://{ENDPOINT_URL}', aws_access_key_id=S3_ACCESS_KEY_ID, aws_secret_access_key=S3_SECRET_ACCESS_KEY, config=Config(signature_version='s3v4'))

@app.post('/drugs', status_code=status.HTTP_201_CREATED)
def create_drug(name:Annotated[str, Form()], price:Annotated[float, Form()], expiration_date:Annotated[str, Form()], image:Annotated[UploadFile, File()], response: Response):
    
    try:
        if not (name and price and expiration_date and image):
            response.status_code=status.HTTP_400_BAD_REQUEST
            return {'error': 'all fields required!'}
        drug_model = DrugModel(name=name, price=price, expiration_date=expiration_date, image='')
        session = SessionLocal()
        drug_exist = session.query(Drug).filter(Drug.name == drug_model.name).first()
        if drug_exist:
            response.status_code=status.HTTP_400_BAD_REQUEST
            return {'message': 'Drug already registered'}
        image_filename = f'{drug_model.name.replace(" ", "_")}_{image.filename}'
        image_binary = image.file.read()
        s3.Bucket(BUCKET).put_object(Key=image_filename, Body=image_binary, ContentType=image.content_type)
        drug_model.image = f'https://{BUCKET}.{ENDPOINT_URL}/{image_filename}'
        drug = Drug(**drug_model.dict())
        session.add(drug)
        session.commit()
        return
    except ClientError as e:
        response.status_code=status.HTTP_400_BAD_REQUEST
        return {'error': str(e)}

@app.get('/drugs')
def get_drugs(response: Response):
    try:
        session = SessionLocal()
        drugs = session.query(Drug).all()
        drug_responses = []
        for drug in drugs:
            drug_response = DrugResponse(id=drug.id, name=drug.name, price=drug.price, expiration_date=drug.expiration_date.strftime('%d-%m-%Y'), image=drug.image)
            drug_responses.append(drug_response)
        return DrugSearchResponse(results=drug_responses)
        
    except ClientError as e:
        response.status_code=status.HTTP_400_BAD_REQUEST
        return {'error': str(e)}

@app.put('/drugs', status_code=status.HTTP_200_OK)
async def edit_drug(request: Request,response: Response,image: Annotated[UploadFile, File()]=''):
    try:
        form_data = await request.form()
        form_data = jsonable_encoder(form_data)
        drug_id = form_data['id'] if 'id' in form_data else False
        if not drug_id:
            response.status_code=status.HTTP_400_BAD_REQUEST
            return {'error':'drug id required'}

        session = SessionLocal()
        drug = session.query(Drug).get(drug_id)
        if not drug:
            response.status_code=status.HTTP_404_NOT_FOUND
            return {'error':'drug not found'}
        if 'name' in form_data:
            drug.name = form_data['name']
        if 'price' in form_data:
            drug.price = form_data['price']
        if 'expiration_date' in form_data:
            drug.expiration_date = form_data['expiration_date']
        if 'image' in form_data:
            image_filename = f'{drug.name.replace(" ", "_") if drug.name else image.filename}'
            s3.Bucket(BUCKET).upload_file(LOCAL_DIR+'/'+image.filename, image_filename, ExtraArgs={'ContentType':image.content_type})
            drug.image = f'https://{BUCKET}.{ENDPOINT_URL}/{image_filename}'
        
        session.add(drug)
        session.commit()
        return {'message':'Drug updated'}

    except ClientError as e:
        response.status_code=status.HTTP_400_BAD_REQUEST
        return {'error': str(e)}
    
@app.get('/drugs/{name}', status_code=status.HTTP_200_OK)
def search_drugs(response: Response, name:str ):
    try:
        session = SessionLocal()
        drugs = session.query(Drug).filter(Drug.name.like(f'%{name}%')).all()
        results = []

        for drug in drugs:
            data = {
                'id': drug.id,
                'name': drug.name,
                'price': float(drug.price), 
                'expiration_date': drug.expiration_date.strftime('%d-%m-%Y'),
                'image': drug.image
            }

            results.append(data)
        return DrugSearchResponse(results=results)
    except ClientError as e:
        response.status_code=status.HTTP_400_BAD_REQUEST
        return {'error': str(e)}