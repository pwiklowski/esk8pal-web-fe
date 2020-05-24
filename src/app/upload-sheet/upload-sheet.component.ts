import { Component, OnInit } from "@angular/core";
import { ApiService } from "../api.service";
import { MatBottomSheetRef } from "@angular/material/bottom-sheet";

@Component({
  selector: "app-upload-sheet",
  templateUrl: "./upload-sheet.component.html",
  styleUrls: ["./upload-sheet.component.less"],
})
export class UploadSheetComponent {
  fileList: FileList;

  constructor(private sheetRef: MatBottomSheetRef<UploadSheetComponent>, private api: ApiService) {}

  filesToUploadChanged(event) {
    this.fileList = event.target.files;
  }

  async uploadGpx() {
    for (let index = 0; index < this.fileList.length; index++) {
      await this.api.uploadRideGpx(this.fileList[index]);
      this.sheetRef.dismiss();
    }
  }

  async uploadCsv() {
    for (let index = 0; index < this.fileList.length; index++) {
      await this.api.uploadRideCsv(this.fileList[index]);
      this.sheetRef.dismiss();
    }
  }
}
