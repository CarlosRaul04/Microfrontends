import { createApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { createCustomElement } from '@angular/elements';

// bootstrapApplication(AppComponent, appConfig)
//   .catch((err) => console.error(err));

(async function() {
  const envInjector = await createApplication(appConfig);
  const customElement = createCustomElement(AppComponent, { injector: envInjector.injector});
  customElements.define('cdev-header-element',customElement);
})()