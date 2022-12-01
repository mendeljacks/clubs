import { populated_data } from '../../scripts/prepopulate'

export const admin = populated_data.roles[0].id
export const user = populated_data.roles[1].id

const everyone = [admin, user]
const admin_only = [admin]
const disabled = []
const full_access = { create: everyone, read: everyone, update: everyone, delete: everyone }
const users_read_admin_writes = {
    create: admin_only,
    read: everyone,
    update: admin_only,
    delete: admin_only
}
const admin_access = {
    create: admin_only,
    read: admin_only,
    update: admin_only,
    delete: admin_only
}

export const role_has_perms = {
    migrations: { create: disabled, read: disabled, update: disabled, delete: disabled },
    review_has_photos: full_access,
    review_has_types: full_access,
    services: full_access,
    categories: full_access,
    listing_features: full_access,
    review_types: full_access,
    service_features: full_access,
    service_has_features: full_access,
    service_has_categories: full_access,
    listing_has_features: full_access,
    favorites: full_access,
    listing_has_photos: full_access,
    listing_has_categories: full_access,
    review_visit_types: full_access,
    review_has_visit_types: full_access,
    service_has_category: full_access,
    service_categories: full_access,
    likes: full_access,
    follows: full_access,
    photos: { create: everyone, read: everyone, update: disabled, delete: everyone },
    reviews: { create: everyone, read: everyone, update: everyone, delete: admin_only },
    listings: full_access,
    places: users_read_admin_writes,
    user_has_roles: admin_access,
    roles: users_read_admin_writes,
    users: full_access
}
