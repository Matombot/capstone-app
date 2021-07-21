CREATE TABLE patient_info(
    id integer primary key,
    id_number integer not null,
    patient_name  text not null,
    patient_lastName text not null,
    contact_no text not null,
    reason text not null,
    first_time_visit text not null,
    symptoms object not null 

);
CREATE TABLE Medication_info(
    id integer primary key,
    medication_name  text
);

CREATE TABLE medical_history(
    id integer primary key,
    previous_diagnosed_sickness text not null,
    chronic_condition text not null,
    allergies text not null
);

CREATE TABLE location(
    id integer primary key,
    id_number integer not null,
    street_no integer not null,
    street_name text not null,
    city text not null,
    surburb text,
    postal_code integer not null
);
create TABLE doctors_info1(
    id integer primary key,
    patient_info_id integer not null,
    Medication_info_id integer not null,
    medical_history_id integer not null,
    foreign key (patient_info_id) references patient_info(id),
    foregn key(Medication_info_id) references Medication_info(id),
    foreign key(medical_history_id) references medical_history(id)
);