import { Component, ElementRef, ViewChild } from '@angular/core';
import { ImageAnnotationState, ImageAnnotationTypes } from '../model/image-annotation.state';
import { Store, select } from '@ngrx/store';
import { getAction, getErrorMessage } from '../image-annotation-state/image-annotation.selector';
import { DrawImageAndAnnotationsButtonClicked } from '../image-annotation-state/image-annotation.action';
import { LoadingService } from '../services/shared/loading.service'
import { ImageService } from '../services/image.service';
import { AnnotationService } from '../services/annotation.service';
import { ImageAnnotationService } from './image-annotations.service';

@Component({
  selector: 'app-image-annotations',
  templateUrl: './image-annotations.component.html',
  styleUrls: ['./image-annotations.component.css']
})
export class ImageAnnotationsComponent {

  public loading$ = this.loader.loading$; //variable to show the loading screen when service call is triggered
  errorMessage!: string | Object; // gets the error message from Image / Service call
  @ViewChild('canvas') canvas!: ElementRef; // using ViewChild just to security attacks we can also go with DOM 
  constructor(private store:Store<ImageAnnotationState>, public loader: LoadingService, 
    private imageService: ImageService,private annotationService:AnnotationService,private imageAnnotationService: ImageAnnotationService){}

  ngOnInit(){
    
    /*
     Here I Have done the linear execution of actions considering medical
     Image, annotation points might vary on every click or over the period of time
    */
    this.store.pipe(
      select(getAction)
    ).subscribe(action => {
        if(!action)
        return;
        switch(action){
          case ImageAnnotationTypes.Draw_Image_Annotation :
            this.imageService.loadImage();
            break;
          case ImageAnnotationTypes.Image_Success :
            this.annotationService.loadAnnotations();
            break;
          case ImageAnnotationTypes.Annotation_Success :
            let canvasData = this.canvas.nativeElement;
            this.imageAnnotationService.drawImageAndAnnotation(canvasData);
            break;
          case ImageAnnotationTypes.Annotation_Failure:
            this.handleError();
            break;
          case ImageAnnotationTypes.Image_Failure:
            this.handleError();
            break
        }
    })
  }
  
  /*
    On Button Click starts the DRAW_IMAGE action
  */
  drawAnnotationImage(){
    this.store.dispatch(DrawImageAndAnnotationsButtonClicked());
  }
  
  /*Error handling of Load Image Failure or Load Annotation Failure
    since annotation call occurs only if image becomes success.
  */
  handleError(){
    this.store.select(getErrorMessage).subscribe((error)=>{
    this.errorMessage = error;
    });
  }
  
}
