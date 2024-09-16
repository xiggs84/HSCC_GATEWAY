import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VanbanFormComponent } from './vanban-form.component';

describe('VanbanFormComponent', () => {
  let component: VanbanFormComponent;
  let fixture: ComponentFixture<VanbanFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VanbanFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VanbanFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
