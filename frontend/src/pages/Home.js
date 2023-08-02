import React, { useEffect, useState } from 'react'
import ProductItems from '../components/ProductItems';
import Spinner from '../components/Spinner';
import { removeP } from '../redux/slices/productSlice';
import { useDispatch, useSelector } from 'react-redux';
import Filter from '../components/Filter';
var productData = [];

const Home = () => {
  const API_URL = "https://fakestoreapi.com/products";
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const {userInfo} = useSelector((state) => {
    return state;
  })
  const dispatch = useDispatch();
  async function fetchProductsData() {
    setLoading(true);
    try {
      const output = await fetch(API_URL);
      const data = await output.json();
      productData = data;
      console.log("Product Data",productData);
      setProducts(data);
    } catch (err) {
      console.log("Loggin Error");
      console.error(err);
      setProducts([]);
    }
    setLoading(false);
  }
  useEffect(() => {
    fetchProductsData();
    // console.log("Logged in User:" + "Name: " + userInfo.firstname + " ,Email: " + userInfo.email);
    dispatch(removeP());
  },[]);
  return (
    <div>
    {
      loading ? <Spinner/> : 
      products.length > 0 ? 
      (
          <div className=''>
            {/* <div>categories</div> */}
            <Filter
              productData = {productData}
              setProducts = {setProducts}
            />
            <div className='grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-6xl p-2 mx-auto space-y-10 space-x-5 min-h-[80vh]'>
              {
                products.map((data) => {
                  return (<ProductItems key = {data.id} data = {data}/>);
                })
              }
            </div>
          </div>
      ) 
      :
      <div className='w-[100%] h-[90vh] flex justify-center items-center text-2xl font-bold text-red-950 flex-col gap-3'>
        <p>No Post Found</p>
        <p>Please Refresh</p>
      </div>
    }
    </div>
  )
}

export default Home;