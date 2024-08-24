import { Component, inject, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ISoCongChungTemp } from '../so-cong-chung-temp.model';
import { SoCongChungTempService } from '../service/so-cong-chung-temp.service';
import { SoCongChungTempFormService, SoCongChungTempFormGroup } from './so-cong-chung-temp-form.service';

@Component({
  standalone: true,
  selector: 'jhi-so-cong-chung-temp-update',
  templateUrl: './so-cong-chung-temp-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class SoCongChungTempUpdateComponent implements OnInit {
  isSaving = false;
  soCongChungTemp: ISoCongChungTemp | null = null;

  protected soCongChungTempService = inject(SoCongChungTempService);
  protected soCongChungTempFormService = inject(SoCongChungTempFormService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: SoCongChungTempFormGroup = this.soCongChungTempFormService.createSoCongChungTempFormGroup();

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ soCongChungTemp }) => {
      this.soCongChungTemp = soCongChungTemp;
      if (soCongChungTemp) {
        this.updateForm(soCongChungTemp);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const soCongChungTemp = this.soCongChungTempFormService.getSoCongChungTemp(this.editForm);
    if (soCongChungTemp.id !== null) {
      this.subscribeToSaveResponse(this.soCongChungTempService.update(soCongChungTemp));
    } else {
      this.subscribeToSaveResponse(this.soCongChungTempService.create(soCongChungTemp));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISoCongChungTemp>>): void {
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

  protected updateForm(soCongChungTemp: ISoCongChungTemp): void {
    this.soCongChungTemp = soCongChungTemp;
    this.soCongChungTempFormService.resetForm(this.editForm, soCongChungTemp);
  }
}
