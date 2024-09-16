import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DanhsachhopdongComponent } from './danhsachhopdong.component';

describe('DanhsachhopdongComponent', () => {
  let component: DanhsachhopdongComponent;
  let fixture: ComponentFixture<DanhsachhopdongComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DanhsachhopdongComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DanhsachhopdongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
