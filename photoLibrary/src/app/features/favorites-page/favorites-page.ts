import { Component, inject } from '@angular/core';
import { FavoritePhotosService } from '../../core/services/favorite-photos';
import { PhotoGrid } from '../../shared/ui/photo-grid/photo-grid';
import { Photo } from '../../shared/models/photo.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favorites-page',
  imports: [PhotoGrid],
  templateUrl: './favorites-page.html',
  styleUrl: './favorites-page.scss',
})
export class FavoritesPage {

  private favoritePhotos = inject(FavoritePhotosService);
  private router = inject(Router);

  readonly favorites = this.favoritePhotos.favorites();

  onPhotoClicked(photo: Photo){
    this.router.navigate(['/photo', photo.id]);

  }

}
