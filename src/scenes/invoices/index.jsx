import React from 'react';
import { Grid, Card, CardHeader, CardContent, Button, CardMedia, Typography, Box } from '@mui/material';


const Invoices = () => {
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
    <Grid item xs={12} md={6} >
      <Box >
      <Card >
        <CardHeader
          title="Choose Category"
          action={
            <div>
              <Button color="primary">Limonade</Button>
              <Button color="primary">Food</Button>
              <Button color="primary">Takeaway</Button>
            </div>
          }
        />
        <CardContent>
          {products.map((productCategory) => (
            <div key={productCategory.category}>
              <Typography variant="h6">{productCategory.category}</Typography>
              <Grid container xs={12} spacing={2}>
               {productCategory.items.map((item) => (
                 <Grid item  sm={12} md={12} lg={3} key={item.name}>
                 <Card variant="outlined" sx={{ maxWidth: 200, height: 250 }}>
                   <CardMedia
                     component="img"
                     height="140"
                     image={item.imageUrl}
                     alt={item.name}
                   />
                   <CardContent>
                     <Typography gutterBottom variant="h5" component="div">
                       {item.name}
                     </Typography>
                     <Typography variant="body2" color="text.secondary">
                       {item.description}
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
    <Box>
      <Card>
        <CardHeader title="Invoice" />
        <CardContent>
          {/* Content for Invoice */}
        </CardContent>
      </Card>
      </Box>
    </Grid>
  </Grid>
  );
 };
 
 export default Invoices;