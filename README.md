# Photo Library Exercise

A library of photos with an infinite photostream and a dedicated favorites section to collect all images liked by the user.

## Features Summary

### Photos Page
- Clicking a photo adds it to Favorites
- Infinite scroll loads additional images

### Favorites Page
- Clicking a photo shows photo enlarged and isolated

### Photo Detail Page
- Displays the selected photo enlarged
- Clicking the button below removes the photo from Favorites




## Tech Stack - Prerequisites
- Angular 20.3.3
- Angular Material
- Scss
- Karma for tests
- Picsum as the image source


## Project Structure
```
src/app/
│
├── core/
│   └── services/
│       ├── photos-api
│       └── favorite-photos
│   
├── features/
│   ├── favorites-page/
│   ├── header/
│   ├── photo-detail/
│   └── photos-page/
│
├── shared/
│   ├── models/
│   │   └── photo.model.ts
│   ├── data/
│   │   └── mock-photos.ts
│   └── ui/
│       └── photo-grid/
│
└── app.*
```

## Installation

```bash
# clone repository
git clone https://github.com/AnnaAlex1/PhotoLibraryExercise.git 

# navigate to repository
# then
cd photoLibrary/
npm install
```

Run Application
```bash
ng serve # runs at http://localhost:4200
```

Test
```
ng test
ng test --code-coverage
```

## 
