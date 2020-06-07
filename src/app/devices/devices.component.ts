import { Component, OnInit } from "@angular/core";
import { MatBottomSheetRef } from "@angular/material/bottom-sheet";
import { ApiService } from "../api.service";
import Device from "../models/device";

@Component({
  selector: "app-devices",
  templateUrl: "./devices.component.html",
  styleUrls: ["./devices.component.scss"],
})
export class DevicesComponent implements OnInit {
  devices: Array<Device>;
  constructor(private sheetRef: MatBottomSheetRef<DevicesComponent>, private api: ApiService) {}

  async ngOnInit(): Promise<void> {
    this.devices = await this.api.getDevices();
  }

  async delete(deviceId: string) {
    this.devices = await this.api.deleteDevice(deviceId);
  }
}
