import { TestBed} from '@angular/core/testing';
import { HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { NetworkInterceptor } from './network.interceptor';
import { LoadingService } from './loading.service';
import { finalize, catchError } from 'rxjs/operators';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('NetworkInterceptor', () => {
  let interceptor: NetworkInterceptor;
  let loadingService: LoadingService;
  let httpClient:HttpClient;
  let httpTestingController:HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [NetworkInterceptor, LoadingService]
    });
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    interceptor = TestBed.inject(NetworkInterceptor);
    loadingService = TestBed.inject(LoadingService);
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  it('should show loading before making an HTTP request', () => {
    spyOn(loadingService, 'show');
    const mockRequest = new HttpRequest('GET', 'https://example.com/api');

    interceptor.intercept(mockRequest, <HttpHandler>{ handle: () => new Observable<HttpEvent<unknown>>() });

    expect(loadingService.show).toHaveBeenCalled();
  });

  it('should hide loading after making an HTTP request', () => {
    
    let hide = spyOn(loadingService, 'hide');
    const mockRequest = new HttpRequest('GET', 'https://example.com/api');

    interceptor
      .intercept(mockRequest, <HttpHandler>{ handle: () => new Observable<HttpEvent<unknown>>() })
      .subscribe((res) => expect(hide).toHaveBeenCalled());

  });
  
  it('should hide loading after an HTTP error occurs', (done) => {
    httpClient.get('/okay').pipe(catchError((err) =>{
        return of(err);
       })).
           subscribe((res) => {
           expect(res).toBeTruthy();
           done();
        }
        );
    const request = httpTestingController.expectOne("/okay");
    request.flush("An error Occured in Service Call", {status:500, statusText: "Server Error"});
   
});

  afterEach(() => {
    httpTestingController.verify();
  });
});
