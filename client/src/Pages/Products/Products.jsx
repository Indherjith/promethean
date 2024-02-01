import React,{useEffect} from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import * as types from "../../Redux/actionType"
import {getcart,addcart} from "../../Redux/action"
import { useDispatch, useSelector } from 'react-redux'

const defaultTheme = createTheme();

const Products = () => {

  const dispatch = useDispatch();
  const user = useSelector(store=>store.userData)

  useEffect(()=>{
    dispatch({type:types.GET_DATA_REQUEST})
    fetch('https://fakestoreapi.com/products')
      .then(res=>res.json())
      .then(json=>{
        dispatch({type:types.GET_DATA_SUCCESS,payload:json})
      })
      .catch(err=>{
        dispatch({type:types.GET_DATA_FAILURE})
      })    
  },[])

  useEffect(()=>{
    let payload = {email:user}
    dispatch(getcart(payload))
  },[])

  const products = useSelector(store=>store.products);
  

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <main>
        <Container sx={{ py: 8 }} maxWidth="md">
          <Grid container spacing={4}>
            {products.map((card) => (
              <Grid item key={card.id} xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <CardMedia
                    component="div"
                    sx={{
                      // 16:9
                      pt: '80%',
                      margin:'10px'
                    }}
                    image={card.image}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {card.title.substr(0,10)+"..."}
                    </Typography>
                    <Typography gutterBottom variant="h5" component="h2">
                      {card.price+"$"}
                    </Typography>
                    <Typography>
                      {card.description.substr(0,50)+"..."}
                    </Typography>
                  </CardContent>
                  <CardActions sx={{display:'flex',justifyContent:'space-around'}}>
                    <Button variant="outlined" size="medium">Buy Now</Button>
                    <Button variant="outlined" size="medium" onClick={()=>{
                      let payload = {email:user,product:card}
                      dispatch(addcart(payload))
                    }} > + Cart</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
    </ThemeProvider>
  )
}

export default Products