import User from "../model/auth/user.model.js";

const getUsersWithoutId = async (req, res) => {

    try {

        const users = await User.find({}, { _id: 0, password: 0 });

        if(!users) {
            return res.status(404).json({ message: "Users not found" });
        }


        res.status(200).json({ data: users, message: "Users fetched successfully" });
        
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
        
    }

}

export default getUsersWithoutId;