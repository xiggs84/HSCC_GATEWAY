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
import { DmHopDongService } from '../service/dm-hop-dong.service';
import { IDmHopDong } from '../dm-hop-dong.model';
import { DmHopDongFormGroup, DmHopDongFormService } from './dm-hop-dong-form.service';

@Component({
  standalone: true,
  selector: 'jhi-dm-hop-dong-update',
  templateUrl: './dm-hop-dong-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class DmHopDongUpdateComponent implements OnInit {
  isSaving = false;
  dmHopDong: IDmHopDong | null = null;

  danhMucLoaiHopDongsSharedCollection: IDanhMucLoaiHopDong[] = [];
  soCongChungsSharedCollection: ISoCongChung[] = [];

  protected dmHopDongService = inject(DmHopDongService);
  protected dmHopDongFormService = inject(DmHopDongFormService);
  protected danhMucLoaiHopDongService = inject(DanhMucLoaiHopDongService);
  protected soCongChungService = inject(SoCongChungService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: DmHopDongFormGroup = this.dmHopDongFormService.createDmHopDongFormGroup();

  compareDanhMucLoaiHopDong = (o1: IDanhMucLoaiHopDong | null, o2: IDanhMucLoaiHopDong | null): boolean =>
    this.danhMucLoaiHopDongService.compareDanhMucLoaiHopDong(o1, o2);

  compareSoCongChung = (o1: ISoCongChung | null, o2: ISoCongChung | null): boolean => this.soCongChungService.compareSoCongChung(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ dmHopDong }) => {
      this.dmHopDong = dmHopDong;
      if (dmHopDong) {
        this.updateForm(dmHopDong);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const dmHopDong = this.dmHopDongFormService.getDmHopDong(this.editForm);
    if (dmHopDong.idHopDong !== null) {
      this.subscribeToSaveResponse(this.dmHopDongService.update(dmHopDong));
    } else {
      this.subscribeToSaveResponse(this.dmHopDongService.create(dmHopDong));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDmHopDong>>): void {
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

  protected updateForm(dmHopDong: IDmHopDong): void {
    this.dmHopDong = dmHopDong;
    this.dmHopDongFormService.resetForm(this.editForm, dmHopDong);

    this.danhMucLoaiHopDongsSharedCollection =
      this.danhMucLoaiHopDongService.addDanhMucLoaiHopDongToCollectionIfMissing<IDanhMucLoaiHopDong>(
        this.danhMucLoaiHopDongsSharedCollection,
        dmHopDong.danhMucLoaiHopDong,
      );
    this.soCongChungsSharedCollection = this.soCongChungService.addSoCongChungToCollectionIfMissing<ISoCongChung>(
      this.soCongChungsSharedCollection,
      dmHopDong.soCongChung,
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
            this.dmHopDong?.danhMucLoaiHopDong,
          ),
        ),
      )
      .subscribe((danhMucLoaiHopDongs: IDanhMucLoaiHopDong[]) => (this.danhMucLoaiHopDongsSharedCollection = danhMucLoaiHopDongs));

    this.soCongChungService
      .query()
      .pipe(map((res: HttpResponse<ISoCongChung[]>) => res.body ?? []))
      .pipe(
        map((soCongChungs: ISoCongChung[]) =>
          this.soCongChungService.addSoCongChungToCollectionIfMissing<ISoCongChung>(soCongChungs, this.dmHopDong?.soCongChung),
        ),
      )
      .subscribe((soCongChungs: ISoCongChung[]) => (this.soCongChungsSharedCollection = soCongChungs));
  }
}
