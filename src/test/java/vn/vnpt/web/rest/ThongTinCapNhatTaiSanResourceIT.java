package vn.vnpt.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.hamcrest.Matchers.is;
import static vn.vnpt.domain.ThongTinCapNhatTaiSanAsserts.*;
import static vn.vnpt.web.rest.TestUtil.createUpdateProxyForBean;

import com.fasterxml.jackson.databind.ObjectMapper;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.reactive.AutoConfigureWebTestClient;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.reactive.server.WebTestClient;
import vn.vnpt.IntegrationTest;
import vn.vnpt.domain.DanhMucLoaiTaiSan;
import vn.vnpt.domain.TaiSan;
import vn.vnpt.domain.ThongTinCapNhatTaiSan;
import vn.vnpt.repository.DanhMucLoaiTaiSanRepository;
import vn.vnpt.repository.EntityManager;
import vn.vnpt.repository.TaiSanRepository;
import vn.vnpt.repository.ThongTinCapNhatTaiSanRepository;
import vn.vnpt.service.dto.ThongTinCapNhatTaiSanDTO;
import vn.vnpt.service.mapper.ThongTinCapNhatTaiSanMapper;

/**
 * Integration tests for the {@link ThongTinCapNhatTaiSanResource} REST controller.
 */
@IntegrationTest
@AutoConfigureWebTestClient(timeout = IntegrationTest.DEFAULT_ENTITY_TIMEOUT)
@WithMockUser
class ThongTinCapNhatTaiSanResourceIT {

    private static final String DEFAULT_TEN_TAI_SAN = "AAAAAAAAAA";
    private static final String UPDATED_TEN_TAI_SAN = "BBBBBBBBBB";

    private static final String DEFAULT_THONG_TIN_TAI_SAN = "AAAAAAAAAA";
    private static final String UPDATED_THONG_TIN_TAI_SAN = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_NGAY_CAP_NHAT = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_NGAY_CAP_NHAT = LocalDate.now(ZoneId.systemDefault());
    private static final LocalDate SMALLER_NGAY_CAP_NHAT = LocalDate.ofEpochDay(-1L);

    private static final String ENTITY_API_URL = "/api/thong-tin-cap-nhat-tai-sans";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{idCapNhat}";

    private static Random random = new Random();
    private static AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private ObjectMapper om;

    @Autowired
    private ThongTinCapNhatTaiSanRepository thongTinCapNhatTaiSanRepository;

    @Autowired
    private ThongTinCapNhatTaiSanMapper thongTinCapNhatTaiSanMapper;

    @Autowired
    private EntityManager em;

    @Autowired
    private WebTestClient webTestClient;

    private ThongTinCapNhatTaiSan thongTinCapNhatTaiSan;

    private ThongTinCapNhatTaiSan insertedThongTinCapNhatTaiSan;

    @Autowired
    private TaiSanRepository taiSanRepository;

    @Autowired
    private DanhMucLoaiTaiSanRepository danhMucLoaiTaiSanRepository;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ThongTinCapNhatTaiSan createEntity() {
        return new ThongTinCapNhatTaiSan()
            .tenTaiSan(DEFAULT_TEN_TAI_SAN)
            .thongTinTaiSan(DEFAULT_THONG_TIN_TAI_SAN)
            .ngayCapNhat(DEFAULT_NGAY_CAP_NHAT);
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ThongTinCapNhatTaiSan createUpdatedEntity() {
        return new ThongTinCapNhatTaiSan()
            .tenTaiSan(UPDATED_TEN_TAI_SAN)
            .thongTinTaiSan(UPDATED_THONG_TIN_TAI_SAN)
            .ngayCapNhat(UPDATED_NGAY_CAP_NHAT);
    }

    public static void deleteEntities(EntityManager em) {
        try {
            em.deleteAll(ThongTinCapNhatTaiSan.class).block();
        } catch (Exception e) {
            // It can fail, if other entities are still referring this - it will be removed later.
        }
    }

    @BeforeEach
    public void initTest() {
        thongTinCapNhatTaiSan = createEntity();
    }

    @AfterEach
    public void cleanup() {
        if (insertedThongTinCapNhatTaiSan != null) {
            thongTinCapNhatTaiSanRepository.delete(insertedThongTinCapNhatTaiSan).block();
            insertedThongTinCapNhatTaiSan = null;
        }
        deleteEntities(em);
    }

    @Test
    void createThongTinCapNhatTaiSan() throws Exception {
        long databaseSizeBeforeCreate = getRepositoryCount();
        // Create the ThongTinCapNhatTaiSan
        ThongTinCapNhatTaiSanDTO thongTinCapNhatTaiSanDTO = thongTinCapNhatTaiSanMapper.toDto(thongTinCapNhatTaiSan);
        var returnedThongTinCapNhatTaiSanDTO = webTestClient
            .post()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(om.writeValueAsBytes(thongTinCapNhatTaiSanDTO))
            .exchange()
            .expectStatus()
            .isCreated()
            .expectBody(ThongTinCapNhatTaiSanDTO.class)
            .returnResult()
            .getResponseBody();

        // Validate the ThongTinCapNhatTaiSan in the database
        assertIncrementedRepositoryCount(databaseSizeBeforeCreate);
        var returnedThongTinCapNhatTaiSan = thongTinCapNhatTaiSanMapper.toEntity(returnedThongTinCapNhatTaiSanDTO);
        assertThongTinCapNhatTaiSanUpdatableFieldsEquals(
            returnedThongTinCapNhatTaiSan,
            getPersistedThongTinCapNhatTaiSan(returnedThongTinCapNhatTaiSan)
        );

        insertedThongTinCapNhatTaiSan = returnedThongTinCapNhatTaiSan;
    }

    @Test
    void createThongTinCapNhatTaiSanWithExistingId() throws Exception {
        // Create the ThongTinCapNhatTaiSan with an existing ID
        thongTinCapNhatTaiSan.setIdCapNhat(1L);
        ThongTinCapNhatTaiSanDTO thongTinCapNhatTaiSanDTO = thongTinCapNhatTaiSanMapper.toDto(thongTinCapNhatTaiSan);

        long databaseSizeBeforeCreate = getRepositoryCount();

        // An entity with an existing ID cannot be created, so this API call must fail
        webTestClient
            .post()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(om.writeValueAsBytes(thongTinCapNhatTaiSanDTO))
            .exchange()
            .expectStatus()
            .isBadRequest();

        // Validate the ThongTinCapNhatTaiSan in the database
        assertSameRepositoryCount(databaseSizeBeforeCreate);
    }

    @Test
    void getAllThongTinCapNhatTaiSans() {
        // Initialize the database
        insertedThongTinCapNhatTaiSan = thongTinCapNhatTaiSanRepository.save(thongTinCapNhatTaiSan).block();

        // Get all the thongTinCapNhatTaiSanList
        webTestClient
            .get()
            .uri(ENTITY_API_URL + "?sort=idCapNhat,desc")
            .accept(MediaType.APPLICATION_JSON)
            .exchange()
            .expectStatus()
            .isOk()
            .expectHeader()
            .contentType(MediaType.APPLICATION_JSON)
            .expectBody()
            .jsonPath("$.[*].idCapNhat")
            .value(hasItem(thongTinCapNhatTaiSan.getIdCapNhat().intValue()))
            .jsonPath("$.[*].tenTaiSan")
            .value(hasItem(DEFAULT_TEN_TAI_SAN))
            .jsonPath("$.[*].thongTinTaiSan")
            .value(hasItem(DEFAULT_THONG_TIN_TAI_SAN.toString()))
            .jsonPath("$.[*].ngayCapNhat")
            .value(hasItem(DEFAULT_NGAY_CAP_NHAT.toString()));
    }

    @Test
    void getThongTinCapNhatTaiSan() {
        // Initialize the database
        insertedThongTinCapNhatTaiSan = thongTinCapNhatTaiSanRepository.save(thongTinCapNhatTaiSan).block();

        // Get the thongTinCapNhatTaiSan
        webTestClient
            .get()
            .uri(ENTITY_API_URL_ID, thongTinCapNhatTaiSan.getIdCapNhat())
            .accept(MediaType.APPLICATION_JSON)
            .exchange()
            .expectStatus()
            .isOk()
            .expectHeader()
            .contentType(MediaType.APPLICATION_JSON)
            .expectBody()
            .jsonPath("$.idCapNhat")
            .value(is(thongTinCapNhatTaiSan.getIdCapNhat().intValue()))
            .jsonPath("$.tenTaiSan")
            .value(is(DEFAULT_TEN_TAI_SAN))
            .jsonPath("$.thongTinTaiSan")
            .value(is(DEFAULT_THONG_TIN_TAI_SAN.toString()))
            .jsonPath("$.ngayCapNhat")
            .value(is(DEFAULT_NGAY_CAP_NHAT.toString()));
    }

    @Test
    void getThongTinCapNhatTaiSansByIdFiltering() {
        // Initialize the database
        insertedThongTinCapNhatTaiSan = thongTinCapNhatTaiSanRepository.save(thongTinCapNhatTaiSan).block();

        Long id = thongTinCapNhatTaiSan.getIdCapNhat();

        defaultThongTinCapNhatTaiSanFiltering("idCapNhat.equals=" + id, "idCapNhat.notEquals=" + id);

        defaultThongTinCapNhatTaiSanFiltering("idCapNhat.greaterThanOrEqual=" + id, "idCapNhat.greaterThan=" + id);

        defaultThongTinCapNhatTaiSanFiltering("idCapNhat.lessThanOrEqual=" + id, "idCapNhat.lessThan=" + id);
    }

    @Test
    void getAllThongTinCapNhatTaiSansByTenTaiSanIsEqualToSomething() {
        // Initialize the database
        insertedThongTinCapNhatTaiSan = thongTinCapNhatTaiSanRepository.save(thongTinCapNhatTaiSan).block();

        // Get all the thongTinCapNhatTaiSanList where tenTaiSan equals to
        defaultThongTinCapNhatTaiSanFiltering("tenTaiSan.equals=" + DEFAULT_TEN_TAI_SAN, "tenTaiSan.equals=" + UPDATED_TEN_TAI_SAN);
    }

    @Test
    void getAllThongTinCapNhatTaiSansByTenTaiSanIsInShouldWork() {
        // Initialize the database
        insertedThongTinCapNhatTaiSan = thongTinCapNhatTaiSanRepository.save(thongTinCapNhatTaiSan).block();

        // Get all the thongTinCapNhatTaiSanList where tenTaiSan in
        defaultThongTinCapNhatTaiSanFiltering(
            "tenTaiSan.in=" + DEFAULT_TEN_TAI_SAN + "," + UPDATED_TEN_TAI_SAN,
            "tenTaiSan.in=" + UPDATED_TEN_TAI_SAN
        );
    }

    @Test
    void getAllThongTinCapNhatTaiSansByTenTaiSanIsNullOrNotNull() {
        // Initialize the database
        insertedThongTinCapNhatTaiSan = thongTinCapNhatTaiSanRepository.save(thongTinCapNhatTaiSan).block();

        // Get all the thongTinCapNhatTaiSanList where tenTaiSan is not null
        defaultThongTinCapNhatTaiSanFiltering("tenTaiSan.specified=true", "tenTaiSan.specified=false");
    }

    @Test
    void getAllThongTinCapNhatTaiSansByTenTaiSanContainsSomething() {
        // Initialize the database
        insertedThongTinCapNhatTaiSan = thongTinCapNhatTaiSanRepository.save(thongTinCapNhatTaiSan).block();

        // Get all the thongTinCapNhatTaiSanList where tenTaiSan contains
        defaultThongTinCapNhatTaiSanFiltering("tenTaiSan.contains=" + DEFAULT_TEN_TAI_SAN, "tenTaiSan.contains=" + UPDATED_TEN_TAI_SAN);
    }

    @Test
    void getAllThongTinCapNhatTaiSansByTenTaiSanNotContainsSomething() {
        // Initialize the database
        insertedThongTinCapNhatTaiSan = thongTinCapNhatTaiSanRepository.save(thongTinCapNhatTaiSan).block();

        // Get all the thongTinCapNhatTaiSanList where tenTaiSan does not contain
        defaultThongTinCapNhatTaiSanFiltering(
            "tenTaiSan.doesNotContain=" + UPDATED_TEN_TAI_SAN,
            "tenTaiSan.doesNotContain=" + DEFAULT_TEN_TAI_SAN
        );
    }

    @Test
    void getAllThongTinCapNhatTaiSansByNgayCapNhatIsEqualToSomething() {
        // Initialize the database
        insertedThongTinCapNhatTaiSan = thongTinCapNhatTaiSanRepository.save(thongTinCapNhatTaiSan).block();

        // Get all the thongTinCapNhatTaiSanList where ngayCapNhat equals to
        defaultThongTinCapNhatTaiSanFiltering("ngayCapNhat.equals=" + DEFAULT_NGAY_CAP_NHAT, "ngayCapNhat.equals=" + UPDATED_NGAY_CAP_NHAT);
    }

    @Test
    void getAllThongTinCapNhatTaiSansByNgayCapNhatIsInShouldWork() {
        // Initialize the database
        insertedThongTinCapNhatTaiSan = thongTinCapNhatTaiSanRepository.save(thongTinCapNhatTaiSan).block();

        // Get all the thongTinCapNhatTaiSanList where ngayCapNhat in
        defaultThongTinCapNhatTaiSanFiltering(
            "ngayCapNhat.in=" + DEFAULT_NGAY_CAP_NHAT + "," + UPDATED_NGAY_CAP_NHAT,
            "ngayCapNhat.in=" + UPDATED_NGAY_CAP_NHAT
        );
    }

    @Test
    void getAllThongTinCapNhatTaiSansByNgayCapNhatIsNullOrNotNull() {
        // Initialize the database
        insertedThongTinCapNhatTaiSan = thongTinCapNhatTaiSanRepository.save(thongTinCapNhatTaiSan).block();

        // Get all the thongTinCapNhatTaiSanList where ngayCapNhat is not null
        defaultThongTinCapNhatTaiSanFiltering("ngayCapNhat.specified=true", "ngayCapNhat.specified=false");
    }

    @Test
    void getAllThongTinCapNhatTaiSansByNgayCapNhatIsGreaterThanOrEqualToSomething() {
        // Initialize the database
        insertedThongTinCapNhatTaiSan = thongTinCapNhatTaiSanRepository.save(thongTinCapNhatTaiSan).block();

        // Get all the thongTinCapNhatTaiSanList where ngayCapNhat is greater than or equal to
        defaultThongTinCapNhatTaiSanFiltering(
            "ngayCapNhat.greaterThanOrEqual=" + DEFAULT_NGAY_CAP_NHAT,
            "ngayCapNhat.greaterThanOrEqual=" + UPDATED_NGAY_CAP_NHAT
        );
    }

    @Test
    void getAllThongTinCapNhatTaiSansByNgayCapNhatIsLessThanOrEqualToSomething() {
        // Initialize the database
        insertedThongTinCapNhatTaiSan = thongTinCapNhatTaiSanRepository.save(thongTinCapNhatTaiSan).block();

        // Get all the thongTinCapNhatTaiSanList where ngayCapNhat is less than or equal to
        defaultThongTinCapNhatTaiSanFiltering(
            "ngayCapNhat.lessThanOrEqual=" + DEFAULT_NGAY_CAP_NHAT,
            "ngayCapNhat.lessThanOrEqual=" + SMALLER_NGAY_CAP_NHAT
        );
    }

    @Test
    void getAllThongTinCapNhatTaiSansByNgayCapNhatIsLessThanSomething() {
        // Initialize the database
        insertedThongTinCapNhatTaiSan = thongTinCapNhatTaiSanRepository.save(thongTinCapNhatTaiSan).block();

        // Get all the thongTinCapNhatTaiSanList where ngayCapNhat is less than
        defaultThongTinCapNhatTaiSanFiltering(
            "ngayCapNhat.lessThan=" + UPDATED_NGAY_CAP_NHAT,
            "ngayCapNhat.lessThan=" + DEFAULT_NGAY_CAP_NHAT
        );
    }

    @Test
    void getAllThongTinCapNhatTaiSansByNgayCapNhatIsGreaterThanSomething() {
        // Initialize the database
        insertedThongTinCapNhatTaiSan = thongTinCapNhatTaiSanRepository.save(thongTinCapNhatTaiSan).block();

        // Get all the thongTinCapNhatTaiSanList where ngayCapNhat is greater than
        defaultThongTinCapNhatTaiSanFiltering(
            "ngayCapNhat.greaterThan=" + SMALLER_NGAY_CAP_NHAT,
            "ngayCapNhat.greaterThan=" + DEFAULT_NGAY_CAP_NHAT
        );
    }

    @Test
    void getAllThongTinCapNhatTaiSansByTaiSanIsEqualToSomething() {
        TaiSan taiSan = TaiSanResourceIT.createEntity();
        taiSanRepository.save(taiSan).block();
        Long taiSanId = taiSan.getIdTaiSan();
        thongTinCapNhatTaiSan.setTaiSanId(taiSanId);
        insertedThongTinCapNhatTaiSan = thongTinCapNhatTaiSanRepository.save(thongTinCapNhatTaiSan).block();
        // Get all the thongTinCapNhatTaiSanList where taiSan equals to taiSanId
        defaultThongTinCapNhatTaiSanShouldBeFound("taiSanId.equals=" + taiSanId);

        // Get all the thongTinCapNhatTaiSanList where taiSan equals to (taiSanId + 1)
        defaultThongTinCapNhatTaiSanShouldNotBeFound("taiSanId.equals=" + (taiSanId + 1));
    }

    @Test
    void getAllThongTinCapNhatTaiSansByDanhMucLoaiTaiSanIsEqualToSomething() {
        DanhMucLoaiTaiSan danhMucLoaiTaiSan = DanhMucLoaiTaiSanResourceIT.createEntity();
        danhMucLoaiTaiSanRepository.save(danhMucLoaiTaiSan).block();
        Long danhMucLoaiTaiSanId = danhMucLoaiTaiSan.getIdLoaiTs();
        thongTinCapNhatTaiSan.setDanhMucLoaiTaiSanId(danhMucLoaiTaiSanId);
        insertedThongTinCapNhatTaiSan = thongTinCapNhatTaiSanRepository.save(thongTinCapNhatTaiSan).block();
        // Get all the thongTinCapNhatTaiSanList where danhMucLoaiTaiSan equals to danhMucLoaiTaiSanId
        defaultThongTinCapNhatTaiSanShouldBeFound("danhMucLoaiTaiSanId.equals=" + danhMucLoaiTaiSanId);

        // Get all the thongTinCapNhatTaiSanList where danhMucLoaiTaiSan equals to (danhMucLoaiTaiSanId + 1)
        defaultThongTinCapNhatTaiSanShouldNotBeFound("danhMucLoaiTaiSanId.equals=" + (danhMucLoaiTaiSanId + 1));
    }

    private void defaultThongTinCapNhatTaiSanFiltering(String shouldBeFound, String shouldNotBeFound) {
        defaultThongTinCapNhatTaiSanShouldBeFound(shouldBeFound);
        defaultThongTinCapNhatTaiSanShouldNotBeFound(shouldNotBeFound);
    }

    /**
     * Executes the search, and checks that the default entity is returned.
     */
    private void defaultThongTinCapNhatTaiSanShouldBeFound(String filter) {
        webTestClient
            .get()
            .uri(ENTITY_API_URL + "?sort=idCapNhat,desc&" + filter)
            .accept(MediaType.APPLICATION_JSON)
            .exchange()
            .expectStatus()
            .isOk()
            .expectHeader()
            .contentType(MediaType.APPLICATION_JSON)
            .expectBody()
            .jsonPath("$.[*].idCapNhat")
            .value(hasItem(thongTinCapNhatTaiSan.getIdCapNhat().intValue()))
            .jsonPath("$.[*].tenTaiSan")
            .value(hasItem(DEFAULT_TEN_TAI_SAN))
            .jsonPath("$.[*].thongTinTaiSan")
            .value(hasItem(DEFAULT_THONG_TIN_TAI_SAN.toString()))
            .jsonPath("$.[*].ngayCapNhat")
            .value(hasItem(DEFAULT_NGAY_CAP_NHAT.toString()));

        // Check, that the count call also returns 1
        webTestClient
            .get()
            .uri(ENTITY_API_URL + "/count?sort=idCapNhat,desc&" + filter)
            .accept(MediaType.APPLICATION_JSON)
            .exchange()
            .expectStatus()
            .isOk()
            .expectHeader()
            .contentType(MediaType.APPLICATION_JSON)
            .expectBody()
            .jsonPath("$")
            .value(is(1));
    }

    /**
     * Executes the search, and checks that the default entity is not returned.
     */
    private void defaultThongTinCapNhatTaiSanShouldNotBeFound(String filter) {
        webTestClient
            .get()
            .uri(ENTITY_API_URL + "?sort=idCapNhat,desc&" + filter)
            .accept(MediaType.APPLICATION_JSON)
            .exchange()
            .expectStatus()
            .isOk()
            .expectHeader()
            .contentType(MediaType.APPLICATION_JSON)
            .expectBody()
            .jsonPath("$")
            .isArray()
            .jsonPath("$")
            .isEmpty();

        // Check, that the count call also returns 0
        webTestClient
            .get()
            .uri(ENTITY_API_URL + "/count?sort=idCapNhat,desc&" + filter)
            .accept(MediaType.APPLICATION_JSON)
            .exchange()
            .expectStatus()
            .isOk()
            .expectHeader()
            .contentType(MediaType.APPLICATION_JSON)
            .expectBody()
            .jsonPath("$")
            .value(is(0));
    }

    @Test
    void getNonExistingThongTinCapNhatTaiSan() {
        // Get the thongTinCapNhatTaiSan
        webTestClient
            .get()
            .uri(ENTITY_API_URL_ID, Long.MAX_VALUE)
            .accept(MediaType.APPLICATION_PROBLEM_JSON)
            .exchange()
            .expectStatus()
            .isNotFound();
    }

    @Test
    void putExistingThongTinCapNhatTaiSan() throws Exception {
        // Initialize the database
        insertedThongTinCapNhatTaiSan = thongTinCapNhatTaiSanRepository.save(thongTinCapNhatTaiSan).block();

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the thongTinCapNhatTaiSan
        ThongTinCapNhatTaiSan updatedThongTinCapNhatTaiSan = thongTinCapNhatTaiSanRepository
            .findById(thongTinCapNhatTaiSan.getIdCapNhat())
            .block();
        updatedThongTinCapNhatTaiSan
            .tenTaiSan(UPDATED_TEN_TAI_SAN)
            .thongTinTaiSan(UPDATED_THONG_TIN_TAI_SAN)
            .ngayCapNhat(UPDATED_NGAY_CAP_NHAT);
        ThongTinCapNhatTaiSanDTO thongTinCapNhatTaiSanDTO = thongTinCapNhatTaiSanMapper.toDto(updatedThongTinCapNhatTaiSan);

        webTestClient
            .put()
            .uri(ENTITY_API_URL_ID, thongTinCapNhatTaiSanDTO.getIdCapNhat())
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(om.writeValueAsBytes(thongTinCapNhatTaiSanDTO))
            .exchange()
            .expectStatus()
            .isOk();

        // Validate the ThongTinCapNhatTaiSan in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertPersistedThongTinCapNhatTaiSanToMatchAllProperties(updatedThongTinCapNhatTaiSan);
    }

    @Test
    void putNonExistingThongTinCapNhatTaiSan() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        thongTinCapNhatTaiSan.setIdCapNhat(longCount.incrementAndGet());

        // Create the ThongTinCapNhatTaiSan
        ThongTinCapNhatTaiSanDTO thongTinCapNhatTaiSanDTO = thongTinCapNhatTaiSanMapper.toDto(thongTinCapNhatTaiSan);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        webTestClient
            .put()
            .uri(ENTITY_API_URL_ID, thongTinCapNhatTaiSanDTO.getIdCapNhat())
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(om.writeValueAsBytes(thongTinCapNhatTaiSanDTO))
            .exchange()
            .expectStatus()
            .isBadRequest();

        // Validate the ThongTinCapNhatTaiSan in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithIdMismatchThongTinCapNhatTaiSan() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        thongTinCapNhatTaiSan.setIdCapNhat(longCount.incrementAndGet());

        // Create the ThongTinCapNhatTaiSan
        ThongTinCapNhatTaiSanDTO thongTinCapNhatTaiSanDTO = thongTinCapNhatTaiSanMapper.toDto(thongTinCapNhatTaiSan);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        webTestClient
            .put()
            .uri(ENTITY_API_URL_ID, longCount.incrementAndGet())
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(om.writeValueAsBytes(thongTinCapNhatTaiSanDTO))
            .exchange()
            .expectStatus()
            .isBadRequest();

        // Validate the ThongTinCapNhatTaiSan in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithMissingIdPathParamThongTinCapNhatTaiSan() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        thongTinCapNhatTaiSan.setIdCapNhat(longCount.incrementAndGet());

        // Create the ThongTinCapNhatTaiSan
        ThongTinCapNhatTaiSanDTO thongTinCapNhatTaiSanDTO = thongTinCapNhatTaiSanMapper.toDto(thongTinCapNhatTaiSan);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        webTestClient
            .put()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(om.writeValueAsBytes(thongTinCapNhatTaiSanDTO))
            .exchange()
            .expectStatus()
            .isEqualTo(405);

        // Validate the ThongTinCapNhatTaiSan in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void partialUpdateThongTinCapNhatTaiSanWithPatch() throws Exception {
        // Initialize the database
        insertedThongTinCapNhatTaiSan = thongTinCapNhatTaiSanRepository.save(thongTinCapNhatTaiSan).block();

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the thongTinCapNhatTaiSan using partial update
        ThongTinCapNhatTaiSan partialUpdatedThongTinCapNhatTaiSan = new ThongTinCapNhatTaiSan();
        partialUpdatedThongTinCapNhatTaiSan.setIdCapNhat(thongTinCapNhatTaiSan.getIdCapNhat());

        partialUpdatedThongTinCapNhatTaiSan.thongTinTaiSan(UPDATED_THONG_TIN_TAI_SAN).ngayCapNhat(UPDATED_NGAY_CAP_NHAT);

        webTestClient
            .patch()
            .uri(ENTITY_API_URL_ID, partialUpdatedThongTinCapNhatTaiSan.getIdCapNhat())
            .contentType(MediaType.valueOf("application/merge-patch+json"))
            .bodyValue(om.writeValueAsBytes(partialUpdatedThongTinCapNhatTaiSan))
            .exchange()
            .expectStatus()
            .isOk();

        // Validate the ThongTinCapNhatTaiSan in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertThongTinCapNhatTaiSanUpdatableFieldsEquals(
            createUpdateProxyForBean(partialUpdatedThongTinCapNhatTaiSan, thongTinCapNhatTaiSan),
            getPersistedThongTinCapNhatTaiSan(thongTinCapNhatTaiSan)
        );
    }

    @Test
    void fullUpdateThongTinCapNhatTaiSanWithPatch() throws Exception {
        // Initialize the database
        insertedThongTinCapNhatTaiSan = thongTinCapNhatTaiSanRepository.save(thongTinCapNhatTaiSan).block();

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the thongTinCapNhatTaiSan using partial update
        ThongTinCapNhatTaiSan partialUpdatedThongTinCapNhatTaiSan = new ThongTinCapNhatTaiSan();
        partialUpdatedThongTinCapNhatTaiSan.setIdCapNhat(thongTinCapNhatTaiSan.getIdCapNhat());

        partialUpdatedThongTinCapNhatTaiSan
            .tenTaiSan(UPDATED_TEN_TAI_SAN)
            .thongTinTaiSan(UPDATED_THONG_TIN_TAI_SAN)
            .ngayCapNhat(UPDATED_NGAY_CAP_NHAT);

        webTestClient
            .patch()
            .uri(ENTITY_API_URL_ID, partialUpdatedThongTinCapNhatTaiSan.getIdCapNhat())
            .contentType(MediaType.valueOf("application/merge-patch+json"))
            .bodyValue(om.writeValueAsBytes(partialUpdatedThongTinCapNhatTaiSan))
            .exchange()
            .expectStatus()
            .isOk();

        // Validate the ThongTinCapNhatTaiSan in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertThongTinCapNhatTaiSanUpdatableFieldsEquals(
            partialUpdatedThongTinCapNhatTaiSan,
            getPersistedThongTinCapNhatTaiSan(partialUpdatedThongTinCapNhatTaiSan)
        );
    }

    @Test
    void patchNonExistingThongTinCapNhatTaiSan() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        thongTinCapNhatTaiSan.setIdCapNhat(longCount.incrementAndGet());

        // Create the ThongTinCapNhatTaiSan
        ThongTinCapNhatTaiSanDTO thongTinCapNhatTaiSanDTO = thongTinCapNhatTaiSanMapper.toDto(thongTinCapNhatTaiSan);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        webTestClient
            .patch()
            .uri(ENTITY_API_URL_ID, thongTinCapNhatTaiSanDTO.getIdCapNhat())
            .contentType(MediaType.valueOf("application/merge-patch+json"))
            .bodyValue(om.writeValueAsBytes(thongTinCapNhatTaiSanDTO))
            .exchange()
            .expectStatus()
            .isBadRequest();

        // Validate the ThongTinCapNhatTaiSan in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithIdMismatchThongTinCapNhatTaiSan() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        thongTinCapNhatTaiSan.setIdCapNhat(longCount.incrementAndGet());

        // Create the ThongTinCapNhatTaiSan
        ThongTinCapNhatTaiSanDTO thongTinCapNhatTaiSanDTO = thongTinCapNhatTaiSanMapper.toDto(thongTinCapNhatTaiSan);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        webTestClient
            .patch()
            .uri(ENTITY_API_URL_ID, longCount.incrementAndGet())
            .contentType(MediaType.valueOf("application/merge-patch+json"))
            .bodyValue(om.writeValueAsBytes(thongTinCapNhatTaiSanDTO))
            .exchange()
            .expectStatus()
            .isBadRequest();

        // Validate the ThongTinCapNhatTaiSan in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithMissingIdPathParamThongTinCapNhatTaiSan() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        thongTinCapNhatTaiSan.setIdCapNhat(longCount.incrementAndGet());

        // Create the ThongTinCapNhatTaiSan
        ThongTinCapNhatTaiSanDTO thongTinCapNhatTaiSanDTO = thongTinCapNhatTaiSanMapper.toDto(thongTinCapNhatTaiSan);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        webTestClient
            .patch()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.valueOf("application/merge-patch+json"))
            .bodyValue(om.writeValueAsBytes(thongTinCapNhatTaiSanDTO))
            .exchange()
            .expectStatus()
            .isEqualTo(405);

        // Validate the ThongTinCapNhatTaiSan in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void deleteThongTinCapNhatTaiSan() {
        // Initialize the database
        insertedThongTinCapNhatTaiSan = thongTinCapNhatTaiSanRepository.save(thongTinCapNhatTaiSan).block();

        long databaseSizeBeforeDelete = getRepositoryCount();

        // Delete the thongTinCapNhatTaiSan
        webTestClient
            .delete()
            .uri(ENTITY_API_URL_ID, thongTinCapNhatTaiSan.getIdCapNhat())
            .accept(MediaType.APPLICATION_JSON)
            .exchange()
            .expectStatus()
            .isNoContent();

        // Validate the database contains one less item
        assertDecrementedRepositoryCount(databaseSizeBeforeDelete);
    }

    protected long getRepositoryCount() {
        return thongTinCapNhatTaiSanRepository.count().block();
    }

    protected void assertIncrementedRepositoryCount(long countBefore) {
        assertThat(countBefore + 1).isEqualTo(getRepositoryCount());
    }

    protected void assertDecrementedRepositoryCount(long countBefore) {
        assertThat(countBefore - 1).isEqualTo(getRepositoryCount());
    }

    protected void assertSameRepositoryCount(long countBefore) {
        assertThat(countBefore).isEqualTo(getRepositoryCount());
    }

    protected ThongTinCapNhatTaiSan getPersistedThongTinCapNhatTaiSan(ThongTinCapNhatTaiSan thongTinCapNhatTaiSan) {
        return thongTinCapNhatTaiSanRepository.findById(thongTinCapNhatTaiSan.getIdCapNhat()).block();
    }

    protected void assertPersistedThongTinCapNhatTaiSanToMatchAllProperties(ThongTinCapNhatTaiSan expectedThongTinCapNhatTaiSan) {
        // Test fails because reactive api returns an empty object instead of null
        // assertThongTinCapNhatTaiSanAllPropertiesEquals(expectedThongTinCapNhatTaiSan, getPersistedThongTinCapNhatTaiSan(expectedThongTinCapNhatTaiSan));
        assertThongTinCapNhatTaiSanUpdatableFieldsEquals(
            expectedThongTinCapNhatTaiSan,
            getPersistedThongTinCapNhatTaiSan(expectedThongTinCapNhatTaiSan)
        );
    }

    protected void assertPersistedThongTinCapNhatTaiSanToMatchUpdatableProperties(ThongTinCapNhatTaiSan expectedThongTinCapNhatTaiSan) {
        // Test fails because reactive api returns an empty object instead of null
        // assertThongTinCapNhatTaiSanAllUpdatablePropertiesEquals(expectedThongTinCapNhatTaiSan, getPersistedThongTinCapNhatTaiSan(expectedThongTinCapNhatTaiSan));
        assertThongTinCapNhatTaiSanUpdatableFieldsEquals(
            expectedThongTinCapNhatTaiSan,
            getPersistedThongTinCapNhatTaiSan(expectedThongTinCapNhatTaiSan)
        );
    }
}
