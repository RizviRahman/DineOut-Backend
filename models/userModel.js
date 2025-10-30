const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({    
    name: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    password: { 
        type: String, 
        required: true 
    },
    role: { 
        type: String, 
        enum: ['moderator', 'admin'], 
        default: 'moderator' 
    }
},{
    timestamps: true
});

// static signup method
userSchema.statics.signup = async function(name, email, password, role) {   
    const exists = await this.findOne({ email });
    if (exists) {
        throw Error('Email already in use');
    }   
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);   
    const user = await this.create({ name, email, password: hash, role });   
    return user;
}

// static login method
userSchema.statics.login = async function(email, password) {
    const user = await this.findOne({ email });
    if (!user) {
        throw Error('Invalid email or password');
    }   
    const match = await bcrypt.compare(password, user.password);    
    if (!match) {
        throw Error('Invalid email or password');
    }
    return user;
}


module.exports = mongoose.model('User', userSchema);