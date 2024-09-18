import { Component, OnInit, inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IDuongSu } from 'app/entities/duong-su/duong-su.model';
import { DuongSuService } from 'app/entities/duong-su/service/duong-su.service';
import { IDuongSuTrungCmndBak } from '../duong-su-trung-cmnd-bak.model';
import { DuongSuTrungCmndBakService } from '../service/duong-su-trung-cmnd-bak.service';
import { DuongSuTrungCmndBakFormGroup, DuongSuTrungCmndBakFormService } from './duong-su-trung-cmnd-bak-form.service';

@Component({
  standalone: true,
  selector: 'jhi-duong-su-trung-cmnd-bak-update',
  templateUrl: './duong-su-trung-cmnd-bak-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class DuongSuTrungCmndBakUpdateComponent implements OnInit {
  isSaving = false;
  duongSuTrungCmndBak: IDuongSuTrungCmndBak | null = null;

  duongSusSharedCollection: IDuongSu[] = [];

  protected duongSuTrungCmndBakService = inject(DuongSuTrungCmndBakService);
  protected duongSuTrungCmndBakFormService = inject(DuongSuTrungCmndBakFormService);
  protected duongSuService = inject(DuongSuService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: DuongSuTrungCmndBakFormGroup = this.duongSuTrungCmndBakFormService.createDuongSuTrungCmndBakFormGroup();

  compareDuongSu = (o1: IDuongSu | null, o2: IDuongSu | null): boolean => this.duongSuService.compareDuongSu(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ duongSuTrungCmndBak }) => {
      this.duongSuTrungCmndBak = duongSuTrungCmndBak;
      if (duongSuTrungCmndBak) {
        this.updateForm(duongSuTrungCmndBak);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const duongSuTrungCmndBak = this.duongSuTrungCmndBakFormService.getDuongSuTrungCmndBak(this.editForm);
    if (duongSuTrungCmndBak.id !== null) {
      this.subscribeToSaveResponse(this.duongSuTrungCmndBakService.update(duongSuTrungCmndBak));
    } else {
      this.subscribeToSaveResponse(this.duongSuTrungCmndBakService.create(duongSuTrungCmndBak));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDuongSuTrungCmndBak>>): void {
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

  protected updateForm(duongSuTrungCmndBak: IDuongSuTrungCmndBak): void {
    this.duongSuTrungCmndBak = duongSuTrungCmndBak;
    this.duongSuTrungCmndBakFormService.resetForm(this.editForm, duongSuTrungCmndBak);

    this.duongSusSharedCollection = this.duongSuService.addDuongSuToCollectionIfMissing<IDuongSu>(
      this.duongSusSharedCollection,
      duongSuTrungCmndBak.duongSu,
    );
  }

  protected loadRelationshipsOptions(): void {
    this.duongSuService
      .query()
      .pipe(map((res: HttpResponse<IDuongSu[]>) => res.body ?? []))
      .pipe(
        map((duongSus: IDuongSu[]) =>
          this.duongSuService.addDuongSuToCollectionIfMissing<IDuongSu>(duongSus, this.duongSuTrungCmndBak?.duongSu),
        ),
      )
      .subscribe((duongSus: IDuongSu[]) => (this.duongSusSharedCollection = duongSus));
  }
}
