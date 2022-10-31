export const orma_schema = {
  "migrations": {
    "$database_type": "postgres",
    "id": {
      "data_type": "integer",
      "ordinal_position": 1,
      "not_null": true,
      "character_count": 32,
      "default": "nextval('migrations_id_seq'::regclass)"
    },
    "run_on": {
      "data_type": "timestamp without time zone",
      "ordinal_position": 3,
      "not_null": true,
      "decimal_places": 6
    },
    "name": {
      "data_type": "character varying",
      "ordinal_position": 2,
      "not_null": true,
      "character_count": 255
    },
    "$indexes": [
      {
        "index_name": "migrations_pkey",
        "is_unique": true,
        "fields": [
          "id"
        ],
        "invisible": false
      }
    ]
  },
  "listings": {
    "$database_type": "postgres",
    "id": {
      "data_type": "integer",
      "ordinal_position": 1,
      "not_null": true,
      "primary_key": true,
      "character_count": 32,
      "default": "BY DEFAULT"
    },
    "user_id": {
      "data_type": "integer",
      "ordinal_position": 2,
      "not_null": true,
      "character_count": 32,
      "references": {
        "users": {
          "id": {}
        }
      }
    },
    "created_at": {
      "data_type": "timestamp without time zone",
      "ordinal_position": 4,
      "not_null": true,
      "decimal_places": 6,
      "default": "now()"
    },
    "updated_at": {
      "data_type": "timestamp without time zone",
      "ordinal_position": 5,
      "not_null": true,
      "decimal_places": 6,
      "default": "now()"
    },
    "description": {
      "data_type": "character varying",
      "ordinal_position": 3,
      "not_null": true,
      "character_count": 10485760
    },
    "resource_id": {
      "data_type": "character varying",
      "ordinal_position": 6,
      "not_null": true,
      "character_count": 10485760
    },
    "$indexes": [
      {
        "index_name": "listings_pkey",
        "is_unique": true,
        "fields": [
          "id"
        ],
        "invisible": false
      },
      {
        "index_name": "listings_resource_id_uq",
        "is_unique": true,
        "fields": [
          "resource_id"
        ],
        "invisible": false
      }
    ]
  },
  "service_categories": {
    "$database_type": "postgres",
    "id": {
      "data_type": "integer",
      "ordinal_position": 1,
      "not_null": true,
      "primary_key": true,
      "character_count": 32,
      "default": "BY DEFAULT"
    },
    "image_id": {
      "data_type": "integer",
      "ordinal_position": 3,
      "character_count": 32,
      "references": {
        "photos": {
          "id": {}
        }
      }
    },
    "created_at": {
      "data_type": "timestamp without time zone",
      "ordinal_position": 5,
      "not_null": true,
      "decimal_places": 6,
      "default": "now()"
    },
    "updated_at": {
      "data_type": "timestamp without time zone",
      "ordinal_position": 6,
      "not_null": true,
      "decimal_places": 6,
      "default": "now()"
    },
    "name": {
      "data_type": "character varying",
      "ordinal_position": 2,
      "not_null": true,
      "character_count": 10485760
    },
    "resource_id": {
      "data_type": "character varying",
      "ordinal_position": 7,
      "not_null": true,
      "character_count": 10485760
    },
    "$indexes": [
      {
        "index_name": "service_categories_image_light_id_uq",
        "is_unique": true,
        "fields": [
          "image_id"
        ],
        "invisible": false
      },
      {
        "index_name": "service_categories_name_uq",
        "is_unique": true,
        "fields": [
          "name"
        ],
        "invisible": false
      },
      {
        "index_name": "service_categories_pkey",
        "is_unique": true,
        "fields": [
          "id"
        ],
        "invisible": false
      },
      {
        "index_name": "service_categories_resource_id_uq",
        "is_unique": true,
        "fields": [
          "resource_id"
        ],
        "invisible": false
      }
    ]
  },
  "service_has_categories": {
    "$database_type": "postgres",
    "id": {
      "data_type": "integer",
      "ordinal_position": 1,
      "not_null": true,
      "primary_key": true,
      "character_count": 32,
      "default": "BY DEFAULT"
    },
    "service_id": {
      "data_type": "integer",
      "ordinal_position": 2,
      "not_null": true,
      "character_count": 32,
      "references": {
        "services": {
          "id": {}
        }
      }
    },
    "service_category_id": {
      "data_type": "integer",
      "ordinal_position": 3,
      "not_null": true,
      "character_count": 32,
      "references": {
        "service_categories": {
          "id": {}
        }
      }
    },
    "created_at": {
      "data_type": "timestamp without time zone",
      "ordinal_position": 4,
      "not_null": true,
      "decimal_places": 6,
      "default": "now()"
    },
    "updated_at": {
      "data_type": "timestamp without time zone",
      "ordinal_position": 5,
      "not_null": true,
      "decimal_places": 6,
      "default": "now()"
    },
    "resource_id": {
      "data_type": "character varying",
      "ordinal_position": 6,
      "not_null": true,
      "character_count": 10485760
    },
    "$indexes": [
      {
        "index_name": "service_has_categories_pkey",
        "is_unique": true,
        "fields": [
          "id"
        ],
        "invisible": false
      },
      {
        "index_name": "service_has_categories_resource_id_uq",
        "is_unique": true,
        "fields": [
          "resource_id"
        ],
        "invisible": false
      },
      {
        "index_name": "service_has_categories_service_id_uq",
        "is_unique": true,
        "fields": [
          "service_id"
        ],
        "invisible": false
      },
      {
        "index_name": "service_has_categories_service_type_id_service_id_uq",
        "is_unique": true,
        "fields": [
          "service_category_id",
          "service_id"
        ],
        "invisible": false
      }
    ]
  },
  "likes": {
    "$database_type": "postgres",
    "id": {
      "data_type": "integer",
      "ordinal_position": 1,
      "not_null": true,
      "primary_key": true,
      "character_count": 32,
      "default": "BY DEFAULT"
    },
    "user_id": {
      "data_type": "integer",
      "ordinal_position": 2,
      "not_null": true,
      "character_count": 32,
      "references": {
        "users": {
          "id": {}
        }
      }
    },
    "review_id": {
      "data_type": "integer",
      "ordinal_position": 3,
      "not_null": true,
      "character_count": 32,
      "references": {
        "reviews": {
          "id": {}
        }
      }
    },
    "created_at": {
      "data_type": "timestamp without time zone",
      "ordinal_position": 4,
      "not_null": true,
      "decimal_places": 6,
      "default": "now()"
    },
    "updated_at": {
      "data_type": "timestamp without time zone",
      "ordinal_position": 5,
      "not_null": true,
      "decimal_places": 6,
      "default": "now()"
    },
    "resource_id": {
      "data_type": "character varying",
      "ordinal_position": 6,
      "not_null": true,
      "character_count": 10485760
    },
    "$indexes": [
      {
        "index_name": "likes_pkey",
        "is_unique": true,
        "fields": [
          "id"
        ],
        "invisible": false
      },
      {
        "index_name": "likes_resource_id_uq",
        "is_unique": true,
        "fields": [
          "resource_id"
        ],
        "invisible": false
      },
      {
        "index_name": "likes_user_id_review_id_uq",
        "is_unique": true,
        "fields": [
          "review_id",
          "user_id"
        ],
        "invisible": false
      }
    ]
  },
  "follows": {
    "$database_type": "postgres",
    "id": {
      "data_type": "integer",
      "ordinal_position": 1,
      "not_null": true,
      "primary_key": true,
      "character_count": 32,
      "default": "BY DEFAULT"
    },
    "from_user_id": {
      "data_type": "integer",
      "ordinal_position": 2,
      "not_null": true,
      "character_count": 32,
      "references": {
        "users": {
          "id": {}
        }
      }
    },
    "to_user_id": {
      "data_type": "integer",
      "ordinal_position": 3,
      "not_null": true,
      "character_count": 32,
      "references": {
        "users": {
          "id": {}
        }
      }
    },
    "created_at": {
      "data_type": "timestamp without time zone",
      "ordinal_position": 4,
      "not_null": true,
      "decimal_places": 6,
      "default": "now()"
    },
    "updated_at": {
      "data_type": "timestamp without time zone",
      "ordinal_position": 5,
      "not_null": true,
      "decimal_places": 6,
      "default": "now()"
    },
    "resource_id": {
      "data_type": "character varying",
      "ordinal_position": 6,
      "not_null": true,
      "character_count": 10485760
    },
    "$indexes": [
      {
        "index_name": "follows_from_user_id_to_user_id_uq",
        "is_unique": true,
        "fields": [
          "to_user_id",
          "from_user_id"
        ],
        "invisible": false
      },
      {
        "index_name": "follows_pkey",
        "is_unique": true,
        "fields": [
          "id"
        ],
        "invisible": false
      },
      {
        "index_name": "follows_resource_id_uq",
        "is_unique": true,
        "fields": [
          "resource_id"
        ],
        "invisible": false
      }
    ]
  },
  "services": {
    "$database_type": "postgres",
    "id": {
      "data_type": "integer",
      "ordinal_position": 1,
      "not_null": true,
      "primary_key": true,
      "character_count": 32,
      "default": "BY DEFAULT"
    },
    "listing_id": {
      "data_type": "integer",
      "ordinal_position": 2,
      "not_null": true,
      "character_count": 32,
      "references": {
        "listings": {
          "id": {}
        }
      }
    },
    "price_level": {
      "data_type": "integer",
      "ordinal_position": 8,
      "character_count": 32
    },
    "created_at": {
      "data_type": "timestamp without time zone",
      "ordinal_position": 9,
      "not_null": true,
      "decimal_places": 6,
      "default": "now()"
    },
    "updated_at": {
      "data_type": "timestamp without time zone",
      "ordinal_position": 10,
      "not_null": true,
      "decimal_places": 6,
      "default": "now()"
    },
    "name": {
      "data_type": "character varying",
      "ordinal_position": 3,
      "not_null": true,
      "character_count": 10485760
    },
    "city": {
      "data_type": "character varying",
      "ordinal_position": 5,
      "not_null": true,
      "character_count": 10485760
    },
    "website": {
      "data_type": "character varying",
      "ordinal_position": 6,
      "character_count": 10485760
    },
    "phone": {
      "data_type": "character varying",
      "ordinal_position": 7,
      "character_count": 10485760
    },
    "resource_id": {
      "data_type": "character varying",
      "ordinal_position": 11,
      "not_null": true,
      "character_count": 10485760
    },
    "instagram": {
      "data_type": "character varying",
      "ordinal_position": 12
    },
    "facebook": {
      "data_type": "character varying",
      "ordinal_position": 13
    },
    "telegram": {
      "data_type": "character varying",
      "ordinal_position": 14
    },
    "linkedin": {
      "data_type": "character varying",
      "ordinal_position": 15
    },
    "tiktok": {
      "data_type": "character varying",
      "ordinal_position": 16
    },
    "type": {
      "data_type": "character varying",
      "ordinal_position": 17,
      "character_count": 300
    },
    "$indexes": [
      {
        "index_name": "services_listing_id_uq",
        "is_unique": true,
        "fields": [
          "listing_id"
        ],
        "invisible": false
      },
      {
        "index_name": "services_pkey",
        "is_unique": true,
        "fields": [
          "id"
        ],
        "invisible": false
      },
      {
        "index_name": "services_resource_id_uq",
        "is_unique": true,
        "fields": [
          "resource_id"
        ],
        "invisible": false
      }
    ]
  },
  "listing_has_photos": {
    "$database_type": "postgres",
    "id": {
      "data_type": "integer",
      "ordinal_position": 1,
      "not_null": true,
      "primary_key": true,
      "character_count": 32,
      "default": "BY DEFAULT"
    },
    "listing_id": {
      "data_type": "integer",
      "ordinal_position": 2,
      "not_null": true,
      "character_count": 32,
      "references": {
        "listings": {
          "id": {}
        }
      }
    },
    "photo_id": {
      "data_type": "integer",
      "ordinal_position": 3,
      "not_null": true,
      "character_count": 32,
      "references": {
        "photos": {
          "id": {}
        }
      }
    },
    "created_at": {
      "data_type": "timestamp without time zone",
      "ordinal_position": 4,
      "not_null": true,
      "decimal_places": 6,
      "default": "now()"
    },
    "updated_at": {
      "data_type": "timestamp without time zone",
      "ordinal_position": 5,
      "not_null": true,
      "decimal_places": 6,
      "default": "now()"
    },
    "resource_id": {
      "data_type": "character varying",
      "ordinal_position": 6,
      "not_null": true,
      "character_count": 10485760
    },
    "$indexes": [
      {
        "index_name": "listing_has_photos_listing_id_photo_id_uq",
        "is_unique": true,
        "fields": [
          "photo_id",
          "listing_id"
        ],
        "invisible": false
      },
      {
        "index_name": "listing_has_photos_pkey",
        "is_unique": true,
        "fields": [
          "id"
        ],
        "invisible": false
      },
      {
        "index_name": "listing_has_photos_resource_id_uq",
        "is_unique": true,
        "fields": [
          "resource_id"
        ],
        "invisible": false
      }
    ]
  },
  "review_has_visit_types": {
    "$database_type": "postgres",
    "id": {
      "data_type": "integer",
      "ordinal_position": 1,
      "not_null": true,
      "primary_key": true,
      "character_count": 32,
      "default": "BY DEFAULT"
    },
    "review_id": {
      "data_type": "integer",
      "ordinal_position": 2,
      "not_null": true,
      "character_count": 32,
      "references": {
        "reviews": {
          "id": {}
        }
      }
    },
    "review_visit_type_id": {
      "data_type": "integer",
      "ordinal_position": 3,
      "not_null": true,
      "character_count": 32,
      "references": {
        "review_visit_types": {
          "id": {}
        }
      }
    },
    "created_at": {
      "data_type": "timestamp without time zone",
      "ordinal_position": 4,
      "not_null": true,
      "decimal_places": 6,
      "default": "now()"
    },
    "updated_at": {
      "data_type": "timestamp without time zone",
      "ordinal_position": 5,
      "not_null": true,
      "decimal_places": 6,
      "default": "now()"
    },
    "resource_id": {
      "data_type": "character varying",
      "ordinal_position": 6,
      "not_null": true,
      "character_count": 10485760
    },
    "$indexes": [
      {
        "index_name": "review_has_visit_types_pkey",
        "is_unique": true,
        "fields": [
          "id"
        ],
        "invisible": false
      },
      {
        "index_name": "review_has_visit_types_resource_id_uq",
        "is_unique": true,
        "fields": [
          "resource_id"
        ],
        "invisible": false
      },
      {
        "index_name": "review_has_visit_types_review_id_uq",
        "is_unique": true,
        "fields": [
          "review_id"
        ],
        "invisible": false
      }
    ]
  },
  "listing_has_categories": {
    "$database_type": "postgres",
    "id": {
      "data_type": "integer",
      "ordinal_position": 1,
      "not_null": true,
      "primary_key": true,
      "character_count": 32,
      "default": "BY DEFAULT"
    },
    "listing_id": {
      "data_type": "integer",
      "ordinal_position": 2,
      "not_null": true,
      "character_count": 32,
      "references": {
        "listings": {
          "id": {}
        }
      }
    },
    "category_id": {
      "data_type": "integer",
      "ordinal_position": 3,
      "not_null": true,
      "character_count": 32,
      "references": {
        "categories": {
          "id": {}
        }
      }
    },
    "created_at": {
      "data_type": "timestamp without time zone",
      "ordinal_position": 4,
      "not_null": true,
      "decimal_places": 6,
      "default": "now()"
    },
    "updated_at": {
      "data_type": "timestamp without time zone",
      "ordinal_position": 5,
      "not_null": true,
      "decimal_places": 6,
      "default": "now()"
    },
    "resource_id": {
      "data_type": "character varying",
      "ordinal_position": 6,
      "not_null": true,
      "character_count": 10485760
    },
    "$indexes": [
      {
        "index_name": "listing_has_categories_listing_id_category_id_uq",
        "is_unique": true,
        "fields": [
          "category_id",
          "listing_id"
        ],
        "invisible": false
      },
      {
        "index_name": "listing_has_categories_pkey",
        "is_unique": true,
        "fields": [
          "id"
        ],
        "invisible": false
      },
      {
        "index_name": "listing_has_categories_resource_id_uq",
        "is_unique": true,
        "fields": [
          "resource_id"
        ],
        "invisible": false
      }
    ]
  },
  "categories": {
    "$database_type": "postgres",
    "id": {
      "data_type": "integer",
      "ordinal_position": 1,
      "not_null": true,
      "primary_key": true,
      "character_count": 32,
      "default": "BY DEFAULT"
    },
    "created_at": {
      "data_type": "timestamp without time zone",
      "ordinal_position": 3,
      "not_null": true,
      "decimal_places": 6,
      "default": "now()"
    },
    "updated_at": {
      "data_type": "timestamp without time zone",
      "ordinal_position": 4,
      "not_null": true,
      "decimal_places": 6,
      "default": "now()"
    },
    "name": {
      "data_type": "character varying",
      "ordinal_position": 2,
      "not_null": true,
      "character_count": 10485760
    },
    "resource_id": {
      "data_type": "character varying",
      "ordinal_position": 5,
      "not_null": true,
      "character_count": 10485760
    },
    "$indexes": [
      {
        "index_name": "categories_name_uq",
        "is_unique": true,
        "fields": [
          "name"
        ],
        "invisible": false
      },
      {
        "index_name": "categories_pkey",
        "is_unique": true,
        "fields": [
          "id"
        ],
        "invisible": false
      },
      {
        "index_name": "categories_resource_id_uq",
        "is_unique": true,
        "fields": [
          "resource_id"
        ],
        "invisible": false
      }
    ]
  },
  "review_visit_types": {
    "$database_type": "postgres",
    "id": {
      "data_type": "integer",
      "ordinal_position": 1,
      "not_null": true,
      "primary_key": true,
      "character_count": 32,
      "default": "BY DEFAULT"
    },
    "created_at": {
      "data_type": "timestamp without time zone",
      "ordinal_position": 3,
      "not_null": true,
      "decimal_places": 6,
      "default": "now()"
    },
    "updated_at": {
      "data_type": "timestamp without time zone",
      "ordinal_position": 4,
      "not_null": true,
      "decimal_places": 6,
      "default": "now()"
    },
    "name": {
      "data_type": "character varying",
      "ordinal_position": 2,
      "not_null": true,
      "character_count": 10485760
    },
    "resource_id": {
      "data_type": "character varying",
      "ordinal_position": 5,
      "not_null": true,
      "character_count": 10485760
    },
    "$indexes": [
      {
        "index_name": "review_visit_types_name_uq",
        "is_unique": true,
        "fields": [
          "name"
        ],
        "invisible": false
      },
      {
        "index_name": "review_visit_types_pkey",
        "is_unique": true,
        "fields": [
          "id"
        ],
        "invisible": false
      },
      {
        "index_name": "review_visit_types_resource_id_uq",
        "is_unique": true,
        "fields": [
          "resource_id"
        ],
        "invisible": false
      }
    ]
  },
  "places": {
    "$database_type": "postgres",
    "id": {
      "data_type": "integer",
      "ordinal_position": 1,
      "not_null": true,
      "primary_key": true,
      "character_count": 32,
      "default": "BY DEFAULT"
    },
    "created_at": {
      "data_type": "timestamp without time zone",
      "ordinal_position": 4,
      "not_null": true,
      "decimal_places": 6,
      "default": "now()"
    },
    "updated_at": {
      "data_type": "timestamp without time zone",
      "ordinal_position": 5,
      "not_null": true,
      "decimal_places": 6,
      "default": "now()"
    },
    "listing_id": {
      "data_type": "integer",
      "ordinal_position": 7,
      "not_null": true,
      "character_count": 32,
      "references": {
        "listings": {
          "id": {}
        }
      }
    },
    "name": {
      "data_type": "character varying",
      "ordinal_position": 2,
      "not_null": true,
      "character_count": 10485760
    },
    "google_place_id": {
      "data_type": "character varying",
      "ordinal_position": 3,
      "character_count": 10485760
    },
    "resource_id": {
      "data_type": "character varying",
      "ordinal_position": 6,
      "not_null": true,
      "character_count": 10485760
    },
    "city": {
      "data_type": "character varying",
      "ordinal_position": 8,
      "character_count": 100
    },
    "$indexes": [
      {
        "index_name": "places_google_place_id_uq",
        "is_unique": true,
        "fields": [
          "google_place_id"
        ],
        "invisible": false
      },
      {
        "index_name": "places_listing_id_uq",
        "is_unique": true,
        "fields": [
          "listing_id"
        ],
        "invisible": false
      },
      {
        "index_name": "places_name_uq",
        "is_unique": true,
        "fields": [
          "name"
        ],
        "invisible": false
      },
      {
        "index_name": "places_pkey",
        "is_unique": true,
        "fields": [
          "id"
        ],
        "invisible": false
      },
      {
        "index_name": "places_resource_id_uq",
        "is_unique": true,
        "fields": [
          "resource_id"
        ],
        "invisible": false
      }
    ]
  },
  "reviews": {
    "$database_type": "postgres",
    "rating": {
      "data_type": "integer",
      "ordinal_position": 4,
      "not_null": true,
      "character_count": 32
    },
    "created_at": {
      "data_type": "timestamp without time zone",
      "ordinal_position": 6,
      "not_null": true,
      "decimal_places": 6,
      "default": "now()"
    },
    "updated_at": {
      "data_type": "timestamp without time zone",
      "ordinal_position": 7,
      "not_null": true,
      "decimal_places": 6,
      "default": "now()"
    },
    "listing_id": {
      "data_type": "integer",
      "ordinal_position": 9,
      "not_null": true,
      "character_count": 32,
      "references": {
        "listings": {
          "id": {}
        }
      }
    },
    "id": {
      "data_type": "integer",
      "ordinal_position": 1,
      "not_null": true,
      "primary_key": true,
      "character_count": 32,
      "default": "BY DEFAULT"
    },
    "user_id": {
      "data_type": "integer",
      "ordinal_position": 2,
      "not_null": true,
      "character_count": 32,
      "references": {
        "users": {
          "id": {}
        }
      }
    },
    "comment": {
      "data_type": "character varying",
      "ordinal_position": 5,
      "not_null": true,
      "character_count": 10485760
    },
    "resource_id": {
      "data_type": "character varying",
      "ordinal_position": 8,
      "not_null": true,
      "character_count": 10485760
    },
    "$indexes": [
      {
        "index_name": "reviews_pkey",
        "is_unique": true,
        "fields": [
          "id"
        ],
        "invisible": false
      },
      {
        "index_name": "reviews_resource_id_uq",
        "is_unique": true,
        "fields": [
          "resource_id"
        ],
        "invisible": false
      }
    ]
  },
  "users": {
    "$database_type": "postgres",
    "id": {
      "data_type": "integer",
      "ordinal_position": 1,
      "not_null": true,
      "primary_key": true,
      "character_count": 32,
      "default": "BY DEFAULT"
    },
    "created_at": {
      "data_type": "timestamp without time zone",
      "ordinal_position": 7,
      "not_null": true,
      "decimal_places": 6,
      "default": "now()"
    },
    "updated_at": {
      "data_type": "timestamp without time zone",
      "ordinal_position": 8,
      "not_null": true,
      "decimal_places": 6,
      "default": "now()"
    },
    "photo_id": {
      "data_type": "integer",
      "ordinal_position": 10,
      "character_count": 32,
      "references": {
        "photos": {
          "id": {}
        }
      }
    },
    "last_name": {
      "data_type": "character varying",
      "ordinal_position": 5,
      "character_count": 10485760
    },
    "phone": {
      "data_type": "character varying",
      "ordinal_position": 6,
      "character_count": 10485760
    },
    "resource_id": {
      "data_type": "character varying",
      "ordinal_position": 9,
      "not_null": true,
      "character_count": 10485760
    },
    "location": {
      "data_type": "character varying",
      "ordinal_position": 11,
      "character_count": 10485760
    },
    "bio": {
      "data_type": "character varying",
      "ordinal_position": 12,
      "character_count": 10000
    },
    "fcm_token": {
      "data_type": "character varying",
      "ordinal_position": 13,
      "character_count": 10000
    },
    "email": {
      "data_type": "character varying",
      "ordinal_position": 2,
      "not_null": true,
      "character_count": 10485760
    },
    "password": {
      "data_type": "character varying",
      "ordinal_position": 3,
      "not_null": true,
      "character_count": 10485760
    },
    "first_name": {
      "data_type": "character varying",
      "ordinal_position": 4,
      "character_count": 10485760
    },
    "$indexes": [
      {
        "index_name": "users_email_uq",
        "is_unique": true,
        "fields": [
          "email"
        ],
        "invisible": false
      },
      {
        "index_name": "users_phone_uq",
        "is_unique": true,
        "fields": [
          "phone"
        ],
        "invisible": false
      },
      {
        "index_name": "users_photo_id_uq",
        "is_unique": true,
        "fields": [
          "photo_id"
        ],
        "invisible": false
      },
      {
        "index_name": "users_pkey",
        "is_unique": true,
        "fields": [
          "id"
        ],
        "invisible": false
      },
      {
        "index_name": "users_resource_id_uq",
        "is_unique": true,
        "fields": [
          "resource_id"
        ],
        "invisible": false
      }
    ]
  },
  "user_has_roles": {
    "$database_type": "postgres",
    "id": {
      "data_type": "integer",
      "ordinal_position": 1,
      "not_null": true,
      "primary_key": true,
      "character_count": 32,
      "default": "BY DEFAULT"
    },
    "user_id": {
      "data_type": "integer",
      "ordinal_position": 2,
      "not_null": true,
      "character_count": 32,
      "references": {
        "users": {
          "id": {}
        }
      }
    },
    "role_id": {
      "data_type": "integer",
      "ordinal_position": 3,
      "not_null": true,
      "character_count": 32,
      "references": {
        "roles": {
          "id": {}
        }
      }
    },
    "created_at": {
      "data_type": "timestamp without time zone",
      "ordinal_position": 4,
      "not_null": true,
      "decimal_places": 6,
      "default": "now()"
    },
    "updated_at": {
      "data_type": "timestamp without time zone",
      "ordinal_position": 5,
      "not_null": true,
      "decimal_places": 6,
      "default": "now()"
    },
    "resource_id": {
      "data_type": "character varying",
      "ordinal_position": 6,
      "not_null": true,
      "character_count": 10485760
    },
    "$indexes": [
      {
        "index_name": "user_has_roles_pkey",
        "is_unique": true,
        "fields": [
          "id"
        ],
        "invisible": false
      },
      {
        "index_name": "user_has_roles_resource_id_uq",
        "is_unique": true,
        "fields": [
          "resource_id"
        ],
        "invisible": false
      },
      {
        "index_name": "user_has_roles_user_id_role_id_uq",
        "is_unique": true,
        "fields": [
          "role_id",
          "user_id"
        ],
        "invisible": false
      }
    ]
  },
  "roles": {
    "$database_type": "postgres",
    "id": {
      "data_type": "integer",
      "ordinal_position": 1,
      "not_null": true,
      "primary_key": true,
      "character_count": 32,
      "default": "BY DEFAULT"
    },
    "created_at": {
      "data_type": "timestamp without time zone",
      "ordinal_position": 3,
      "not_null": true,
      "decimal_places": 6,
      "default": "now()"
    },
    "updated_at": {
      "data_type": "timestamp without time zone",
      "ordinal_position": 4,
      "not_null": true,
      "decimal_places": 6,
      "default": "now()"
    },
    "name": {
      "data_type": "character varying",
      "ordinal_position": 2,
      "not_null": true,
      "character_count": 10485760
    },
    "resource_id": {
      "data_type": "character varying",
      "ordinal_position": 5,
      "not_null": true,
      "character_count": 10485760
    },
    "$indexes": [
      {
        "index_name": "roles_name_uq",
        "is_unique": true,
        "fields": [
          "name"
        ],
        "invisible": false
      },
      {
        "index_name": "roles_pkey",
        "is_unique": true,
        "fields": [
          "id"
        ],
        "invisible": false
      },
      {
        "index_name": "roles_resource_id_uq",
        "is_unique": true,
        "fields": [
          "resource_id"
        ],
        "invisible": false
      }
    ]
  },
  "review_has_photos": {
    "$database_type": "postgres",
    "id": {
      "data_type": "integer",
      "ordinal_position": 1,
      "not_null": true,
      "primary_key": true,
      "character_count": 32,
      "default": "BY DEFAULT"
    },
    "review_id": {
      "data_type": "integer",
      "ordinal_position": 2,
      "not_null": true,
      "character_count": 32,
      "references": {
        "reviews": {
          "id": {}
        }
      }
    },
    "photo_id": {
      "data_type": "integer",
      "ordinal_position": 3,
      "not_null": true,
      "character_count": 32,
      "references": {
        "photos": {
          "id": {}
        }
      }
    },
    "created_at": {
      "data_type": "timestamp without time zone",
      "ordinal_position": 4,
      "not_null": true,
      "decimal_places": 6,
      "default": "now()"
    },
    "updated_at": {
      "data_type": "timestamp without time zone",
      "ordinal_position": 5,
      "not_null": true,
      "decimal_places": 6,
      "default": "now()"
    },
    "resource_id": {
      "data_type": "character varying",
      "ordinal_position": 6,
      "not_null": true,
      "character_count": 10485760
    },
    "$indexes": [
      {
        "index_name": "review_has_photos_pkey",
        "is_unique": true,
        "fields": [
          "id"
        ],
        "invisible": false
      },
      {
        "index_name": "review_has_photos_resource_id_uq",
        "is_unique": true,
        "fields": [
          "resource_id"
        ],
        "invisible": false
      },
      {
        "index_name": "review_has_photos_review_id_photo_id_uq",
        "is_unique": true,
        "fields": [
          "photo_id",
          "review_id"
        ],
        "invisible": false
      }
    ]
  },
  "photos": {
    "$database_type": "postgres",
    "id": {
      "data_type": "integer",
      "ordinal_position": 1,
      "not_null": true,
      "primary_key": true,
      "character_count": 32,
      "default": "BY DEFAULT"
    },
    "created_at": {
      "data_type": "timestamp without time zone",
      "ordinal_position": 3,
      "not_null": true,
      "decimal_places": 6,
      "default": "now()"
    },
    "updated_at": {
      "data_type": "timestamp without time zone",
      "ordinal_position": 4,
      "not_null": true,
      "decimal_places": 6,
      "default": "now()"
    },
    "url": {
      "data_type": "character varying",
      "ordinal_position": 2,
      "not_null": true,
      "character_count": 10485760
    },
    "resource_id": {
      "data_type": "character varying",
      "ordinal_position": 5,
      "not_null": true,
      "character_count": 10485760
    },
    "$indexes": [
      {
        "index_name": "photos_pkey",
        "is_unique": true,
        "fields": [
          "id"
        ],
        "invisible": false
      },
      {
        "index_name": "photos_resource_id_uq",
        "is_unique": true,
        "fields": [
          "resource_id"
        ],
        "invisible": false
      },
      {
        "index_name": "photos_url_uq",
        "is_unique": true,
        "fields": [
          "url"
        ],
        "invisible": false
      }
    ]
  },
  "review_has_types": {
    "$database_type": "postgres",
    "review_type_id": {
      "data_type": "integer",
      "ordinal_position": 3,
      "not_null": true,
      "character_count": 32,
      "references": {
        "review_types": {
          "id": {}
        }
      }
    },
    "id": {
      "data_type": "integer",
      "ordinal_position": 1,
      "not_null": true,
      "primary_key": true,
      "character_count": 32,
      "default": "BY DEFAULT"
    },
    "review_id": {
      "data_type": "integer",
      "ordinal_position": 2,
      "not_null": true,
      "character_count": 32,
      "references": {
        "reviews": {
          "id": {}
        }
      }
    },
    "created_at": {
      "data_type": "timestamp without time zone",
      "ordinal_position": 4,
      "not_null": true,
      "decimal_places": 6,
      "default": "now()"
    },
    "updated_at": {
      "data_type": "timestamp without time zone",
      "ordinal_position": 5,
      "not_null": true,
      "decimal_places": 6,
      "default": "now()"
    },
    "resource_id": {
      "data_type": "character varying",
      "ordinal_position": 6,
      "not_null": true,
      "character_count": 10485760
    },
    "$indexes": [
      {
        "index_name": "review_has_types_pkey",
        "is_unique": true,
        "fields": [
          "id"
        ],
        "invisible": false
      },
      {
        "index_name": "review_has_types_resource_id_uq",
        "is_unique": true,
        "fields": [
          "resource_id"
        ],
        "invisible": false
      },
      {
        "index_name": "review_has_types_review_type_id_review_id_uq",
        "is_unique": true,
        "fields": [
          "review_type_id",
          "review_id"
        ],
        "invisible": false
      }
    ]
  },
  "review_types": {
    "$database_type": "postgres",
    "id": {
      "data_type": "integer",
      "ordinal_position": 1,
      "not_null": true,
      "primary_key": true,
      "character_count": 32,
      "default": "BY DEFAULT"
    },
    "created_at": {
      "data_type": "timestamp without time zone",
      "ordinal_position": 3,
      "not_null": true,
      "decimal_places": 6,
      "default": "now()"
    },
    "updated_at": {
      "data_type": "timestamp without time zone",
      "ordinal_position": 4,
      "not_null": true,
      "decimal_places": 6,
      "default": "now()"
    },
    "name": {
      "data_type": "character varying",
      "ordinal_position": 2,
      "not_null": true,
      "character_count": 10485760
    },
    "resource_id": {
      "data_type": "character varying",
      "ordinal_position": 5,
      "not_null": true,
      "character_count": 10485760
    },
    "$indexes": [
      {
        "index_name": "review_types_name_uq",
        "is_unique": true,
        "fields": [
          "name"
        ],
        "invisible": false
      },
      {
        "index_name": "review_types_pkey",
        "is_unique": true,
        "fields": [
          "id"
        ],
        "invisible": false
      },
      {
        "index_name": "review_types_resource_id_uq",
        "is_unique": true,
        "fields": [
          "resource_id"
        ],
        "invisible": false
      }
    ]
  },
  "listing_has_features": {
    "$database_type": "postgres",
    "id": {
      "data_type": "integer",
      "ordinal_position": 1,
      "not_null": true,
      "primary_key": true,
      "character_count": 32,
      "default": "BY DEFAULT"
    },
    "listing_id": {
      "data_type": "integer",
      "ordinal_position": 2,
      "not_null": true,
      "character_count": 32,
      "references": {
        "listings": {
          "id": {}
        }
      }
    },
    "feature_id": {
      "data_type": "integer",
      "ordinal_position": 3,
      "not_null": true,
      "character_count": 32,
      "references": {
        "listing_features": {
          "id": {}
        }
      }
    },
    "created_at": {
      "data_type": "timestamp without time zone",
      "ordinal_position": 4,
      "not_null": true,
      "decimal_places": 6,
      "default": "now()"
    },
    "updated_at": {
      "data_type": "timestamp without time zone",
      "ordinal_position": 5,
      "not_null": true,
      "decimal_places": 6,
      "default": "now()"
    },
    "resource_id": {
      "data_type": "character varying",
      "ordinal_position": 6,
      "not_null": true,
      "character_count": 10485760
    },
    "$indexes": [
      {
        "index_name": "listing_has_features_listing_id_feature_id_uq",
        "is_unique": true,
        "fields": [
          "feature_id",
          "listing_id"
        ],
        "invisible": false
      },
      {
        "index_name": "listing_has_features_pkey",
        "is_unique": true,
        "fields": [
          "id"
        ],
        "invisible": false
      },
      {
        "index_name": "listing_has_features_resource_id_uq",
        "is_unique": true,
        "fields": [
          "resource_id"
        ],
        "invisible": false
      }
    ]
  },
  "listing_features": {
    "$database_type": "postgres",
    "id": {
      "data_type": "integer",
      "ordinal_position": 1,
      "not_null": true,
      "primary_key": true,
      "character_count": 32,
      "default": "BY DEFAULT"
    },
    "created_at": {
      "data_type": "timestamp without time zone",
      "ordinal_position": 3,
      "not_null": true,
      "decimal_places": 6,
      "default": "now()"
    },
    "updated_at": {
      "data_type": "timestamp without time zone",
      "ordinal_position": 4,
      "not_null": true,
      "decimal_places": 6,
      "default": "now()"
    },
    "name": {
      "data_type": "character varying",
      "ordinal_position": 2,
      "not_null": true,
      "character_count": 10485760
    },
    "resource_id": {
      "data_type": "character varying",
      "ordinal_position": 5,
      "not_null": true,
      "character_count": 10485760
    },
    "$indexes": [
      {
        "index_name": "listing_features_name_uq",
        "is_unique": true,
        "fields": [
          "name"
        ],
        "invisible": false
      },
      {
        "index_name": "listing_features_pkey",
        "is_unique": true,
        "fields": [
          "id"
        ],
        "invisible": false
      },
      {
        "index_name": "listing_features_resource_id_uq",
        "is_unique": true,
        "fields": [
          "resource_id"
        ],
        "invisible": false
      }
    ]
  },
  "service_has_features": {
    "$database_type": "postgres",
    "id": {
      "data_type": "integer",
      "ordinal_position": 1,
      "not_null": true,
      "primary_key": true,
      "character_count": 32,
      "default": "BY DEFAULT"
    },
    "service_id": {
      "data_type": "integer",
      "ordinal_position": 2,
      "not_null": true,
      "character_count": 32,
      "references": {
        "services": {
          "id": {}
        }
      }
    },
    "service_feature_id": {
      "data_type": "integer",
      "ordinal_position": 3,
      "not_null": true,
      "character_count": 32,
      "references": {
        "service_features": {
          "id": {}
        }
      }
    },
    "created_at": {
      "data_type": "timestamp without time zone",
      "ordinal_position": 4,
      "not_null": true,
      "decimal_places": 6,
      "default": "now()"
    },
    "updated_at": {
      "data_type": "timestamp without time zone",
      "ordinal_position": 5,
      "not_null": true,
      "decimal_places": 6,
      "default": "now()"
    },
    "resource_id": {
      "data_type": "character varying",
      "ordinal_position": 6,
      "not_null": true,
      "character_count": 10485760
    },
    "$indexes": [
      {
        "index_name": "service_has_types_pkey",
        "is_unique": true,
        "fields": [
          "id"
        ],
        "invisible": false
      },
      {
        "index_name": "service_has_types_resource_id_uq",
        "is_unique": true,
        "fields": [
          "resource_id"
        ],
        "invisible": false
      },
      {
        "index_name": "service_has_types_service_type_id_service_id_uq",
        "is_unique": true,
        "fields": [
          "service_feature_id",
          "service_id"
        ],
        "invisible": false
      }
    ]
  },
  "service_features": {
    "$database_type": "postgres",
    "id": {
      "data_type": "integer",
      "ordinal_position": 1,
      "not_null": true,
      "primary_key": true,
      "character_count": 32,
      "default": "BY DEFAULT"
    },
    "created_at": {
      "data_type": "timestamp without time zone",
      "ordinal_position": 3,
      "not_null": true,
      "decimal_places": 6,
      "default": "now()"
    },
    "updated_at": {
      "data_type": "timestamp without time zone",
      "ordinal_position": 4,
      "not_null": true,
      "decimal_places": 6,
      "default": "now()"
    },
    "name": {
      "data_type": "character varying",
      "ordinal_position": 2,
      "not_null": true,
      "character_count": 10485760
    },
    "resource_id": {
      "data_type": "character varying",
      "ordinal_position": 5,
      "not_null": true,
      "character_count": 10485760
    },
    "$indexes": [
      {
        "index_name": "service_types_name_uq",
        "is_unique": true,
        "fields": [
          "name"
        ],
        "invisible": false
      },
      {
        "index_name": "service_types_pkey",
        "is_unique": true,
        "fields": [
          "id"
        ],
        "invisible": false
      },
      {
        "index_name": "service_types_resource_id_uq",
        "is_unique": true,
        "fields": [
          "resource_id"
        ],
        "invisible": false
      }
    ]
  },
  "service_has_photos": {
    "$database_type": "postgres",
    "id": {
      "data_type": "integer",
      "ordinal_position": 1,
      "not_null": true,
      "primary_key": true,
      "character_count": 32,
      "default": "BY DEFAULT"
    },
    "service_id": {
      "data_type": "integer",
      "ordinal_position": 2,
      "not_null": true,
      "character_count": 32,
      "references": {
        "services": {
          "id": {}
        }
      }
    },
    "photo_id": {
      "data_type": "integer",
      "ordinal_position": 3,
      "not_null": true,
      "character_count": 32,
      "references": {
        "photos": {
          "id": {}
        }
      }
    },
    "created_at": {
      "data_type": "timestamp without time zone",
      "ordinal_position": 4,
      "not_null": true,
      "decimal_places": 6,
      "default": "now()"
    },
    "updated_at": {
      "data_type": "timestamp without time zone",
      "ordinal_position": 5,
      "not_null": true,
      "decimal_places": 6,
      "default": "now()"
    },
    "resource_id": {
      "data_type": "character varying",
      "ordinal_position": 6,
      "not_null": true,
      "character_count": 10485760
    },
    "$indexes": [
      {
        "index_name": "service_has_photos_pkey",
        "is_unique": true,
        "fields": [
          "id"
        ],
        "invisible": false
      },
      {
        "index_name": "service_has_photos_resource_id_uq",
        "is_unique": true,
        "fields": [
          "resource_id"
        ],
        "invisible": false
      },
      {
        "index_name": "service_has_photos_service_id_photo_id_uq",
        "is_unique": true,
        "fields": [
          "photo_id",
          "service_id"
        ],
        "invisible": false
      }
    ]
  },
  "favorites": {
    "$database_type": "postgres",
    "id": {
      "data_type": "integer",
      "ordinal_position": 1,
      "not_null": true,
      "primary_key": true,
      "character_count": 32,
      "default": "BY DEFAULT"
    },
    "listing_id": {
      "data_type": "integer",
      "ordinal_position": 2,
      "not_null": true,
      "character_count": 32,
      "references": {
        "listings": {
          "id": {}
        }
      }
    },
    "user_id": {
      "data_type": "integer",
      "ordinal_position": 3,
      "not_null": true,
      "character_count": 32,
      "references": {
        "users": {
          "id": {}
        }
      }
    },
    "created_at": {
      "data_type": "timestamp without time zone",
      "ordinal_position": 4,
      "not_null": true,
      "decimal_places": 6,
      "default": "now()"
    },
    "updated_at": {
      "data_type": "timestamp without time zone",
      "ordinal_position": 5,
      "not_null": true,
      "decimal_places": 6,
      "default": "now()"
    },
    "resource_id": {
      "data_type": "character varying",
      "ordinal_position": 6,
      "not_null": true,
      "character_count": 10485760
    },
    "$indexes": [
      {
        "index_name": "favorites_pkey",
        "is_unique": true,
        "fields": [
          "id"
        ],
        "invisible": false
      },
      {
        "index_name": "favorites_resource_id_uq",
        "is_unique": true,
        "fields": [
          "resource_id"
        ],
        "invisible": false
      },
      {
        "index_name": "favorites_user_id_listing_id_uq",
        "is_unique": true,
        "fields": [
          "user_id",
          "listing_id"
        ],
        "invisible": false
      }
    ]
  }
} as const