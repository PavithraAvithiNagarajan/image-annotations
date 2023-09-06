import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ImageAnnotationState } from "../model/image-annotation.state";

export const getFeatureForImageAnnotation = createFeatureSelector<ImageAnnotationState>('imageAnnotation');

export const getAction = createSelector(getFeatureForImageAnnotation, (state)=>state.action);

// SELECTS complete annotation list
export const getAnnotations = createSelector(getFeatureForImageAnnotation, (state)=>state.annotations);

export const getImage = createSelector(getFeatureForImageAnnotation, (state) => state.image);

// SELECTS current Image Annotation last annotation object, considering it would be the latest
export const getLastAnnotations = createSelector(getFeatureForImageAnnotation, (state) => state.annotations.slice(-1)[0]);

export const getErrorMessage = createSelector(getFeatureForImageAnnotation,(state) => state.error);
