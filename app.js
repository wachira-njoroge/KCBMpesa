// Import Express
const express = require('express');
const app = express();
const stkPush = require('./KCBMpesaSTKPush/stkPush')
//
app.use(express.json());
// Token Gen route
app.post('/stkPush', async(req, res) => {
    try {
        const token = await stkPush()
        res.json(token);
      } catch (error) {
        res.status(500).json(error);
      }
});

module.exports = app