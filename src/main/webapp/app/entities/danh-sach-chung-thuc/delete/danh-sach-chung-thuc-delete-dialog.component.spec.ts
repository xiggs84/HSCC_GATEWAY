jest.mock('@ng-bootstrap/ng-bootstrap');

import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { DanhSachChungThucService } from '../service/danh-sach-chung-thuc.service';

import { DanhSachChungThucDeleteDialogComponent } from './danh-sach-chung-thuc-delete-dialog.component';

describe('DanhSachChungThuc Management Delete Component', () => {
  let comp: DanhSachChungThucDeleteDialogComponent;
  let fixture: ComponentFixture<DanhSachChungThucDeleteDialogComponent>;
  let service: DanhSachChungThucService;
  let mockActiveModal: NgbActiveModal;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DanhSachChungThucDeleteDialogComponent],
      providers: [provideHttpClient(), NgbActiveModal],
    })
      .overrideTemplate(DanhSachChungThucDeleteDialogComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(DanhSachChungThucDeleteDialogComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(DanhSachChungThucService);
    mockActiveModal = TestBed.inject(NgbActiveModal);
  });

  describe('confirmDelete', () => {
    it('Should call delete service on confirmDelete', inject(
      [],
      fakeAsync(() => {
        // GIVEN
        jest.spyOn(service, 'delete').mockReturnValue(of(new HttpResponse({ body: {} })));

        // WHEN
        comp.confirmDelete(123);
        tick();

        // THEN
        expect(service.delete).toHaveBeenCalledWith(123);
        expect(mockActiveModal.close).toHaveBeenCalledWith('deleted');
      }),
    ));

    it('Should not call delete service on clear', () => {
      // GIVEN
      jest.spyOn(service, 'delete');

      // WHEN
      comp.cancel();

      // THEN
      expect(service.delete).not.toHaveBeenCalled();
      expect(mockActiveModal.close).not.toHaveBeenCalled();
      expect(mockActiveModal.dismiss).toHaveBeenCalled();
    });
  });
});
