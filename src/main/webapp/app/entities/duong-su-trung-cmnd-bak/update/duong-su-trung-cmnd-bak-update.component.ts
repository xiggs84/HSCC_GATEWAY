import { Component, inject, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IDuongSuTrungCmndBak } from '../duong-su-trung-cmnd-bak.model';
import { DuongSuTrungCmndBakService } from '../service/duong-su-trung-cmnd-bak.service';
import { DuongSuTrungCmndBakFormService, DuongSuTrungCmndBakFormGroup } from './duong-su-trung-cmnd-bak-form.service';

@Component({
  standalone: true,
  selector: 'jhi-duong-su-trung-cmnd-bak-update',
  templateUrl: './duong-su-trung-cmnd-bak-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class DuongSuTrungCmndBakUpdateComponent implements OnInit {
  isSaving = false;
  duongSuTrungCmndBak: IDuongSuTrungCmndBak | null = null;

  protected duongSuTrungCmndBakService = inject(DuongSuTrungCmndBakService);
  protected duongSuTrungCmndBakFormService = inject(DuongSuTrungCmndBakFormService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: DuongSuTrungCmndBakFormGroup = this.duongSuTrungCmndBakFormService.createDuongSuTrungCmndBakFormGroup();

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ duongSuTrungCmndBak }) => {
      this.duongSuTrungCmndBak = duongSuTrungCmndBak;
      if (duongSuTrungCmndBak) {
        this.updateForm(duongSuTrungCmndBak);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const duongSuTrungCmndBak = this.duongSuTrungCmndBakFormService.getDuongSuTrungCmndBak(this.editForm);
    if (duongSuTrungCmndBak.id !== null) {
      this.subscribeToSaveResponse(this.duongSuTrungCmndBakService.update(duongSuTrungCmndBak));
    } else {
      this.subscribeToSaveResponse(this.duongSuTrungCmndBakService.create(duongSuTrungCmndBak));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDuongSuTrungCmndBak>>): void {
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

  protected updateForm(duongSuTrungCmndBak: IDuongSuTrungCmndBak): void {
    this.duongSuTrungCmndBak = duongSuTrungCmndBak;
    this.duongSuTrungCmndBakFormService.resetForm(this.editForm, duongSuTrungCmndBak);
  }
}
