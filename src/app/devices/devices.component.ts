import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { MatBottomSheetRef } from "@angular/material/bottom-sheet";
import { ApiService } from "../api.service";
import Device from "../models/device";

@Component({
  selector: "app-devices",
  templateUrl: "./devices.component.html",
  styleUrls: ["./devices.component.scss"],
})
export class DevicesComponent implements OnInit {
  name: string;
  devices: Array<Device>;
  showNameField = false;
  constructor(private sheetRef: MatBottomSheetRef<DevicesComponent>, private cdr: ChangeDetectorRef, private api: ApiService) {}

  async ngOnInit() {
    this.devices = await this.api.getDevices();
  }

  async delete(deviceId: string) {
    this.devices = await this.api.deleteDevice(deviceId);
    this.cdr.markForCheck();
  }

  async add(name: string) {
    const key = Math.random().toString(36).substring(3);
    this.devices = await this.api.addDevice(name, key);
    this.cdr.markForCheck();
  }
}
