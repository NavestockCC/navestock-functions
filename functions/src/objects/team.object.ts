export class team{
    team_name:string;
    team_id:string;
    team_ground:string;

    constructor(
        team_name:string,
        team_id:string,
        team_ground:string
    ){
        this.team_name = team_name;
        this.team_id = team_id;
        this.team_ground = team_ground;        
    }

    public setTeam(
        team_name:string,
        team_id:string,
        team_ground:string
    ){
        this.team_name = team_name;
        this.team_id = team_id;
        this.team_ground = team_ground;
    }
}