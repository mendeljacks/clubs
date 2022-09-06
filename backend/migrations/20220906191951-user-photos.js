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
  ALTER TABLE users
        ADD COLUMN photo_id int null,
        ADD CONSTRAINT users_photo_id_uq UNIQUE (photo_id),
        ADD CONSTRAINT users_photo_id_fk FOREIGN KEY (photo_id) REFERENCES public.photos(id)

    `)
}

exports.down = function (db) {
    return null
}

exports._meta = {
    version: 1
}
