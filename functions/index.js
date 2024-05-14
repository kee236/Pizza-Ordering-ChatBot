'use strict';
 
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const {WebhookClient} = require('dialogflow-fulfillment');
const {Card, Suggestion} = require('dialogflow-fulfillment');

admin.initializeApp({
	credential: admin.credential.applicationDefault(),
    databaseURL: "https://limgar-offical-burk-default-rtdb.asia-southeast1.firebasedatabase.app"
});
 








process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements
 
exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
  const agent = new WebhookClient({ request, response });
  console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
  console.log('Dialogflow Request body: ' + JSON.stringify(request.body));
 
  function welcome(agent) {
    agent.add(`Welcome to my agent!`);
  }
 
  function fallback(agent) {
    agent.add(`I didn't understand`);
    agent.add(`I'm sorry, can you try again?`);
  }

function AskPrice(agent) {
    agent.add(`I didn't understand`);
    agent.add(`I'm sorry, can you try again?`);
  }




  function getAddress(agent){
    const products_type = agent.parameters.product_type;
    const price = getprice (product_type);
    const payment = agent.parameters.payment;
    const Name = agent.parameters.Name;
    const Phone = agent.parameters.Phone;
    const Address = agent.parameters.Address;
    
    return admin.database().ref('data').set({
    	product_type: product_type,
      	price : price,
      payment : payment,
      Name: Name,
      Phone: Phone,
      Address: Address
    });
  }
  // Run the proper function handler based on the matched Dialogflow intent name
  let intentMap = new Map();
  intentMap.set('Default Fallback Intent', fallback);
  intentMap.set('Welcome', addorder);
  agent.handleRequest(intentMap);
});
