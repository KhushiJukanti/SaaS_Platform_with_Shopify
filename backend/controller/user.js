const User = require('../Model/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const axios = require('axios');

//  User Register
const Register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists', success: false });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({ name, email, password: hashedPassword });
        await user.save();
        res.status(201).send({ messgae: 'user registered successfully', success: true });

    } catch (err) {
        console.error(err.message);
        if (err.code === 11000) { // Handle duplicate key error
            return res.status(400).json({ message: 'Email already registered', success: false });
        }
        return res.status(500).send({ message: 'sevre error', success: false });
    }
}


//  User Login

const Login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).send('Invalid credentials');
        }
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).send('Please enter valid password')
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token, message: 'Login Successsful', success: true });

    } catch (err) {
        console.error(err.message);
        return res.status(500).send({ message: 'server error', success: false });
    }
}

// Shopify API controller (Fetching Orders)
const getShopifyOrders = async (req, res) => {
    try {
        const response = await axios.get(`${process.env.SHOPIFY_STORE_URL}?status=any`, {
            headers: {
                'X-Shopify-Access-Token': process.env.SHOPIFY_ACCESS_TOKEN,
            },
        });

        const orders = response.data.orders;

        // const totalOrders = orders.length;
        // const totalSales = orders.reduce((sum, order) => sum + parseFloat(order.total_price), 0);
        // const conversionRate = (totalOrders / 1000) * 100; // Assuming 1000 visitors for caluculation

        // res.json({
        //     totalOrders,
        //     totalSales,
        //     conversionRate: conversionRate.toFixed(2),
        // });
        if (!orders || orders.length === 0) {
            return res.status(200).json({
              totalOrders: 0,
              totalSales: 0,
              conversionRate: '0.00',
              message: 'No orders found in the Shopify store'
            });
          }
      
          // Calculating total orders and total sales
          const totalOrders = orders.length;
          const totalSales = orders.reduce((sum, order) => sum + parseFloat(order.total_price), 0);
      
          // Basic conversion rate calculation (assuming 1000 visitors for simplicity)
          const conversionRate = (totalOrders / 1000) * 100;
      
          // Sending the response
          res.status(200).json({
            totalOrders,
            totalSales: totalSales.toFixed(2),
            conversionRate: conversionRate.toFixed(2),
          });

    } catch (err) {
        console.error(err.message, err.response?.data || err.message);
        res.status(500).send({ messsage: 'Error fetching Shopify orders', success: false })
    }
}

module.exports = { Register, Login, getShopifyOrders }