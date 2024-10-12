import {Component, EventEmitter, Input, Output} from '@angular/core';
import SharedModule from "../../shared/shared.module";
import {IUser} from "../../entities/user/user.model";
import {IDanhMucCanBo, NewDanhMucCanBo} from "../../entities/danh-muc-can-bo/danh-muc-can-bo.model";
import {DanhMucCanBoService} from "../../entities/danh-muc-can-bo/service/danh-muc-can-bo.service";
import {NzNotificationService} from "ng-zorro-antd/notification";
import {NewThongTinCapNhatTaiSan} from "../../entities/thong-tin-cap-nhat-tai-san/thong-tin-cap-nhat-tai-san.model";
import dayjs from "dayjs/esm";
import {UserManagementService} from "../../admin/user-management/service/user-management.service";

@Component({
  selector: 'jhi-canbo-form',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './canbo-form.component.html',
  styleUrl: './canbo-form.component.scss'
})
export class CanboFormComponent {
  isVisible = false;
  isLoading = false;
  @Input() isEditing!: any;
  @Input() modalTitle: string = '';
  @Output() dataUpdated = new EventEmitter<unknown>();

  newItem: IDanhMucCanBo = {
    clientId: undefined,
    clientSecret: undefined,
    diaChi: undefined,
    email: undefined,
    idCanBo: 0,
    idDonVi: undefined,
    matKhau: undefined,
    namSinh: undefined,
    passwordKyso: undefined,
    soGiayToTuyThan: undefined,
    soDienThoai: undefined,
    tenCanBo: undefined,
    tenDangNhap: undefined,
    trangThai: undefined,
    usernameKyso: undefined
  };

  user: any = {
    ho: '',
    ten: '',
    ngaySinh: null,
    soCMND: ''
  }

  constructor(private danhMucCanBoService: DanhMucCanBoService,
              private notification: NzNotificationService,
              private userService: UserManagementService) {
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleOk() {
    const newCanBo = this.createCanBo(this.newItem);
    if (this.isEditing) {
      this.updateCanBo();
    } else {
      this.saveCanBo(newCanBo);
    }
  }

  createCanBo(canBo: IDanhMucCanBo): NewDanhMucCanBo {
    return {
      ...canBo,
      idCanBo: null
    };
  }

  saveCanBo(newCanBo: NewDanhMucCanBo): void {
    this.danhMucCanBoService.createCanBo(newCanBo).subscribe({
      next: (response) => {
        console.log('Tạo cán bộ thành công', response);
        this.notification.success('Thành công', 'Tạo cán bộ thành công');

        this.isVisible = false;
        this.dataUpdated.emit();
      },
      error: (err) => {
        console.error('Lỗi khi tạo cán bộ:', err);
        this.notification.error('Thất bại', 'Lỗi khi tạo cán bộ');
      }
    });
  }

  updateCanBo(): void {
    if (this.newItem.idCanBo !== null || this.newItem.idCanBo !== 0) {
      this.danhMucCanBoService.update(this.newItem).subscribe({
        next: (response) => {
          console.log('Cập nhật cán bộ thành công', response);
          this.notification.success('Thành công', 'Cập nhật cán bộ thành công');
          this.isVisible = false;
          this.dataUpdated.emit();
        },
        error: (err) => {
          console.error('Lỗi khi cập nhật cán bộ', err);
          this.notification.error('Thất bại', 'Lỗi khi cập nhật cán bộ');
        }
      })
    }
  }

  handleCancel(): void {
    this.isVisible = false;
  }
}
