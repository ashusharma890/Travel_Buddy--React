import React,{useEffect,useState} from 'react';
import { CssBaseline, Grid } from '@material-ui/core';

import Header from './components/Header/Header';
import List from './components/List/List';
import Map from './components/Map/Map';
import { getPlacesData, getWeatherData } from './api';

const App = () => {
  const [places,setPlaces] = useState([]);
  const [weatherData,setWeatherData] = useState([]);
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [childClicked, setchildClicked] = useState(null);
  const [coordinates, setCoordinates] = useState({});
  const [bounds, setBounds] = useState({});
  const [isLoading, setisLoading] = useState(false);
  const [type, setType] = useState('restaurants');
  const [rating, setRating] = useState('');

  useEffect(() =>{
    navigator.geolocation.getCurrentPosition(({coords: {latitude,longitude}}) => {
      setCoordinates({lat:latitude, lng:longitude})
    })
  },[]);

  useEffect(() => {
    const filteredPlaces = places.filter((place) => place.rating > rating);

    setFilteredPlaces(filteredPlaces);
  },[rating])

  useEffect(() => {
    if(bounds.sw && bounds.ne){
    setisLoading(true);
    
    getWeatherData(coordinates.lat,coordinates.lng)
      .then((data) => setWeatherData(data));


    getPlacesData(type,bounds?.sw, bounds?.ne)
    .then((data) => {
      setPlaces(data?.filter((place) => place?.name && place?.num_reviews > 0));
      setFilteredPlaces([]);
      setisLoading(false);
    })
  }
  },[type,bounds]);


  return (
    <>
    <CssBaseline />
    <Header  setCoordinates={setCoordinates} />
    <Grid container spacing={3} style={{width:'100%'}}>
        <Grid item xs={12} md={4}>
            <List 
            places={filteredPlaces.length ? filteredPlaces :places} 
            childClicked={childClicked}
            isLoading={isLoading}
            type={type}
            setType={setType}
            rating={rating}
            setRating={setRating}
            />
        </Grid>
        <Grid item xs={12} md={8}>
            <Map 
              setCoordinates ={setCoordinates}
              setBounds={setBounds}
              coordinates={coordinates}
              places={filteredPlaces.length ? filteredPlaces :places}
              setchildClicked={setchildClicked}
              weatherData={weatherData}
            />
        </Grid>
    </Grid>
    </>
  ) 
}

export default App