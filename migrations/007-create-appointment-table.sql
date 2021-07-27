create table appointment(
    id integer primary key,
    doctor_id integer,
    patient_id integer,
    reason text,
    status text,
    slot_type text,
    diagnosis text,
    foreign key (doctor_id ) references doctors(id),
    foreign key (patient_id ) references patients(id)

);
