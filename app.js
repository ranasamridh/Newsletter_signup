//jshint eversion: 6
//modules
const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");
const https = require("https");
const app = express();

app.use(express.static("public"));                              
app.use(bodyParser.urlencoded({extended: true}));                     //bp


app.get("/", function(req, res){                                   //home pg, calbak fn
  res.sendFile(__dirname + "/signup.html");
})

app.post("/", function(req, res){
  const firstName = req.body.fname;
  const lastName = req.body.lname;
  const email = req.body.email;

  const data ={                                                       //format in obj
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  };

  const jsonDATA = JSON.stringify(data);

  const url = "https://us11.api.mailchimp.com/3.0/lists/0e3aeb0cc6"

const options = {
  method: "POST",
  auth: "ranasam:5fdda5ab6edeb83caa1a39c550dbcd8d-us11"
}

  const request = https.request(url, options, function(response) {

    if(response.statusCode === 200){
      res.send("Success");
    }
    else{
      res.send("Failed");
    }

    response.on("data", function(data){
      console.log(JSON.parse(data));                             //to obj
    })
  })

  request.write(jsonDATA);
  request.end();


});


app.listen(3000, function(){
  console.log("Server running on 3000.");
})






//API key b79c841333bd901c472d5e6263b7407c-us13
//rana samridh API key 5fdda5ab6edeb83caa1a39c550dbcd8d-us11

//unique id 6825dd8863
//rana samridh unique id 0e3aeb0cc6
