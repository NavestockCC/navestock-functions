export class innings{
    team_batting_name: string;
    team_batting_id: string;
    team_bowling_name: string;
    team_bowling_id: string;
    innings_number: number;
    extra_byes: number;
    extra_leg_byes: number;
    extra_wides: number;
    extra_no_balls: number;
    extra_penalty_runs: number;
    penalties_runs_awarded_in_other_innings:number;
    total_extras: number;
    runs: number;
    wickets: number;
    overs: number;
    declared: boolean;
    revised_target_runs: number;
    revised_target_overs: number;

   public setInnings(
    team_batting_name: string,
    team_batting_id: string,
    team_bowling_name: string,
    team_bowling_id: string,
    innings_number: string,
    extra_byes: string,
    extra_leg_byes: string,
    extra_wides: string,
    extra_no_balls: string,
    extra_penalty_runs: string,
    penalties_runs_awarded_in_other_innings:string,
    total_extras: string,
    runs: string,
    wickets: string,
    overs: string,
    declared: boolean,
    revised_target_runs: string,
    revised_target_overs: string
   ){
    this.team_batting_name = team_batting_name;
    this.team_batting_id = team_batting_id;
    this.team_bowling_name = team_bowling_name;
    this.team_bowling_id = team_bowling_id;
    this.innings_number = +innings_number;
    this.extra_byes = +extra_byes;
    this.extra_leg_byes = +extra_leg_byes;
    this.extra_wides = +extra_wides;
    this.extra_no_balls = +extra_no_balls;
    this.extra_penalty_runs = +extra_penalty_runs;
    this.penalties_runs_awarded_in_other_innings = +penalties_runs_awarded_in_other_innings;
    this.total_extras = +total_extras;
    this.runs = +runs;
    this.wickets = +wickets;
    this.overs = +overs;
    this.declared = declared;
    this.revised_target_runs = +revised_target_runs;
    this.revised_target_overs = +revised_target_overs;
    }


}