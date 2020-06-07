import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import Ride from "./models/ride";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  BASE_URL = "http://localhost:4200/api";

  constructor(private http: HttpClient) {}

  async getRides() {
    return this.http.get(`${this.BASE_URL}/rides`).toPromise() as Promise<Array<Ride>>;
  }

  async getRideData(id) {
    return this.http.get(`${this.BASE_URL}/rides/${id}/data`, { responseType: "text" }).toPromise();
  }

  async getDevices() {
    return this.http.get(`${this.BASE_URL}/devices`).toPromise();
  }

  async addDevice(name: string, key: string) {
    return this.http.post(`${this.BASE_URL}/devices`, { name, key }).toPromise();
  }

  async deleteDevice(id: string) {
    return this.http.delete(`${this.BASE_URL}/devices/${id}`).toPromise();
  }

  async uploadRideGpx(file: File) {
    let data: FormData = new FormData();
    data.append("logfile", file, file.name);
    return this.http.post(`${this.BASE_URL}/gpx`, data).toPromise();
  }

  async uploadRideCsv(file: File) {
    let data: FormData = new FormData();
    data.append("logfile", file, file.name);
    return this.http.post(`${this.BASE_URL}/csv`, data).toPromise();
  }
}
