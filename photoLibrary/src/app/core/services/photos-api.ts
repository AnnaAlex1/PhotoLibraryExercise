import { inject, Injectable } from '@angular/core';
import { delay, map, Observable, of } from 'rxjs';
import { Photo } from '../../shared/models/photo.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PhotosApiService {

  private http = inject(HttpClient);

  private page = 0;
  

  getPhotosBatch(batchSize: number, min: number, max: number): Observable<Photo[]> {
    
    const delayTime = Math.floor(Math.random()*(max - min + 1)) + min; // random delay between min-max ms.

    this.page += 1;  // keeping track of page

    return this.http.get<Photo[]>(`https://picsum.photos/v2/list?page=${this.page}&limit=${batchSize}`)
    .pipe(
      map( 
        (picSumPhotos) => picSumPhotos.map(   // map to photos model
        (photo) => ({ 
          id: photo.id,
          url: `https://picsum.photos/id/${photo.id}/200/300`    
        })
        )
      ),
      delay(delayTime) // simulate the latency
    );
  } 

  
}
