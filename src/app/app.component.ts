import { Component } from "@angular/core";
import { SelectedFeature } from "./interfaces/selected-feature";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  loadedFeature: SelectedFeature = "recipe";
  onNavigate(selectedFeature: SelectedFeature) {
    this.loadedFeature = selectedFeature;
  }
}
