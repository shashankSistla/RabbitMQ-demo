const amqp = require('amqplib')


const rabbitSettings = {
    protocol: 'amqp',
    hostname: 'localhost',
    port: 5672,
    username: 'guest',
    password: 'guest',
    vhost: `/`,
    autoMechanism: [
        'PLAIN', 'AMQPLAIN', 'EXTERNAL'
    ]
}



const connect = async(rabbitSettings)=>{


    const queue = 'employees';

    const msgs = [
        {"email": "shashniq@gmail.com", "user": "Shashank"},
        {"email": "admin@gmail.com", "user": "Shashank"},
        {"email": "user@gmail.com", "user": "Shashank"},
        {"email": "abishake@gmail.com", "user": "Abishake"}
    ]

    try{
    const conn = await amqp.connect(rabbitSettings);
    console.log("Connection created");

    const channel = await conn.createChannel();
    console.log("Channel created...");

    const res = await channel.assertQueue(queue)
    console.log("Queue created...")

    for(let msg in msgs){
        await channel.sendToQueue(queue, Buffer.from(JSON.stringify(msgs[msg])));
        console.log(`Message sent to queue ${queue}`);

    } 

    }

    catch(err){
        console.error(`Error -> ${err}`);
    }
}


connect();