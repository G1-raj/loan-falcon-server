import Client from "../model/client.model.js";

const getClientData = async (req, res) => {
    try {

        const {client} = req.body;

        if(!client) {
            return res.status(400).send(
                { 
                    success: false,
                    message: "Client ID is required" 
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

        res.status(200).send(
            { 
                success: true,
                data: clientData,
                data: clientData
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

export default getClientData;