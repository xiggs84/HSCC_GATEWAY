import {ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import SharedModule from '../../../shared/shared.module';
import {DuongsuFormComponent} from '../../../form/duongsu-form/duongsu-form.component'
@Component({
  selector: 'jhi-muabanchuyennhuong',
  standalone: true,
  imports: [SharedModule, DuongsuFormComponent],
  templateUrl: './muabanchuyennhuong.component.html',
  styleUrl: './muabanchuyennhuong.component.scss'
})
export class MuabanchuyennhuongComponent {
  isOutsideOffice: boolean = false;
  @ViewChild('duongSuForm') duongSuForm!: DuongsuFormComponent;

  constructor(private cdr: ChangeDetectorRef) {}

  toggleCheckbox() {
    this.isOutsideOffice = !this.isOutsideOffice;
    this.cdr.detectChanges();
  }
}
