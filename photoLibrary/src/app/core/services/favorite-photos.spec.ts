import { TestBed } from '@angular/core/testing';

import { FavoritePhotosService } from './favorite-photos';
import { Photo } from '../../shared/models/photo.model';

describe('FavoritePhotos', () => {
  let service: FavoritePhotosService;

  const photo1: Photo = { id: '1', url: 'https://picsum.photos/id/1/200/300' };
  const photo2: Photo = { id: '2', url: 'https://picsum.photos/id/2/200/300' };

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavoritePhotosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('isFavorite should return true when photo is in favorites list', () => {
    service.addToFavorites(photo1);
    expect(service.isFavorite(photo1.id)).toBeTrue();
  });

  it('isFavorite should return false when photo is not in favorites list', () => {
    expect(service.isFavorite(photo1.id)).toBeFalse();
  });


  it('should add a photo to favorites list', () => {
    service.addToFavorites(photo1);

    const favorites = service.favorites();
    expect(favorites.length).toBe(1);
    expect(favorites[0]).toEqual(photo1);
  });

  it('should not add the same photo twice', () => {
    service.addToFavorites(photo1);
    service.addToFavorites(photo1);

    const favorites = service.favorites();
    expect(favorites.length).toBe(1);
  });

  it('should remove a photo from favorites list', () => {
    service.addToFavorites(photo1);
    
    service.removeFromFavorites(photo1.id);

    const favorites = service.favorites();
    expect(favorites.length).toBe(0);
    expect(service.isFavorite(photo1.id)).toBeFalse();
  });



  it('decideAddOrRemove should add when not favorite', () => {
    service.decideToAddOrRemove(photo1);

    const favorites = service.favorites();
    expect(favorites.length).toBe(1);
    expect(service.isFavorite(photo1.id)).toBeTrue();
  
  });

  it('decideAddorRemove should remove when already favorite', () => {
    service.addToFavorites(photo1);

    service.decideToAddOrRemove(photo1);

    const favorites = service.favorites;
    expect(favorites.length).toBe(0);
    expect(service.isFavorite(photo1.id)).toBeFalse();
   
  });


});
