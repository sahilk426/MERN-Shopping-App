import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { add, remove } from '../redux/slices/cartSlice';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { addP } from '../redux/slices/productSlice';

const ProductItems = ({data}) => {
    const { cart,loggedIn,userInfo} = useSelector((state) => state);
    const dispatch = useDispatch();

    const addToCart = async() => {
        if (loggedIn) {
            try {
                let res = await fetch(`${process.env.REACT_APP_API_URL}/updateAccount/${userInfo.email}`,{
                  method: "PUT",
                  headers:{
                      "Content-Type":"application/json",
                  },
                  body: JSON.stringify({cart:cart}),
                });               
                 console.log(cart);

                console.log(res);
              } catch (err) {
                console.log(err);
                toast.error(err);
              }
        }
        // console.log(data)
        dispatch(add(data));
        toast.success("Item Added To Cart");
        console.log(userInfo);
        
    };

    const removeFromCart = async() => {
        
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
                // console.log(cart);
                // console.log(res);
              } catch (err) {
                console.log(err);
                toast.error(err);
              }
        }
    };
    const addProduct = () => {
        dispatch(addP(data));
    }
  return (
    <div className='flex flex-col 
    items-center justify-between 
    bg-white hover:scale-[1.01] 
    transition-all duration-200 
    ease-in gap-3 p-4 mt-10 ml-5 
    rounded-xl shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] 
    hover:shadow-[0px_0px_10px_5px_#626669] max-h-[360px]'>
        <Link to="/product" onClick={addProduct}>
            <div>
                <p className='w-40 font-semibold text-gray-700 mt-1 text-left text-lg whitespace-nowrap overflow-hidden text-ellipsis'>{data.title}</p>
            </div>
            <div>
                <p className='text-[11px] w-40 text-left font-normal text-gray-400 mt-1'>{(data.description).split(" ").slice(0, 8).join(" ") + "..."}</p>
            </div>
            <div className='h-[180px]'>
                <img src={data.image} alt={data.title} className='h-full w-full' loading='lazy'/>
            </div>
        </Link>
        
        <div className='flex items-center justify-between w-full mt-5'>
            <p className='text-green-600 font-semibold'>${data.price}</p>
            {cart.some((p) => p.id === data.id) ? 
                <button onClick={removeFromCart}
            className="border-2 border-gray-700 text-gray-700 uppercase font-semibold rounded-full py-1 text-[12px] px-3
            transition-all duration-200 hover:text-white hover:bg-gray-700 ease-in
            "
            >
            <p>Remove Item</p>
            </button>
            :
            <button onClick={addToCart}
            className="border-2 border-gray-700 text-gray-700 uppercase font-semibold rounded-full py-1 text-[12px] px-3
            transition-all duration-200 hover:text-white hover:bg-gray-700 ease-in
            "
            >
            <p>Add to Cart</p>
            </button>
            }
        </div>
        
    </div>
  )
}

export default ProductItems