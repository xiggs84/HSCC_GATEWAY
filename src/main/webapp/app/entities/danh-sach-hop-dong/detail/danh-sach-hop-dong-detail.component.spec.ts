import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of } from 'rxjs';

import { DanhSachHopDongDetailComponent } from './danh-sach-hop-dong-detail.component';

describe('DanhSachHopDong Management Detail Component', () => {
  let comp: DanhSachHopDongDetailComponent;
  let fixture: ComponentFixture<DanhSachHopDongDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DanhSachHopDongDetailComponent],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              loadComponent: () => import('./danh-sach-hop-dong-detail.component').then(m => m.DanhSachHopDongDetailComponent),
              resolve: { danhSachHopDong: () => of({ idHopDong: 'ABC' }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(DanhSachHopDongDetailComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhSachHopDongDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load danhSachHopDong on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', DanhSachHopDongDetailComponent);

      // THEN
      expect(instance.danhSachHopDong()).toEqual(expect.objectContaining({ idHopDong: 'ABC' }));
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
