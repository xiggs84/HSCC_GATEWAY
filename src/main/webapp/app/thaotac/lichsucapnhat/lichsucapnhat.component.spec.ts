import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LichsucapnhatComponent } from './lichsucapnhat.component';

describe('LichsucapnhatComponent', () => {
  let component: LichsucapnhatComponent;
  let fixture: ComponentFixture<LichsucapnhatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LichsucapnhatComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LichsucapnhatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
