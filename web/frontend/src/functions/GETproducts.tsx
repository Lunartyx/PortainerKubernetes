import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Product {
    productId: string;
    productName: string;
    productPrice: number;
    productPicture: string;
}

const GETproducts: React.FC = () => {
    const [productIds, setProductIds] = useState<string[]>([]);
    const [productDetails, setProductDetails] = useState<Product | null>(null); // Use the Product interface


    useEffect(() => {
        // Fetch product IDs
        axios.get('/product-ids')
            .then(response => {
                setProductIds(response.data);
            })
            .catch(error => {
                console.error('Error fetching product IDs:', error);
            });
    }, []); // Run once on component mount

    const fetchProductDetails = (productId: string) => {
        // Fetch product details by ID
        axios.get(`/products/${productId}`)
            .then(response => {
                setProductDetails(response.data);
            })
            .catch(error => {
                console.error(`Error fetching product details for ID ${productId}:`, error);
            });
    };

    return (
        <div>
            {/* Render product IDs */}
            <h2>Product IDs:</h2>
            <ul>
                {productIds.map(productId => (
                    <li key={productId}>
                        {productId}
                        {/* Button to fetch product details */}
                        <button onClick={() => fetchProductDetails(productId)}>View Details</button>
                    </li>
                ))}
            </ul>

            {/* Render product details */}
            {productDetails && (
                <div>
                    <h2>Product Details:</h2>
                    <p>Product Name: {productDetails.productName}</p>
                    <p>Product Price: {productDetails.productPrice}</p>
                    <p>Product Image: {productDetails.productPicture}</p>
                    {/* Add more fields as needed */}
                </div>
            )}
        </div>
    );
};

export default GETproducts;
