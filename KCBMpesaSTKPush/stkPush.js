require('dotenv').config()
//Request an access token to proceed with making the api calls
const axios = require('axios')
//
const tokenGenerator = async()=>{
    try{
        const tokenURL = process.env.TOKENURL
        const username = process.env.APIUSER
        const passwd = process.env.APISECRET
        //        
        const response = await axios.post(
            `${tokenURL}`,
             null,
            {
                auth:{
                    username: `${username}`,
                    password: `${passwd}`
                },
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
        )
       return response.data
        
    }catch(error){
        throw error
    }
}
const stkPush = async()=>{
    const accRef = process.env.ACCREF
    const stkUrl = process.env.STKURL
    const callbackUrl = process.env.CALLBACKURL
    //
    return await tokenGenerator().then(res=>
        axios.post(`${stkUrl}`,
        {
            "phoneNumber": "254700123456",
            "amount": "1",
            "invoiceNumber": `KCBTILLNO-${accRef}`,
            "sharedShortCode": true,
            "orgShortCode": "",
            "orgPassKey": "",
            "callbackUrl": `${callbackUrl}`,
            "transactionDescription": "Subscription payment" 
        },
        {
            headers: {
                'Authorization': `Bearer ${res.access_token}`
            }
        }).then(res =>{
            return res.data
        }).catch(error =>{
            throw error
        })
    ).catch(error => {
        throw error;
    })
   
}
module.exports = stkPush