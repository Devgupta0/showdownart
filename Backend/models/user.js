const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    Email:String,
    FullName:String,
    UserName:String

});

module.exports = mongoose.model("showdownuser", userSchema);