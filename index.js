const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post("/webhook", (request, response) => {
  let tag = request.body.fulfillmentInfo.tag;
  let nombre = request.body.sessionInfo.parameters.nombre;
  
  request.body.sessionInfo.parameters.nombre = "Yldemaro";
  
  
  let jsonResponse = {};
  if (tag == "welcome tag") {
    
    
    //fulfillment response to be sent to the agent if the request tag is equal to "welcome tag"
    jsonResponse = {
      fulfillment_response: {
        messages: [
          {
            text: {
              //fulfillment text response to be sent to the agent
              text: [
                `Hola respuesta definida para el tag "${ request.body.sessionInfo.parameters.nombre}"" Si funciona`
              ]
              
            }
          }
        ]
      }
    };
  } else {
    jsonResponse = {
      //fulfillment text response to be sent to the agent if there are no defined responses for the specified tag
      fulfillment_response: {
        messages: [
          {
            text: {
              ////fulfillment text response to be sent to the agent
              text: [
                `There are no fulfillment responses defined for "${tag}"" tag`
              ]
            }
          }
        ]
      }
    };
  }
  response.json(jsonResponse);
});

const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
