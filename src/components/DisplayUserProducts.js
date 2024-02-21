import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState} from 'react';
import ProductUserCard from './ProductUserCard';
import { useNavigate } from 'react-router-dom';

function DisplayUserProducts() {
    
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [productsPricing, setProductsPricing] = useState([]);
    const [productsValidity, setProductsValidity] = useState([]);
    const [discount, setDiscount] = useState([]);
    const [faltu, setFaltu] = useState("");
    
    
    useEffect(() => {
        async function fetchProducts() {
            try {
                const response = await fetch('http://localhost:4000/v1/products/getProducts');
                const data = await response.json();
                setProducts(data);
                
            } catch (error) {
                console.error('Failed to fetch products:', error);
            }
        }
        fetchProducts();
    }, []);
    



    useEffect(() => {
        async function fetchProductsPricing() {
            try {
                const response = await fetch('http://localhost:4000/v1/products/getProductsPricing');
                const data = await response.json();
                const pricing = [];
                const discount= [];
                for(var i = 0; i < data.length; i++) {
                    pricing[data[i].productId] = data[i].basePrice;
                    discount[data[i].productId] = data[i].maxAbsoluteDiscount;
                }
                setProductsPricing(pricing);
                setDiscount(discount);
                
                
            } catch (error) {
                console.error('Failed to fetch products pricing:', error);
            }
        }
        fetchProductsPricing();
    }, []);
    console.log(discount);

    useEffect(() => {
        async function fetchProductsValidity() {
            try {
                const response = await fetch('http://localhost:4000/v1/products/getProductsValidity');
                const data = await response.json();
                const validities = [];
                for(var i = 0; i < data.length; i++) {
                    validities[data[i].productId] = data[i].validityOptionTitle;
                }
                setProductsValidity(validities);
                
            } catch (error) {
                console.error('Failed to fetch products validity:', error);
            }
        }
        fetchProductsValidity();
    }, []);
    



    return (
        <div className="">
            <div className='ml-5'>
                <button className="flex gap-3 mt-6 bg-white text-gray-700 py-2 px-10 text-center rounded-md hover:bg-white focus:outline-none focus:bg-blue-600"
                    onClick={() => navigate('/Logout')}
                    > 
                    <span className="text-gray-700"><FontAwesomeIcon icon={faArrowLeft} className="h-6" /></span>
                    Logout
                </button>
            </div>
            <div className="mb-10 pt-4"> 
                <h1 className="text-3xl text-center font-semibold">All Products</h1>
            </div>
            <div className="flex flex-wrap justify-center items-center gap-4">
                {
                    products.map(product => {
                        return <ProductUserCard key ={product._id} product={product} productPrice={productsPricing[product._id]} productValidity={productsValidity[product._id]} maxAbsoluteDiscount={discount[product._id]}/>
                    })
                }
            </div>
            <div className='ml-5 mb-5'>
                <button className="flex gap-3 mt-6 bg-white text-gray-700 py-2 px-10 text-center rounded-md hover:bg-white focus:outline-none focus:bg-blue-600"
                    onClick={() => navigate('/login')}
                    > 
                    <span className="text-gray-700"><FontAwesomeIcon icon={faArrowLeft} className="h-6" /></span>
                    Go Back
                </button>
            </div>
        </div>
    )
}
export default DisplayUserProducts;