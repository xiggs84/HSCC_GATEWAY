import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaitaisanComponent } from './loaitaisan.component';

describe('LoaitaisanComponent', () => {
  let component: LoaitaisanComponent;
  let fixture: ComponentFixture<LoaitaisanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoaitaisanComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoaitaisanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
