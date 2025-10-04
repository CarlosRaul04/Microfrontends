import { loadRemoteModule } from '@angular-architects/module-federation';
import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { enviroment } from '../../environment';
import { APP_VERSION } from '../app.constants';

@Component({
  selector: 'app-histories-app-wrapper',
  imports: [],
  templateUrl: './histories-app-wrapper.component.html'
})
export class HistoriesAppWrapperComponent {
  @ViewChild("remoteHistory", { read: ViewContainerRef, static: true})
  viewContainerRef!: ViewContainerRef;
  
  async ngAfterViewInit() {
      this.viewContainerRef.clear()

      const m = await loadRemoteModule({
        type:"module",
        remoteEntry: `${enviroment.remotesUrl.historiesApp}/remoteEntry.js?v=${APP_VERSION}`,
        exposedModule:'./web-components',
      });

      this.viewContainerRef.createComponent(m.AppComponent);

    }
}
