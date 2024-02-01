import React,{useEffect,useState} from 'react'
import { getcart } from '../../Redux/action'
import { useDispatch, useSelector } from 'react-redux'
import CartCard from '../../Components/CartCard';
import Card  from '@mui/material/Card';

const Cart = () => {
  const user = useSelector(store=>store.userData);
  const [total,setTotal] = useState(0)
  const dispatch = useDispatch();
  const cart = useSelector(store=>store.cart);
  useEffect(()=>{
    let payload = {email:user}
    dispatch(getcart(payload))
  },[cart])

  useEffect(()=>{
    let tot=0;
    cart.map(item=>{
      tot+=(item.count * item.price)
    })
    setTotal(tot)
  },[cart])

  if(cart.length == 0 ){
    return (
      <div style={{height:"80%",display:"flex",justifyContent:"center",alignItems:"center"}}>
        <h1>No Data Available!</h1>
      </div>
    )
  }
  else{
  return (
    <>
    <div style={{display:"grid",gridTemplateColumns:"5fr 2fr"}}>
      <div style={{margin:"20px"}}>
        {
          cart.map(item=>(
            <div key={item.id}>
              <CartCard  {...item} />
            </div>        
          ))
        }
      </div>
      <div style={{height:"450px",margin:"20px",border:"1px solid lightgrey"}}>
        <h1 style={{textDecoration:"underline",color:"crimson",textAlign:"left",padding:"20px"}} >Order Summary</h1>
        <Card>
          <div style={{display:"flex",padding:"0px 20px",justifyContent:"space-between"}}>
            <p style={{color:"grey"}}>Sub Total</p>
            <h3>{total}$</h3>
          </div>
        </Card>
        <Card>
          <div style={{display:"flex",padding:"0px 20px",justifyContent:"space-between"}}>
            <p style={{color:"grey"}}>Shipping</p>
            <h3>Free</h3>
          </div>
        </Card>
        <br/>
        <Card>
          <div style={{display:"flex",padding:"0px 20px",justifyContent:"space-between"}}>
            <h3 style={{color:"red"}}>Shipping</h3>
            <h3 style={{color:"red"}}>{total}$</h3>
          </div>
        </Card>
      </div>

    </div>
    
    </>
  )}
}

export default Cart