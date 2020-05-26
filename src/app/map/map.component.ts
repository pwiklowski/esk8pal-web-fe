import { Component, OnInit } from "@angular/core";
import * as ol from "openlayers";
import { AppService } from "../app.service";
import { ApiService } from "../api.service";

@Component({
  selector: "app-map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.scss"],
})
export class MapComponent implements OnInit {
  map: ol.Map;

  currentRideLayer = null;

  latitude: number = 18.5204;
  longitude: number = 73.8567;

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
  constructor(private appService: AppService, private api: ApiService) {}

  ngOnInit(): void {
    this.init();
    this.appService.currentRideId.subscribe((id: string) => {
      this.loadRide(id);
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
