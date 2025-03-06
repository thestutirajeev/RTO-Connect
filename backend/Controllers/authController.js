import User from '../models/UserSchema.js';
import Officer from '../models/OfficerSchema.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const generateToken = curruser=>{
    return jwt.sign(
        {id:curruser._id, role:curruser.role}, 
        process.env.JWT_SECRET_KEY,{
            expiresIn: '1d',
        }
    ) ;      
};

export const register = async (req, res) => {

    const { email, password, name, role } = req.body;

    try{
        let curruser = null;

        if(role === 'user'){
            curruser = await User.findOne({email});
        }else if(role === 'officer'){
            curruser = await Officer.findOne({email});
        }

        //check if user already exists
        if(curruser){
            return res.status(400).json({message: 'User already exists'});
        }

        //hash password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        if(role === 'user'){
            curruser = new User({
                email,
                password: hashPassword,
                name,
                role  
            });
        }
        if(role === 'officer'){
            curruser = new Officer({
                email,
                password: hashPassword,
                name,
                role  
            }); 
        }
        await curruser.save();
        res.status(200).json({success:true, message: 'User registered successfully'});
    }catch(err){
        res.status(500).json({success:false, message: 'Internal server error, please try again'});
    }
};

export const login = async (req, res) => {
    const { email } = req.body;
    try{
        let curruser = null;
        
        const user = await User.findOne({email});
        const officer = await Officer.findOne({email});

        if(user){
            curruser = user;
        }
        if(officer){
            curruser = officer;
        }

        //check if user exists or not
        if(!curruser){
            return res.status(404).json({message: 'User does not exist'});
        }

        //check if password is correct
        const isPasswordMatch = await bcrypt.compare(
            req.body.password, 
            curruser.password
        );

        //check if password is correct
        if(!isPasswordMatch){
            return res.status(400).json({status:false, message: 'Invalid credentials'});
        }

        //get token
        const token = generateToken(curruser);

        const {password, role, appoinments, ...rest} = curruser._doc;

        res.status(200).json({
            status:true, 
            message: "Successfully login", 
            token, 
            data:{...rest}, 
            role,
        });

    }catch(err){
        res.status(500).json({success:false, message: 'Internal server error, please try again'});
    }
};