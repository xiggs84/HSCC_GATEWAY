import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XoaComponent } from './xoa.component';

describe('XoaComponent', () => {
  let component: XoaComponent;
  let fixture: ComponentFixture<XoaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [XoaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(XoaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
