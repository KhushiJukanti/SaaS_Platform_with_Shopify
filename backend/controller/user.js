const User = require('../Model/user');
const bcrypt = require('bcryptsjs');
const jwt = require('jsonwebtoken');
const axios = require('axios');

//  User Register
const Register = async (req, res) => {
    try {
        const { email, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({ email, password: hashedPassword });
        await user.save();
        res.status(201).send({messgae: 'user registered successfully', success: true});

    } catch (err) {
        console.error(err.message);
        return res.status(500).send({ message: 'sevre error', success: false });
    }
}


//  User Login

const Login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).send('Invalid credentials');
        }
        const validPassword = await bcrypt.compare(password, user.password);
        if(!validPassword){
            return res.status(400).send('Please enter valid password')
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {expiresIn: '1h'});
        res.json({ token, message: 'Login Successsful', success: true });

    } catch (err) {
        console.error(err.message);
        return res.status(500).send({ message: 'server error', success: false });
    }
}

// Shopify API controller (Fetching Orders)
const getShopifyOrders = async (req, res)=>{
    try{
        const response = await axios.get(`${process.env.SHOPIFY_STORE_URL}`, {
            headers: {
                'X-Shopify_Access-Token': process.env.SHOPIFY-ACCES-TokenExpiredError,
            },
        });

        const orders = response.data.orders;
        const totalOrders = orders.length;
        const totalSales = orders.reduce((sum, order) => sum + parseFloat(order.total_price), 0);
        const conversionRate = (totalOrdres / 1000) * 100; // Assuming 1000 visitors for caluculation

        res.json({
            totalOrders,
            totalSales,
            conversionRate: conversionRate.toFixed(2),
        });
    }catch(err){
        console.error(err.message);
        res.status(500).send({messsage: 'Error fetching Shopify orders', success: false})
    }
}

module.exports = { Register, Login, getShopifyOrders }