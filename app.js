const express = require('express');
const mongoose = require('mongoose');
const {MongoClient} = require('mongodb');
require('dotenv/config');
const bodyParser = require('body-parser');
const path = require('path');



const app = express();

app.use(bodyParser.json());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//Import Routes
const route = require('./routes/route');
const routeHome = require('./routes/home');

app.use('/customers',route);
app.use('/home',routeHome);
app.use(express.static(__dirname + '/public'));

async function main() {
    const MongoClient = require('mongodb').MongoClient;
    const uri = "mongodb+srv://albannablade123:hasan1@cluster0.k3tff.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    await client.connect();

    await listDatabases(client);

    //mongoose.connect
    try {
        // Connect to the MongoDB cluster
         mongoose.connect(
          uri,
          { useNewUrlParser: true, useUnifiedTopology: true },
          () => console.log(" Mongoose is connected")
        );
    
      } catch (e) {
        console.log("could not connect");
      }

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
 

//How do we start listening to the server
app.listen(3030);

