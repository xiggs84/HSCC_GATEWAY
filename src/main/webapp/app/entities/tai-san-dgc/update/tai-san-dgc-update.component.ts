import { Component, OnInit, inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ITaiSan } from 'app/entities/tai-san/tai-san.model';
import { TaiSanService } from 'app/entities/tai-san/service/tai-san.service';
import { IDanhMucLoaiTaiSan } from 'app/entities/danh-muc-loai-tai-san/danh-muc-loai-tai-san.model';
import { DanhMucLoaiTaiSanService } from 'app/entities/danh-muc-loai-tai-san/service/danh-muc-loai-tai-san.service';
import { ITinhTrangTaiSan } from 'app/entities/tinh-trang-tai-san/tinh-trang-tai-san.model';
import { TinhTrangTaiSanService } from 'app/entities/tinh-trang-tai-san/service/tinh-trang-tai-san.service';
import { TaiSanDgcService } from '../service/tai-san-dgc.service';
import { ITaiSanDgc } from '../tai-san-dgc.model';
import { TaiSanDgcFormGroup, TaiSanDgcFormService } from './tai-san-dgc-form.service';

@Component({
  standalone: true,
  selector: 'jhi-tai-san-dgc-update',
  templateUrl: './tai-san-dgc-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class TaiSanDgcUpdateComponent implements OnInit {
  isSaving = false;
  taiSanDgc: ITaiSanDgc | null = null;

  taiSansSharedCollection: ITaiSan[] = [];
  danhMucLoaiTaiSansSharedCollection: IDanhMucLoaiTaiSan[] = [];
  tinhTrangTaiSansSharedCollection: ITinhTrangTaiSan[] = [];

  protected taiSanDgcService = inject(TaiSanDgcService);
  protected taiSanDgcFormService = inject(TaiSanDgcFormService);
  protected taiSanService = inject(TaiSanService);
  protected danhMucLoaiTaiSanService = inject(DanhMucLoaiTaiSanService);
  protected tinhTrangTaiSanService = inject(TinhTrangTaiSanService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: TaiSanDgcFormGroup = this.taiSanDgcFormService.createTaiSanDgcFormGroup();

  compareTaiSan = (o1: ITaiSan | null, o2: ITaiSan | null): boolean => this.taiSanService.compareTaiSan(o1, o2);

  compareDanhMucLoaiTaiSan = (o1: IDanhMucLoaiTaiSan | null, o2: IDanhMucLoaiTaiSan | null): boolean =>
    this.danhMucLoaiTaiSanService.compareDanhMucLoaiTaiSan(o1, o2);

  compareTinhTrangTaiSan = (o1: ITinhTrangTaiSan | null, o2: ITinhTrangTaiSan | null): boolean =>
    this.tinhTrangTaiSanService.compareTinhTrangTaiSan(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ taiSanDgc }) => {
      this.taiSanDgc = taiSanDgc;
      if (taiSanDgc) {
        this.updateForm(taiSanDgc);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const taiSanDgc = this.taiSanDgcFormService.getTaiSanDgc(this.editForm);
    if (taiSanDgc.id !== null) {
      this.subscribeToSaveResponse(this.taiSanDgcService.update(taiSanDgc));
    } else {
      this.subscribeToSaveResponse(this.taiSanDgcService.create(taiSanDgc));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITaiSanDgc>>): void {
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

  protected updateForm(taiSanDgc: ITaiSanDgc): void {
    this.taiSanDgc = taiSanDgc;
    this.taiSanDgcFormService.resetForm(this.editForm, taiSanDgc);

    this.taiSansSharedCollection = this.taiSanService.addTaiSanToCollectionIfMissing<ITaiSan>(
      this.taiSansSharedCollection,
      taiSanDgc.taiSan,
    );
    this.danhMucLoaiTaiSansSharedCollection = this.danhMucLoaiTaiSanService.addDanhMucLoaiTaiSanToCollectionIfMissing<IDanhMucLoaiTaiSan>(
      this.danhMucLoaiTaiSansSharedCollection,
      taiSanDgc.danhMucLoaiTaiSan,
    );
    this.tinhTrangTaiSansSharedCollection = this.tinhTrangTaiSanService.addTinhTrangTaiSanToCollectionIfMissing<ITinhTrangTaiSan>(
      this.tinhTrangTaiSansSharedCollection,
      taiSanDgc.tinhTrangTaiSan,
    );
  }

  protected loadRelationshipsOptions(): void {
    this.taiSanService
      .query()
      .pipe(map((res: HttpResponse<ITaiSan[]>) => res.body ?? []))
      .pipe(map((taiSans: ITaiSan[]) => this.taiSanService.addTaiSanToCollectionIfMissing<ITaiSan>(taiSans, this.taiSanDgc?.taiSan)))
      .subscribe((taiSans: ITaiSan[]) => (this.taiSansSharedCollection = taiSans));

    this.danhMucLoaiTaiSanService
      .query()
      .pipe(map((res: HttpResponse<IDanhMucLoaiTaiSan[]>) => res.body ?? []))
      .pipe(
        map((danhMucLoaiTaiSans: IDanhMucLoaiTaiSan[]) =>
          this.danhMucLoaiTaiSanService.addDanhMucLoaiTaiSanToCollectionIfMissing<IDanhMucLoaiTaiSan>(
            danhMucLoaiTaiSans,
            this.taiSanDgc?.danhMucLoaiTaiSan,
          ),
        ),
      )
      .subscribe((danhMucLoaiTaiSans: IDanhMucLoaiTaiSan[]) => (this.danhMucLoaiTaiSansSharedCollection = danhMucLoaiTaiSans));

    this.tinhTrangTaiSanService
      .query()
      .pipe(map((res: HttpResponse<ITinhTrangTaiSan[]>) => res.body ?? []))
      .pipe(
        map((tinhTrangTaiSans: ITinhTrangTaiSan[]) =>
          this.tinhTrangTaiSanService.addTinhTrangTaiSanToCollectionIfMissing<ITinhTrangTaiSan>(
            tinhTrangTaiSans,
            this.taiSanDgc?.tinhTrangTaiSan,
          ),
        ),
      )
      .subscribe((tinhTrangTaiSans: ITinhTrangTaiSan[]) => (this.tinhTrangTaiSansSharedCollection = tinhTrangTaiSans));
  }
}
