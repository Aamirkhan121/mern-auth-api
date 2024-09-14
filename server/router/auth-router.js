const express = require("express");
const router = express.Router();
const controller=require("../controllers/auth-controller")
const {signupSchema,loginSchema}=require("../validators/auth-validator")
const validate=require("../middlewares/validator-middleware")
const authMiddleware=require("../middlewares/auth-middleware")
// router.get("/", (req, res) => {
//   res.status(200).send("Welcome to world best shopping router using router");
// });

router.route("/").get(controller.home)    // is wala mai chaning use kr skta hai router ka like this get, post, delete etc

router.route("/register").post(validate(signupSchema),controller.register)
router.route("/login").post(validate(loginSchema),controller.login)
router.route("/user").get(authMiddleware,controller.user)
// router.get("/about",(req,res)=>{
//     res.status(200).send("Welcome to About page")
// })
// router.get("/register",(req,res)=>{
//     res.status(200).send("Welcome to Register page")
// })

module.exports = router;
