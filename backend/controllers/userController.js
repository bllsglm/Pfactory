import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

// @desc register users
// @route  POST /api/users
// @access Public
const registerUser = asyncHandler(async(req,res) => {
  const {name,email,password} = req.body;

  const userExist = await User.findOne({email})
  if(userExist){
    res.status(404)
    throw new Error('User already exist')
  }

  const user = await User.create({name, email,password})
  if(user){
    generateToken(res, user._id)

    res.status(201).json({
      _id : user._id,
      name : user.name,
      email : user.email,
    })
  }else{
    res.status(404)
    throw new Error('Invalid user data')
  }
})

//@desc  auth Users & get token
//@route POST /api/users/auth
//@access Public
const authUser = asyncHandler(async(req,res)=> {
  const {email , password} = req.body;
  const user = await User.findOne({email})


  if(user && (await user.matchPassword(password))){
    generateToken(res, user._id)
      res.status(200).json({
        _id : user._id,
        name : user.name,
        email : user.email
      })
  }else{
    res.status(404);
    throw new Error('Invalid email or password')
  }
})

//@desc  Get Users data
//@route GET /api/users/me
//@access Private
const getMe = asyncHandler(async(req,res)=> {
  res.status(200).json(req.user)
})


// //@desc Update User 
// //@route POST /api/users/profile
// //@access Private
// const updateUser = asyncHandler(async(req,res)=>{
  
//     const user = await User.findById(req.user._id)
 
//     console.log("Request body:", req.body);
//     console.log(req.user);
//     if(user){
//       user.name = req.body.name || user.name;
//       user.email = req.body.email || user.email;

//       if(req.body.password){
//         user.password = req.body.password
//       }

//       const updatedUser = await user.save()

//       res.status(200).json({
//         _id : updatedUser._id,
//         email : updatedUser.email,
//         name: updatedUser.name
//       })
//     }else{
//       res.status(400)
//       throw new Error('User could not have been updated')
//     }
// })


//@desc Logout User /Clear cookie
//@route POST /api/users/logout
//@access Private
const logoutUser = asyncHandler(async(req,res)=> {
  res.clearCookie('jwt')
  res.status(200).json({message : 'Logged out successfully'})
})


export {registerUser, logoutUser, authUser, getMe}