package vn.vnpt.service.dto;

import jakarta.persistence.Lob;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

/**
 * A DTO for the {@link vn.vnpt.domain.ThongTinCapNhatTaiSan} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class ThongTinCapNhatTaiSanDTO implements Serializable {

    private Long idCapNhat;

    private String tenTaiSan;

    @Lob
    private String thongTinTaiSan;

    private LocalDate ngayCapNhat;

    private TaiSanDTO taiSan;

    private DanhMucLoaiTaiSanDTO danhMucLoaiTaiSan;

    public Long getIdCapNhat() {
        return idCapNhat;
    }

    public void setIdCapNhat(Long idCapNhat) {
        this.idCapNhat = idCapNhat;
    }

    public String getTenTaiSan() {
        return tenTaiSan;
    }

    public void setTenTaiSan(String tenTaiSan) {
        this.tenTaiSan = tenTaiSan;
    }

    public String getThongTinTaiSan() {
        return thongTinTaiSan;
    }

    public void setThongTinTaiSan(String thongTinTaiSan) {
        this.thongTinTaiSan = thongTinTaiSan;
    }

    public LocalDate getNgayCapNhat() {
        return ngayCapNhat;
    }

    public void setNgayCapNhat(LocalDate ngayCapNhat) {
        this.ngayCapNhat = ngayCapNhat;
    }

    public TaiSanDTO getTaiSan() {
        return taiSan;
    }

    public void setTaiSan(TaiSanDTO taiSan) {
        this.taiSan = taiSan;
    }

    public DanhMucLoaiTaiSanDTO getDanhMucLoaiTaiSan() {
        return danhMucLoaiTaiSan;
    }

    public void setDanhMucLoaiTaiSan(DanhMucLoaiTaiSanDTO danhMucLoaiTaiSan) {
        this.danhMucLoaiTaiSan = danhMucLoaiTaiSan;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ThongTinCapNhatTaiSanDTO)) {
            return false;
        }

        ThongTinCapNhatTaiSanDTO thongTinCapNhatTaiSanDTO = (ThongTinCapNhatTaiSanDTO) o;
        if (this.idCapNhat == null) {
            return false;
        }
        return Objects.equals(this.idCapNhat, thongTinCapNhatTaiSanDTO.idCapNhat);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.idCapNhat);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ThongTinCapNhatTaiSanDTO{" +
            "idCapNhat=" + getIdCapNhat() +
            ", tenTaiSan='" + getTenTaiSan() + "'" +
            ", thongTinTaiSan='" + getThongTinTaiSan() + "'" +
            ", ngayCapNhat='" + getNgayCapNhat() + "'" +
            ", taiSan=" + getTaiSan() +
            ", danhMucLoaiTaiSan=" + getDanhMucLoaiTaiSan() +
            "}";
    }
}
