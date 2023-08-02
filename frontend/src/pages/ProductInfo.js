import React from 'react'
import { FaShoppingCart } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { add, remove } from '../redux/slices/cartSlice';
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';


const ProductInfo = () => {
  const { product ,cart,loggedIn,userInfo} = useSelector((state) => state);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const removeFromCart = async(data) => {
    dispatch(remove(data.id));
    toast.error("Item Removed From Cart");
    console.log(userInfo);
    if (loggedIn) {
        try {
            let res = await fetch(`${process.env.REACT_APP_API_URL}/updateAccount/${userInfo.email}`,{
              method: "PUT",
              headers:{
                  "Content-Type":"application/json",
              },
              body: JSON.stringify({cart:cart}),
            });
          } catch (err) {
            console.log(err);
            toast.error(err);
          }
    }
  };
  const cartHandler = async(data) => {
    if (loggedIn) {
        try {
            let res = await fetch(`${process.env.REACT_APP_API_URL}/updateAccount/${userInfo.email}`,{
              method: "PUT",
              headers:{
                  "Content-Type":"application/json",
              },
              body: JSON.stringify({cart:cart}),
            });               
          } catch (err) {
            console.log(err);
            toast.error(err);
          }
    }
    dispatch(add(data));
    toast.success("Item Added To Cart");
    navigate('/cart');
  };
  return (
    <div className='h-[90vh] flex justify-center items-center p-2'>
    {
      product.map((data) => {
        return(
          <div className='flex w-8/12 gap-5 border-2 border-blue-950 p-5 justify-start flex-col xl:flex-row'>
          <div className='max-h-[400px] w-[20%] justify-center flex'>
                <img src={data.image} alt={data.title} className='h-full w-fit' loading='lazy'/>
            </div>
            <div className='flex flex-col gap-5'>
                <p className="font-bold text-2xl">{data.title}</p>
                <p>{(data.description)}.</p>
                <p>Rating:{data.rating.rate} | ({data.rating.count} ratings)  </p>
                <div className='flex gap-2'>
                  {cart.some((p) => p.id === data.id) ? 
                    <button
                  onClick={() => {
                    removeFromCart(data);
                  }} 
                  className='bg-[#090b94] border-1 text-gray-300 border-gray-600 hover:bg-[#5179a7] duration-200 text-md p-2 rounded flex items-center gap-1'>Remove Item</button>
                  :
                  <button
                  onClick={() => {
                    cartHandler(data);
                  }} 
                  className='bg-[#50A060] border-1 text-gray-300 border-gray-600 hover:bg-[#537e5b] duration-200 text-md p-2 rounded flex items-center gap-1'><FaShoppingCart/>Add to Cart</button>
                  }
                  
                  <button className='bg-[#E40046] border-1 text-gray-300 border-gray-600 hover:bg-[#b32910] duration-200 text-md p-2 rounded flex items-center'>Buy Now</button>
                </div>
            </div>
        </div>);
      })
    }
    </div>
  )
}

export default ProductInfo;