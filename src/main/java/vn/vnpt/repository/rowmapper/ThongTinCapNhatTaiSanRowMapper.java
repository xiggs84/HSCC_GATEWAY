package vn.vnpt.repository.rowmapper;

import io.r2dbc.spi.Row;
import java.time.LocalDate;
import java.util.function.BiFunction;
import org.springframework.stereotype.Service;
import vn.vnpt.domain.ThongTinCapNhatTaiSan;

/**
 * Converter between {@link Row} to {@link ThongTinCapNhatTaiSan}, with proper type conversions.
 */
@Service
public class ThongTinCapNhatTaiSanRowMapper implements BiFunction<Row, String, ThongTinCapNhatTaiSan> {

    private final ColumnConverter converter;

    public ThongTinCapNhatTaiSanRowMapper(ColumnConverter converter) {
        this.converter = converter;
    }

    /**
     * Take a {@link Row} and a column prefix, and extract all the fields.
     * @return the {@link ThongTinCapNhatTaiSan} stored in the database.
     */
    @Override
    public ThongTinCapNhatTaiSan apply(Row row, String prefix) {
        ThongTinCapNhatTaiSan entity = new ThongTinCapNhatTaiSan();
        entity.setIdCapNhat(converter.fromRow(row, prefix + "_id_cap_nhat", Long.class));
        entity.setTenTaiSan(converter.fromRow(row, prefix + "_ten_tai_san", String.class));
        entity.setThongTinTaiSan(converter.fromRow(row, prefix + "_thong_tin_tai_san", String.class));
        entity.setNgayCapNhat(converter.fromRow(row, prefix + "_ngay_cap_nhat", LocalDate.class));
        entity.setTaiSanId(converter.fromRow(row, prefix + "_tai_san_id_tai_san", Long.class));
        entity.setDanhMucLoaiTaiSanId(converter.fromRow(row, prefix + "_danh_muc_loai_tai_san_id_loai_ts", Long.class));
        return entity;
    }
}
