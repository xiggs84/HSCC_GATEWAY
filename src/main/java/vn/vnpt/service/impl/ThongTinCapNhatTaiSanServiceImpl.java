package vn.vnpt.service.impl;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import vn.vnpt.domain.criteria.ThongTinCapNhatTaiSanCriteria;
import vn.vnpt.repository.ThongTinCapNhatTaiSanRepository;
import vn.vnpt.service.ThongTinCapNhatTaiSanService;
import vn.vnpt.service.dto.ThongTinCapNhatTaiSanDTO;
import vn.vnpt.service.mapper.ThongTinCapNhatTaiSanMapper;

/**
 * Service Implementation for managing {@link vn.vnpt.domain.ThongTinCapNhatTaiSan}.
 */
@Service
@Transactional
public class ThongTinCapNhatTaiSanServiceImpl implements ThongTinCapNhatTaiSanService {

    private static final Logger LOG = LoggerFactory.getLogger(ThongTinCapNhatTaiSanServiceImpl.class);

    private final ThongTinCapNhatTaiSanRepository thongTinCapNhatTaiSanRepository;

    private final ThongTinCapNhatTaiSanMapper thongTinCapNhatTaiSanMapper;

    public ThongTinCapNhatTaiSanServiceImpl(
        ThongTinCapNhatTaiSanRepository thongTinCapNhatTaiSanRepository,
        ThongTinCapNhatTaiSanMapper thongTinCapNhatTaiSanMapper
    ) {
        this.thongTinCapNhatTaiSanRepository = thongTinCapNhatTaiSanRepository;
        this.thongTinCapNhatTaiSanMapper = thongTinCapNhatTaiSanMapper;
    }

    @Override
    public Mono<ThongTinCapNhatTaiSanDTO> save(ThongTinCapNhatTaiSanDTO thongTinCapNhatTaiSanDTO) {
        LOG.debug("Request to save ThongTinCapNhatTaiSan : {}", thongTinCapNhatTaiSanDTO);
        return thongTinCapNhatTaiSanRepository
            .save(thongTinCapNhatTaiSanMapper.toEntity(thongTinCapNhatTaiSanDTO))
            .map(thongTinCapNhatTaiSanMapper::toDto);
    }

    @Override
    public Mono<ThongTinCapNhatTaiSanDTO> update(ThongTinCapNhatTaiSanDTO thongTinCapNhatTaiSanDTO) {
        LOG.debug("Request to update ThongTinCapNhatTaiSan : {}", thongTinCapNhatTaiSanDTO);
        return thongTinCapNhatTaiSanRepository
            .save(thongTinCapNhatTaiSanMapper.toEntity(thongTinCapNhatTaiSanDTO))
            .map(thongTinCapNhatTaiSanMapper::toDto);
    }

    @Override
    public Mono<ThongTinCapNhatTaiSanDTO> partialUpdate(ThongTinCapNhatTaiSanDTO thongTinCapNhatTaiSanDTO) {
        LOG.debug("Request to partially update ThongTinCapNhatTaiSan : {}", thongTinCapNhatTaiSanDTO);

        return thongTinCapNhatTaiSanRepository
            .findById(thongTinCapNhatTaiSanDTO.getIdCapNhat())
            .map(existingThongTinCapNhatTaiSan -> {
                thongTinCapNhatTaiSanMapper.partialUpdate(existingThongTinCapNhatTaiSan, thongTinCapNhatTaiSanDTO);

                return existingThongTinCapNhatTaiSan;
            })
            .flatMap(thongTinCapNhatTaiSanRepository::save)
            .map(thongTinCapNhatTaiSanMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Flux<ThongTinCapNhatTaiSanDTO> findByCriteria(ThongTinCapNhatTaiSanCriteria criteria) {
        LOG.debug("Request to get all ThongTinCapNhatTaiSans by Criteria");
        return thongTinCapNhatTaiSanRepository.findByCriteria(criteria, null).map(thongTinCapNhatTaiSanMapper::toDto);
    }

    /**
     * Find the count of thongTinCapNhatTaiSans by criteria.
     * @param criteria filtering criteria
     * @return the count of thongTinCapNhatTaiSans
     */
    public Mono<Long> countByCriteria(ThongTinCapNhatTaiSanCriteria criteria) {
        LOG.debug("Request to get the count of all ThongTinCapNhatTaiSans by Criteria");
        return thongTinCapNhatTaiSanRepository.countByCriteria(criteria);
    }

    public Mono<Long> countAll() {
        return thongTinCapNhatTaiSanRepository.count();
    }

    @Override
    @Transactional(readOnly = true)
    public Mono<ThongTinCapNhatTaiSanDTO> findOne(Long id) {
        LOG.debug("Request to get ThongTinCapNhatTaiSan : {}", id);
        return thongTinCapNhatTaiSanRepository.findById(id).map(thongTinCapNhatTaiSanMapper::toDto);
    }

    @Override
    public Mono<Void> delete(Long id) {
        LOG.debug("Request to delete ThongTinCapNhatTaiSan : {}", id);
        return thongTinCapNhatTaiSanRepository.deleteById(id);
    }
}
