import { Component, OnInit, inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ICauHinhMauChungThuc } from '../cau-hinh-mau-chung-thuc.model';
import { CauHinhMauChungThucService } from '../service/cau-hinh-mau-chung-thuc.service';
import { CauHinhMauChungThucFormGroup, CauHinhMauChungThucFormService } from './cau-hinh-mau-chung-thuc-form.service';

@Component({
  standalone: true,
  selector: 'jhi-cau-hinh-mau-chung-thuc-update',
  templateUrl: './cau-hinh-mau-chung-thuc-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class CauHinhMauChungThucUpdateComponent implements OnInit {
  isSaving = false;
  cauHinhMauChungThuc: ICauHinhMauChungThuc | null = null;

  protected cauHinhMauChungThucService = inject(CauHinhMauChungThucService);
  protected cauHinhMauChungThucFormService = inject(CauHinhMauChungThucFormService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: CauHinhMauChungThucFormGroup = this.cauHinhMauChungThucFormService.createCauHinhMauChungThucFormGroup();

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ cauHinhMauChungThuc }) => {
      this.cauHinhMauChungThuc = cauHinhMauChungThuc;
      if (cauHinhMauChungThuc) {
        this.updateForm(cauHinhMauChungThuc);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const cauHinhMauChungThuc = this.cauHinhMauChungThucFormService.getCauHinhMauChungThuc(this.editForm);
    if (cauHinhMauChungThuc.id !== null) {
      this.subscribeToSaveResponse(this.cauHinhMauChungThucService.update(cauHinhMauChungThuc));
    } else {
      this.subscribeToSaveResponse(this.cauHinhMauChungThucService.create(cauHinhMauChungThuc));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICauHinhMauChungThuc>>): void {
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

  protected updateForm(cauHinhMauChungThuc: ICauHinhMauChungThuc): void {
    this.cauHinhMauChungThuc = cauHinhMauChungThuc;
    this.cauHinhMauChungThucFormService.resetForm(this.editForm, cauHinhMauChungThuc);
  }
}
