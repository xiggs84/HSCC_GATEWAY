import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DuongsuComponent } from './duongsu.component';

describe('DuongsuComponent', () => {
  let component: DuongsuComponent;
  let fixture: ComponentFixture<DuongsuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DuongsuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DuongsuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
