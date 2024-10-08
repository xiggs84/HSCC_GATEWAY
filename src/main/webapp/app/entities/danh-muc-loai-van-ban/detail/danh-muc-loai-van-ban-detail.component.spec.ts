import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of } from 'rxjs';

import { DanhMucLoaiVanBanDetailComponent } from './danh-muc-loai-van-ban-detail.component';

describe('DanhMucLoaiVanBan Management Detail Component', () => {
  let comp: DanhMucLoaiVanBanDetailComponent;
  let fixture: ComponentFixture<DanhMucLoaiVanBanDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DanhMucLoaiVanBanDetailComponent],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              loadComponent: () => import('./danh-muc-loai-van-ban-detail.component').then(m => m.DanhMucLoaiVanBanDetailComponent),
              resolve: { danhMucLoaiVanBan: () => of({ idLoaiVb: 'ABC' }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(DanhMucLoaiVanBanDetailComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhMucLoaiVanBanDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load danhMucLoaiVanBan on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', DanhMucLoaiVanBanDetailComponent);

      // THEN
      expect(instance.danhMucLoaiVanBan()).toEqual(expect.objectContaining({ idLoaiVb: 'ABC' }));
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
