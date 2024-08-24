jest.mock('@ng-bootstrap/ng-bootstrap');

import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { SoCongChungTempService } from '../service/so-cong-chung-temp.service';

import { SoCongChungTempDeleteDialogComponent } from './so-cong-chung-temp-delete-dialog.component';

describe('SoCongChungTemp Management Delete Component', () => {
  let comp: SoCongChungTempDeleteDialogComponent;
  let fixture: ComponentFixture<SoCongChungTempDeleteDialogComponent>;
  let service: SoCongChungTempService;
  let mockActiveModal: NgbActiveModal;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SoCongChungTempDeleteDialogComponent],
      providers: [provideHttpClient(), NgbActiveModal],
    })
      .overrideTemplate(SoCongChungTempDeleteDialogComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(SoCongChungTempDeleteDialogComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(SoCongChungTempService);
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
