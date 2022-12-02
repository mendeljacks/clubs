'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db) {
  return db.runSql(`
    ALTER TABLE public.listings ADD location geography(point) NULL;
    CREATE index listings_location on listings using gist(location);
    UPDATE listings SET "location"=places."location" FROM places WHERE listings.id = places.listing_id;
    UPDATE listings SET "location"=services."location" FROM services WHERE listings.id = services.listing_id;
  `)
};

exports.down = function(db) {
  return db.runSql(`
    DROP INDEX IF EXISTS listings_location;
    ALTER TABLE public.listings DROP COLUMN location;
  `)
};

exports._meta = {
  "version": 1
};
