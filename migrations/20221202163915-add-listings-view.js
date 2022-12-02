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
    create view listings_full_info_view as
    select listings.*, coalesce(places."location", services."location", null) as location
    from listings
    left join places on places.listing_id = listings.id
    left join services on services.listing_id = listings.id
    order by id asc;
  `)
};

exports.down = function(db) {
  return db.runSql(`
    DROP VIEW IF EXISTS listings_full_info_view;
  `)
};

exports._meta = {
  "version": 1
};
