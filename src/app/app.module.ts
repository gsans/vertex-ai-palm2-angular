import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { PredictComponent } from './predict/predict.component';

@NgModule({
  declarations: [
    AppComponent,
    PredictComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [PredictComponent]
})
export class AppModule { }
