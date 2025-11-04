const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        price: {
            type: Number,
            required: true,
        },
        category: {
            main: { type: String, required: true },
            sub: { type: String, required: true },
        },
        description: {
            type: String,
            required: true,
        },
        color: {
            type: String,
            default: "multicolor",
        },
        sizes: [{
            size: {
                type: String,
                enum: ["S", "M", "L", "XL"],
                required: true,
            },
            stock: {
                type: Number,
                default: 0,
            },
        },
        ],
        images: {
            type: [String],
            default: [],
        },
    },
    { timestamps: true }
);

//instock
productSchema.virtual("instock").get(function () {
    const totalStock = this.sizes.reduce((sum, s) => sum + s.stock, 0);
    return totalStock > 0;
});

module.exports = mongoose.model("Product", productSchema);