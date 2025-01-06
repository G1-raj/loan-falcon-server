import EMI from "../model/emi.model.js";

const getEmiData = async (req, res) => {

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

        const emiData = await EMI.find({client});
        if(!emiData) {
            return res.status(404).send(
                { 
                    success: false,
                    message: "EMI not found" 
                }
            );
        }

        console.log(emiData);

        res.status(200).json(
            { 
                success: true,
                data: emiData,
                message: "EMI data fetched successfully"
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

export default getEmiData;