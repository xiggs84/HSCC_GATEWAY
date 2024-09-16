import {ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import SharedModule from '../../../shared/shared.module';
import {DuongsuFormComponent} from '../../../form/duongsu-form/duongsu-form.component'
import {TaisanFormComponent} from "../../../form/taisan-form/taisan-form.component";
import {VanbanFormComponent} from "../../../form/vanban-form/vanban-form.component";
@Component({
  selector: 'jhi-muabanchuyennhuong',
  standalone: true,
  imports: [SharedModule, DuongsuFormComponent, TaisanFormComponent, VanbanFormComponent],
  templateUrl: './muabanchuyennhuong.component.html',
  styleUrl: './muabanchuyennhuong.component.scss'
})
export class MuabanchuyennhuongComponent {
  isOutsideOffice: boolean = false;
  @ViewChild('duongSuForm') duongSuForm!: DuongsuFormComponent;
  @ViewChild('taiSanForm') taiSanForm!: TaisanFormComponent;
  @ViewChild('vanBanForm') vanBanForm!: VanbanFormComponent;

  constructor(private cdr: ChangeDetectorRef) {}

  toggleCheckbox() {
    this.isOutsideOffice = !this.isOutsideOffice;
    this.cdr.detectChanges();
  }
}
