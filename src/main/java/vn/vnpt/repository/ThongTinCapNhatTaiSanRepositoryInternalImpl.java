package vn.vnpt.repository;

import io.r2dbc.spi.Row;
import io.r2dbc.spi.RowMetadata;
import java.util.ArrayList;
import java.util.List;
import org.springframework.data.domain.Pageable;
import org.springframework.data.r2dbc.convert.R2dbcConverter;
import org.springframework.data.r2dbc.core.R2dbcEntityOperations;
import org.springframework.data.r2dbc.core.R2dbcEntityTemplate;
import org.springframework.data.r2dbc.repository.support.SimpleR2dbcRepository;
import org.springframework.data.relational.core.sql.Column;
import org.springframework.data.relational.core.sql.Comparison;
import org.springframework.data.relational.core.sql.Condition;
import org.springframework.data.relational.core.sql.Conditions;
import org.springframework.data.relational.core.sql.Expression;
import org.springframework.data.relational.core.sql.Select;
import org.springframework.data.relational.core.sql.SelectBuilder.SelectFromAndJoinCondition;
import org.springframework.data.relational.core.sql.Table;
import org.springframework.data.relational.repository.support.MappingRelationalEntityInformation;
import org.springframework.r2dbc.core.DatabaseClient;
import org.springframework.r2dbc.core.RowsFetchSpec;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import tech.jhipster.service.ConditionBuilder;
import vn.vnpt.domain.ThongTinCapNhatTaiSan;
import vn.vnpt.domain.criteria.ThongTinCapNhatTaiSanCriteria;
import vn.vnpt.repository.rowmapper.ColumnConverter;
import vn.vnpt.repository.rowmapper.DanhMucLoaiTaiSanRowMapper;
import vn.vnpt.repository.rowmapper.TaiSanRowMapper;
import vn.vnpt.repository.rowmapper.ThongTinCapNhatTaiSanRowMapper;

/**
 * Spring Data R2DBC custom repository implementation for the ThongTinCapNhatTaiSan entity.
 */
@SuppressWarnings("unused")
class ThongTinCapNhatTaiSanRepositoryInternalImpl
    extends SimpleR2dbcRepository<ThongTinCapNhatTaiSan, Long>
    implements ThongTinCapNhatTaiSanRepositoryInternal {

    private final DatabaseClient db;
    private final R2dbcEntityTemplate r2dbcEntityTemplate;
    private final EntityManager entityManager;

    private final TaiSanRowMapper taisanMapper;
    private final DanhMucLoaiTaiSanRowMapper danhmucloaitaisanMapper;
    private final ThongTinCapNhatTaiSanRowMapper thongtincapnhattaisanMapper;
    private final ColumnConverter columnConverter;

    private static final Table entityTable = Table.aliased("thong_tin_cap_nhat_tai_san", EntityManager.ENTITY_ALIAS);
    private static final Table taiSanTable = Table.aliased("tai_san", "taiSan");
    private static final Table danhMucLoaiTaiSanTable = Table.aliased("danh_muc_loai_tai_san", "danhMucLoaiTaiSan");

    public ThongTinCapNhatTaiSanRepositoryInternalImpl(
        R2dbcEntityTemplate template,
        EntityManager entityManager,
        TaiSanRowMapper taisanMapper,
        DanhMucLoaiTaiSanRowMapper danhmucloaitaisanMapper,
        ThongTinCapNhatTaiSanRowMapper thongtincapnhattaisanMapper,
        R2dbcEntityOperations entityOperations,
        R2dbcConverter converter,
        ColumnConverter columnConverter
    ) {
        super(
            new MappingRelationalEntityInformation(converter.getMappingContext().getRequiredPersistentEntity(ThongTinCapNhatTaiSan.class)),
            entityOperations,
            converter
        );
        this.db = template.getDatabaseClient();
        this.r2dbcEntityTemplate = template;
        this.entityManager = entityManager;
        this.taisanMapper = taisanMapper;
        this.danhmucloaitaisanMapper = danhmucloaitaisanMapper;
        this.thongtincapnhattaisanMapper = thongtincapnhattaisanMapper;
        this.columnConverter = columnConverter;
    }

    @Override
    public Flux<ThongTinCapNhatTaiSan> findAllBy(Pageable pageable) {
        return createQuery(pageable, null).all();
    }

    RowsFetchSpec<ThongTinCapNhatTaiSan> createQuery(Pageable pageable, Condition whereClause) {
        List<Expression> columns = ThongTinCapNhatTaiSanSqlHelper.getColumns(entityTable, EntityManager.ENTITY_ALIAS);
        columns.addAll(TaiSanSqlHelper.getColumns(taiSanTable, "taiSan"));
        columns.addAll(DanhMucLoaiTaiSanSqlHelper.getColumns(danhMucLoaiTaiSanTable, "danhMucLoaiTaiSan"));
        SelectFromAndJoinCondition selectFrom = Select.builder()
            .select(columns)
            .from(entityTable)
            .leftOuterJoin(taiSanTable)
            .on(Column.create("tai_san_id_tai_san", entityTable))
            .equals(Column.create("id_tai_san", taiSanTable))
            .leftOuterJoin(danhMucLoaiTaiSanTable)
            .on(Column.create("danh_muc_loai_tai_san_id_loai_ts", entityTable))
            .equals(Column.create("id_loai_ts", danhMucLoaiTaiSanTable));
        // we do not support Criteria here for now as of https://github.com/jhipster/generator-jhipster/issues/18269
        String select = entityManager.createSelect(selectFrom, ThongTinCapNhatTaiSan.class, pageable, whereClause);
        return db.sql(select).map(this::process);
    }

    @Override
    public Flux<ThongTinCapNhatTaiSan> findAll() {
        return findAllBy(null);
    }

    @Override
    public Mono<ThongTinCapNhatTaiSan> findById(Long id) {
        Comparison whereClause = Conditions.isEqual(entityTable.column("id_cap_nhat"), Conditions.just(id.toString()));
        return createQuery(null, whereClause).one();
    }

    private ThongTinCapNhatTaiSan process(Row row, RowMetadata metadata) {
        ThongTinCapNhatTaiSan entity = thongtincapnhattaisanMapper.apply(row, "e");
        entity.setTaiSan(taisanMapper.apply(row, "taiSan"));
        entity.setDanhMucLoaiTaiSan(danhmucloaitaisanMapper.apply(row, "danhMucLoaiTaiSan"));
        return entity;
    }

    @Override
    public <S extends ThongTinCapNhatTaiSan> Mono<S> save(S entity) {
        return super.save(entity);
    }

    @Override
    public Flux<ThongTinCapNhatTaiSan> findByCriteria(ThongTinCapNhatTaiSanCriteria thongTinCapNhatTaiSanCriteria, Pageable page) {
        return createQuery(page, buildConditions(thongTinCapNhatTaiSanCriteria)).all();
    }

    @Override
    public Mono<Long> countByCriteria(ThongTinCapNhatTaiSanCriteria criteria) {
        return findByCriteria(criteria, null)
            .collectList()
            .map(collectedList -> collectedList != null ? (long) collectedList.size() : (long) 0);
    }

    private Condition buildConditions(ThongTinCapNhatTaiSanCriteria criteria) {
        ConditionBuilder builder = new ConditionBuilder(this.columnConverter);
        List<Condition> allConditions = new ArrayList<Condition>();
        if (criteria != null) {
            if (criteria.getIdCapNhat() != null) {
                builder.buildFilterConditionForField(criteria.getIdCapNhat(), entityTable.column("idCapNhat"));
            }
            if (criteria.getTenTaiSan() != null) {
                builder.buildFilterConditionForField(criteria.getTenTaiSan(), entityTable.column("ten_tai_san"));
            }
            if (criteria.getNgayCapNhat() != null) {
                builder.buildFilterConditionForField(criteria.getNgayCapNhat(), entityTable.column("ngay_cap_nhat"));
            }
            if (criteria.getTaiSanId() != null) {
                builder.buildFilterConditionForField(criteria.getTaiSanId(), taiSanTable.column("id_tai_san"));
            }
            if (criteria.getDanhMucLoaiTaiSanId() != null) {
                builder.buildFilterConditionForField(criteria.getDanhMucLoaiTaiSanId(), danhMucLoaiTaiSanTable.column("id_loai_ts"));
            }
        }
        return builder.buildConditions();
    }
}
