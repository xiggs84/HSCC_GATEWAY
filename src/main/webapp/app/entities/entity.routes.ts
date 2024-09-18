import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'authority',
    data: { pageTitle: 'gatewayApp.adminAuthority.home.title' },
    loadChildren: () => import('./admin/authority/authority.routes'),
  },
  {
    path: 'danh-muc-can-bo',
    data: { pageTitle: 'gatewayApp.danhMucCanBo.home.title' },
    loadChildren: () => import('./danh-muc-can-bo/danh-muc-can-bo.routes'),
  },
  {
    path: 'can-bo-quyen',
    data: { pageTitle: 'gatewayApp.canBoQuyen.home.title' },
    loadChildren: () => import('./can-bo-quyen/can-bo-quyen.routes'),
  },
  {
    path: 'menu-quyen',
    data: { pageTitle: 'gatewayApp.menuQuyen.home.title' },
    loadChildren: () => import('./menu-quyen/menu-quyen.routes'),
  },
  {
    path: 'quyen',
    data: { pageTitle: 'gatewayApp.quyen.home.title' },
    loadChildren: () => import('./quyen/quyen.routes'),
  },
  {
    path: 'danh-muc-cap-quan-ly',
    data: { pageTitle: 'gatewayApp.danhMucCapQuanLy.home.title' },
    loadChildren: () => import('./danh-muc-cap-quan-ly/danh-muc-cap-quan-ly.routes'),
  },
  {
    path: 'danh-muc-don-vi',
    data: { pageTitle: 'gatewayApp.danhMucDonVi.home.title' },
    loadChildren: () => import('./danh-muc-don-vi/danh-muc-don-vi.routes'),
  },
  {
    path: 'danh-muc-loai-don-vi',
    data: { pageTitle: 'gatewayApp.danhMucLoaiDonVi.home.title' },
    loadChildren: () => import('./danh-muc-loai-don-vi/danh-muc-loai-don-vi.routes'),
  },
  {
    path: 'danh-muc-tinh',
    data: { pageTitle: 'gatewayApp.danhMucTinh.home.title' },
    loadChildren: () => import('./danh-muc-tinh/danh-muc-tinh.routes'),
  },
  {
    path: 'danh-muc-huyen',
    data: { pageTitle: 'gatewayApp.danhMucHuyen.home.title' },
    loadChildren: () => import('./danh-muc-huyen/danh-muc-huyen.routes'),
  },
  {
    path: 'danh-muc-xa',
    data: { pageTitle: 'gatewayApp.danhMucXa.home.title' },
    loadChildren: () => import('./danh-muc-xa/danh-muc-xa.routes'),
  },
  {
    path: 'danh-muc-dau-so-cmnd',
    data: { pageTitle: 'gatewayApp.danhMucDauSoCmnd.home.title' },
    loadChildren: () => import('./danh-muc-dau-so-cmnd/danh-muc-dau-so-cmnd.routes'),
  },
  {
    path: 'don-vi-scan-qr',
    data: { pageTitle: 'gatewayApp.donViScanQr.home.title' },
    loadChildren: () => import('./don-vi-scan-qr/don-vi-scan-qr.routes'),
  },
  {
    path: 'dm-tinh-tmp',
    data: { pageTitle: 'gatewayApp.dmTinhTmp.home.title' },
    loadChildren: () => import('./dm-tinh-tmp/dm-tinh-tmp.routes'),
  },
  {
    path: 'dm-huyen-tmp',
    data: { pageTitle: 'gatewayApp.dmHuyenTmp.home.title' },
    loadChildren: () => import('./dm-huyen-tmp/dm-huyen-tmp.routes'),
  },
  {
    path: 'dm-xa-tmp',
    data: { pageTitle: 'gatewayApp.dmXaTmp.home.title' },
    loadChildren: () => import('./dm-xa-tmp/dm-xa-tmp.routes'),
  },
  {
    path: 'danh-muc-quoc-gia',
    data: { pageTitle: 'gatewayApp.danhMucQuocGia.home.title' },
    loadChildren: () => import('./danh-muc-quoc-gia/danh-muc-quoc-gia.routes'),
  },
  {
    path: 'noi-cap-gttt',
    data: { pageTitle: 'gatewayApp.noiCapGttt.home.title' },
    loadChildren: () => import('./noi-cap-gttt/noi-cap-gttt.routes'),
  },
  {
    path: 'dm-noi-cap-gpdkx',
    data: { pageTitle: 'gatewayApp.dmNoiCapGpdkx.home.title' },
    loadChildren: () => import('./dm-noi-cap-gpdkx/dm-noi-cap-gpdkx.routes'),
  },
  {
    path: 'danh-muc-loai-giay-to-chung-thuc',
    data: { pageTitle: 'gatewayApp.danhMucLoaiGiayToChungThuc.home.title' },
    loadChildren: () => import('./danh-muc-loai-giay-to-chung-thuc/danh-muc-loai-giay-to-chung-thuc.routes'),
  },
  {
    path: 'chung-thuc',
    data: { pageTitle: 'gatewayApp.chungThuc.home.title' },
    loadChildren: () => import('./chung-thuc/chung-thuc.routes'),
  },
  {
    path: 'cau-hinh-mau-chung-thuc',
    data: { pageTitle: 'gatewayApp.cauHinhMauChungThuc.home.title' },
    loadChildren: () => import('./cau-hinh-mau-chung-thuc/cau-hinh-mau-chung-thuc.routes'),
  },
  {
    path: 'danh-sach-chung-thuc',
    data: { pageTitle: 'gatewayApp.danhSachChungThuc.home.title' },
    loadChildren: () => import('./danh-sach-chung-thuc/danh-sach-chung-thuc.routes'),
  },
  {
    path: 'so-cong-chung',
    data: { pageTitle: 'gatewayApp.soCongChung.home.title' },
    loadChildren: () => import('./so-cong-chung/so-cong-chung.routes'),
  },
  {
    path: 'so-cong-chung-temp',
    data: { pageTitle: 'gatewayApp.soCongChungTemp.home.title' },
    loadChildren: () => import('./so-cong-chung-temp/so-cong-chung-temp.routes'),
  },
  {
    path: 'danh-muc-loai-so-cong-chung',
    data: { pageTitle: 'gatewayApp.danhMucLoaiSoCongChung.home.title' },
    loadChildren: () => import('./danh-muc-loai-so-cong-chung/danh-muc-loai-so-cong-chung.routes'),
  },
  {
    path: 'tinh-trang-duong-su',
    data: { pageTitle: 'gatewayApp.tinhTrangDuongSu.home.title' },
    loadChildren: () => import('./tinh-trang-duong-su/tinh-trang-duong-su.routes'),
  },
  {
    path: 'cau-hinh-thong-tin-duong-su',
    data: { pageTitle: 'gatewayApp.cauHinhThongTinDuongSu.home.title' },
    loadChildren: () => import('./cau-hinh-thong-tin-duong-su/cau-hinh-thong-tin-duong-su.routes'),
  },
  {
    path: 'danh-muc-loai-duong-su',
    data: { pageTitle: 'gatewayApp.danhMucLoaiDuongSu.home.title' },
    loadChildren: () => import('./danh-muc-loai-duong-su/danh-muc-loai-duong-su.routes'),
  },
  {
    path: 'quan-he-duong-su',
    data: { pageTitle: 'gatewayApp.quanHeDuongSu.home.title' },
    loadChildren: () => import('./quan-he-duong-su/quan-he-duong-su.routes'),
  },
  {
    path: 'duong-su-trung-cmnd',
    data: { pageTitle: 'gatewayApp.duongSuTrungCmnd.home.title' },
    loadChildren: () => import('./duong-su-trung-cmnd/duong-su-trung-cmnd.routes'),
  },
  {
    path: 'duong-su-trung-cmnd-bak',
    data: { pageTitle: 'gatewayApp.duongSuTrungCmndBak.home.title' },
    loadChildren: () => import('./duong-su-trung-cmnd-bak/duong-su-trung-cmnd-bak.routes'),
  },
  {
    path: 'danh-sach-duong-su',
    data: { pageTitle: 'gatewayApp.danhSachDuongSu.home.title' },
    loadChildren: () => import('./danh-sach-duong-su/danh-sach-duong-su.routes'),
  },
  {
    path: 'dm-duong-su',
    data: { pageTitle: 'gatewayApp.dmDuongSu.home.title' },
    loadChildren: () => import('./dm-duong-su/dm-duong-su.routes'),
  },
  {
    path: 'quan-he-nhan-than',
    data: { pageTitle: 'gatewayApp.quanHeNhanThan.home.title' },
    loadChildren: () => import('./quan-he-nhan-than/quan-he-nhan-than.routes'),
  },
  {
    path: 'danh-muc-tinh-trang-hon-nhan',
    data: { pageTitle: 'gatewayApp.danhMucTinhTrangHonNhan.home.title' },
    loadChildren: () => import('./danh-muc-tinh-trang-hon-nhan/danh-muc-tinh-trang-hon-nhan.routes'),
  },
  {
    path: 'quan-he-master',
    data: { pageTitle: 'gatewayApp.quanHeMaster.home.title' },
    loadChildren: () => import('./quan-he-master/quan-he-master.routes'),
  },
  {
    path: 'cau-hinh-hoa-don-dien-tu',
    data: { pageTitle: 'gatewayApp.cauHinhHoaDonDienTu.home.title' },
    loadChildren: () => import('./cau-hinh-hoa-don-dien-tu/cau-hinh-hoa-don-dien-tu.routes'),
  },
  {
    path: 'log-hoa-don-dien-tu',
    data: { pageTitle: 'gatewayApp.logHoaDonDienTu.home.title' },
    loadChildren: () => import('./log-hoa-don-dien-tu/log-hoa-don-dien-tu.routes'),
  },
  {
    path: 'cau-hinh-hop-dong',
    data: { pageTitle: 'gatewayApp.cauHinhHopDong.home.title' },
    loadChildren: () => import('./cau-hinh-hop-dong/cau-hinh-hop-dong.routes'),
  },
  {
    path: 'loai-hop-dong-cong-chung',
    data: { pageTitle: 'gatewayApp.loaiHopDongCongChung.home.title' },
    loadChildren: () => import('./loai-hop-dong-cong-chung/loai-hop-dong-cong-chung.routes'),
  },
  {
    path: 'hop-dong-cong-chung',
    data: { pageTitle: 'gatewayApp.hopDongCongChung.home.title' },
    loadChildren: () => import('./hop-dong-cong-chung/hop-dong-cong-chung.routes'),
  },
  {
    path: 'danh-muc-loai-hop-dong',
    data: { pageTitle: 'gatewayApp.danhMucLoaiHopDong.home.title' },
    loadChildren: () => import('./danh-muc-loai-hop-dong/danh-muc-loai-hop-dong.routes'),
  },
  {
    path: 'danh-muc-nhom-hop-dong',
    data: { pageTitle: 'gatewayApp.danhMucNhomHopDong.home.title' },
    loadChildren: () => import('./danh-muc-nhom-hop-dong/danh-muc-nhom-hop-dong.routes'),
  },
  {
    path: 'phan-loai-hop-dong',
    data: { pageTitle: 'gatewayApp.phanLoaiHopDong.home.title' },
    loadChildren: () => import('./phan-loai-hop-dong/phan-loai-hop-dong.routes'),
  },
  {
    path: 'cau-hinh-mau-hop-dong',
    data: { pageTitle: 'gatewayApp.cauHinhMauHopDong.home.title' },
    loadChildren: () => import('./cau-hinh-mau-hop-dong/cau-hinh-mau-hop-dong.routes'),
  },
  {
    path: 'thong-tin-chung-hop-dong',
    data: { pageTitle: 'gatewayApp.thongTinChungHopDong.home.title' },
    loadChildren: () => import('./thong-tin-chung-hop-dong/thong-tin-chung-hop-dong.routes'),
  },
  {
    path: 'danh-sach-hop-dong',
    data: { pageTitle: 'gatewayApp.danhSachHopDong.home.title' },
    loadChildren: () => import('./danh-sach-hop-dong/danh-sach-hop-dong.routes'),
  },
  {
    path: 'dm-hop-dong',
    data: { pageTitle: 'gatewayApp.dmHopDong.home.title' },
    loadChildren: () => import('./dm-hop-dong/dm-hop-dong.routes'),
  },
  {
    path: 'dm-loai-hd',
    data: { pageTitle: 'gatewayApp.dmLoaiHd.home.title' },
    loadChildren: () => import('./dm-loai-hd/dm-loai-hd.routes'),
  },
  {
    path: 'danh-muc-vai-tro',
    data: { pageTitle: 'gatewayApp.danhMucVaiTro.home.title' },
    loadChildren: () => import('./danh-muc-vai-tro/danh-muc-vai-tro.routes'),
  },
  {
    path: 'log-dang-nhap',
    data: { pageTitle: 'gatewayApp.logDangNhap.home.title' },
    loadChildren: () => import('./log-dang-nhap/log-dang-nhap.routes'),
  },
  {
    path: 'log-thao-tac',
    data: { pageTitle: 'gatewayApp.logThaoTac.home.title' },
    loadChildren: () => import('./log-thao-tac/log-thao-tac.routes'),
  },
  {
    path: 'log-download-file-drive',
    data: { pageTitle: 'gatewayApp.logDownloadFileDrive.home.title' },
    loadChildren: () => import('./log-download-file-drive/log-download-file-drive.routes'),
  },
  {
    path: 'log-search-ds-ts',
    data: { pageTitle: 'gatewayApp.logSearchDsTs.home.title' },
    loadChildren: () => import('./log-search-ds-ts/log-search-ds-ts.routes'),
  },
  {
    path: 'log-lien-thong-mot-cua',
    data: { pageTitle: 'gatewayApp.logLienThongMotCua.home.title' },
    loadChildren: () => import('./log-lien-thong-mot-cua/log-lien-thong-mot-cua.routes'),
  },
  {
    path: 'lich-su-giao-dich',
    data: { pageTitle: 'gatewayApp.lichSuGiaoDich.home.title' },
    loadChildren: () => import('./lich-su-giao-dich/lich-su-giao-dich.routes'),
  },
  {
    path: 'dm-tai-san',
    data: { pageTitle: 'gatewayApp.dmTaiSan.home.title' },
    loadChildren: () => import('./dm-tai-san/dm-tai-san.routes'),
  },
  {
    path: 'danh-sach-tai-san',
    data: { pageTitle: 'gatewayApp.danhSachTaiSan.home.title' },
    loadChildren: () => import('./danh-sach-tai-san/danh-sach-tai-san.routes'),
  },
  {
    path: 'tai-san-dat-nha',
    data: { pageTitle: 'gatewayApp.taiSanDatNha.home.title' },
    loadChildren: () => import('./tai-san-dat-nha/tai-san-dat-nha.routes'),
  },
  {
    path: 'thua-tach',
    data: { pageTitle: 'gatewayApp.thuaTach.home.title' },
    loadChildren: () => import('./thua-tach/thua-tach.routes'),
  },
  {
    path: 'taisan-sai-dgc',
    data: { pageTitle: 'gatewayApp.taisanSaiDgc.home.title' },
    loadChildren: () => import('./taisan-sai-dgc/taisan-sai-dgc.routes'),
  },
  {
    path: 'tai-san-dgc',
    data: { pageTitle: 'gatewayApp.taiSanDgc.home.title' },
    loadChildren: () => import('./tai-san-dgc/tai-san-dgc.routes'),
  },
  {
    path: 'cau-hinh-thong-tin-loai-tai-san',
    data: { pageTitle: 'gatewayApp.cauHinhThongTinLoaiTaiSan.home.title' },
    loadChildren: () => import('./cau-hinh-thong-tin-loai-tai-san/cau-hinh-thong-tin-loai-tai-san.routes'),
  },
  {
    path: 'tai-san',
    data: { pageTitle: 'gatewayApp.taiSan.home.title' },
    loadChildren: () => import('./tai-san/tai-san.routes'),
  },
  {
    path: 'taisannhadatid',
    data: { pageTitle: 'gatewayApp.taisannhadatid.home.title' },
    loadChildren: () => import('./taisannhadatid/taisannhadatid.routes'),
  },
  {
    path: 'taisan-sai-qsdd-dgc',
    data: { pageTitle: 'gatewayApp.taisanSaiQsddDgc.home.title' },
    loadChildren: () => import('./taisan-sai-qsdd-dgc/taisan-sai-qsdd-dgc.routes'),
  },
  {
    path: 'tai-san-duong-su',
    data: { pageTitle: 'gatewayApp.taiSanDuongSu.home.title' },
    loadChildren: () => import('./tai-san-duong-su/tai-san-duong-su.routes'),
  },
  {
    path: 'tinh-trang-tai-san',
    data: { pageTitle: 'gatewayApp.tinhTrangTaiSan.home.title' },
    loadChildren: () => import('./tinh-trang-tai-san/tinh-trang-tai-san.routes'),
  },
  {
    path: 'van-ban',
    data: { pageTitle: 'gatewayApp.vanBan.home.title' },
    loadChildren: () => import('./van-ban/van-ban.routes'),
  },
  {
    path: 'danh-muc-loai-van-ban',
    data: { pageTitle: 'gatewayApp.danhMucLoaiVanBan.home.title' },
    loadChildren: () => import('./danh-muc-loai-van-ban/danh-muc-loai-van-ban.routes'),
  },
  {
    path: 'danh-muc-tu-viet-tat',
    data: { pageTitle: 'gatewayApp.danhMucTuVietTat.home.title' },
    loadChildren: () => import('./danh-muc-tu-viet-tat/danh-muc-tu-viet-tat.routes'),
  },
  {
    path: 'duong-su',
    data: { pageTitle: 'gatewayApp.duongSu.home.title' },
    loadChildren: () => import('./duong-su/duong-su.routes'),
  },
  {
    path: 'cap-quan-ly',
    data: { pageTitle: 'gatewayApp.capQuanLy.home.title' },
    loadChildren: () => import('./cap-quan-ly/cap-quan-ly.routes'),
  },
  {
    path: 'loai-don-vi',
    data: { pageTitle: 'gatewayApp.loaiDonVi.home.title' },
    loadChildren: () => import('./loai-don-vi/loai-don-vi.routes'),
  },
  {
    path: 'nhiem-vu',
    data: { pageTitle: 'gatewayApp.nhiemVu.home.title' },
    loadChildren: () => import('./nhiem-vu/nhiem-vu.routes'),
  },
  {
    path: 'chi-tiet-ngan-chan',
    data: { pageTitle: 'gatewayApp.chiTietNganChan.home.title' },
    loadChildren: () => import('./chi-tiet-ngan-chan/chi-tiet-ngan-chan.routes'),
  },
  {
    path: 'loai-duong-su',
    data: { pageTitle: 'gatewayApp.loaiDuongSu.home.title' },
    loadChildren: () => import('./loai-duong-su/loai-duong-su.routes'),
  },
  {
    path: 'loai-giay-to',
    data: { pageTitle: 'gatewayApp.loaiGiayTo.home.title' },
    loadChildren: () => import('./loai-giay-to/loai-giay-to.routes'),
  },
  /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
];

export default routes;
