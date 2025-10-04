import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { enviroment } from '../environment';
import { loadRemoteModule } from '@angular-architects/module-federation';
import { APP_VERSION } from './app.constants';
import { HeaderAppWrapperComponent } from './header-app-wrapper/header-app-wrapper.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderAppWrapperComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'shell';

  constructor() {
    this.loadComponent();
  }

  async loadComponent() {
    const header = loadRemoteModule({
      type: 'module',
      remoteEntry: `${enviroment.remotesUrl.headerApp}/remoteEntry.js?v=${APP_VERSION}`,
      exposedModule: './web-components',
    }).then((m) => m.AppComponent);

    console.log('header', header);
  }
}
