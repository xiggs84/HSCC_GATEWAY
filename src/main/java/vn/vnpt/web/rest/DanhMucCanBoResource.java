package vn.vnpt.web.rest;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.util.ForwardedHeaderUtils;
import reactor.core.publisher.Mono;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.PaginationUtil;
import tech.jhipster.web.util.reactive.ResponseUtil;
import vn.vnpt.domain.criteria.DanhMucCanBoCriteria;
import vn.vnpt.repository.DanhMucCanBoRepository;
import vn.vnpt.service.DanhMucCanBoService;
import vn.vnpt.service.dto.DanhMucCanBoDTO;
import vn.vnpt.web.rest.errors.BadRequestAlertException;

/**
 * REST controller for managing {@link vn.vnpt.domain.DanhMucCanBo}.
 */
@RestController
@RequestMapping("/api/danh-muc-can-bos")
public class DanhMucCanBoResource {

    private static final Logger LOG = LoggerFactory.getLogger(DanhMucCanBoResource.class);

    private static final String ENTITY_NAME = "danhMucCanBo";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final DanhMucCanBoService danhMucCanBoService;

    private final DanhMucCanBoRepository danhMucCanBoRepository;

    public DanhMucCanBoResource(DanhMucCanBoService danhMucCanBoService, DanhMucCanBoRepository danhMucCanBoRepository) {
        this.danhMucCanBoService = danhMucCanBoService;
        this.danhMucCanBoRepository = danhMucCanBoRepository;
    }

    /**
     * {@code POST  /danh-muc-can-bos} : Create a new danhMucCanBo.
     *
     * @param danhMucCanBoDTO the danhMucCanBoDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new danhMucCanBoDTO, or with status {@code 400 (Bad Request)} if the danhMucCanBo has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public Mono<ResponseEntity<DanhMucCanBoDTO>> createDanhMucCanBo(@RequestBody DanhMucCanBoDTO danhMucCanBoDTO)
        throws URISyntaxException {
        LOG.debug("REST request to save DanhMucCanBo : {}", danhMucCanBoDTO);
        if (danhMucCanBoDTO.getIdCanBo() != null) {
            throw new BadRequestAlertException("A new danhMucCanBo cannot already have an ID", ENTITY_NAME, "idexists");
        }
        return danhMucCanBoService
            .save(danhMucCanBoDTO)
            .map(result -> {
                try {
                    return ResponseEntity.created(new URI("/api/danh-muc-can-bos/" + result.getIdCanBo()))
                        .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getIdCanBo().toString()))
                        .body(result);
                } catch (URISyntaxException e) {
                    throw new RuntimeException(e);
                }
            });
    }

    /**
     * {@code PUT  /danh-muc-can-bos/:idCanBo} : Updates an existing danhMucCanBo.
     *
     * @param idCanBo the id of the danhMucCanBoDTO to save.
     * @param danhMucCanBoDTO the danhMucCanBoDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated danhMucCanBoDTO,
     * or with status {@code 400 (Bad Request)} if the danhMucCanBoDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the danhMucCanBoDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{idCanBo}")
    public Mono<ResponseEntity<DanhMucCanBoDTO>> updateDanhMucCanBo(
        @PathVariable(value = "idCanBo", required = false) final Long idCanBo,
        @RequestBody DanhMucCanBoDTO danhMucCanBoDTO
    ) throws URISyntaxException {
        LOG.debug("REST request to update DanhMucCanBo : {}, {}", idCanBo, danhMucCanBoDTO);
        if (danhMucCanBoDTO.getIdCanBo() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(idCanBo, danhMucCanBoDTO.getIdCanBo())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        return danhMucCanBoRepository
            .existsById(idCanBo)
            .flatMap(exists -> {
                if (!exists) {
                    return Mono.error(new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound"));
                }

                return danhMucCanBoService
                    .update(danhMucCanBoDTO)
                    .switchIfEmpty(Mono.error(new ResponseStatusException(HttpStatus.NOT_FOUND)))
                    .map(result ->
                        ResponseEntity.ok()
                            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, result.getIdCanBo().toString()))
                            .body(result)
                    );
            });
    }

    /**
     * {@code PATCH  /danh-muc-can-bos/:idCanBo} : Partial updates given fields of an existing danhMucCanBo, field will ignore if it is null
     *
     * @param idCanBo the id of the danhMucCanBoDTO to save.
     * @param danhMucCanBoDTO the danhMucCanBoDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated danhMucCanBoDTO,
     * or with status {@code 400 (Bad Request)} if the danhMucCanBoDTO is not valid,
     * or with status {@code 404 (Not Found)} if the danhMucCanBoDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the danhMucCanBoDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{idCanBo}", consumes = { "application/json", "application/merge-patch+json" })
    public Mono<ResponseEntity<DanhMucCanBoDTO>> partialUpdateDanhMucCanBo(
        @PathVariable(value = "idCanBo", required = false) final Long idCanBo,
        @RequestBody DanhMucCanBoDTO danhMucCanBoDTO
    ) throws URISyntaxException {
        LOG.debug("REST request to partial update DanhMucCanBo partially : {}, {}", idCanBo, danhMucCanBoDTO);
        if (danhMucCanBoDTO.getIdCanBo() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(idCanBo, danhMucCanBoDTO.getIdCanBo())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        return danhMucCanBoRepository
            .existsById(idCanBo)
            .flatMap(exists -> {
                if (!exists) {
                    return Mono.error(new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound"));
                }

                Mono<DanhMucCanBoDTO> result = danhMucCanBoService.partialUpdate(danhMucCanBoDTO);

                return result
                    .switchIfEmpty(Mono.error(new ResponseStatusException(HttpStatus.NOT_FOUND)))
                    .map(res ->
                        ResponseEntity.ok()
                            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, res.getIdCanBo().toString()))
                            .body(res)
                    );
            });
    }

    /**
     * {@code GET  /danh-muc-can-bos} : get all the danhMucCanBos.
     *
     * @param pageable the pagination information.
     * @param request a {@link ServerHttpRequest} request.
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of danhMucCanBos in body.
     */
    @GetMapping(value = "", produces = MediaType.APPLICATION_JSON_VALUE)
    public Mono<ResponseEntity<List<DanhMucCanBoDTO>>> getAllDanhMucCanBos(
        DanhMucCanBoCriteria criteria,
        @org.springdoc.core.annotations.ParameterObject Pageable pageable,
        ServerHttpRequest request
    ) {
        LOG.debug("REST request to get DanhMucCanBos by criteria: {}", criteria);
        return danhMucCanBoService
            .countByCriteria(criteria)
            .zipWith(danhMucCanBoService.findByCriteria(criteria, pageable).collectList())
            .map(countWithEntities ->
                ResponseEntity.ok()
                    .headers(
                        PaginationUtil.generatePaginationHttpHeaders(
                            ForwardedHeaderUtils.adaptFromForwardedHeaders(request.getURI(), request.getHeaders()),
                            new PageImpl<>(countWithEntities.getT2(), pageable, countWithEntities.getT1())
                        )
                    )
                    .body(countWithEntities.getT2())
            );
    }

    /**
     * {@code GET  /danh-muc-can-bos/count} : count all the danhMucCanBos.
     *
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the count in body.
     */
    @GetMapping("/count")
    public Mono<ResponseEntity<Long>> countDanhMucCanBos(DanhMucCanBoCriteria criteria) {
        LOG.debug("REST request to count DanhMucCanBos by criteria: {}", criteria);
        return danhMucCanBoService.countByCriteria(criteria).map(count -> ResponseEntity.status(HttpStatus.OK).body(count));
    }

    /**
     * {@code GET  /danh-muc-can-bos/:id} : get the "id" danhMucCanBo.
     *
     * @param id the id of the danhMucCanBoDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the danhMucCanBoDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public Mono<ResponseEntity<DanhMucCanBoDTO>> getDanhMucCanBo(@PathVariable("id") Long id) {
        LOG.debug("REST request to get DanhMucCanBo : {}", id);
        Mono<DanhMucCanBoDTO> danhMucCanBoDTO = danhMucCanBoService.findOne(id);
        return ResponseUtil.wrapOrNotFound(danhMucCanBoDTO);
    }

    /**
     * {@code DELETE  /danh-muc-can-bos/:id} : delete the "id" danhMucCanBo.
     *
     * @param id the id of the danhMucCanBoDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public Mono<ResponseEntity<Void>> deleteDanhMucCanBo(@PathVariable("id") Long id) {
        LOG.debug("REST request to delete DanhMucCanBo : {}", id);
        return danhMucCanBoService
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
