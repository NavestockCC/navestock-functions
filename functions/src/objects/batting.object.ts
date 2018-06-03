
export class batting{
    position: number;
    batsman_name: string;
    batsman_id: string;
    how_out: string;
    fielder_name: string;
    fielder_id: string;
    bowler_name: string;
    bowler_id: string;
    runs: number;
    fours: number;
    sixes: number;
    balls: number;
    
    setbatting(
        position: string,
        batsman_name: string,
        batsman_id: string,
        how_out: string,
        fielder_name: string,
        fielder_id: string,
        bowler_name: string,
        bowler_id: string,
        runs: string,
        fours: string,
        sixes: string,
        balls: string,
    ){
        this.position = +position;
        this.batsman_name = batsman_name;
        this.batsman_id = batsman_id;
        this.how_out = how_out;
        this.fielder_name = fielder_name;
        this.fielder_id = fielder_id;
        this.bowler_name = bowler_name;
        this.bowler_id = bowler_id;
        this.runs = +runs;
        this.fours = +fours;
        this.sixes =+sixes;
        this.balls = +balls; 
    }
}