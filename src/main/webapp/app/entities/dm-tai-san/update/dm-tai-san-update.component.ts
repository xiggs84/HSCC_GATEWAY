import { Component, inject, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IDmTaiSan } from '../dm-tai-san.model';
import { DmTaiSanService } from '../service/dm-tai-san.service';
import { DmTaiSanFormService, DmTaiSanFormGroup } from './dm-tai-san-form.service';

@Component({
  standalone: true,
  selector: 'jhi-dm-tai-san-update',
  templateUrl: './dm-tai-san-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class DmTaiSanUpdateComponent implements OnInit {
  isSaving = false;
  dmTaiSan: IDmTaiSan | null = null;

  protected dmTaiSanService = inject(DmTaiSanService);
  protected dmTaiSanFormService = inject(DmTaiSanFormService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: DmTaiSanFormGroup = this.dmTaiSanFormService.createDmTaiSanFormGroup();

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ dmTaiSan }) => {
      this.dmTaiSan = dmTaiSan;
      if (dmTaiSan) {
        this.updateForm(dmTaiSan);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const dmTaiSan = this.dmTaiSanFormService.getDmTaiSan(this.editForm);
    if (dmTaiSan.id !== null) {
      this.subscribeToSaveResponse(this.dmTaiSanService.update(dmTaiSan));
    } else {
      this.subscribeToSaveResponse(this.dmTaiSanService.create(dmTaiSan));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDmTaiSan>>): void {
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

  protected updateForm(dmTaiSan: IDmTaiSan): void {
    this.dmTaiSan = dmTaiSan;
    this.dmTaiSanFormService.resetForm(this.editForm, dmTaiSan);
  }
}
