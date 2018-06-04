import * as admin from 'firebase-admin';
import * as request from 'request';


/* Navestcock Objects */
import {match} from './objects/match.object';

export class MatchListImport {

constructor(private afs = admin.firestore()) {
}

/* Update the match list, season is kept in the Firestore at "FixtureImport/MatchList" */
public updateMatchList(season:string){
    const mList:match[] = this.getMatchlist_PlayCricket(season);
    const PromisesAll = [];

    /**
     * 1. For each match list item lookup to see if the match exsists in the Firestore at "Fixture"
     * 1.1. If it exsists, check if the record "last_updated" is not equal to the fixture list.
     * 1.1.1 if the "last_updated" is not equal then update irestore at "Fixture" with new data
     * 1.2. If the match does not exsist in the Firestore at "Fixture" add the new match 
     */
    mList.forEach(matchElement => {
        const PA = this.afs.doc('Fixtures/' + matchElement.id).get().then(
           async mtch => {
                if(mtch.exists === true){
                    const matchDoc = mtch.data();
                    if(matchDoc.last_updated !== matchElement.last_updated){
                       await this.afs.doc('Fixtures/' + matchElement.id).update(matchElement);
                    }
                } else {
                   await this.afs.doc('Fixtures/' + matchElement.id).set(matchElement);
                }
            }
        )
        PromisesAll.push(PA);
    });

    return PromisesAll;
}


/* Import the match result from play cricket */
private getMatchlist_PlayCricket(season:string):match[]{
        const matchList:match[] = [];
        const md = this.getMatchDetails; 
        try{ 
            const url:string = "http://play-cricket.com/api/v2/matches.json?site_id=4513&api_token=b5827cc30a9019c48af36df94eeb386c&season=" + season;
            request({url: url}, function (error, response, body){
                const bodyObject = JSON.parse(body);
                bodyObject.matches.forEach(matchElement => {
                     matchList.push(md(matchElement));
                });
            })
            return matchList;
          }
          catch (err){
            console.error('Could not get data from Play-Crictet. Error: ' + err);
            return err;
            }
} // getMatchlist_PlayCricket ends


/* Parse data into match object  */
private  getMatchDetails(importDataObject): match{
    const matchResult = new match;
    let resultUpdated:boolean = false;
    if(importDataObject.result_description !== ''){resultUpdated = true};

    matchResult.setMatchResult(
       importDataObject.id,
       importDataObject.status,
       importDataObject.published,
       importDataObject.last_updated,
       importDataObject.league_id,
       importDataObject.competition_name,
       importDataObject.competition_id,
       importDataObject.competition_type,
       importDataObject.match_type,
       importDataObject.game_type,
       importDataObject.match_date,
       importDataObject.match_time,
       importDataObject.ground_name,
       importDataObject.ground_id,
       importDataObject.home_club_name,
       importDataObject.home_team_name,
       importDataObject.home_team_id,
       importDataObject.home_club_id,
       importDataObject.away_club_name,
       importDataObject.away_team_name,
       importDataObject.away_team_id,
       importDataObject.away_club_id,
       importDataObject.toss_won_by_team_id,
       importDataObject.toss,
       importDataObject.batted_first,
       importDataObject.no_of_overs,
       resultUpdated,
       importDataObject.result_description,
       importDataObject.result_applied_to,
       importDataObject.match_notes
    )
    
    return matchResult;
} // getMatchDetails ends

} // class end