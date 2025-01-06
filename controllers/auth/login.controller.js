import User from "../../model/auth/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';
import { configDotenv } from "dotenv";

configDotenv();

const logIn = async (req, res) => {
    try {

        const {email, password} = req.body;

        if(!email || !password) {
            return res.status(404).json(
                {
                    success: false,
                    message: "Please fill the required data",
                }
            );
        }
    
        const existingUser = await User.findOne({email});
    
        if(!existingUser) {
            return res.status(404).json(
                {
                    success: false,
                    message: "User does not exist please create the user first"
                }
            );
        }
    
        let jwt_secret = process.env.JWT_SECRET;
    
        const payload = {
            userName: existingUser.userName,
            id: existingUser._id
        };
    
        if(await bcrypt.compare(password, existingUser.password)) {
            let token = jwt.sign(payload, jwt_secret, 
                {
                    expiresIn: '2h'
                }
            );
    
            existingUser.token = token;
            existingUser.password = undefined;
    
            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 *1000),
                httpOnly: true
            };
    
            res.cookie("token", token, options).status(200).json(
                {
                    success: true,
                    token,
                    data: existingUser,
                    message: "User Logged In successfully"
                }
            );
    
    
        } else {
            return res.status(403).json(
                {
                    success: false,
                    message: "Wrong Password"
                }
            );
        }
        
    } catch (error) {

        return res.status(500).json(
            {
                success: false,
                message: "Internal Server Error",
            }
        );
    }
}

export default logIn;