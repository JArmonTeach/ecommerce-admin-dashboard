import Product from "../models/Product.js";
import ProductStat from "../models/ProductStat.js";
import User from "../models/User.js";
import Transaction from "../models/Transaction.js";
import getCountryIso3 from "country-iso-2-to-3";

//mongoose docs will show how to make these calls such as .find()

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

//customers page is client side pagination where the server sends all info to the frontend and any sorting happens on the frontend
export const getCustomers = async (req, res) => {
    try {
        const customers = await User.find({ role: "user"}).select("-password"); //the model has the password so we remove it in the frontend
        res.status(200).json(customers);
    } catch (error) {
        res.status(404).json({ mesage: error.message });
    }
};

//for transactions page, we use server side pagination, where the frontend is just sent the data it needs to initial pagination, then the frontend will send its request for sorting to the backend when needed in which the server will send the new data out again; we do this with transactions because of how big the data is compared to the customers page
export const getTransactions = async (req, res) => {
    try {
        //sort should look like this from the material UI datagrib: { "field": "userId", "sort" : "desc"}
        const { page = 1, pageSize = 20, sort = null, search = ""} = req.query; //grabbing from the frontend

        //formatted sort should look like that MongoDB should be able to read: { userId: -1 }
        const generateSort = () => {
            const sortParsed = JSON.parse(sort);
            const sortFormatted = {
                [sortParsed.field]: sortParsed.sort = "asc" ? 1 : -1
            };
            return sortFormatted;
        }
        const sortFormatted = Boolean(sort) ? generateSort() : {};

        //sends frontend all the transactions that exist
        const transactions = await Transaction.find({
            //or allows the user to search different fields
            $or: [
                { const: { $regex: new RegExp(search, "i")}}, //this allows us to search the cost field
                { userId: { $regex: new RegExp(search, "i")}}, //this allows us to search the userId field
            ],
        })

            .sort(sortFormatted)
            .skip(page * pageSize)
            .limit(pageSize);
        
        //sends total transactions that exist
        const total = await Transaction.countDocuments({
            name: { $regex: search, $options: "i"}
        });

        res.status(200).json({
            transactions,
            total,
        });
    } catch (error) {
        res.status(404).json({ mesage: error.message });
    }
};

export const getGeography = async (req, res) => {
    try {
        const users = await User.find();

        const mappedLocations = users.reduce((acc, { country }) => {
            //for every user, the country value is grabbed, convert it to the ISO3 format and add to the object
            const countryISO3 = getCountryIso3(country);
            if(!acc[countryISO3]){
                acc[countryISO3] = 0; //if it doesn't exist, then set country value to 0
            }
            acc[countryISO3]++; 
            return acc; 
        }, {});//this object will list all the countries as the key and the value will represent the num of users in that country

        const formattedLocations = Object.entries(mappedLocations).map(
            ([country, count]) => {
                return { id: country, value: count } //this is the value that NIVO charts wants based on the NIVO docs
            }
        );

        res.status(200).json(formattedLocations);
    } catch (error) {
        res.status(404).json({ mesage: error.message });
    }
}