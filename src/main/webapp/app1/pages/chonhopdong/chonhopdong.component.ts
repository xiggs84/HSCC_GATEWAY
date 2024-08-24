import { Component } from '@angular/core';
import {NgForOf} from "@angular/common";
import {NzColDirective, NzRowDirective} from "ng-zorro-antd/grid";
import {NzCardComponent} from "ng-zorro-antd/card";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {NzContentComponent, NzHeaderComponent, NzLayoutComponent} from "ng-zorro-antd/layout";

@Component({
  selector: 'app-chonhopdong',
  standalone: true,
  imports: [
    NgForOf,
    NzColDirective,
    NzCardComponent,
    NzButtonComponent,
    NzRowDirective,
    NzHeaderComponent,
    NzLayoutComponent,
    NzContentComponent
  ],
  templateUrl: './chonhopdong.component.html',
  styleUrl: './chonhopdong.component.scss'
})
export class ChonhopdongComponent {
  contractTypes = [
    { name: 'Mua bán, chuyển nhượng', group: 'Hợp đồng chuyển nhượng quyền sở hữu' },
    { name: 'Tặng cho', group: 'Hợp đồng chuyển nhượng quyền sở hữu' },
    { name: 'Thuê', group: 'Hợp đồng thuê' },
    { name: 'Thế chấp', group: 'Hợp đồng bảo đảm' },
    { name: 'Ủy quyền', group: 'Hợp đồng ủy quyền' },
    { name: 'Tài sản vợ chồng', group: 'Hợp đồng hôn nhân và gia đình' },
    { name: 'Di chúc', group: 'Hợp đồng thừa kế' },
    { name: 'Góp vốn',  group: 'Hợp đồng kinh tế' },
    { name: 'Vay', group: 'Hợp đồng tín dụng' },
    { name: 'Thừa kế', group: 'Hợp đồng thừa kế' },
    { name: 'Khác', group: 'Hợp đồng khác' },
    { name: 'Lợi chứng, chứng thực', group: 'Hợp đồng chứng thực' },
    { name: 'Lợi chứng bản dịch', group: 'Hợp đồng chứng thực' },
    { name: 'Chuyển đổi, trao đổi', group: 'Hợp đồng chuyển đổi' }
  ];

  onSelectContract(type: { name: string; group: string }) {

  }
}

