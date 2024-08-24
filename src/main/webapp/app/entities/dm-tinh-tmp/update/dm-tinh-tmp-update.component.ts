import { Component, inject, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IDmTinhTmp } from '../dm-tinh-tmp.model';
import { DmTinhTmpService } from '../service/dm-tinh-tmp.service';
import { DmTinhTmpFormService, DmTinhTmpFormGroup } from './dm-tinh-tmp-form.service';

@Component({
  standalone: true,
  selector: 'jhi-dm-tinh-tmp-update',
  templateUrl: './dm-tinh-tmp-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class DmTinhTmpUpdateComponent implements OnInit {
  isSaving = false;
  dmTinhTmp: IDmTinhTmp | null = null;

  protected dmTinhTmpService = inject(DmTinhTmpService);
  protected dmTinhTmpFormService = inject(DmTinhTmpFormService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: DmTinhTmpFormGroup = this.dmTinhTmpFormService.createDmTinhTmpFormGroup();

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ dmTinhTmp }) => {
      this.dmTinhTmp = dmTinhTmp;
      if (dmTinhTmp) {
        this.updateForm(dmTinhTmp);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const dmTinhTmp = this.dmTinhTmpFormService.getDmTinhTmp(this.editForm);
    if (dmTinhTmp.id !== null) {
      this.subscribeToSaveResponse(this.dmTinhTmpService.update(dmTinhTmp));
    } else {
      this.subscribeToSaveResponse(this.dmTinhTmpService.create(dmTinhTmp));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDmTinhTmp>>): void {
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

  protected updateForm(dmTinhTmp: IDmTinhTmp): void {
    this.dmTinhTmp = dmTinhTmp;
    this.dmTinhTmpFormService.resetForm(this.editForm, dmTinhTmp);
  }
}
