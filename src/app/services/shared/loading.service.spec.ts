import { TestBed } from '@angular/core/testing';
import { LoadingService } from './loading.service';

describe('LoadingService', () => {
  let service: LoadingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should start with loading set to false', () => {
    service.loading$.subscribe((loading) => {
      expect(loading).toBe(false);
    });
  });

  it('should show loading', () => {
    service.show();
    service.loading$.subscribe((loading) => {
      expect(loading).toBe(true);
    });
  });

  it('should hide loading', () => {
    service.show(); // Start with loading set to true
    service.hide();
    service.loading$.subscribe((loading) => {
      expect(loading).toBe(false);
    });
  });
});
