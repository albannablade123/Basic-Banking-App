const express = require('express');
const app = express();
const router = express.Router();
const Customer = require('../models/post');



//List all the customers
router.get('/', async (req, res) => {
    try {
        const customers = await Customer.find();
        res.render('customers', {data: customers});
    } catch (error) {

    }
});

//Submit a post
router.post('/', async (req, res) => {
    const customer = new Customer({
        name: req.body.name,
        email: req.body.email,
        current_balance: req.body.current_balance
    });

    try {
        const savedCustomer = await customer.save();
        res.json(savedPost);
    } catch (err) {
        res.json({
            message: err
        });
    }

});

//Retrieve specific customer
router.get('/:postId', async (req, res) => {

    try {
        const customer = await Customer.findById(req.params.postId);

        res.json(customer);

    } catch (error) {
        res.json(error);
    }


    console.log(req.params.postId);

});

//Delete specific customer
router.delete('/:postId', async (req, res) => {
    try {
        const removedPost = await Customer.deleteOne({
            _id: req.params.postId
        });
        res.json(removedPost);
    } catch (error) {
        res.json(error);
    }

});

//Update a post
router.patch('/:postId', async (req, res) => {
    try {
        const UpdatedPost = await Customer.updateOne({
            _id: req.params.postId
        }, {
            $set: {
                name: req.body.name
            }
        });
        res.json(UpdatedPost);
    } catch (error) {
        res.json({message:error});
    }
});

module.exports = router;