import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldsGalleryComponent } from './fields-gallery.component';

describe('FieldsGalleryComponent', () => {
  let component: FieldsGalleryComponent;
  let fixture: ComponentFixture<FieldsGalleryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FieldsGalleryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FieldsGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
