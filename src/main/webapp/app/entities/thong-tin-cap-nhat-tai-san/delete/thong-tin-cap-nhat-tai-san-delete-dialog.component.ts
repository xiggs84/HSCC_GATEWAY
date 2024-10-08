import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IThongTinCapNhatTaiSan } from '../thong-tin-cap-nhat-tai-san.model';
import { ThongTinCapNhatTaiSanService } from '../service/thong-tin-cap-nhat-tai-san.service';

@Component({
  standalone: true,
  templateUrl: './thong-tin-cap-nhat-tai-san-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class ThongTinCapNhatTaiSanDeleteDialogComponent {
  thongTinCapNhatTaiSan?: IThongTinCapNhatTaiSan;

  protected thongTinCapNhatTaiSanService = inject(ThongTinCapNhatTaiSanService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.thongTinCapNhatTaiSanService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
