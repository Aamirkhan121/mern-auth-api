const User = require("../models/user-model");
const bcrypt = require("bcryptjs");

const home = (req, res,next) => {
  try {
    res
      .status(200)
      .send(
        "Welcome to world best shopping router using router and controller again"
      );
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal server error" });
  }
};
const register = async (req, res,next) => {
  try {
    // console.log(req.body);
    const { username, email, phone, password } = req.body;

    const userExist = await User.findOne({ email });

    if (userExist) {
      const error = new Error("Email already exists");
      error.status = 400;
      error.extraDetails = "The email provided is already in use by another account.";
      return next(error);
    }

    //hash password
    // const saltRound = 10;
    // const hash_password = await bcrypt.hash(password, saltRound);

    const newUser = await User.create({
      username,
      email,
      phone,
      password,
    });

    res.status(200).json({
      msg: "Registration Successful",
      token: await newUser.generateToken(),
      userId: newUser._id.toString(),
    });
  } catch (error) {
    error.status = 500;
    error.message = "Internal Server Error";
    error.extraDetails = error.message;
    next(error);
  }
};

// login logic

const login = async (req, res,next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      const error=new Error("Email and password are rquire");
      error.status=400
      error.message="pls fill the input properly";
      error.extraDetails = "Both email and password fields must be provided.";
      return next(error);
    }
    const userExist = await User.findOne({ email });
    // console.log(userExist);
    if (!userExist) {
      // return res.status(400).json({ meg: "Invalid Credentials" });
      const error=new Error("Invalid email or password");
      error.status=401;
      error.message="pls fill the input properly";
      error.extraDetails = "Invalid email or password";
      return next(error)
    }
    // const user = await bcrypt.compare(password, userExist.password);

    const user = await userExist.comparePassword(password);
    if (!user) {
      const error = new Error("Invalid email or password");
      error.status = 401;
      error.extraDetails = "The password provided is incorrect.";
      return next(error);
    }

    if (user) {
      res.status(200).json({
        message: "login Successful",
        token: await userExist.generateToken(),
        userId: userExist._id.toString(),
      });
    }
    //  else {
    //   res.status(401).send({ msg: "Invalid email or password" });
    // }
  } catch (error) {
    // res.status(500).send({ msg: "Internal Server Error" });
    error.status=500;
    error.message="Internal Server Error"
    error.extraDetails=error.message
    next(error)
  }
};

// to send user data user logic 

const user=async(req,res)=>{
  try {

    const userData=req.user
    // console.log(userData)
    res.status(200).json({userData})
  } catch (error) {
    console.log(`error from the user route ${error}`)
  }
}

module.exports = { home, register, login,user };
