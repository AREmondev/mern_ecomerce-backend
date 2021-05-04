import jwt from 'jsonwebtoken'
import User from '../models/userModels.js'
import dotenv from 'dotenv'
import asyncHandler from 'express-async-handler'
dotenv.config()
export const protect = asyncHandler(async (req, res, next) => {
  let token
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(' ')[1]
    const decode = jwt.verify(token, process.env.JWT_SECRET)

    req.user = await User.findById(decode.id).select('-password')
  } else {
    res.status(404)
  }
  next()
})
