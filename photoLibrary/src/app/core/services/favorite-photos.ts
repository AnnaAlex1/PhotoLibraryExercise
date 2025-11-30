import { computed, Injectable, signal } from '@angular/core';
import { Photo } from '../../shared/models/photo.model';

@Injectable({
  providedIn: 'root',
})
export class FavoritePhotosService {

  private readonly _favorites = signal<Photo[]>([]); // private

  readonly favorites = computed( () => this._favorites()); // publicly accessible


  isFavorite(id: string): boolean {  // return true if exists, false otherwise
    return this._favorites().some( ph => ph.id === id);
  }

  addToFavorites(photo: Photo): void {
    if(this.isFavorite(photo.id)) return; // if alredy in, return
    this._favorites.update( list => [...list, photo]);
  }

  removeFromFavorites(id: string): void {
    this._favorites.update( list => list.filter(ph => ph.id !== id));
  }

  decideToAddOrRemove(photo: Photo): void {
    if (this.isFavorite(photo.id)){
      this.removeFromFavorites(photo.id);
    } else {
      this.addToFavorites(photo)
    }
  }


  

}
