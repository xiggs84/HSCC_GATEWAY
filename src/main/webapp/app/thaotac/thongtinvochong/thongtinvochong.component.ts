import {Component, EventEmitter, Input, Output} from '@angular/core';
import SharedModule from "../../shared/shared.module";
@Component({
  selector: 'jhi-thongtinvochong',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './thongtinvochong.component.html',
  styleUrl: './thongtinvochong.component.scss'
})
export class ThongtinvochongComponent {
  @Input() isVisible!: boolean;
  @Output() nzOnCancel = new EventEmitter<unknown>();



  handleCancel(): void {
    this.isVisible = false;
    this.nzOnCancel.emit();
  }
}
