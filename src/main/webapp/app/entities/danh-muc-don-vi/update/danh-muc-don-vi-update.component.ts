import { Component, OnInit, inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CapQuanLy } from 'app/entities/enumerations/cap-quan-ly.model';
import { NhiemVu } from 'app/entities/enumerations/nhiem-vu.model';
import { LoaiDonVi } from 'app/entities/enumerations/loai-don-vi.model';
import { DanhMucDonViService } from '../service/danh-muc-don-vi.service';
import { IDanhMucDonVi } from '../danh-muc-don-vi.model';
import { DanhMucDonViFormGroup, DanhMucDonViFormService } from './danh-muc-don-vi-form.service';

@Component({
  standalone: true,
  selector: 'jhi-danh-muc-don-vi-update',
  templateUrl: './danh-muc-don-vi-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class DanhMucDonViUpdateComponent implements OnInit {
  isSaving = false;
  danhMucDonVi: IDanhMucDonVi | null = null;
  capQuanLyValues = Object.keys(CapQuanLy);
  nhiemVuValues = Object.keys(NhiemVu);
  loaiDonViValues = Object.keys(LoaiDonVi);

  protected danhMucDonViService = inject(DanhMucDonViService);
  protected danhMucDonViFormService = inject(DanhMucDonViFormService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: DanhMucDonViFormGroup = this.danhMucDonViFormService.createDanhMucDonViFormGroup();

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ danhMucDonVi }) => {
      this.danhMucDonVi = danhMucDonVi;
      if (danhMucDonVi) {
        this.updateForm(danhMucDonVi);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const danhMucDonVi = this.danhMucDonViFormService.getDanhMucDonVi(this.editForm);
    if (danhMucDonVi.idDonVi !== null) {
      this.subscribeToSaveResponse(this.danhMucDonViService.update(danhMucDonVi));
    } else {
      this.subscribeToSaveResponse(this.danhMucDonViService.create(danhMucDonVi));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDanhMucDonVi>>): void {
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

  protected updateForm(danhMucDonVi: IDanhMucDonVi): void {
    this.danhMucDonVi = danhMucDonVi;
    this.danhMucDonViFormService.resetForm(this.editForm, danhMucDonVi);
  }
}
