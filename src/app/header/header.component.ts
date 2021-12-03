import { Component, EventEmitter, Output } from '@angular/core';
import { SelectedFeature } from '../shared/selected-feature';

@Component({
  templateUrl: 'header.component.html',
  selector: 'app-header',
})
export class HeaderComponent {
  @Output() featureSelected = new EventEmitter<SelectedFeature>();
  onSelect(feature: SelectedFeature) {
    this.featureSelected.emit(feature);
  }
}
