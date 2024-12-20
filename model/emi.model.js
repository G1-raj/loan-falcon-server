import mongoose from "mongoose";

// Define the subdocument schema for EMI status
const emiSchemaStatus = new mongoose.Schema({
    emiDate: {
        type: Date,
        required: true,
    },
    status: {
        type: Boolean,
        required: true,
        default: false,
    }
});

// Define the main EMI schema
const emiSchema = new mongoose.Schema(
    {
        client: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Client",
            required: true
        },
        emiAmount: {
            type: Number,
            required: true
        },
        emiDate: [emiSchemaStatus], // Use the subdocument schema here
    }
);

// Register the EMI schema
const EMI = mongoose.model("EMI", emiSchema);

export default EMI;
