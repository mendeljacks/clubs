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
ALTER TABLE public.likes DROP CONSTRAINT likes_review_id_fk;
ALTER TABLE public.likes ADD CONSTRAINT likes_review_id_fk FOREIGN KEY (review_id) REFERENCES public.reviews(id) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE public.review_has_photos DROP CONSTRAINT review_has_photos_photo_id_fk;
ALTER TABLE public.review_has_photos ADD CONSTRAINT review_has_photos_photo_id_fk FOREIGN KEY (photo_id) REFERENCES public.photos(id) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE public.review_has_photos DROP CONSTRAINT review_has_photos_review_id_fk;
ALTER TABLE public.review_has_photos ADD CONSTRAINT review_has_photos_review_id_fk FOREIGN KEY (review_id) REFERENCES public.reviews(id) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE public.review_has_types DROP CONSTRAINT review_has_types_review_id_fk;
ALTER TABLE public.review_has_types ADD CONSTRAINT review_has_types_review_id_fk FOREIGN KEY (review_id) REFERENCES public.reviews(id) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE public.review_has_visit_types DROP CONSTRAINT review_has_visit_types_review_id_fk;
ALTER TABLE public.review_has_visit_types ADD CONSTRAINT review_has_visit_types_review_id_fk FOREIGN KEY (review_id) REFERENCES public.reviews(id) ON DELETE CASCADE ON UPDATE CASCADE;

    `)
}

exports.down = function (db) {
    return null
}

exports._meta = {
    version: 1
}
