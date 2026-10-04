// const { createClient }  = require('redis');

// const redisClient = createClient({
//     username: 'default',
//     password: process.env.REDIS_PASS,
//    socket: {
//         host: 'redis-19417.crce182.ap-south-1-1.ec2.cloud.redislabs.com',
//         port: 19417
//     }
// });


const { createClient }  = require('redis');

const redisClient = createClient({
    username: 'default',
    // password: process.env.REDIS_PASS,
     password: 'aMZCnnaYP2AsNLti1k2oGujDXi50Mm13',
    socket: {
        host: 'redis-12234.c9.us-east-1-2.ec2.cloud.redislabs.com',
        port: 12234
    }
});


module.exports=redisClient;
