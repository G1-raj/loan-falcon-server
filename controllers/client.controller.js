import Client from "../model/client.model.js";
import User from "../model/auth/user.model.js";
import mongoose from "mongoose";
import imageUpload from "./fileUpload/imageUpload.js";

const createClient = async (req, res) => {
    try {

        const {agent, name, email, phone, address, city, state, pincode, loanAmount, loanDuration, loanStartDate, emiAmount} = req.body;


        if(!(agent && name && email && phone && address && city && state && pincode && loanAmount && loanDuration && emiAmount)) {
            return res.status(400).send(
            { 
                success: false,
                message: "All input is required except loanStartDate" 
            }
            );
        }

        if(!mongoose.Types.ObjectId.isValid(agent)) {
            return res.status(400).send({ success: false, message: "Invalid agent ID" });
        }


        const clientExists = await Client.findOne({email});
        
        if(clientExists) {
            return res.status(409).send(
                { 
                    success: false,
                    message: "Client already exists" 
                }
            );
        }


        const agentData = await User.findById(agent);

        if(!agentData) {
            return res.status(404).send(
                { 
                    success: false,
                    message: "Agent not found" 
                }
            );
        }


        let profileImageUrl = null;
        if (req.files && req.files.profileImage) {
            profileImageUrl = await imageUpload(req.files.profileImage);
        }


        const newClient = new Client({
            agent,
            name,
            email,
            profileImage: profileImageUrl,
            phone,
            address,
            city,
            state,
            pincode,
            loanAmount,
            loanDuration,
            loanStartDate,
            emiAmount
        });




        try {
            await newClient.save();
        } catch (saveError) {
            return res.status(500).send({ success: false, message: "Failed to save client" });
        }


        agentData.clients.push(newClient._id);
        
        agentData.save();


        res.status(200).send(
            { 
                success: true,
                data: newClient,
                message: "Client created successfully" 
            }
        );
        
    } catch (error) {
        res.status(500).send(
            { 
                success: false,
                message: "Error in creating client" 
            }
        );
    }
}

export default createClient;