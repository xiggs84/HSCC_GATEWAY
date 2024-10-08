import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IDanhSachChungThuc } from '../danh-sach-chung-thuc.model';
import { DanhSachChungThucService } from '../service/danh-sach-chung-thuc.service';

@Component({
  standalone: true,
  templateUrl: './danh-sach-chung-thuc-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class DanhSachChungThucDeleteDialogComponent {
  danhSachChungThuc?: IDanhSachChungThuc;

  protected danhSachChungThucService = inject(DanhSachChungThucService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: string): void {
    this.danhSachChungThucService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
