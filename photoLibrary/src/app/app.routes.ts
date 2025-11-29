import { Routes } from '@angular/router';
import { PhotosPage } from './features/photos-page/photos-page';
import { FavoritesPage } from './features/favorites-page/favorites-page';
import { PhotoDetail } from './features/photo-detail/photo-detail';

export const routes: Routes = [
    {   path: '',  component: PhotosPage   },
    {   path: 'favorites', component: FavoritesPage    },
    {   path: 'photo/:id', component: PhotoDetail    },
    {   path: '**', redirectTo: ''   }
];
