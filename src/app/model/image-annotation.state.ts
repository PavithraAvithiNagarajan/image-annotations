// since the store state can be extended named as ImgeAnnotation state 
export interface ImageAnnotationState{
    image:Blob | null,
    annotations: Annotation[],
    action: string,
    error:string | object
}

export interface Annotation{
    x:number,
    y:number,
    radiusX:number,
    radiusY:number,
    id:string
}

export interface APIResponse{
    status:string,
    message:string
}
// ENUMs for every ACTION defined
export enum ImageAnnotationTypes {
    Draw_Image_Annotation = "[Draw Image Annotation] Start to draw the image",
    Image_Success = "[Image Success] Successfully loaded the image",
    Image_Failure = "[Image Failure] Failed while loading the image",
    Annotation_Success = "[Annotation Success] Successfully loaded the annotation",
    Annotation_Failure = "[Annotation Failure] Failed while loading the annotation",
}