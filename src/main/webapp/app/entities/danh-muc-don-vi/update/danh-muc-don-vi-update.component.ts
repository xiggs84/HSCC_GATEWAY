import { Component, OnInit, inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ICapQuanLy } from 'app/entities/cap-quan-ly/cap-quan-ly.model';
import { CapQuanLyService } from 'app/entities/cap-quan-ly/service/cap-quan-ly.service';
import { ILoaiDonVi } from 'app/entities/loai-don-vi/loai-don-vi.model';
import { LoaiDonViService } from 'app/entities/loai-don-vi/service/loai-don-vi.service';
import { INhiemVu } from 'app/entities/nhiem-vu/nhiem-vu.model';
import { NhiemVuService } from 'app/entities/nhiem-vu/service/nhiem-vu.service';
import { DanhMucDonViService } from '../service/danh-muc-don-vi.service';
import { IDanhMucDonVi } from '../danh-muc-don-vi.model';
import { DanhMucDonViFormGroup, DanhMucDonViFormService } from './danh-muc-don-vi-form.service';

@Component({
  standalone: true,
  selector: 'jhi-danh-muc-don-vi-update',
  templateUrl: './danh-muc-don-vi-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class DanhMucDonViUpdateComponent implements OnInit {
  isSaving = false;
  danhMucDonVi: IDanhMucDonVi | null = null;

  capQuanLiesSharedCollection: ICapQuanLy[] = [];
  loaiDonVisSharedCollection: ILoaiDonVi[] = [];
  nhiemVusSharedCollection: INhiemVu[] = [];

  protected danhMucDonViService = inject(DanhMucDonViService);
  protected danhMucDonViFormService = inject(DanhMucDonViFormService);
  protected capQuanLyService = inject(CapQuanLyService);
  protected loaiDonViService = inject(LoaiDonViService);
  protected nhiemVuService = inject(NhiemVuService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: DanhMucDonViFormGroup = this.danhMucDonViFormService.createDanhMucDonViFormGroup();

  compareCapQuanLy = (o1: ICapQuanLy | null, o2: ICapQuanLy | null): boolean => this.capQuanLyService.compareCapQuanLy(o1, o2);

  compareLoaiDonVi = (o1: ILoaiDonVi | null, o2: ILoaiDonVi | null): boolean => this.loaiDonViService.compareLoaiDonVi(o1, o2);

  compareNhiemVu = (o1: INhiemVu | null, o2: INhiemVu | null): boolean => this.nhiemVuService.compareNhiemVu(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ danhMucDonVi }) => {
      this.danhMucDonVi = danhMucDonVi;
      if (danhMucDonVi) {
        this.updateForm(danhMucDonVi);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const danhMucDonVi = this.danhMucDonViFormService.getDanhMucDonVi(this.editForm);
    if (danhMucDonVi.idDonVi !== null) {
      this.subscribeToSaveResponse(this.danhMucDonViService.update(danhMucDonVi));
    } else {
      this.subscribeToSaveResponse(this.danhMucDonViService.create(danhMucDonVi));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDanhMucDonVi>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(danhMucDonVi: IDanhMucDonVi): void {
    this.danhMucDonVi = danhMucDonVi;
    this.danhMucDonViFormService.resetForm(this.editForm, danhMucDonVi);

    this.capQuanLiesSharedCollection = this.capQuanLyService.addCapQuanLyToCollectionIfMissing<ICapQuanLy>(
      this.capQuanLiesSharedCollection,
      danhMucDonVi.capQuanLy,
    );
    this.loaiDonVisSharedCollection = this.loaiDonViService.addLoaiDonViToCollectionIfMissing<ILoaiDonVi>(
      this.loaiDonVisSharedCollection,
      danhMucDonVi.loaiDonVi,
    );
    this.nhiemVusSharedCollection = this.nhiemVuService.addNhiemVuToCollectionIfMissing<INhiemVu>(
      this.nhiemVusSharedCollection,
      danhMucDonVi.nhiemVu,
    );
  }

  protected loadRelationshipsOptions(): void {
    this.capQuanLyService
      .query()
      .pipe(map((res: HttpResponse<ICapQuanLy[]>) => res.body ?? []))
      .pipe(
        map((capQuanLies: ICapQuanLy[]) =>
          this.capQuanLyService.addCapQuanLyToCollectionIfMissing<ICapQuanLy>(capQuanLies, this.danhMucDonVi?.capQuanLy),
        ),
      )
      .subscribe((capQuanLies: ICapQuanLy[]) => (this.capQuanLiesSharedCollection = capQuanLies));

    this.loaiDonViService
      .query()
      .pipe(map((res: HttpResponse<ILoaiDonVi[]>) => res.body ?? []))
      .pipe(
        map((loaiDonVis: ILoaiDonVi[]) =>
          this.loaiDonViService.addLoaiDonViToCollectionIfMissing<ILoaiDonVi>(loaiDonVis, this.danhMucDonVi?.loaiDonVi),
        ),
      )
      .subscribe((loaiDonVis: ILoaiDonVi[]) => (this.loaiDonVisSharedCollection = loaiDonVis));

    this.nhiemVuService
      .query()
      .pipe(map((res: HttpResponse<INhiemVu[]>) => res.body ?? []))
      .pipe(
        map((nhiemVus: INhiemVu[]) => this.nhiemVuService.addNhiemVuToCollectionIfMissing<INhiemVu>(nhiemVus, this.danhMucDonVi?.nhiemVu)),
      )
      .subscribe((nhiemVus: INhiemVu[]) => (this.nhiemVusSharedCollection = nhiemVus));
  }
}
