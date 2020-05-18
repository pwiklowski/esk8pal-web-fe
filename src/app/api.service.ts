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

  async uploadRide(file: File) {
    let data: FormData = new FormData();
    data.append("logfile", file, file.name);
    this.http.post(`${this.BASE_URL}/rides`, data).subscribe((response) => {
      console.log(response);
    });
  }
}
