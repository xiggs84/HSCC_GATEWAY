import { Component, OnInit, inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IDanhMucLoaiHopDong } from 'app/entities/danh-muc-loai-hop-dong/danh-muc-loai-hop-dong.model';
import { DanhMucLoaiHopDongService } from 'app/entities/danh-muc-loai-hop-dong/service/danh-muc-loai-hop-dong.service';
import { ISoCongChung } from 'app/entities/so-cong-chung/so-cong-chung.model';
import { SoCongChungService } from 'app/entities/so-cong-chung/service/so-cong-chung.service';
import { DanhSachHopDongService } from '../service/danh-sach-hop-dong.service';
import { IDanhSachHopDong } from '../danh-sach-hop-dong.model';
import { DanhSachHopDongFormGroup, DanhSachHopDongFormService } from './danh-sach-hop-dong-form.service';

@Component({
  standalone: true,
  selector: 'jhi-danh-sach-hop-dong-update',
  templateUrl: './danh-sach-hop-dong-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class DanhSachHopDongUpdateComponent implements OnInit {
  isSaving = false;
  danhSachHopDong: IDanhSachHopDong | null = null;

  danhMucLoaiHopDongsSharedCollection: IDanhMucLoaiHopDong[] = [];
  soCongChungsSharedCollection: ISoCongChung[] = [];

  protected danhSachHopDongService = inject(DanhSachHopDongService);
  protected danhSachHopDongFormService = inject(DanhSachHopDongFormService);
  protected danhMucLoaiHopDongService = inject(DanhMucLoaiHopDongService);
  protected soCongChungService = inject(SoCongChungService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: DanhSachHopDongFormGroup = this.danhSachHopDongFormService.createDanhSachHopDongFormGroup();

  compareDanhMucLoaiHopDong = (o1: IDanhMucLoaiHopDong | null, o2: IDanhMucLoaiHopDong | null): boolean =>
    this.danhMucLoaiHopDongService.compareDanhMucLoaiHopDong(o1, o2);

  compareSoCongChung = (o1: ISoCongChung | null, o2: ISoCongChung | null): boolean => this.soCongChungService.compareSoCongChung(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ danhSachHopDong }) => {
      this.danhSachHopDong = danhSachHopDong;
      if (danhSachHopDong) {
        this.updateForm(danhSachHopDong);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const danhSachHopDong = this.danhSachHopDongFormService.getDanhSachHopDong(this.editForm);
    if (danhSachHopDong.idHopDong !== null) {
      this.subscribeToSaveResponse(this.danhSachHopDongService.update(danhSachHopDong));
    } else {
      this.subscribeToSaveResponse(this.danhSachHopDongService.create(danhSachHopDong));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDanhSachHopDong>>): void {
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

  protected updateForm(danhSachHopDong: IDanhSachHopDong): void {
    this.danhSachHopDong = danhSachHopDong;
    this.danhSachHopDongFormService.resetForm(this.editForm, danhSachHopDong);

    this.danhMucLoaiHopDongsSharedCollection =
      this.danhMucLoaiHopDongService.addDanhMucLoaiHopDongToCollectionIfMissing<IDanhMucLoaiHopDong>(
        this.danhMucLoaiHopDongsSharedCollection,
        danhSachHopDong.danhMucLoaiHopDong,
      );
    this.soCongChungsSharedCollection = this.soCongChungService.addSoCongChungToCollectionIfMissing<ISoCongChung>(
      this.soCongChungsSharedCollection,
      danhSachHopDong.soCongChung,
    );
  }

  protected loadRelationshipsOptions(): void {
    this.danhMucLoaiHopDongService
      .query()
      .pipe(map((res: HttpResponse<IDanhMucLoaiHopDong[]>) => res.body ?? []))
      .pipe(
        map((danhMucLoaiHopDongs: IDanhMucLoaiHopDong[]) =>
          this.danhMucLoaiHopDongService.addDanhMucLoaiHopDongToCollectionIfMissing<IDanhMucLoaiHopDong>(
            danhMucLoaiHopDongs,
            this.danhSachHopDong?.danhMucLoaiHopDong,
          ),
        ),
      )
      .subscribe((danhMucLoaiHopDongs: IDanhMucLoaiHopDong[]) => (this.danhMucLoaiHopDongsSharedCollection = danhMucLoaiHopDongs));

    this.soCongChungService
      .query()
      .pipe(map((res: HttpResponse<ISoCongChung[]>) => res.body ?? []))
      .pipe(
        map((soCongChungs: ISoCongChung[]) =>
          this.soCongChungService.addSoCongChungToCollectionIfMissing<ISoCongChung>(soCongChungs, this.danhSachHopDong?.soCongChung),
        ),
      )
      .subscribe((soCongChungs: ISoCongChung[]) => (this.soCongChungsSharedCollection = soCongChungs));
  }
}
