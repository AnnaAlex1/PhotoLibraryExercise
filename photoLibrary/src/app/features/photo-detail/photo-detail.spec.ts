import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoDetail } from './photo-detail';
import { ActivatedRoute, Router } from '@angular/router';
import { Photo } from '../../shared/models/photo.model';
import { FavoritePhotosService } from '../../core/services/favorite-photos';

describe('PhotoDetail', () => {
  let component: PhotoDetail;
  let fixture: ComponentFixture<PhotoDetail>;

  let routerSpy: jasmine.SpyObj<Router>;    
  let favoritePhotosService:  {
    favorites: () => Photo[];
    removeFromFavorites: jasmine.Spy;
  };

  let photoId: string | null;
  let activatedRoute: any;

  const photo: Photo = {
    id: '56',
    url: 'https://picsum.photos/id/56/200/300',
  };

  beforeEach(async () => {

    // initialization of data
    photoId = '56';

    activatedRoute = {
      snapshot: {
        paramMap: {
          get: (key: string) => photoId,
        },
      },
    };

    routerSpy = jasmine.createSpyObj<Router>('Router', ['navigate']);

    favoritePhotosService = {
      favorites: () => [],
      removeFromFavorites: jasmine.createSpy('removeFromFavorites'),
    };

    // await
    await TestBed.configureTestingModule({
      imports: [PhotoDetail],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRoute },
        { provide: Router, useValue: routerSpy },
        { provide: FavoritePhotosService, useValue: favoritePhotosService },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhotoDetail);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  // ngOnInit

  it('should load the photo when id is present', () => {
    photoId = '56';
    favoritePhotosService.favorites = () => [photo];

    fixture.detectChanges(); // ngOnInit here

    expect(component.photo).toEqual(photo);
    expect(routerSpy.navigate).not.toHaveBeenCalled();
  });
  
  it('should not load the photo when id is not present', () => {
    photoId = '0';
    favoritePhotosService.favorites = () => [photo];

    fixture.detectChanges(); // ngOnInit here

    expect(component.photo).not.toEqual(photo);
    expect(routerSpy.navigate).toHaveBeenCalled();
  });

  it('should return to /favourites if id is null', () => {
    photoId = null;

    fixture.detectChanges(); // ngOnInit here

    expect(routerSpy.navigate).toHaveBeenCalledWith(['/favorites']);
    expect(component.photo).toBeNull();
  });

  
  // onRemoveFromFavoritesClick
    it('should not do anything if photo is null', () => {
      component.photo = null;

      component.onRemoveFromFavoritesClick();

      expect(favoritePhotosService.removeFromFavorites).not.toHaveBeenCalled();
      expect(routerSpy.navigate).not.toHaveBeenCalled();

  });

    it('should remove photo from favorites if button is clicked and photo in favorites and navigate to /favorites', () => {
      component.photo = photo;

      component.onRemoveFromFavoritesClick();

      expect(favoritePhotosService.removeFromFavorites).toHaveBeenCalledWith('56');
      expect(routerSpy.navigate).toHaveBeenCalledWith(['/favorites']);

  });

});
