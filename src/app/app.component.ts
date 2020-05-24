import { Component, NgZone } from "@angular/core";
import * as ol from "openlayers";
import { AuthService } from "./auth.service";
import { ApiService } from "./api.service";
import Ride from "./models/ride";
import { RideSheetComponent } from "./ride-sheet/ride-sheet.component";
import { MatBottomSheet } from "@angular/material/bottom-sheet";
import { AppService } from "./app.service";
import { UploadSheetComponent } from "./upload-sheet/upload-sheet.component";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.less"],
})
export class AppComponent {
  title = "esk8pal";

  latitude: number = 18.5204;
  longitude: number = 73.8567;

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

  constructor(
    private auth: AuthService,
    private zone: NgZone,
    private api: ApiService,
    private appService: AppService,
    private _bottomSheet: MatBottomSheet
  ) {}

  openBottomSheet(): void {
    this._bottomSheet.open(RideSheetComponent);
  }

  openUploadSheet(): void {
    this._bottomSheet.open(UploadSheetComponent);
  }

  ngOnInit() {
    this.appService.currentRideId.subscribe((id: string) => {
      this.loadRide(id);
    });

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
}
