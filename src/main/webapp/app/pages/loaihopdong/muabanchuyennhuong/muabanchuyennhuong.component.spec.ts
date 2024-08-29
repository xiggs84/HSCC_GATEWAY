import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MuabanchuyennhuongComponent } from './muabanchuyennhuong.component';

describe('MuabanchuyennhuongComponent', () => {
  let component: MuabanchuyennhuongComponent;
  let fixture: ComponentFixture<MuabanchuyennhuongComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MuabanchuyennhuongComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MuabanchuyennhuongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
