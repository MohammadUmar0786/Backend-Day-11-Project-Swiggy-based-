// Project: Admin + User (Like:- Swiggy/Zomato): With "status code" also.

const { auth } = require('./middleware/auth'); // CommonJS way

// Import express using http module
const express = require('express');
const app = express();

// Parse data from json to obj
app.use(express.json());

// Data
const foodItems = [
  {
    id: 1,
    name: "Paneer Butter Masala",
    category: "veg",
    price: 220
  },
  {
    id: 2,
    name: "Chicken Biryani",
    category: "non-veg",
    price: 280
  },
  {
    id: 3,
    name: "Veg Burger",
    category: "veg",
    price: 120
  },
  {
    id: 4,
    name: "Chicken Burger",
    category: "non-veg",
    price: 150
  },
  {
    id: 5,
    name: "Masala Dosa",
    category: "veg",
    price: 90
  },
  {
    id: 6,
    name: "Egg Roll",
    category: "non-veg",
    price: 110
  },
  {
    id: 7,
    name: "Margherita Pizza",
    category: "veg",
    price: 250
  },
  {
    id: 8,
    name: "Chicken Pizza",
    category: "non-veg",
    price: 320
  },
  {
    id: 9,
    name: "Veg Fried Rice",
    category: "veg",
    price: 160
  },
  {
    id: 10,
    name: "Chicken Fried Rice",
    category: "non-veg",
    price: 200
  }
];

// Normal way: (Not recommended)
//// Authentication part here (Bcoz, no need to write this one for each http request separately):
//app.use('/admin',(req,res)=>{

//    // Auth. dummy code (No logic, just magic)
//    const token = "ABCDEF";
//    const access = token=="ABCDEF"?1:0;
//    if(!access)
//        res.status(403).send("Permission denied")
//    else 
//        next(); // if access h toh next route handler will call
//})

// More good professional way:(Recommneded)
app.use('/admin', auth)  // auth => will be coded in different file (Folder=> Middleware, file=> auth.js)

// Get all info of food items (Admin & Client user)
app.get('/food',(req,res)=>{
    // No need of authentication in this case
    res.send(foodItems)
})

// Admin:
// Add any new food item in menu
app.post('/admin',(req,res)=>{
    foodItems.push(req.body);
    res.status(201).send("Item added successfully"); // Status code also can be 200 (Ok), but just tried new code, as ok one will be added by default also.
})

// Update food items detail
app.patch('/admin',(req,res)=>{
    const id = req.body.id;
    const FoodData = foodItems.find(food => food.id === id);
    FoodData.price = req.body.price; // Replaced updated data
    res.status(200).send("Item info updated successfully");
})

// Delete any food item
app.delete('/admin/:id',(req,res)=>{
    const id = parseInt(req.params.id);
    const index = foodItems.findIndex(food=> food.id === id); // find index
    foodItems.splice(index,1); // deleted 1 item from that index
    res.status(200).send("Item deleted successfully");
})

// Listen at a port no.
app.listen(3000,()=>{
    console.log("Listening at a port no. 3000");
})