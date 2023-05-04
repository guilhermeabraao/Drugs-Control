import * as React from 'react';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';

export default function DrugInfosForm({ drugForm, setDrugForm }) {

    async function handleChange(event) {
        if (event.target.id === 'name') {
            const name = event.target.value ? event.target.value : ''
            setDrugForm({ ...drugForm, name })
        }
        if (event.target.id === 'price') {
            const price = event.target.value ? parseFloat(event.target.value.replace(',', '.')) : ''
            setDrugForm({ ...drugForm, price })
        }
    }

    async function handleDate(date) {
        const newDate = new dayjs(date).format('YYYY-MM-DD')
        setDrugForm({ ...drugForm, expiration_date: newDate })
    }

    const style = {
        display: 'flex',
        flexDirection: 'column',
        gap: '32px'
    }

    return (
        <div style={style}>
            <FormControl >
                <InputLabel htmlFor="name">Name</InputLabel>
                <OutlinedInput
                    id="name"
                    startAdornment=' '
                    label='Name'
                    type='text'
                    inputProps={{
                        pattern: "[a-z]"
                    }}
                    value={drugForm.name}
                    onChange={(event) => handleChange(event)}
                />
            </FormControl>
            <FormControl >
                <InputLabel htmlFor="price">Price</InputLabel>
                <OutlinedInput
                    id="price"
                    startAdornment={<InputAdornment position="start">$</InputAdornment>}
                    label="Price"
                    type='number'
                    value={drugForm.price}
                    onChange={(event) => handleChange(event)}
                />
            </FormControl>

            <DatePicker
                id='expirationDate'
                dateFormat="dd/MM/yyyy"
                label='Expiration date'
                onChange={(date) => handleDate(date)}
            />
        </div>
    )
}