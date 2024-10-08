package vn.vnpt.service.mapper;

import org.mapstruct.*;
import vn.vnpt.domain.DanhMucLoaiTaiSan;
import vn.vnpt.domain.TaiSan;
import vn.vnpt.domain.ThongTinCapNhatTaiSan;
import vn.vnpt.service.dto.DanhMucLoaiTaiSanDTO;
import vn.vnpt.service.dto.TaiSanDTO;
import vn.vnpt.service.dto.ThongTinCapNhatTaiSanDTO;

/**
 * Mapper for the entity {@link ThongTinCapNhatTaiSan} and its DTO {@link ThongTinCapNhatTaiSanDTO}.
 */
@Mapper(componentModel = "spring")
public interface ThongTinCapNhatTaiSanMapper extends EntityMapper<ThongTinCapNhatTaiSanDTO, ThongTinCapNhatTaiSan> {
    @Mapping(target = "taiSan", source = "taiSan", qualifiedByName = "taiSanIdTaiSan")
    @Mapping(target = "danhMucLoaiTaiSan", source = "danhMucLoaiTaiSan", qualifiedByName = "danhMucLoaiTaiSanIdLoaiTs")
    ThongTinCapNhatTaiSanDTO toDto(ThongTinCapNhatTaiSan s);

    @Named("taiSanIdTaiSan")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "idTaiSan", source = "idTaiSan")
    TaiSanDTO toDtoTaiSanIdTaiSan(TaiSan taiSan);

    @Named("danhMucLoaiTaiSanIdLoaiTs")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "idLoaiTs", source = "idLoaiTs")
    DanhMucLoaiTaiSanDTO toDtoDanhMucLoaiTaiSanIdLoaiTs(DanhMucLoaiTaiSan danhMucLoaiTaiSan);
}
