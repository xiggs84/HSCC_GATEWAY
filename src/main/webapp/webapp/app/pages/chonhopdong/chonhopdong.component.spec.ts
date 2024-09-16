import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChonhopdongComponent } from './chonhopdong.component';

describe('ChonhopdongComponent', () => {
  let component: ChonhopdongComponent;
  let fixture: ComponentFixture<ChonhopdongComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChonhopdongComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChonhopdongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
