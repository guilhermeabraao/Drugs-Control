import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import DrugFormModal from './drugFormModal';

export default function DrugCards({ drug }) {


    return (
        <Card sx={{ width: 210, cursor: 'pointer', "&:hover": { scale: '1.02' } }} key={drug.id}>
            <CardMedia
                sx={{ height: 170 }}
                image={drug.image}
                title={drug.image}
            />
            <CardContent sx={{ padding: '8px 16px' }}>
                <Typography gutterBottom variant="h6" component="div">
                    {drug.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Price: {drug.price}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Expiration Date: {drug.expiration_date.replaceAll('-', '/')}
                </Typography>
            </CardContent>
            <CardActions>
                <DrugFormModal mode={'edit'} drug={drug} >Edit</DrugFormModal>
            </CardActions>
        </Card >

    );
}