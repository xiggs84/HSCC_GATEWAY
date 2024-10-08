import { Component, OnInit, inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IDanhMucLoaiTaiSan } from 'app/entities/danh-muc-loai-tai-san/danh-muc-loai-tai-san.model';
import { DanhMucLoaiTaiSanService } from 'app/entities/danh-muc-loai-tai-san/service/danh-muc-loai-tai-san.service';
import { ITinhTrangTaiSan } from 'app/entities/tinh-trang-tai-san/tinh-trang-tai-san.model';
import { TinhTrangTaiSanService } from 'app/entities/tinh-trang-tai-san/service/tinh-trang-tai-san.service';
import { TaiSanDatNhaService } from '../service/tai-san-dat-nha.service';
import { ITaiSanDatNha } from '../tai-san-dat-nha.model';
import { TaiSanDatNhaFormGroup, TaiSanDatNhaFormService } from './tai-san-dat-nha-form.service';

@Component({
  standalone: true,
  selector: 'jhi-tai-san-dat-nha-update',
  templateUrl: './tai-san-dat-nha-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class TaiSanDatNhaUpdateComponent implements OnInit {
  isSaving = false;
  taiSanDatNha: ITaiSanDatNha | null = null;

  danhMucLoaiTaiSansSharedCollection: IDanhMucLoaiTaiSan[] = [];
  tinhTrangTaiSansSharedCollection: ITinhTrangTaiSan[] = [];

  protected taiSanDatNhaService = inject(TaiSanDatNhaService);
  protected taiSanDatNhaFormService = inject(TaiSanDatNhaFormService);
  protected danhMucLoaiTaiSanService = inject(DanhMucLoaiTaiSanService);
  protected tinhTrangTaiSanService = inject(TinhTrangTaiSanService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: TaiSanDatNhaFormGroup = this.taiSanDatNhaFormService.createTaiSanDatNhaFormGroup();

  compareDanhMucLoaiTaiSan = (o1: IDanhMucLoaiTaiSan | null, o2: IDanhMucLoaiTaiSan | null): boolean =>
    this.danhMucLoaiTaiSanService.compareDanhMucLoaiTaiSan(o1, o2);

  compareTinhTrangTaiSan = (o1: ITinhTrangTaiSan | null, o2: ITinhTrangTaiSan | null): boolean =>
    this.tinhTrangTaiSanService.compareTinhTrangTaiSan(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ taiSanDatNha }) => {
      this.taiSanDatNha = taiSanDatNha;
      if (taiSanDatNha) {
        this.updateForm(taiSanDatNha);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const taiSanDatNha = this.taiSanDatNhaFormService.getTaiSanDatNha(this.editForm);
    if (taiSanDatNha.id !== null) {
      this.subscribeToSaveResponse(this.taiSanDatNhaService.update(taiSanDatNha));
    } else {
      this.subscribeToSaveResponse(this.taiSanDatNhaService.create(taiSanDatNha));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITaiSanDatNha>>): void {
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

  protected updateForm(taiSanDatNha: ITaiSanDatNha): void {
    this.taiSanDatNha = taiSanDatNha;
    this.taiSanDatNhaFormService.resetForm(this.editForm, taiSanDatNha);

    this.danhMucLoaiTaiSansSharedCollection = this.danhMucLoaiTaiSanService.addDanhMucLoaiTaiSanToCollectionIfMissing<IDanhMucLoaiTaiSan>(
      this.danhMucLoaiTaiSansSharedCollection,
      taiSanDatNha.danhMucLoaiTaiSan,
    );
    this.tinhTrangTaiSansSharedCollection = this.tinhTrangTaiSanService.addTinhTrangTaiSanToCollectionIfMissing<ITinhTrangTaiSan>(
      this.tinhTrangTaiSansSharedCollection,
      taiSanDatNha.tinhTrangTaiSan,
    );
  }

  protected loadRelationshipsOptions(): void {
    this.danhMucLoaiTaiSanService
      .query()
      .pipe(map((res: HttpResponse<IDanhMucLoaiTaiSan[]>) => res.body ?? []))
      .pipe(
        map((danhMucLoaiTaiSans: IDanhMucLoaiTaiSan[]) =>
          this.danhMucLoaiTaiSanService.addDanhMucLoaiTaiSanToCollectionIfMissing<IDanhMucLoaiTaiSan>(
            danhMucLoaiTaiSans,
            this.taiSanDatNha?.danhMucLoaiTaiSan,
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
            this.taiSanDatNha?.tinhTrangTaiSan,
          ),
        ),
      )
      .subscribe((tinhTrangTaiSans: ITinhTrangTaiSan[]) => (this.tinhTrangTaiSansSharedCollection = tinhTrangTaiSans));
  }
}
