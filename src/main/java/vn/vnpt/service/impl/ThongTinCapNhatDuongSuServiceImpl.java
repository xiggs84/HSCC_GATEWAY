package vn.vnpt.service.impl;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import vn.vnpt.domain.criteria.ThongTinCapNhatDuongSuCriteria;
import vn.vnpt.repository.ThongTinCapNhatDuongSuRepository;
import vn.vnpt.service.ThongTinCapNhatDuongSuService;
import vn.vnpt.service.dto.ThongTinCapNhatDuongSuDTO;
import vn.vnpt.service.mapper.ThongTinCapNhatDuongSuMapper;

/**
 * Service Implementation for managing {@link vn.vnpt.domain.ThongTinCapNhatDuongSu}.
 */
@Service
@Transactional
public class ThongTinCapNhatDuongSuServiceImpl implements ThongTinCapNhatDuongSuService {

    private static final Logger LOG = LoggerFactory.getLogger(ThongTinCapNhatDuongSuServiceImpl.class);

    private final ThongTinCapNhatDuongSuRepository thongTinCapNhatDuongSuRepository;

    private final ThongTinCapNhatDuongSuMapper thongTinCapNhatDuongSuMapper;

    public ThongTinCapNhatDuongSuServiceImpl(
        ThongTinCapNhatDuongSuRepository thongTinCapNhatDuongSuRepository,
        ThongTinCapNhatDuongSuMapper thongTinCapNhatDuongSuMapper
    ) {
        this.thongTinCapNhatDuongSuRepository = thongTinCapNhatDuongSuRepository;
        this.thongTinCapNhatDuongSuMapper = thongTinCapNhatDuongSuMapper;
    }

    @Override
    public Mono<ThongTinCapNhatDuongSuDTO> save(ThongTinCapNhatDuongSuDTO thongTinCapNhatDuongSuDTO) {
        LOG.debug("Request to save ThongTinCapNhatDuongSu : {}", thongTinCapNhatDuongSuDTO);
        return thongTinCapNhatDuongSuRepository
            .save(thongTinCapNhatDuongSuMapper.toEntity(thongTinCapNhatDuongSuDTO))
            .map(thongTinCapNhatDuongSuMapper::toDto);
    }

    @Override
    public Mono<ThongTinCapNhatDuongSuDTO> update(ThongTinCapNhatDuongSuDTO thongTinCapNhatDuongSuDTO) {
        LOG.debug("Request to update ThongTinCapNhatDuongSu : {}", thongTinCapNhatDuongSuDTO);
        return thongTinCapNhatDuongSuRepository
            .save(thongTinCapNhatDuongSuMapper.toEntity(thongTinCapNhatDuongSuDTO))
            .map(thongTinCapNhatDuongSuMapper::toDto);
    }

    @Override
    public Mono<ThongTinCapNhatDuongSuDTO> partialUpdate(ThongTinCapNhatDuongSuDTO thongTinCapNhatDuongSuDTO) {
        LOG.debug("Request to partially update ThongTinCapNhatDuongSu : {}", thongTinCapNhatDuongSuDTO);

        return thongTinCapNhatDuongSuRepository
            .findById(thongTinCapNhatDuongSuDTO.getIdCapNhat())
            .map(existingThongTinCapNhatDuongSu -> {
                thongTinCapNhatDuongSuMapper.partialUpdate(existingThongTinCapNhatDuongSu, thongTinCapNhatDuongSuDTO);

                return existingThongTinCapNhatDuongSu;
            })
            .flatMap(thongTinCapNhatDuongSuRepository::save)
            .map(thongTinCapNhatDuongSuMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Flux<ThongTinCapNhatDuongSuDTO> findByCriteria(ThongTinCapNhatDuongSuCriteria criteria, Pageable pageable) {
        LOG.debug("Request to get all ThongTinCapNhatDuongSus by Criteria");
        return thongTinCapNhatDuongSuRepository.findByCriteria(criteria, pageable).map(thongTinCapNhatDuongSuMapper::toDto);
    }

    /**
     * Find the count of thongTinCapNhatDuongSus by criteria.
     * @param criteria filtering criteria
     * @return the count of thongTinCapNhatDuongSus
     */
    public Mono<Long> countByCriteria(ThongTinCapNhatDuongSuCriteria criteria) {
        LOG.debug("Request to get the count of all ThongTinCapNhatDuongSus by Criteria");
        return thongTinCapNhatDuongSuRepository.countByCriteria(criteria);
    }

    public Mono<Long> countAll() {
        return thongTinCapNhatDuongSuRepository.count();
    }

    @Override
    @Transactional(readOnly = true)
    public Mono<ThongTinCapNhatDuongSuDTO> findOne(Long id) {
        LOG.debug("Request to get ThongTinCapNhatDuongSu : {}", id);
        return thongTinCapNhatDuongSuRepository.findById(id).map(thongTinCapNhatDuongSuMapper::toDto);
    }

    @Override
    public Mono<Void> delete(Long id) {
        LOG.debug("Request to delete ThongTinCapNhatDuongSu : {}", id);
        return thongTinCapNhatDuongSuRepository.deleteById(id);
    }
}
