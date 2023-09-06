/*
Created this separate File on considering 2 points
1. Easy Readability
2. Modularity
*/
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { combineLatest} from "rxjs";
import { getImage, getLastAnnotations } from "../image-annotation-state/image-annotation.selector";
import {Annotation, ImageAnnotationState } from "../model/image-annotation.state";

@Injectable({providedIn:'root'})

export class ImageAnnotationService{
    constructor(private store:Store<ImageAnnotationState>, private httpClient:HttpClient){}

    // Selects Image and Annotation store data and pass it along to File Reader
    drawImageAndAnnotation(canvasData:HTMLCanvasElement){
        combineLatest([this.store.select(getImage),
            this.store.select(getLastAnnotations)])
            .subscribe(([imageData, annotationData]) =>{
                 if(imageData && annotationData) this.imageFileReader(imageData, annotationData, canvasData)
            })
    }
 
    // Applies Canvas element with Annotation points on Image via File Reader
    imageFileReader(imageData:Blob, annotationData:Annotation,elementRef:HTMLCanvasElement){
        let reader = new FileReader();
        let candata  = elementRef;
        let context = candata.getContext('2d');
        reader.addEventListener("load", () => {
         let imageURL:any= reader.result;
         let image = new Image();
         image.onload = () =>{
         context?.drawImage(image,0,0);
         context?.beginPath();
         // considered startAngle as 0 and End Angle as 2 Pie
         context?.ellipse(annotationData.x, annotationData.y,annotationData.radiusX,annotationData.radiusY, 0, 0, 2 * Math.PI);
         context?.stroke(); 
         }
         image.src = imageURL;
         }, false);
        if (imageData) {
        reader.readAsDataURL(imageData);
        }
      }
}