import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Photo } from '../../models/photo.model';
import { MatGridList, MatGridTile } from '@angular/material/grid-list';

@Component({
  selector: 'app-photo-grid',
  imports: [MatGridList, MatGridTile],
  templateUrl: './photo-grid.html',
  styleUrl: './photo-grid.scss',
})
export class PhotoGrid {
  @Input() photoArray: Photo[] = [];
  @Output() photoClicked = new EventEmitter<Photo>();

  onPhotoClick(photo: Photo) {
    this.photoClicked.emit(photo);
  }


}
