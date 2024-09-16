import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonviFormComponent } from './donvi-form.component';

describe('DonviFormComponent', () => {
  let component: DonviFormComponent;
  let fixture: ComponentFixture<DonviFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DonviFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DonviFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
