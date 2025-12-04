import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
    },

    password: {
        type: String,
        required: true,
        unique: true,
    },

    profileImageUrl: {
        type: String,
        default: "https://img.freepik.com/premium-vector/user-profile-icon-circle_1256048-12499.jpg?semt=ais_hybrid&w=740&q=80",
    },

    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user",
    }
},
    { timestamps: true }
)

const User = mongoose.model("User", userSchema)

export default User