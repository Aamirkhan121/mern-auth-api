const Contact = require("../models/contact-model");
const Service = require("../models/service-model");
const User=require("../models/user-model")

// getAllUsers from mongodb

const getAllUsers=async(req,res)=>{
try {
    const users=await User.find({},{password:0});
    console.log(users)
    if (!users || users.lenght===0) {
        return res.status(404).json({message:"Not Users Found"});        
    }
    return res.status(200).json(users)
} catch (error) {
    next(error)
}
};

// getAllContacts from mongodb

const getAllContacts=async(req,res)=>{
    try {
        const contacts=await Contact.find()
        if (!contacts || contacts.lenght===0) {
            return res.status(404).json({message:"Not found any conatct message"})
        }
        return res.status(200).json(contacts)
    } catch (error) {
        next(error)
    }
};

// getAllServices from mongodb

const getAllServices=async(req,res)=>{
try {
    const services=await Service.find();
    if (services||services.lenght===0) {
        return res.status(404).json({message:"Not found any services"});        
    }
    return res.status(200).json(services)
} catch (error) {
    next(error)
}
};

const updateUserById=async(req,res)=>{
    try {
        const id=req.params.id;
        const updatedUserData=req.body;
        const updatedData=await User.updateOne({_id:id},{$set:updatedUserData,});

        return res.status(200).json(updatedData)
    } catch (error) {
        next(error)
    }
}

// user delete Logic

const getUserById=async(req,res)=>{
    try {
        const id=req.params.id;
       const data= await User.findOne({_id:id},{password:0});
        return res.status(200).json(data)
    } catch (error) {
        next(error)
    }
}
// user delete Logic

const deleteUserById=async(req,res)=>{
    try {
        const id=req.params.id;
        await User.deleteOne({_id:id});
        return res.status(200).json({message:"User Deleted Successfully"})
    } catch (error) {
        next(error)
    }
}
// contacts delete Logic

const deleteContactById=async(req,res)=>{
    try {
        const id=req.params.id;
        await Contact.deleteOne({_id:id});
        return res.status(200).json({message:"User Deleted Successfully"})
    } catch (error) {
        next(error)
    }
}

// const updateContactById=async(req,res)=>{
//     try {
//         const id=req.params.id;
//         const updateContactData=req.body;
//         const updateContact=await Contact.updateOne({_id:id},{$set:updateContactData})
//         return res.status(200).json(updateContact)
//     } catch (error) {
//         next(error)
//     }
// }


module.exports={getAllUsers,getAllContacts,getAllServices,deleteUserById,getUserById,deleteContactById,updateUserById}