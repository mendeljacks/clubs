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
    ALTER TABLE services ADD COLUMN type varchar(300) null;  

    ALTER TABLE public.services ALTER COLUMN website DROP NOT NULL;
    ALTER TABLE public.services ALTER COLUMN phone DROP NOT NULL;
    ALTER TABLE public.services ALTER COLUMN price_level DROP NOT NULL;
    
    ALTER TABLE public.service_has_types RENAME COLUMN service_type_id TO service_feature_id;

    ALTER TABLE public.service_has_types RENAME TO service_has_features;
    ALTER TABLE public.service_types RENAME TO service_features;

  `)
}

exports.down = function (db) {
    return null
}

exports._meta = {
    version: 1
}
