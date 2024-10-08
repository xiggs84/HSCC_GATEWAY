package vn.vnpt.repository;

import org.springframework.data.domain.Pageable;
import org.springframework.data.r2dbc.repository.Query;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import vn.vnpt.domain.ThongTinCapNhatTaiSan;
import vn.vnpt.domain.criteria.ThongTinCapNhatTaiSanCriteria;

/**
 * Spring Data R2DBC repository for the ThongTinCapNhatTaiSan entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ThongTinCapNhatTaiSanRepository
    extends ReactiveCrudRepository<ThongTinCapNhatTaiSan, Long>, ThongTinCapNhatTaiSanRepositoryInternal {
    @Query("SELECT * FROM thong_tin_cap_nhat_tai_san entity WHERE entity.tai_san_id_tai_san = :id")
    Flux<ThongTinCapNhatTaiSan> findByTaiSan(Long id);

    @Query("SELECT * FROM thong_tin_cap_nhat_tai_san entity WHERE entity.tai_san_id_tai_san IS NULL")
    Flux<ThongTinCapNhatTaiSan> findAllWhereTaiSanIsNull();

    @Query("SELECT * FROM thong_tin_cap_nhat_tai_san entity WHERE entity.danh_muc_loai_tai_san_id_loai_ts = :id")
    Flux<ThongTinCapNhatTaiSan> findByDanhMucLoaiTaiSan(Long id);

    @Query("SELECT * FROM thong_tin_cap_nhat_tai_san entity WHERE entity.danh_muc_loai_tai_san_id_loai_ts IS NULL")
    Flux<ThongTinCapNhatTaiSan> findAllWhereDanhMucLoaiTaiSanIsNull();

    @Override
    <S extends ThongTinCapNhatTaiSan> Mono<S> save(S entity);

    @Override
    Flux<ThongTinCapNhatTaiSan> findAll();

    @Override
    Mono<ThongTinCapNhatTaiSan> findById(Long id);

    @Override
    Mono<Void> deleteById(Long id);
}

interface ThongTinCapNhatTaiSanRepositoryInternal {
    <S extends ThongTinCapNhatTaiSan> Mono<S> save(S entity);

    Flux<ThongTinCapNhatTaiSan> findAllBy(Pageable pageable);

    Flux<ThongTinCapNhatTaiSan> findAll();

    Mono<ThongTinCapNhatTaiSan> findById(Long id);
    // this is not supported at the moment because of https://github.com/jhipster/generator-jhipster/issues/18269
    // Flux<ThongTinCapNhatTaiSan> findAllBy(Pageable pageable, Criteria criteria);
    Flux<ThongTinCapNhatTaiSan> findByCriteria(ThongTinCapNhatTaiSanCriteria criteria, Pageable pageable);

    Mono<Long> countByCriteria(ThongTinCapNhatTaiSanCriteria criteria);
}
