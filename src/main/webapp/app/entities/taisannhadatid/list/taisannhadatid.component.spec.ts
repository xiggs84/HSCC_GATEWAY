import { ComponentFixture, TestBed, fakeAsync, inject, tick } from '@angular/core/testing';
import { HttpHeaders, HttpResponse, provideHttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subject, of } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { sampleWithRequiredData } from '../taisannhadatid.test-samples';
import { TaisannhadatidService } from '../service/taisannhadatid.service';

import { TaisannhadatidComponent } from './taisannhadatid.component';
import SpyInstance = jest.SpyInstance;

describe('Taisannhadatid Management Component', () => {
  let comp: TaisannhadatidComponent;
  let fixture: ComponentFixture<TaisannhadatidComponent>;
  let service: TaisannhadatidService;
  let routerNavigateSpy: SpyInstance<Promise<boolean>>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TaisannhadatidComponent],
      providers: [
        provideHttpClient(),
        {
          provide: ActivatedRoute,
          useValue: {
            data: of({
              defaultSort: 'idTaiSan,asc',
            }),
            queryParamMap: of(
              jest.requireActual('@angular/router').convertToParamMap({
                page: '1',
                size: '1',
                sort: 'idTaiSan,desc',
              }),
            ),
            snapshot: {
              queryParams: {},
              queryParamMap: jest.requireActual('@angular/router').convertToParamMap({
                page: '1',
                size: '1',
                sort: 'idTaiSan,desc',
              }),
            },
          },
        },
      ],
    })
      .overrideTemplate(TaisannhadatidComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(TaisannhadatidComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(TaisannhadatidService);
    routerNavigateSpy = jest.spyOn(comp.router, 'navigate');

    jest
      .spyOn(service, 'query')
      .mockReturnValueOnce(
        of(
          new HttpResponse({
            body: [{ idTaiSan: 123 }],
            headers: new HttpHeaders({
              link: '<http://localhost/api/foo?page=1&size=20>; rel="next"',
            }),
          }),
        ),
      )
      .mockReturnValueOnce(
        of(
          new HttpResponse({
            body: [{ idTaiSan: 456 }],
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
    expect(comp.taisannhadatids?.[0]).toEqual(expect.objectContaining({ idTaiSan: 123 }));
  });

  describe('trackIdTaiSan', () => {
    it('Should forward to taisannhadatidService', () => {
      const entity = { idTaiSan: 123 };
      jest.spyOn(service, 'getTaisannhadatidIdentifier');
      const idTaiSan = comp.trackIdTaiSan(0, entity);
      expect(service.getTaisannhadatidIdentifier).toHaveBeenCalledWith(entity);
      expect(idTaiSan).toBe(entity.idTaiSan);
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
    expect(service.query).toHaveBeenLastCalledWith(expect.objectContaining({ sort: ['idTaiSan,desc'] }));
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
