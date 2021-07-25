CREATE TABLE patient_info(
    id integer primary key,
    id_number integer,
    patient_name  text,
    patient_lastName text,
    contact_no text,
    reason text,
    allergy text not null,
    first_time_visit text
    
);
