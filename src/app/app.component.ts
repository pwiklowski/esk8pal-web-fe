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
}
