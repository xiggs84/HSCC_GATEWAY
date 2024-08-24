import { Component, inject, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IDmHopDong } from '../dm-hop-dong.model';
import { DmHopDongService } from '../service/dm-hop-dong.service';
import { DmHopDongFormService, DmHopDongFormGroup } from './dm-hop-dong-form.service';

@Component({
  standalone: true,
  selector: 'jhi-dm-hop-dong-update',
  templateUrl: './dm-hop-dong-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class DmHopDongUpdateComponent implements OnInit {
  isSaving = false;
  dmHopDong: IDmHopDong | null = null;

  protected dmHopDongService = inject(DmHopDongService);
  protected dmHopDongFormService = inject(DmHopDongFormService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: DmHopDongFormGroup = this.dmHopDongFormService.createDmHopDongFormGroup();

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ dmHopDong }) => {
      this.dmHopDong = dmHopDong;
      if (dmHopDong) {
        this.updateForm(dmHopDong);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const dmHopDong = this.dmHopDongFormService.getDmHopDong(this.editForm);
    if (dmHopDong.id !== null) {
      this.subscribeToSaveResponse(this.dmHopDongService.update(dmHopDong));
    } else {
      this.subscribeToSaveResponse(this.dmHopDongService.create(dmHopDong));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDmHopDong>>): void {
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

  protected updateForm(dmHopDong: IDmHopDong): void {
    this.dmHopDong = dmHopDong;
    this.dmHopDongFormService.resetForm(this.editForm, dmHopDong);
  }
}
