import { Component, inject } from '@angular/core';
import { FavoritePhotosService } from '../../core/services/favorite-photos';
import { PhotoGrid } from '../../shared/ui/photo-grid/photo-grid';

@Component({
  selector: 'app-favorites-page',
  imports: [PhotoGrid],
  templateUrl: './favorites-page.html',
  styleUrl: './favorites-page.scss',
})
export class FavoritesPage {

  private favoritePhotos = inject(FavoritePhotosService);

  readonly favorites = this.favoritePhotos.favorites();

}
