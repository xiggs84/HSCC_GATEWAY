import { Component, OnInit, inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ITaiSan } from 'app/entities/tai-san/tai-san.model';
import { TaiSanService } from 'app/entities/tai-san/service/tai-san.service';
import { IThuaTach } from '../thua-tach.model';
import { ThuaTachService } from '../service/thua-tach.service';
import { ThuaTachFormGroup, ThuaTachFormService } from './thua-tach-form.service';

@Component({
  standalone: true,
  selector: 'jhi-thua-tach-update',
  templateUrl: './thua-tach-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class ThuaTachUpdateComponent implements OnInit {
  isSaving = false;
  thuaTach: IThuaTach | null = null;

  taiSansSharedCollection: ITaiSan[] = [];

  protected thuaTachService = inject(ThuaTachService);
  protected thuaTachFormService = inject(ThuaTachFormService);
  protected taiSanService = inject(TaiSanService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: ThuaTachFormGroup = this.thuaTachFormService.createThuaTachFormGroup();

  compareTaiSan = (o1: ITaiSan | null, o2: ITaiSan | null): boolean => this.taiSanService.compareTaiSan(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ thuaTach }) => {
      this.thuaTach = thuaTach;
      if (thuaTach) {
        this.updateForm(thuaTach);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const thuaTach = this.thuaTachFormService.getThuaTach(this.editForm);
    if (thuaTach.idThuaTach !== null) {
      this.subscribeToSaveResponse(this.thuaTachService.update(thuaTach));
    } else {
      this.subscribeToSaveResponse(this.thuaTachService.create(thuaTach));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IThuaTach>>): void {
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

  protected updateForm(thuaTach: IThuaTach): void {
    this.thuaTach = thuaTach;
    this.thuaTachFormService.resetForm(this.editForm, thuaTach);

    this.taiSansSharedCollection = this.taiSanService.addTaiSanToCollectionIfMissing<ITaiSan>(
      this.taiSansSharedCollection,
      thuaTach.taiSan,
    );
  }

  protected loadRelationshipsOptions(): void {
    this.taiSanService
      .query()
      .pipe(map((res: HttpResponse<ITaiSan[]>) => res.body ?? []))
      .pipe(map((taiSans: ITaiSan[]) => this.taiSanService.addTaiSanToCollectionIfMissing<ITaiSan>(taiSans, this.thuaTach?.taiSan)))
      .subscribe((taiSans: ITaiSan[]) => (this.taiSansSharedCollection = taiSans));
  }
}
