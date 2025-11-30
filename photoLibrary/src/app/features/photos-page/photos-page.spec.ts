import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotosPage } from './photos-page';
import { mock_photos } from '../../shared/data/mock-photos';
import { Photo } from '../../shared/models/photo.model';
import { FavoritePhotosService } from '../../core/services/favorite-photos';

describe('PhotosPage', () => {
  let component: PhotosPage;
  let fixture: ComponentFixture<PhotosPage>;
  let favoritePhotosServiceSpy: jasmine.SpyObj<FavoritePhotosService>


  beforeEach(async () => {
    favoritePhotosServiceSpy = jasmine.createSpyObj<FavoritePhotosService>(
      'FavoritePhotosService', ['decideToAddOrRemove', 'isFavorite']
    );

    await TestBed.configureTestingModule({
      imports: [PhotosPage],
      providers: [{ provide: FavoritePhotosService, useValue: favoritePhotosServiceSpy} ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhotosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should initialize the photos list with mock photos', () => {
    expect(component.photos).toBe(mock_photos);
  })

  it('should call the decideToAddOrRemove with the photo, when that photo is clicked', () => {
    const photo: Photo = {
      id: '123',
      url: 'https://picsum.photos/id/5/200/300'
    };

    component.onPhotoClicked(photo);

    expect(favoritePhotosServiceSpy.decideToAddOrRemove).toHaveBeenCalledTimes(1);
    expect(favoritePhotosServiceSpy.decideToAddOrRemove).toHaveBeenCalledWith(photo)
    
  })

});
