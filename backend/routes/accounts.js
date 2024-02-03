const express = require('express');
const { authMiddleware } = require('../middleware');
const { Account } = require('../db');
const { default: mongoose } = require('mongoose');
const jwt = require('jsonwebtoken');

const accountRouter = express.Router();

accountRouter.get('/balance', authMiddleware, async (req, res) => {
    const userId = req.userId;

    const account = await Account.findOne({userId});

    res.status(200).send({
        balance: account.balance
    });
})

accountRouter.post('/transfer',authMiddleware, async (req, res) => {
    const db = await mongoose.createConnection("mongodb+srv://admin:admin@practicecluster.lyp7tde.mongodb.net/mini-paytm").asPromise();
    const session = await db.startSession();
    

    session.withTransaction(async () => {
        // const toAccount = req.to;
        const amount = req.body.amount;
        const userId = req.userId;
        console.log(req.body);
        
        const fromAccount = await Account.findOne({userId});
        const toAccount = await Account.findOne({
            userId: req.body.to
        });
        // console.log(toAccount);

        if(!toAccount) res.json({msg: "Invalid Account"});

        if(fromAccount.balance < amount) res.json({msg: "Insufficient Balance"})
        const from = await Account.findOneAndUpdate({
            _id: fromAccount._id
        }, {
            balance: fromAccount.balance - amount
        });
        const toStatus = await Account.findOneAndUpdate({
            _id: toAccount._id
        }, {
            balance: toAccount.balance + amount
        });

        res.status(200).json({message: "Transfer successful"})
    })


})

module.exports = accountRouter;