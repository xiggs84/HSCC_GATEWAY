import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonviComponent } from './donvi.component';

describe('DonviComponent', () => {
  let component: DonviComponent;
  let fixture: ComponentFixture<DonviComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DonviComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DonviComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
