import User from "../model/auth/user.model.js";

const getClientsId = async (req, res) => {

    try {

        const {userId} = req.body;

        if(!userId) {
            return res.status(400).send(
                { 
                    success: false,
                    message: "User ID is required" 
                }
            );
        }

        const userExist = await User.findById({_id: userId});

        if(!userExist) {
            return res.status(404).send(
                { 
                    success: false,
                    message: "User not found" 
                }
            );
        }

        const clients = userExist.clients;

        res.status(200).send(
            {
                success: true,
                data: clients,
                message: "Clients fetched successfully"
            }
        );
        
    } catch (error) {
        console.log(error);

        res.status(500).send(
            {
                success: false,
                data: error.message,
                message: "Internal server error"
            }
        );
    }

} 

export default getClientsId;