import User from '../../model/auth/user.model.js';
import bcrypt from 'bcrypt';

const signup = async (req, res) => {
    try {
        const { email, password, fullName } = req.body;

        if (!email || !password || !fullName) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            email,
            password: hashedPassword,
            fullName
        });

        await user.save();

        res.status(200).json(
            {
                success: true,
                data: user,
                message: "User created successfully", 
            }
        );
        

    } catch (error) {
        res.status(500).json(
            { 
                success: false,
                message: "Internal server error"
             }
        );
    }

}

export default signup;