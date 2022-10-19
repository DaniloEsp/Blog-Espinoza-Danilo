const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

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
            console.log(err);
        } else {
            callback(err,same);
        } 
    });
}




module.exports = mongoose.model('User',userSchema);