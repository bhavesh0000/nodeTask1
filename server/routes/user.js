const express =  require('express')
const router = express.Router()
const path = require('path')
const User = require('../models/usermodel')

router.get('/register', async (req, res)=>{
    res.sendFile(path.join(__dirname, '../../public/index.html'))
})

router.get('/display', async (req, res)=>{
    res.sendFile(path.join(__dirname, '../../public/display.html'))
})

router.post('/register', async(req, res)=>{
    const userData = req.body
    try{
        const newUser = new User(userData)
        await newUser.save()
        res.status(201).json({ message: 'User registered successfully'})
    } catch (error){
        console.error(error)
        res.status(500).json({ error: 'Error registering user'})
    }
    
})


router.get('/list', async (req, res)=>{
    try{
        const users = await User.find({})
        res.json(users) 
    } catch (error){
        console.error(error)
        res.status(500).json({ error: 'Error fetching users'})
    }
})
module.exports = router