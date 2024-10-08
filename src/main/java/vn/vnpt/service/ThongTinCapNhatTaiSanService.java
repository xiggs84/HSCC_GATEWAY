package vn.vnpt.service;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import vn.vnpt.domain.criteria.ThongTinCapNhatTaiSanCriteria;
import vn.vnpt.service.dto.ThongTinCapNhatTaiSanDTO;

/**
 * Service Interface for managing {@link vn.vnpt.domain.ThongTinCapNhatTaiSan}.
 */
public interface ThongTinCapNhatTaiSanService {
    /**
     * Save a thongTinCapNhatTaiSan.
     *
     * @param thongTinCapNhatTaiSanDTO the entity to save.
     * @return the persisted entity.
     */
    Mono<ThongTinCapNhatTaiSanDTO> save(ThongTinCapNhatTaiSanDTO thongTinCapNhatTaiSanDTO);

    /**
     * Updates a thongTinCapNhatTaiSan.
     *
     * @param thongTinCapNhatTaiSanDTO the entity to update.
     * @return the persisted entity.
     */
    Mono<ThongTinCapNhatTaiSanDTO> update(ThongTinCapNhatTaiSanDTO thongTinCapNhatTaiSanDTO);

    /**
     * Partially updates a thongTinCapNhatTaiSan.
     *
     * @param thongTinCapNhatTaiSanDTO the entity to update partially.
     * @return the persisted entity.
     */
    Mono<ThongTinCapNhatTaiSanDTO> partialUpdate(ThongTinCapNhatTaiSanDTO thongTinCapNhatTaiSanDTO);
    /**
     * Find thongTinCapNhatTaiSans by criteria.
     *
     * @return the list of entities.
     */
    Flux<ThongTinCapNhatTaiSanDTO> findByCriteria(ThongTinCapNhatTaiSanCriteria criteria);

    /**
     * Find the count of thongTinCapNhatTaiSans by criteria.
     * @param criteria filtering criteria
     * @return the count of thongTinCapNhatTaiSans
     */
    public Mono<Long> countByCriteria(ThongTinCapNhatTaiSanCriteria criteria);

    /**
     * Returns the number of thongTinCapNhatTaiSans available.
     * @return the number of entities in the database.
     *
     */
    Mono<Long> countAll();

    /**
     * Get the "id" thongTinCapNhatTaiSan.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Mono<ThongTinCapNhatTaiSanDTO> findOne(Long id);

    /**
     * Delete the "id" thongTinCapNhatTaiSan.
     *
     * @param id the id of the entity.
     * @return a Mono to signal the deletion
     */
    Mono<Void> delete(Long id);
}
