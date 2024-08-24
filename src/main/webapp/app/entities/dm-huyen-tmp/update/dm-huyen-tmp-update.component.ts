import { Component, inject, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IDmHuyenTmp } from '../dm-huyen-tmp.model';
import { DmHuyenTmpService } from '../service/dm-huyen-tmp.service';
import { DmHuyenTmpFormService, DmHuyenTmpFormGroup } from './dm-huyen-tmp-form.service';

@Component({
  standalone: true,
  selector: 'jhi-dm-huyen-tmp-update',
  templateUrl: './dm-huyen-tmp-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class DmHuyenTmpUpdateComponent implements OnInit {
  isSaving = false;
  dmHuyenTmp: IDmHuyenTmp | null = null;

  protected dmHuyenTmpService = inject(DmHuyenTmpService);
  protected dmHuyenTmpFormService = inject(DmHuyenTmpFormService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: DmHuyenTmpFormGroup = this.dmHuyenTmpFormService.createDmHuyenTmpFormGroup();

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ dmHuyenTmp }) => {
      this.dmHuyenTmp = dmHuyenTmp;
      if (dmHuyenTmp) {
        this.updateForm(dmHuyenTmp);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const dmHuyenTmp = this.dmHuyenTmpFormService.getDmHuyenTmp(this.editForm);
    if (dmHuyenTmp.id !== null) {
      this.subscribeToSaveResponse(this.dmHuyenTmpService.update(dmHuyenTmp));
    } else {
      this.subscribeToSaveResponse(this.dmHuyenTmpService.create(dmHuyenTmp));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDmHuyenTmp>>): void {
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

  protected updateForm(dmHuyenTmp: IDmHuyenTmp): void {
    this.dmHuyenTmp = dmHuyenTmp;
    this.dmHuyenTmpFormService.resetForm(this.editForm, dmHuyenTmp);
  }
}
