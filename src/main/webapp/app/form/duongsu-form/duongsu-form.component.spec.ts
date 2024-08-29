import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DuongsuFormComponent } from './duongsu-form.component';

describe('DuongsuFormComponent', () => {
  let component: DuongsuFormComponent;
  let fixture: ComponentFixture<DuongsuFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DuongsuFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DuongsuFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
