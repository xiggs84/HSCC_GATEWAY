package vn.vnpt.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicLong;

public class DanhMucCanBoTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    public static DanhMucCanBo getDanhMucCanBoSample1() {
        return new DanhMucCanBo()
            .idCanBo(1L)
            .tenCanBo("tenCanBo1")
            .diaChi("diaChi1")
            .email("email1")
            .soDienThoai("soDienThoai1")
            .soGiayToTuyThan("soGiayToTuyThan1")
            .idDonVi(1L)
            .tenDangNhap("tenDangNhap1")
            .matKhau("matKhau1")
            .trangThai(1L)
            .clientId("clientId1")
            .clientSecret("clientSecret1")
            .usernameKyso("usernameKyso1")
            .passwordKyso("passwordKyso1")
            .userLogin("userLogin1");
    }

    public static DanhMucCanBo getDanhMucCanBoSample2() {
        return new DanhMucCanBo()
            .idCanBo(2L)
            .tenCanBo("tenCanBo2")
            .diaChi("diaChi2")
            .email("email2")
            .soDienThoai("soDienThoai2")
            .soGiayToTuyThan("soGiayToTuyThan2")
            .idDonVi(2L)
            .tenDangNhap("tenDangNhap2")
            .matKhau("matKhau2")
            .trangThai(2L)
            .clientId("clientId2")
            .clientSecret("clientSecret2")
            .usernameKyso("usernameKyso2")
            .passwordKyso("passwordKyso2")
            .userLogin("userLogin2");
    }

    public static DanhMucCanBo getDanhMucCanBoRandomSampleGenerator() {
        return new DanhMucCanBo()
            .idCanBo(longCount.incrementAndGet())
            .tenCanBo(UUID.randomUUID().toString())
            .diaChi(UUID.randomUUID().toString())
            .email(UUID.randomUUID().toString())
            .soDienThoai(UUID.randomUUID().toString())
            .soGiayToTuyThan(UUID.randomUUID().toString())
            .idDonVi(longCount.incrementAndGet())
            .tenDangNhap(UUID.randomUUID().toString())
            .matKhau(UUID.randomUUID().toString())
            .trangThai(longCount.incrementAndGet())
            .clientId(UUID.randomUUID().toString())
            .clientSecret(UUID.randomUUID().toString())
            .usernameKyso(UUID.randomUUID().toString())
            .passwordKyso(UUID.randomUUID().toString())
            .userLogin(UUID.randomUUID().toString());
    }
}
