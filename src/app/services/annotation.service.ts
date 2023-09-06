import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { LoadAnnotationsError, LoadAnnotationsSuccess } from '../image-annotation-state/image-annotation.action';
import { APIResponse, Annotation, ImageAnnotationState } from '../model/image-annotation.state';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})

export class AnnotationService {

  annotationUrl: string = "https://dummyjson.com/http/200/[%7B%22id%22:%22a2%22,%22radiusX%22:20,%22radiusY%22:25,%22x%22:50,%22y%22:60%7D]";

  constructor(private store: Store<ImageAnnotationState>, private httpClient: HttpClient) { }

  loadAnnotations() {
    return this.httpClient.get<APIResponse>(this.annotationUrl)
      .pipe(
        map(res => JSON.parse(res.message)),
        catchError((err, _) => {
          this.store.dispatch(LoadAnnotationsError({ error: err }));
          throw new Error(err);
        })
      ).subscribe((res: Annotation[]) => {
        this.store.dispatch(LoadAnnotationsSuccess({ annotations: res }));
      })
  }

}