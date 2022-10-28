'use strict'

var dbm
var type
var seed

/**
 * We receive the dbmigrate dependency from dbmigrate initially.
 * This enables us to not have to rely on NODE_PATH.
 */
exports.setup = function (options, seedLink) {
    dbm = options.dbmigrate
    type = dbm.dataType
    seed = seedLink
}

exports.up = function (db) {
    return db.runSql(`
CREATE TABLE public.service_has_types (
    id integer primary key generated by default as identity,
    service_id int NOT NULL,
    service_type_id int NOT NULL,
    created_at timestamp NOT NULL DEFAULT NOW(),
    updated_at timestamp NOT NULL DEFAULT NOW(),
    resource_id varchar(10485760) NOT NULL,
    CONSTRAINT service_has_types_resource_id_uq UNIQUE (resource_id),
    CONSTRAINT service_has_types_service_type_id_service_id_uq UNIQUE (service_id, service_type_id),
    CONSTRAINT service_has_types_service_id_fk FOREIGN KEY (service_id) REFERENCES public.services(id),
    CONSTRAINT service_has_types_service_type_id_fk FOREIGN KEY (service_type_id) REFERENCES public.service_types(id)
);

ALTER TABLE public.services DROP COLUMN service_type;

  `)
}

exports.down = function (db) {
    return null
}

exports._meta = {
    version: 1
}
