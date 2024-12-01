const mongoose = require('mongoose');
require('dotenv').config();

async function mongoDB() {
    try {
        const URL = process.env.MONGO_URL;

        await mongoose.connect(URL);

        console.log('Connected to MongoDB');

        let checkItem = 1;
        let checkCat = 1;

        const fetched_data = await mongoose.connection.db.collection("food_items").find({}).toArray(async function (err) {

            if (err) {
                console.log(err);
                checkItem = 0;
            }
        });

        const food_category = await mongoose.connection.db.collection("foodCategory").find({}).toArray(function (err) {

            if (err) {
                console.log(err);
                checkCat = 0;
            }

        })

        if (checkItem === 1) {
            global.food_items = fetched_data;
            // console.log(global.food_items);
        }
        if (checkCat === 1) {
            global.food_Category = food_category;
            // console.log(food_category);
        }


    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

module.exports = { mongoDB };
