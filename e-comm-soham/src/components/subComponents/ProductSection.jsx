import React, { useState , useEffect} from "react";
import SectionHeading from "./SectionHeading";
import ProductCard from "./ProductCard";
import axios from "axios";
import "../../css/productSection.css"
import {useAuth} from "../../store/store"
 
function ProductSection() {
 
    const [products, setProducts] = useState([]);
    const {isLoading , setIsLoading} = useAuth()
   
    useEffect(() => {
       

        const fetchData = async () => {
            try {
                setIsLoading(true);
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_API}/crud/products/`);
                if (response.status === 200) {
                    setProducts(response.data.product_list);
                    console.log(response.data.product_list);
                     setIsLoading(false);
                }
            } catch (error) {
                console.error("Error fetching products:", error);
                setIsLoading(false)
            }
        };
 
        fetchData();
    }, []);
   
  return (
    <section>
        <div className="page-width">
            <div className="product-section-inner">
              <SectionHeading innerContent="Summer" outerContent="special" />
                <div className="product-section-content flex flex-wrap">
                    {products.map((product, index) => (
                       <ProductCard product={product} key={index}/>
                    ))}
                </div>
            </div>
        </div>
 
    </section>
  )
}
 
export default ProductSection