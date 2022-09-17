import React from 'react';
import GoogleMapReact from 'google-map-react';
import { Paper, Typography, useMediaQuery } from '@material-ui/core';
import { LocationOnOutlined } from '@material-ui/icons';
import { Rating } from '@material-ui/lab';

import useStyles from './styles';
import mapStyles from './mapStyles';

const Map = ({setCoordinates, setBounds, coordinates, places,setchildClicked,weatherData}) => {
    const classes = useStyles();
    const isMobile = useMediaQuery('(min-width:600px)');

    return (
        <div className={classes.mapContainer}>
            <GoogleMapReact
            bootstrapURLKeys={{key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY}}
            defaultCenter ={coordinates}
            center={coordinates}
            defaultZoom={14}
            margin={[50,50,50,50]}
            options={{disableDefaultUI:true, zoomControl:true , styles: mapStyles}}
            onChange={(e) => {
                setCoordinates({lat: e.center.lat , lng: e.center.lng});
                setBounds({ne: e.marginBounds.ne , sw: e.marginBounds.sw});
            }}
            onChildClick={(child) => setchildClicked(child)}
            >
                {places?.map((place,i) => (
                    <div className={classes.markerContainer} 
                    lat={Number(place.latitude)}
                    lng={Number(place.longitude)}
                    key={i}
                    >
                        {!isMobile ? (
                                <LocationOnOutlined color='primary' fontSize='large' />
                            ) : (
                                <Paper elevation={3} className={classes.paper} hoverable>
                                    <Typography className={classes.typography} variant='subtitle2' gutterBottom>
                                        {place.name}
                                    </Typography>
                                    <img
                                    className={classes.pointer}
                                    src={place.photo ? place.photo.images.large.url : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'}
                                    alt={place.name}
                                    />
                                    <Rating name="read-only" size="small" value={Number(place.rating)} readOnly />
                                </Paper>
                            )
                        }
                    </div>
                ))}
                
                {weatherData?.list?.map((data,i) => (
                    <div key={i} lat={data.coord.lat} lng={data.coord.lon}>
                        <img src={`https://www.weatherbit.io/img/${data?.weather?.icon}.png `} alt={data.weather.description} height='70px'/>
                    </div>
                ))}
            </GoogleMapReact>
        </div>
    );
}

export default Map;