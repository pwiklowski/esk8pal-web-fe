import { Component, OnInit } from "@angular/core";
import { ApiService } from "../api.service";
import { MatBottomSheetRef } from "@angular/material/bottom-sheet";
import Device from "../models/device";
import { FormControl } from "@angular/forms";

@Component({
  selector: "app-upload-sheet",
  templateUrl: "./upload-sheet.component.html",
  styleUrls: ["./upload-sheet.component.scss"],
})
export class UploadSheetComponent {
  fileList: FileList;
  devices: Array<Device>;
  deviceId = new FormControl();

  constructor(private sheetRef: MatBottomSheetRef<UploadSheetComponent>, private api: ApiService) {}

  async ngOnInit() {
    this.devices = await this.api.getDevices();
  }

  filesToUploadChanged(event) {
    this.fileList = event.target.files;
  }

  async uploadGpx() {
    for (let index = 0; index < this.fileList.length; index++) {
      await this.api.uploadRideGpx(this.deviceId.value, this.fileList[index]);
      this.sheetRef.dismiss();
    }
  }

  async uploadCsv() {
    for (let index = 0; index < this.fileList.length; index++) {
      await this.api.uploadRideCsv(this.deviceId.value, this.fileList[index]);
      this.sheetRef.dismiss();
    }
  }
}
