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
    DROP INDEX IF EXISTS places_location;
    ALTER TABLE public.places DROP COLUMN location;
    DROP INDEX IF EXISTS services_location;
    ALTER TABLE public.services DROP COLUMN location;
  `)
};

exports.down = function(db) {
  return db.runSql(`
    ALTER TABLE public.services ADD location geography(point) NULL;
    CREATE index services_location on services using gist(location);
    ALTER TABLE public.places ADD location geography(point) NULL;
    CREATE index palces_location on places using gist(location);
    UPDATE places SET "location"=listings."location" FROM listings WHERE places.listing_id = listings.id;
    UPDATE services SET "location"=listings."location" FROM listings WHERE services.listing_id = listings.id;
    DROP INDEX IF EXISTS listings_location;
    ALTER TABLE public.listings DROP COLUMN location;
  `)
};

exports._meta = {
  "version": 1
};
