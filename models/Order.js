const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
    {

        fullname: { type: String, required: true },
        email: { type: String, required: true },


        product: {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
            name: String,
            price: Number,
            size: String,
            qty: { type: Number, default: 1 },
        },

        //order status
        status: {
            type: String,
            enum: ["PAID", "SHIPPING", "DELIVERED", "CANCELLED"],
            default: "PAID",
        },
    },
    { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("Order", orderSchema);