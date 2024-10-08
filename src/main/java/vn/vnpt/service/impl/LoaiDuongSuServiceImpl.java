package vn.vnpt.service.impl;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import vn.vnpt.domain.criteria.LoaiDuongSuCriteria;
import vn.vnpt.repository.LoaiDuongSuRepository;
import vn.vnpt.service.LoaiDuongSuService;
import vn.vnpt.service.dto.LoaiDuongSuDTO;
import vn.vnpt.service.mapper.LoaiDuongSuMapper;

/**
 * Service Implementation for managing {@link vn.vnpt.domain.LoaiDuongSu}.
 */
@Service
@Transactional
public class LoaiDuongSuServiceImpl implements LoaiDuongSuService {

    private static final Logger LOG = LoggerFactory.getLogger(LoaiDuongSuServiceImpl.class);

    private final LoaiDuongSuRepository loaiDuongSuRepository;

    private final LoaiDuongSuMapper loaiDuongSuMapper;

    public LoaiDuongSuServiceImpl(LoaiDuongSuRepository loaiDuongSuRepository, LoaiDuongSuMapper loaiDuongSuMapper) {
        this.loaiDuongSuRepository = loaiDuongSuRepository;
        this.loaiDuongSuMapper = loaiDuongSuMapper;
    }

    @Override
    public Mono<LoaiDuongSuDTO> save(LoaiDuongSuDTO loaiDuongSuDTO) {
        LOG.debug("Request to save LoaiDuongSu : {}", loaiDuongSuDTO);
        return loaiDuongSuRepository.save(loaiDuongSuMapper.toEntity(loaiDuongSuDTO)).map(loaiDuongSuMapper::toDto);
    }

    @Override
    public Mono<LoaiDuongSuDTO> update(LoaiDuongSuDTO loaiDuongSuDTO) {
        LOG.debug("Request to update LoaiDuongSu : {}", loaiDuongSuDTO);
        return loaiDuongSuRepository.save(loaiDuongSuMapper.toEntity(loaiDuongSuDTO).setIsPersisted()).map(loaiDuongSuMapper::toDto);
    }

    @Override
    public Mono<LoaiDuongSuDTO> partialUpdate(LoaiDuongSuDTO loaiDuongSuDTO) {
        LOG.debug("Request to partially update LoaiDuongSu : {}", loaiDuongSuDTO);

        return loaiDuongSuRepository
            .findById(loaiDuongSuDTO.getIdLoaiDuongSu())
            .map(existingLoaiDuongSu -> {
                loaiDuongSuMapper.partialUpdate(existingLoaiDuongSu, loaiDuongSuDTO);

                return existingLoaiDuongSu;
            })
            .flatMap(loaiDuongSuRepository::save)
            .map(loaiDuongSuMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Flux<LoaiDuongSuDTO> findByCriteria(LoaiDuongSuCriteria criteria, Pageable pageable) {
        LOG.debug("Request to get all LoaiDuongSus by Criteria");
        return loaiDuongSuRepository.findByCriteria(criteria, pageable).map(loaiDuongSuMapper::toDto);
    }

    /**
     * Find the count of loaiDuongSus by criteria.
     * @param criteria filtering criteria
     * @return the count of loaiDuongSus
     */
    public Mono<Long> countByCriteria(LoaiDuongSuCriteria criteria) {
        LOG.debug("Request to get the count of all LoaiDuongSus by Criteria");
        return loaiDuongSuRepository.countByCriteria(criteria);
    }

    public Mono<Long> countAll() {
        return loaiDuongSuRepository.count();
    }

    @Override
    @Transactional(readOnly = true)
    public Mono<LoaiDuongSuDTO> findOne(String id) {
        LOG.debug("Request to get LoaiDuongSu : {}", id);
        return loaiDuongSuRepository.findById(id).map(loaiDuongSuMapper::toDto);
    }

    @Override
    public Mono<Void> delete(String id) {
        LOG.debug("Request to delete LoaiDuongSu : {}", id);
        return loaiDuongSuRepository.deleteById(id);
    }
}
