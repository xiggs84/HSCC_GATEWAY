import { Component, OnInit, inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IDuongSu } from 'app/entities/duong-su/duong-su.model';
import { DuongSuService } from 'app/entities/duong-su/service/duong-su.service';
import { IDuongSuTrungCmnd } from '../duong-su-trung-cmnd.model';
import { DuongSuTrungCmndService } from '../service/duong-su-trung-cmnd.service';
import { DuongSuTrungCmndFormGroup, DuongSuTrungCmndFormService } from './duong-su-trung-cmnd-form.service';

@Component({
  standalone: true,
  selector: 'jhi-duong-su-trung-cmnd-update',
  templateUrl: './duong-su-trung-cmnd-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class DuongSuTrungCmndUpdateComponent implements OnInit {
  isSaving = false;
  duongSuTrungCmnd: IDuongSuTrungCmnd | null = null;

  duongSusSharedCollection: IDuongSu[] = [];

  protected duongSuTrungCmndService = inject(DuongSuTrungCmndService);
  protected duongSuTrungCmndFormService = inject(DuongSuTrungCmndFormService);
  protected duongSuService = inject(DuongSuService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: DuongSuTrungCmndFormGroup = this.duongSuTrungCmndFormService.createDuongSuTrungCmndFormGroup();

  compareDuongSu = (o1: IDuongSu | null, o2: IDuongSu | null): boolean => this.duongSuService.compareDuongSu(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ duongSuTrungCmnd }) => {
      this.duongSuTrungCmnd = duongSuTrungCmnd;
      if (duongSuTrungCmnd) {
        this.updateForm(duongSuTrungCmnd);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const duongSuTrungCmnd = this.duongSuTrungCmndFormService.getDuongSuTrungCmnd(this.editForm);
    if (duongSuTrungCmnd.id !== null) {
      this.subscribeToSaveResponse(this.duongSuTrungCmndService.update(duongSuTrungCmnd));
    } else {
      this.subscribeToSaveResponse(this.duongSuTrungCmndService.create(duongSuTrungCmnd));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDuongSuTrungCmnd>>): void {
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

  protected updateForm(duongSuTrungCmnd: IDuongSuTrungCmnd): void {
    this.duongSuTrungCmnd = duongSuTrungCmnd;
    this.duongSuTrungCmndFormService.resetForm(this.editForm, duongSuTrungCmnd);

    this.duongSusSharedCollection = this.duongSuService.addDuongSuToCollectionIfMissing<IDuongSu>(
      this.duongSusSharedCollection,
      duongSuTrungCmnd.duongSu,
    );
  }

  protected loadRelationshipsOptions(): void {
    this.duongSuService
      .query()
      .pipe(map((res: HttpResponse<IDuongSu[]>) => res.body ?? []))
      .pipe(
        map((duongSus: IDuongSu[]) =>
          this.duongSuService.addDuongSuToCollectionIfMissing<IDuongSu>(duongSus, this.duongSuTrungCmnd?.duongSu),
        ),
      )
      .subscribe((duongSus: IDuongSu[]) => (this.duongSusSharedCollection = duongSus));
  }
}
