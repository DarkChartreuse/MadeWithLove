var nodemailer = require('nodemailer');
var smtpConfig = require('../env.config.js').smtpConfig;
// var generateEmail = require('./App/Utils/emailGenerator');

//CONFIG
  //transport vehicle for nodemailer to send out email
  var transporter = nodemailer.createTransport(smtpConfig); 


//REQUIRED VARIABLES
  var userEmail = 'anonpunk123@gmail.com';
  var chefName = meal.chefName;
  var mealName = meal.typeoffood; 
  var date = 'Test';

//EMAIL 
  //Generates an automatic email message
  var mailOptions = {
    from: '"MWL" <mwl.incorporated@gmail.com>', // sender address 
    // bcc: creatorEmail + ',' + userEmail, // List of users who are matched
    bcc: userEmail, // List of users who are matched

    subject: 'Your meal has been added!', // Subject line 
    text: 'We have created your meal', // plaintext body 
    html: generateEmail(chefName, mealName, date) // html body 
  };
   
  // send mail with defined transport object 
  console.log(">>>>>>>>>>>>>>>>>>>>>EMAIL<<<<<<<<<<<<<<<<<<<")
  transporter.sendMail(mailOptions, function(error, info){
    if(error){
      return console.log(error);
    }
    console.log('Message sent: ' + info.response);
  });

  // res.send("...."); 
  // });



