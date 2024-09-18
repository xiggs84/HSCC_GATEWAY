import { Component, OnInit, inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AlertError } from 'app/shared/alert/alert-error.model';
import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';
import { DataUtils, FileLoadError } from 'app/core/util/data-util.service';
import { ILoaiDuongSu } from 'app/entities/loai-duong-su/loai-duong-su.model';
import { LoaiDuongSuService } from 'app/entities/loai-duong-su/service/loai-duong-su.service';
import { ILoaiGiayTo } from 'app/entities/loai-giay-to/loai-giay-to.model';
import { LoaiGiayToService } from 'app/entities/loai-giay-to/service/loai-giay-to.service';
import { DuongSuService } from '../service/duong-su.service';
import { IDuongSu } from '../duong-su.model';
import { DuongSuFormGroup, DuongSuFormService } from './duong-su-form.service';

@Component({
  standalone: true,
  selector: 'jhi-duong-su-update',
  templateUrl: './duong-su-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class DuongSuUpdateComponent implements OnInit {
  isSaving = false;
  duongSu: IDuongSu | null = null;

  loaiDuongSusSharedCollection: ILoaiDuongSu[] = [];
  loaiGiayTosSharedCollection: ILoaiGiayTo[] = [];

  protected dataUtils = inject(DataUtils);
  protected eventManager = inject(EventManager);
  protected duongSuService = inject(DuongSuService);
  protected duongSuFormService = inject(DuongSuFormService);
  protected loaiDuongSuService = inject(LoaiDuongSuService);
  protected loaiGiayToService = inject(LoaiGiayToService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: DuongSuFormGroup = this.duongSuFormService.createDuongSuFormGroup();

  compareLoaiDuongSu = (o1: ILoaiDuongSu | null, o2: ILoaiDuongSu | null): boolean => this.loaiDuongSuService.compareLoaiDuongSu(o1, o2);

  compareLoaiGiayTo = (o1: ILoaiGiayTo | null, o2: ILoaiGiayTo | null): boolean => this.loaiGiayToService.compareLoaiGiayTo(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ duongSu }) => {
      this.duongSu = duongSu;
      if (duongSu) {
        this.updateForm(duongSu);
      }

      this.loadRelationshipsOptions();
    });
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(base64String: string, contentType: string | null | undefined): void {
    this.dataUtils.openFile(base64String, contentType);
  }

  setFileData(event: Event, field: string, isImage: boolean): void {
    this.dataUtils.loadFileToForm(event, this.editForm, field, isImage).subscribe({
      error: (err: FileLoadError) =>
        this.eventManager.broadcast(new EventWithContent<AlertError>('gatewayApp.error', { ...err, key: `error.file.${err.key}` })),
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const duongSu = this.duongSuFormService.getDuongSu(this.editForm);
    if (duongSu.idDuongSu !== null) {
      this.subscribeToSaveResponse(this.duongSuService.update(duongSu));
    } else {
      this.subscribeToSaveResponse(this.duongSuService.create(duongSu));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDuongSu>>): void {
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

  protected updateForm(duongSu: IDuongSu): void {
    this.duongSu = duongSu;
    this.duongSuFormService.resetForm(this.editForm, duongSu);

    this.loaiDuongSusSharedCollection = this.loaiDuongSuService.addLoaiDuongSuToCollectionIfMissing<ILoaiDuongSu>(
      this.loaiDuongSusSharedCollection,
      duongSu.loaiDuongSu,
    );
    this.loaiGiayTosSharedCollection = this.loaiGiayToService.addLoaiGiayToToCollectionIfMissing<ILoaiGiayTo>(
      this.loaiGiayTosSharedCollection,
      duongSu.loaiGiayTo,
    );
  }

  protected loadRelationshipsOptions(): void {
    this.loaiDuongSuService
      .query()
      .pipe(map((res: HttpResponse<ILoaiDuongSu[]>) => res.body ?? []))
      .pipe(
        map((loaiDuongSus: ILoaiDuongSu[]) =>
          this.loaiDuongSuService.addLoaiDuongSuToCollectionIfMissing<ILoaiDuongSu>(loaiDuongSus, this.duongSu?.loaiDuongSu),
        ),
      )
      .subscribe((loaiDuongSus: ILoaiDuongSu[]) => (this.loaiDuongSusSharedCollection = loaiDuongSus));

    this.loaiGiayToService
      .query()
      .pipe(map((res: HttpResponse<ILoaiGiayTo[]>) => res.body ?? []))
      .pipe(
        map((loaiGiayTos: ILoaiGiayTo[]) =>
          this.loaiGiayToService.addLoaiGiayToToCollectionIfMissing<ILoaiGiayTo>(loaiGiayTos, this.duongSu?.loaiGiayTo),
        ),
      )
      .subscribe((loaiGiayTos: ILoaiGiayTo[]) => (this.loaiGiayTosSharedCollection = loaiGiayTos));
  }
}
