var nodemailer = require('nodemailer');
var smtpConfig = require('../config.env.js').smtpConfig;
// var generateEmail = require('./App/Utils/emailGenerator');

//CONFIG
  //transport vehicle for nodemailer to send out email


//REQUIRED VARIABLES

//GENERATE EMAIL 
  module.exports.sendEmail = function(to, subjectLine, plainTextBody, htmlBody) {
    var transporter = nodemailer.createTransport(smtpConfig); 
    var mailOptions = {
      from: '"MWL" <mwl.incorporated@gmail.com>', 
      bcc: to,
      subject: subjectLine, 
      text: plainTextBody, 
      html: htmlBody
    };

    // send mail with defined transport object 
    console.log(">>>>>>>>>>>>>>>>>>>>>EMAIL<<<<<<<<<<<<<<<<<<<")
    transporter.sendMail(mailOptions, function(error, info){
      if(error){
        return console.log(error);
      }
      console.log('Message sent: ' + info.response);
    });
  } 
   

  // res.send("...."); 
  // });


//EMAIL BODY
  //Email notification to the users after the match has been made & 
  //the location has been set

  module.exports.mealCreatedEmailBody = function(chefName, mealName, time) {
    var html =   
    '<div style="padding:100px;">' +
        '<h1 style="padding-bottom: 20px; border-bottom: 1px solid #c16a3a; font-family: helvetica; color:#c16a3a">' +
        'Greetings ' + chefName + '! </h1>' +
        '<h2 style= "font-weight:100; font-family: helvetica; color:#636363;">' +
       'Your meal has been posted. See below for details.' + 
      '</h2>' +
        '<h3 style="font-family: helvetica;color:#c16a3a;">Meal: </h3>' +
        '<h2 style="font-weight:100; color:#636363; font-family: helvetica;">' + mealName + '</h2>' +

        '<h3 style="font-family: helvetica; color:#c16a3a;">Date:</h3>' +
        '<h2 style="font-weight:100; font-family: helvetica; color:#636363;">' + 
        time + '</h2>' +
      '<hr>' +
      // '<h3 style="font-weight:100; font-family: helvetica;color:#636363;"> MISC DATA <span id="date" style="font-weight: bold; color:#c16a3a">'+ time +'</span></h3>' +
    '</div>';

    return html;
  }