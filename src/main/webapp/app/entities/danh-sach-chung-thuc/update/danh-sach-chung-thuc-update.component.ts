import { Component, OnInit, inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IDanhMucLoaiGiayToChungThuc } from 'app/entities/danh-muc-loai-giay-to-chung-thuc/danh-muc-loai-giay-to-chung-thuc.model';
import { DanhMucLoaiGiayToChungThucService } from 'app/entities/danh-muc-loai-giay-to-chung-thuc/service/danh-muc-loai-giay-to-chung-thuc.service';
import { IDanhSachChungThuc } from '../danh-sach-chung-thuc.model';
import { DanhSachChungThucService } from '../service/danh-sach-chung-thuc.service';
import { DanhSachChungThucFormGroup, DanhSachChungThucFormService } from './danh-sach-chung-thuc-form.service';

@Component({
  standalone: true,
  selector: 'jhi-danh-sach-chung-thuc-update',
  templateUrl: './danh-sach-chung-thuc-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class DanhSachChungThucUpdateComponent implements OnInit {
  isSaving = false;
  danhSachChungThuc: IDanhSachChungThuc | null = null;

  danhMucLoaiGiayToChungThucsSharedCollection: IDanhMucLoaiGiayToChungThuc[] = [];

  protected danhSachChungThucService = inject(DanhSachChungThucService);
  protected danhSachChungThucFormService = inject(DanhSachChungThucFormService);
  protected danhMucLoaiGiayToChungThucService = inject(DanhMucLoaiGiayToChungThucService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: DanhSachChungThucFormGroup = this.danhSachChungThucFormService.createDanhSachChungThucFormGroup();

  compareDanhMucLoaiGiayToChungThuc = (o1: IDanhMucLoaiGiayToChungThuc | null, o2: IDanhMucLoaiGiayToChungThuc | null): boolean =>
    this.danhMucLoaiGiayToChungThucService.compareDanhMucLoaiGiayToChungThuc(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ danhSachChungThuc }) => {
      this.danhSachChungThuc = danhSachChungThuc;
      if (danhSachChungThuc) {
        this.updateForm(danhSachChungThuc);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const danhSachChungThuc = this.danhSachChungThucFormService.getDanhSachChungThuc(this.editForm);
    if (danhSachChungThuc.idChungThuc !== null) {
      this.subscribeToSaveResponse(this.danhSachChungThucService.update(danhSachChungThuc));
    } else {
      this.subscribeToSaveResponse(this.danhSachChungThucService.create(danhSachChungThuc));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDanhSachChungThuc>>): void {
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

  protected updateForm(danhSachChungThuc: IDanhSachChungThuc): void {
    this.danhSachChungThuc = danhSachChungThuc;
    this.danhSachChungThucFormService.resetForm(this.editForm, danhSachChungThuc);

    this.danhMucLoaiGiayToChungThucsSharedCollection =
      this.danhMucLoaiGiayToChungThucService.addDanhMucLoaiGiayToChungThucToCollectionIfMissing<IDanhMucLoaiGiayToChungThuc>(
        this.danhMucLoaiGiayToChungThucsSharedCollection,
        danhSachChungThuc.danhMucLoaiGiayToChungThuc,
      );
  }

  protected loadRelationshipsOptions(): void {
    this.danhMucLoaiGiayToChungThucService
      .query()
      .pipe(map((res: HttpResponse<IDanhMucLoaiGiayToChungThuc[]>) => res.body ?? []))
      .pipe(
        map((danhMucLoaiGiayToChungThucs: IDanhMucLoaiGiayToChungThuc[]) =>
          this.danhMucLoaiGiayToChungThucService.addDanhMucLoaiGiayToChungThucToCollectionIfMissing<IDanhMucLoaiGiayToChungThuc>(
            danhMucLoaiGiayToChungThucs,
            this.danhSachChungThuc?.danhMucLoaiGiayToChungThuc,
          ),
        ),
      )
      .subscribe(
        (danhMucLoaiGiayToChungThucs: IDanhMucLoaiGiayToChungThuc[]) =>
          (this.danhMucLoaiGiayToChungThucsSharedCollection = danhMucLoaiGiayToChungThucs),
      );
  }
}
