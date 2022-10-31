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
ALTER TABLE public.service_categories DROP CONSTRAINT service_categories_image_dark_id_fk;
ALTER TABLE public.service_categories DROP CONSTRAINT service_categories_image_dark_id_uq;
ALTER TABLE public.service_categories DROP COLUMN image_dark_id;
ALTER TABLE public.service_categories RENAME COLUMN image_light_id TO image_id;
  
    `)
}

exports.down = function (db) {
    return null
}

exports._meta = {
    version: 1
}
