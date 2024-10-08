package vn.vnpt.web.rest;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.Objects;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.reactive.ResponseUtil;
import vn.vnpt.domain.criteria.ThongTinCapNhatTaiSanCriteria;
import vn.vnpt.repository.ThongTinCapNhatTaiSanRepository;
import vn.vnpt.service.ThongTinCapNhatTaiSanService;
import vn.vnpt.service.dto.ThongTinCapNhatTaiSanDTO;
import vn.vnpt.web.rest.errors.BadRequestAlertException;

/**
 * REST controller for managing {@link vn.vnpt.domain.ThongTinCapNhatTaiSan}.
 */
@RestController
@RequestMapping("/api/thong-tin-cap-nhat-tai-sans")
public class ThongTinCapNhatTaiSanResource {

    private static final Logger LOG = LoggerFactory.getLogger(ThongTinCapNhatTaiSanResource.class);

    private static final String ENTITY_NAME = "thongTinCapNhatTaiSan";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ThongTinCapNhatTaiSanService thongTinCapNhatTaiSanService;

    private final ThongTinCapNhatTaiSanRepository thongTinCapNhatTaiSanRepository;

    public ThongTinCapNhatTaiSanResource(
        ThongTinCapNhatTaiSanService thongTinCapNhatTaiSanService,
        ThongTinCapNhatTaiSanRepository thongTinCapNhatTaiSanRepository
    ) {
        this.thongTinCapNhatTaiSanService = thongTinCapNhatTaiSanService;
        this.thongTinCapNhatTaiSanRepository = thongTinCapNhatTaiSanRepository;
    }

    /**
     * {@code POST  /thong-tin-cap-nhat-tai-sans} : Create a new thongTinCapNhatTaiSan.
     *
     * @param thongTinCapNhatTaiSanDTO the thongTinCapNhatTaiSanDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new thongTinCapNhatTaiSanDTO, or with status {@code 400 (Bad Request)} if the thongTinCapNhatTaiSan has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public Mono<ResponseEntity<ThongTinCapNhatTaiSanDTO>> createThongTinCapNhatTaiSan(
        @RequestBody ThongTinCapNhatTaiSanDTO thongTinCapNhatTaiSanDTO
    ) throws URISyntaxException {
        LOG.debug("REST request to save ThongTinCapNhatTaiSan : {}", thongTinCapNhatTaiSanDTO);
        if (thongTinCapNhatTaiSanDTO.getIdCapNhat() != null) {
            throw new BadRequestAlertException("A new thongTinCapNhatTaiSan cannot already have an ID", ENTITY_NAME, "idexists");
        }
        return thongTinCapNhatTaiSanService
            .save(thongTinCapNhatTaiSanDTO)
            .map(result -> {
                try {
                    return ResponseEntity.created(new URI("/api/thong-tin-cap-nhat-tai-sans/" + result.getIdCapNhat()))
                        .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getIdCapNhat().toString()))
                        .body(result);
                } catch (URISyntaxException e) {
                    throw new RuntimeException(e);
                }
            });
    }

    /**
     * {@code PUT  /thong-tin-cap-nhat-tai-sans/:idCapNhat} : Updates an existing thongTinCapNhatTaiSan.
     *
     * @param idCapNhat the id of the thongTinCapNhatTaiSanDTO to save.
     * @param thongTinCapNhatTaiSanDTO the thongTinCapNhatTaiSanDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated thongTinCapNhatTaiSanDTO,
     * or with status {@code 400 (Bad Request)} if the thongTinCapNhatTaiSanDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the thongTinCapNhatTaiSanDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{idCapNhat}")
    public Mono<ResponseEntity<ThongTinCapNhatTaiSanDTO>> updateThongTinCapNhatTaiSan(
        @PathVariable(value = "idCapNhat", required = false) final Long idCapNhat,
        @RequestBody ThongTinCapNhatTaiSanDTO thongTinCapNhatTaiSanDTO
    ) throws URISyntaxException {
        LOG.debug("REST request to update ThongTinCapNhatTaiSan : {}, {}", idCapNhat, thongTinCapNhatTaiSanDTO);
        if (thongTinCapNhatTaiSanDTO.getIdCapNhat() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(idCapNhat, thongTinCapNhatTaiSanDTO.getIdCapNhat())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        return thongTinCapNhatTaiSanRepository
            .existsById(idCapNhat)
            .flatMap(exists -> {
                if (!exists) {
                    return Mono.error(new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound"));
                }

                return thongTinCapNhatTaiSanService
                    .update(thongTinCapNhatTaiSanDTO)
                    .switchIfEmpty(Mono.error(new ResponseStatusException(HttpStatus.NOT_FOUND)))
                    .map(result ->
                        ResponseEntity.ok()
                            .headers(
                                HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, result.getIdCapNhat().toString())
                            )
                            .body(result)
                    );
            });
    }

    /**
     * {@code PATCH  /thong-tin-cap-nhat-tai-sans/:idCapNhat} : Partial updates given fields of an existing thongTinCapNhatTaiSan, field will ignore if it is null
     *
     * @param idCapNhat the id of the thongTinCapNhatTaiSanDTO to save.
     * @param thongTinCapNhatTaiSanDTO the thongTinCapNhatTaiSanDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated thongTinCapNhatTaiSanDTO,
     * or with status {@code 400 (Bad Request)} if the thongTinCapNhatTaiSanDTO is not valid,
     * or with status {@code 404 (Not Found)} if the thongTinCapNhatTaiSanDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the thongTinCapNhatTaiSanDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{idCapNhat}", consumes = { "application/json", "application/merge-patch+json" })
    public Mono<ResponseEntity<ThongTinCapNhatTaiSanDTO>> partialUpdateThongTinCapNhatTaiSan(
        @PathVariable(value = "idCapNhat", required = false) final Long idCapNhat,
        @RequestBody ThongTinCapNhatTaiSanDTO thongTinCapNhatTaiSanDTO
    ) throws URISyntaxException {
        LOG.debug("REST request to partial update ThongTinCapNhatTaiSan partially : {}, {}", idCapNhat, thongTinCapNhatTaiSanDTO);
        if (thongTinCapNhatTaiSanDTO.getIdCapNhat() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(idCapNhat, thongTinCapNhatTaiSanDTO.getIdCapNhat())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        return thongTinCapNhatTaiSanRepository
            .existsById(idCapNhat)
            .flatMap(exists -> {
                if (!exists) {
                    return Mono.error(new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound"));
                }

                Mono<ThongTinCapNhatTaiSanDTO> result = thongTinCapNhatTaiSanService.partialUpdate(thongTinCapNhatTaiSanDTO);

                return result
                    .switchIfEmpty(Mono.error(new ResponseStatusException(HttpStatus.NOT_FOUND)))
                    .map(res ->
                        ResponseEntity.ok()
                            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, res.getIdCapNhat().toString()))
                            .body(res)
                    );
            });
    }

    /**
     * {@code GET  /thong-tin-cap-nhat-tai-sans} : get all the thongTinCapNhatTaiSans.
     *
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of thongTinCapNhatTaiSans in body.
     */
    @GetMapping(value = "", produces = MediaType.APPLICATION_JSON_VALUE)
    public Flux<ThongTinCapNhatTaiSanDTO> getAllThongTinCapNhatTaiSans(ThongTinCapNhatTaiSanCriteria criteria) {
        LOG.debug("REST request to get ThongTinCapNhatTaiSans by criteria: {}", criteria);
        return thongTinCapNhatTaiSanService.findByCriteria(criteria);
    }

    /**
     * {@code GET  /thong-tin-cap-nhat-tai-sans/count} : count all the thongTinCapNhatTaiSans.
     *
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the count in body.
     */
    @GetMapping("/count")
    public Mono<ResponseEntity<Long>> countThongTinCapNhatTaiSans(ThongTinCapNhatTaiSanCriteria criteria) {
        LOG.debug("REST request to count ThongTinCapNhatTaiSans by criteria: {}", criteria);
        return thongTinCapNhatTaiSanService.countByCriteria(criteria).map(count -> ResponseEntity.status(HttpStatus.OK).body(count));
    }

    /**
     * {@code GET  /thong-tin-cap-nhat-tai-sans/:id} : get the "id" thongTinCapNhatTaiSan.
     *
     * @param id the id of the thongTinCapNhatTaiSanDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the thongTinCapNhatTaiSanDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public Mono<ResponseEntity<ThongTinCapNhatTaiSanDTO>> getThongTinCapNhatTaiSan(@PathVariable("id") Long id) {
        LOG.debug("REST request to get ThongTinCapNhatTaiSan : {}", id);
        Mono<ThongTinCapNhatTaiSanDTO> thongTinCapNhatTaiSanDTO = thongTinCapNhatTaiSanService.findOne(id);
        return ResponseUtil.wrapOrNotFound(thongTinCapNhatTaiSanDTO);
    }

    /**
     * {@code DELETE  /thong-tin-cap-nhat-tai-sans/:id} : delete the "id" thongTinCapNhatTaiSan.
     *
     * @param id the id of the thongTinCapNhatTaiSanDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public Mono<ResponseEntity<Void>> deleteThongTinCapNhatTaiSan(@PathVariable("id") Long id) {
        LOG.debug("REST request to delete ThongTinCapNhatTaiSan : {}", id);
        return thongTinCapNhatTaiSanService
            .delete(id)
            .then(
                Mono.just(
                    ResponseEntity.noContent()
                        .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
                        .build()
                )
            );
    }
}
