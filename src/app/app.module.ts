import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ImageAnnotationsComponent } from './image-annotations/image-annotations.component';
import { StoreModule } from '@ngrx/store';
import { imageAnnotationReducer } from './image-annotation-state/image-annotation.reducer';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MatToolbarModule} from '@angular/material/toolbar'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {MatButtonModule } from '@angular/material/button'
import { NetworkInterceptor } from './services/shared/network.interceptor';
@NgModule({
  declarations: [
    AppComponent,
    ImageAnnotationsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    StoreModule.forRoot({imageAnnotation : imageAnnotationReducer}),
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatButtonModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: NetworkInterceptor,
    multi: true
  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
