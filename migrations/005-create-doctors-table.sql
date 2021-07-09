create TABLE doctors_info1(
    id integer primary key,
    patient_info_id integer not null,
    Medication_info_id integer not null,
    medical_history_id integer not null,
    foreign key (patient_info_id) references patient_info(id),
    foreign key(Medication_info_id) references Medication_info(id),
    foreign key(medical_history_id) references medical_history(id)
);