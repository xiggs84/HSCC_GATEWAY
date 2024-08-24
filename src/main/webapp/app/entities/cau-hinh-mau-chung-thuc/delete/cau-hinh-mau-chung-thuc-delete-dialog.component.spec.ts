jest.mock('@ng-bootstrap/ng-bootstrap');

import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { CauHinhMauChungThucService } from '../service/cau-hinh-mau-chung-thuc.service';

import { CauHinhMauChungThucDeleteDialogComponent } from './cau-hinh-mau-chung-thuc-delete-dialog.component';

describe('CauHinhMauChungThuc Management Delete Component', () => {
  let comp: CauHinhMauChungThucDeleteDialogComponent;
  let fixture: ComponentFixture<CauHinhMauChungThucDeleteDialogComponent>;
  let service: CauHinhMauChungThucService;
  let mockActiveModal: NgbActiveModal;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CauHinhMauChungThucDeleteDialogComponent],
      providers: [provideHttpClient(), NgbActiveModal],
    })
      .overrideTemplate(CauHinhMauChungThucDeleteDialogComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(CauHinhMauChungThucDeleteDialogComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(CauHinhMauChungThucService);
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
