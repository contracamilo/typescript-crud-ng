import { Injectable } from "@angular/core";
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";
import { Team } from "../interfaces/team";

export const TeamTableHeaders = ["Name", "Country", "Players"];

@Injectable({
  providedIn: "root"
})
export class TeamService {
  private teamsDB: AngularFireList<Team>;

  constructor(private db: AngularFireDatabase) {
    this.teamsDB = this.db.list("/teams", ref => ref.orderByChild("name"));
  }

  getTeams(): Observable<Team[]> {
    return this.teamsDB.snapshotChanges().pipe(
      map(changes => {
        return changes.map(c => ({ $key: c.payload.key, ...c.payload.val() }));
      })
    );
  }
  addTeam(team: Team) {
    return this.teamsDB.push(team);
  }

  deleteTeam(id: string) {
    this.db.list("/teams").remove(id);
  }

  editTeam(newPlayerData) {
    const $key = newPlayerData.$key;
    delete newPlayerData.$key;
    this.db.list("/teams").update($key, newPlayerData);
  }
}
