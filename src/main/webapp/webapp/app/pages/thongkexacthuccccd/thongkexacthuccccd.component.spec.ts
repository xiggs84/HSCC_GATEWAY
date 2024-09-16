import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThongkexacthuccccdComponent } from './thongkexacthuccccd.component';

describe('ThongkexacthuccccdComponent', () => {
  let component: ThongkexacthuccccdComponent;
  let fixture: ComponentFixture<ThongkexacthuccccdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThongkexacthuccccdComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThongkexacthuccccdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
