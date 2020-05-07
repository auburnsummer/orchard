drop schema if exists orchard cascade;

create schema orchard;

ALTER DEFAULT PRIVILEGES FOR USER myAdmin
    REVOKE EXECUTE ON FUNCTIONS FROM public;
    
CREATE FUNCTION orchard.test(a integer, b integer)
RETURNS integer AS $$
 SELECT a + b;
$$ LANGUAGE SQL IMMUTABLE;

drop role if exists web_anon;
create role web_anon nologin;

grant usage on schema orchard to web_anon;


drop role if exists authenticator;
create role authenticator noinherit login;


grant web_anon to authenticator;
