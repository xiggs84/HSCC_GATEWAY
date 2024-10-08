import { Component, OnInit, inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ICauHinhMauHopDong } from '../cau-hinh-mau-hop-dong.model';
import { CauHinhMauHopDongService } from '../service/cau-hinh-mau-hop-dong.service';
import { CauHinhMauHopDongFormGroup, CauHinhMauHopDongFormService } from './cau-hinh-mau-hop-dong-form.service';

@Component({
  standalone: true,
  selector: 'jhi-cau-hinh-mau-hop-dong-update',
  templateUrl: './cau-hinh-mau-hop-dong-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class CauHinhMauHopDongUpdateComponent implements OnInit {
  isSaving = false;
  cauHinhMauHopDong: ICauHinhMauHopDong | null = null;

  protected cauHinhMauHopDongService = inject(CauHinhMauHopDongService);
  protected cauHinhMauHopDongFormService = inject(CauHinhMauHopDongFormService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: CauHinhMauHopDongFormGroup = this.cauHinhMauHopDongFormService.createCauHinhMauHopDongFormGroup();

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ cauHinhMauHopDong }) => {
      this.cauHinhMauHopDong = cauHinhMauHopDong;
      if (cauHinhMauHopDong) {
        this.updateForm(cauHinhMauHopDong);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const cauHinhMauHopDong = this.cauHinhMauHopDongFormService.getCauHinhMauHopDong(this.editForm);
    if (cauHinhMauHopDong.id !== null) {
      this.subscribeToSaveResponse(this.cauHinhMauHopDongService.update(cauHinhMauHopDong));
    } else {
      this.subscribeToSaveResponse(this.cauHinhMauHopDongService.create(cauHinhMauHopDong));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICauHinhMauHopDong>>): void {
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

  protected updateForm(cauHinhMauHopDong: ICauHinhMauHopDong): void {
    this.cauHinhMauHopDong = cauHinhMauHopDong;
    this.cauHinhMauHopDongFormService.resetForm(this.editForm, cauHinhMauHopDong);
  }
}
