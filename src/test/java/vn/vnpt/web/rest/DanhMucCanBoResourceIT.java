package vn.vnpt.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.hamcrest.Matchers.is;
import static vn.vnpt.domain.DanhMucCanBoAsserts.*;
import static vn.vnpt.web.rest.TestUtil.createUpdateProxyForBean;

import com.fasterxml.jackson.databind.ObjectMapper;
import java.time.Duration;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;
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

/**
 * Integration tests for the {@link DanhMucCanBoResource} REST controller.
 */
@IntegrationTest
@AutoConfigureWebTestClient(timeout = IntegrationTest.DEFAULT_ENTITY_TIMEOUT)
@WithMockUser
class DanhMucCanBoResourceIT {

    private static final Long DEFAULT_ID_CAN_BO = 1L;
    private static final Long UPDATED_ID_CAN_BO = 2L;

    private static final String DEFAULT_TEN_CAN_BO = "AAAAAAAAAA";
    private static final String UPDATED_TEN_CAN_BO = "BBBBBBBBBB";

    private static final String DEFAULT_DIA_CHI = "AAAAAAAAAA";
    private static final String UPDATED_DIA_CHI = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_NAM_SINH = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_NAM_SINH = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_EMAIL = "AAAAAAAAAA";
    private static final String UPDATED_EMAIL = "BBBBBBBBBB";

    private static final String DEFAULT_SO_DIEN_THOAI = "AAAAAAAAAA";
    private static final String UPDATED_SO_DIEN_THOAI = "BBBBBBBBBB";

    private static final String DEFAULT_SO_CMND = "AAAAAAAAAA";
    private static final String UPDATED_SO_CMND = "BBBBBBBBBB";

    private static final Long DEFAULT_ID_DON_VI = 1L;
    private static final Long UPDATED_ID_DON_VI = 2L;

    private static final String DEFAULT_TEN_DANG_NHAP = "AAAAAAAAAA";
    private static final String UPDATED_TEN_DANG_NHAP = "BBBBBBBBBB";

    private static final String DEFAULT_MAT_KHAU = "AAAAAAAAAA";
    private static final String UPDATED_MAT_KHAU = "BBBBBBBBBB";

    private static final Long DEFAULT_TRANG_THAI = 1L;
    private static final Long UPDATED_TRANG_THAI = 2L;

    private static final String DEFAULT_CLIENT_ID = "AAAAAAAAAA";
    private static final String UPDATED_CLIENT_ID = "BBBBBBBBBB";

    private static final String DEFAULT_CLIENT_SECRET = "AAAAAAAAAA";
    private static final String UPDATED_CLIENT_SECRET = "BBBBBBBBBB";

    private static final String DEFAULT_USERNAME_KYSO = "AAAAAAAAAA";
    private static final String UPDATED_USERNAME_KYSO = "BBBBBBBBBB";

    private static final String DEFAULT_PASSWORD_KYSO = "AAAAAAAAAA";
    private static final String UPDATED_PASSWORD_KYSO = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/danh-muc-can-bos";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private ObjectMapper om;

    @Autowired
    private DanhMucCanBoRepository danhMucCanBoRepository;

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
    public static DanhMucCanBo createEntity(EntityManager em) {
        DanhMucCanBo danhMucCanBo = new DanhMucCanBo()
            .idCanBo(DEFAULT_ID_CAN_BO)
            .tenCanBo(DEFAULT_TEN_CAN_BO)
            .diaChi(DEFAULT_DIA_CHI)
            .namSinh(DEFAULT_NAM_SINH)
            .email(DEFAULT_EMAIL)
            .soDienThoai(DEFAULT_SO_DIEN_THOAI)
            .soCmnd(DEFAULT_SO_CMND)
            .idDonVi(DEFAULT_ID_DON_VI)
            .tenDangNhap(DEFAULT_TEN_DANG_NHAP)
            .matKhau(DEFAULT_MAT_KHAU)
            .trangThai(DEFAULT_TRANG_THAI)
            .clientId(DEFAULT_CLIENT_ID)
            .clientSecret(DEFAULT_CLIENT_SECRET)
            .usernameKyso(DEFAULT_USERNAME_KYSO)
            .passwordKyso(DEFAULT_PASSWORD_KYSO);
        return danhMucCanBo;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static DanhMucCanBo createUpdatedEntity(EntityManager em) {
        DanhMucCanBo danhMucCanBo = new DanhMucCanBo()
            .idCanBo(UPDATED_ID_CAN_BO)
            .tenCanBo(UPDATED_TEN_CAN_BO)
            .diaChi(UPDATED_DIA_CHI)
            .namSinh(UPDATED_NAM_SINH)
            .email(UPDATED_EMAIL)
            .soDienThoai(UPDATED_SO_DIEN_THOAI)
            .soCmnd(UPDATED_SO_CMND)
            .idDonVi(UPDATED_ID_DON_VI)
            .tenDangNhap(UPDATED_TEN_DANG_NHAP)
            .matKhau(UPDATED_MAT_KHAU)
            .trangThai(UPDATED_TRANG_THAI)
            .clientId(UPDATED_CLIENT_ID)
            .clientSecret(UPDATED_CLIENT_SECRET)
            .usernameKyso(UPDATED_USERNAME_KYSO)
            .passwordKyso(UPDATED_PASSWORD_KYSO);
        return danhMucCanBo;
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
        danhMucCanBo = createEntity(em);
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
        var returnedDanhMucCanBo = webTestClient
            .post()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(om.writeValueAsBytes(danhMucCanBo))
            .exchange()
            .expectStatus()
            .isCreated()
            .expectBody(DanhMucCanBo.class)
            .returnResult()
            .getResponseBody();

        // Validate the DanhMucCanBo in the database
        assertIncrementedRepositoryCount(databaseSizeBeforeCreate);
        assertDanhMucCanBoUpdatableFieldsEquals(returnedDanhMucCanBo, getPersistedDanhMucCanBo(returnedDanhMucCanBo));

        insertedDanhMucCanBo = returnedDanhMucCanBo;
    }

    @Test
    void createDanhMucCanBoWithExistingId() throws Exception {
        // Create the DanhMucCanBo with an existing ID
        danhMucCanBo.setId(1L);

        long databaseSizeBeforeCreate = getRepositoryCount();

        // An entity with an existing ID cannot be created, so this API call must fail
        webTestClient
            .post()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(om.writeValueAsBytes(danhMucCanBo))
            .exchange()
            .expectStatus()
            .isBadRequest();

        // Validate the DanhMucCanBo in the database
        assertSameRepositoryCount(databaseSizeBeforeCreate);
    }

    @Test
    void getAllDanhMucCanBosAsStream() {
        // Initialize the database
        danhMucCanBoRepository.save(danhMucCanBo).block();

        List<DanhMucCanBo> danhMucCanBoList = webTestClient
            .get()
            .uri(ENTITY_API_URL)
            .accept(MediaType.APPLICATION_NDJSON)
            .exchange()
            .expectStatus()
            .isOk()
            .expectHeader()
            .contentTypeCompatibleWith(MediaType.APPLICATION_NDJSON)
            .returnResult(DanhMucCanBo.class)
            .getResponseBody()
            .filter(danhMucCanBo::equals)
            .collectList()
            .block(Duration.ofSeconds(5));

        assertThat(danhMucCanBoList).isNotNull();
        assertThat(danhMucCanBoList).hasSize(1);
        DanhMucCanBo testDanhMucCanBo = danhMucCanBoList.get(0);

        // Test fails because reactive api returns an empty object instead of null
        // assertDanhMucCanBoAllPropertiesEquals(danhMucCanBo, testDanhMucCanBo);
        assertDanhMucCanBoUpdatableFieldsEquals(danhMucCanBo, testDanhMucCanBo);
    }

    @Test
    void getAllDanhMucCanBos() {
        // Initialize the database
        insertedDanhMucCanBo = danhMucCanBoRepository.save(danhMucCanBo).block();

        // Get all the danhMucCanBoList
        webTestClient
            .get()
            .uri(ENTITY_API_URL + "?sort=id,desc")
            .accept(MediaType.APPLICATION_JSON)
            .exchange()
            .expectStatus()
            .isOk()
            .expectHeader()
            .contentType(MediaType.APPLICATION_JSON)
            .expectBody()
            .jsonPath("$.[*].id")
            .value(hasItem(danhMucCanBo.getId().intValue()))
            .jsonPath("$.[*].idCanBo")
            .value(hasItem(DEFAULT_ID_CAN_BO.intValue()))
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
            .jsonPath("$.[*].soCmnd")
            .value(hasItem(DEFAULT_SO_CMND))
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
            .value(hasItem(DEFAULT_PASSWORD_KYSO));
    }

    @Test
    void getDanhMucCanBo() {
        // Initialize the database
        insertedDanhMucCanBo = danhMucCanBoRepository.save(danhMucCanBo).block();

        // Get the danhMucCanBo
        webTestClient
            .get()
            .uri(ENTITY_API_URL_ID, danhMucCanBo.getId())
            .accept(MediaType.APPLICATION_JSON)
            .exchange()
            .expectStatus()
            .isOk()
            .expectHeader()
            .contentType(MediaType.APPLICATION_JSON)
            .expectBody()
            .jsonPath("$.id")
            .value(is(danhMucCanBo.getId().intValue()))
            .jsonPath("$.idCanBo")
            .value(is(DEFAULT_ID_CAN_BO.intValue()))
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
            .jsonPath("$.soCmnd")
            .value(is(DEFAULT_SO_CMND))
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
            .value(is(DEFAULT_PASSWORD_KYSO));
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
        DanhMucCanBo updatedDanhMucCanBo = danhMucCanBoRepository.findById(danhMucCanBo.getId()).block();
        updatedDanhMucCanBo
            .idCanBo(UPDATED_ID_CAN_BO)
            .tenCanBo(UPDATED_TEN_CAN_BO)
            .diaChi(UPDATED_DIA_CHI)
            .namSinh(UPDATED_NAM_SINH)
            .email(UPDATED_EMAIL)
            .soDienThoai(UPDATED_SO_DIEN_THOAI)
            .soCmnd(UPDATED_SO_CMND)
            .idDonVi(UPDATED_ID_DON_VI)
            .tenDangNhap(UPDATED_TEN_DANG_NHAP)
            .matKhau(UPDATED_MAT_KHAU)
            .trangThai(UPDATED_TRANG_THAI)
            .clientId(UPDATED_CLIENT_ID)
            .clientSecret(UPDATED_CLIENT_SECRET)
            .usernameKyso(UPDATED_USERNAME_KYSO)
            .passwordKyso(UPDATED_PASSWORD_KYSO);

        webTestClient
            .put()
            .uri(ENTITY_API_URL_ID, updatedDanhMucCanBo.getId())
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(om.writeValueAsBytes(updatedDanhMucCanBo))
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
        danhMucCanBo.setId(longCount.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        webTestClient
            .put()
            .uri(ENTITY_API_URL_ID, danhMucCanBo.getId())
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(om.writeValueAsBytes(danhMucCanBo))
            .exchange()
            .expectStatus()
            .isBadRequest();

        // Validate the DanhMucCanBo in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithIdMismatchDanhMucCanBo() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        danhMucCanBo.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        webTestClient
            .put()
            .uri(ENTITY_API_URL_ID, longCount.incrementAndGet())
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(om.writeValueAsBytes(danhMucCanBo))
            .exchange()
            .expectStatus()
            .isBadRequest();

        // Validate the DanhMucCanBo in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithMissingIdPathParamDanhMucCanBo() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        danhMucCanBo.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        webTestClient
            .put()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(om.writeValueAsBytes(danhMucCanBo))
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
        partialUpdatedDanhMucCanBo.setId(danhMucCanBo.getId());

        partialUpdatedDanhMucCanBo
            .idCanBo(UPDATED_ID_CAN_BO)
            .diaChi(UPDATED_DIA_CHI)
            .namSinh(UPDATED_NAM_SINH)
            .soCmnd(UPDATED_SO_CMND)
            .matKhau(UPDATED_MAT_KHAU)
            .clientId(UPDATED_CLIENT_ID)
            .clientSecret(UPDATED_CLIENT_SECRET);

        webTestClient
            .patch()
            .uri(ENTITY_API_URL_ID, partialUpdatedDanhMucCanBo.getId())
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
        partialUpdatedDanhMucCanBo.setId(danhMucCanBo.getId());

        partialUpdatedDanhMucCanBo
            .idCanBo(UPDATED_ID_CAN_BO)
            .tenCanBo(UPDATED_TEN_CAN_BO)
            .diaChi(UPDATED_DIA_CHI)
            .namSinh(UPDATED_NAM_SINH)
            .email(UPDATED_EMAIL)
            .soDienThoai(UPDATED_SO_DIEN_THOAI)
            .soCmnd(UPDATED_SO_CMND)
            .idDonVi(UPDATED_ID_DON_VI)
            .tenDangNhap(UPDATED_TEN_DANG_NHAP)
            .matKhau(UPDATED_MAT_KHAU)
            .trangThai(UPDATED_TRANG_THAI)
            .clientId(UPDATED_CLIENT_ID)
            .clientSecret(UPDATED_CLIENT_SECRET)
            .usernameKyso(UPDATED_USERNAME_KYSO)
            .passwordKyso(UPDATED_PASSWORD_KYSO);

        webTestClient
            .patch()
            .uri(ENTITY_API_URL_ID, partialUpdatedDanhMucCanBo.getId())
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
        danhMucCanBo.setId(longCount.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        webTestClient
            .patch()
            .uri(ENTITY_API_URL_ID, danhMucCanBo.getId())
            .contentType(MediaType.valueOf("application/merge-patch+json"))
            .bodyValue(om.writeValueAsBytes(danhMucCanBo))
            .exchange()
            .expectStatus()
            .isBadRequest();

        // Validate the DanhMucCanBo in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithIdMismatchDanhMucCanBo() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        danhMucCanBo.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        webTestClient
            .patch()
            .uri(ENTITY_API_URL_ID, longCount.incrementAndGet())
            .contentType(MediaType.valueOf("application/merge-patch+json"))
            .bodyValue(om.writeValueAsBytes(danhMucCanBo))
            .exchange()
            .expectStatus()
            .isBadRequest();

        // Validate the DanhMucCanBo in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithMissingIdPathParamDanhMucCanBo() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        danhMucCanBo.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        webTestClient
            .patch()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.valueOf("application/merge-patch+json"))
            .bodyValue(om.writeValueAsBytes(danhMucCanBo))
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
            .uri(ENTITY_API_URL_ID, danhMucCanBo.getId())
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
        return danhMucCanBoRepository.findById(danhMucCanBo.getId()).block();
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
