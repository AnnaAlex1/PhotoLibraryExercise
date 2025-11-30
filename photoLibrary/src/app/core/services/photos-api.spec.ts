import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { PhotosApiService } from './photos-api';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { Photo } from '../../shared/models/photo.model';
import { provideHttpClient } from '@angular/common/http';

describe('PhotosApi', () => {
  let service: PhotosApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PhotosApiService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(PhotosApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach( () => { httpMock.verify() })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should receive a list of Photos from PicSum of correct batchSize and correct page', fakeAsync( // for tick
    () => {

      let result: Photo[] | undefined;

      service.getPhotosBatch(2, 200, 300).subscribe( (photos) => { result = photos; } );

      const req = httpMock.expectOne('https://picsum.photos/v2/list?page=1&limit=2');
      expect(req.request.method).toBe('GET');
      req.flush([
        { id: '10', download_url: 'https://picsum.photos/id/10/200/300'},
        { id: '11', download_url: 'https://picsum.photos/id/11/200/300'},
      ]);
      
      tick(300); // to keep up with delay
      
      expect(result).toEqual([
        { id: '10', url: 'https://picsum.photos/id/10/200/300' },
        { id: '11', url: 'https://picsum.photos/id/11/200/300' },
      ]);

    }
  ));

  it('should receive the next page after the previous', fakeAsync(
      () => {

          // first time
          service.getPhotosBatch(2, 200, 300).subscribe();
          const req = httpMock.expectOne('https://picsum.photos/v2/list?page=1&limit=2');
          service.getPhotosBatch(2, 200, 300).subscribe();
          const req2 = httpMock.expectOne( 'https://picsum.photos/v2/list?page=2&limit=2');
      }
    )
  );


});

