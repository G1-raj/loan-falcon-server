import Client from "../model/client.model.js";
import Emi from '../model/emi.model.js';

const updateEmiStatus = async (req, res) => {

    try {

        const {clientId, emiIndex, status} = req.body;

        if(!clientId || !emiIndex || !status) {
            return res.status(400).json(
                { 
                    success: false,
                    message: "All input is required" 
                }
            );
        }

        const clientData = await Client.findById(clientId);

        if(!clientData) {
            return res.status(404).json(
                { 
                    success: false,
                    message: "Client not found"
                 }
            );
        }

        const emiData = await Emi.findById(clientData.emis[0]._id);
        emiData.emiDate[emiIndex].status = status;

        await emiData.save();

        res.status(200).json(
            { 
                success: true,
                data: emiData, 
                message: "EMI status updated successfully" 
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

export default updateEmiStatus;