import { ComponentFixture, TestBed, async} from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ImageAnnotationsComponent } from './image-annotations.component';
import { ImageService } from '../services/image.service';
import { AnnotationService } from '../services/annotation.service';
import { ImageAnnotationService } from './image-annotations.service';
import { LoadingService } from '../services/shared/loading.service';
import { provideMockStore } from '@ngrx/store/testing';


describe('ImageAnnotationsComponent', () => {
  let component: ImageAnnotationsComponent;
  let fixture: ComponentFixture<ImageAnnotationsComponent>;
  const initialState = {};
 
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ImageAnnotationsComponent],
      providers: [
        ImageService,
        AnnotationService,
        ImageAnnotationService,
        LoadingService,
        provideMockStore(initialState)
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageAnnotationsComponent);
    component = fixture.componentInstance;
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
