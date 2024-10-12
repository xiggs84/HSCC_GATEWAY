package vn.vnpt.repository;

import java.util.ArrayList;
import java.util.List;
import org.springframework.data.relational.core.sql.Column;
import org.springframework.data.relational.core.sql.Expression;
import org.springframework.data.relational.core.sql.Table;

public class DanhMucCanBoSqlHelper {

    public static List<Expression> getColumns(Table table, String columnPrefix) {
        List<Expression> columns = new ArrayList<>();
        columns.add(Column.aliased("id_can_bo", table, columnPrefix + "_id_can_bo"));
        columns.add(Column.aliased("ten_can_bo", table, columnPrefix + "_ten_can_bo"));
        columns.add(Column.aliased("dia_chi", table, columnPrefix + "_dia_chi"));
        columns.add(Column.aliased("nam_sinh", table, columnPrefix + "_nam_sinh"));
        columns.add(Column.aliased("email", table, columnPrefix + "_email"));
        columns.add(Column.aliased("so_dien_thoai", table, columnPrefix + "_so_dien_thoai"));
        columns.add(Column.aliased("so_giay_to_tuy_than", table, columnPrefix + "_so_giay_to_tuy_than"));
        columns.add(Column.aliased("id_don_vi", table, columnPrefix + "_id_don_vi"));
        columns.add(Column.aliased("ten_dang_nhap", table, columnPrefix + "_ten_dang_nhap"));
        columns.add(Column.aliased("mat_khau", table, columnPrefix + "_mat_khau"));
        columns.add(Column.aliased("trang_thai", table, columnPrefix + "_trang_thai"));
        columns.add(Column.aliased("client_id", table, columnPrefix + "_client_id"));
        columns.add(Column.aliased("client_secret", table, columnPrefix + "_client_secret"));
        columns.add(Column.aliased("username_kyso", table, columnPrefix + "_username_kyso"));
        columns.add(Column.aliased("password_kyso", table, columnPrefix + "_password_kyso"));
        columns.add(Column.aliased("user_login", table, columnPrefix + "_user_login"));

        return columns;
    }
}
