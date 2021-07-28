CREATE TABLE doctors(
    id integer primary key,
    first_name text,
    last_name text,
    email text,
    slot_type text,
    rate real
    
);
insert into doctors (first_name,last_name,email,slot_type,rate) values('Madala','Nkosi', 'mn@gmail.com','morning',200);
insert into doctors (first_name,last_name,email,slot_type,rate) values('sandile','Nkosima', 'sn@gmail.com','midday',250);
insert into doctors (first_name,last_name,email,slot_type,rate) values('Trevor','Nkosini', 'tn@gmail.com','evening',100);