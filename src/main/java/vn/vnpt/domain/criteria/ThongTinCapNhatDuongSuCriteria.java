package vn.vnpt.domain.criteria;

import java.io.Serializable;
import java.util.Objects;
import java.util.Optional;
import org.springdoc.core.annotations.ParameterObject;
import tech.jhipster.service.Criteria;
import tech.jhipster.service.filter.*;

/**
 * Criteria class for the {@link vn.vnpt.domain.ThongTinCapNhatDuongSu} entity. This class is used
 * in {@link vn.vnpt.web.rest.ThongTinCapNhatDuongSuResource} to receive all the possible filtering options from
 * the Http GET request parameters.
 * For example the following could be a valid request:
 * {@code /thong-tin-cap-nhat-duong-sus?id.greaterThan=5&attr1.contains=something&attr2.specified=false}
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
@ParameterObject
@SuppressWarnings("common-java:DuplicatedBlocks")
public class ThongTinCapNhatDuongSuCriteria implements Serializable, Criteria {

    private static final long serialVersionUID = 1L;

    private LongFilter idCapNhat;

    private StringFilter tenDuongSu;

    private StringFilter soGiayTo;

    private LocalDateFilter ngayCapNhat;

    private StringFilter loaiDuongSuId;

    private StringFilter loaiGiayToId;

    private LongFilter duongSuId;

    private Boolean distinct;

    public ThongTinCapNhatDuongSuCriteria() {}

    public ThongTinCapNhatDuongSuCriteria(ThongTinCapNhatDuongSuCriteria other) {
        this.idCapNhat = other.optionalIdCapNhat().map(LongFilter::copy).orElse(null);
        this.tenDuongSu = other.optionalTenDuongSu().map(StringFilter::copy).orElse(null);
        this.soGiayTo = other.optionalSoGiayTo().map(StringFilter::copy).orElse(null);
        this.ngayCapNhat = other.optionalNgayCapNhat().map(LocalDateFilter::copy).orElse(null);
        this.loaiDuongSuId = other.optionalLoaiDuongSuId().map(StringFilter::copy).orElse(null);
        this.loaiGiayToId = other.optionalLoaiGiayToId().map(StringFilter::copy).orElse(null);
        this.duongSuId = other.optionalDuongSuId().map(LongFilter::copy).orElse(null);
        this.distinct = other.distinct;
    }

    @Override
    public ThongTinCapNhatDuongSuCriteria copy() {
        return new ThongTinCapNhatDuongSuCriteria(this);
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

    public StringFilter getTenDuongSu() {
        return tenDuongSu;
    }

    public Optional<StringFilter> optionalTenDuongSu() {
        return Optional.ofNullable(tenDuongSu);
    }

    public StringFilter tenDuongSu() {
        if (tenDuongSu == null) {
            setTenDuongSu(new StringFilter());
        }
        return tenDuongSu;
    }

    public void setTenDuongSu(StringFilter tenDuongSu) {
        this.tenDuongSu = tenDuongSu;
    }

    public StringFilter getSoGiayTo() {
        return soGiayTo;
    }

    public Optional<StringFilter> optionalSoGiayTo() {
        return Optional.ofNullable(soGiayTo);
    }

    public StringFilter soGiayTo() {
        if (soGiayTo == null) {
            setSoGiayTo(new StringFilter());
        }
        return soGiayTo;
    }

    public void setSoGiayTo(StringFilter soGiayTo) {
        this.soGiayTo = soGiayTo;
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

    public StringFilter getLoaiDuongSuId() {
        return loaiDuongSuId;
    }

    public Optional<StringFilter> optionalLoaiDuongSuId() {
        return Optional.ofNullable(loaiDuongSuId);
    }

    public StringFilter loaiDuongSuId() {
        if (loaiDuongSuId == null) {
            setLoaiDuongSuId(new StringFilter());
        }
        return loaiDuongSuId;
    }

    public void setLoaiDuongSuId(StringFilter loaiDuongSuId) {
        this.loaiDuongSuId = loaiDuongSuId;
    }

    public StringFilter getLoaiGiayToId() {
        return loaiGiayToId;
    }

    public Optional<StringFilter> optionalLoaiGiayToId() {
        return Optional.ofNullable(loaiGiayToId);
    }

    public StringFilter loaiGiayToId() {
        if (loaiGiayToId == null) {
            setLoaiGiayToId(new StringFilter());
        }
        return loaiGiayToId;
    }

    public void setLoaiGiayToId(StringFilter loaiGiayToId) {
        this.loaiGiayToId = loaiGiayToId;
    }

    public LongFilter getDuongSuId() {
        return duongSuId;
    }

    public Optional<LongFilter> optionalDuongSuId() {
        return Optional.ofNullable(duongSuId);
    }

    public LongFilter duongSuId() {
        if (duongSuId == null) {
            setDuongSuId(new LongFilter());
        }
        return duongSuId;
    }

    public void setDuongSuId(LongFilter duongSuId) {
        this.duongSuId = duongSuId;
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
        final ThongTinCapNhatDuongSuCriteria that = (ThongTinCapNhatDuongSuCriteria) o;
        return (
            Objects.equals(idCapNhat, that.idCapNhat) &&
            Objects.equals(tenDuongSu, that.tenDuongSu) &&
            Objects.equals(soGiayTo, that.soGiayTo) &&
            Objects.equals(ngayCapNhat, that.ngayCapNhat) &&
            Objects.equals(loaiDuongSuId, that.loaiDuongSuId) &&
            Objects.equals(loaiGiayToId, that.loaiGiayToId) &&
            Objects.equals(duongSuId, that.duongSuId) &&
            Objects.equals(distinct, that.distinct)
        );
    }

    @Override
    public int hashCode() {
        return Objects.hash(idCapNhat, tenDuongSu, soGiayTo, ngayCapNhat, loaiDuongSuId, loaiGiayToId, duongSuId, distinct);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ThongTinCapNhatDuongSuCriteria{" +
            optionalIdCapNhat().map(f -> "idCapNhat=" + f + ", ").orElse("") +
            optionalTenDuongSu().map(f -> "tenDuongSu=" + f + ", ").orElse("") +
            optionalSoGiayTo().map(f -> "soGiayTo=" + f + ", ").orElse("") +
            optionalNgayCapNhat().map(f -> "ngayCapNhat=" + f + ", ").orElse("") +
            optionalLoaiDuongSuId().map(f -> "loaiDuongSuId=" + f + ", ").orElse("") +
            optionalLoaiGiayToId().map(f -> "loaiGiayToId=" + f + ", ").orElse("") +
            optionalDuongSuId().map(f -> "duongSuId=" + f + ", ").orElse("") +
            optionalDistinct().map(f -> "distinct=" + f + ", ").orElse("") +
        "}";
    }
}
