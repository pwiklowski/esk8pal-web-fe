import { Component, NgZone } from "@angular/core";
import { AuthService } from "./auth.service";
import { RideSheetComponent } from "./ride-sheet/ride-sheet.component";
import { MatBottomSheet } from "@angular/material/bottom-sheet";
import { UploadSheetComponent } from "./upload-sheet/upload-sheet.component";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "esk8pal";

  authorized = false;
  profile: any;

  constructor(private auth: AuthService, private zone: NgZone, private _bottomSheet: MatBottomSheet) {}

  openBottomSheet(): void {
    this._bottomSheet.open(RideSheetComponent);
  }

  openUploadSheet(): void {
    this._bottomSheet.open(UploadSheetComponent);
  }

  ngOnInit() {
    this.auth.login.subscribe(async (profile: gapi.auth2.BasicProfile) => {
      this.zone.run(async () => {
        console.log("logged", profile);
        this.profile = profile;
        this.authorized = true;
      });
    });
  }
}
