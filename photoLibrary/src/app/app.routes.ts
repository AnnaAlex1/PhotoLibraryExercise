import { Routes } from '@angular/router';

export const routes: Routes = [
    {   
        path: '',  
        loadComponent: () => import('./features/photos-page/photos-page').then(m => m.PhotosPage)
    },
    {   
        path: 'favorites', 
        loadComponent: () => import('./features/favorites-page/favorites-page').then(m => m.FavoritesPage)    
    },
    {   
        path: 'photo/:id', 
        loadComponent: () => import('./features/photo-detail/photo-detail').then(m => m.PhotoDetail)
        },
    {   
        path: '**', 
        redirectTo: ''   
    }
];
