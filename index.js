// const express = require('express');
import express from 'express';
import dotenv from "dotenv";
import connectDatabase from './config/mongoDB.js';
import ImportData from './DataImport.js';
import productRoute from './Routes/ProductRoutes.js';
import userRouter from './Routes/UserRoutes.js';
import orderRouter from './Routes/OrderRoutes.js';
import { errorHandler, notFound } from './Middleware/Errors.js';

//const { MongoClient } = require('mongodb');
//const cors = require('cors');


dotenv.config();
// const ObjectId = require('mongodb').ObjectId;


connectDatabase();
const app = express()
const PORT = process.env.PORT || 5000;


//middleware


 app.use(express.json());

// MongoDb 


// const uri = "mongodb+srv://shoeShop:ky1cAX7uXcK9NFk5@cluster0.gfhug.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// async function run() {
//     try{
//         await client.connect();
//         const database = client.db('practise');
//         const usersCollection = database.collection('users');
		
		
// 		// There will be All API 
		
		
// 	}
//     finally{
//       //await client.close();
//     }
// }
// run().catch(console.dir)


// Load Products From Server

app.use("/api/import", ImportData);
app.use("/api/products", productRoute);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);
app.get("/api/config/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID);
});

//Error Handling
app.use(notFound);
app.use(errorHandler);




app.get('/', (req, res) => {
  res.send('Running My CRUD Server')
})

app.listen(PORT, () => {
  console.log(`Running Server at http://localhost:${PORT}`)
})

