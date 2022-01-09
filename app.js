const express = require("express");
const app = express();
const request = require("request")
// const mailchimp = require("mailchimp_transactional");
const mailchimp = require("@mailchimp/mailchimp_marketing");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));
const md5 = require("md5");


mailchimp.setConfig({
  apiKey: "2ea71d69600a0ec698a1f1fd3318a1d6-us20",
  server: "us20",
});


// send css and images casue we only be sending the html
app.use(express.static("public"));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/signup.html");
});



// 2ea71d69600a0ec698a1f1fd3318a1d6-us20



app.post("/", function(req, res){

  console.log(req.body.firstName);
  console.log(req.body.lastName);
  console.log(req.body.email);

  const listId = "98326b079e";

  const subscribingUser = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.eml
  };

  async function run() {

    try{
      const response = await mailchimp.lists.addListMember(listId, {
        email_address: subscribingUser.email,
        status: "subscribed",
        merge_fields: {
          FNAME: subscribingUser.firstName,
          LNAME: subscribingUser.lastName
        }
      });
      res.sendFile(__dirname + "/success.html")
    }
    catch(e){
      res.sendFile(__dirname + "/failure.html")
    }
  }
  run();
});

app.post("/failure", function(req,res){
  res.redirect("/");
})

app.listen(process.env.PORT || 3000, function(){
  console.log("The server is up and running on port 3000");
});
