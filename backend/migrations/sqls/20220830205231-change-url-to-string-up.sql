/* Replace with your SQL commands */
ALTER TABLE
    public.photos
ALTER COLUMN
    url TYPE varchar(10485760) USING url :: varchar;