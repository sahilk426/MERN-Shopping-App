import React from 'react'

const Filter = ({ productData,setProducts}) => {
    let tempData = Array.from(new Set(productData.map((item) => item.category)));
    console.log(productData)
    function filterProducts(category) {
        if (category === "all") {
            setProducts(productData);
        }else {
            setProducts(productData.filter((cat) => cat.category === category));
        }
      }
  return (
    <div className='flex justify-center gap-5 mt-4 flex-wrap'>
                <button 
                    className="border-[1px] px-2 border-green-800 bg-[#88B4B8] hover:bg-[#50A060] rounded-[5px]" 
                    onClick={() => filterProducts("all")}
                 >
                      All
              </button>
        {
            tempData.map((data) => {
                return (
                    <button 
                    className="border-[1px] px-2 border-green-800 bg-[#88B4B8] hover:bg-[#50A060] rounded-[5px]" 
                    onClick={() => filterProducts(data)}
              >
                      {data.charAt(0).toUpperCase() + data.slice(1)}
              </button>
                );
            })
        }
            
            </div>
  )
}

export default Filter