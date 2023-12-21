import React, { useState, useEffect } from 'react';

const App = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://s3.amazonaws.com/open-to-cors/assignment.json');
        const data = await response.json();
  
        if (data && data.products) {
          // Convert the products object into an array
          const productsArray = Object.values(data.products);
  
          // Log the unsorted products to inspect the original order
          console.log('Unsorted products:', productsArray);
  
          // Sort the products based on descending popularity
          const sortedProducts = productsArray.sort((a, b) => b.popularity - a.popularity);
  
          // Log the sorted products to inspect the order
          console.log('Sorted products:', sortedProducts);
  
          // Update the state with the sorted products
          setProducts(sortedProducts);
        } else {
          console.error('Invalid data format:', data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, []);
  
  
  
  console.log(products);
  
  return (
    <div className="App" style={{ textAlign: 'center' }} >
      <h1 >Product List</h1>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {products.map((product, index) => (
          <li key={index} style={{backgroundColor:"#F8F8D7", marginBottom: '10px', border: '1px solid #ccc', padding: '10px',marginLeft:'20%',marginRight:'20%'  }}>
            <strong>Title:</strong> {product?.title ?? 'N/A'},{' '}
            <strong>Price:</strong> ${product?.price ?? 'N/A'},{' '}
            <strong>Popularity:</strong> {product?.popularity ?? 'N/A'}
          </li>
        ))}
      </ul>
    </div>
  );
  
  
};

export default App;
