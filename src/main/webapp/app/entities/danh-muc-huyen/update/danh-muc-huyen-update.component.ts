import { Component, OnInit, inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IDanhMucHuyen } from '../danh-muc-huyen.model';
import { DanhMucHuyenService } from '../service/danh-muc-huyen.service';
import { DanhMucHuyenFormGroup, DanhMucHuyenFormService } from './danh-muc-huyen-form.service';

@Component({
  standalone: true,
  selector: 'jhi-danh-muc-huyen-update',
  templateUrl: './danh-muc-huyen-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class DanhMucHuyenUpdateComponent implements OnInit {
  isSaving = false;
  danhMucHuyen: IDanhMucHuyen | null = null;

  protected danhMucHuyenService = inject(DanhMucHuyenService);
  protected danhMucHuyenFormService = inject(DanhMucHuyenFormService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: DanhMucHuyenFormGroup = this.danhMucHuyenFormService.createDanhMucHuyenFormGroup();

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ danhMucHuyen }) => {
      this.danhMucHuyen = danhMucHuyen;
      if (danhMucHuyen) {
        this.updateForm(danhMucHuyen);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const danhMucHuyen = this.danhMucHuyenFormService.getDanhMucHuyen(this.editForm);
    if (danhMucHuyen.maHuyen !== null) {
      this.subscribeToSaveResponse(this.danhMucHuyenService.update(danhMucHuyen));
    } else {
      this.subscribeToSaveResponse(this.danhMucHuyenService.create(danhMucHuyen));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDanhMucHuyen>>): void {
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

  protected updateForm(danhMucHuyen: IDanhMucHuyen): void {
    this.danhMucHuyen = danhMucHuyen;
    this.danhMucHuyenFormService.resetForm(this.editForm, danhMucHuyen);
  }
}
