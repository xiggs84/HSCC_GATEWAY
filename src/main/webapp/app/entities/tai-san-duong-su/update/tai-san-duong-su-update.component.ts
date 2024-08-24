import { Component, inject, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ITaiSanDuongSu } from '../tai-san-duong-su.model';
import { TaiSanDuongSuService } from '../service/tai-san-duong-su.service';
import { TaiSanDuongSuFormService, TaiSanDuongSuFormGroup } from './tai-san-duong-su-form.service';

@Component({
  standalone: true,
  selector: 'jhi-tai-san-duong-su-update',
  templateUrl: './tai-san-duong-su-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class TaiSanDuongSuUpdateComponent implements OnInit {
  isSaving = false;
  taiSanDuongSu: ITaiSanDuongSu | null = null;

  protected taiSanDuongSuService = inject(TaiSanDuongSuService);
  protected taiSanDuongSuFormService = inject(TaiSanDuongSuFormService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: TaiSanDuongSuFormGroup = this.taiSanDuongSuFormService.createTaiSanDuongSuFormGroup();

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ taiSanDuongSu }) => {
      this.taiSanDuongSu = taiSanDuongSu;
      if (taiSanDuongSu) {
        this.updateForm(taiSanDuongSu);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const taiSanDuongSu = this.taiSanDuongSuFormService.getTaiSanDuongSu(this.editForm);
    if (taiSanDuongSu.id !== null) {
      this.subscribeToSaveResponse(this.taiSanDuongSuService.update(taiSanDuongSu));
    } else {
      this.subscribeToSaveResponse(this.taiSanDuongSuService.create(taiSanDuongSu));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITaiSanDuongSu>>): void {
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

  protected updateForm(taiSanDuongSu: ITaiSanDuongSu): void {
    this.taiSanDuongSu = taiSanDuongSu;
    this.taiSanDuongSuFormService.resetForm(this.editForm, taiSanDuongSu);
  }
}
