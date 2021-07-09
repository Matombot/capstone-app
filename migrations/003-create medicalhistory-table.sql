CREATE TABLE medical_history(
    id integer primary key,
    previous_diagnosed_sickness text not null,
    chronic_condition text not null,
    allergies text not null
);