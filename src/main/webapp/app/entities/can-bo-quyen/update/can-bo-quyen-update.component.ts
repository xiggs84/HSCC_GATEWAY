import { Component, inject, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ICanBoQuyen } from '../can-bo-quyen.model';
import { CanBoQuyenService } from '../service/can-bo-quyen.service';
import { CanBoQuyenFormService, CanBoQuyenFormGroup } from './can-bo-quyen-form.service';

@Component({
  standalone: true,
  selector: 'jhi-can-bo-quyen-update',
  templateUrl: './can-bo-quyen-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class CanBoQuyenUpdateComponent implements OnInit {
  isSaving = false;
  canBoQuyen: ICanBoQuyen | null = null;

  protected canBoQuyenService = inject(CanBoQuyenService);
  protected canBoQuyenFormService = inject(CanBoQuyenFormService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: CanBoQuyenFormGroup = this.canBoQuyenFormService.createCanBoQuyenFormGroup();

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ canBoQuyen }) => {
      this.canBoQuyen = canBoQuyen;
      if (canBoQuyen) {
        this.updateForm(canBoQuyen);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const canBoQuyen = this.canBoQuyenFormService.getCanBoQuyen(this.editForm);
    if (canBoQuyen.id !== null) {
      this.subscribeToSaveResponse(this.canBoQuyenService.update(canBoQuyen));
    } else {
      this.subscribeToSaveResponse(this.canBoQuyenService.create(canBoQuyen));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICanBoQuyen>>): void {
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

  protected updateForm(canBoQuyen: ICanBoQuyen): void {
    this.canBoQuyen = canBoQuyen;
    this.canBoQuyenFormService.resetForm(this.editForm, canBoQuyen);
  }
}
