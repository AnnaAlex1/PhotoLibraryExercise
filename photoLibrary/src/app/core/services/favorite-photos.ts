import { computed, effect, Injectable, signal } from '@angular/core';
import { Photo } from '../../shared/models/photo.model';

@Injectable({
  providedIn: 'root',
})
export class FavoritePhotosService {

  private readonly STORAGE_KEY = 'favorites';

  private readonly _favorites = signal<Photo[]>(this.loadFromStorage()); // private
  readonly favorites = computed( () => this._favorites()); // publicly accessible

  constructor() {
    effect(() => {
      const current = this._favorites();
      try {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(current));
      } catch {
        // ignore storage errors
      }
    });
  }



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
      this.addToFavorites(photo);
    }
  }




  // storage appproach
  private loadFromStorage(): Photo[] {
    try {
      const storageContent = localStorage.getItem(this.STORAGE_KEY);
      if (!storageContent) return [];

      const parsed = JSON.parse(storageContent) as Photo[];

      if (!Array.isArray(parsed)) return [];
        
      return parsed;

    } catch {
      return [];
    }
  }
  

}
