import React, { useEffect, useState } from 'react'
import { Card,CardMedia,Typography,Button } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { updatecart,getcart,delcartitem } from '../Redux/action'


const CartCard = (data) => {
  const [count,setCont] = useState(0);
  const [inc,setInc] = useState(false)
  const [dec,setDec] = useState(false)
  const user = useSelector(store=>store.userData);
  const dispatch = useDispatch();
  useEffect(()=>{
    if(data.count <= 1){
      setDec(true)
    }
    else{
      setDec(false)
    }
  })

  useEffect(()=>{
    let payload = {email:user}
    dispatch(getcart(payload))
  },[])
  
  return (
    <Card sx={{width:"100%",margin:"20px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <CardMedia
            component="img"
            alt="green iguana"
            image={data.image}
            sx={{width:"120px",padding:'20px'}}
        />
        <Typography sx={{flexGrow:1}} gutterBottom variant="h5" component="h2">
            {data.title.substr(0,25)}...<br/>
            {data.price + "$"} X {data.count}<br/>
            {data.price*data.count}$
        </Typography>
        <Typography sx={{flexGrow:1}} gutterBottom variant="h5" component="h2">
            <Button variant="outlined" disabled={dec} onClick={e=>{
              setCont(1)
              let payload = {id:data.id,count:data.count-1,email:user}
              dispatch(updatecart(payload))
            }} size='large'>-</Button> {data.count} <Button disabled={inc} variant="outlined" onClick={e=>{
              setCont(0)
              let payload = {id:data.id,count:data.count+1,email:user}
              dispatch(updatecart(payload))
              
            }} size='medium'>+</Button>
        </Typography>
        <Button sx={{margin:'10px'}} onClick={()=>{
          let payload = {email:user,id:data.id}
          dispatch(delcartitem(payload))
        }}  variant='contained' size='large'>Remove</Button>
    </Card>
  )
}

export default CartCard