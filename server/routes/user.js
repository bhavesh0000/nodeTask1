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
            const user = new User(userData)
            await user.save()
            res.status(201).json({ message: 'User registered successfully'})
            } catch (error){
                if (error.code === 11000 && error.keyPattern.email) {
                    res.status(400).json({ error: 'Email already registered' });
                } else if (error.code === 11000 && error.keyPattern.mobileNo) {
                    res.status(400).json({ error: 'Mobile number already registered' });
                } else if (error.code === 11000 && error.keyPattern.loginId) {
                    res.status(400).json({ error: 'Login ID already registered' });
                }else{
            console.error(error)
            res.status(500).json({ error: 'Error registering user'})
            }
        }
    })

    // Route to handle user details request
router.get('/details', async (req, res)=>{
    const { email } = req.query
    try{
        const user = await User.findOne({ email })
        if (!user){
            return res.status(404).json({ error: 'User not found'})
        }
        res.json(user)
    } catch (error){
        console.error(error)
        res.status(500).json({ error: 'Error fetching user details'})
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
// Route to delete multiple users by their IDs
router.post('/delete-multiple', async (req, res) => {
    try {
        const { userIds } = req.body;

        // Ensure that userIds is an array
        if (!Array.isArray(userIds)) {
            return res.status(400).json({ error: 'User IDs must be provided as an array' });
        }

        // Delete users by their IDs
        const result = await User.deleteMany({ _id: { $in: userIds } });

        // Check if any users were deleted
        if (result.deletedCount > 0) {
            res.status(200).json({ message: `${result.deletedCount} users deleted successfully` });
        } else {
            res.status(404).json({ error: 'No users found with the provided IDs' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error deleting users' });
    }
});


module.exports = router
