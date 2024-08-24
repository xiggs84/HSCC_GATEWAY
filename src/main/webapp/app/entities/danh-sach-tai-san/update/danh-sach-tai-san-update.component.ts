import { Component, inject, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IDanhSachTaiSan } from '../danh-sach-tai-san.model';
import { DanhSachTaiSanService } from '../service/danh-sach-tai-san.service';
import { DanhSachTaiSanFormService, DanhSachTaiSanFormGroup } from './danh-sach-tai-san-form.service';

@Component({
  standalone: true,
  selector: 'jhi-danh-sach-tai-san-update',
  templateUrl: './danh-sach-tai-san-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class DanhSachTaiSanUpdateComponent implements OnInit {
  isSaving = false;
  danhSachTaiSan: IDanhSachTaiSan | null = null;

  protected danhSachTaiSanService = inject(DanhSachTaiSanService);
  protected danhSachTaiSanFormService = inject(DanhSachTaiSanFormService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: DanhSachTaiSanFormGroup = this.danhSachTaiSanFormService.createDanhSachTaiSanFormGroup();

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ danhSachTaiSan }) => {
      this.danhSachTaiSan = danhSachTaiSan;
      if (danhSachTaiSan) {
        this.updateForm(danhSachTaiSan);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const danhSachTaiSan = this.danhSachTaiSanFormService.getDanhSachTaiSan(this.editForm);
    if (danhSachTaiSan.id !== null) {
      this.subscribeToSaveResponse(this.danhSachTaiSanService.update(danhSachTaiSan));
    } else {
      this.subscribeToSaveResponse(this.danhSachTaiSanService.create(danhSachTaiSan));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDanhSachTaiSan>>): void {
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

  protected updateForm(danhSachTaiSan: IDanhSachTaiSan): void {
    this.danhSachTaiSan = danhSachTaiSan;
    this.danhSachTaiSanFormService.resetForm(this.editForm, danhSachTaiSan);
  }
}
