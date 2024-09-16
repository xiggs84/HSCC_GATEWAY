import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaisanFormComponent } from './taisan-form.component';

describe('TaisanFormComponent', () => {
  let component: TaisanFormComponent;
  let fixture: ComponentFixture<TaisanFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaisanFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaisanFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
