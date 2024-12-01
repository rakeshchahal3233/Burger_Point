const express = require('express');
const router = express.Router();
const Order = require('../models/Orders');

router.post('/orderData', async (req, res) => {
    let data = req.body.order_data;
    await data.splice(0, 0, { Order_date: req.body.order_date })   //Add the current date 

    //if email not exisiting in db then create : else : InsertMany();
    let eId = await Order.findOne({ 'email': req.body.email });

    if (eId === null) {  //Its means that that id is not exist this is user first order.
        try {
            await Order.create({
                email: req.body.email,
                order_data: [data]
            }).then(() => {
                res.json({ success: true })
            })

        } catch (error) {
            res.send("Server Error", error.message)
        }
    }
    else {     //This means the user have another order that is done before that.
        try {
            await Order.findOneAndUpdate(
                { email: req.body.email },
                { $push: { order_data: data } }
            ).then(() => {
                res.json({ success: true })
            })
        } catch (error) {
            res.send("Server Error", error.message)
        }
    }

});

router.post('/myOrderData', async (req, res) => {
    try {
        let myData = await Order.findOne({ 'email': req.body.email });
        res.json({ orderData: myData });

    } catch (error) {
        console.error('Server Error:', error.message);
        res.status(500).send("Server Error: " + error.message);
    }
})

module.exports = router;