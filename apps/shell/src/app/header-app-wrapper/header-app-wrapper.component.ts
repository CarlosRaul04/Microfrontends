import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { loadRemoteModule } from '@angular-architects/module-federation';
import { enviroment } from '../../environment';
import { APP_VERSION } from '../app.constants';

@Component({
  selector: 'app-header-app-wrapper',
  imports: [],
  templateUrl: './header-app-wrapper.component.html'
})
export class HeaderAppWrapperComponent {
  @ViewChild("remoteHeader", { read: ViewContainerRef, static: true})
  viewContainerRef!: ViewContainerRef;
  
  async ngAfterViewInit() {
      this.viewContainerRef.clear()

      const m = await loadRemoteModule({
        type:"module",
        remoteEntry: `${enviroment.remotesUrl.headerApp}/remoteEntry.js?v=${APP_VERSION}`,
        exposedModule:'./web-components',
      });

      this.viewContainerRef.createComponent(m.AppComponent);

    }

}
