import { Component, NgZone } from "@angular/core";
import * as ol from "openlayers";
import { AuthService } from "./auth.service";
import { ApiService } from "./api.service";
import Ride from "./models/ride";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.less"],
})
export class AppComponent {
  title = "esk8pal";

  fileList: FileList;

  latitude: number = 18.5204;
  longitude: number = 73.8567;

  rides: Array<Ride>;

  authorized = false;
  profile: any;

  map: ol.Map;

  currentRideLayer = null;

  style = {
    Point: new ol.style.Style({
      image: new ol.style.Circle({
        fill: new ol.style.Fill({
          color: "rgba(255,255,0,0.4)",
        }),
        radius: 5,
        stroke: new ol.style.Stroke({
          color: "#ff0",
          width: 1,
        }),
      }),
    }),
    LineString: new ol.style.Style({
      stroke: new ol.style.Stroke({
        color: "#dd0",
        width: 3,
      }),
    }),
    MultiLineString: new ol.style.Style({
      stroke: new ol.style.Stroke({
        color: "#9000ff",
        width: 3,
      }),
    }),
  };

  constructor(private auth: AuthService, private zone: NgZone, private api: ApiService) {}

  ngOnInit() {
    this.auth.login.subscribe(async (profile: gapi.auth2.BasicProfile) => {
      this.zone.run(async () => {
        console.log("logged", profile);
        this.profile = profile;
        this.authorized = true;

        if (this.authorized) {
          setTimeout(() => this.init(), 0);
        }
      });
    });
  }

  async init() {
    this.map = new ol.Map({
      target: "map",
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM(),
        }),
      ],
      view: new ol.View({
        center: ol.proj.fromLonLat([19.998608, 50.081581]),
        zoom: 16,
      }),
    });

    this.rides = await this.api.getRides();
  }

  async loadRide(id: string) {
    this.map.removeLayer(this.currentRideLayer);

    const data = await this.api.getRideData(id);

    const source = new ol.source.Vector({
      format: new ol.format.GPX(),
    });

    var format = new ol.format.GPX();
    var features = format.readFeatures(data, {
      dataProjection: "EPSG:4326",
      featureProjection: "EPSG:3857",
    });
    source.addFeatures(features);

    this.currentRideLayer = new ol.layer.Vector({
      source,
      style: (feature) => {
        return this.style[feature.getGeometry().getType()];
      },
    });

    this.map.addLayer(this.currentRideLayer);
  }

  filesToUploadChanged(event) {
    this.fileList = event.target.files;
  }

  uploadGpx() {
    for (let index = 0; index < this.fileList.length; index++) {
      this.api.uploadRideGpx(this.fileList[index]);
    }
  }

  uploadCsv() {
    for (let index = 0; index < this.fileList.length; index++) {
      this.api.uploadRideCsv(this.fileList[index]);
    }
  }
}
