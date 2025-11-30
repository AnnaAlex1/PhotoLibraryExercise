import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Photo } from '../../models/photo.model';
import { MatGridList, MatGridTile } from '@angular/material/grid-list';
import { MatCard } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { FavoritePhotosService } from '../../../core/services/favorite-photos';

@Component({
  selector: 'app-photo-grid',
  imports: [MatGridList, MatGridTile, MatCard, MatIcon],
  templateUrl: './photo-grid.html',
  styleUrl: './photo-grid.scss',
})
export class PhotoGrid {
  @Input() photoArray: Photo[] = [];
  @Output() photoClicked = new EventEmitter<Photo>();

  private favoritePhotosService = inject(FavoritePhotosService);

  onPhotoClick(photo: Photo) {
    this.photoClicked.emit(photo);
  };

  isFavorite(id: string): boolean {
    return this.favoritePhotosService.isFavorite(id);
  }


}
