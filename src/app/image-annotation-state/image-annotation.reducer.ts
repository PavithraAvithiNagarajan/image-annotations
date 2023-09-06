import { createReducer, on } from "@ngrx/store";
import { LoadAnnotationsError, LoadAnnotationsSuccess,
    DrawImageAndAnnotationsButtonClicked, LoadImageError, LoadImageSuccess } from "./image-annotation.action";
import { ImageAnnotationState } from "../model/image-annotation.state";


export const initialState:ImageAnnotationState = {
    error: "",
    action:"",
    annotations:[],
    image: null
}

export const imageAnnotationReducer = createReducer(initialState, 
    on(DrawImageAndAnnotationsButtonClicked, (state, action) => ({
        ...state,
        ...initialState,
        action:action.type,
    })),

    on(LoadImageSuccess, (state, action) => ({
        ...state,
        action:action.type,
        image:action.image
    })),

    on(LoadImageError, (state, action) => ({
        ...state,
        action:action.type,
        error:action.error
    })),

    on(LoadAnnotationsSuccess, (state, action) => ({
        ...state,
        action:action.type,
        annotations:[...state.annotations, ...action.annotations]
    })),

    on(LoadAnnotationsError, (state, action) => ({
        ...state,
        action:action.type,
        error:action.error
    })),
    )