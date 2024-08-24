jest.mock('@ng-bootstrap/ng-bootstrap');

import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { DmHuyenTmpService } from '../service/dm-huyen-tmp.service';

import { DmHuyenTmpDeleteDialogComponent } from './dm-huyen-tmp-delete-dialog.component';

describe('DmHuyenTmp Management Delete Component', () => {
  let comp: DmHuyenTmpDeleteDialogComponent;
  let fixture: ComponentFixture<DmHuyenTmpDeleteDialogComponent>;
  let service: DmHuyenTmpService;
  let mockActiveModal: NgbActiveModal;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DmHuyenTmpDeleteDialogComponent],
      providers: [provideHttpClient(), NgbActiveModal],
    })
      .overrideTemplate(DmHuyenTmpDeleteDialogComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(DmHuyenTmpDeleteDialogComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(DmHuyenTmpService);
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
