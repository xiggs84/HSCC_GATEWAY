package vn.vnpt.domain.criteria;

import java.io.Serializable;
import java.util.Objects;
import java.util.Optional;
import org.springdoc.core.annotations.ParameterObject;
import tech.jhipster.service.Criteria;
import tech.jhipster.service.filter.*;

/**
 * Criteria class for the {@link vn.vnpt.domain.ThongTinCapNhatTaiSan} entity. This class is used
 * in {@link vn.vnpt.web.rest.ThongTinCapNhatTaiSanResource} to receive all the possible filtering options from
 * the Http GET request parameters.
 * For example the following could be a valid request:
 * {@code /thong-tin-cap-nhat-tai-sans?id.greaterThan=5&attr1.contains=something&attr2.specified=false}
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
@ParameterObject
@SuppressWarnings("common-java:DuplicatedBlocks")
public class ThongTinCapNhatTaiSanCriteria implements Serializable, Criteria {

    private static final long serialVersionUID = 1L;

    private LongFilter idCapNhat;

    private StringFilter tenTaiSan;

    private LocalDateFilter ngayCapNhat;

    private LongFilter taiSanId;

    private LongFilter danhMucLoaiTaiSanId;

    private Boolean distinct;

    public ThongTinCapNhatTaiSanCriteria() {}

    public ThongTinCapNhatTaiSanCriteria(ThongTinCapNhatTaiSanCriteria other) {
        this.idCapNhat = other.optionalIdCapNhat().map(LongFilter::copy).orElse(null);
        this.tenTaiSan = other.optionalTenTaiSan().map(StringFilter::copy).orElse(null);
        this.ngayCapNhat = other.optionalNgayCapNhat().map(LocalDateFilter::copy).orElse(null);
        this.taiSanId = other.optionalTaiSanId().map(LongFilter::copy).orElse(null);
        this.danhMucLoaiTaiSanId = other.optionalDanhMucLoaiTaiSanId().map(LongFilter::copy).orElse(null);
        this.distinct = other.distinct;
    }

    @Override
    public ThongTinCapNhatTaiSanCriteria copy() {
        return new ThongTinCapNhatTaiSanCriteria(this);
    }

    public LongFilter getIdCapNhat() {
        return idCapNhat;
    }

    public Optional<LongFilter> optionalIdCapNhat() {
        return Optional.ofNullable(idCapNhat);
    }

    public LongFilter idCapNhat() {
        if (idCapNhat == null) {
            setIdCapNhat(new LongFilter());
        }
        return idCapNhat;
    }

    public void setIdCapNhat(LongFilter idCapNhat) {
        this.idCapNhat = idCapNhat;
    }

    public StringFilter getTenTaiSan() {
        return tenTaiSan;
    }

    public Optional<StringFilter> optionalTenTaiSan() {
        return Optional.ofNullable(tenTaiSan);
    }

    public StringFilter tenTaiSan() {
        if (tenTaiSan == null) {
            setTenTaiSan(new StringFilter());
        }
        return tenTaiSan;
    }

    public void setTenTaiSan(StringFilter tenTaiSan) {
        this.tenTaiSan = tenTaiSan;
    }

    public LocalDateFilter getNgayCapNhat() {
        return ngayCapNhat;
    }

    public Optional<LocalDateFilter> optionalNgayCapNhat() {
        return Optional.ofNullable(ngayCapNhat);
    }

    public LocalDateFilter ngayCapNhat() {
        if (ngayCapNhat == null) {
            setNgayCapNhat(new LocalDateFilter());
        }
        return ngayCapNhat;
    }

    public void setNgayCapNhat(LocalDateFilter ngayCapNhat) {
        this.ngayCapNhat = ngayCapNhat;
    }

    public LongFilter getTaiSanId() {
        return taiSanId;
    }

    public Optional<LongFilter> optionalTaiSanId() {
        return Optional.ofNullable(taiSanId);
    }

    public LongFilter taiSanId() {
        if (taiSanId == null) {
            setTaiSanId(new LongFilter());
        }
        return taiSanId;
    }

    public void setTaiSanId(LongFilter taiSanId) {
        this.taiSanId = taiSanId;
    }

    public LongFilter getDanhMucLoaiTaiSanId() {
        return danhMucLoaiTaiSanId;
    }

    public Optional<LongFilter> optionalDanhMucLoaiTaiSanId() {
        return Optional.ofNullable(danhMucLoaiTaiSanId);
    }

    public LongFilter danhMucLoaiTaiSanId() {
        if (danhMucLoaiTaiSanId == null) {
            setDanhMucLoaiTaiSanId(new LongFilter());
        }
        return danhMucLoaiTaiSanId;
    }

    public void setDanhMucLoaiTaiSanId(LongFilter danhMucLoaiTaiSanId) {
        this.danhMucLoaiTaiSanId = danhMucLoaiTaiSanId;
    }

    public Boolean getDistinct() {
        return distinct;
    }

    public Optional<Boolean> optionalDistinct() {
        return Optional.ofNullable(distinct);
    }

    public Boolean distinct() {
        if (distinct == null) {
            setDistinct(true);
        }
        return distinct;
    }

    public void setDistinct(Boolean distinct) {
        this.distinct = distinct;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        final ThongTinCapNhatTaiSanCriteria that = (ThongTinCapNhatTaiSanCriteria) o;
        return (
            Objects.equals(idCapNhat, that.idCapNhat) &&
            Objects.equals(tenTaiSan, that.tenTaiSan) &&
            Objects.equals(ngayCapNhat, that.ngayCapNhat) &&
            Objects.equals(taiSanId, that.taiSanId) &&
            Objects.equals(danhMucLoaiTaiSanId, that.danhMucLoaiTaiSanId) &&
            Objects.equals(distinct, that.distinct)
        );
    }

    @Override
    public int hashCode() {
        return Objects.hash(idCapNhat, tenTaiSan, ngayCapNhat, taiSanId, danhMucLoaiTaiSanId, distinct);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ThongTinCapNhatTaiSanCriteria{" +
            optionalIdCapNhat().map(f -> "idCapNhat=" + f + ", ").orElse("") +
            optionalTenTaiSan().map(f -> "tenTaiSan=" + f + ", ").orElse("") +
            optionalNgayCapNhat().map(f -> "ngayCapNhat=" + f + ", ").orElse("") +
            optionalTaiSanId().map(f -> "taiSanId=" + f + ", ").orElse("") +
            optionalDanhMucLoaiTaiSanId().map(f -> "danhMucLoaiTaiSanId=" + f + ", ").orElse("") +
            optionalDistinct().map(f -> "distinct=" + f + ", ").orElse("") +
        "}";
    }
}
