import { Component, inject, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IChungThuc } from '../chung-thuc.model';
import { ChungThucService } from '../service/chung-thuc.service';
import { ChungThucFormService, ChungThucFormGroup } from './chung-thuc-form.service';

@Component({
  standalone: true,
  selector: 'jhi-chung-thuc-update',
  templateUrl: './chung-thuc-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class ChungThucUpdateComponent implements OnInit {
  isSaving = false;
  chungThuc: IChungThuc | null = null;

  protected chungThucService = inject(ChungThucService);
  protected chungThucFormService = inject(ChungThucFormService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: ChungThucFormGroup = this.chungThucFormService.createChungThucFormGroup();

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ chungThuc }) => {
      this.chungThuc = chungThuc;
      if (chungThuc) {
        this.updateForm(chungThuc);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const chungThuc = this.chungThucFormService.getChungThuc(this.editForm);
    if (chungThuc.id !== null) {
      this.subscribeToSaveResponse(this.chungThucService.update(chungThuc));
    } else {
      this.subscribeToSaveResponse(this.chungThucService.create(chungThuc));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IChungThuc>>): void {
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

  protected updateForm(chungThuc: IChungThuc): void {
    this.chungThuc = chungThuc;
    this.chungThucFormService.resetForm(this.editForm, chungThuc);
  }
}
