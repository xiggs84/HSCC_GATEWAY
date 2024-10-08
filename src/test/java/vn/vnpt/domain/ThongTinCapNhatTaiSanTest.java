package vn.vnpt.domain;

import static org.assertj.core.api.Assertions.assertThat;
import static vn.vnpt.domain.DanhMucLoaiTaiSanTestSamples.*;
import static vn.vnpt.domain.TaiSanTestSamples.*;
import static vn.vnpt.domain.ThongTinCapNhatTaiSanTestSamples.*;

import org.junit.jupiter.api.Test;
import vn.vnpt.web.rest.TestUtil;

class ThongTinCapNhatTaiSanTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ThongTinCapNhatTaiSan.class);
        ThongTinCapNhatTaiSan thongTinCapNhatTaiSan1 = getThongTinCapNhatTaiSanSample1();
        ThongTinCapNhatTaiSan thongTinCapNhatTaiSan2 = new ThongTinCapNhatTaiSan();
        assertThat(thongTinCapNhatTaiSan1).isNotEqualTo(thongTinCapNhatTaiSan2);

        thongTinCapNhatTaiSan2.setIdCapNhat(thongTinCapNhatTaiSan1.getIdCapNhat());
        assertThat(thongTinCapNhatTaiSan1).isEqualTo(thongTinCapNhatTaiSan2);

        thongTinCapNhatTaiSan2 = getThongTinCapNhatTaiSanSample2();
        assertThat(thongTinCapNhatTaiSan1).isNotEqualTo(thongTinCapNhatTaiSan2);
    }

    @Test
    void taiSanTest() {
        ThongTinCapNhatTaiSan thongTinCapNhatTaiSan = getThongTinCapNhatTaiSanRandomSampleGenerator();
        TaiSan taiSanBack = getTaiSanRandomSampleGenerator();

        thongTinCapNhatTaiSan.setTaiSan(taiSanBack);
        assertThat(thongTinCapNhatTaiSan.getTaiSan()).isEqualTo(taiSanBack);

        thongTinCapNhatTaiSan.taiSan(null);
        assertThat(thongTinCapNhatTaiSan.getTaiSan()).isNull();
    }

    @Test
    void danhMucLoaiTaiSanTest() {
        ThongTinCapNhatTaiSan thongTinCapNhatTaiSan = getThongTinCapNhatTaiSanRandomSampleGenerator();
        DanhMucLoaiTaiSan danhMucLoaiTaiSanBack = getDanhMucLoaiTaiSanRandomSampleGenerator();

        thongTinCapNhatTaiSan.setDanhMucLoaiTaiSan(danhMucLoaiTaiSanBack);
        assertThat(thongTinCapNhatTaiSan.getDanhMucLoaiTaiSan()).isEqualTo(danhMucLoaiTaiSanBack);

        thongTinCapNhatTaiSan.danhMucLoaiTaiSan(null);
        assertThat(thongTinCapNhatTaiSan.getDanhMucLoaiTaiSan()).isNull();
    }
}
