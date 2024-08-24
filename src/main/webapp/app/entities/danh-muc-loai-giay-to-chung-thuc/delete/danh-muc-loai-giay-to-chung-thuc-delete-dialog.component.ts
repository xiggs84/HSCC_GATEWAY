import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IDanhMucLoaiGiayToChungThuc } from '../danh-muc-loai-giay-to-chung-thuc.model';
import { DanhMucLoaiGiayToChungThucService } from '../service/danh-muc-loai-giay-to-chung-thuc.service';

@Component({
  standalone: true,
  templateUrl: './danh-muc-loai-giay-to-chung-thuc-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class DanhMucLoaiGiayToChungThucDeleteDialogComponent {
  danhMucLoaiGiayToChungThuc?: IDanhMucLoaiGiayToChungThuc;

  protected danhMucLoaiGiayToChungThucService = inject(DanhMucLoaiGiayToChungThucService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.danhMucLoaiGiayToChungThucService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
