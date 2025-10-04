import { Component } from "@angular/core";
import { HistoriesAppWrapperComponent } from "../histories-app-wrapper/histories-app-wrapper.component";
import { PatientsAppWrapperComponent } from "../patients-app-wrapper/patients-app-wrapper.component";

@Component({
    selector: 'app-view-app-wrapper',
    templateUrl: './view-app-wrapper.component.html',
    styleUrls: ['./view-app-wrapper.component.css'],
    imports: [HistoriesAppWrapperComponent, PatientsAppWrapperComponent]
})

export class ViewAppWrapperComponent{

}