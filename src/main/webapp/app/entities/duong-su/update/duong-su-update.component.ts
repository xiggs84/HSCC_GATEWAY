import { Component, inject, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IDuongSu } from '../duong-su.model';
import { DuongSuService } from '../service/duong-su.service';
import { DuongSuFormService, DuongSuFormGroup } from './duong-su-form.service';

@Component({
  standalone: true,
  selector: 'jhi-duong-su-update',
  templateUrl: './duong-su-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class DuongSuUpdateComponent implements OnInit {
  isSaving = false;
  duongSu: IDuongSu | null = null;

  protected duongSuService = inject(DuongSuService);
  protected duongSuFormService = inject(DuongSuFormService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: DuongSuFormGroup = this.duongSuFormService.createDuongSuFormGroup();

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ duongSu }) => {
      this.duongSu = duongSu;
      if (duongSu) {
        this.updateForm(duongSu);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const duongSu = this.duongSuFormService.getDuongSu(this.editForm);
    if (duongSu.id !== null) {
      this.subscribeToSaveResponse(this.duongSuService.update(duongSu));
    } else {
      this.subscribeToSaveResponse(this.duongSuService.create(duongSu));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDuongSu>>): void {
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

  protected updateForm(duongSu: IDuongSu): void {
    this.duongSu = duongSu;
    this.duongSuFormService.resetForm(this.editForm, duongSu);
  }
}
