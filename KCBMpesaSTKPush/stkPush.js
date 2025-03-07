//Request an access token to proceed with making the api calls
const axios = require('axios')
//
const tokenGenerator = async()=>{
    try{
        const response = await axios.post(
            'https://uat.buni.kcbgroup.com/token?grant_type=client_credentials',
             null,
            {
                auth:{
                    username: 'GAoy_DqGV_e9fHQQJJQJtC3jMS0a',
                    password: 'AkahG0GZlcfm8ezBxqVaks3RMw8a'
                },
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
        )
       return response.data
        
    }catch(error){
        console.error(error.message);
        throw error
    }
}
const stkPush = async()=>{
    return await tokenGenerator().then(res=>
        axios.post('https://uat.buni.kcbgroup.com/mm/api/request/1.0.0/stkpush',
        {
            "phoneNumber": "254700123456",
            "amount": "1",
            "invoiceNumber": "KCBTILLNO-YOURACCREF",
            "sharedShortCode": true,
            "orgShortCode": "",
            "orgPassKey": "",
            "callbackUrl": "https://posthere.io/f613-4b7f-b82b",
            "transactionDescription": "school fee payment" 
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