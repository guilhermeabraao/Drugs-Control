import Button from '@mui/material/Button';
import { useFormData } from 'import/contexts/formContext';
import Image from 'next/image';
import { ChangeEvent, useEffect, useState } from 'react';


export default function DrugImageForm({ drugForm, setDrugForm }) {

    const [preview, setPreview] = useState(null);

    const style = {
        display: 'flex',
        flexDirection: 'column',
        gap: '32px',
        alignItems: 'center'
    }

    useEffect(() => {
        if (drugForm.image !== '') {
            drugForm.image = '';
        }
    }, [])


    const handleFileChange = (e) => {
        setPreview(URL.createObjectURL(e.target.files[0]))
        setDrugForm({ ...drugForm, image: e.target.files[0] });
    };

    return (
        <div style={style}>
            <Button variant="contained" component="label">
                Upload
                <input hidden accept="image/*" type="file" onChange={handleFileChange} />
            </Button>
            {preview && <Image src={preview} alt='preview' width={150} height={150} />}
        </div>
    )
}