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
  
  
          // Sort the products based on descending popularity
          const sortedProducts = productsArray.sort((a, b) => b.popularity - a.popularity);
  
  
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
  
  
  
  return (
    <div className="App" style={{ textAlign: 'center' }}>
      <h1>Product List</h1>
      <table style={{ width: '50%', borderCollapse: 'collapse',marginLeft:'25%' }}>
        <thead style={{backgroundColor:'red'}}>
          <tr>
            <th style={{ border: '1px solid #ccc', padding: '10px' }}>ID</th>
            <th style={{ border: '1px solid #ccc', padding: '10px' }}>Title</th>
            <th style={{ border: '1px solid #ccc', padding: '10px' }}>Price</th>
            <th style={{ border: '1px solid #ccc', padding: '10px' }}>Popularity</th>
          </tr>
        </thead>
        <tbody style={{backgroundColor:'#F5F5DC'}}>
          {products.map((product, index) => (
            <tr key={index} style={{ border: '1px solid #ccc', padding: '10px' }}>
              <td style={{ border: '1px solid #ccc', padding: '10px' }}>{index + 1}</td>
              <td style={{ border: '1px solid #ccc', padding: '10px' }}>{product?.title ?? 'N/A'}</td>
              <td style={{ border: '1px solid #ccc', padding: '10px' }}>${product?.price ?? 'N/A'}</td>
              <td style={{ border: '1px solid #ccc', padding: '10px' }}>{product?.popularity ?? 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
          }
export default App;
