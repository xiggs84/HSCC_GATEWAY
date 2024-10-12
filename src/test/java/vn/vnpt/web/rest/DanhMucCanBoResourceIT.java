package vn.vnpt.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.hamcrest.Matchers.is;
import static vn.vnpt.domain.DanhMucCanBoAsserts.*;
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
import vn.vnpt.domain.DanhMucCanBo;
import vn.vnpt.repository.DanhMucCanBoRepository;
import vn.vnpt.repository.EntityManager;
import vn.vnpt.service.dto.DanhMucCanBoDTO;
import vn.vnpt.service.mapper.DanhMucCanBoMapper;

/**
 * Integration tests for the {@link DanhMucCanBoResource} REST controller.
 */
@IntegrationTest
@AutoConfigureWebTestClient(timeout = IntegrationTest.DEFAULT_ENTITY_TIMEOUT)
@WithMockUser
class DanhMucCanBoResourceIT {

    private static final String DEFAULT_TEN_CAN_BO = "AAAAAAAAAA";
    private static final String UPDATED_TEN_CAN_BO = "BBBBBBBBBB";

    private static final String DEFAULT_DIA_CHI = "AAAAAAAAAA";
    private static final String UPDATED_DIA_CHI = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_NAM_SINH = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_NAM_SINH = LocalDate.now(ZoneId.systemDefault());
    private static final LocalDate SMALLER_NAM_SINH = LocalDate.ofEpochDay(-1L);

    private static final String DEFAULT_EMAIL = "AAAAAAAAAA";
    private static final String UPDATED_EMAIL = "BBBBBBBBBB";

    private static final String DEFAULT_SO_DIEN_THOAI = "AAAAAAAAAA";
    private static final String UPDATED_SO_DIEN_THOAI = "BBBBBBBBBB";

    private static final String DEFAULT_SO_GIAY_TO_TUY_THAN = "AAAAAAAAAA";
    private static final String UPDATED_SO_GIAY_TO_TUY_THAN = "BBBBBBBBBB";

    private static final Long DEFAULT_ID_DON_VI = 1L;
    private static final Long UPDATED_ID_DON_VI = 2L;
    private static final Long SMALLER_ID_DON_VI = 1L - 1L;

    private static final String DEFAULT_TEN_DANG_NHAP = "AAAAAAAAAA";
    private static final String UPDATED_TEN_DANG_NHAP = "BBBBBBBBBB";

    private static final String DEFAULT_MAT_KHAU = "AAAAAAAAAA";
    private static final String UPDATED_MAT_KHAU = "BBBBBBBBBB";

    private static final Long DEFAULT_TRANG_THAI = 1L;
    private static final Long UPDATED_TRANG_THAI = 2L;
    private static final Long SMALLER_TRANG_THAI = 1L - 1L;

    private static final String DEFAULT_CLIENT_ID = "AAAAAAAAAA";
    private static final String UPDATED_CLIENT_ID = "BBBBBBBBBB";

    private static final String DEFAULT_CLIENT_SECRET = "AAAAAAAAAA";
    private static final String UPDATED_CLIENT_SECRET = "BBBBBBBBBB";

    private static final String DEFAULT_USERNAME_KYSO = "AAAAAAAAAA";
    private static final String UPDATED_USERNAME_KYSO = "BBBBBBBBBB";

    private static final String DEFAULT_PASSWORD_KYSO = "AAAAAAAAAA";
    private static final String UPDATED_PASSWORD_KYSO = "BBBBBBBBBB";

    private static final String DEFAULT_USER_LOGIN = "AAAAAAAAAA";
    private static final String UPDATED_USER_LOGIN = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/danh-muc-can-bos";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{idCanBo}";

    private static Random random = new Random();
    private static AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private ObjectMapper om;

    @Autowired
    private DanhMucCanBoRepository danhMucCanBoRepository;

    @Autowired
    private DanhMucCanBoMapper danhMucCanBoMapper;

    @Autowired
    private EntityManager em;

    @Autowired
    private WebTestClient webTestClient;

    private DanhMucCanBo danhMucCanBo;

    private DanhMucCanBo insertedDanhMucCanBo;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static DanhMucCanBo createEntity() {
        return new DanhMucCanBo()
            .tenCanBo(DEFAULT_TEN_CAN_BO)
            .diaChi(DEFAULT_DIA_CHI)
            .namSinh(DEFAULT_NAM_SINH)
            .email(DEFAULT_EMAIL)
            .soDienThoai(DEFAULT_SO_DIEN_THOAI)
            .soGiayToTuyThan(DEFAULT_SO_GIAY_TO_TUY_THAN)
            .idDonVi(DEFAULT_ID_DON_VI)
            .tenDangNhap(DEFAULT_TEN_DANG_NHAP)
            .matKhau(DEFAULT_MAT_KHAU)
            .trangThai(DEFAULT_TRANG_THAI)
            .clientId(DEFAULT_CLIENT_ID)
            .clientSecret(DEFAULT_CLIENT_SECRET)
            .usernameKyso(DEFAULT_USERNAME_KYSO)
            .passwordKyso(DEFAULT_PASSWORD_KYSO)
            .userLogin(DEFAULT_USER_LOGIN);
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static DanhMucCanBo createUpdatedEntity() {
        return new DanhMucCanBo()
            .tenCanBo(UPDATED_TEN_CAN_BO)
            .diaChi(UPDATED_DIA_CHI)
            .namSinh(UPDATED_NAM_SINH)
            .email(UPDATED_EMAIL)
            .soDienThoai(UPDATED_SO_DIEN_THOAI)
            .soGiayToTuyThan(UPDATED_SO_GIAY_TO_TUY_THAN)
            .idDonVi(UPDATED_ID_DON_VI)
            .tenDangNhap(UPDATED_TEN_DANG_NHAP)
            .matKhau(UPDATED_MAT_KHAU)
            .trangThai(UPDATED_TRANG_THAI)
            .clientId(UPDATED_CLIENT_ID)
            .clientSecret(UPDATED_CLIENT_SECRET)
            .usernameKyso(UPDATED_USERNAME_KYSO)
            .passwordKyso(UPDATED_PASSWORD_KYSO)
            .userLogin(UPDATED_USER_LOGIN);
    }

    public static void deleteEntities(EntityManager em) {
        try {
            em.deleteAll(DanhMucCanBo.class).block();
        } catch (Exception e) {
            // It can fail, if other entities are still referring this - it will be removed later.
        }
    }

    @BeforeEach
    public void initTest() {
        danhMucCanBo = createEntity();
    }

    @AfterEach
    public void cleanup() {
        if (insertedDanhMucCanBo != null) {
            danhMucCanBoRepository.delete(insertedDanhMucCanBo).block();
            insertedDanhMucCanBo = null;
        }
        deleteEntities(em);
    }

    @Test
    void createDanhMucCanBo() throws Exception {
        long databaseSizeBeforeCreate = getRepositoryCount();
        // Create the DanhMucCanBo
        DanhMucCanBoDTO danhMucCanBoDTO = danhMucCanBoMapper.toDto(danhMucCanBo);
        var returnedDanhMucCanBoDTO = webTestClient
            .post()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(om.writeValueAsBytes(danhMucCanBoDTO))
            .exchange()
            .expectStatus()
            .isCreated()
            .expectBody(DanhMucCanBoDTO.class)
            .returnResult()
            .getResponseBody();

        // Validate the DanhMucCanBo in the database
        assertIncrementedRepositoryCount(databaseSizeBeforeCreate);
        var returnedDanhMucCanBo = danhMucCanBoMapper.toEntity(returnedDanhMucCanBoDTO);
        assertDanhMucCanBoUpdatableFieldsEquals(returnedDanhMucCanBo, getPersistedDanhMucCanBo(returnedDanhMucCanBo));

        insertedDanhMucCanBo = returnedDanhMucCanBo;
    }

    @Test
    void createDanhMucCanBoWithExistingId() throws Exception {
        // Create the DanhMucCanBo with an existing ID
        danhMucCanBo.setIdCanBo(1L);
        DanhMucCanBoDTO danhMucCanBoDTO = danhMucCanBoMapper.toDto(danhMucCanBo);

        long databaseSizeBeforeCreate = getRepositoryCount();

        // An entity with an existing ID cannot be created, so this API call must fail
        webTestClient
            .post()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(om.writeValueAsBytes(danhMucCanBoDTO))
            .exchange()
            .expectStatus()
            .isBadRequest();

        // Validate the DanhMucCanBo in the database
        assertSameRepositoryCount(databaseSizeBeforeCreate);
    }

    @Test
    void getAllDanhMucCanBos() {
        // Initialize the database
        insertedDanhMucCanBo = danhMucCanBoRepository.save(danhMucCanBo).block();

        // Get all the danhMucCanBoList
        webTestClient
            .get()
            .uri(ENTITY_API_URL + "?sort=idCanBo,desc")
            .accept(MediaType.APPLICATION_JSON)
            .exchange()
            .expectStatus()
            .isOk()
            .expectHeader()
            .contentType(MediaType.APPLICATION_JSON)
            .expectBody()
            .jsonPath("$.[*].idCanBo")
            .value(hasItem(danhMucCanBo.getIdCanBo().intValue()))
            .jsonPath("$.[*].tenCanBo")
            .value(hasItem(DEFAULT_TEN_CAN_BO))
            .jsonPath("$.[*].diaChi")
            .value(hasItem(DEFAULT_DIA_CHI))
            .jsonPath("$.[*].namSinh")
            .value(hasItem(DEFAULT_NAM_SINH.toString()))
            .jsonPath("$.[*].email")
            .value(hasItem(DEFAULT_EMAIL))
            .jsonPath("$.[*].soDienThoai")
            .value(hasItem(DEFAULT_SO_DIEN_THOAI))
            .jsonPath("$.[*].soGiayToTuyThan")
            .value(hasItem(DEFAULT_SO_GIAY_TO_TUY_THAN))
            .jsonPath("$.[*].idDonVi")
            .value(hasItem(DEFAULT_ID_DON_VI.intValue()))
            .jsonPath("$.[*].tenDangNhap")
            .value(hasItem(DEFAULT_TEN_DANG_NHAP))
            .jsonPath("$.[*].matKhau")
            .value(hasItem(DEFAULT_MAT_KHAU))
            .jsonPath("$.[*].trangThai")
            .value(hasItem(DEFAULT_TRANG_THAI.intValue()))
            .jsonPath("$.[*].clientId")
            .value(hasItem(DEFAULT_CLIENT_ID))
            .jsonPath("$.[*].clientSecret")
            .value(hasItem(DEFAULT_CLIENT_SECRET))
            .jsonPath("$.[*].usernameKyso")
            .value(hasItem(DEFAULT_USERNAME_KYSO))
            .jsonPath("$.[*].passwordKyso")
            .value(hasItem(DEFAULT_PASSWORD_KYSO))
            .jsonPath("$.[*].userLogin")
            .value(hasItem(DEFAULT_USER_LOGIN));
    }

    @Test
    void getDanhMucCanBo() {
        // Initialize the database
        insertedDanhMucCanBo = danhMucCanBoRepository.save(danhMucCanBo).block();

        // Get the danhMucCanBo
        webTestClient
            .get()
            .uri(ENTITY_API_URL_ID, danhMucCanBo.getIdCanBo())
            .accept(MediaType.APPLICATION_JSON)
            .exchange()
            .expectStatus()
            .isOk()
            .expectHeader()
            .contentType(MediaType.APPLICATION_JSON)
            .expectBody()
            .jsonPath("$.idCanBo")
            .value(is(danhMucCanBo.getIdCanBo().intValue()))
            .jsonPath("$.tenCanBo")
            .value(is(DEFAULT_TEN_CAN_BO))
            .jsonPath("$.diaChi")
            .value(is(DEFAULT_DIA_CHI))
            .jsonPath("$.namSinh")
            .value(is(DEFAULT_NAM_SINH.toString()))
            .jsonPath("$.email")
            .value(is(DEFAULT_EMAIL))
            .jsonPath("$.soDienThoai")
            .value(is(DEFAULT_SO_DIEN_THOAI))
            .jsonPath("$.soGiayToTuyThan")
            .value(is(DEFAULT_SO_GIAY_TO_TUY_THAN))
            .jsonPath("$.idDonVi")
            .value(is(DEFAULT_ID_DON_VI.intValue()))
            .jsonPath("$.tenDangNhap")
            .value(is(DEFAULT_TEN_DANG_NHAP))
            .jsonPath("$.matKhau")
            .value(is(DEFAULT_MAT_KHAU))
            .jsonPath("$.trangThai")
            .value(is(DEFAULT_TRANG_THAI.intValue()))
            .jsonPath("$.clientId")
            .value(is(DEFAULT_CLIENT_ID))
            .jsonPath("$.clientSecret")
            .value(is(DEFAULT_CLIENT_SECRET))
            .jsonPath("$.usernameKyso")
            .value(is(DEFAULT_USERNAME_KYSO))
            .jsonPath("$.passwordKyso")
            .value(is(DEFAULT_PASSWORD_KYSO))
            .jsonPath("$.userLogin")
            .value(is(DEFAULT_USER_LOGIN));
    }

    @Test
    void getDanhMucCanBosByIdFiltering() {
        // Initialize the database
        insertedDanhMucCanBo = danhMucCanBoRepository.save(danhMucCanBo).block();

        Long id = danhMucCanBo.getIdCanBo();

        defaultDanhMucCanBoFiltering("idCanBo.equals=" + id, "idCanBo.notEquals=" + id);

        defaultDanhMucCanBoFiltering("idCanBo.greaterThanOrEqual=" + id, "idCanBo.greaterThan=" + id);

        defaultDanhMucCanBoFiltering("idCanBo.lessThanOrEqual=" + id, "idCanBo.lessThan=" + id);
    }

    @Test
    void getAllDanhMucCanBosByTenCanBoIsEqualToSomething() {
        // Initialize the database
        insertedDanhMucCanBo = danhMucCanBoRepository.save(danhMucCanBo).block();

        // Get all the danhMucCanBoList where tenCanBo equals to
        defaultDanhMucCanBoFiltering("tenCanBo.equals=" + DEFAULT_TEN_CAN_BO, "tenCanBo.equals=" + UPDATED_TEN_CAN_BO);
    }

    @Test
    void getAllDanhMucCanBosByTenCanBoIsInShouldWork() {
        // Initialize the database
        insertedDanhMucCanBo = danhMucCanBoRepository.save(danhMucCanBo).block();

        // Get all the danhMucCanBoList where tenCanBo in
        defaultDanhMucCanBoFiltering("tenCanBo.in=" + DEFAULT_TEN_CAN_BO + "," + UPDATED_TEN_CAN_BO, "tenCanBo.in=" + UPDATED_TEN_CAN_BO);
    }

    @Test
    void getAllDanhMucCanBosByTenCanBoIsNullOrNotNull() {
        // Initialize the database
        insertedDanhMucCanBo = danhMucCanBoRepository.save(danhMucCanBo).block();

        // Get all the danhMucCanBoList where tenCanBo is not null
        defaultDanhMucCanBoFiltering("tenCanBo.specified=true", "tenCanBo.specified=false");
    }

    @Test
    void getAllDanhMucCanBosByTenCanBoContainsSomething() {
        // Initialize the database
        insertedDanhMucCanBo = danhMucCanBoRepository.save(danhMucCanBo).block();

        // Get all the danhMucCanBoList where tenCanBo contains
        defaultDanhMucCanBoFiltering("tenCanBo.contains=" + DEFAULT_TEN_CAN_BO, "tenCanBo.contains=" + UPDATED_TEN_CAN_BO);
    }

    @Test
    void getAllDanhMucCanBosByTenCanBoNotContainsSomething() {
        // Initialize the database
        insertedDanhMucCanBo = danhMucCanBoRepository.save(danhMucCanBo).block();

        // Get all the danhMucCanBoList where tenCanBo does not contain
        defaultDanhMucCanBoFiltering("tenCanBo.doesNotContain=" + UPDATED_TEN_CAN_BO, "tenCanBo.doesNotContain=" + DEFAULT_TEN_CAN_BO);
    }

    @Test
    void getAllDanhMucCanBosByDiaChiIsEqualToSomething() {
        // Initialize the database
        insertedDanhMucCanBo = danhMucCanBoRepository.save(danhMucCanBo).block();

        // Get all the danhMucCanBoList where diaChi equals to
        defaultDanhMucCanBoFiltering("diaChi.equals=" + DEFAULT_DIA_CHI, "diaChi.equals=" + UPDATED_DIA_CHI);
    }

    @Test
    void getAllDanhMucCanBosByDiaChiIsInShouldWork() {
        // Initialize the database
        insertedDanhMucCanBo = danhMucCanBoRepository.save(danhMucCanBo).block();

        // Get all the danhMucCanBoList where diaChi in
        defaultDanhMucCanBoFiltering("diaChi.in=" + DEFAULT_DIA_CHI + "," + UPDATED_DIA_CHI, "diaChi.in=" + UPDATED_DIA_CHI);
    }

    @Test
    void getAllDanhMucCanBosByDiaChiIsNullOrNotNull() {
        // Initialize the database
        insertedDanhMucCanBo = danhMucCanBoRepository.save(danhMucCanBo).block();

        // Get all the danhMucCanBoList where diaChi is not null
        defaultDanhMucCanBoFiltering("diaChi.specified=true", "diaChi.specified=false");
    }

    @Test
    void getAllDanhMucCanBosByDiaChiContainsSomething() {
        // Initialize the database
        insertedDanhMucCanBo = danhMucCanBoRepository.save(danhMucCanBo).block();

        // Get all the danhMucCanBoList where diaChi contains
        defaultDanhMucCanBoFiltering("diaChi.contains=" + DEFAULT_DIA_CHI, "diaChi.contains=" + UPDATED_DIA_CHI);
    }

    @Test
    void getAllDanhMucCanBosByDiaChiNotContainsSomething() {
        // Initialize the database
        insertedDanhMucCanBo = danhMucCanBoRepository.save(danhMucCanBo).block();

        // Get all the danhMucCanBoList where diaChi does not contain
        defaultDanhMucCanBoFiltering("diaChi.doesNotContain=" + UPDATED_DIA_CHI, "diaChi.doesNotContain=" + DEFAULT_DIA_CHI);
    }

    @Test
    void getAllDanhMucCanBosByNamSinhIsEqualToSomething() {
        // Initialize the database
        insertedDanhMucCanBo = danhMucCanBoRepository.save(danhMucCanBo).block();

        // Get all the danhMucCanBoList where namSinh equals to
        defaultDanhMucCanBoFiltering("namSinh.equals=" + DEFAULT_NAM_SINH, "namSinh.equals=" + UPDATED_NAM_SINH);
    }

    @Test
    void getAllDanhMucCanBosByNamSinhIsInShouldWork() {
        // Initialize the database
        insertedDanhMucCanBo = danhMucCanBoRepository.save(danhMucCanBo).block();

        // Get all the danhMucCanBoList where namSinh in
        defaultDanhMucCanBoFiltering("namSinh.in=" + DEFAULT_NAM_SINH + "," + UPDATED_NAM_SINH, "namSinh.in=" + UPDATED_NAM_SINH);
    }

    @Test
    void getAllDanhMucCanBosByNamSinhIsNullOrNotNull() {
        // Initialize the database
        insertedDanhMucCanBo = danhMucCanBoRepository.save(danhMucCanBo).block();

        // Get all the danhMucCanBoList where namSinh is not null
        defaultDanhMucCanBoFiltering("namSinh.specified=true", "namSinh.specified=false");
    }

    @Test
    void getAllDanhMucCanBosByNamSinhIsGreaterThanOrEqualToSomething() {
        // Initialize the database
        insertedDanhMucCanBo = danhMucCanBoRepository.save(danhMucCanBo).block();

        // Get all the danhMucCanBoList where namSinh is greater than or equal to
        defaultDanhMucCanBoFiltering("namSinh.greaterThanOrEqual=" + DEFAULT_NAM_SINH, "namSinh.greaterThanOrEqual=" + UPDATED_NAM_SINH);
    }

    @Test
    void getAllDanhMucCanBosByNamSinhIsLessThanOrEqualToSomething() {
        // Initialize the database
        insertedDanhMucCanBo = danhMucCanBoRepository.save(danhMucCanBo).block();

        // Get all the danhMucCanBoList where namSinh is less than or equal to
        defaultDanhMucCanBoFiltering("namSinh.lessThanOrEqual=" + DEFAULT_NAM_SINH, "namSinh.lessThanOrEqual=" + SMALLER_NAM_SINH);
    }

    @Test
    void getAllDanhMucCanBosByNamSinhIsLessThanSomething() {
        // Initialize the database
        insertedDanhMucCanBo = danhMucCanBoRepository.save(danhMucCanBo).block();

        // Get all the danhMucCanBoList where namSinh is less than
        defaultDanhMucCanBoFiltering("namSinh.lessThan=" + UPDATED_NAM_SINH, "namSinh.lessThan=" + DEFAULT_NAM_SINH);
    }

    @Test
    void getAllDanhMucCanBosByNamSinhIsGreaterThanSomething() {
        // Initialize the database
        insertedDanhMucCanBo = danhMucCanBoRepository.save(danhMucCanBo).block();

        // Get all the danhMucCanBoList where namSinh is greater than
        defaultDanhMucCanBoFiltering("namSinh.greaterThan=" + SMALLER_NAM_SINH, "namSinh.greaterThan=" + DEFAULT_NAM_SINH);
    }

    @Test
    void getAllDanhMucCanBosByEmailIsEqualToSomething() {
        // Initialize the database
        insertedDanhMucCanBo = danhMucCanBoRepository.save(danhMucCanBo).block();

        // Get all the danhMucCanBoList where email equals to
        defaultDanhMucCanBoFiltering("email.equals=" + DEFAULT_EMAIL, "email.equals=" + UPDATED_EMAIL);
    }

    @Test
    void getAllDanhMucCanBosByEmailIsInShouldWork() {
        // Initialize the database
        insertedDanhMucCanBo = danhMucCanBoRepository.save(danhMucCanBo).block();

        // Get all the danhMucCanBoList where email in
        defaultDanhMucCanBoFiltering("email.in=" + DEFAULT_EMAIL + "," + UPDATED_EMAIL, "email.in=" + UPDATED_EMAIL);
    }

    @Test
    void getAllDanhMucCanBosByEmailIsNullOrNotNull() {
        // Initialize the database
        insertedDanhMucCanBo = danhMucCanBoRepository.save(danhMucCanBo).block();

        // Get all the danhMucCanBoList where email is not null
        defaultDanhMucCanBoFiltering("email.specified=true", "email.specified=false");
    }

    @Test
    void getAllDanhMucCanBosByEmailContainsSomething() {
        // Initialize the database
        insertedDanhMucCanBo = danhMucCanBoRepository.save(danhMucCanBo).block();

        // Get all the danhMucCanBoList where email contains
        defaultDanhMucCanBoFiltering("email.contains=" + DEFAULT_EMAIL, "email.contains=" + UPDATED_EMAIL);
    }

    @Test
    void getAllDanhMucCanBosByEmailNotContainsSomething() {
        // Initialize the database
        insertedDanhMucCanBo = danhMucCanBoRepository.save(danhMucCanBo).block();

        // Get all the danhMucCanBoList where email does not contain
        defaultDanhMucCanBoFiltering("email.doesNotContain=" + UPDATED_EMAIL, "email.doesNotContain=" + DEFAULT_EMAIL);
    }

    @Test
    void getAllDanhMucCanBosBySoDienThoaiIsEqualToSomething() {
        // Initialize the database
        insertedDanhMucCanBo = danhMucCanBoRepository.save(danhMucCanBo).block();

        // Get all the danhMucCanBoList where soDienThoai equals to
        defaultDanhMucCanBoFiltering("soDienThoai.equals=" + DEFAULT_SO_DIEN_THOAI, "soDienThoai.equals=" + UPDATED_SO_DIEN_THOAI);
    }

    @Test
    void getAllDanhMucCanBosBySoDienThoaiIsInShouldWork() {
        // Initialize the database
        insertedDanhMucCanBo = danhMucCanBoRepository.save(danhMucCanBo).block();

        // Get all the danhMucCanBoList where soDienThoai in
        defaultDanhMucCanBoFiltering(
            "soDienThoai.in=" + DEFAULT_SO_DIEN_THOAI + "," + UPDATED_SO_DIEN_THOAI,
            "soDienThoai.in=" + UPDATED_SO_DIEN_THOAI
        );
    }

    @Test
    void getAllDanhMucCanBosBySoDienThoaiIsNullOrNotNull() {
        // Initialize the database
        insertedDanhMucCanBo = danhMucCanBoRepository.save(danhMucCanBo).block();

        // Get all the danhMucCanBoList where soDienThoai is not null
        defaultDanhMucCanBoFiltering("soDienThoai.specified=true", "soDienThoai.specified=false");
    }

    @Test
    void getAllDanhMucCanBosBySoDienThoaiContainsSomething() {
        // Initialize the database
        insertedDanhMucCanBo = danhMucCanBoRepository.save(danhMucCanBo).block();

        // Get all the danhMucCanBoList where soDienThoai contains
        defaultDanhMucCanBoFiltering("soDienThoai.contains=" + DEFAULT_SO_DIEN_THOAI, "soDienThoai.contains=" + UPDATED_SO_DIEN_THOAI);
    }

    @Test
    void getAllDanhMucCanBosBySoDienThoaiNotContainsSomething() {
        // Initialize the database
        insertedDanhMucCanBo = danhMucCanBoRepository.save(danhMucCanBo).block();

        // Get all the danhMucCanBoList where soDienThoai does not contain
        defaultDanhMucCanBoFiltering(
            "soDienThoai.doesNotContain=" + UPDATED_SO_DIEN_THOAI,
            "soDienThoai.doesNotContain=" + DEFAULT_SO_DIEN_THOAI
        );
    }

    @Test
    void getAllDanhMucCanBosBySoGiayToTuyThanIsEqualToSomething() {
        // Initialize the database
        insertedDanhMucCanBo = danhMucCanBoRepository.save(danhMucCanBo).block();

        // Get all the danhMucCanBoList where soGiayToTuyThan equals to
        defaultDanhMucCanBoFiltering(
            "soGiayToTuyThan.equals=" + DEFAULT_SO_GIAY_TO_TUY_THAN,
            "soGiayToTuyThan.equals=" + UPDATED_SO_GIAY_TO_TUY_THAN
        );
    }

    @Test
    void getAllDanhMucCanBosBySoGiayToTuyThanIsInShouldWork() {
        // Initialize the database
        insertedDanhMucCanBo = danhMucCanBoRepository.save(danhMucCanBo).block();

        // Get all the danhMucCanBoList where soGiayToTuyThan in
        defaultDanhMucCanBoFiltering(
            "soGiayToTuyThan.in=" + DEFAULT_SO_GIAY_TO_TUY_THAN + "," + UPDATED_SO_GIAY_TO_TUY_THAN,
            "soGiayToTuyThan.in=" + UPDATED_SO_GIAY_TO_TUY_THAN
        );
    }

    @Test
    void getAllDanhMucCanBosBySoGiayToTuyThanIsNullOrNotNull() {
        // Initialize the database
        insertedDanhMucCanBo = danhMucCanBoRepository.save(danhMucCanBo).block();

        // Get all the danhMucCanBoList where soGiayToTuyThan is not null
        defaultDanhMucCanBoFiltering("soGiayToTuyThan.specified=true", "soGiayToTuyThan.specified=false");
    }

    @Test
    void getAllDanhMucCanBosBySoGiayToTuyThanContainsSomething() {
        // Initialize the database
        insertedDanhMucCanBo = danhMucCanBoRepository.save(danhMucCanBo).block();

        // Get all the danhMucCanBoList where soGiayToTuyThan contains
        defaultDanhMucCanBoFiltering(
            "soGiayToTuyThan.contains=" + DEFAULT_SO_GIAY_TO_TUY_THAN,
            "soGiayToTuyThan.contains=" + UPDATED_SO_GIAY_TO_TUY_THAN
        );
    }

    @Test
    void getAllDanhMucCanBosBySoGiayToTuyThanNotContainsSomething() {
        // Initialize the database
        insertedDanhMucCanBo = danhMucCanBoRepository.save(danhMucCanBo).block();

        // Get all the danhMucCanBoList where soGiayToTuyThan does not contain
        defaultDanhMucCanBoFiltering(
            "soGiayToTuyThan.doesNotContain=" + UPDATED_SO_GIAY_TO_TUY_THAN,
            "soGiayToTuyThan.doesNotContain=" + DEFAULT_SO_GIAY_TO_TUY_THAN
        );
    }

    @Test
    void getAllDanhMucCanBosByIdDonViIsEqualToSomething() {
        // Initialize the database
        insertedDanhMucCanBo = danhMucCanBoRepository.save(danhMucCanBo).block();

        // Get all the danhMucCanBoList where idDonVi equals to
        defaultDanhMucCanBoFiltering("idDonVi.equals=" + DEFAULT_ID_DON_VI, "idDonVi.equals=" + UPDATED_ID_DON_VI);
    }

    @Test
    void getAllDanhMucCanBosByIdDonViIsInShouldWork() {
        // Initialize the database
        insertedDanhMucCanBo = danhMucCanBoRepository.save(danhMucCanBo).block();

        // Get all the danhMucCanBoList where idDonVi in
        defaultDanhMucCanBoFiltering("idDonVi.in=" + DEFAULT_ID_DON_VI + "," + UPDATED_ID_DON_VI, "idDonVi.in=" + UPDATED_ID_DON_VI);
    }

    @Test
    void getAllDanhMucCanBosByIdDonViIsNullOrNotNull() {
        // Initialize the database
        insertedDanhMucCanBo = danhMucCanBoRepository.save(danhMucCanBo).block();

        // Get all the danhMucCanBoList where idDonVi is not null
        defaultDanhMucCanBoFiltering("idDonVi.specified=true", "idDonVi.specified=false");
    }

    @Test
    void getAllDanhMucCanBosByIdDonViIsGreaterThanOrEqualToSomething() {
        // Initialize the database
        insertedDanhMucCanBo = danhMucCanBoRepository.save(danhMucCanBo).block();

        // Get all the danhMucCanBoList where idDonVi is greater than or equal to
        defaultDanhMucCanBoFiltering("idDonVi.greaterThanOrEqual=" + DEFAULT_ID_DON_VI, "idDonVi.greaterThanOrEqual=" + UPDATED_ID_DON_VI);
    }

    @Test
    void getAllDanhMucCanBosByIdDonViIsLessThanOrEqualToSomething() {
        // Initialize the database
        insertedDanhMucCanBo = danhMucCanBoRepository.save(danhMucCanBo).block();

        // Get all the danhMucCanBoList where idDonVi is less than or equal to
        defaultDanhMucCanBoFiltering("idDonVi.lessThanOrEqual=" + DEFAULT_ID_DON_VI, "idDonVi.lessThanOrEqual=" + SMALLER_ID_DON_VI);
    }

    @Test
    void getAllDanhMucCanBosByIdDonViIsLessThanSomething() {
        // Initialize the database
        insertedDanhMucCanBo = danhMucCanBoRepository.save(danhMucCanBo).block();

        // Get all the danhMucCanBoList where idDonVi is less than
        defaultDanhMucCanBoFiltering("idDonVi.lessThan=" + UPDATED_ID_DON_VI, "idDonVi.lessThan=" + DEFAULT_ID_DON_VI);
    }

    @Test
    void getAllDanhMucCanBosByIdDonViIsGreaterThanSomething() {
        // Initialize the database
        insertedDanhMucCanBo = danhMucCanBoRepository.save(danhMucCanBo).block();

        // Get all the danhMucCanBoList where idDonVi is greater than
        defaultDanhMucCanBoFiltering("idDonVi.greaterThan=" + SMALLER_ID_DON_VI, "idDonVi.greaterThan=" + DEFAULT_ID_DON_VI);
    }

    @Test
    void getAllDanhMucCanBosByTenDangNhapIsEqualToSomething() {
        // Initialize the database
        insertedDanhMucCanBo = danhMucCanBoRepository.save(danhMucCanBo).block();

        // Get all the danhMucCanBoList where tenDangNhap equals to
        defaultDanhMucCanBoFiltering("tenDangNhap.equals=" + DEFAULT_TEN_DANG_NHAP, "tenDangNhap.equals=" + UPDATED_TEN_DANG_NHAP);
    }

    @Test
    void getAllDanhMucCanBosByTenDangNhapIsInShouldWork() {
        // Initialize the database
        insertedDanhMucCanBo = danhMucCanBoRepository.save(danhMucCanBo).block();

        // Get all the danhMucCanBoList where tenDangNhap in
        defaultDanhMucCanBoFiltering(
            "tenDangNhap.in=" + DEFAULT_TEN_DANG_NHAP + "," + UPDATED_TEN_DANG_NHAP,
            "tenDangNhap.in=" + UPDATED_TEN_DANG_NHAP
        );
    }

    @Test
    void getAllDanhMucCanBosByTenDangNhapIsNullOrNotNull() {
        // Initialize the database
        insertedDanhMucCanBo = danhMucCanBoRepository.save(danhMucCanBo).block();

        // Get all the danhMucCanBoList where tenDangNhap is not null
        defaultDanhMucCanBoFiltering("tenDangNhap.specified=true", "tenDangNhap.specified=false");
    }

    @Test
    void getAllDanhMucCanBosByTenDangNhapContainsSomething() {
        // Initialize the database
        insertedDanhMucCanBo = danhMucCanBoRepository.save(danhMucCanBo).block();

        // Get all the danhMucCanBoList where tenDangNhap contains
        defaultDanhMucCanBoFiltering("tenDangNhap.contains=" + DEFAULT_TEN_DANG_NHAP, "tenDangNhap.contains=" + UPDATED_TEN_DANG_NHAP);
    }

    @Test
    void getAllDanhMucCanBosByTenDangNhapNotContainsSomething() {
        // Initialize the database
        insertedDanhMucCanBo = danhMucCanBoRepository.save(danhMucCanBo).block();

        // Get all the danhMucCanBoList where tenDangNhap does not contain
        defaultDanhMucCanBoFiltering(
            "tenDangNhap.doesNotContain=" + UPDATED_TEN_DANG_NHAP,
            "tenDangNhap.doesNotContain=" + DEFAULT_TEN_DANG_NHAP
        );
    }

    @Test
    void getAllDanhMucCanBosByMatKhauIsEqualToSomething() {
        // Initialize the database
        insertedDanhMucCanBo = danhMucCanBoRepository.save(danhMucCanBo).block();

        // Get all the danhMucCanBoList where matKhau equals to
        defaultDanhMucCanBoFiltering("matKhau.equals=" + DEFAULT_MAT_KHAU, "matKhau.equals=" + UPDATED_MAT_KHAU);
    }

    @Test
    void getAllDanhMucCanBosByMatKhauIsInShouldWork() {
        // Initialize the database
        insertedDanhMucCanBo = danhMucCanBoRepository.save(danhMucCanBo).block();

        // Get all the danhMucCanBoList where matKhau in
        defaultDanhMucCanBoFiltering("matKhau.in=" + DEFAULT_MAT_KHAU + "," + UPDATED_MAT_KHAU, "matKhau.in=" + UPDATED_MAT_KHAU);
    }

    @Test
    void getAllDanhMucCanBosByMatKhauIsNullOrNotNull() {
        // Initialize the database
        insertedDanhMucCanBo = danhMucCanBoRepository.save(danhMucCanBo).block();

        // Get all the danhMucCanBoList where matKhau is not null
        defaultDanhMucCanBoFiltering("matKhau.specified=true", "matKhau.specified=false");
    }

    @Test
    void getAllDanhMucCanBosByMatKhauContainsSomething() {
        // Initialize the database
        insertedDanhMucCanBo = danhMucCanBoRepository.save(danhMucCanBo).block();

        // Get all the danhMucCanBoList where matKhau contains
        defaultDanhMucCanBoFiltering("matKhau.contains=" + DEFAULT_MAT_KHAU, "matKhau.contains=" + UPDATED_MAT_KHAU);
    }

    @Test
    void getAllDanhMucCanBosByMatKhauNotContainsSomething() {
        // Initialize the database
        insertedDanhMucCanBo = danhMucCanBoRepository.save(danhMucCanBo).block();

        // Get all the danhMucCanBoList where matKhau does not contain
        defaultDanhMucCanBoFiltering("matKhau.doesNotContain=" + UPDATED_MAT_KHAU, "matKhau.doesNotContain=" + DEFAULT_MAT_KHAU);
    }

    @Test
    void getAllDanhMucCanBosByTrangThaiIsEqualToSomething() {
        // Initialize the database
        insertedDanhMucCanBo = danhMucCanBoRepository.save(danhMucCanBo).block();

        // Get all the danhMucCanBoList where trangThai equals to
        defaultDanhMucCanBoFiltering("trangThai.equals=" + DEFAULT_TRANG_THAI, "trangThai.equals=" + UPDATED_TRANG_THAI);
    }

    @Test
    void getAllDanhMucCanBosByTrangThaiIsInShouldWork() {
        // Initialize the database
        insertedDanhMucCanBo = danhMucCanBoRepository.save(danhMucCanBo).block();

        // Get all the danhMucCanBoList where trangThai in
        defaultDanhMucCanBoFiltering("trangThai.in=" + DEFAULT_TRANG_THAI + "," + UPDATED_TRANG_THAI, "trangThai.in=" + UPDATED_TRANG_THAI);
    }

    @Test
    void getAllDanhMucCanBosByTrangThaiIsNullOrNotNull() {
        // Initialize the database
        insertedDanhMucCanBo = danhMucCanBoRepository.save(danhMucCanBo).block();

        // Get all the danhMucCanBoList where trangThai is not null
        defaultDanhMucCanBoFiltering("trangThai.specified=true", "trangThai.specified=false");
    }

    @Test
    void getAllDanhMucCanBosByTrangThaiIsGreaterThanOrEqualToSomething() {
        // Initialize the database
        insertedDanhMucCanBo = danhMucCanBoRepository.save(danhMucCanBo).block();

        // Get all the danhMucCanBoList where trangThai is greater than or equal to
        defaultDanhMucCanBoFiltering(
            "trangThai.greaterThanOrEqual=" + DEFAULT_TRANG_THAI,
            "trangThai.greaterThanOrEqual=" + UPDATED_TRANG_THAI
        );
    }

    @Test
    void getAllDanhMucCanBosByTrangThaiIsLessThanOrEqualToSomething() {
        // Initialize the database
        insertedDanhMucCanBo = danhMucCanBoRepository.save(danhMucCanBo).block();

        // Get all the danhMucCanBoList where trangThai is less than or equal to
        defaultDanhMucCanBoFiltering("trangThai.lessThanOrEqual=" + DEFAULT_TRANG_THAI, "trangThai.lessThanOrEqual=" + SMALLER_TRANG_THAI);
    }

    @Test
    void getAllDanhMucCanBosByTrangThaiIsLessThanSomething() {
        // Initialize the database
        insertedDanhMucCanBo = danhMucCanBoRepository.save(danhMucCanBo).block();

        // Get all the danhMucCanBoList where trangThai is less than
        defaultDanhMucCanBoFiltering("trangThai.lessThan=" + UPDATED_TRANG_THAI, "trangThai.lessThan=" + DEFAULT_TRANG_THAI);
    }

    @Test
    void getAllDanhMucCanBosByTrangThaiIsGreaterThanSomething() {
        // Initialize the database
        insertedDanhMucCanBo = danhMucCanBoRepository.save(danhMucCanBo).block();

        // Get all the danhMucCanBoList where trangThai is greater than
        defaultDanhMucCanBoFiltering("trangThai.greaterThan=" + SMALLER_TRANG_THAI, "trangThai.greaterThan=" + DEFAULT_TRANG_THAI);
    }

    @Test
    void getAllDanhMucCanBosByClientIdIsEqualToSomething() {
        // Initialize the database
        insertedDanhMucCanBo = danhMucCanBoRepository.save(danhMucCanBo).block();

        // Get all the danhMucCanBoList where clientId equals to
        defaultDanhMucCanBoFiltering("clientId.equals=" + DEFAULT_CLIENT_ID, "clientId.equals=" + UPDATED_CLIENT_ID);
    }

    @Test
    void getAllDanhMucCanBosByClientIdIsInShouldWork() {
        // Initialize the database
        insertedDanhMucCanBo = danhMucCanBoRepository.save(danhMucCanBo).block();

        // Get all the danhMucCanBoList where clientId in
        defaultDanhMucCanBoFiltering("clientId.in=" + DEFAULT_CLIENT_ID + "," + UPDATED_CLIENT_ID, "clientId.in=" + UPDATED_CLIENT_ID);
    }

    @Test
    void getAllDanhMucCanBosByClientIdIsNullOrNotNull() {
        // Initialize the database
        insertedDanhMucCanBo = danhMucCanBoRepository.save(danhMucCanBo).block();

        // Get all the danhMucCanBoList where clientId is not null
        defaultDanhMucCanBoFiltering("clientId.specified=true", "clientId.specified=false");
    }

    @Test
    void getAllDanhMucCanBosByClientIdContainsSomething() {
        // Initialize the database
        insertedDanhMucCanBo = danhMucCanBoRepository.save(danhMucCanBo).block();

        // Get all the danhMucCanBoList where clientId contains
        defaultDanhMucCanBoFiltering("clientId.contains=" + DEFAULT_CLIENT_ID, "clientId.contains=" + UPDATED_CLIENT_ID);
    }

    @Test
    void getAllDanhMucCanBosByClientIdNotContainsSomething() {
        // Initialize the database
        insertedDanhMucCanBo = danhMucCanBoRepository.save(danhMucCanBo).block();

        // Get all the danhMucCanBoList where clientId does not contain
        defaultDanhMucCanBoFiltering("clientId.doesNotContain=" + UPDATED_CLIENT_ID, "clientId.doesNotContain=" + DEFAULT_CLIENT_ID);
    }

    @Test
    void getAllDanhMucCanBosByClientSecretIsEqualToSomething() {
        // Initialize the database
        insertedDanhMucCanBo = danhMucCanBoRepository.save(danhMucCanBo).block();

        // Get all the danhMucCanBoList where clientSecret equals to
        defaultDanhMucCanBoFiltering("clientSecret.equals=" + DEFAULT_CLIENT_SECRET, "clientSecret.equals=" + UPDATED_CLIENT_SECRET);
    }

    @Test
    void getAllDanhMucCanBosByClientSecretIsInShouldWork() {
        // Initialize the database
        insertedDanhMucCanBo = danhMucCanBoRepository.save(danhMucCanBo).block();

        // Get all the danhMucCanBoList where clientSecret in
        defaultDanhMucCanBoFiltering(
            "clientSecret.in=" + DEFAULT_CLIENT_SECRET + "," + UPDATED_CLIENT_SECRET,
            "clientSecret.in=" + UPDATED_CLIENT_SECRET
        );
    }

    @Test
    void getAllDanhMucCanBosByClientSecretIsNullOrNotNull() {
        // Initialize the database
        insertedDanhMucCanBo = danhMucCanBoRepository.save(danhMucCanBo).block();

        // Get all the danhMucCanBoList where clientSecret is not null
        defaultDanhMucCanBoFiltering("clientSecret.specified=true", "clientSecret.specified=false");
    }

    @Test
    void getAllDanhMucCanBosByClientSecretContainsSomething() {
        // Initialize the database
        insertedDanhMucCanBo = danhMucCanBoRepository.save(danhMucCanBo).block();

        // Get all the danhMucCanBoList where clientSecret contains
        defaultDanhMucCanBoFiltering("clientSecret.contains=" + DEFAULT_CLIENT_SECRET, "clientSecret.contains=" + UPDATED_CLIENT_SECRET);
    }

    @Test
    void getAllDanhMucCanBosByClientSecretNotContainsSomething() {
        // Initialize the database
        insertedDanhMucCanBo = danhMucCanBoRepository.save(danhMucCanBo).block();

        // Get all the danhMucCanBoList where clientSecret does not contain
        defaultDanhMucCanBoFiltering(
            "clientSecret.doesNotContain=" + UPDATED_CLIENT_SECRET,
            "clientSecret.doesNotContain=" + DEFAULT_CLIENT_SECRET
        );
    }

    @Test
    void getAllDanhMucCanBosByUsernameKysoIsEqualToSomething() {
        // Initialize the database
        insertedDanhMucCanBo = danhMucCanBoRepository.save(danhMucCanBo).block();

        // Get all the danhMucCanBoList where usernameKyso equals to
        defaultDanhMucCanBoFiltering("usernameKyso.equals=" + DEFAULT_USERNAME_KYSO, "usernameKyso.equals=" + UPDATED_USERNAME_KYSO);
    }

    @Test
    void getAllDanhMucCanBosByUsernameKysoIsInShouldWork() {
        // Initialize the database
        insertedDanhMucCanBo = danhMucCanBoRepository.save(danhMucCanBo).block();

        // Get all the danhMucCanBoList where usernameKyso in
        defaultDanhMucCanBoFiltering(
            "usernameKyso.in=" + DEFAULT_USERNAME_KYSO + "," + UPDATED_USERNAME_KYSO,
            "usernameKyso.in=" + UPDATED_USERNAME_KYSO
        );
    }

    @Test
    void getAllDanhMucCanBosByUsernameKysoIsNullOrNotNull() {
        // Initialize the database
        insertedDanhMucCanBo = danhMucCanBoRepository.save(danhMucCanBo).block();

        // Get all the danhMucCanBoList where usernameKyso is not null
        defaultDanhMucCanBoFiltering("usernameKyso.specified=true", "usernameKyso.specified=false");
    }

    @Test
    void getAllDanhMucCanBosByUsernameKysoContainsSomething() {
        // Initialize the database
        insertedDanhMucCanBo = danhMucCanBoRepository.save(danhMucCanBo).block();

        // Get all the danhMucCanBoList where usernameKyso contains
        defaultDanhMucCanBoFiltering("usernameKyso.contains=" + DEFAULT_USERNAME_KYSO, "usernameKyso.contains=" + UPDATED_USERNAME_KYSO);
    }

    @Test
    void getAllDanhMucCanBosByUsernameKysoNotContainsSomething() {
        // Initialize the database
        insertedDanhMucCanBo = danhMucCanBoRepository.save(danhMucCanBo).block();

        // Get all the danhMucCanBoList where usernameKyso does not contain
        defaultDanhMucCanBoFiltering(
            "usernameKyso.doesNotContain=" + UPDATED_USERNAME_KYSO,
            "usernameKyso.doesNotContain=" + DEFAULT_USERNAME_KYSO
        );
    }

    @Test
    void getAllDanhMucCanBosByPasswordKysoIsEqualToSomething() {
        // Initialize the database
        insertedDanhMucCanBo = danhMucCanBoRepository.save(danhMucCanBo).block();

        // Get all the danhMucCanBoList where passwordKyso equals to
        defaultDanhMucCanBoFiltering("passwordKyso.equals=" + DEFAULT_PASSWORD_KYSO, "passwordKyso.equals=" + UPDATED_PASSWORD_KYSO);
    }

    @Test
    void getAllDanhMucCanBosByPasswordKysoIsInShouldWork() {
        // Initialize the database
        insertedDanhMucCanBo = danhMucCanBoRepository.save(danhMucCanBo).block();

        // Get all the danhMucCanBoList where passwordKyso in
        defaultDanhMucCanBoFiltering(
            "passwordKyso.in=" + DEFAULT_PASSWORD_KYSO + "," + UPDATED_PASSWORD_KYSO,
            "passwordKyso.in=" + UPDATED_PASSWORD_KYSO
        );
    }

    @Test
    void getAllDanhMucCanBosByPasswordKysoIsNullOrNotNull() {
        // Initialize the database
        insertedDanhMucCanBo = danhMucCanBoRepository.save(danhMucCanBo).block();

        // Get all the danhMucCanBoList where passwordKyso is not null
        defaultDanhMucCanBoFiltering("passwordKyso.specified=true", "passwordKyso.specified=false");
    }

    @Test
    void getAllDanhMucCanBosByPasswordKysoContainsSomething() {
        // Initialize the database
        insertedDanhMucCanBo = danhMucCanBoRepository.save(danhMucCanBo).block();

        // Get all the danhMucCanBoList where passwordKyso contains
        defaultDanhMucCanBoFiltering("passwordKyso.contains=" + DEFAULT_PASSWORD_KYSO, "passwordKyso.contains=" + UPDATED_PASSWORD_KYSO);
    }

    @Test
    void getAllDanhMucCanBosByPasswordKysoNotContainsSomething() {
        // Initialize the database
        insertedDanhMucCanBo = danhMucCanBoRepository.save(danhMucCanBo).block();

        // Get all the danhMucCanBoList where passwordKyso does not contain
        defaultDanhMucCanBoFiltering(
            "passwordKyso.doesNotContain=" + UPDATED_PASSWORD_KYSO,
            "passwordKyso.doesNotContain=" + DEFAULT_PASSWORD_KYSO
        );
    }

    @Test
    void getAllDanhMucCanBosByUserLoginIsEqualToSomething() {
        // Initialize the database
        insertedDanhMucCanBo = danhMucCanBoRepository.save(danhMucCanBo).block();

        // Get all the danhMucCanBoList where userLogin equals to
        defaultDanhMucCanBoFiltering("userLogin.equals=" + DEFAULT_USER_LOGIN, "userLogin.equals=" + UPDATED_USER_LOGIN);
    }

    @Test
    void getAllDanhMucCanBosByUserLoginIsInShouldWork() {
        // Initialize the database
        insertedDanhMucCanBo = danhMucCanBoRepository.save(danhMucCanBo).block();

        // Get all the danhMucCanBoList where userLogin in
        defaultDanhMucCanBoFiltering("userLogin.in=" + DEFAULT_USER_LOGIN + "," + UPDATED_USER_LOGIN, "userLogin.in=" + UPDATED_USER_LOGIN);
    }

    @Test
    void getAllDanhMucCanBosByUserLoginIsNullOrNotNull() {
        // Initialize the database
        insertedDanhMucCanBo = danhMucCanBoRepository.save(danhMucCanBo).block();

        // Get all the danhMucCanBoList where userLogin is not null
        defaultDanhMucCanBoFiltering("userLogin.specified=true", "userLogin.specified=false");
    }

    @Test
    void getAllDanhMucCanBosByUserLoginContainsSomething() {
        // Initialize the database
        insertedDanhMucCanBo = danhMucCanBoRepository.save(danhMucCanBo).block();

        // Get all the danhMucCanBoList where userLogin contains
        defaultDanhMucCanBoFiltering("userLogin.contains=" + DEFAULT_USER_LOGIN, "userLogin.contains=" + UPDATED_USER_LOGIN);
    }

    @Test
    void getAllDanhMucCanBosByUserLoginNotContainsSomething() {
        // Initialize the database
        insertedDanhMucCanBo = danhMucCanBoRepository.save(danhMucCanBo).block();

        // Get all the danhMucCanBoList where userLogin does not contain
        defaultDanhMucCanBoFiltering("userLogin.doesNotContain=" + UPDATED_USER_LOGIN, "userLogin.doesNotContain=" + DEFAULT_USER_LOGIN);
    }

    private void defaultDanhMucCanBoFiltering(String shouldBeFound, String shouldNotBeFound) {
        defaultDanhMucCanBoShouldBeFound(shouldBeFound);
        defaultDanhMucCanBoShouldNotBeFound(shouldNotBeFound);
    }

    /**
     * Executes the search, and checks that the default entity is returned.
     */
    private void defaultDanhMucCanBoShouldBeFound(String filter) {
        webTestClient
            .get()
            .uri(ENTITY_API_URL + "?sort=idCanBo,desc&" + filter)
            .accept(MediaType.APPLICATION_JSON)
            .exchange()
            .expectStatus()
            .isOk()
            .expectHeader()
            .contentType(MediaType.APPLICATION_JSON)
            .expectBody()
            .jsonPath("$.[*].idCanBo")
            .value(hasItem(danhMucCanBo.getIdCanBo().intValue()))
            .jsonPath("$.[*].tenCanBo")
            .value(hasItem(DEFAULT_TEN_CAN_BO))
            .jsonPath("$.[*].diaChi")
            .value(hasItem(DEFAULT_DIA_CHI))
            .jsonPath("$.[*].namSinh")
            .value(hasItem(DEFAULT_NAM_SINH.toString()))
            .jsonPath("$.[*].email")
            .value(hasItem(DEFAULT_EMAIL))
            .jsonPath("$.[*].soDienThoai")
            .value(hasItem(DEFAULT_SO_DIEN_THOAI))
            .jsonPath("$.[*].soGiayToTuyThan")
            .value(hasItem(DEFAULT_SO_GIAY_TO_TUY_THAN))
            .jsonPath("$.[*].idDonVi")
            .value(hasItem(DEFAULT_ID_DON_VI.intValue()))
            .jsonPath("$.[*].tenDangNhap")
            .value(hasItem(DEFAULT_TEN_DANG_NHAP))
            .jsonPath("$.[*].matKhau")
            .value(hasItem(DEFAULT_MAT_KHAU))
            .jsonPath("$.[*].trangThai")
            .value(hasItem(DEFAULT_TRANG_THAI.intValue()))
            .jsonPath("$.[*].clientId")
            .value(hasItem(DEFAULT_CLIENT_ID))
            .jsonPath("$.[*].clientSecret")
            .value(hasItem(DEFAULT_CLIENT_SECRET))
            .jsonPath("$.[*].usernameKyso")
            .value(hasItem(DEFAULT_USERNAME_KYSO))
            .jsonPath("$.[*].passwordKyso")
            .value(hasItem(DEFAULT_PASSWORD_KYSO))
            .jsonPath("$.[*].userLogin")
            .value(hasItem(DEFAULT_USER_LOGIN));

        // Check, that the count call also returns 1
        webTestClient
            .get()
            .uri(ENTITY_API_URL + "/count?sort=idCanBo,desc&" + filter)
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
    private void defaultDanhMucCanBoShouldNotBeFound(String filter) {
        webTestClient
            .get()
            .uri(ENTITY_API_URL + "?sort=idCanBo,desc&" + filter)
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
            .uri(ENTITY_API_URL + "/count?sort=idCanBo,desc&" + filter)
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
    void getNonExistingDanhMucCanBo() {
        // Get the danhMucCanBo
        webTestClient
            .get()
            .uri(ENTITY_API_URL_ID, Long.MAX_VALUE)
            .accept(MediaType.APPLICATION_PROBLEM_JSON)
            .exchange()
            .expectStatus()
            .isNotFound();
    }

    @Test
    void putExistingDanhMucCanBo() throws Exception {
        // Initialize the database
        insertedDanhMucCanBo = danhMucCanBoRepository.save(danhMucCanBo).block();

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the danhMucCanBo
        DanhMucCanBo updatedDanhMucCanBo = danhMucCanBoRepository.findById(danhMucCanBo.getIdCanBo()).block();
        updatedDanhMucCanBo
            .tenCanBo(UPDATED_TEN_CAN_BO)
            .diaChi(UPDATED_DIA_CHI)
            .namSinh(UPDATED_NAM_SINH)
            .email(UPDATED_EMAIL)
            .soDienThoai(UPDATED_SO_DIEN_THOAI)
            .soGiayToTuyThan(UPDATED_SO_GIAY_TO_TUY_THAN)
            .idDonVi(UPDATED_ID_DON_VI)
            .tenDangNhap(UPDATED_TEN_DANG_NHAP)
            .matKhau(UPDATED_MAT_KHAU)
            .trangThai(UPDATED_TRANG_THAI)
            .clientId(UPDATED_CLIENT_ID)
            .clientSecret(UPDATED_CLIENT_SECRET)
            .usernameKyso(UPDATED_USERNAME_KYSO)
            .passwordKyso(UPDATED_PASSWORD_KYSO)
            .userLogin(UPDATED_USER_LOGIN);
        DanhMucCanBoDTO danhMucCanBoDTO = danhMucCanBoMapper.toDto(updatedDanhMucCanBo);

        webTestClient
            .put()
            .uri(ENTITY_API_URL_ID, danhMucCanBoDTO.getIdCanBo())
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(om.writeValueAsBytes(danhMucCanBoDTO))
            .exchange()
            .expectStatus()
            .isOk();

        // Validate the DanhMucCanBo in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertPersistedDanhMucCanBoToMatchAllProperties(updatedDanhMucCanBo);
    }

    @Test
    void putNonExistingDanhMucCanBo() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        danhMucCanBo.setIdCanBo(longCount.incrementAndGet());

        // Create the DanhMucCanBo
        DanhMucCanBoDTO danhMucCanBoDTO = danhMucCanBoMapper.toDto(danhMucCanBo);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        webTestClient
            .put()
            .uri(ENTITY_API_URL_ID, danhMucCanBoDTO.getIdCanBo())
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(om.writeValueAsBytes(danhMucCanBoDTO))
            .exchange()
            .expectStatus()
            .isBadRequest();

        // Validate the DanhMucCanBo in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithIdMismatchDanhMucCanBo() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        danhMucCanBo.setIdCanBo(longCount.incrementAndGet());

        // Create the DanhMucCanBo
        DanhMucCanBoDTO danhMucCanBoDTO = danhMucCanBoMapper.toDto(danhMucCanBo);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        webTestClient
            .put()
            .uri(ENTITY_API_URL_ID, longCount.incrementAndGet())
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(om.writeValueAsBytes(danhMucCanBoDTO))
            .exchange()
            .expectStatus()
            .isBadRequest();

        // Validate the DanhMucCanBo in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithMissingIdPathParamDanhMucCanBo() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        danhMucCanBo.setIdCanBo(longCount.incrementAndGet());

        // Create the DanhMucCanBo
        DanhMucCanBoDTO danhMucCanBoDTO = danhMucCanBoMapper.toDto(danhMucCanBo);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        webTestClient
            .put()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(om.writeValueAsBytes(danhMucCanBoDTO))
            .exchange()
            .expectStatus()
            .isEqualTo(405);

        // Validate the DanhMucCanBo in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void partialUpdateDanhMucCanBoWithPatch() throws Exception {
        // Initialize the database
        insertedDanhMucCanBo = danhMucCanBoRepository.save(danhMucCanBo).block();

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the danhMucCanBo using partial update
        DanhMucCanBo partialUpdatedDanhMucCanBo = new DanhMucCanBo();
        partialUpdatedDanhMucCanBo.setIdCanBo(danhMucCanBo.getIdCanBo());

        partialUpdatedDanhMucCanBo
            .tenCanBo(UPDATED_TEN_CAN_BO)
            .email(UPDATED_EMAIL)
            .soGiayToTuyThan(UPDATED_SO_GIAY_TO_TUY_THAN)
            .idDonVi(UPDATED_ID_DON_VI)
            .tenDangNhap(UPDATED_TEN_DANG_NHAP)
            .clientSecret(UPDATED_CLIENT_SECRET)
            .usernameKyso(UPDATED_USERNAME_KYSO)
            .userLogin(UPDATED_USER_LOGIN);

        webTestClient
            .patch()
            .uri(ENTITY_API_URL_ID, partialUpdatedDanhMucCanBo.getIdCanBo())
            .contentType(MediaType.valueOf("application/merge-patch+json"))
            .bodyValue(om.writeValueAsBytes(partialUpdatedDanhMucCanBo))
            .exchange()
            .expectStatus()
            .isOk();

        // Validate the DanhMucCanBo in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertDanhMucCanBoUpdatableFieldsEquals(
            createUpdateProxyForBean(partialUpdatedDanhMucCanBo, danhMucCanBo),
            getPersistedDanhMucCanBo(danhMucCanBo)
        );
    }

    @Test
    void fullUpdateDanhMucCanBoWithPatch() throws Exception {
        // Initialize the database
        insertedDanhMucCanBo = danhMucCanBoRepository.save(danhMucCanBo).block();

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the danhMucCanBo using partial update
        DanhMucCanBo partialUpdatedDanhMucCanBo = new DanhMucCanBo();
        partialUpdatedDanhMucCanBo.setIdCanBo(danhMucCanBo.getIdCanBo());

        partialUpdatedDanhMucCanBo
            .tenCanBo(UPDATED_TEN_CAN_BO)
            .diaChi(UPDATED_DIA_CHI)
            .namSinh(UPDATED_NAM_SINH)
            .email(UPDATED_EMAIL)
            .soDienThoai(UPDATED_SO_DIEN_THOAI)
            .soGiayToTuyThan(UPDATED_SO_GIAY_TO_TUY_THAN)
            .idDonVi(UPDATED_ID_DON_VI)
            .tenDangNhap(UPDATED_TEN_DANG_NHAP)
            .matKhau(UPDATED_MAT_KHAU)
            .trangThai(UPDATED_TRANG_THAI)
            .clientId(UPDATED_CLIENT_ID)
            .clientSecret(UPDATED_CLIENT_SECRET)
            .usernameKyso(UPDATED_USERNAME_KYSO)
            .passwordKyso(UPDATED_PASSWORD_KYSO)
            .userLogin(UPDATED_USER_LOGIN);

        webTestClient
            .patch()
            .uri(ENTITY_API_URL_ID, partialUpdatedDanhMucCanBo.getIdCanBo())
            .contentType(MediaType.valueOf("application/merge-patch+json"))
            .bodyValue(om.writeValueAsBytes(partialUpdatedDanhMucCanBo))
            .exchange()
            .expectStatus()
            .isOk();

        // Validate the DanhMucCanBo in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertDanhMucCanBoUpdatableFieldsEquals(partialUpdatedDanhMucCanBo, getPersistedDanhMucCanBo(partialUpdatedDanhMucCanBo));
    }

    @Test
    void patchNonExistingDanhMucCanBo() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        danhMucCanBo.setIdCanBo(longCount.incrementAndGet());

        // Create the DanhMucCanBo
        DanhMucCanBoDTO danhMucCanBoDTO = danhMucCanBoMapper.toDto(danhMucCanBo);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        webTestClient
            .patch()
            .uri(ENTITY_API_URL_ID, danhMucCanBoDTO.getIdCanBo())
            .contentType(MediaType.valueOf("application/merge-patch+json"))
            .bodyValue(om.writeValueAsBytes(danhMucCanBoDTO))
            .exchange()
            .expectStatus()
            .isBadRequest();

        // Validate the DanhMucCanBo in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithIdMismatchDanhMucCanBo() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        danhMucCanBo.setIdCanBo(longCount.incrementAndGet());

        // Create the DanhMucCanBo
        DanhMucCanBoDTO danhMucCanBoDTO = danhMucCanBoMapper.toDto(danhMucCanBo);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        webTestClient
            .patch()
            .uri(ENTITY_API_URL_ID, longCount.incrementAndGet())
            .contentType(MediaType.valueOf("application/merge-patch+json"))
            .bodyValue(om.writeValueAsBytes(danhMucCanBoDTO))
            .exchange()
            .expectStatus()
            .isBadRequest();

        // Validate the DanhMucCanBo in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithMissingIdPathParamDanhMucCanBo() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        danhMucCanBo.setIdCanBo(longCount.incrementAndGet());

        // Create the DanhMucCanBo
        DanhMucCanBoDTO danhMucCanBoDTO = danhMucCanBoMapper.toDto(danhMucCanBo);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        webTestClient
            .patch()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.valueOf("application/merge-patch+json"))
            .bodyValue(om.writeValueAsBytes(danhMucCanBoDTO))
            .exchange()
            .expectStatus()
            .isEqualTo(405);

        // Validate the DanhMucCanBo in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void deleteDanhMucCanBo() {
        // Initialize the database
        insertedDanhMucCanBo = danhMucCanBoRepository.save(danhMucCanBo).block();

        long databaseSizeBeforeDelete = getRepositoryCount();

        // Delete the danhMucCanBo
        webTestClient
            .delete()
            .uri(ENTITY_API_URL_ID, danhMucCanBo.getIdCanBo())
            .accept(MediaType.APPLICATION_JSON)
            .exchange()
            .expectStatus()
            .isNoContent();

        // Validate the database contains one less item
        assertDecrementedRepositoryCount(databaseSizeBeforeDelete);
    }

    protected long getRepositoryCount() {
        return danhMucCanBoRepository.count().block();
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

    protected DanhMucCanBo getPersistedDanhMucCanBo(DanhMucCanBo danhMucCanBo) {
        return danhMucCanBoRepository.findById(danhMucCanBo.getIdCanBo()).block();
    }

    protected void assertPersistedDanhMucCanBoToMatchAllProperties(DanhMucCanBo expectedDanhMucCanBo) {
        // Test fails because reactive api returns an empty object instead of null
        // assertDanhMucCanBoAllPropertiesEquals(expectedDanhMucCanBo, getPersistedDanhMucCanBo(expectedDanhMucCanBo));
        assertDanhMucCanBoUpdatableFieldsEquals(expectedDanhMucCanBo, getPersistedDanhMucCanBo(expectedDanhMucCanBo));
    }

    protected void assertPersistedDanhMucCanBoToMatchUpdatableProperties(DanhMucCanBo expectedDanhMucCanBo) {
        // Test fails because reactive api returns an empty object instead of null
        // assertDanhMucCanBoAllUpdatablePropertiesEquals(expectedDanhMucCanBo, getPersistedDanhMucCanBo(expectedDanhMucCanBo));
        assertDanhMucCanBoUpdatableFieldsEquals(expectedDanhMucCanBo, getPersistedDanhMucCanBo(expectedDanhMucCanBo));
    }
}
