import { Component, inject, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IDonViScanQr } from '../don-vi-scan-qr.model';
import { DonViScanQrService } from '../service/don-vi-scan-qr.service';
import { DonViScanQrFormService, DonViScanQrFormGroup } from './don-vi-scan-qr-form.service';

@Component({
  standalone: true,
  selector: 'jhi-don-vi-scan-qr-update',
  templateUrl: './don-vi-scan-qr-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class DonViScanQrUpdateComponent implements OnInit {
  isSaving = false;
  donViScanQr: IDonViScanQr | null = null;

  protected donViScanQrService = inject(DonViScanQrService);
  protected donViScanQrFormService = inject(DonViScanQrFormService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: DonViScanQrFormGroup = this.donViScanQrFormService.createDonViScanQrFormGroup();

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ donViScanQr }) => {
      this.donViScanQr = donViScanQr;
      if (donViScanQr) {
        this.updateForm(donViScanQr);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const donViScanQr = this.donViScanQrFormService.getDonViScanQr(this.editForm);
    if (donViScanQr.id !== null) {
      this.subscribeToSaveResponse(this.donViScanQrService.update(donViScanQr));
    } else {
      this.subscribeToSaveResponse(this.donViScanQrService.create(donViScanQr));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDonViScanQr>>): void {
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

  protected updateForm(donViScanQr: IDonViScanQr): void {
    this.donViScanQr = donViScanQr;
    this.donViScanQrFormService.resetForm(this.editForm, donViScanQr);
  }
}
