import { Component, inject, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IHopDongCongChung } from '../hop-dong-cong-chung.model';
import { HopDongCongChungService } from '../service/hop-dong-cong-chung.service';
import { HopDongCongChungFormService, HopDongCongChungFormGroup } from './hop-dong-cong-chung-form.service';

@Component({
  standalone: true,
  selector: 'jhi-hop-dong-cong-chung-update',
  templateUrl: './hop-dong-cong-chung-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class HopDongCongChungUpdateComponent implements OnInit {
  isSaving = false;
  hopDongCongChung: IHopDongCongChung | null = null;

  protected hopDongCongChungService = inject(HopDongCongChungService);
  protected hopDongCongChungFormService = inject(HopDongCongChungFormService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: HopDongCongChungFormGroup = this.hopDongCongChungFormService.createHopDongCongChungFormGroup();

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ hopDongCongChung }) => {
      this.hopDongCongChung = hopDongCongChung;
      if (hopDongCongChung) {
        this.updateForm(hopDongCongChung);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const hopDongCongChung = this.hopDongCongChungFormService.getHopDongCongChung(this.editForm);
    if (hopDongCongChung.id !== null) {
      this.subscribeToSaveResponse(this.hopDongCongChungService.update(hopDongCongChung));
    } else {
      this.subscribeToSaveResponse(this.hopDongCongChungService.create(hopDongCongChung));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IHopDongCongChung>>): void {
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

  protected updateForm(hopDongCongChung: IHopDongCongChung): void {
    this.hopDongCongChung = hopDongCongChung;
    this.hopDongCongChungFormService.resetForm(this.editForm, hopDongCongChung);
  }
}
