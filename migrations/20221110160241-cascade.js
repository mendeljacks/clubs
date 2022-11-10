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
    ALTER TABLE public.favorites DROP CONSTRAINT favorites_listing_id_fk;
    ALTER TABLE public.favorites ADD CONSTRAINT favorites_listing_id_fk FOREIGN KEY (listing_id) REFERENCES public.listings(id) ON DELETE CASCADE ON UPDATE CASCADE;
    
    ALTER TABLE public.favorites DROP CONSTRAINT favorites_user_id_fk;
    ALTER TABLE public.favorites ADD CONSTRAINT favorites_user_id_fk FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE ON UPDATE CASCADE;
    
    ALTER TABLE public.follows DROP CONSTRAINT follows_from_user_id_fk;
    ALTER TABLE public.follows ADD CONSTRAINT follows_from_user_id_fk FOREIGN KEY (from_user_id) REFERENCES public.users(id) ON DELETE CASCADE ON UPDATE CASCADE;
    
    ALTER TABLE public.follows DROP CONSTRAINT follows_to_user_id_fk;
    ALTER TABLE public.follows ADD CONSTRAINT follows_to_user_id_fk FOREIGN KEY (to_user_id) REFERENCES public.users(id) ON DELETE CASCADE ON UPDATE CASCADE;
    
    ALTER TABLE public.likes DROP CONSTRAINT likes_user_id_fk;
    ALTER TABLE public.likes ADD CONSTRAINT likes_user_id_fk FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE ON UPDATE CASCADE;
    
    ALTER TABLE public.listing_has_categories DROP CONSTRAINT listing_has_categories_category_id_fk;
    ALTER TABLE public.listing_has_categories ADD CONSTRAINT listing_has_categories_category_id_fk FOREIGN KEY (category_id) REFERENCES public.categories(id) ON DELETE CASCADE ON UPDATE CASCADE;
    ALTER TABLE public.listing_has_categories DROP CONSTRAINT listing_has_categories_listing_id_fk;
    ALTER TABLE public.listing_has_categories ADD CONSTRAINT listing_has_categories_listing_id_fk FOREIGN KEY (listing_id) REFERENCES public.listings(id) ON DELETE CASCADE ON UPDATE CASCADE;
    
    ALTER TABLE public.listing_has_features DROP CONSTRAINT listing_has_features_feature_id_fk;
    ALTER TABLE public.listing_has_features ADD CONSTRAINT listing_has_features_feature_id_fk FOREIGN KEY (feature_id) REFERENCES public.listing_features(id) ON DELETE CASCADE ON UPDATE CASCADE;
    ALTER TABLE public.listing_has_features DROP CONSTRAINT listing_has_features_listing_id_fk;
    ALTER TABLE public.listing_has_features ADD CONSTRAINT listing_has_features_listing_id_fk FOREIGN KEY (listing_id) REFERENCES public.listings(id) ON DELETE CASCADE ON UPDATE CASCADE;
    
    ALTER TABLE public.listing_has_photos DROP CONSTRAINT listing_has_photos_listing_id_fk;
    ALTER TABLE public.listing_has_photos ADD CONSTRAINT listing_has_photos_listing_id_fk FOREIGN KEY (listing_id) REFERENCES public.listings(id) ON DELETE CASCADE ON UPDATE CASCADE;
    ALTER TABLE public.listing_has_photos DROP CONSTRAINT listing_has_photos_photo_id_fk;
    ALTER TABLE public.listing_has_photos ADD CONSTRAINT listing_has_photos_photo_id_fk FOREIGN KEY (photo_id) REFERENCES public.photos(id) ON DELETE CASCADE ON UPDATE CASCADE;
    
    ALTER TABLE public.listings DROP CONSTRAINT listings_user_id_fk;
    ALTER TABLE public.listings ADD CONSTRAINT listings_user_id_fk FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE ON UPDATE CASCADE;
    
    ALTER TABLE public.places DROP CONSTRAINT places_listing_id_fk;
    ALTER TABLE public.places ADD CONSTRAINT places_listing_id_fk FOREIGN KEY (listing_id) REFERENCES public.listings(id) ON DELETE CASCADE ON UPDATE CASCADE;
    
    ALTER TABLE public.review_has_types DROP CONSTRAINT review_has_types_review_type_id_fk;
    ALTER TABLE public.review_has_types ADD CONSTRAINT review_has_types_review_type_id_fk FOREIGN KEY (review_type_id) REFERENCES public.review_types(id) ON DELETE CASCADE ON UPDATE CASCADE;
    
    ALTER TABLE public.review_has_visit_types DROP CONSTRAINT review_has_visit_types_review_type_id_fk;
    ALTER TABLE public.review_has_visit_types ADD CONSTRAINT review_has_visit_types_review_type_id_fk FOREIGN KEY (review_visit_type_id) REFERENCES public.review_visit_types(id) ON DELETE CASCADE ON UPDATE CASCADE;
    
    ALTER TABLE public.reviews DROP CONSTRAINT reviews_listing_id_fk;
    ALTER TABLE public.reviews ADD CONSTRAINT reviews_listing_id_fk FOREIGN KEY (listing_id) REFERENCES public.listings(id) ON DELETE CASCADE ON UPDATE CASCADE;
    ALTER TABLE public.reviews DROP CONSTRAINT reviews_user_id_fk;
    ALTER TABLE public.reviews ADD CONSTRAINT reviews_user_id_fk FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE ON UPDATE CASCADE;
    
    ALTER TABLE public.service_categories DROP CONSTRAINT service_categories_image_light_id_fk;
    ALTER TABLE public.service_categories ADD CONSTRAINT service_categories_image_light_id_fk FOREIGN KEY (image_id) REFERENCES public.photos(id) ON DELETE CASCADE ON UPDATE CASCADE;
    
    ALTER TABLE public.service_has_categories DROP CONSTRAINT service_has_categories_service_id_fk;
    ALTER TABLE public.service_has_categories ADD CONSTRAINT service_has_categories_service_id_fk FOREIGN KEY (service_id) REFERENCES public.services(id) ON DELETE CASCADE ON UPDATE CASCADE;
    ALTER TABLE public.service_has_categories DROP CONSTRAINT service_has_categories_service_type_id_fk;
    ALTER TABLE public.service_has_categories ADD CONSTRAINT service_has_categories_service_type_id_fk FOREIGN KEY (service_category_id) REFERENCES public.service_categories(id) ON DELETE CASCADE ON UPDATE CASCADE;
    
    ALTER TABLE public.service_has_features DROP CONSTRAINT service_has_types_service_id_fk;
    ALTER TABLE public.service_has_features ADD CONSTRAINT service_has_types_service_id_fk FOREIGN KEY (service_id) REFERENCES public.services(id) ON DELETE CASCADE ON UPDATE CASCADE;
    ALTER TABLE public.service_has_features DROP CONSTRAINT service_has_types_service_type_id_fk;
    ALTER TABLE public.service_has_features ADD CONSTRAINT service_has_types_service_type_id_fk FOREIGN KEY (service_feature_id) REFERENCES public.service_features(id) ON DELETE CASCADE ON UPDATE CASCADE;
    
    ALTER TABLE public.service_has_photos DROP CONSTRAINT service_has_photos_photo_id_fk;
    ALTER TABLE public.service_has_photos ADD CONSTRAINT service_has_photos_photo_id_fk FOREIGN KEY (photo_id) REFERENCES public.photos(id) ON DELETE CASCADE ON UPDATE CASCADE;
    ALTER TABLE public.service_has_photos DROP CONSTRAINT service_has_photos_service_id_fk;
    ALTER TABLE public.service_has_photos ADD CONSTRAINT service_has_photos_service_id_fk FOREIGN KEY (service_id) REFERENCES public.services(id) ON DELETE CASCADE ON UPDATE CASCADE;
    
    ALTER TABLE public.services DROP CONSTRAINT services_listing_id_fk;
    ALTER TABLE public.services ADD CONSTRAINT services_listing_id_fk FOREIGN KEY (listing_id) REFERENCES public.listings(id) ON DELETE CASCADE ON UPDATE CASCADE;
    
    ALTER TABLE public.user_has_roles DROP CONSTRAINT user_has_roles_role_id_fk;
    ALTER TABLE public.user_has_roles ADD CONSTRAINT user_has_roles_role_id_fk FOREIGN KEY (role_id) REFERENCES public.roles(id) ON DELETE CASCADE ON UPDATE CASCADE;
    ALTER TABLE public.user_has_roles DROP CONSTRAINT user_has_roles_user_id_fk;
    ALTER TABLE public.user_has_roles ADD CONSTRAINT user_has_roles_user_id_fk FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE ON UPDATE CASCADE;
    
    ALTER TABLE public.users DROP CONSTRAINT users_photo_id_fk;
    ALTER TABLE public.users ADD CONSTRAINT users_photo_id_fk FOREIGN KEY (photo_id) REFERENCES public.photos(id) ON DELETE CASCADE ON UPDATE CASCADE;
        
    `)
}

exports.down = function (db) {
    return null
}

exports._meta = {
    version: 1
}
