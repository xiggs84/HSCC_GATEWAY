import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TinhtrangnganchanComponent } from './tinhtrangnganchan.component';

describe('TinhtrangnganchanComponent', () => {
  let component: TinhtrangnganchanComponent;
  let fixture: ComponentFixture<TinhtrangnganchanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TinhtrangnganchanComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TinhtrangnganchanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
