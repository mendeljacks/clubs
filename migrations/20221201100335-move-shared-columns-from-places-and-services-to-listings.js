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
    ALTER TABLE public.listings RENAME COLUMN description TO name;
    ALTER TABLE public.listings ADD google_place_id varchar(10485760) NULL;
    ALTER TABLE public.listings ADD city varchar(10485760) NULL;
    UPDATE listings SET "name"=places."name", "google_place_id"=places."google_place_id", "city"=places."city" FROM places WHERE listings.id = places.listing_id;
    UPDATE listings SET "name"=services."name", "google_place_id"=services."google_place_id", "city"=services."city" FROM services WHERE listings.id = services.listing_id;
    ALTER TABLE places DROP CONSTRAINT places_google_place_id_uq;
    ALTER TABLE places DROP CONSTRAINT places_name_uq;
    DROP INDEX IF EXISTS places_google_place_id_uq;
    DROP INDEX IF EXISTS places_name_uq;
    ALTER TABLE public.places DROP COLUMN name, DROP COLUMN google_place_id, DROP COLUMN city;
    ALTER TABLE public.services DROP COLUMN name, DROP COLUMN google_place_id, DROP COLUMN city;
  `)
};

exports.down = function(db) {
  return db.runSql(`
    ALTER TABLE public.services ADD name varchar(10485760) NULL;
    ALTER TABLE public.services ADD google_place_id varchar(10485760) NULL;
    ALTER TABLE public.services ADD city varchar(10485760) NULL;
    ALTER TABLE public.places ADD name varchar(10485760) NULL;
    ALTER TABLE public.places ADD google_place_id varchar(10485760) NULL;
    ALTER TABLE public.places ADD city varchar(10485760) NULL;
    UPDATE services SET "name"=listings."name", "google_place_id"=listings."google_place_id", "city"=listings."city" FROM listings WHERE services.listing_id = listings.id;
    UPDATE services SET "name"="", "city"="" WHERE "name" IS NULL OR "city" IS NULL;
    UPDATE places SET "name"=listings."name", "google_place_id"=listings."google_place_id", "city"=listings."city" FROM listings WHERE places.listing_id = listings.id;
    UPDATE places SET "name"="" WHERE "name" IS NULL;
    ALTER TABLE services ALTER COLUMN name SET NOT NULL;
    ALTER TABLE services ALTER COLUMN city SET NOT NULL;
    ALTER TABLE public.listings DROP COLUMN google_place_id, DROP COLUMN city;
    ALTER TABLE public.listings RENAME COLUMN name TO description;
  `)
};

exports._meta = {
  "version": 1
};
