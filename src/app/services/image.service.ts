import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs';
import { LoadImageError, LoadImageSuccess } from '../image-annotation-state/image-annotation.action';
import { ImageAnnotationState } from '../model/image-annotation.state';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  imageUrl: string = "https://image.dummyjson.com/512x512";

  constructor(private store: Store<ImageAnnotationState>, private httpClient: HttpClient) { }
  
  loadImage() {
    return this.httpClient.get(this.imageUrl, { responseType: 'blob' }).pipe(
      catchError((err, _) => {
        this.store.dispatch(LoadImageError({ error: err }));
        throw new Error(err);
      })
    ).subscribe(res => {
      this.store.dispatch(LoadImageSuccess({ image: res }));
    })
  }
}


