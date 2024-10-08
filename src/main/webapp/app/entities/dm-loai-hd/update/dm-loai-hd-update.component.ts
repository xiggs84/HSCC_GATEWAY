import { Component, OnInit, inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IDanhMucNhomHopDong } from 'app/entities/danh-muc-nhom-hop-dong/danh-muc-nhom-hop-dong.model';
import { DanhMucNhomHopDongService } from 'app/entities/danh-muc-nhom-hop-dong/service/danh-muc-nhom-hop-dong.service';
import { IDmLoaiHd } from '../dm-loai-hd.model';
import { DmLoaiHdService } from '../service/dm-loai-hd.service';
import { DmLoaiHdFormGroup, DmLoaiHdFormService } from './dm-loai-hd-form.service';

@Component({
  standalone: true,
  selector: 'jhi-dm-loai-hd-update',
  templateUrl: './dm-loai-hd-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class DmLoaiHdUpdateComponent implements OnInit {
  isSaving = false;
  dmLoaiHd: IDmLoaiHd | null = null;

  danhMucNhomHopDongsSharedCollection: IDanhMucNhomHopDong[] = [];

  protected dmLoaiHdService = inject(DmLoaiHdService);
  protected dmLoaiHdFormService = inject(DmLoaiHdFormService);
  protected danhMucNhomHopDongService = inject(DanhMucNhomHopDongService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: DmLoaiHdFormGroup = this.dmLoaiHdFormService.createDmLoaiHdFormGroup();

  compareDanhMucNhomHopDong = (o1: IDanhMucNhomHopDong | null, o2: IDanhMucNhomHopDong | null): boolean =>
    this.danhMucNhomHopDongService.compareDanhMucNhomHopDong(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ dmLoaiHd }) => {
      this.dmLoaiHd = dmLoaiHd;
      if (dmLoaiHd) {
        this.updateForm(dmLoaiHd);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const dmLoaiHd = this.dmLoaiHdFormService.getDmLoaiHd(this.editForm);
    if (dmLoaiHd.idLoaiHd !== null) {
      this.subscribeToSaveResponse(this.dmLoaiHdService.update(dmLoaiHd));
    } else {
      this.subscribeToSaveResponse(this.dmLoaiHdService.create(dmLoaiHd));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDmLoaiHd>>): void {
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

  protected updateForm(dmLoaiHd: IDmLoaiHd): void {
    this.dmLoaiHd = dmLoaiHd;
    this.dmLoaiHdFormService.resetForm(this.editForm, dmLoaiHd);

    this.danhMucNhomHopDongsSharedCollection =
      this.danhMucNhomHopDongService.addDanhMucNhomHopDongToCollectionIfMissing<IDanhMucNhomHopDong>(
        this.danhMucNhomHopDongsSharedCollection,
        dmLoaiHd.danhMucNhomHopDong,
      );
  }

  protected loadRelationshipsOptions(): void {
    this.danhMucNhomHopDongService
      .query()
      .pipe(map((res: HttpResponse<IDanhMucNhomHopDong[]>) => res.body ?? []))
      .pipe(
        map((danhMucNhomHopDongs: IDanhMucNhomHopDong[]) =>
          this.danhMucNhomHopDongService.addDanhMucNhomHopDongToCollectionIfMissing<IDanhMucNhomHopDong>(
            danhMucNhomHopDongs,
            this.dmLoaiHd?.danhMucNhomHopDong,
          ),
        ),
      )
      .subscribe((danhMucNhomHopDongs: IDanhMucNhomHopDong[]) => (this.danhMucNhomHopDongsSharedCollection = danhMucNhomHopDongs));
  }
}
