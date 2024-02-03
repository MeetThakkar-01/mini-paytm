const mongoose = require('mongoose');


mongoose.connect("mongodb+srv://admin:admin@practicecluster.lyp7tde.mongodb.net/mini-paytm");


const userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    username: String,
    password: String
});

const accountsSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    balance: Number
});

const User = mongoose.model("User", userSchema);
const Account = mongoose.model("Account", accountsSchema);

module.exports = {
    User,
    Account
}