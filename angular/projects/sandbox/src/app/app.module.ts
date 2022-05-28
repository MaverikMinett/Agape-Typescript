import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AgFormsModule } from 'projects/agape/material/src/public-api';
import { FieldsGalleryComponent } from './fields-gallery/fields-gallery.component';
import { FieldsGalleryMinimalComponent } from './fields-gallery-minimal/fields-gallery-minimal.component';

@NgModule({
  declarations: [
    AppComponent,
    FieldsGalleryComponent,
    FieldsGalleryMinimalComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AgFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
