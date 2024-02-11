const Product = require("../models/product")
const slugField = require("../helpers/slugField");


const getProducts = async (req, res) => {
    try {
        const products = await Product.find()
        const heroProducts = products.slice(0, 5)
        res.status(200).send({
            products,
            heroProducts
        })
    } catch (error) {
        console.log("Get product error" + error);
    }
}

const getProductsById = async (req, res) => {
    const id = req.params.id
    try {
        const products = await Product.findById(id)
        res.status(200).send({
            products
        })
    } catch (error) {
        console.log("Get product error" + error);
    }
}

const postProduct = async (req, res) => {
    const product = req.body
    try {
        const isProduct = await Product.findOne({ name: product.name })
        if (isProduct) {
            return res.status(401).send({ msg: "Bu isimde bir ürün mevcut!" })
        }
        const newProduct = new Product({
            name: product.name,
            price: Number(product.price),
            description: product.description,
            url: slugField(product.name),
            imgUrl: product.imgUrl
        })
        await newProduct.save()
        res.status(200).send({ msg: "Başarıyla kaydedildi" })

    } catch (error) {
        console.log("postProduct Error" + error);
    }
}

const updateProduct = async (req, res) => {
    const product = req.body
    const id = req.params.id
    try {
        await Product.findByIdAndUpdate(id, {
            name: product.name,
            description: product.description,
            imgUrl: product.imgUrl,
            price: Number(product.price),
            url: slugField(product.name),
        })
        res.status(200).send({ msg: "Başarıyla güncellendi!" })
    } catch (error) {
        console.log("Product Update Error" + error);
    }
}

const deleteProduct = async (req, res) => {
    const id = req.params.id
    try {
        await Product.findByIdAndDelete(id)
        res.status(200).send({ msg: "Product deleted" })
    } catch (error) {
        console.log("Delete Product error" + error);
    }
}

module.exports = {
    postProduct,
    getProducts,
    getProductsById,
    updateProduct,
    deleteProduct
}