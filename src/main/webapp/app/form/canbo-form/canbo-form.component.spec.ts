import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CanboFormComponent } from './canbo-form.component';

describe('CanboFormComponent', () => {
  let component: CanboFormComponent;
  let fixture: ComponentFixture<CanboFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CanboFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CanboFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
