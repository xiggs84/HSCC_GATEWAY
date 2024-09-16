import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemthongtinnganchanComponent } from './themthongtinnganchan.component';

describe('ThemthongtinnganchanComponent', () => {
  let component: ThemthongtinnganchanComponent;
  let fixture: ComponentFixture<ThemthongtinnganchanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThemthongtinnganchanComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThemthongtinnganchanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
