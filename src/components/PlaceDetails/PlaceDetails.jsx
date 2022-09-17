import React from 'react'
import { Typography, Box, Button, Card, CardMedia, CardContent, CardActions, Chip } from '@material-ui/core';
import LocationOnIcon from '@material-ui/icons/LocationOn'
import PhoneIcon from '@material-ui/icons/Phone'
import { Rating } from '@material-ui/lab';

import useStyles from './styles';

const PlaceDetails = ({place,selected,refProp}) => {
  const classes = useStyles();

  if(selected) refProp?.current?.scrollIntoView({ behavior:'smooth', block: 'start'})

  return (
    <Card elevation={6} ref={refProp}>
      <CardMedia
        style={{height:350}}
        image={place.photo? place.photo.images.large.url :  'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'}
        title={place.name} 
      />
      <CardContent>
        <Typography gutterBottom variant='h5'>{place.name}</Typography>
          <Box display="flex" justifyContent="space-between" my={2}>
            <Rating name="read-only" value={Number(place.rating)} readOnly />
            <Typography component="legend">{place.num_reviews} review{place.num_reviews > 1 && 's'}</Typography>
          </Box>

        {place?.cuisine?.map(({name}) => (
            <Chip  key={name} size='small' label={name} className={classes.chip}/>
        ))}
        {place?.address && (
          <Typography gutterBottom variant='subtitle2' color='textSecondary' className={classes.subtitle}>
              <LocationOnIcon /> {place.address}
          </Typography>
        )}
        {place?.phone && (
          <Typography gutterBottom variant='subtitle2' color='textSecondary' className={classes.spacing}>
              <PhoneIcon /> {place.phone}
          </Typography>
        )}
        <CardActions>
          <Button size='small' color='primary' onClick={() => window.open(place.web_url, '_blank')}>
              Trip Advisor
          </Button>
          <Button size='small' color='primary' onClick={() => window.open(place.website, '_blank')}>
              Website
          </Button>
        </CardActions>
      </CardContent>

    </Card>
  )
}

export default PlaceDetails