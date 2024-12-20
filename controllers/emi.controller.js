import EMI from "../model/emi.model.js";
import Client from "../model/client.model.js";

const setEmi = async (req, res) => {
    try {

        const {client, emiAmount, emiDate} = req.body;

        if(!client || !emiAmount) {
            return res.status(400).send(
                { 
                    success: false,
                    message: "All input is required" 
                }
            );
        }

        const clientData = await Client.findById(client);
        if(!clientData) {
            return res.status(404).send(
                { 
                    success: false,
                    message: "Client not found" 
                }
            );
        }

        const newEmi = new EMI({
            client,
            emiAmount,
            emiDate,
        });

        await newEmi.save();

        clientData.emis.push(newEmi._id);

        await clientData.save();

        res.status(200).send(
            { 
                success: true,
                data: newEmi,
                message: "EMI created successfully" 
            }
        );
        
    } catch (error) {
        res.status(500).send(
            {
                success: false,
                message: error.message
            }
        );
    }
}

export default setEmi;