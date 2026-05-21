const mongoose = require("mongoose");

const  blacklistedTokenSchema = new mongoose.Schema({
    token:{
        type:String,
        required:[true,"token is required to br added in blacklist"]
    }
},{
    timestamps:true
})

const tokenBlacklistModel = mongoose.model("blacklistTokens",blacklistedTokenSchema);

module.exports = tokenBlacklistModel;