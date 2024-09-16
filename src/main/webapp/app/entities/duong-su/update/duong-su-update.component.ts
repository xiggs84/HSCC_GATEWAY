import { Component, OnInit, inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AlertError } from 'app/shared/alert/alert-error.model';
import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';
import { DataUtils, FileLoadError } from 'app/core/util/data-util.service';
import { LoaiDuongSu } from 'app/entities/enumerations/loai-duong-su.model';
import { LoaiGiayTo } from 'app/entities/enumerations/loai-giay-to.model';
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
  loaiDuongSuValues = Object.keys(LoaiDuongSu);
  loaiGiayToValues = Object.keys(LoaiGiayTo);

  protected dataUtils = inject(DataUtils);
  protected eventManager = inject(EventManager);
  protected duongSuService = inject(DuongSuService);
  protected duongSuFormService = inject(DuongSuFormService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: DuongSuFormGroup = this.duongSuFormService.createDuongSuFormGroup();

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ duongSu }) => {
      this.duongSu = duongSu;
      if (duongSu) {
        this.updateForm(duongSu);
      }
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
  }
}
