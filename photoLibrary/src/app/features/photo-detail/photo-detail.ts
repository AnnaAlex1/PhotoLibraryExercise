import { Component, inject } from '@angular/core';
import { Photo } from '../../shared/models/photo.model';
import { ActivatedRoute, Router } from '@angular/router';
import { FavoritePhotosService } from '../../core/services/favorite-photos';
import { MatCard } from '@angular/material/card';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-photo-detail',
  imports: [MatCard, MatButton],
  templateUrl: './photo-detail.html',
  styleUrl: './photo-detail.scss',
})
export class PhotoDetail {

  photo: Photo | null = null;

  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);
  private favoritesService = inject(FavoritePhotosService);

  ngOnInit(): void {

    // get the photo id from route
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    console.log(id);

    if (!id) {
      this.router.navigate(['/favorites']);
      return;
    }

    // retrieve photo from favorites based on the id
    this.photo = this.favoritesService.favorites().find(photo => photo.id === id) ?? null;
    console.log(this.photo?.url);

    if (!this.photo) {
      this.router.navigate(['/favorites']);
    }

  }

  onRemoveFromFavoritesClick(): void {
    if (!this.photo) return;
    this.favoritesService.removeFromFavorites(this.photo.id)
    this.router.navigate(['/favorites']);
  }


}
