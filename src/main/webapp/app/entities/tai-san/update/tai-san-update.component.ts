import { Component, OnInit, inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ITaiSan } from '../tai-san.model';
import { TaiSanService } from '../service/tai-san.service';
import { TaiSanFormGroup, TaiSanFormService } from './tai-san-form.service';

@Component({
  standalone: true,
  selector: 'jhi-tai-san-update',
  templateUrl: './tai-san-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class TaiSanUpdateComponent implements OnInit {
  isSaving = false;
  taiSan: ITaiSan | null = null;

  protected taiSanService = inject(TaiSanService);
  protected taiSanFormService = inject(TaiSanFormService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: TaiSanFormGroup = this.taiSanFormService.createTaiSanFormGroup();

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ taiSan }) => {
      this.taiSan = taiSan;
      if (taiSan) {
        this.updateForm(taiSan);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const taiSan = this.taiSanFormService.getTaiSan(this.editForm);
    if (taiSan.idTaiSan !== null) {
      this.subscribeToSaveResponse(this.taiSanService.update(taiSan));
    } else {
      this.subscribeToSaveResponse(this.taiSanService.create(taiSan));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITaiSan>>): void {
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

  protected updateForm(taiSan: ITaiSan): void {
    this.taiSan = taiSan;
    this.taiSanFormService.resetForm(this.editForm, taiSan);
  }
}
