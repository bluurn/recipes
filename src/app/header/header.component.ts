import { Component } from "@angular/core";
import { DataStorageService } from "../services/data-storage.service";

@Component({
  templateUrl: "header.component.html",
  selector: "app-header",
})
export class HeaderComponent {
  constructor(private dataStorageService: DataStorageService) {}
  onSaveData() {
    this.dataStorageService.storeRecipes().subscribe();
  }

  onFetchData() {
    this.dataStorageService.fetchRecipes().subscribe();
  }
}
