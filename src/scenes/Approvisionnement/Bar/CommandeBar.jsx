import React, { useState } from 'react';
import { Grid, Card, CardHeader, CardContent, Button, CardMedia, Typography, Box } from '@mui/material';


const CommandeBarEntre = () => {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const handleQuantityChange = (event) => {
    const newQuantity = parseInt(event.target.value, 10);
    if (isNaN(newQuantity) || newQuantity < 1) {
      setQuantity(1); // Ensure quantity is positive
    } else {
      setQuantity(newQuantity);
    }
  };

  const addToInvoice = () => {
    // Implement logic to add the selected product and quantity to your invoice data structure
    console.log(`Adding ${selectedProduct.name} (x${quantity}) to invoice`);
    // Clear selection and quantity after adding to invoice
    setSelectedProduct(null);
    setQuantity(1);
  };

  const products = [
    {
      category: "Limonade",
      items: [
        { name: "Limonade 1", description: "Fresh and refreshing.", imageUrl: "https://via.placeholder.com/150" },
        { name: "Limonade 2", description: "Sweet and tangy.", imageUrl: "https://via.placeholder.com/150" },
        { name: "Pizza", description: "Cheesy and delicious.", imageUrl: "https://via.placeholder.com/150" },
        { name: "Burger", description: "Juicy and satisfying.", imageUrl: "https://via.placeholder.com/150" },
        { name: "Pizza", description: "Cheesy and delicious.", imageUrl: "https://via.placeholder.com/150" },
        { name: "Burger", description: "Juicy and satisfying.", imageUrl: "https://via.placeholder.com/150" },
        { name: "Pizza", description: "Cheesy and delicious.", imageUrl: "https://via.placeholder.com/150" },
        { name: "Burger", description: "Juicy and satisfying.", imageUrl: "https://via.placeholder.com/150" },
      ],
    },
    // {
    //   category: "Food",
    //   items: [
    //     { name: "Pizza", description: "Cheesy and delicious.", imageUrl: "https://via.placeholder.com/150" },
    //     { name: "Burger", description: "Juicy and satisfying.", imageUrl: "https://via.placeholder.com/150" },
    //   ],
    // },
    // {
    //   category: "Food",
    //   items: [
    //     { name: "Pizza", description: "Cheesy and delicious.", imageUrl: "https://via.placeholder.com/150" },
    //     { name: "Burger", description: "Juicy and satisfying.", imageUrl: "https://via.placeholder.com/150" },
    //   ],
    // },
    // {
    //   category: "Food",
    //   items: [
    //     { name: "Pizza", description: "Cheesy and delicious.", imageUrl: "https://via.placeholder.com/150" },
    //     { name: "Burger", description: "Juicy and satisfying.", imageUrl: "https://via.placeholder.com/150" },
    //   ],
    // },
    // {
    //   category: "Food",
    //   items: [
    //     { name: "Pizza", description: "Cheesy and delicious.", imageUrl: "https://via.placeholder.com/150" },
    //     { name: "Burger", description: "Juicy and satisfying.", imageUrl: "https://via.placeholder.com/150" },
    //   ],
    // },
 ];
  return (
    <Grid container spacing={3}>
    <Grid item xs={12} md={6}>
      <Box padding={3}>
        <Card sx={{ backgroundColor: '#f5f5f5', borderRadius: 12, padding: 2 }}>
          <Typography
            padding={2}
            sx={{
              fontSize: 20,
              fontWeight: 'bold',
              color: '#333',
              textAlign: 'center',
            }}
          >
            Listes des produits
          </Typography>
          <CardContent>
            {products.map((productCategory) => (
              <div key={productCategory.category}>
                <Typography variant="h6">{productCategory.category}</Typography>
                <Grid container xs={12} spacing={2}>
                  {productCategory.items.map((item) => (
                    <Grid item sm={12} md={12} lg={3} key={item.name}>
                      <Card variant="outlined" sx={{ maxWidth: 200, height: 200, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        {/* <CardMedia
                           component="img"
                           height="140"
                           image={item.imageUrl}
                           alt={item.name}
                         /> */}
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="div" sx={{ fontSize: 16, fontWeight: 'bold' }}>
                            {item.name}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </div>
            ))}
          </CardContent>
        </Card>
      </Box>
    </Grid>
    <Grid item xs={12} md={6}>
      <Box padding={3}>
        <Card sx={{ backgroundColor: '#f0f8ff', borderRadius: 12, padding: 2 }}>
          <CardHeader title="Invoice" sx={{ backgroundColor: '#e0e0e0', padding: 1 }} />
          <CardContent>
            {/* Content for Invoice */}
          </CardContent>
        </Card>
      </Box>
    </Grid>
  </Grid>
  );
 };
 
 export default CommandeBarEntre;