--DDLs direccion
create table region
(
    region_id      integer not null
        constraint unique_region_id
            unique,
    region_nombre  varchar not null,
    region_ordinal varchar not null
);

create table provincia
(
    provincia_id     integer not null
        constraint provincia_pk
            primary key,
    provincia_nombre varchar not null,
    region_id        integer not null
        constraint provincia_region_region_id_fk
            references region (region_id)
);

create table comuna
(
    comuna_id     integer not null
        constraint comuna_pk
            primary key,
    comuna_nombre varchar not null,
    region_id     integer not null
        constraint comuna_region_region_id_fk
            references region (region_id),
    provincia_id  integer not null
);

create table direccion
(
    dir_id        integer generated always as identity
        constraint direccion_pk
            primary key,
    dir_calle     varchar not null,
    dir_numero    varchar not null,
    dir_comuna_id integer not null
        constraint direccion_comuna_com_id_fk
            references comuna
        constraint fk_comuna
            references comuna
            on update cascade on delete cascade
);
-- DDLs direccion

-- DDLs Estado
create table estado
(
    est_id      integer generated always as identity
        constraint estado_pk
            primary key,
    descripcion varchar not null
);
-- DDLs Estado


-- DDLs Persona
create table persona
(
    per_id               integer generated always as identity
        constraint persona_pk
            primary key,
    per_rut              varchar not null
        constraint persona_pk_2
            unique,
    per_nombre           varchar not null,
    per_apellido_paterno varchar not null,
    per_apellido_materno varchar not null,
    per_sexo             char    not null,
    per_fch_ingreso      date    not null,
    per_estado_id        integer not null
        constraint persona_estado_est_id_fk
            references estado,
    per_dir_id           integer not null
        constraint persona_direccion_dir_id_fk
            references direccion,
    per_dato_contacto_id integer not null
);

comment on column persona.per_id is 'IDENTIFICADOR UNICO DE LA PERSONA';

comment on column persona.per_nombre is 'NOMBRE QUE IDENTIFICA LA PERSONA';

comment on column persona.per_sexo is '0 HOMBRE 1 MUJER';

comment on column persona.per_fch_ingreso is 'FECHA DE ALTA DE PERSONA EN SISTEMA';

create index persona_per_id_index
    on persona (per_id);

create table contacto
(
    con_id            integer not null
        primary key,
    con_rut           varchar(10),
    con_email         varchar(100),
    con_movil         varchar(12),
    con_telefono_fijo varchar(12),
    persona_per_id    integer
        references persona
);

create table pin_rules
(
    id                integer not null
        primary key,
    tiempo_penalizado integer,
    orden             integer,
    estado            varchar(10),
    rango_intento     integer,
    expiracion_bloque integer
);



create table pin_estado_log
(
    id              integer not null
        primary key,
    beneficiario_id varchar(10),
    intento         integer,
    bloqueo         integer,
    fcha_expiracion date,
    ultimo_intento  date,
    periodo         integer,
    pin_rules_id    integer
        references pin_rules,
    persona_per_id  integer
        references persona
);

-- DDLs Persona

-- DDLs Tarjeta
create table tarjeta
(
    tar_rut               varchar not null
        constraint tarjeta_persona_per_rut_fk
            references persona (per_rut),
    tar_pan               integer not null
        constraint tarjeta_pk
            unique,
    tar_est_id            integer not null
        constraint tarjeta_estado_est_id_fk
            references estado,
    tar_fch_registro      date    not null,
    tar_fch_cambio_estado date,
    tar_fch_vencimiento   date    not null
);

comment on column tarjeta.tar_pan is 'Corresponde a al numero endosado de la tarjeta';

comment on column tarjeta.tar_est_id is 'Id del estado de la tarjeta';

comment on column tarjeta.tar_fch_cambio_estado is 'Fecha en la que el estado cambió';

create table transacciones
(
    trans_id       integer generated always as identity
        constraint transacciones_pk
            primary key,
    tar_pan        integer not null
        constraint transacciones_tarjeta_tar_pan_fk
            references tarjeta (tar_pan),
    monto          integer not null,
    fch_movimiento date    not null
);

create table tipo_movimiento
(
    mov_id             integer not null
        primary key,
    mov_descripcion    varchar(15),
    transaccion_trn_id integer
        references transacciones
);
-- DDLs Tarjeta



