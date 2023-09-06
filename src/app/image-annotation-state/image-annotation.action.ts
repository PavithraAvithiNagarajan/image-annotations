import { createAction, props } from "@ngrx/store";
import { Annotation, ImageAnnotationTypes } from "../model/image-annotation.state";

export const DrawImageAndAnnotationsButtonClicked = createAction(ImageAnnotationTypes.Draw_Image_Annotation);
export const LoadImageSuccess = createAction(ImageAnnotationTypes.Image_Success, props<{image:Blob}>());
export const LoadImageError = createAction(ImageAnnotationTypes.Image_Failure, props<{error:string}>());
export const LoadAnnotationsSuccess = createAction(ImageAnnotationTypes.Annotation_Success, props<{annotations:Annotation[]}>());
export const LoadAnnotationsError = createAction(ImageAnnotationTypes.Annotation_Failure, props<{error:string}>());