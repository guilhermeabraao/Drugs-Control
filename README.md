# Drugs-Control

## install dependencies

In the backend folder will contain a file called requirements.txt where all the python dependencies are found. 
To install, open a terminal in backend folder and run the code for each dependency

>pip install <dependency>

To frontend dependencies you just need to open a terminal in frontend folder and run the code

>npm install

Database folder contain the file "dump.sql" to create your database the will be used in application.

In both backend and frontend folders contain a .env_example.
You need to create a .env in both folders and fill with necessary informations.

## Running the application

With all dependencies installed, you'll be able to run the application.
In backend terminal, run the code

>python -m uvicorn main:app --reload

and in frontend terminal, run the code

>npm run dev

and access the application b

## Dashboard

This is the dashboard where will be displayed all drugs registered in your database.

![dashboard](https://user-images.githubusercontent.com/112726349/236302914-8e5da69e-1b0a-4c46-a01f-755c096ee2e4.png)

## Register drug

In header is located a button to register a new drug.

![register button](https://user-images.githubusercontent.com/112726349/236303214-f388a46f-92af-4bfa-99a8-d47b5cc20e29.png)

The first step is inform the Drug name*, price and expiration date.

![first step](https://user-images.githubusercontent.com/112726349/236312273-96e12070-a163-47a1-b283-5dc8844b37ab.png)

 **Drug name can't be the same of a drug registered already*
 
 Second step is to select the image file you want to upload*
 
 ![second step](https://user-images.githubusercontent.com/112726349/236313415-e9168bd0-cde2-4ddc-89d4-3ff56dd30e03.png)
 
 **the image need to be in the folder specified at .env*

After image selected, a preview will appear

![image preview](https://user-images.githubusercontent.com/112726349/236326162-bd8ac143-a128-44c7-a2a6-675a8615ce48.png)

After a quick loading, if everything ok, a success message will appear.

![success](https://user-images.githubusercontent.com/112726349/236326597-9e51a79f-80ae-4f33-91fb-e626eef9010b.png)

## Edit drug

To edit a drug, just click in **edit** button at bottom of drug card.

![edit button](https://user-images.githubusercontent.com/112726349/236327218-02c0d955-19ae-4bdd-89c6-1ce08055370c.png)

The same form as register will shows

![edit form](https://user-images.githubusercontent.com/112726349/236327517-c9029dd1-eef3-4307-8fd1-eea889457b08.png)

You can change all information, even the image, but its not necessary to change everything.

![edit form](https://user-images.githubusercontent.com/112726349/236328085-72ca9bfd-6492-4855-b382-dbf6af7133c1.png)

After a quick loading, if everything ok, a success message will appear.

![success](https://user-images.githubusercontent.com/112726349/236326597-9e51a79f-80ae-4f33-91fb-e626eef9010b.png)

## Docker Compose

The application contains a Dockerfile and Docker Compose for each side.


 
 
