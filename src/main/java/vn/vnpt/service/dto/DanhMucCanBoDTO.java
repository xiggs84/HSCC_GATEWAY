package vn.vnpt.service.dto;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

/**
 * A DTO for the {@link vn.vnpt.domain.DanhMucCanBo} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class DanhMucCanBoDTO implements Serializable {

    private Long idCanBo;

    private String tenCanBo;

    private String diaChi;

    private LocalDate namSinh;

    private String email;

    private String soDienThoai;

    private String soGiayToTuyThan;

    private Long idDonVi;

    private String tenDangNhap;

    private String matKhau;

    private Long trangThai;

    private String clientId;

    private String clientSecret;

    private String usernameKyso;

    private String passwordKyso;

    private String userLogin;

    public Long getIdCanBo() {
        return idCanBo;
    }

    public void setIdCanBo(Long idCanBo) {
        this.idCanBo = idCanBo;
    }

    public String getTenCanBo() {
        return tenCanBo;
    }

    public void setTenCanBo(String tenCanBo) {
        this.tenCanBo = tenCanBo;
    }

    public String getDiaChi() {
        return diaChi;
    }

    public void setDiaChi(String diaChi) {
        this.diaChi = diaChi;
    }

    public LocalDate getNamSinh() {
        return namSinh;
    }

    public void setNamSinh(LocalDate namSinh) {
        this.namSinh = namSinh;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getSoDienThoai() {
        return soDienThoai;
    }

    public void setSoDienThoai(String soDienThoai) {
        this.soDienThoai = soDienThoai;
    }

    public String getSoGiayToTuyThan() {
        return soGiayToTuyThan;
    }

    public void setSoGiayToTuyThan(String soGiayToTuyThan) {
        this.soGiayToTuyThan = soGiayToTuyThan;
    }

    public Long getIdDonVi() {
        return idDonVi;
    }

    public void setIdDonVi(Long idDonVi) {
        this.idDonVi = idDonVi;
    }

    public String getTenDangNhap() {
        return tenDangNhap;
    }

    public void setTenDangNhap(String tenDangNhap) {
        this.tenDangNhap = tenDangNhap;
    }

    public String getMatKhau() {
        return matKhau;
    }

    public void setMatKhau(String matKhau) {
        this.matKhau = matKhau;
    }

    public Long getTrangThai() {
        return trangThai;
    }

    public void setTrangThai(Long trangThai) {
        this.trangThai = trangThai;
    }

    public String getClientId() {
        return clientId;
    }

    public void setClientId(String clientId) {
        this.clientId = clientId;
    }

    public String getClientSecret() {
        return clientSecret;
    }

    public void setClientSecret(String clientSecret) {
        this.clientSecret = clientSecret;
    }

    public String getUsernameKyso() {
        return usernameKyso;
    }

    public void setUsernameKyso(String usernameKyso) {
        this.usernameKyso = usernameKyso;
    }

    public String getPasswordKyso() {
        return passwordKyso;
    }

    public void setPasswordKyso(String passwordKyso) {
        this.passwordKyso = passwordKyso;
    }

    public String getUserLogin() {
        return userLogin;
    }

    public void setUserLogin(String userLogin) {
        this.userLogin = userLogin;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof DanhMucCanBoDTO)) {
            return false;
        }

        DanhMucCanBoDTO danhMucCanBoDTO = (DanhMucCanBoDTO) o;
        if (this.idCanBo == null) {
            return false;
        }
        return Objects.equals(this.idCanBo, danhMucCanBoDTO.idCanBo);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.idCanBo);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "DanhMucCanBoDTO{" +
            "idCanBo=" + getIdCanBo() +
            ", tenCanBo='" + getTenCanBo() + "'" +
            ", diaChi='" + getDiaChi() + "'" +
            ", namSinh='" + getNamSinh() + "'" +
            ", email='" + getEmail() + "'" +
            ", soDienThoai='" + getSoDienThoai() + "'" +
            ", soGiayToTuyThan='" + getSoGiayToTuyThan() + "'" +
            ", idDonVi=" + getIdDonVi() +
            ", tenDangNhap='" + getTenDangNhap() + "'" +
            ", matKhau='" + getMatKhau() + "'" +
            ", trangThai=" + getTrangThai() +
            ", clientId='" + getClientId() + "'" +
            ", clientSecret='" + getClientSecret() + "'" +
            ", usernameKyso='" + getUsernameKyso() + "'" +
            ", passwordKyso='" + getPasswordKyso() + "'" +
            ", userLogin='" + getUserLogin() + "'" +
            "}";
    }
}
