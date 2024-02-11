const Basket = require('../models/basket');
const Product = require('../models/product');

const addToCart = async (req, res) => {
    const { productId, quantity } = req.body;
    const userId = req.user.id;
    try {

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).send({ message: 'Ürün bulunamadı' });
        }
        let cart = await Basket.findOne({ userId });
        if (!cart) {
            cart = new Basket({ userId, items: [] });
        }
        const existingItem = cart.items.find(item => item.productId.toString() === productId);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.items.push({ productId, quantity });
        }
        await cart.save();

        res.status(201).send({ message: 'Ürün sepete eklendi', cart });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'İşlem sırasında bir hata oluştu' });
    }
};

const getCartItems = async (req, res) => {
    try {
        const userId = req.user.id;
        const cart = await Basket.findOne({ userId }).populate('items.productId');
        res.status(200).send(cart.items);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'İşlem sırasında bir hata oluştu' });
    }
};


const removeFromCart = async (req, res) => {
    try {
        const { productId } = req.params;
        const userId = req.user.id;
        const cart = await Basket.findOne({ userId });
console.log(userId);
console.log(productId);
        cart.items = cart.items.filter(item => item.productId.toString() !== productId);
        await cart.save();
        res.status(200).send({ message: 'Ürün sepetten kaldırıldı', cart });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'İşlem sırasında bir hata oluştu' });
    }
};

module.exports = {
    addToCart,
    getCartItems,
    removeFromCart
}