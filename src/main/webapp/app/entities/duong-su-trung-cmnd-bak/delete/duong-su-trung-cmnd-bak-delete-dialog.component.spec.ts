jest.mock('@ng-bootstrap/ng-bootstrap');

import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { DuongSuTrungCmndBakService } from '../service/duong-su-trung-cmnd-bak.service';

import { DuongSuTrungCmndBakDeleteDialogComponent } from './duong-su-trung-cmnd-bak-delete-dialog.component';

describe('DuongSuTrungCmndBak Management Delete Component', () => {
  let comp: DuongSuTrungCmndBakDeleteDialogComponent;
  let fixture: ComponentFixture<DuongSuTrungCmndBakDeleteDialogComponent>;
  let service: DuongSuTrungCmndBakService;
  let mockActiveModal: NgbActiveModal;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DuongSuTrungCmndBakDeleteDialogComponent],
      providers: [provideHttpClient(), NgbActiveModal],
    })
      .overrideTemplate(DuongSuTrungCmndBakDeleteDialogComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(DuongSuTrungCmndBakDeleteDialogComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(DuongSuTrungCmndBakService);
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
