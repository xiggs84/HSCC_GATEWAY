package vn.vnpt.repository;

import java.util.ArrayList;
import java.util.List;
import org.springframework.data.relational.core.sql.Column;
import org.springframework.data.relational.core.sql.Expression;
import org.springframework.data.relational.core.sql.Table;

public class ThongTinCapNhatTaiSanSqlHelper {

    public static List<Expression> getColumns(Table table, String columnPrefix) {
        List<Expression> columns = new ArrayList<>();
        columns.add(Column.aliased("id_cap_nhat", table, columnPrefix + "_id_cap_nhat"));
        columns.add(Column.aliased("ten_tai_san", table, columnPrefix + "_ten_tai_san"));
        columns.add(Column.aliased("thong_tin_tai_san", table, columnPrefix + "_thong_tin_tai_san"));
        columns.add(Column.aliased("ngay_cap_nhat", table, columnPrefix + "_ngay_cap_nhat"));

        columns.add(Column.aliased("tai_san_id_tai_san", table, columnPrefix + "_tai_san_id_tai_san"));
        columns.add(Column.aliased("danh_muc_loai_tai_san_id_loai_ts", table, columnPrefix + "_danh_muc_loai_tai_san_id_loai_ts"));
        return columns;
    }
}
