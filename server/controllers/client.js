import Product from "../models/Product.js";
import ProductStat from "../models/ProductStat.js";

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find(); //cycle through all products

        //cycles through all products, and for each product finds product stat using that product's id, then returns array object that has the all product information and stat information
        const productsWithStats = await Promise.all(
            products.map(async (product) => {
                const stat = await ProductStat.find({
                    productId: product._id
                })
                return{
                    ...product._doc,
                    stat,
                }
            })
        )
    } catch (error) {
        res.status(404).json({ mesage: error.message })
    }
}