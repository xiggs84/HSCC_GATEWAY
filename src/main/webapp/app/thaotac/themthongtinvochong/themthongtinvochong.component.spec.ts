import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemthongtinvochongComponent } from './themthongtinvochong.component';

describe('ThemthongtinvochongComponent', () => {
  let component: ThemthongtinvochongComponent;
  let fixture: ComponentFixture<ThemthongtinvochongComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThemthongtinvochongComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThemthongtinvochongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
