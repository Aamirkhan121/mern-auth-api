require("dotenv").config();
const express =require("express");
const cors  =require("cors")
const app=express();
const PORT=8000;
const authRoute =require("./router/auth-router");
const connectedDb=require("./utils/db.js");
const errorMiddleware = require("./middlewares/error-middleware.js");
const contactRoute = require("./router/contact-router.js");
const adminRoute=require("./router/admin-router.js")
// const serviceRoute=require("./router/service-router");
const router = require("./router/service-router");
const path = require('path');

const allowedOrigins = ['https://mern-app-1jrq.onrender.com'];

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // Allow credentials (e.g., cookies, authorization headers)
};

app.use(cors(corsOptions));
app.use(express.json());



app.use("/api/auth",authRoute);
app.use("/api/form",contactRoute);
app.use("/api/data",router);

// admin route
app.use("/api/admin",adminRoute)
// app.use("/api/admin",adminRoute)
app.use(errorMiddleware);

connectedDb().then(()=>{
    app.listen(PORT,()=>{
        console.log(`server is running at port:http://localhost:${PORT}`)
    })
})

