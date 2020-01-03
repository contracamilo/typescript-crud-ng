import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { environment } from "src/environments/environment";
import { AngularFireModule } from "angularfire2";
import { AngularFireDatabaseModule } from "angularfire2/database";
import { PlayerService } from "./services/player.service";
import { TeamTableComponent } from "./team-table/team-table.component";

@NgModule({
  declarations: [AppComponent, TeamTableComponent],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule
  ],
  providers: [PlayerService],
  bootstrap: [AppComponent]
})
export class AppModule {}
