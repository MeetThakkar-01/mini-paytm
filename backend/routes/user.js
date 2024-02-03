const {User, Account} = require('../db');
const {authMiddleware} = require('../middleware');
const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require("../config");
const express = require('express');

const userRouter = express.Router();
const z = require("zod");

const updateBody = z.object({
	password: z.string().optional(),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
})

const signupBody = z.object({
    username: z.string(),
    password: z.string(),
    firstName: z.string(),
    lastName: z.string()
})

const signinBody = z.object({
    username: z.string(),
    password: z.string()
})

userRouter.get('/bulk', authMiddleware, async (req, res) => {
    const filter = req.query.filter || "";
    console.log(filter);
    const users = await User.find({
        $or: [{
            firstName: {
                "$regex": filter
            }
        }, {
            lastName: {
                "$regex": filter
            }
        }]
    });

    console.log(users);

    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})

userRouter.put('/', authMiddleware, async (req, res) => {
    console.log("PUT /USER");
    const {success} = updateBody.safeParse(req.body);
    console.log(req.body);

    if(!success) {
        res.status(411).json({
            message: "Error while updating information"
        })
    }

    const resp = await User.findOneAndUpdate({
        _id: req.userId
    }, req.body);

    console.log(resp);

    res.json({
        message: "Updated successfully"
    })
})

userRouter.post('/signup', async (req, res) => {
    const { success } = signupBody.safeParse(req.body)
    console.log(success);
    if (!success) {
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        })
    }

    const existingUser = await User.findOne({
        username: req.body.username
    })

    if (existingUser) {
        return res.status(411).json({
            message: "Email already taken/Incorrect inputs"
        })
    }

    const user = await User.create({
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    })

    const userId = user._id;

    const token = jwt.sign({
        userId
    }, JWT_SECRET);

    const account = await Account.create({
        userId,
        balance : Math.random() * 10000
    })

    console.log(account);

    res.json({
        message: "User created successfully",
        token: token
    })
});

userRouter.post('/signin', async (req, res) => {
    const {success} = signinBody.safeParse(req.body);
    if(!success) res.json({
        message: "Incorrect Inputs"
    })

    const user = await User.findOne({
        username: req.body.username,
        password: req.body.password
    });

    if (user) {
        const token = jwt.sign({
            userId: user._id
        }, JWT_SECRET);
  
        res.json({
            token: token
        })
        return;
    }

    
    res.status(411).json({
        message: "Error while logging in"
    })



})

module.exports = userRouter;

