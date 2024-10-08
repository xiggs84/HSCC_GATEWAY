import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaisanComponent } from './taisan.component';

describe('TaisanComponent', () => {
  let component: TaisanComponent;
  let fixture: ComponentFixture<TaisanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaisanComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaisanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
