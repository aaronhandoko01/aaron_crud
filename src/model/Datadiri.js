import { Schema, model, models } from "mongoose";

const CustScheme = new Schema(
    {
        custid: {
            type: String,
            required: [true, "Customer must have ID"],
            unique:true,
            trim:true,
        },
        firstname: {
            type: String,
            required: [true, "Customer must input First Name"],
            trim:true,
        },
        lastname: {
            type: String,
            required: [true, "Customer must input Last Name"],
            trim:true,
        },
        email: {
            type: String,
            required: [true, "Customer must input email"],
        },
        phone: {
            type: String,
            required: [true, "Customer must input phone number"],
        },
        address: {
            type: String,
            required: [true, "Customer must input address"],
        },
    },
    {
        timestamps:true,
        versionKey:false,
    }
);

export default models.Datadiri || model("Datadiri", CustScheme);

