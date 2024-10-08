package vn.vnpt.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import vn.vnpt.web.rest.TestUtil;

class ThongTinCapNhatTaiSanDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(ThongTinCapNhatTaiSanDTO.class);
        ThongTinCapNhatTaiSanDTO thongTinCapNhatTaiSanDTO1 = new ThongTinCapNhatTaiSanDTO();
        thongTinCapNhatTaiSanDTO1.setIdCapNhat(1L);
        ThongTinCapNhatTaiSanDTO thongTinCapNhatTaiSanDTO2 = new ThongTinCapNhatTaiSanDTO();
        assertThat(thongTinCapNhatTaiSanDTO1).isNotEqualTo(thongTinCapNhatTaiSanDTO2);
        thongTinCapNhatTaiSanDTO2.setIdCapNhat(thongTinCapNhatTaiSanDTO1.getIdCapNhat());
        assertThat(thongTinCapNhatTaiSanDTO1).isEqualTo(thongTinCapNhatTaiSanDTO2);
        thongTinCapNhatTaiSanDTO2.setIdCapNhat(2L);
        assertThat(thongTinCapNhatTaiSanDTO1).isNotEqualTo(thongTinCapNhatTaiSanDTO2);
        thongTinCapNhatTaiSanDTO1.setIdCapNhat(null);
        assertThat(thongTinCapNhatTaiSanDTO1).isNotEqualTo(thongTinCapNhatTaiSanDTO2);
    }
}
