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

const corsOptions={
    origin:"http://localhost:5173",
    methods:"GET, POST, PUT, DELETE, PATCH, HEAD",
    credentials: true,
}

app.use(cors(corsOptions))
app.use(express.json());



app.use("/api/auth",authRoute);
app.use("/api/form",contactRoute);
app.use("/api/data",router);

// admin route
app.use("/api/admin",adminRoute)
// app.use("/api/admin",adminRoute)
app.use(errorMiddleware);

app.use(express.static(path.join(__dirname, 'client/build')));

// Handles any requests that don't match the API routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

connectedDb().then(()=>{
    app.listen(PORT,()=>{
        console.log(`server is running at port:http://localhost:${PORT}`)
    })
})

