import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { ApiService } from "./api.service";

@Injectable({
  providedIn: "root",
})
export class AppService {
  currentRideId: Subject<string> = new Subject<string>();

  constructor(private api: ApiService) {}

  async showRide(id: string) {
    this.currentRideId.next(id);
  }
}
