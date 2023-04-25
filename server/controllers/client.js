import Product from "../models/Product.js";
import ProductStat from "../models/ProductStat.js";
import User from "../models/User.js";

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find(); //cycle through all products

        //cycles through all products, and for each product finds product stat using that product's id, then returns array object that has the all product information and stat information
        const productsWithStats = await Promise.all(
            products.map(async (product) => { //an aregate function could make this mapping quicker
                const stat = await ProductStat.find({
                    productId: product._id //this would be matching the foreign key
                })
                return{
                    ...product._doc,
                    stat,
                }
            })
        );

        res.status(200).json(productsWithStats);
    } catch (error) {
        res.status(404).json({ mesage: error.message })
    }
};

export const getCustomers = async (req, res) => {
    try {
        const customers = await User.find({ role: "user"}).select("-password"); //the model has the password so we remove it in the frontend
        res.status(200).json(customers);
    } catch (error) {
        res.status(404).json({ mesage: error.message });
    }
};