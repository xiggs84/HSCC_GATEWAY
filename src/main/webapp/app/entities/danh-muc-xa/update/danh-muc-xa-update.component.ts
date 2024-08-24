import { Component, inject, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IDanhMucXa } from '../danh-muc-xa.model';
import { DanhMucXaService } from '../service/danh-muc-xa.service';
import { DanhMucXaFormService, DanhMucXaFormGroup } from './danh-muc-xa-form.service';

@Component({
  standalone: true,
  selector: 'jhi-danh-muc-xa-update',
  templateUrl: './danh-muc-xa-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class DanhMucXaUpdateComponent implements OnInit {
  isSaving = false;
  danhMucXa: IDanhMucXa | null = null;

  protected danhMucXaService = inject(DanhMucXaService);
  protected danhMucXaFormService = inject(DanhMucXaFormService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: DanhMucXaFormGroup = this.danhMucXaFormService.createDanhMucXaFormGroup();

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ danhMucXa }) => {
      this.danhMucXa = danhMucXa;
      if (danhMucXa) {
        this.updateForm(danhMucXa);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const danhMucXa = this.danhMucXaFormService.getDanhMucXa(this.editForm);
    if (danhMucXa.id !== null) {
      this.subscribeToSaveResponse(this.danhMucXaService.update(danhMucXa));
    } else {
      this.subscribeToSaveResponse(this.danhMucXaService.create(danhMucXa));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDanhMucXa>>): void {
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

  protected updateForm(danhMucXa: IDanhMucXa): void {
    this.danhMucXa = danhMucXa;
    this.danhMucXaFormService.resetForm(this.editForm, danhMucXa);
  }
}
