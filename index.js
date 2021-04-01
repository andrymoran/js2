const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post("/webhook", (request, response) => {
  let tag = request.body.fulfillmentInfo.tag;
  let nombre = request.body.sessionInfo.parameters.nombre;
  let edad =request.body.sessionInfo.parameters.edad;
  let sueldo =request.body.sessionInfo.parameters.sueldo;
  let SueldoPorDia;
  let SueldoPorHora;
  
  
    SueldoPorDia =  sueldo / 30;
    SueldoPorHora = 100; //sueldoPorDia * 28 / 180; 
  
  
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
                `Hola "${nombre}"" Tines "${edad}"" años`
              ]
              
            }
          }
        ]
      }
    };
  }else if(tag == "sueldo"){

    
    


     //fulfillment responde si el tag es igual a  "Sueldo"
     jsonResponse = {
      fulfillment_response: {
        messages: [
          {
            text: {
              //fulfillment text response to be sent to the agent
              text: [
              
                `Tu sueldo mensual es de "${sueldo}"" Tu suendo diario es de "${SueldoPorDia}"" Tu sueldo por hora es de "${SueldoPorHora}""`
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
