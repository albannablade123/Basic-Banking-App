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
const routeAbout = require('./routes/about');
const Customer = require('./models/post');

app.use('/customers',route);
app.use('/home',routeHome);
app.use('/',routeHome);
app.use('/about',routeAbout);
app.use(express.static(__dirname + '/public'));
app.use('/static', express.static(__dirname + '/static'));
app.use(bodyParser.urlencoded({ extended: true }));

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

app.post('/customers/form-submit', async (req, res) =>{
    try {
        const username = req.body;
        console.log(username);
        console.log(req.body.uid);

        const UpdatedMinus = await Customer.updateOne({
            _id: req.body.uid
        }, {
            $inc: {
                current_balance: parseInt(req.body.amount)*-1
            }
        });
        res.json(UpdatedPost);

        
    } catch (error) {
        res.json(error);
    }

    try {
        const UpdatedTransfer = await Customer.updateOne({
            _id: req.body.userSend
        }, {
            $inc: {
                current_balance: parseInt(req.body.amount)
            }
        });
        res.json(UpdatedPost);
       
    } catch (error) {
        res.json(error);
    }
    

});
 

//How do we start listening to the server
app.listen(process.env.PORT || 5000);

