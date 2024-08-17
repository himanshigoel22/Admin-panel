const User = require("../models/user-model");
const Contact = require("../models/contact-model");

//users

const getAllUsers = async (req , res) => {
    try {
        const users = await User.find({} , {password:0});
        console.log(users);

        if(!users || users.length === 0){
            return res.status(404).json({ message: "No users found" });
        }
       
        return res.status(200).json(users);
    } 
    catch (error) {
       next(error); 
    }
};

//delete user 

const deleteUserById = async(req , res) => {
 try {
    const id = req.params.id;

    await User.deleteOne({_id : id});

    return res.status(200)
    .json({message:"User Deleted successfully"});

 } 
 catch (error) {
    next(error);
 }
}

//get user

const getUserById = async(req , res) => {
    try {
       const id = req.params.id;
   
       const data = await User.findOne
       ({_id : id} , {password: 0});
   
       return res.status(200).json(data);
    } 
    catch (error) {
       next(error);
    }
   }

// update user
const updateUserById = async(req , res) => {
    try {
       const id = req.params.id;
       const updatedData = req.body;

       const updateUser = await 
       User.updateOne({_id : id} , 
        {$set : updatedData});
   
       return res.status(200).json(updateUser);
    } 
    catch (error) {
       next(error);
    }
   }


//get contacts  

const getAllContacts = async (req , res) => {
    try {
        const contacts = await Contact.find();
        console.log(contacts);

        if(!contacts || contacts.length === 0){
            return res.status(404).json({ message: "No contacts found" });
        }

        return res.status(200).json(contacts);
    } 
    catch (error) {
      next(error); 
    }
};

//delete contacts

const deleteContactById = async(req , res) => {
   try {
      const id = req.params.id;
  
      await Contact.deleteOne({_id : id});
  
      return res.status(200)
      .json({message:"Contact Deleted successfully"});
  
   } 
   catch (error) {
      next(error);
   }
  }
  

module.exports = {getAllUsers , 
    getAllContacts ,
    deleteUserById ,
    getUserById ,
    updateUserById,
    deleteContactById
 };