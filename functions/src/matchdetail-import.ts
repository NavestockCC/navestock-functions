import * as admin from 'firebase-admin';


/* Navestcock Objects */
import {match} from './objects/match.object';
import {innings} from './objects/innings.object';
import {batting} from './objects/batting.object';
import {bowling} from './objects/bowling.object';
import {team} from './objects/team.object';

export class MatchDetailImport {
    private fbMatchDetail: any;
    matchID:string = null;
    matchURL:string = null;
    matchResult:match = null;
    inningsData:innings = new innings;
    battingData: batting = new batting;
    bowlingData: bowling = new bowling;
    teams:team[] = [];


    constructor(private afs = admin.firestore()) {
        this.fbMatchDetail = this.afs.collection('Fixtures');
    }

/* Import the PlayCricket match data from the form  */
    public getImportData(importData:any){
        /**
         * Step 1: get the match result
         * this.getMatchDetails(importData)
         * Step 2: get the innings data
         * this.getInnings(JSON.parse(importData));
         */

       return  Promise.all([this.getMatchDetails(importData), this.getInnings(importData)])
       .catch( err => {
            console.error(err)
        });
    }

/* Import the match result from play cricket */
    getMatchDetails(importDataObject):Promise<void>{
     this.matchResult = new match;
     this.matchID = importDataObject.match_details[0].id.toString();
     let tmpTeam:team = new team(importDataObject.match_details[0].home_club_name, importDataObject.match_details[0].home_team_id, 'home')
     this.teams.push(tmpTeam);
     tmpTeam = new team(importDataObject.match_details[0].away_club_name, importDataObject.match_details[0].away_team_id, 'away')
     this.teams.push(tmpTeam);

     let resultUpdated:boolean = false;
     if(importDataObject.match_details[0].result_description !== ''){resultUpdated = true};

     this.matchResult.setMatchResult(
        importDataObject.match_details[0].id,
        importDataObject.match_details[0].status,
        importDataObject.match_details[0].published,
        importDataObject.match_details[0].last_updated,
        importDataObject.match_details[0].league_id,
        importDataObject.match_details[0].competition_name,
        importDataObject.match_details[0].competition_id,
        importDataObject.match_details[0].competition_type,
        importDataObject.match_details[0].match_type,
        importDataObject.match_details[0].game_type,
        importDataObject.match_details[0].match_date,
        importDataObject.match_details[0].match_time,
        importDataObject.match_details[0].ground_name,
        importDataObject.match_details[0].ground_id,
        importDataObject.match_details[0].home_club_name,
        importDataObject.match_details[0].home_team_name,
        importDataObject.match_details[0].home_team_id,
        importDataObject.match_details[0].home_club_id,
        importDataObject.match_details[0].away_club_name,
        importDataObject.match_details[0].away_team_name,
        importDataObject.match_details[0].away_team_id,
        importDataObject.match_details[0].away_club_id,
        importDataObject.match_details[0].toss_won_by_team_id,
        importDataObject.match_details[0].toss,
        importDataObject.match_details[0].batted_first,
        importDataObject.match_details[0].no_of_overs,
        resultUpdated,
        importDataObject.match_details[0].result_description,
        importDataObject.match_details[0].result_applied_to,
        importDataObject.match_details[0].match_notes
     )
     
     return this.fbMatchDetail.doc(this.matchID).update(Object.assign({}, this.matchResult));

    }

/* Import the innings data from play cricet data and update Firebase */
getInnings(importDataObject){
    this.inningsData = new innings();
    const PromisesAll = [];

    // Extract innings data from the match data
    const tmpImportData = importDataObject.match_details[0].innings;
    if(tmpImportData !== null){
    // Extract the id (match id) to use as key to store the data
    const matchId:string = importDataObject.match_details[0].id.toString();
    //Read each innings and extract the innings scores and team info
    tmpImportData.forEach(inningsElement=> { this.inningsData = this.creatInningsObject(inningsElement);
        //write innings info to Firebase
        PromisesAll.push(this.fbMatchDetail.doc(matchId).collection('innings').doc(this.inningsData.team_batting_id).set(Object.assign({}, this.inningsData)));

        if(this.getHomeOrAway(this.inningsData.team_batting_id) === 'home'){
            PromisesAll.push(this.fbMatchDetail.doc(matchId).update({home_team_runs:this.inningsData.runs, home_team_wickets:this.inningsData.wickets}));
        }
        if(this.getHomeOrAway(this.inningsData.team_batting_id) === 'away'){
            PromisesAll.push(this.fbMatchDetail.doc(matchId).update({away_team_runs:this.inningsData.runs, away_team_wickets:this.inningsData.wickets}));
        }
        
        //extract batting data from the innings
        inningsElement.bat.forEach(batElement => {
            this.battingData = this.createBattingObject(batElement);
            //write batting data to Firebase
            PromisesAll.push(this.fbMatchDetail.doc(matchId).collection('innings').doc(this.inningsData.team_batting_id).collection('batting').doc(this.battingData.batsman_id).set(Object.assign({}, this.battingData)));
        });
        //extract bowling data from innings
        inningsElement.bowl.forEach(bowlElement => {
            this.bowlingData = this.createBolingObject(bowlElement);
            //write bowling data to Firebase
            PromisesAll.push(this.fbMatchDetail.doc(matchId).collection('innings').doc(this.inningsData.team_batting_id).collection('bowling').doc(this.bowlingData.bowler_id).set(Object.assign({}, this.bowlingData)));   
        });
    });
    }// end if inningsData != null
    return PromisesAll;
} 

/* Create innings object from innings Object method */
private creatInningsObject(inningsElement):innings{
    const tmpInnings = new innings();
    const bowlingTeam: team = this.getOppositeTeam(inningsElement.team_batting_id);

     tmpInnings.setInnings(
        inningsElement.team_batting_name,
        inningsElement.team_batting_id,
        bowlingTeam.team_name,
        bowlingTeam.team_id,
        inningsElement.innings_number,
        inningsElement.extra_byes,
        inningsElement.extra_leg_byes,
        inningsElement.extra_wides,
        inningsElement.extra_no_balls,
        inningsElement.extra_penalty_runs,
        inningsElement.penalties_runs_awarded_in_other_innings,
        inningsElement.total_extras,
        inningsElement.runs,
        inningsElement.wickets,
        inningsElement.overs,
        inningsElement.declared,
        inningsElement.revised_target_runs,
        inningsElement.revised_target_overs
    );
    return tmpInnings;
}


/* Create batting object from batting Object method */    
private createBattingObject(battingElement):batting{
    const battingObject: batting = new batting();
    battingObject.setbatting(
        battingElement.position,
        battingElement.batsman_name,
        battingElement.batsman_id,
        battingElement.how_out,
        battingElement.fielder_name,
        battingElement.fielder_id,
        battingElement.bowler_name,
        battingElement.bowler_id,
        battingElement.runs,
        battingElement.fours,
        battingElement.sixes,
        battingElement.balls
    );
    return battingObject;
}

/* Create batting object from batting Object method */
private createBolingObject(bolwlingElement):bowling{
    const bowlingObject = new bowling();
    bowlingObject.setBowling(
    bolwlingElement.bowler_name,
    bolwlingElement.bowler_id,
    bolwlingElement.overs,
    bolwlingElement.maidens,
    bolwlingElement.runs,
    bolwlingElement.wides,
    bolwlingElement.wickets,
    bolwlingElement.no_balls
    );
    return bowlingObject;
}

/* Take the team Id and give the other teams data from Teams object*/
private getOppositeTeam(teamId:string):team{
 let returnTeam:team = null;
 this.teams.forEach(t => {
    if(teamId!==t.team_id){
        returnTeam = t;
    }
 })
return returnTeam;
} 

/* Returns home or away indicating if this is the home team or the away team ID */
private getHomeOrAway(teamId:string):string{
let returnHW: string = null
this.teams.forEach(t => {
    if(teamId===t.team_id){
        returnHW = t.team_ground;
    }
 })
return returnHW;
}

}
