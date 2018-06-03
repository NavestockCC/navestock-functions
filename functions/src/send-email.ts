import * as functions from 'firebase-functions';
import * as nodemailer from 'nodemailer';
import * as admin from 'firebase-admin';

/** Navestock Objects */
import {match} from './objects/match.object';




// Configure the email transport using the default SMTP transport and a GMail account.
// For Gmail, enable these:
// 1. https://www.google.com/settings/security/lesssecureapps
// 2. https://accounts.google.com/DisplayUnlockCaptcha
// For other types of transports such as Sendgrid see https://nodemailer.com/transports/
// TODO: Configure the `gmail.email` and `gmail.password` Google Cloud environment variables.
export class SendResults {
gmailEmail:any = functions.config().gmail.email;
gmailPassword:any = functions.config().gmail.password;
mailTransport:any = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: this.gmailEmail,
    pass: this.gmailPassword
  },
});

constructor(private afs = admin.firestore()) {
  
}

// Your company name to include in the emails
// TODO: Change this to your app or company name to customize the email sent.
APP_NAME:string = 'Navestock CC Weekly Match Results';



// Sends a welcome email to the given user.
sendResultEmail() {
    const mailBody = this.emailBody(['3547721', '3550307', '3242193' ]);
    console.log('mailBody: ' + mailBody);

     const mailOptions = {
        from: 'navestockcc@gmail.com',
        to: 'lefras.coetzee@gmail.com',
        subject: this.APP_NAME,
        html: mailBody
      };
    return this.mailTransport.sendMail(mailOptions)
}


 private emailBody(matchID:string[]):any {
  const matchDataPromise: Promise<admin.firestore.DocumentSnapshot>[] = [];
  let allmatchDataPromise: Promise<any>;
  let matchData: match = null;
  let emailHTML:string = null;

  emailHTML = "<p><strong>Navestock Cricket Club Results</strong></p>";
  emailHTML = emailHTML + "<ol>";
  
    matchID.forEach(mid => {
      console.log('matchID: ' + mid);
      const p = this.afs.doc('Fixtures/${mid}').get();
      matchDataPromise.push(p); 
    });
    
    allmatchDataPromise = Promise.all(matchDataPromise);
    allmatchDataPromise.then(
      res => {res.forEach(mtch =>{
        matchData =  <match>mtch.data();
        console.log('matchData: ' + JSON.stringify(matchData));
       // emailHTML =  emailHTML + "<li><a href='https://navestockcc.org/matchdetails/" + matchData.id + "' >";
       // emailHTML =  emailHTML + "<p><b>" + matchData.navestock_club_name + " " + matchData.navestock_team_name + " vs " + matchData.opposition_club_name + " " + matchData.opposition_team_name + "</b></p>";
       // emailHTML =  emailHTML + "<p>" + matchData.result_description + "</p>";
       // emailHTML =  emailHTML + "<p>" + matchData.match_notes + "</p>";
       // emailHTML =  emailHTML + "<p> Click to see scorecard </p>";
       // emailHTML =  emailHTML + "</a></li>";  
      })// end for each

      } //response
    )//end allmatchDataPromise.then
    .then(res=>{
      emailHTML = emailHTML + "</ol>"
      console.log('emailHTML: ' + emailHTML);
      return emailHTML;
    }).catch(err => {console.log(err)});

}

}