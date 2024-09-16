import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LichsugiaodichduongsuComponent } from './lichsugiaodichduongsu.component';

describe('LichsugiaodichduongsuComponent', () => {
  let component: LichsugiaodichduongsuComponent;
  let fixture: ComponentFixture<LichsugiaodichduongsuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LichsugiaodichduongsuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LichsugiaodichduongsuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
