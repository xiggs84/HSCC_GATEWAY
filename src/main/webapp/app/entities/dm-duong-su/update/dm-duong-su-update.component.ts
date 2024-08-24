import { Component, inject, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IDmDuongSu } from '../dm-duong-su.model';
import { DmDuongSuService } from '../service/dm-duong-su.service';
import { DmDuongSuFormService, DmDuongSuFormGroup } from './dm-duong-su-form.service';

@Component({
  standalone: true,
  selector: 'jhi-dm-duong-su-update',
  templateUrl: './dm-duong-su-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class DmDuongSuUpdateComponent implements OnInit {
  isSaving = false;
  dmDuongSu: IDmDuongSu | null = null;

  protected dmDuongSuService = inject(DmDuongSuService);
  protected dmDuongSuFormService = inject(DmDuongSuFormService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: DmDuongSuFormGroup = this.dmDuongSuFormService.createDmDuongSuFormGroup();

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ dmDuongSu }) => {
      this.dmDuongSu = dmDuongSu;
      if (dmDuongSu) {
        this.updateForm(dmDuongSu);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const dmDuongSu = this.dmDuongSuFormService.getDmDuongSu(this.editForm);
    if (dmDuongSu.id !== null) {
      this.subscribeToSaveResponse(this.dmDuongSuService.update(dmDuongSu));
    } else {
      this.subscribeToSaveResponse(this.dmDuongSuService.create(dmDuongSu));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDmDuongSu>>): void {
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

  protected updateForm(dmDuongSu: IDmDuongSu): void {
    this.dmDuongSu = dmDuongSu;
    this.dmDuongSuFormService.resetForm(this.editForm, dmDuongSu);
  }
}
