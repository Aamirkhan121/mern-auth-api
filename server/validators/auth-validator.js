const { z } = require("zod");


// loginSchema 

const loginSchema=z.object({
  email: z
  .string({ required_error: "Email is required" })
  .trim()
  .email({message:"Invalid email address"})
  .min(4, { message: "Email must be at least of 4 characters" })
  .max(255, { message: "Email must not be more than 255 characters" }),
  password: z
  .string({ required_error: "Password is required" })
  .min(7, { message: "Password must be at least of 7 characters" })
  .max(1025, { message: "Password must not be more than 1025 characters" }),
});

//creating an object schema
const signupSchema = z.object({
  username: z
    .string({ required_error: "Name is required" })
    .trim()
    .min(4, { message: "Name must be at least of 4 characters" })
    .max(255, { message: "Name must not be more than 255 characters" }),

    email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email({message:"Invalid email address"})
    .min(4, { message: "Email must be at least of 4 characters" })
    .max(255, { message: "Email must not be more than 255 characters" }),
    password: z
    .string({ required_error: "Password is required" })
    .min(7, { message: "Password must be at least of 7 characters" })
    .max(1025, { message: "Password must not be more than 1025 characters" }),
 
  phone: z
    .string({ required_error: "Phone is required" })
    .trim()
    .min(10, { message: "Phone must be at least of 10 characters" })
    .max(20, { message: "Phone must not be more than 20 characters" }),
 
});

module.exports={signupSchema,loginSchema};
