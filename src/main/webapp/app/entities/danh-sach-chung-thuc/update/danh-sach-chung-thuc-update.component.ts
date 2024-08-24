import { Component, inject, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IDanhSachChungThuc } from '../danh-sach-chung-thuc.model';
import { DanhSachChungThucService } from '../service/danh-sach-chung-thuc.service';
import { DanhSachChungThucFormService, DanhSachChungThucFormGroup } from './danh-sach-chung-thuc-form.service';

@Component({
  standalone: true,
  selector: 'jhi-danh-sach-chung-thuc-update',
  templateUrl: './danh-sach-chung-thuc-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class DanhSachChungThucUpdateComponent implements OnInit {
  isSaving = false;
  danhSachChungThuc: IDanhSachChungThuc | null = null;

  protected danhSachChungThucService = inject(DanhSachChungThucService);
  protected danhSachChungThucFormService = inject(DanhSachChungThucFormService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: DanhSachChungThucFormGroup = this.danhSachChungThucFormService.createDanhSachChungThucFormGroup();

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ danhSachChungThuc }) => {
      this.danhSachChungThuc = danhSachChungThuc;
      if (danhSachChungThuc) {
        this.updateForm(danhSachChungThuc);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const danhSachChungThuc = this.danhSachChungThucFormService.getDanhSachChungThuc(this.editForm);
    if (danhSachChungThuc.id !== null) {
      this.subscribeToSaveResponse(this.danhSachChungThucService.update(danhSachChungThuc));
    } else {
      this.subscribeToSaveResponse(this.danhSachChungThucService.create(danhSachChungThuc));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDanhSachChungThuc>>): void {
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

  protected updateForm(danhSachChungThuc: IDanhSachChungThuc): void {
    this.danhSachChungThuc = danhSachChungThuc;
    this.danhSachChungThucFormService.resetForm(this.editForm, danhSachChungThuc);
  }
}
