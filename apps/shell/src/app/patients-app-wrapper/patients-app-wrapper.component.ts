import { loadRemoteModule } from '@angular-architects/module-federation';
import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, ViewChild, ViewContainerRef} from '@angular/core';
import { enviroment } from '../../environment';
import { APP_VERSION } from '../app.constants';

@Component({
  selector: 'app-patients-app-wrapper',
  imports: [],
  templateUrl: './patients-app-wrapper.component.html'
})

export class PatientsAppWrapperComponent {
  @ViewChild("remotePatient", { read: ViewContainerRef, static: true})
  viewContainerRef!: ViewContainerRef;
  
  async ngAfterViewInit() {
      this.viewContainerRef.clear()

      const m = await loadRemoteModule({
        type:"module",
        remoteEntry: `${enviroment.remotesUrl.patientsApp}/remoteEntry.js?v=${APP_VERSION}`,
        exposedModule:'./web-components',
      });

      this.viewContainerRef.createComponent(m.AppComponent);

    }
}
