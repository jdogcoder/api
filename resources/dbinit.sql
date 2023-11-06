-- Drop existing views that may depend on the public or scams schema
DO $$
DECLARE
    view_name text;
BEGIN
    FOR view_name IN (
        SELECT
            table_name
        FROM
            information_schema.views
        WHERE
            table_schema = 'public'
    )
    LOOP
        EXECUTE 'DROP VIEW IF EXISTS public.' || view_name || ' CASCADE';
    END LOOP;

    RAISE NOTICE 'Views dropped.';

EXCEPTION
    WHEN others THEN
        RAISE NOTICE 'Error dropping views: %', SQLERRM;

END $$;


DROP SCHEMA IF EXISTS scams CASCADE;

-- Create a new schema
CREATE SCHEMA IF NOT EXISTS scams;

-- Create the scams classifications table
CREATE TABLE scams.classifications (
    id SERIAL PRIMARY KEY,
    classification CHARACTER VARYING UNIQUE NOT NULL,
    domain_count INT NOT NULL,
    link_count INT NOT NULL,
    phone_count INT NOT NULL,
    email_count INT NOT NULL
);

-- Insert initial rows into the classifications table
INSERT INTO scams.classifications (
    classification,
    domain_count,
    link_count,
    phone_count,
    email_count
)
VALUES
    ('Protected (Safe)', 0, 0, 0, 0),
    ('Protected (Other Phishing/Scam API or Project)', 0, 0, 0, 0),
    ('Phishing/Scam', 0, 0, 0, 0),
    ('Malware', 0, 0, 0, 0),
    ('Spam', 0, 0, 0, 0),
    ('Other', 0, 0, 0, 0);

DROP TABLE IF EXISTS public.users CASCADE;

-- Create the users table
CREATE TABLE public.users (
    id SERIAL PRIMARY KEY,
    username CHARACTER VARYING(64) UNIQUE NOT NULL,
    first_name CHARACTER VARYING(64) NOT NULL,
    last_name CHARACTER VARYING(64) NOT NULL,
    email CHARACTER VARYING(256) UNIQUE NOT NULL,
    phone_number CHARACTER VARYING(64) UNIQUE,
    password CHARACTER VARYING(256) NOT NULL,
    hashed_token CHARACTER VARYING(256),
    created_at TIMESTAMP WITHOUT TIME zone DEFAULT now() NOT NULL,
    updated_at TIMESTAMP WITHOUT TIME zone DEFAULT now() NOT NULL
);

DROP TABLE IF EXISTS scams.domains CASCADE;

-- Create the domains table
CREATE TABLE scams.domains (
    id SERIAL PRIMARY KEY,
    domain CHARACTER VARYING UNIQUE NOT NULL,
    date_reported TIMESTAMP WITHOUT TIME zone DEFAULT now() NOT NULL,
    reported_by INT NOT NULL,
    reason CHARACTER VARYING,
    classification INT NOT NULL,
    record_created_at TIMESTAMP WITHOUT TIME zone DEFAULT now() NOT NULL,
    record_updated_at TIMESTAMP WITHOUT TIME zone DEFAULT now() NOT NULL,
    CONSTRAINT fk_reported_by_user FOREIGN KEY (reported_by) REFERENCES public.users(id),
    CONSTRAINT fk_items_classification FOREIGN KEY (classification) REFERENCES scams.classifications(id)
);

DROP TABLE IF EXISTS scams.links CASCADE;

-- Create the links table
CREATE TABLE scams.links (
    id SERIAL PRIMARY KEY,
    link CHARACTER VARYING UNIQUE NOT NULL,
    date_reported TIMESTAMP WITHOUT TIME zone DEFAULT now() NOT NULL,
    reported_by INT NOT NULL,
    reason CHARACTER VARYING,
    classification INT NOT NULL,
    record_created_at TIMESTAMP WITHOUT TIME zone DEFAULT now() NOT NULL,
    record_updated_at TIMESTAMP WITHOUT TIME zone DEFAULT now() NOT NULL,
    CONSTRAINT fk_reported_by_user FOREIGN KEY (reported_by) REFERENCES public.users(id),
    CONSTRAINT fk_items_classification FOREIGN KEY (classification) REFERENCES scams.classifications(id)
);

DROP TABLE IF EXISTS scams.emails CASCADE;

-- Create the emails table
CREATE TABLE scams.emails (
    id SERIAL PRIMARY KEY,
    email CHARACTER VARYING UNIQUE NOT NULL,
    date_reported TIMESTAMP WITHOUT TIME zone DEFAULT now() NOT NULL,
    reported_by INT NOT NULL,
    reason CHARACTER VARYING,
    classification INT NOT NULL,
    record_created_at TIMESTAMP WITHOUT TIME zone DEFAULT now() NOT NULL,
    record_updated_at TIMESTAMP WITHOUT TIME zone DEFAULT now() NOT NULL,
    CONSTRAINT fk_reported_by_user FOREIGN KEY (reported_by) REFERENCES public.users(id),
    CONSTRAINT fk_items_classification FOREIGN KEY (classification) REFERENCES scams.classifications(id)
);

DROP TABLE IF EXISTS scams.phone_numbers CASCADE;

-- Create the phone_numbers table
CREATE TABLE scams.phone_numbers (
    id SERIAL PRIMARY KEY,
    phone_number CHARACTER VARYING UNIQUE NOT NULL,
    date_reported TIMESTAMP WITHOUT TIME zone DEFAULT now() NOT NULL,
    reported_by INT NOT NULL,
    reason CHARACTER VARYING,
    classification INT NOT NULL,
    record_created_at TIMESTAMP WITHOUT TIME zone DEFAULT now() NOT NULL,
    record_updated_at TIMESTAMP WITHOUT TIME zone DEFAULT now() NOT NULL,
    CONSTRAINT fk_reported_by_user FOREIGN KEY (reported_by) REFERENCES public.users(id),
    CONSTRAINT fk_items_classification FOREIGN KEY (classification) REFERENCES scams.classifications(id)
);
