package vn.vnpt.service.mapper;

import static vn.vnpt.domain.ThongTinCapNhatTaiSanAsserts.*;
import static vn.vnpt.domain.ThongTinCapNhatTaiSanTestSamples.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class ThongTinCapNhatTaiSanMapperTest {

    private ThongTinCapNhatTaiSanMapper thongTinCapNhatTaiSanMapper;

    @BeforeEach
    void setUp() {
        thongTinCapNhatTaiSanMapper = new ThongTinCapNhatTaiSanMapperImpl();
    }

    @Test
    void shouldConvertToDtoAndBack() {
        var expected = getThongTinCapNhatTaiSanSample1();
        var actual = thongTinCapNhatTaiSanMapper.toEntity(thongTinCapNhatTaiSanMapper.toDto(expected));
        assertThongTinCapNhatTaiSanAllPropertiesEquals(expected, actual);
    }
}
