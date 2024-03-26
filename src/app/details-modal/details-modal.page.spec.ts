import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailsModalPage } from './details-modal.page';

describe('DetailsModalPage', () => {
  let component: DetailsModalPage;
  let fixture: ComponentFixture<DetailsModalPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DetailsModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
