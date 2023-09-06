import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient} from '@angular/common/http';
import { Store, StoreModule } from '@ngrx/store';
import { catchError, of } from 'rxjs';
import { AnnotationService } from './annotation.service';
import { LoadAnnotationsSuccess } from '../image-annotation-state/image-annotation.action';

describe('AnnotationService', () => {
  let annotationService: AnnotationService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let store: Store;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, StoreModule.forRoot({})], // Add your NgRx store configuration here
      providers: [AnnotationService],
    });

    annotationService = TestBed.inject(AnnotationService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    store = TestBed.inject(Store);
  });

  it('should be created', () => {
    expect(annotationService).toBeTruthy();
  });

  it('should load annotations successfully', () => {
    const mockAnnotations = [{ id: 'a2', radiusX: 20, radiusY: 25, x: 50, y: 60 }];
    spyOn(httpClient, 'get').and.returnValue(of({ message: JSON.stringify(mockAnnotations) }));
    spyOn(store, 'dispatch');
    annotationService.loadAnnotations();
    expect(httpClient.get).toHaveBeenCalledWith(annotationService.annotationUrl);
    expect(store.dispatch).toHaveBeenCalledWith(LoadAnnotationsSuccess({ annotations: mockAnnotations }));
  });

  it('should handle loading annotations error', (done) => {
    httpClient.get(annotationService.annotationUrl).pipe(catchError((err) =>{
        return of(err);
       })).
           subscribe((res) => {
           expect(res).toBeTruthy();
           done();
        }
    );
    let request = httpTestingController.expectOne(annotationService.annotationUrl);
    request.flush("An error Occured in Service Call", {status:500, statusText: "Server Error"});
    httpTestingController.verify();
   });
  afterEach(() => {
    httpTestingController.verify();
  });
});
