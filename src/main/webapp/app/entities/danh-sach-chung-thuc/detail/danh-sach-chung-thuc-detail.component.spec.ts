import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of } from 'rxjs';

import { DanhSachChungThucDetailComponent } from './danh-sach-chung-thuc-detail.component';

describe('DanhSachChungThuc Management Detail Component', () => {
  let comp: DanhSachChungThucDetailComponent;
  let fixture: ComponentFixture<DanhSachChungThucDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DanhSachChungThucDetailComponent],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              loadComponent: () => import('./danh-sach-chung-thuc-detail.component').then(m => m.DanhSachChungThucDetailComponent),
              resolve: { danhSachChungThuc: () => of({ idChungThuc: 'ABC' }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(DanhSachChungThucDetailComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhSachChungThucDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load danhSachChungThuc on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', DanhSachChungThucDetailComponent);

      // THEN
      expect(instance.danhSachChungThuc()).toEqual(expect.objectContaining({ idChungThuc: 'ABC' }));
    });
  });

  describe('PreviousState', () => {
    it('Should navigate to previous state', () => {
      jest.spyOn(window.history, 'back');
      comp.previousState();
      expect(window.history.back).toHaveBeenCalled();
    });
  });
});
