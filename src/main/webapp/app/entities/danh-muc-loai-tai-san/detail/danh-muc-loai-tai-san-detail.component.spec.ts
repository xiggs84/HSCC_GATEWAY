import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of } from 'rxjs';

import { DanhMucLoaiTaiSanDetailComponent } from './danh-muc-loai-tai-san-detail.component';

describe('DanhMucLoaiTaiSan Management Detail Component', () => {
  let comp: DanhMucLoaiTaiSanDetailComponent;
  let fixture: ComponentFixture<DanhMucLoaiTaiSanDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DanhMucLoaiTaiSanDetailComponent],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              loadComponent: () => import('./danh-muc-loai-tai-san-detail.component').then(m => m.DanhMucLoaiTaiSanDetailComponent),
              resolve: { danhMucLoaiTaiSan: () => of({ idLoaiTs: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(DanhMucLoaiTaiSanDetailComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhMucLoaiTaiSanDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load danhMucLoaiTaiSan on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', DanhMucLoaiTaiSanDetailComponent);

      // THEN
      expect(instance.danhMucLoaiTaiSan()).toEqual(expect.objectContaining({ idLoaiTs: 123 }));
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
