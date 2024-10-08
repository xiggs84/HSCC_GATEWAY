import { Component, OnInit, inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IDanhMucLoaiSoCongChung } from 'app/entities/danh-muc-loai-so-cong-chung/danh-muc-loai-so-cong-chung.model';
import { DanhMucLoaiSoCongChungService } from 'app/entities/danh-muc-loai-so-cong-chung/service/danh-muc-loai-so-cong-chung.service';
import { ISoCongChung } from '../so-cong-chung.model';
import { SoCongChungService } from '../service/so-cong-chung.service';
import { SoCongChungFormGroup, SoCongChungFormService } from './so-cong-chung-form.service';

@Component({
  standalone: true,
  selector: 'jhi-so-cong-chung-update',
  templateUrl: './so-cong-chung-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class SoCongChungUpdateComponent implements OnInit {
  isSaving = false;
  soCongChung: ISoCongChung | null = null;

  danhMucLoaiSoCongChungsSharedCollection: IDanhMucLoaiSoCongChung[] = [];

  protected soCongChungService = inject(SoCongChungService);
  protected soCongChungFormService = inject(SoCongChungFormService);
  protected danhMucLoaiSoCongChungService = inject(DanhMucLoaiSoCongChungService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: SoCongChungFormGroup = this.soCongChungFormService.createSoCongChungFormGroup();

  compareDanhMucLoaiSoCongChung = (o1: IDanhMucLoaiSoCongChung | null, o2: IDanhMucLoaiSoCongChung | null): boolean =>
    this.danhMucLoaiSoCongChungService.compareDanhMucLoaiSoCongChung(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ soCongChung }) => {
      this.soCongChung = soCongChung;
      if (soCongChung) {
        this.updateForm(soCongChung);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const soCongChung = this.soCongChungFormService.getSoCongChung(this.editForm);
    if (soCongChung.idSo !== null) {
      this.subscribeToSaveResponse(this.soCongChungService.update(soCongChung));
    } else {
      this.subscribeToSaveResponse(this.soCongChungService.create(soCongChung));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISoCongChung>>): void {
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

  protected updateForm(soCongChung: ISoCongChung): void {
    this.soCongChung = soCongChung;
    this.soCongChungFormService.resetForm(this.editForm, soCongChung);

    this.danhMucLoaiSoCongChungsSharedCollection =
      this.danhMucLoaiSoCongChungService.addDanhMucLoaiSoCongChungToCollectionIfMissing<IDanhMucLoaiSoCongChung>(
        this.danhMucLoaiSoCongChungsSharedCollection,
        soCongChung.danhMucLoaiSoCongChung,
      );
  }

  protected loadRelationshipsOptions(): void {
    this.danhMucLoaiSoCongChungService
      .query()
      .pipe(map((res: HttpResponse<IDanhMucLoaiSoCongChung[]>) => res.body ?? []))
      .pipe(
        map((danhMucLoaiSoCongChungs: IDanhMucLoaiSoCongChung[]) =>
          this.danhMucLoaiSoCongChungService.addDanhMucLoaiSoCongChungToCollectionIfMissing<IDanhMucLoaiSoCongChung>(
            danhMucLoaiSoCongChungs,
            this.soCongChung?.danhMucLoaiSoCongChung,
          ),
        ),
      )
      .subscribe(
        (danhMucLoaiSoCongChungs: IDanhMucLoaiSoCongChung[]) => (this.danhMucLoaiSoCongChungsSharedCollection = danhMucLoaiSoCongChungs),
      );
  }
}
