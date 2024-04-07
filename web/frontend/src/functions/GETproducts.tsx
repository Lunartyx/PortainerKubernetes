import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';

const PORT = "190";
const IP_ADDRESS = "192.168.134.131";
const API_SERVER = IP_ADDRESS + ":" + PORT;

// Define the Product interface
interface Product {
    productId: string;
    productName: string;
    productPrice: number;
    productPicture: string;
}

const GETproducts: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]); // Use Product interface
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        axios.get(`http://${API_SERVER}/product-ids`) // Change the URL to your backend API URL
            .then(async response => {
                const productIds: string[] = response.data;
                const productDataPromises = productIds.map(productId =>
                    axios.get(`http://${API_SERVER}/products/${productId}`)
                );
                const productDataResponses = await Promise.all(productDataPromises);
                const productsData = productDataResponses.map(response => response.data);
                setProducts(productsData);
                setLoading(false);
            })
            .catch(error => {
                setError('Error fetching product IDs: ' + error);
                setLoading(false);
            });
    }, []);

    return (
        <>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {products.map(product => (
                <ProductCard
                    key={product.productId}
                    productName={product.productName}
                    productPrice={product.productPrice}
                    productPicture={product.productPicture}
                />
            ))}
        </>
    );
};

export default GETproducts;
