import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoGrid } from './photo-grid';
import { Photo } from '../../models/photo.model';
import { By } from '@angular/platform-browser';

describe('PhotoGrid', () => {
  let component: PhotoGrid;
  let fixture: ComponentFixture<PhotoGrid>;

  const mock_photos: Photo[] = [
    { id: "1", url: 'photo1.jpg' },
    { id: "2", url: 'photo2.jpg' },
    { id: "3", url: 'photo3.jpg' }
  ]

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhotoGrid]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhotoGrid);
    component = fixture.componentInstance;
    component.photoArray = mock_photos;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should render all photos', () => {
    const photosRendered = fixture.debugElement.queryAll(By.css('mat-grid-tile') );
    expect(photosRendered.length).toBe(mock_photos.length);
  });

  it('should emit photoClicked when a photo is cliccked', () => {
    spyOn(component.photoClicked, 'emit');

    const photo = fixture.debugElement.queryAll(By.css('mat-grid-tile'))[0];
    photo.triggerEventHandler('click', null);

    expect(component.photoClicked.emit).toHaveBeenCalledWith(mock_photos[0]);
  })

});
