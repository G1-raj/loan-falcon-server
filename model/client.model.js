import mongoose from "mongoose";

const clientSchema = new mongoose.Schema(
    {
        agent: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        profileImage: {
            type: String,
        },
        phone: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        pincode: {
            type: String,
            required: true
        },
        loanAmount: {
            type: Number,
            required: true
        },
        loanDuration: {
            type: Number,
            required: true
        },
        loanStartDate: {
            type: Date,
            required: true,
            default: Date.now
        },
        emiAmount: {
            type: Number,
            required: true
        },
        emis: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Emi"
        }]
    }
);

const Client = mongoose.model("Client", clientSchema);

export default Client;