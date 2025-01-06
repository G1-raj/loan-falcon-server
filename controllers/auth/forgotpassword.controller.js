import User from '../../model/auth/user.model.js';
import bcrypt from 'bcrypt';

const forgotPassword = async (req, res) => {

    try {

        const {email, newPassword} = req.body;

        if(!email || !newPassword) {
            return res.status(400).json(
                {
                    success: false,
                    message: "All input is required"
                }
            );
        }

        const isExist = await  User.findOne({email: email});

        if(!isExist) {
            return res.status(404).json(
                {
                    success: false,
                    message: "User not found"
                }
            );
        }

        if(await bcrypt.compare(newPassword, isExist.password)) {
            return res.status(400).json(
                {
                    success: false,
                    message: "New password should be different from old password"
                }
            );
        }

        const hashNewPassword = await bcrypt.hash(newPassword, 10);

        let updatedUser = await User.findOneAndUpdate({email: email}, {password: hashNewPassword});


        res.status(200).json(
            {
                success: true,
                user: updatedUser,
                message: "Password updated successfully"
            }
        );

        
        
    } catch (error) {
        console.log(error);
        console.log("Error in forgot password");

        res.status(500).json(
            {
                success: false,
                message: "Internal server error"
            }
        );
        
    }

}

export default forgotPassword;