CREATE TABLE location(
    id integer primary key,
    id_number integer not null,
    street_no integer not null,
    street_name text not null,
    city text not null,
    surburb text,
    postal_code integer not null
);