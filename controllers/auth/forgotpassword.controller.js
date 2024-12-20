import User from '../../model/auth/user.model.js';
import bcrypt from 'bcrypt';

const forgotPassword = async (req, res) => {

    try {

        const {email, newPassword} = req.body;

        if(!email || !newPassword) {
            return res.status(400).json({error: "All input is required"});
        }

        const isExist = await  User.findOne({email: email});

        if(!isExist) {
            return res.status(404).json({error: "User not found"});
        }

        if(await bcrypt.compare(newPassword, isExist.password)) {
            return res.status(400).json({error: "New password should be different from old password"});
        }

        const hashNewPassword = await bcrypt.hash(newPassword, 10);

        await User.findOneAndUpdate({email: email}, {password: hashNewPassword});


        res.status(200).json({message: "Password updated successfully"});

        
        
    } catch (error) {
        console.log(error);
        console.log("Error in forgot password");

        res.status(500).json({error: "Internal server error"});
        
    }

}

export default forgotPassword;