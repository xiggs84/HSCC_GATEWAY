import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of } from 'rxjs';

import { DanhMucLoaiSoCongChungDetailComponent } from './danh-muc-loai-so-cong-chung-detail.component';

describe('DanhMucLoaiSoCongChung Management Detail Component', () => {
  let comp: DanhMucLoaiSoCongChungDetailComponent;
  let fixture: ComponentFixture<DanhMucLoaiSoCongChungDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DanhMucLoaiSoCongChungDetailComponent],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              loadComponent: () =>
                import('./danh-muc-loai-so-cong-chung-detail.component').then(m => m.DanhMucLoaiSoCongChungDetailComponent),
              resolve: { danhMucLoaiSoCongChung: () => of({ idLoai: 'ABC' }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(DanhMucLoaiSoCongChungDetailComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhMucLoaiSoCongChungDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load danhMucLoaiSoCongChung on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', DanhMucLoaiSoCongChungDetailComponent);

      // THEN
      expect(instance.danhMucLoaiSoCongChung()).toEqual(expect.objectContaining({ idLoai: 'ABC' }));
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
