import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Header } from './header';
import { ActivatedRoute, Router } from '@angular/router';

describe('Header', () => {
  let component: Header;
  let fixture: ComponentFixture<Header>;
  let routerMock: any;

  beforeEach(async () => {
    routerMock = {
      url: '/home'      // default for test
    };
    
    await TestBed.configureTestingModule({
      imports: [Header],
      providers: [ 
        {provide: Router, useValue: routerMock},
        {provide: ActivatedRoute, useValue: {}}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Header);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('isActive()', () => {
    it('should return true when router.url matches the route', () => {
      routerMock.url = '/home';
      expect(component.isActive('/home')).toBeTrue();
    });

    it('should return false when router.url does not match the route', () => {
      routerMock.url = '/';
      expect(component.isActive('/favorite')).toBeFalse();
    });
  });
});
