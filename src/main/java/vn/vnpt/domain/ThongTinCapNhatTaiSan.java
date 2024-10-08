package vn.vnpt.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.time.LocalDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

/**
 * A ThongTinCapNhatTaiSan.
 */
@Table("thong_tin_cap_nhat_tai_san")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class ThongTinCapNhatTaiSan implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @Column("id_cap_nhat")
    private Long idCapNhat;

    @Column("ten_tai_san")
    private String tenTaiSan;

    @Column("thong_tin_tai_san")
    private String thongTinTaiSan;

    @Column("ngay_cap_nhat")
    private LocalDate ngayCapNhat;

    @Transient
    @JsonIgnoreProperties(
        value = {
            "thuaTaches",
            "taiSanDuongSus",
            "taiSanDgcs",
            "thongTinCapNhatTaiSans",
            "danhMucLoaiTaiSan",
            "tinhTrangTaiSan",
            "chiTietNganChanTaiSans",
        },
        allowSetters = true
    )
    private TaiSan taiSan;

    @Transient
    @JsonIgnoreProperties(
        value = { "loaiTaiSans", "danhSachTaiSans", "taiSanDgcs", "taiSanDatNhas", "thongTinCapNhatTaiSans" },
        allowSetters = true
    )
    private DanhMucLoaiTaiSan danhMucLoaiTaiSan;

    @Column("tai_san_id_tai_san")
    private Long taiSanId;

    @Column("danh_muc_loai_tai_san_id_loai_ts")
    private Long danhMucLoaiTaiSanId;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getIdCapNhat() {
        return this.idCapNhat;
    }

    public ThongTinCapNhatTaiSan idCapNhat(Long idCapNhat) {
        this.setIdCapNhat(idCapNhat);
        return this;
    }

    public void setIdCapNhat(Long idCapNhat) {
        this.idCapNhat = idCapNhat;
    }

    public String getTenTaiSan() {
        return this.tenTaiSan;
    }

    public ThongTinCapNhatTaiSan tenTaiSan(String tenTaiSan) {
        this.setTenTaiSan(tenTaiSan);
        return this;
    }

    public void setTenTaiSan(String tenTaiSan) {
        this.tenTaiSan = tenTaiSan;
    }

    public String getThongTinTaiSan() {
        return this.thongTinTaiSan;
    }

    public ThongTinCapNhatTaiSan thongTinTaiSan(String thongTinTaiSan) {
        this.setThongTinTaiSan(thongTinTaiSan);
        return this;
    }

    public void setThongTinTaiSan(String thongTinTaiSan) {
        this.thongTinTaiSan = thongTinTaiSan;
    }

    public LocalDate getNgayCapNhat() {
        return this.ngayCapNhat;
    }

    public ThongTinCapNhatTaiSan ngayCapNhat(LocalDate ngayCapNhat) {
        this.setNgayCapNhat(ngayCapNhat);
        return this;
    }

    public void setNgayCapNhat(LocalDate ngayCapNhat) {
        this.ngayCapNhat = ngayCapNhat;
    }

    public TaiSan getTaiSan() {
        return this.taiSan;
    }

    public void setTaiSan(TaiSan taiSan) {
        this.taiSan = taiSan;
        this.taiSanId = taiSan != null ? taiSan.getIdTaiSan() : null;
    }

    public ThongTinCapNhatTaiSan taiSan(TaiSan taiSan) {
        this.setTaiSan(taiSan);
        return this;
    }

    public DanhMucLoaiTaiSan getDanhMucLoaiTaiSan() {
        return this.danhMucLoaiTaiSan;
    }

    public void setDanhMucLoaiTaiSan(DanhMucLoaiTaiSan danhMucLoaiTaiSan) {
        this.danhMucLoaiTaiSan = danhMucLoaiTaiSan;
        this.danhMucLoaiTaiSanId = danhMucLoaiTaiSan != null ? danhMucLoaiTaiSan.getIdLoaiTs() : null;
    }

    public ThongTinCapNhatTaiSan danhMucLoaiTaiSan(DanhMucLoaiTaiSan danhMucLoaiTaiSan) {
        this.setDanhMucLoaiTaiSan(danhMucLoaiTaiSan);
        return this;
    }

    public Long getTaiSanId() {
        return this.taiSanId;
    }

    public void setTaiSanId(Long taiSan) {
        this.taiSanId = taiSan;
    }

    public Long getDanhMucLoaiTaiSanId() {
        return this.danhMucLoaiTaiSanId;
    }

    public void setDanhMucLoaiTaiSanId(Long danhMucLoaiTaiSan) {
        this.danhMucLoaiTaiSanId = danhMucLoaiTaiSan;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ThongTinCapNhatTaiSan)) {
            return false;
        }
        return getIdCapNhat() != null && getIdCapNhat().equals(((ThongTinCapNhatTaiSan) o).getIdCapNhat());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ThongTinCapNhatTaiSan{" +
            "idCapNhat=" + getIdCapNhat() +
            ", tenTaiSan='" + getTenTaiSan() + "'" +
            ", thongTinTaiSan='" + getThongTinTaiSan() + "'" +
            ", ngayCapNhat='" + getNgayCapNhat() + "'" +
            "}";
    }
}
