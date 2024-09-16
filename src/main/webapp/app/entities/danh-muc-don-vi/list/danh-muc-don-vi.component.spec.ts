import { ComponentFixture, TestBed, fakeAsync, inject, tick } from '@angular/core/testing';
import { HttpHeaders, HttpResponse, provideHttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subject, of } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { sampleWithRequiredData } from '../danh-muc-don-vi.test-samples';
import { DanhMucDonViService } from '../service/danh-muc-don-vi.service';

import { DanhMucDonViComponent } from './danh-muc-don-vi.component';
import SpyInstance = jest.SpyInstance;

describe('DanhMucDonVi Management Component', () => {
  let comp: DanhMucDonViComponent;
  let fixture: ComponentFixture<DanhMucDonViComponent>;
  let service: DanhMucDonViService;
  let routerNavigateSpy: SpyInstance<Promise<boolean>>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DanhMucDonViComponent],
      providers: [
        provideHttpClient(),
        {
          provide: ActivatedRoute,
          useValue: {
            data: of({
              defaultSort: 'idDonVi,asc',
            }),
            queryParamMap: of(
              jest.requireActual('@angular/router').convertToParamMap({
                page: '1',
                size: '1',
                sort: 'idDonVi,desc',
              }),
            ),
            snapshot: {
              queryParams: {},
              queryParamMap: jest.requireActual('@angular/router').convertToParamMap({
                page: '1',
                size: '1',
                sort: 'idDonVi,desc',
              }),
            },
          },
        },
      ],
    })
      .overrideTemplate(DanhMucDonViComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(DanhMucDonViComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(DanhMucDonViService);
    routerNavigateSpy = jest.spyOn(comp.router, 'navigate');

    jest
      .spyOn(service, 'query')
      .mockReturnValueOnce(
        of(
          new HttpResponse({
            body: [{ idDonVi: 123 }],
            headers: new HttpHeaders({
              link: '<http://localhost/api/foo?page=1&size=20>; rel="next"',
            }),
          }),
        ),
      )
      .mockReturnValueOnce(
        of(
          new HttpResponse({
            body: [{ idDonVi: 456 }],
            headers: new HttpHeaders({
              link: '<http://localhost/api/foo?page=0&size=20>; rel="prev",<http://localhost/api/foo?page=2&size=20>; rel="next"',
            }),
          }),
        ),
      );
  });

  it('Should call load all on init', () => {
    // WHEN
    comp.ngOnInit();

    // THEN
    expect(service.query).toHaveBeenCalled();
    expect(comp.danhMucDonVis?.[0]).toEqual(expect.objectContaining({ idDonVi: 123 }));
  });

  describe('trackIdDonVi', () => {
    it('Should forward to danhMucDonViService', () => {
      const entity = { idDonVi: 123 };
      jest.spyOn(service, 'getDanhMucDonViIdentifier');
      const idDonVi = comp.trackIdDonVi(0, entity);
      expect(service.getDanhMucDonViIdentifier).toHaveBeenCalledWith(entity);
      expect(idDonVi).toBe(entity.idDonVi);
    });
  });

  it('should calculate the sort attribute for a non-id attribute', () => {
    // WHEN
    comp.navigateToWithComponentValues({ predicate: 'non-existing-column', order: 'asc' });

    // THEN
    expect(routerNavigateSpy).toHaveBeenLastCalledWith(
      expect.anything(),
      expect.objectContaining({
        queryParams: expect.objectContaining({
          sort: ['non-existing-column,asc'],
        }),
      }),
    );
  });

  it('should calculate the sort attribute for an id', () => {
    // WHEN
    comp.ngOnInit();

    // THEN
    expect(service.query).toHaveBeenLastCalledWith(expect.objectContaining({ sort: ['idDonVi,desc'] }));
  });

  describe('delete', () => {
    let ngbModal: NgbModal;
    let deleteModalMock: any;

    beforeEach(() => {
      deleteModalMock = { componentInstance: {}, closed: new Subject() };
      // NgbModal is not a singleton using TestBed.inject.
      // ngbModal = TestBed.inject(NgbModal);
      ngbModal = (comp as any).modalService;
      jest.spyOn(ngbModal, 'open').mockReturnValue(deleteModalMock);
    });

    it('on confirm should call load', inject(
      [],
      fakeAsync(() => {
        // GIVEN
        jest.spyOn(comp, 'load');

        // WHEN
        comp.delete(sampleWithRequiredData);
        deleteModalMock.closed.next('deleted');
        tick();

        // THEN
        expect(ngbModal.open).toHaveBeenCalled();
        expect(comp.load).toHaveBeenCalled();
      }),
    ));

    it('on dismiss should call load', inject(
      [],
      fakeAsync(() => {
        // GIVEN
        jest.spyOn(comp, 'load');

        // WHEN
        comp.delete(sampleWithRequiredData);
        deleteModalMock.closed.next();
        tick();

        // THEN
        expect(ngbModal.open).toHaveBeenCalled();
        expect(comp.load).not.toHaveBeenCalled();
      }),
    ));
  });
});
