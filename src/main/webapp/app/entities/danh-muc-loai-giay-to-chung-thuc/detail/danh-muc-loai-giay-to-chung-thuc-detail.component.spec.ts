import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of } from 'rxjs';

import { DanhMucLoaiGiayToChungThucDetailComponent } from './danh-muc-loai-giay-to-chung-thuc-detail.component';

describe('DanhMucLoaiGiayToChungThuc Management Detail Component', () => {
  let comp: DanhMucLoaiGiayToChungThucDetailComponent;
  let fixture: ComponentFixture<DanhMucLoaiGiayToChungThucDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DanhMucLoaiGiayToChungThucDetailComponent],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              loadComponent: () =>
                import('./danh-muc-loai-giay-to-chung-thuc-detail.component').then(m => m.DanhMucLoaiGiayToChungThucDetailComponent),
              resolve: { danhMucLoaiGiayToChungThuc: () => of({ idLoaiGiayTo: 'ABC' }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(DanhMucLoaiGiayToChungThucDetailComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhMucLoaiGiayToChungThucDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load danhMucLoaiGiayToChungThuc on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', DanhMucLoaiGiayToChungThucDetailComponent);

      // THEN
      expect(instance.danhMucLoaiGiayToChungThuc()).toEqual(expect.objectContaining({ idLoaiGiayTo: 'ABC' }));
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
