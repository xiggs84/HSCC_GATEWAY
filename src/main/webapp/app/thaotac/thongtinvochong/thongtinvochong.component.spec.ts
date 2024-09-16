import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThongtinvochongComponent } from './thongtinvochong.component';

describe('ThongtinvochongComponent', () => {
  let component: ThongtinvochongComponent;
  let fixture: ComponentFixture<ThongtinvochongComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThongtinvochongComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThongtinvochongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
