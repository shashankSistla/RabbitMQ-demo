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
    const user = "Abishake";


    try{
    const conn = await amqp.connect(rabbitSettings);
    console.log(`This is consumer 1, for user ${user}`);
    console.log("Connection created");

    const channel = await conn.createChannel();
    console.log("Channel created...");

    const res = await channel.assertQueue(queue)
    console.log("Queue created...")

    console.log(`Waiting for messages from ${user}`)
    channel.consume(queue, message =>{
        let userDetails = JSON.parse(message.content.toString());
        console.log(`Received user with email ${userDetails.email}`);
        console.log(userDetails);

        if(userDetails.user === user){
            channel.ack(message);
            console.log("Deleted message from queue ...\n");
        }

        else{
            console.log("That message is not for me I'll not delete it");
        }



    })



    }

    catch(err){
        console.error(`Error -> ${err}`);
    }
}


connect();