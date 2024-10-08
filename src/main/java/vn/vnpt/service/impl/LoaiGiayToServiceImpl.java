package vn.vnpt.service.impl;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import vn.vnpt.domain.criteria.LoaiGiayToCriteria;
import vn.vnpt.repository.LoaiGiayToRepository;
import vn.vnpt.service.LoaiGiayToService;
import vn.vnpt.service.dto.LoaiGiayToDTO;
import vn.vnpt.service.mapper.LoaiGiayToMapper;

/**
 * Service Implementation for managing {@link vn.vnpt.domain.LoaiGiayTo}.
 */
@Service
@Transactional
public class LoaiGiayToServiceImpl implements LoaiGiayToService {

    private static final Logger LOG = LoggerFactory.getLogger(LoaiGiayToServiceImpl.class);

    private final LoaiGiayToRepository loaiGiayToRepository;

    private final LoaiGiayToMapper loaiGiayToMapper;

    public LoaiGiayToServiceImpl(LoaiGiayToRepository loaiGiayToRepository, LoaiGiayToMapper loaiGiayToMapper) {
        this.loaiGiayToRepository = loaiGiayToRepository;
        this.loaiGiayToMapper = loaiGiayToMapper;
    }

    @Override
    public Mono<LoaiGiayToDTO> save(LoaiGiayToDTO loaiGiayToDTO) {
        LOG.debug("Request to save LoaiGiayTo : {}", loaiGiayToDTO);
        return loaiGiayToRepository.save(loaiGiayToMapper.toEntity(loaiGiayToDTO)).map(loaiGiayToMapper::toDto);
    }

    @Override
    public Mono<LoaiGiayToDTO> update(LoaiGiayToDTO loaiGiayToDTO) {
        LOG.debug("Request to update LoaiGiayTo : {}", loaiGiayToDTO);
        return loaiGiayToRepository.save(loaiGiayToMapper.toEntity(loaiGiayToDTO).setIsPersisted()).map(loaiGiayToMapper::toDto);
    }

    @Override
    public Mono<LoaiGiayToDTO> partialUpdate(LoaiGiayToDTO loaiGiayToDTO) {
        LOG.debug("Request to partially update LoaiGiayTo : {}", loaiGiayToDTO);

        return loaiGiayToRepository
            .findById(loaiGiayToDTO.getIdLoaiGiayTo())
            .map(existingLoaiGiayTo -> {
                loaiGiayToMapper.partialUpdate(existingLoaiGiayTo, loaiGiayToDTO);

                return existingLoaiGiayTo;
            })
            .flatMap(loaiGiayToRepository::save)
            .map(loaiGiayToMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Flux<LoaiGiayToDTO> findByCriteria(LoaiGiayToCriteria criteria, Pageable pageable) {
        LOG.debug("Request to get all LoaiGiayTos by Criteria");
        return loaiGiayToRepository.findByCriteria(criteria, pageable).map(loaiGiayToMapper::toDto);
    }

    /**
     * Find the count of loaiGiayTos by criteria.
     * @param criteria filtering criteria
     * @return the count of loaiGiayTos
     */
    public Mono<Long> countByCriteria(LoaiGiayToCriteria criteria) {
        LOG.debug("Request to get the count of all LoaiGiayTos by Criteria");
        return loaiGiayToRepository.countByCriteria(criteria);
    }

    public Mono<Long> countAll() {
        return loaiGiayToRepository.count();
    }

    @Override
    @Transactional(readOnly = true)
    public Mono<LoaiGiayToDTO> findOne(String id) {
        LOG.debug("Request to get LoaiGiayTo : {}", id);
        return loaiGiayToRepository.findById(id).map(loaiGiayToMapper::toDto);
    }

    @Override
    public Mono<Void> delete(String id) {
        LOG.debug("Request to delete LoaiGiayTo : {}", id);
        return loaiGiayToRepository.deleteById(id);
    }
}
