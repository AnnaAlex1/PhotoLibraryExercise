import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoritesPage } from './favorites-page';
import { Photo } from '../../shared/models/photo.model';
import { Router } from '@angular/router';

describe('FavoritesPage', () => {
  let component: FavoritesPage;
  let fixture: ComponentFixture<FavoritesPage>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    
    routerSpy = jasmine.createSpyObj<Router>('Router', ['navigate']);
    
    await TestBed.configureTestingModule({
      imports: [FavoritesPage],
      providers: [ { provide: Router, useValue: routerSpy }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavoritesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to the photo detail page when the photo is clicked', () => {
    const photo: Photo = {
      id: '1',
      url: 'https://picsum.photos/id/1/200/300',
    };

    component.onPhotoClicked(photo);

    expect(routerSpy.navigate).toHaveBeenCalledWith(['/photo', '1']);
  });
});
