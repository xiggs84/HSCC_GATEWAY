import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VaitroComponent } from './vaitro.component';

describe('VaitroComponent', () => {
  let component: VaitroComponent;
  let fixture: ComponentFixture<VaitroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VaitroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VaitroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
