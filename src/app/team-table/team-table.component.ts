// tslint:disable-next-line: quotemark
import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { take } from "rxjs/operators";
import { Team } from "../interfaces/team";
import { Countries } from "../interfaces/player";
import { TeamService, TeamTableHeaders } from "../services/team.service";

@Component({
  selector: "app-team-table",
  templateUrl: "./team-table.component.html",
  styleUrls: ["./team-table.component.css"]
})
export class TeamTableComponent implements OnInit {
  public teams$ = new Observable<Team[]>();
  public tableHeaders = TeamTableHeaders;

  constructor(private teamService: TeamService) {}

  ngOnInit() {
    this.teams$ = this.teamService.getTeams();
    this.teamService
      .getTeams()
      .pipe(take(1))
      .subscribe(teams => {
        if (teams.length === 0) {
          const team: Team = {
            $name: "MyAmazingTeam",
            $country: Countries.Argentina,
            $players: null
          };

          this.teamService.addTeam(team);
        }
      });
  }
}
