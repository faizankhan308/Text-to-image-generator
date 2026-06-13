// import axios from 'axios'
// import fs from 'fs'
// import FormData from 'form-data'
// import userModel from '../models/userModel.js'

// // Controller function to generate image from prompt
// // http://localhost:4000/api/image/generate-image
// export const generateImage = async (req, res) => {

//   try {

//     const { userId, prompt } = req.body

//     // Fetching User Details Using userId
//     const user = await userModel.findById(userId)
    
//     if (!user || !prompt) {
//       return res.json({ success: false, message: 'Missing Details' })
//     }

//     // Checking User creditBalance
//     if (user.creditBalance === 0 || userModel.creditBalance < 0) {
//       return res.json({ success: false, message: 'No Credit Balance', creditBalance: user.creditBalance })
//     }

//     // Creation of new multi/part formdata
//     const formdata = new FormData()
//     formdata.append('prompt', prompt)

//     // Calling Clipdrop API
//     const { data } = await axios.post('https://clipdrop-api.co/text-to-image/v1', formdata, {
//       headers: {
//         'x-api-key': process.env.CLIPDROP_API,
//       },
//       responseType: "arraybuffer"
//     })

//     // Convertion of arrayBuffer to base64
//     const base64Image = Buffer.from(data, 'binary').toString('base64');
//     const resultImage = `data:image/png;base64,${base64Image}`

//     // Deduction of user credit 
//     await userModel.findByIdAndUpdate(user._id, { creditBalance: user.creditBalance - 1 })

//     // Sending Response
//     res.json({ success: true, message: "Background Removed", resultImage, creditBalance: user.creditBalance - 1 })

//   } catch (error) {
//     console.log(error.message)
//     res.json({ success: false, message: error.message })
//   }
// }


import axios from 'axios'
import userModel from '../models/userModel.js'

// Controller function to generate image
export const generateImage = async (req, res) => {
  try {

    const { userId, prompt } = req.body

    // Check input
    if (!userId || !prompt) {
      return res.json({
        success: false,
        message: "Missing Details"
      })
    }

    // Fetch user
    const user = await userModel.findById(userId)

    if (!user) {
      return res.json({
        success: false,
        message: "User not found"
      })
    }

    // Check credit balance
    if (user.creditBalance <= 0) {
      return res.json({
        success: false,
        message: "No Credit Balance",
        creditBalance: user.creditBalance
      })
    }

    // 🔥 ClipDrop API Call (FIXED)
    const { data } = await axios.post(
      'https://clipdrop-api.co/text-to-image/v1',
      {
        prompt: prompt
      },
      {
        headers: {
          'x-api-key': process.env.CLIPDROP_API,
          'Content-Type': 'application/json'
        },
        responseType: "arraybuffer"
      }
    )

    // Convert image to base64
    const base64Image = Buffer.from(data, 'binary').toString('base64')
    const resultImage = `data:image/png;base64,${base64Image}`

    // Deduct credit
    const updatedUser = await userModel.findByIdAndUpdate(
      user._id,
      { creditBalance: user.creditBalance - 1 },
      { new: true }
    )

    // Send response
    res.json({
      success: true,
      message: "Image Generated Successfully",
      resultImage,
      creditBalance: updatedUser.creditBalance
    })

  } catch (error) {
    console.log("ERROR:", error.response?.data || error.message)

    res.json({
      success: false,
      message: error.response?.data?.error || error.message
    })
  }
}