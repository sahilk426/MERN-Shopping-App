import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import CartItems from "../components/CartItems";
import { clear } from "../redux/slices/cartSlice";
import { clearCart } from "../redux/slices/currentUser";
import { toast } from "react-hot-toast";

const Cart = () => {
  const { cart ,loggedIn,userInfo} = useSelector((state) => state);
  const [totalAmount, setTotalAmount] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // console.log(cart)
  useEffect(() => {
    setTotalAmount(cart.reduce((acc, curr) => acc + curr.price, 0));
    console.log(cart)
  }, [cart]);

  async function checkOutHandler() {
    
    if(loggedIn){
      const order = {
        firstname: userInfo.firstname,
        lastname: userInfo.lastname,
        email: userInfo.email,
        number:userInfo.number,
        address:userInfo.address,
        orders:userInfo.cart,
        totalAmount:totalAmount
      }
      try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/createOrder`,{
        method:"POST",
        headers:{
          "Content-Type":"application/json",
        },
        body: JSON.stringify(order)
        });
      if (res.status === 200){
        console.log(res);
        dispatch(clear());
        dispatch(clearCart());
        toast.success("Order Place Successfully");
      }
      }catch(err) {
        console.log(userInfo.cart);
        console.error(err);
        toast.error("Internal Server Error");
      }
   
  }
    else {
      toast.error("Please Login First");
      navigate('/login');
    }
  }

  return (
    <div>
      {
        cart.length > 0 ? (
          <div className="flex flex-row justify-center max-[1300px] mx-auto gap-x-5 w-10/12">
            {/* Cart Item  */}
            <div className="w-[60%] flex flex-col p-2">
              {cart.map((cartItem, index) => (
                <CartItems item={cartItem} key={cartItem.id} itemIndex={index} />
              ))}
            </div>

            {/* Summary */}
            <div className="w-[40%] mt-5 flex flex-col">
              <div className="flex flex-col h-[90px]justify-between p-5 gap-5 my-14">
                <div className="flex flex-col gap-5 ">
                  <div className="font-semibold text-xl text-green-800 ">
                    Your Cart
                  </div>
                  <div className="font-semibold text-5xl text-green-700  -mt-5">
                    Summary
                  </div>
                  <p className="text-xl">
                    <span className="text-gray-700 font-semibold text-xl">
                      Total Items: {cart.length}
                    </span>
                  </p>
                </div>
              </div>
              <div className="flex flex-col">
                <p className="text-xl font-bold">
                  <span className="text-gray-700 font-semibold">
                    Total Amount:
                  </span>{" "}
                  ${totalAmount}
                </p>
                <button onClick={checkOutHandler}
                className="bg-green-700 hover:bg-purple-50 rounded-lg text-white transition duration-200 ease-linear mt-5 border-2 border-green-600 font-bold hover:text-green-700 p-3 text-xl mr-10">
                  CheckOut Now
                </button>
              </div>
            </div>
          </div>
      )
      : 
      (
        <div className="min-h-[80vh] flex flex-col justify-center items-center">
          <h1 className="text-gray-700 font-semibold text-xl mb-2">
            Your cart is empty!
          </h1>
          <Link to="/">
            <button className="uppercase bg-green-600 p-3 px-10 rounded-lg text-white mt-6 font-semibold tracking-wider hover:bg-purple-50 duration-200 transition-all ease-in hover:text-green-600 border-2 border-green-600">
              shop now
            </button>
          </Link>
          {!loggedIn && 
            <Link to="/login">
            <button className="uppercase bg-green-600 p-3 px-10 rounded-lg text-white mt-6 font-semibold tracking-wider hover:bg-purple-50 duration-200 transition-all ease-in hover:text-green-600 border-2 border-green-600">
              Sign in
            </button>
          </Link>
          }
          
        </div>
      )
      
    }
    </div>
  );
}

export default Cart;