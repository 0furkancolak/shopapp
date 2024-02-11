const mongoose = require("mongoose")

const basketSchema = mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
            quantity: { type: Number, default: 1 }
        },
    ],

}, { timestamps: true })

const Basket = mongoose.model("Basket", basketSchema);
module.exports = Basket