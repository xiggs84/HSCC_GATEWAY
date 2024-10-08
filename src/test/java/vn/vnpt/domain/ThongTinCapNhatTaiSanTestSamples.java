package vn.vnpt.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicLong;

public class ThongTinCapNhatTaiSanTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    public static ThongTinCapNhatTaiSan getThongTinCapNhatTaiSanSample1() {
        return new ThongTinCapNhatTaiSan().idCapNhat(1L).tenTaiSan("tenTaiSan1");
    }

    public static ThongTinCapNhatTaiSan getThongTinCapNhatTaiSanSample2() {
        return new ThongTinCapNhatTaiSan().idCapNhat(2L).tenTaiSan("tenTaiSan2");
    }

    public static ThongTinCapNhatTaiSan getThongTinCapNhatTaiSanRandomSampleGenerator() {
        return new ThongTinCapNhatTaiSan().idCapNhat(longCount.incrementAndGet()).tenTaiSan(UUID.randomUUID().toString());
    }
}
