import { Component } from "@angular/core";
import * as ol from "openlayers";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.less"],
})
export class AppComponent {
  title = "esk8pal";

  latitude: number = 18.5204;
  longitude: number = 73.8567;

  map: ol.Map;

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

  ngOnInit() {
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

  showTrip(data: string) {
    const source = new ol.source.Vector({
      format: new ol.format.GPX(),
    });

    var format = new ol.format.GPX();
    var features = format.readFeatures(data, {
      dataProjection: "EPSG:4326",
      featureProjection: "EPSG:3857",
    });
    source.addFeatures(features);

    const trip = new ol.layer.Vector({
      source,
      style: (feature) => {
        return this.style[feature.getGeometry().getType()];
      },
    });

    this.map.addLayer(trip);
  }

  onFileLoaded(fileInput: any) {
    console.log("files", fileInput.target.files);
    if (fileInput.target.files && fileInput.target.files[0]) {
      const reader = new FileReader();

      reader.onload = (e) => {
        this.showTrip(e.target["result"] as string);
      };

      reader.readAsText(fileInput.target.files[0]);
    }
  }
}
