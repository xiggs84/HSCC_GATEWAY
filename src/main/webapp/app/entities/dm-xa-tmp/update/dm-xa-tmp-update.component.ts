import { Component, inject, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IDmXaTmp } from '../dm-xa-tmp.model';
import { DmXaTmpService } from '../service/dm-xa-tmp.service';
import { DmXaTmpFormService, DmXaTmpFormGroup } from './dm-xa-tmp-form.service';

@Component({
  standalone: true,
  selector: 'jhi-dm-xa-tmp-update',
  templateUrl: './dm-xa-tmp-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class DmXaTmpUpdateComponent implements OnInit {
  isSaving = false;
  dmXaTmp: IDmXaTmp | null = null;

  protected dmXaTmpService = inject(DmXaTmpService);
  protected dmXaTmpFormService = inject(DmXaTmpFormService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: DmXaTmpFormGroup = this.dmXaTmpFormService.createDmXaTmpFormGroup();

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ dmXaTmp }) => {
      this.dmXaTmp = dmXaTmp;
      if (dmXaTmp) {
        this.updateForm(dmXaTmp);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const dmXaTmp = this.dmXaTmpFormService.getDmXaTmp(this.editForm);
    if (dmXaTmp.id !== null) {
      this.subscribeToSaveResponse(this.dmXaTmpService.update(dmXaTmp));
    } else {
      this.subscribeToSaveResponse(this.dmXaTmpService.create(dmXaTmp));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDmXaTmp>>): void {
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

  protected updateForm(dmXaTmp: IDmXaTmp): void {
    this.dmXaTmp = dmXaTmp;
    this.dmXaTmpFormService.resetForm(this.editForm, dmXaTmp);
  }
}
