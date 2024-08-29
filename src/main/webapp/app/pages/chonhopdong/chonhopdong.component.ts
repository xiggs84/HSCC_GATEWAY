import { Component } from '@angular/core';
import {NgForOf} from "@angular/common";
import SharedModule from '../../shared/shared.module';
import { Router } from '@angular/router';

@Component({
  selector: 'jhi-chonhopdong',
  standalone: true,
  imports: [
    NgForOf,
    SharedModule
  ],
  templateUrl: './chonhopdong.component.html',
  styleUrl: './chonhopdong.component.scss'
})
export class ChonhopdongComponent {
  contractTypes = [
    { name: 'Mua bán, chuyển nhượng', group: 'Hợp đồng chuyển nhượng quyền sở hữu', route: 'muabanchuyennhuong' },
    { name: 'Tặng cho', group: 'Hợp đồng chuyển nhượng quyền sở hữu', route: '' },
    { name: 'Thuê', group: 'Hợp đồng thuê', route: '' },
    { name: 'Thế chấp', group: 'Hợp đồng bảo đảm', route: '' },
    { name: 'Ủy quyền', group: 'Hợp đồng ủy quyền', route: '' },
    { name: 'Tài sản vợ chồng', group: 'Hợp đồng hôn nhân và gia đình', route: '' },
    { name: 'Di chúc', group: 'Hợp đồng thừa kế', route: '' },
    { name: 'Góp vốn',  group: 'Hợp đồng kinh tế', route: '' },
    { name: 'Vay', group: 'Hợp đồng tín dụng', route: '' },
    { name: 'Thừa kế', group: 'Hợp đồng thừa kế', route: '' },
    { name: 'Khác', group: 'Hợp đồng khác', route: '' },
    { name: 'Lợi chứng, chứng thực', group: 'Hợp đồng chứng thực', route: '' },
    { name: 'Lợi chứng bản dịch', group: 'Hợp đồng chứng thực', route: '' },
    { name: 'Chuyển đổi, trao đổi', group: 'Hợp đồng chuyển đổi', route: '' }
  ];

  constructor(private router: Router) {}

  onSelectContract(type: { name: string; group: string; route: string }) {
    this.router.navigate([type.route]);
  }
}

