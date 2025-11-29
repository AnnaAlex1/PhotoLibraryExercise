import { Component } from '@angular/core';
import { mock_photos } from '../../shared/data/mock-photos';
import { Photo } from '../../shared/models/photo.model';
import { PhotoGrid } from "../../shared/ui/photo-grid/photo-grid";

@Component({
  selector: 'app-photos-page',
  imports: [PhotoGrid],
  templateUrl: './photos-page.html',
  styleUrl: './photos-page.scss',
})
export class PhotosPage {
  photos: Photo[] = mock_photos;
}
