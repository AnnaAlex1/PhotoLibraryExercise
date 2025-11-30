import { Component, HostListener, inject } from '@angular/core';
import { Photo } from '../../shared/models/photo.model';
import { PhotoGrid } from "../../shared/ui/photo-grid/photo-grid";
import { FavoritePhotosService } from '../../core/services/favorite-photos';
import { PhotosApiService } from '../../core/services/photos-api';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-photos-page',
  imports: [PhotoGrid, MatProgressSpinner],
  templateUrl: './photos-page.html',
  styleUrl: './photos-page.scss',
})
export class PhotosPage {
  photos: Photo[] = [];
  isLoading = false;

  readonly batchSize = 20;
  readonly min_delay = 200;
  readonly max_delay = 300;

  private photosApiService = inject(PhotosApiService);
  private favoritePhotosService = inject(FavoritePhotosService);


  ngOnInit(): void {       
    this.loadPhotoBatch(); // load first batch of photos on init
  }


  onPhotoClicked(photo: Photo): void {
    this.favoritePhotosService.decideToAddOrRemove(photo);  // when photo clicked, add or remove from favorites
  }


  // Retrieve photos
  private loadPhotoBatch(): void {      
    if (this.isLoading) {
      return;
    }

    this.isLoading = true; // start loading of pictures -> apply loading icon, block requests

    this.photosApiService.getPhotosBatch(this.batchSize, this.min_delay, this.max_delay).subscribe({
      next: (newPhotos) => {
        this.photos = [...this.photos, ...newPhotos];
      },
      error: (error) => {
        console.error('Failed to load photos', error);
        this.isLoading = false; // photos not retrieved, but operation finished -> remove loading icon, unblock requests
      },
      complete: () => {
        this.isLoading = false; // photos retrieved -> remove loading icon, unblock requests
      }
    })
  }

  

  // On screen scrolling
  @HostListener('window:scroll', [])
  onWindowScroll(): void {

    if (this.isLoading) return;
    
    const scrollPosition = window.innerHeight + window.scrollY; // get the bottom of window
    const threshold = document.body.offsetHeight - 50; // when to initiate scrolling

    if (scrollPosition >= threshold){
      this.loadPhotoBatch();
    }

  }


}
