import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PhotosPage } from './photos-page';
import { Photo } from '../../shared/models/photo.model';
import { FavoritePhotosService } from '../../core/services/favorite-photos';
import { PhotosApiService } from '../../core/services/photos-api';
import { of, throwError } from 'rxjs';

describe('PhotosPage', () => {
  let component: PhotosPage;
  let fixture: ComponentFixture<PhotosPage>;

  let favoritePhotosServiceSpy: jasmine.SpyObj<FavoritePhotosService>;
  let photoApiServiceSpy: jasmine.SpyObj<PhotosApiService>;


  const mockPhotos: Photo[] = [  // to be returned when getPhotosBatch is called
    { id: '1', url: 'https://picsum.photos/id/1/200/300' },
    { id: '2', url: 'https://picsum.photos/id/2/200/300' },
  ];



  beforeEach(async () => {

    // create spy objects
    favoritePhotosServiceSpy = jasmine.createSpyObj<FavoritePhotosService>(
      'FavoritePhotosService', ['decideToAddOrRemove', 'isFavorite']
    );

    photoApiServiceSpy = jasmine.createSpyObj<PhotosApiService>(
      'PhotosApiService', ['getPhotosBatch']
    );
    photoApiServiceSpy.getPhotosBatch.and.returnValue(of(mockPhotos));  // to avoid undefined



    await TestBed.configureTestingModule({
      imports: [PhotosPage],
      providers: [
        { provide: FavoritePhotosService, useValue: favoritePhotosServiceSpy }, 
        { provide: PhotosApiService, useValue: photoApiServiceSpy }
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhotosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should initialize the photos list with the first batch', () => {
    expect(photoApiServiceSpy.getPhotosBatch).toHaveBeenCalledTimes(1);
    expect(photoApiServiceSpy.getPhotosBatch).toHaveBeenCalledWith(component.batchSize, component.min_delay, component.max_delay);

    expect(component.photos).toEqual(mockPhotos);
    expect(component.isLoading).toBeFalse();

  });


  it('should call the decideToAddOrRemove with the photo, when that photo is clicked', () => {
    const photo: Photo = {
      id: '123',
      url: 'https://picsum.photos/id/5/200/300'
    };

    component.onPhotoClicked(photo);

    expect(favoritePhotosServiceSpy.decideToAddOrRemove).toHaveBeenCalledTimes(1);
    expect(favoritePhotosServiceSpy.decideToAddOrRemove).toHaveBeenCalledWith(photo)
    
  });



  // ------------- Window Scrolling

  it('should get another batch when scrolling near bottom', () => {

    component.isLoading = false;

    (photoApiServiceSpy.getPhotosBatch as jasmine.Spy).calls.reset(); // clear ngOnInit call
    photoApiServiceSpy.getPhotosBatch.and.returnValue(of([]));

    // Fake scrolling
    spyOnProperty(window, 'scrollY', 'get').and.returnValue(1000);
    spyOnProperty(document.documentElement, 'clientHeight', 'get').and.returnValue(500);
    spyOnProperty(document.documentElement, 'scrollHeight', 'get').and.returnValue(100);

    component.onWindowScroll();

    expect(photoApiServiceSpy.getPhotosBatch).toHaveBeenCalledTimes(1);

  });

  it('should not get another batch when scrolling did not pass threshold', () => {
    
    component.isLoading = false;
    (photoApiServiceSpy.getPhotosBatch as jasmine.Spy).calls.reset(); // clear ngOnInit call

    // Fake scrolling, but not close to bottom
    spyOnProperty(window, 'scrollY', 'get').and.returnValue(1000);
    spyOnProperty(document.documentElement, 'clientHeight', 'get').and.returnValue(500);
    spyOnProperty(document.documentElement, 'scrollHeight', 'get').and.returnValue(10000);

    component.onWindowScroll();

    expect(photoApiServiceSpy.getPhotosBatch).not.toHaveBeenCalled();
  });

  it('should not get another batch if loading is ongoing', () => {
    component.isLoading = true;
    (photoApiServiceSpy.getPhotosBatch as jasmine.Spy).calls.reset(); // clear ngOnInit call
    
    component.onWindowScroll();

    expect(photoApiServiceSpy.getPhotosBatch).not.toHaveBeenCalled();
  });


  it('should not get more photos if already in the process of getting', () => {
    (photoApiServiceSpy.getPhotosBatch as jasmine.Spy).calls.reset(); // clear ngOnInit call

    component.isLoading = true;
    component.onWindowScroll();
    expect(photoApiServiceSpy.getPhotosBatch).not.toHaveBeenCalled();
  });


  // ------ LoadPhotoBatch

  it('should not call getPhotosBatch if isLoading is already true', () => {

    (photoApiServiceSpy.getPhotosBatch as jasmine.Spy).calls.reset(); // clear ngOnInit call

    component.isLoading = true;
    (component as any).loadPhotoBatch(); // private

    expect(photoApiServiceSpy.getPhotosBatch).not.toHaveBeenCalled();
   
  });


  
  it('should reset isLoading to false when loadPhotoBatch gives an error', () => {

    (photoApiServiceSpy.getPhotosBatch as jasmine.Spy)
      .and.returnValue(throwError(() => new Error('Network error')));

    component['photos'] = [];     
    component['isLoading'] = false;


    component['loadPhotoBatch']();   

    // Assert
    expect(component.isLoading).toBeFalse();
    expect(component.photos).toEqual([]); // still unchanged
  });

  

});
