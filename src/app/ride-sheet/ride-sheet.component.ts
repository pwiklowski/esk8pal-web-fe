import { Component } from "@angular/core";
import { MatBottomSheetRef } from "@angular/material/bottom-sheet";
import Ride from "../models/ride";
import { ApiService } from "../api.service";
import { AppService } from "../app.service";

@Component({
  selector: "app-ride-sheet",
  templateUrl: "./ride-sheet.component.html",
  styleUrls: ["./ride-sheet.component.scss"],
})
export class RideSheetComponent {
  constructor(private sheetRef: MatBottomSheetRef<RideSheetComponent>, private api: ApiService, private appService: AppService) {}

  rides: Array<Ride>;

  async ngOnInit() {
    this.rides = await this.api.getRides();
  }

  async loadRide(id: string) {
    this.sheetRef.dismiss();
    this.appService.showRide(id);
  }
}
