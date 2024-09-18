import { Component, OnInit, inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IDuongSu } from 'app/entities/duong-su/duong-su.model';
import { DuongSuService } from 'app/entities/duong-su/service/duong-su.service';
import { IDanhSachDuongSu } from '../danh-sach-duong-su.model';
import { DanhSachDuongSuService } from '../service/danh-sach-duong-su.service';
import { DanhSachDuongSuFormGroup, DanhSachDuongSuFormService } from './danh-sach-duong-su-form.service';

@Component({
  standalone: true,
  selector: 'jhi-danh-sach-duong-su-update',
  templateUrl: './danh-sach-duong-su-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class DanhSachDuongSuUpdateComponent implements OnInit {
  isSaving = false;
  danhSachDuongSu: IDanhSachDuongSu | null = null;

  duongSusSharedCollection: IDuongSu[] = [];

  protected danhSachDuongSuService = inject(DanhSachDuongSuService);
  protected danhSachDuongSuFormService = inject(DanhSachDuongSuFormService);
  protected duongSuService = inject(DuongSuService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: DanhSachDuongSuFormGroup = this.danhSachDuongSuFormService.createDanhSachDuongSuFormGroup();

  compareDuongSu = (o1: IDuongSu | null, o2: IDuongSu | null): boolean => this.duongSuService.compareDuongSu(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ danhSachDuongSu }) => {
      this.danhSachDuongSu = danhSachDuongSu;
      if (danhSachDuongSu) {
        this.updateForm(danhSachDuongSu);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const danhSachDuongSu = this.danhSachDuongSuFormService.getDanhSachDuongSu(this.editForm);
    if (danhSachDuongSu.id !== null) {
      this.subscribeToSaveResponse(this.danhSachDuongSuService.update(danhSachDuongSu));
    } else {
      this.subscribeToSaveResponse(this.danhSachDuongSuService.create(danhSachDuongSu));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDanhSachDuongSu>>): void {
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

  protected updateForm(danhSachDuongSu: IDanhSachDuongSu): void {
    this.danhSachDuongSu = danhSachDuongSu;
    this.danhSachDuongSuFormService.resetForm(this.editForm, danhSachDuongSu);

    this.duongSusSharedCollection = this.duongSuService.addDuongSuToCollectionIfMissing<IDuongSu>(
      this.duongSusSharedCollection,
      danhSachDuongSu.duongSu,
    );
  }

  protected loadRelationshipsOptions(): void {
    this.duongSuService
      .query()
      .pipe(map((res: HttpResponse<IDuongSu[]>) => res.body ?? []))
      .pipe(
        map((duongSus: IDuongSu[]) =>
          this.duongSuService.addDuongSuToCollectionIfMissing<IDuongSu>(duongSus, this.danhSachDuongSu?.duongSu),
        ),
      )
      .subscribe((duongSus: IDuongSu[]) => (this.duongSusSharedCollection = duongSus));
  }
}
