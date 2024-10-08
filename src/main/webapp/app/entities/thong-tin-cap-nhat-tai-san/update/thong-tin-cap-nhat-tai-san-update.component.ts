import { Component, OnInit, inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AlertError } from 'app/shared/alert/alert-error.model';
import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';
import { DataUtils, FileLoadError } from 'app/core/util/data-util.service';
import { ITaiSan } from 'app/entities/tai-san/tai-san.model';
import { TaiSanService } from 'app/entities/tai-san/service/tai-san.service';
import { IDanhMucLoaiTaiSan } from 'app/entities/danh-muc-loai-tai-san/danh-muc-loai-tai-san.model';
import { DanhMucLoaiTaiSanService } from 'app/entities/danh-muc-loai-tai-san/service/danh-muc-loai-tai-san.service';
import { ThongTinCapNhatTaiSanService } from '../service/thong-tin-cap-nhat-tai-san.service';
import { IThongTinCapNhatTaiSan } from '../thong-tin-cap-nhat-tai-san.model';
import { ThongTinCapNhatTaiSanFormGroup, ThongTinCapNhatTaiSanFormService } from './thong-tin-cap-nhat-tai-san-form.service';

@Component({
  standalone: true,
  selector: 'jhi-thong-tin-cap-nhat-tai-san-update',
  templateUrl: './thong-tin-cap-nhat-tai-san-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class ThongTinCapNhatTaiSanUpdateComponent implements OnInit {
  isSaving = false;
  thongTinCapNhatTaiSan: IThongTinCapNhatTaiSan | null = null;

  taiSansSharedCollection: ITaiSan[] = [];
  danhMucLoaiTaiSansSharedCollection: IDanhMucLoaiTaiSan[] = [];

  protected dataUtils = inject(DataUtils);
  protected eventManager = inject(EventManager);
  protected thongTinCapNhatTaiSanService = inject(ThongTinCapNhatTaiSanService);
  protected thongTinCapNhatTaiSanFormService = inject(ThongTinCapNhatTaiSanFormService);
  protected taiSanService = inject(TaiSanService);
  protected danhMucLoaiTaiSanService = inject(DanhMucLoaiTaiSanService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: ThongTinCapNhatTaiSanFormGroup = this.thongTinCapNhatTaiSanFormService.createThongTinCapNhatTaiSanFormGroup();

  compareTaiSan = (o1: ITaiSan | null, o2: ITaiSan | null): boolean => this.taiSanService.compareTaiSan(o1, o2);

  compareDanhMucLoaiTaiSan = (o1: IDanhMucLoaiTaiSan | null, o2: IDanhMucLoaiTaiSan | null): boolean =>
    this.danhMucLoaiTaiSanService.compareDanhMucLoaiTaiSan(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ thongTinCapNhatTaiSan }) => {
      this.thongTinCapNhatTaiSan = thongTinCapNhatTaiSan;
      if (thongTinCapNhatTaiSan) {
        this.updateForm(thongTinCapNhatTaiSan);
      }

      this.loadRelationshipsOptions();
    });
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(base64String: string, contentType: string | null | undefined): void {
    this.dataUtils.openFile(base64String, contentType);
  }

  setFileData(event: Event, field: string, isImage: boolean): void {
    this.dataUtils.loadFileToForm(event, this.editForm, field, isImage).subscribe({
      error: (err: FileLoadError) =>
        this.eventManager.broadcast(new EventWithContent<AlertError>('gatewayApp.error', { ...err, key: `error.file.${err.key}` })),
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const thongTinCapNhatTaiSan = this.thongTinCapNhatTaiSanFormService.getThongTinCapNhatTaiSan(this.editForm);
    if (thongTinCapNhatTaiSan.idCapNhat !== null) {
      this.subscribeToSaveResponse(this.thongTinCapNhatTaiSanService.update(thongTinCapNhatTaiSan));
    } else {
      this.subscribeToSaveResponse(this.thongTinCapNhatTaiSanService.create(thongTinCapNhatTaiSan));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IThongTinCapNhatTaiSan>>): void {
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

  protected updateForm(thongTinCapNhatTaiSan: IThongTinCapNhatTaiSan): void {
    this.thongTinCapNhatTaiSan = thongTinCapNhatTaiSan;
    this.thongTinCapNhatTaiSanFormService.resetForm(this.editForm, thongTinCapNhatTaiSan);

    this.taiSansSharedCollection = this.taiSanService.addTaiSanToCollectionIfMissing<ITaiSan>(
      this.taiSansSharedCollection,
      thongTinCapNhatTaiSan.taiSan,
    );
    this.danhMucLoaiTaiSansSharedCollection = this.danhMucLoaiTaiSanService.addDanhMucLoaiTaiSanToCollectionIfMissing<IDanhMucLoaiTaiSan>(
      this.danhMucLoaiTaiSansSharedCollection,
      thongTinCapNhatTaiSan.danhMucLoaiTaiSan,
    );
  }

  protected loadRelationshipsOptions(): void {
    this.taiSanService
      .query()
      .pipe(map((res: HttpResponse<ITaiSan[]>) => res.body ?? []))
      .pipe(
        map((taiSans: ITaiSan[]) =>
          this.taiSanService.addTaiSanToCollectionIfMissing<ITaiSan>(taiSans, this.thongTinCapNhatTaiSan?.taiSan),
        ),
      )
      .subscribe((taiSans: ITaiSan[]) => (this.taiSansSharedCollection = taiSans));

    this.danhMucLoaiTaiSanService
      .query()
      .pipe(map((res: HttpResponse<IDanhMucLoaiTaiSan[]>) => res.body ?? []))
      .pipe(
        map((danhMucLoaiTaiSans: IDanhMucLoaiTaiSan[]) =>
          this.danhMucLoaiTaiSanService.addDanhMucLoaiTaiSanToCollectionIfMissing<IDanhMucLoaiTaiSan>(
            danhMucLoaiTaiSans,
            this.thongTinCapNhatTaiSan?.danhMucLoaiTaiSan,
          ),
        ),
      )
      .subscribe((danhMucLoaiTaiSans: IDanhMucLoaiTaiSan[]) => (this.danhMucLoaiTaiSansSharedCollection = danhMucLoaiTaiSans));
  }
}
