import { Component, inject, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IDanhMucLoaiGiayToChungThuc } from '../danh-muc-loai-giay-to-chung-thuc.model';
import { DanhMucLoaiGiayToChungThucService } from '../service/danh-muc-loai-giay-to-chung-thuc.service';
import {
  DanhMucLoaiGiayToChungThucFormService,
  DanhMucLoaiGiayToChungThucFormGroup,
} from './danh-muc-loai-giay-to-chung-thuc-form.service';

@Component({
  standalone: true,
  selector: 'jhi-danh-muc-loai-giay-to-chung-thuc-update',
  templateUrl: './danh-muc-loai-giay-to-chung-thuc-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class DanhMucLoaiGiayToChungThucUpdateComponent implements OnInit {
  isSaving = false;
  danhMucLoaiGiayToChungThuc: IDanhMucLoaiGiayToChungThuc | null = null;

  protected danhMucLoaiGiayToChungThucService = inject(DanhMucLoaiGiayToChungThucService);
  protected danhMucLoaiGiayToChungThucFormService = inject(DanhMucLoaiGiayToChungThucFormService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: DanhMucLoaiGiayToChungThucFormGroup = this.danhMucLoaiGiayToChungThucFormService.createDanhMucLoaiGiayToChungThucFormGroup();

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ danhMucLoaiGiayToChungThuc }) => {
      this.danhMucLoaiGiayToChungThuc = danhMucLoaiGiayToChungThuc;
      if (danhMucLoaiGiayToChungThuc) {
        this.updateForm(danhMucLoaiGiayToChungThuc);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const danhMucLoaiGiayToChungThuc = this.danhMucLoaiGiayToChungThucFormService.getDanhMucLoaiGiayToChungThuc(this.editForm);
    if (danhMucLoaiGiayToChungThuc.id !== null) {
      this.subscribeToSaveResponse(this.danhMucLoaiGiayToChungThucService.update(danhMucLoaiGiayToChungThuc));
    } else {
      this.subscribeToSaveResponse(this.danhMucLoaiGiayToChungThucService.create(danhMucLoaiGiayToChungThuc));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDanhMucLoaiGiayToChungThuc>>): void {
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

  protected updateForm(danhMucLoaiGiayToChungThuc: IDanhMucLoaiGiayToChungThuc): void {
    this.danhMucLoaiGiayToChungThuc = danhMucLoaiGiayToChungThuc;
    this.danhMucLoaiGiayToChungThucFormService.resetForm(this.editForm, danhMucLoaiGiayToChungThuc);
  }
}
