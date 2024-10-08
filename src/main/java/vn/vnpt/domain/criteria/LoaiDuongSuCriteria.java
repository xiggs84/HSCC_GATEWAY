package vn.vnpt.domain.criteria;

import java.io.Serializable;
import java.util.Objects;
import java.util.Optional;
import org.springdoc.core.annotations.ParameterObject;
import tech.jhipster.service.Criteria;
import tech.jhipster.service.filter.*;

/**
 * Criteria class for the {@link vn.vnpt.domain.LoaiDuongSu} entity. This class is used
 * in {@link vn.vnpt.web.rest.LoaiDuongSuResource} to receive all the possible filtering options from
 * the Http GET request parameters.
 * For example the following could be a valid request:
 * {@code /loai-duong-sus?id.greaterThan=5&attr1.contains=something&attr2.specified=false}
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
@ParameterObject
@SuppressWarnings("common-java:DuplicatedBlocks")
public class LoaiDuongSuCriteria implements Serializable, Criteria {

    private static final long serialVersionUID = 1L;

    private StringFilter idLoaiDuongSu;

    private StringFilter tenLoaiDuongSu;

    private Boolean distinct;

    public LoaiDuongSuCriteria() {}

    public LoaiDuongSuCriteria(LoaiDuongSuCriteria other) {
        this.idLoaiDuongSu = other.optionalIdLoaiDuongSu().map(StringFilter::copy).orElse(null);
        this.tenLoaiDuongSu = other.optionalTenLoaiDuongSu().map(StringFilter::copy).orElse(null);
        this.distinct = other.distinct;
    }

    @Override
    public LoaiDuongSuCriteria copy() {
        return new LoaiDuongSuCriteria(this);
    }

    public StringFilter getIdLoaiDuongSu() {
        return idLoaiDuongSu;
    }

    public Optional<StringFilter> optionalIdLoaiDuongSu() {
        return Optional.ofNullable(idLoaiDuongSu);
    }

    public StringFilter idLoaiDuongSu() {
        if (idLoaiDuongSu == null) {
            setIdLoaiDuongSu(new StringFilter());
        }
        return idLoaiDuongSu;
    }

    public void setIdLoaiDuongSu(StringFilter idLoaiDuongSu) {
        this.idLoaiDuongSu = idLoaiDuongSu;
    }

    public StringFilter getTenLoaiDuongSu() {
        return tenLoaiDuongSu;
    }

    public Optional<StringFilter> optionalTenLoaiDuongSu() {
        return Optional.ofNullable(tenLoaiDuongSu);
    }

    public StringFilter tenLoaiDuongSu() {
        if (tenLoaiDuongSu == null) {
            setTenLoaiDuongSu(new StringFilter());
        }
        return tenLoaiDuongSu;
    }

    public void setTenLoaiDuongSu(StringFilter tenLoaiDuongSu) {
        this.tenLoaiDuongSu = tenLoaiDuongSu;
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
        final LoaiDuongSuCriteria that = (LoaiDuongSuCriteria) o;
        return (
            Objects.equals(idLoaiDuongSu, that.idLoaiDuongSu) &&
            Objects.equals(tenLoaiDuongSu, that.tenLoaiDuongSu) &&
            Objects.equals(distinct, that.distinct)
        );
    }

    @Override
    public int hashCode() {
        return Objects.hash(idLoaiDuongSu, tenLoaiDuongSu, distinct);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "LoaiDuongSuCriteria{" +
            optionalIdLoaiDuongSu().map(f -> "idLoaiDuongSu=" + f + ", ").orElse("") +
            optionalTenLoaiDuongSu().map(f -> "tenLoaiDuongSu=" + f + ", ").orElse("") +
            optionalDistinct().map(f -> "distinct=" + f + ", ").orElse("") +
        "}";
    }
}
