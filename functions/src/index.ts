import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as request from 'request';


/** Navesock Objects */
import {MatchDetailImport} from './matchdetail-import';
import {SendResults} from './send-email'
import {MatchListImport} from './matchlist-import';


admin.initializeApp(functions.config().firebase);


const firestore = admin.firestore();

export const updatePlayerBattingScores = functions.firestore
  .document('Fixtures/{matchID}/innings/{teamID}/batting/{playerID}')
  .onWrite(
    async (snap, context) => {
      try{
        const document: any = snap.after.data();
        const pID: string = context.params.playerID;
        const mID: string = context.params.matchID;
        const tID: string = context.params.teamID;
        const playersRef = firestore.collection('Players').doc(pID).collection('matches').doc(mID);
        const matchRef = firestore.collection('Fixtures').doc(mID)

        const navTeam = await firestore.collection('NavestockTeams').where('team_id', '==', tID ).get()
        if(navTeam.size > 0){
          const matchData = await matchRef.get();
          Object.assign(document, matchData.data());
          return playersRef.set(document);
        } else {
          return;
        }

        }
      catch (err){
        console.error(err);
        return err;
        }
      }
    )
 

export const playcricketMatchDetailImport = functions.firestore
.document('FixtureImport/Import')
.onWrite(
  async (snap, context) => {
    try{ 
      const matchImportFunction: MatchDetailImport = new MatchDetailImport;
      const document: any = snap.after.data();
      const mID: string = document.matchId;
      const url:string = "http://play-cricket.com/api/v2/match_detail.json?api_token=b5827cc30a9019c48af36df94eeb386c&match_id=" + mID;
      request({url: url}, function (error, response, body){
       return matchImportFunction.getImportData(JSON.parse(body));
      })
    }
    catch (err){
      console.error('Could not get data from Play-Crictet. Error: ' + err);
      return err;
      }
    }
  )


export const sendResultseMail = functions.https.onRequest((req, res) => {
const sndResults: SendResults = new SendResults;

sndResults.sendResultEmail();
res.send('Results email sent');
});


export const playcricketMatchListImport = functions.firestore
.document('FixtureImport/MatchList')
.onWrite(
  async (snap, context) => {
    try{
      const MatchListImportFunction:MatchListImport = new MatchListImport; 
      const document: any = snap.after.data();
      return MatchListImportFunction.updateMatchList(document.season);
    }
    catch (err){
      return err;
      }
    }
  )

/*
exports.emailSplit = functions.https.onRequest((req, res) => {
const emailUnsplit:string = "Alex Gibb <alexgibb1@hotmail.com>, Andy Symes <andy.symes@coutts.com>, Ash Gibb <gibbfamily21@gmail.com>, Bhadresh Patel <Bhadresh2309@gmail.com>,Billy Greaves <billygreaves9@aol.com>,Billy Lozowski <billyrbartlett@gmail.com>,Gary Pearson <gary4pearson@yahoo.co.uk>,Geoff Wright <geoffwright@farming.co.uk>,Graham Stock <graham.l.stock@btinternet.com>,Greg Forster <gregdforster@gmail.com>,Hugh Savill <hugh.savill@abi.org.uk>,Iain Cole <info@icelectricaluk.com>,Ian Scott <ian@idscott.com>,Jack Gildersleeve <gildojack@hotmail.co.uk>,Jason Brown <rowenajason@hotmail.com>,John Rowland <rowland1811@btinternet.com>,Jonathan Enderby <j.enderby@cadogantate.com>,Keith Abbott <kjabbott@outlook.com>,Keith Mitchell <kandc.mitchell@yahoo.co.uk>,Kevin Jordan <kevin.jordan1@btinternet.com>,Kieron Scott <kieron.scott@rcplondon.ac.uk>,Lefras Coetzee <lefras.coetzee@gmail.com>,Liam Faulkner <Liam.faulkner@hotmail.co.uk>,Luke Wright <angelamwright82@gmail.com>,Malcolm Goddard <MalcolmGoddard@priceforbes.com>,Malcolm Goddard <malcolmgoddard@hotmail.com>,Manish Patel <moneypatel07@gmail.com>,Matt Allison <beccyallison@gmail.com>,Matt Richards <mattleerichards@gmail.com>,Matt Savill <matt_savill@hotmail.co.uk>,Matthew Simmons <simmons.matthew91@gmail.com>,Mike Parrish <mike@japarrish.com>,Nilesh Patel <nileshrita@hotmail.co.uk>,Phil Sergeant <phil.sergeant.88@googlemail.com>,Ray Balcombe <ray@technicaldramadesign.co.uk>,Reed Hudgell <g.j.hudgell@talk21.com>,Robert Duhig <robert_duhig@sky.com>,Robert Yarwood <robertyarwood@btinternet.com>,Ryan Scott <ryanjosephscott@gmail.com>,Simon Moule <simonmoule@blueyonder.co.uk>,Simon Moule (Home) <simon.moule@familymosaic.co.uk>,Steve Savery<Stephen.Savery@tube.tfl.gov.uk>,Tiraj Patel <tiraj@hotmail.co.uk>,Tom Greaves <greavsie94@hotmail.co.uk>,Tom McCarthy <tmccarthy2307@gmail.com>,Will Archer <willarcher1998@icloud.com>,Zak Newman <zaknewman64@hotmail.co.uk>"
const fs = firestore.collection('emailAdresses');
const individualemails:string[] = emailUnsplit.split(',');
individualemails.forEach(indvEmail => {
    let names = indvEmail.slice(0, indvEmail.indexOf('<', 0))
    let personEmail = indvEmail.slice(indvEmail.indexOf('<', 0)+1, indvEmail.length-1)
    return fs.doc(personEmail).set({'name': names.trim(), 'emailaddress': personEmail.trim(), 'resultsEmail': false});
});
res.send('Done');
});
*/