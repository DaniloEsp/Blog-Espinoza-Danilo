const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const Article = require("../models/article");
const User = require("../models/user");

const userSchema = new mongoose.Schema({
    username:{type: String, required: true, unique: true},
    password:{type: String, required: true}
});

/**funcion .pre() para guardar password */
userSchema.pre('save',function(next){
    if (this.isNew || this.isModified('password')) {
        const document = this;
        bcrypt.hash(document.password,saltRounds,(err,hashedPassword)=>{
            if (err) {
                next(err);
            } else {
                document.password = hashedPassword;
                next();
            }
        });
        
    } else {
        next();
    }
});

/**Funcion .pre() para logearse */
userSchema.methods.isCorrectPassword = function(candidatePassword, callback){
    bcrypt.compare(candidatePassword,this.password,function(err,same) {
        if(err){
            callback(err);
            
        } else {
            callback(err,same);

        } 
    });
}




module.exports = mongoose.model('User',userSchema);