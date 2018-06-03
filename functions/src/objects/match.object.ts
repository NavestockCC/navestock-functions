export class match{
    id:string;
    status: string;
    published: string;
    last_updated: Date;
    league_name: string;
    league_id: string;
    competition_name: string;
    competition_id: string;
    competition_type: string;
    match_type: string;
    game_type: string;
    season: number;
    match_date: Date;
    match_time: string;
    ground_name: string;
    ground_id: string;
    ground_latitude: string;
    ground_longitude: string;
    home_club_name: string;
    home_team_name: string;
    home_team_id: string;
    home_club_id: string;
    home_team_isNavestock: boolean;
    navestock_club_name: string;
    navestock_team_name: string;
    navestock_team_id: string;
    navestock_club_id: string;
    opposition_club_name: string;
    opposition_team_name: string;
    opposition_team_id: string;
    opposition_club_id: string;    
    away_club_name: string;
    away_team_name: string;
    away_team_id: string;
    away_club_id: string;
    toss_won_by_team_id: string;
    toss: string;
    batted_first: string;
    no_of_overs: string;
    result_updated: boolean
    result_description: string;
    result_applied_to: string;
    match_notes: string;

    public setMatch(
            id:number,
            status: string,
            published: string,
            last_updated: string,
            league_name: string,
            league_id: string,
            competition_name: string,
            competition_id: string,
            competition_type: string,
            match_type: string,
            game_type: string,
            season: string,
            match_date: string,
            match_time: string,
            ground_name: string,
            ground_id: string,
            ground_latitude: string,
            ground_longitude: string,
            home_club_name: string,
            home_team_name: string,
            home_team_id: string,
            home_club_id: string,
            away_club_name: string,
            away_team_name: string,
            away_team_id: string,
            away_club_id: string
    ){
        //check to see if Navestock is the home club
        this.home_team_isNavestock = this.isNavestockHomeTeam(home_club_id);
        // set the oposition and navestock team info
        if(this.home_team_isNavestock === true){
            this.navestock_club_id = home_club_id;
            this.navestock_club_name = home_club_name;
            this.navestock_team_id = home_team_id;
            this.navestock_team_name = home_team_name;

            this.opposition_club_id = away_club_id;
            this.opposition_club_name = away_club_name;
            this.opposition_team_id = away_team_id;
            this.opposition_team_name = away_team_name;
        } else {
            this.navestock_club_id = away_club_id;
            this.navestock_club_name = away_club_name;
            this.navestock_team_id = away_team_id;
            this.navestock_team_name = away_team_name;

            this.opposition_club_id = home_club_id;
            this.opposition_club_name = home_club_name;
            this.opposition_team_id = home_team_id;
            this.opposition_team_name = home_team_name;            
        }

        
        this.id = String(id);
        this.status = status;
        this.published = published;
        this.last_updated = this.toDate(last_updated);
        this.league_name = league_name;
        this.league_id = league_id;
        this.competition_name = competition_name;
        this.competition_id = competition_id;
        this.competition_type = competition_type;
        this.match_type = match_type;
        this.game_type = game_type;
        this.season = +season;
        this.match_date = this.toDate(match_date, match_time);
        this.match_time = match_time;
        this.ground_name = ground_name;
        this.ground_id = ground_id;
        this.ground_latitude = ground_latitude;
        this.ground_longitude = ground_longitude;
        this.home_club_name = home_club_name;
        this.home_team_name = home_team_name;
        this.home_team_id = home_team_id;
        this.home_club_id = home_club_id;
        this.away_club_name = away_club_name;
        this.away_team_name = away_team_name;
        this.away_team_id = away_team_id;
        this.away_club_id = away_club_id;
    }

    public setMatchResult(
        id:number,
        status: string,
        published: string,
        last_updated: string,
        league_id: string,
        competition_name: string,
        competition_id: string,
        competition_type: string,
        match_type: string,
        game_type: string,
        match_date: string,
        match_time: string,
        ground_name: string,
        ground_id: string,
        home_club_name: string,
        home_team_name: string,
        home_team_id: string,
        home_club_id: string,
        away_club_name: string,
        away_team_name: string,
        away_team_id: string,
        away_club_id: string,
        toss_won_by_team_id: string,
        toss: string,
        batted_first: string,
        no_of_overs: string,
        result_updated: boolean,
        result_description: string,
        result_applied_to: string,
        match_notes: string
){
    //check to see if Navestock is the home club
    this.home_team_isNavestock = this.isNavestockHomeTeam(home_club_id);
    // set the oposition and navestock team info
    if(this.home_team_isNavestock === true){
        this.navestock_club_id = home_club_id;
        this.navestock_club_name = home_club_name;
        this.navestock_team_id = home_team_id;
        this.navestock_team_name = home_team_name;

        this.opposition_club_id = away_club_id;
        this.opposition_club_name = away_club_name;
        this.opposition_team_id = away_team_id;
        this.opposition_team_name = away_team_name;
    } else {
        this.navestock_club_id = away_club_id;
        this.navestock_club_name = away_club_name;
        this.navestock_team_id = away_team_id;
        this.navestock_team_name = away_team_name;

        this.opposition_club_id = home_club_id;
        this.opposition_club_name = home_club_name;
        this.opposition_team_id = home_team_id;
        this.opposition_team_name = home_team_name;            
    }

    
    this.id = id.toString();
    this.status = status;
    this.published = published;
    this.last_updated = this.toDate(last_updated);
    this.league_id = league_id;
    this.competition_name = competition_name;
    this.competition_id = competition_id;
    this.competition_type = competition_type;
    this.match_type = match_type;
    this.game_type = game_type;
    this.match_date = this.toDate(match_date, match_time);
    this.match_time = match_time;
    this.ground_name = ground_name;
    this.ground_id = ground_id;
    this.home_club_name = home_club_name;
    this.home_team_name = home_team_name;
    this.home_team_id = home_team_id;
    this.home_club_id = home_club_id;
    this.away_club_name = away_club_name;
    this.away_team_name = away_team_name;
    this.away_team_id = away_team_id;
    this.away_club_id = away_club_id;
    this.toss_won_by_team_id = toss_won_by_team_id;
    this.toss = toss;
    this.batted_first = batted_first;
    this.no_of_overs = no_of_overs;
    this.result_updated = result_updated;
    this.result_description = result_description;
    this.result_applied_to = result_applied_to;
    this.match_notes = match_notes;
}

    /*
        Takes a string dd/mm/yyy and converts it to an ISO date
    */
    private  toDate(dateStr:string, timeStr?:string):Date {
        const tmpDate:string[] = dateStr.split("/");
        let matchTime:string = null;
        if(timeStr===null || timeStr ===''){
            matchTime = '12:00';
        } else {
            matchTime = timeStr;
        }
        return new Date(tmpDate[2] + '-' + tmpDate[1]  + '-' + tmpDate[0] + 'T' + matchTime + ':00+01:00'); 
    }

    /*
        Evaluates the 'home_club_id' to see if it equal to 4513 Which is the Navestock Playcrick club id.
    */
    private isNavestockHomeTeam(home_club_id:string):boolean{
        let returnVal:boolean = null;
        if(home_club_id === '4513'){
            returnVal = true;
        } else{
            returnVal = false;
        }
        return returnVal;
    }
}
