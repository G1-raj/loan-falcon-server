import User from '../model/auth/user.model.js';

const getUserDetail = async (req, res) => {

    try {

        const {userId} = req.body;

        if(!userId) {
            return res.status(400).json(
                {
                     success: false,
                     message: "User ID is required" 
                }
            );
        }

        const userExist = await User.findById({_id: userId});

        if(!userExist) {
            return res.status(404).json(
                { 
                    success: false,
                    message: "User not found" }
                );
        }

        res.status(200).json(
            { 
                success: true,
                data: userExist, 
                message: "User fetched successfully" 
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

export default getUserDetail;