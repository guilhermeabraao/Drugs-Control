import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function DrugCards({ drug }) {
    return (
        <Card sx={{ width: 210, cursor: 'pointer', "&:hover": { opacity: 0.9, scale: '1.02' } }} key={drug.id}>
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
                <Button size="small">Edit</Button>
            </CardActions>
        </Card >

    );
}