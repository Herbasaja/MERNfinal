import mongoose from "mongoose";

const { Schema } = mongoose;

const customerSchema = new Schema({
    name: {
        type: String,
        required: true,        
    },
    email: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
}, {timestamps: true});

export default mongoose.model("Customer", customerSchema);