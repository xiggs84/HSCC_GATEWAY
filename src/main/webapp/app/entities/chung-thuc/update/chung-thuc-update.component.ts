import { Component, OnInit, inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IDanhMucLoaiGiayToChungThuc } from 'app/entities/danh-muc-loai-giay-to-chung-thuc/danh-muc-loai-giay-to-chung-thuc.model';
import { DanhMucLoaiGiayToChungThucService } from 'app/entities/danh-muc-loai-giay-to-chung-thuc/service/danh-muc-loai-giay-to-chung-thuc.service';
import { IChungThuc } from '../chung-thuc.model';
import { ChungThucService } from '../service/chung-thuc.service';
import { ChungThucFormGroup, ChungThucFormService } from './chung-thuc-form.service';

@Component({
  standalone: true,
  selector: 'jhi-chung-thuc-update',
  templateUrl: './chung-thuc-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class ChungThucUpdateComponent implements OnInit {
  isSaving = false;
  chungThuc: IChungThuc | null = null;

  danhMucLoaiGiayToChungThucsSharedCollection: IDanhMucLoaiGiayToChungThuc[] = [];

  protected chungThucService = inject(ChungThucService);
  protected chungThucFormService = inject(ChungThucFormService);
  protected danhMucLoaiGiayToChungThucService = inject(DanhMucLoaiGiayToChungThucService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: ChungThucFormGroup = this.chungThucFormService.createChungThucFormGroup();

  compareDanhMucLoaiGiayToChungThuc = (o1: IDanhMucLoaiGiayToChungThuc | null, o2: IDanhMucLoaiGiayToChungThuc | null): boolean =>
    this.danhMucLoaiGiayToChungThucService.compareDanhMucLoaiGiayToChungThuc(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ chungThuc }) => {
      this.chungThuc = chungThuc;
      if (chungThuc) {
        this.updateForm(chungThuc);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const chungThuc = this.chungThucFormService.getChungThuc(this.editForm);
    if (chungThuc.idChungThuc !== null) {
      this.subscribeToSaveResponse(this.chungThucService.update(chungThuc));
    } else {
      this.subscribeToSaveResponse(this.chungThucService.create(chungThuc));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IChungThuc>>): void {
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

  protected updateForm(chungThuc: IChungThuc): void {
    this.chungThuc = chungThuc;
    this.chungThucFormService.resetForm(this.editForm, chungThuc);

    this.danhMucLoaiGiayToChungThucsSharedCollection =
      this.danhMucLoaiGiayToChungThucService.addDanhMucLoaiGiayToChungThucToCollectionIfMissing<IDanhMucLoaiGiayToChungThuc>(
        this.danhMucLoaiGiayToChungThucsSharedCollection,
        chungThuc.danhMucLoaiGiayToChungThuc,
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
            this.chungThuc?.danhMucLoaiGiayToChungThuc,
          ),
        ),
      )
      .subscribe(
        (danhMucLoaiGiayToChungThucs: IDanhMucLoaiGiayToChungThuc[]) =>
          (this.danhMucLoaiGiayToChungThucsSharedCollection = danhMucLoaiGiayToChungThucs),
      );
  }
}
