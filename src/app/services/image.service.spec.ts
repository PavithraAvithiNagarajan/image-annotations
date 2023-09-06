import { TestBed} from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Store, StoreModule} from '@ngrx/store';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import { catchError, filter, of, throwError } from 'rxjs';
import { ImageService } from './image.service';
import { LoadImageError, LoadImageSuccess } from '../image-annotation-state/image-annotation.action';
import { getImage } from '../image-annotation-state/image-annotation.selector';
import { NetworkInterceptor } from './shared/network.interceptor'; 
import { ImageAnnotationState } from '../model/image-annotation.state';
import { initialState } from '../image-annotation-state/image-annotation.reducer';

describe('ImageService', () => {
  let imageService: ImageService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let store: MockStore<{imageAnnotation:ImageAnnotationState}> ;
  let done;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ImageService,
          {
            provide: HTTP_INTERCEPTORS,
            useClass: NetworkInterceptor,
            multi: true
          },
          provideMockStore()
      ],
    });

    imageService = TestBed.inject(ImageService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    store = TestBed.inject(MockStore);
    store.setState({
        imageAnnotation: initialState
    });
    
  });

  it('should be created', () => {
    expect(imageService).toBeTruthy();
  });

  it('should load an image successfully', (done) => {
    const mockImageBlob = new Blob(['Mock Image Data'], { type: 'image/jpeg' });
    spyOn(httpClient, 'get').and.returnValue(of(mockImageBlob));
    let dispatch = spyOn(store, 'dispatch').and.callThrough();

    imageService.loadImage();

    expect(httpClient.get).toHaveBeenCalledWith(imageService.imageUrl, new Object({ responseType: 'blob' }) );
    expect(dispatch).toHaveBeenCalledWith(LoadImageSuccess({image:mockImageBlob}));
    done();
  });

  it('should handle loading image error', (done) => {
    httpClient.get(imageService.imageUrl).pipe(catchError((err) =>{
        return of(err);
       })).
           subscribe((res) => {
           expect(res).toBeTruthy();
           done();
        }
    );
    let request = httpTestingController.expectOne(imageService.imageUrl);
    request.flush("An error Occured in Service Call", {status:500, statusText: "Server Error"});
    httpTestingController.verify();
  });

  afterEach(() => {
    httpTestingController.verify();
  });
});

