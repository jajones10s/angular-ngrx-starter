import { NgModule } from '@angular/core';
import { Http, HttpModule } from '@angular/http';
import { MATERIAL_COMPATIBILITY_MODE } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { TranslateLoader, TranslateModule } from 'ng2-translate';
// import hammerjs only if needed :
// From https://material.angular.io/guide/getting-started#additional-setup-for-gestures
// Some components (md-slide-toggle, md-slider, mdTooltip) rely on HammerJS for gestures
// In order to get the full feature-set of these components, HammerJS must be loaded into the application
// import 'hammerjs';

import { LANGUAGES } from 'app/core/injection-tokens';
import { RuntimeEnvironmentService } from 'app/core/runtime-environment.service';
import { createTranslateLoader } from 'app/shared/helpers/aot.helper';
import { metaReducers, reducers } from 'app/shared/states/root.reducer';
import { environment } from 'environments/environment';

/**
 * this module will be imported only once, in AppModule and shouldn't be imported from anywhere else
 * you can define here the modules and providers that you only want to import once
 */
@NgModule({
  imports: [
    // --------------------------------------------------------------------
    // START : Do not add your libs here
    BrowserAnimationsModule,
    HttpModule,
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: createTranslateLoader,
      deps: [Http],
    }),
    StoreModule.forRoot(reducers, { metaReducers }),
    // it'd be nice to have the possibility to activate redux devtools
    // even if we're in prod but only with the extension
    // since ngrx v4, no idea how to do that
    // https://github.com/ngrx/platform/issues/374
    !environment.production
      ? StoreDevtoolsModule.instrument({ maxAge: 50 })
      : [],
    // END : Do not add your libs here
    // --------------------------------------------------------------------

    // pass every effects here
    // EffectsModule.forRoot([YOUR_EFFECTS_GOES_HERE]);
  ],
  providers: [
    {
      provide: LANGUAGES,
      // order matters : The first one will be used by default
      // to be accurate, it will depend if you've set environment.useBrowserLanguageAsDefault to true or not
      // if it's set to true, it'll first try to use the browser language and if not available, fallback to the
      // firt language of the following array
      useValue: ['en', 'fr'],
    },
    { provide: MATERIAL_COMPATIBILITY_MODE, useValue: true },
    RuntimeEnvironmentService,
  ],
})
export class CoreModule {}
