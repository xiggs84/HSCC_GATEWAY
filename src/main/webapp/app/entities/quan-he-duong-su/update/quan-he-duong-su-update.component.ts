import { Component, OnInit, inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IDuongSu } from 'app/entities/duong-su/duong-su.model';
import { DuongSuService } from 'app/entities/duong-su/service/duong-su.service';
import { IQuanHeDuongSu } from '../quan-he-duong-su.model';
import { QuanHeDuongSuService } from '../service/quan-he-duong-su.service';
import { QuanHeDuongSuFormGroup, QuanHeDuongSuFormService } from './quan-he-duong-su-form.service';

@Component({
  standalone: true,
  selector: 'jhi-quan-he-duong-su-update',
  templateUrl: './quan-he-duong-su-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class QuanHeDuongSuUpdateComponent implements OnInit {
  isSaving = false;
  quanHeDuongSu: IQuanHeDuongSu | null = null;

  duongSusSharedCollection: IDuongSu[] = [];

  protected quanHeDuongSuService = inject(QuanHeDuongSuService);
  protected quanHeDuongSuFormService = inject(QuanHeDuongSuFormService);
  protected duongSuService = inject(DuongSuService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: QuanHeDuongSuFormGroup = this.quanHeDuongSuFormService.createQuanHeDuongSuFormGroup();

  compareDuongSu = (o1: IDuongSu | null, o2: IDuongSu | null): boolean => this.duongSuService.compareDuongSu(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ quanHeDuongSu }) => {
      this.quanHeDuongSu = quanHeDuongSu;
      if (quanHeDuongSu) {
        this.updateForm(quanHeDuongSu);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const quanHeDuongSu = this.quanHeDuongSuFormService.getQuanHeDuongSu(this.editForm);
    if (quanHeDuongSu.idQuanHe !== null) {
      this.subscribeToSaveResponse(this.quanHeDuongSuService.update(quanHeDuongSu));
    } else {
      this.subscribeToSaveResponse(this.quanHeDuongSuService.create(quanHeDuongSu));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IQuanHeDuongSu>>): void {
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

  protected updateForm(quanHeDuongSu: IQuanHeDuongSu): void {
    this.quanHeDuongSu = quanHeDuongSu;
    this.quanHeDuongSuFormService.resetForm(this.editForm, quanHeDuongSu);

    this.duongSusSharedCollection = this.duongSuService.addDuongSuToCollectionIfMissing<IDuongSu>(
      this.duongSusSharedCollection,
      quanHeDuongSu.duongSu,
    );
  }

  protected loadRelationshipsOptions(): void {
    this.duongSuService
      .query()
      .pipe(map((res: HttpResponse<IDuongSu[]>) => res.body ?? []))
      .pipe(
        map((duongSus: IDuongSu[]) => this.duongSuService.addDuongSuToCollectionIfMissing<IDuongSu>(duongSus, this.quanHeDuongSu?.duongSu)),
      )
      .subscribe((duongSus: IDuongSu[]) => (this.duongSusSharedCollection = duongSus));
  }
}
