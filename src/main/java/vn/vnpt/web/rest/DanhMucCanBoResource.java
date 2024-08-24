package vn.vnpt.web.rest;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.reactive.ResponseUtil;
import vn.vnpt.domain.DanhMucCanBo;
import vn.vnpt.repository.DanhMucCanBoRepository;
import vn.vnpt.web.rest.errors.BadRequestAlertException;

/**
 * REST controller for managing {@link vn.vnpt.domain.DanhMucCanBo}.
 */
@RestController
@RequestMapping("/api/danh-muc-can-bos")
@Transactional
public class DanhMucCanBoResource {

    private static final Logger log = LoggerFactory.getLogger(DanhMucCanBoResource.class);

    private static final String ENTITY_NAME = "danhMucCanBo";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final DanhMucCanBoRepository danhMucCanBoRepository;

    public DanhMucCanBoResource(DanhMucCanBoRepository danhMucCanBoRepository) {
        this.danhMucCanBoRepository = danhMucCanBoRepository;
    }

    /**
     * {@code POST  /danh-muc-can-bos} : Create a new danhMucCanBo.
     *
     * @param danhMucCanBo the danhMucCanBo to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new danhMucCanBo, or with status {@code 400 (Bad Request)} if the danhMucCanBo has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public Mono<ResponseEntity<DanhMucCanBo>> createDanhMucCanBo(@RequestBody DanhMucCanBo danhMucCanBo) throws URISyntaxException {
        log.debug("REST request to save DanhMucCanBo : {}", danhMucCanBo);
        if (danhMucCanBo.getId() != null) {
            throw new BadRequestAlertException("A new danhMucCanBo cannot already have an ID", ENTITY_NAME, "idexists");
        }
        return danhMucCanBoRepository
            .save(danhMucCanBo)
            .map(result -> {
                try {
                    return ResponseEntity.created(new URI("/api/danh-muc-can-bos/" + result.getId()))
                        .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
                        .body(result);
                } catch (URISyntaxException e) {
                    throw new RuntimeException(e);
                }
            });
    }

    /**
     * {@code PUT  /danh-muc-can-bos/:id} : Updates an existing danhMucCanBo.
     *
     * @param id the id of the danhMucCanBo to save.
     * @param danhMucCanBo the danhMucCanBo to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated danhMucCanBo,
     * or with status {@code 400 (Bad Request)} if the danhMucCanBo is not valid,
     * or with status {@code 500 (Internal Server Error)} if the danhMucCanBo couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public Mono<ResponseEntity<DanhMucCanBo>> updateDanhMucCanBo(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody DanhMucCanBo danhMucCanBo
    ) throws URISyntaxException {
        log.debug("REST request to update DanhMucCanBo : {}, {}", id, danhMucCanBo);
        if (danhMucCanBo.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, danhMucCanBo.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        return danhMucCanBoRepository
            .existsById(id)
            .flatMap(exists -> {
                if (!exists) {
                    return Mono.error(new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound"));
                }

                return danhMucCanBoRepository
                    .save(danhMucCanBo)
                    .switchIfEmpty(Mono.error(new ResponseStatusException(HttpStatus.NOT_FOUND)))
                    .map(
                        result ->
                            ResponseEntity.ok()
                                .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
                                .body(result)
                    );
            });
    }

    /**
     * {@code PATCH  /danh-muc-can-bos/:id} : Partial updates given fields of an existing danhMucCanBo, field will ignore if it is null
     *
     * @param id the id of the danhMucCanBo to save.
     * @param danhMucCanBo the danhMucCanBo to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated danhMucCanBo,
     * or with status {@code 400 (Bad Request)} if the danhMucCanBo is not valid,
     * or with status {@code 404 (Not Found)} if the danhMucCanBo is not found,
     * or with status {@code 500 (Internal Server Error)} if the danhMucCanBo couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public Mono<ResponseEntity<DanhMucCanBo>> partialUpdateDanhMucCanBo(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody DanhMucCanBo danhMucCanBo
    ) throws URISyntaxException {
        log.debug("REST request to partial update DanhMucCanBo partially : {}, {}", id, danhMucCanBo);
        if (danhMucCanBo.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, danhMucCanBo.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        return danhMucCanBoRepository
            .existsById(id)
            .flatMap(exists -> {
                if (!exists) {
                    return Mono.error(new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound"));
                }

                Mono<DanhMucCanBo> result = danhMucCanBoRepository
                    .findById(danhMucCanBo.getId())
                    .map(existingDanhMucCanBo -> {
                        if (danhMucCanBo.getIdCanBo() != null) {
                            existingDanhMucCanBo.setIdCanBo(danhMucCanBo.getIdCanBo());
                        }
                        if (danhMucCanBo.getTenCanBo() != null) {
                            existingDanhMucCanBo.setTenCanBo(danhMucCanBo.getTenCanBo());
                        }
                        if (danhMucCanBo.getDiaChi() != null) {
                            existingDanhMucCanBo.setDiaChi(danhMucCanBo.getDiaChi());
                        }
                        if (danhMucCanBo.getNamSinh() != null) {
                            existingDanhMucCanBo.setNamSinh(danhMucCanBo.getNamSinh());
                        }
                        if (danhMucCanBo.getEmail() != null) {
                            existingDanhMucCanBo.setEmail(danhMucCanBo.getEmail());
                        }
                        if (danhMucCanBo.getSoDienThoai() != null) {
                            existingDanhMucCanBo.setSoDienThoai(danhMucCanBo.getSoDienThoai());
                        }
                        if (danhMucCanBo.getSoCmnd() != null) {
                            existingDanhMucCanBo.setSoCmnd(danhMucCanBo.getSoCmnd());
                        }
                        if (danhMucCanBo.getIdDonVi() != null) {
                            existingDanhMucCanBo.setIdDonVi(danhMucCanBo.getIdDonVi());
                        }
                        if (danhMucCanBo.getTenDangNhap() != null) {
                            existingDanhMucCanBo.setTenDangNhap(danhMucCanBo.getTenDangNhap());
                        }
                        if (danhMucCanBo.getMatKhau() != null) {
                            existingDanhMucCanBo.setMatKhau(danhMucCanBo.getMatKhau());
                        }
                        if (danhMucCanBo.getTrangThai() != null) {
                            existingDanhMucCanBo.setTrangThai(danhMucCanBo.getTrangThai());
                        }
                        if (danhMucCanBo.getClientId() != null) {
                            existingDanhMucCanBo.setClientId(danhMucCanBo.getClientId());
                        }
                        if (danhMucCanBo.getClientSecret() != null) {
                            existingDanhMucCanBo.setClientSecret(danhMucCanBo.getClientSecret());
                        }
                        if (danhMucCanBo.getUsernameKyso() != null) {
                            existingDanhMucCanBo.setUsernameKyso(danhMucCanBo.getUsernameKyso());
                        }
                        if (danhMucCanBo.getPasswordKyso() != null) {
                            existingDanhMucCanBo.setPasswordKyso(danhMucCanBo.getPasswordKyso());
                        }

                        return existingDanhMucCanBo;
                    })
                    .flatMap(danhMucCanBoRepository::save);

                return result
                    .switchIfEmpty(Mono.error(new ResponseStatusException(HttpStatus.NOT_FOUND)))
                    .map(
                        res ->
                            ResponseEntity.ok()
                                .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, res.getId().toString()))
                                .body(res)
                    );
            });
    }

    /**
     * {@code GET  /danh-muc-can-bos} : get all the danhMucCanBos.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of danhMucCanBos in body.
     */
    @GetMapping(value = "", produces = MediaType.APPLICATION_JSON_VALUE)
    public Mono<List<DanhMucCanBo>> getAllDanhMucCanBos() {
        log.debug("REST request to get all DanhMucCanBos");
        return danhMucCanBoRepository.findAll().collectList();
    }

    /**
     * {@code GET  /danh-muc-can-bos} : get all the danhMucCanBos as a stream.
     * @return the {@link Flux} of danhMucCanBos.
     */
    @GetMapping(value = "", produces = MediaType.APPLICATION_NDJSON_VALUE)
    public Flux<DanhMucCanBo> getAllDanhMucCanBosAsStream() {
        log.debug("REST request to get all DanhMucCanBos as a stream");
        return danhMucCanBoRepository.findAll();
    }

    /**
     * {@code GET  /danh-muc-can-bos/:id} : get the "id" danhMucCanBo.
     *
     * @param id the id of the danhMucCanBo to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the danhMucCanBo, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public Mono<ResponseEntity<DanhMucCanBo>> getDanhMucCanBo(@PathVariable("id") Long id) {
        log.debug("REST request to get DanhMucCanBo : {}", id);
        Mono<DanhMucCanBo> danhMucCanBo = danhMucCanBoRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(danhMucCanBo);
    }

    /**
     * {@code DELETE  /danh-muc-can-bos/:id} : delete the "id" danhMucCanBo.
     *
     * @param id the id of the danhMucCanBo to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public Mono<ResponseEntity<Void>> deleteDanhMucCanBo(@PathVariable("id") Long id) {
        log.debug("REST request to delete DanhMucCanBo : {}", id);
        return danhMucCanBoRepository
            .deleteById(id)
            .then(
                Mono.just(
                    ResponseEntity.noContent()
                        .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
                        .build()
                )
            );
    }
}
