import React, { useState, useEffect } from "react";
import './style2.css';
import {productlist} from "./products";
const Shop = ({history}) => {
  const [cart, setCart] = useState([]);
  const[mycart,setMyCart]=useState([]);
 
useEffect(()=>{
  
    window.scrollTo(0, 0);
  
let list=[];
let index=-1;
  let mycartlist=JSON.parse(localStorage.getItem('mycartlist'))
  if(mycartlist && mycartlist.length>=0){
     index = mycartlist.findIndex(cart => cart.email ===localStorage.getItem('email') );
  }
  if(index>-1){
    list=mycartlist[index].products
  }
    
  setMyCart(list)
 
},[])
  const addToCart = (item) => {
   
      setMyCart([...mycart, item]);
      let mycartlist=JSON.parse(localStorage.getItem('mycartlist'))
      if(mycartlist && mycartlist.length>=0){
        let index = mycartlist.findIndex(cart => cart.email ===localStorage.getItem('email') );
       if(index>-1){
         
            let list=mycartlist[index]
            
            let array=list.products
            mycartlist.splice(index, 1);
           
            array.push(item)
            list['products']=array
            mycartlist.push(list)
       }
       else{
        let products=[]
        products.push(item)
        let list={email:localStorage.getItem('email'),products:products}
        
        mycartlist.push(list)
       }
      }
        else{
          mycartlist=[]
          let products=[]
          products.push(item)
          let list={email:localStorage.getItem('email'),products:products}
        
          mycartlist.push(list)
        
       }
   
    localStorage.setItem('mycartlist',JSON.stringify(mycartlist))
     
  };

 
    const removeFromCart = (item) => {
      setMyCart((currentCart) => {
        const indexOfItemToRemove = currentCart.findIndex((cartItem) => cartItem.pid === item.pid);
  
        if (indexOfItemToRemove === -1) {
          return currentCart;
        }
  
        return [
          ...currentCart.slice(0, indexOfItemToRemove),
          ...currentCart.slice(indexOfItemToRemove + 1),
        ];
      });


      let mycartlist=JSON.parse(localStorage.getItem('mycartlist'))
      if(mycartlist && mycartlist.length>=0){
        let index = mycartlist.findIndex(cart => cart.email ===localStorage.getItem('email') );
       if(index>-1){
         
            let list=mycartlist[index]
            
            let array=list.products
            mycartlist.splice(index, 1);
           let removedindex=array.findIndex(removeditem=>removeditem.pid==item.pid)
            array.splice(removedindex,1)
          
            list['products']=array
            mycartlist.push(list)
       }
       
      }
        
     
    localStorage.setItem('mycartlist',JSON.stringify(mycartlist))






  
    };
    const logout=()=>{
     
      
      localStorage.setItem('email','')

      history.push('./')
     
  }

  

  return(
    <div>
      <h1 className="cart-heading">Cart list</h1>
      <div className="logout-button">
      <button  onClick={logout}>Logout</button>
      </div>
    <div class="listing-section">
  
 {productlist.map((product)=>{
   return(
    <div class="product">
      <div class="image-box">
        <img class="images" src={product.img}></img>
      </div>
      <div class="text-box">
        <h2 class="item">{product.item}</h2>
        <h3 class="price">{product.prize}</h3>
        
       
        <button type="button" name="item-1-button" id="item-1-button" onClick={()=>addToCart(product)}>Add To Cart</button>
      </div>
         
 
    </div>
    
   )
 
 })
} 
  </div> 
  
    
  {mycart!=''?(
  <div class="listing-section">
    <h4 className="cart-heading">My Cart</h4><br/>
 {mycart.map((product)=>{
   return(
    <div class="product">
      <div class="image-box">
       
        <img class="images" src={product.img}></img>
      </div>
      <div class="text-box">
        <h2 class="item">{product.item}</h2>
        <h3 class="price">{product.prize}</h3>
        
       
        <button type="button" name="item-1-button" id="item-1-button" onClick={()=>removeFromCart(product)}>Remove From Cart</button>
      </div>
         
 
    </div>
    
   )
 
 })
}
  </div>
  ):null}
  </div>
  )
};

export default Shop;