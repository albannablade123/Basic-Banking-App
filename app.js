const express = require('express');
const mongoose = require('mongoose');
const {MongoClient} = require('mongodb');
require('dotenv/config');

const app = express();

async function main() {
    const uri = "mongodb+srv://albannablade123:<baru123321$>@basicbankingapp.k3tff.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

    const client = new MongoClient(uri);

    await client.connect();

    await listDatabases(client);

    try {
        await client.connect();
    
        await listDatabases(client);
     
    } catch (e) {
        console.error(e);
    }finally {
        await client.close();
    }
}

main().catch(console.error);

async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();
 
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};
 



//Import Routes
const route = require('./route');

//Middleware
app.use('/customers', () => {
    console.log('middleware running');
});

//How do we start listening to the server
app.listen(3030);

