import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookShopComponent } from './book-shop.component';

describe('BookShopComponent', () => {
  let component: BookShopComponent;
  let fixture: ComponentFixture<BookShopComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookShopComponent]
    });
    fixture = TestBed.createComponent(BookShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
