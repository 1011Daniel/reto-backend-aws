-- Para la RDS de PE o CL, solo cambiamos db_pe a db_cl
CREATE DATABASE IF NOT EXISTS db_pe;
USE db_pe;

-- Asegurados
CREATE TABLE insured (
  insured_id   CHAR(5)  NOT NULL,
  first_name   VARCHAR(60) NOT NULL,
  last_name_p  VARCHAR(60) NOT NULL,
  created_at   TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (insured_id),
  CONSTRAINT chk_insured_id_digits CHECK (insured_id REGEXP '^[0-9]{5}$')
) ENGINE=InnoDB;

-- Centros médicos
CREATE TABLE medical_center (
  center_id   INT AUTO_INCREMENT PRIMARY KEY,
  center_name VARCHAR(120) NOT NULL,
  address     VARCHAR(200) NULL
) ENGINE=InnoDB;

-- Especialidades
CREATE TABLE specialty (
  specialty_id INT AUTO_INCREMENT PRIMARY KEY,
  specialty_name VARCHAR(120) NOT NULL
) ENGINE=InnoDB;

-- Médicos
CREATE TABLE medic (
  medic_id     INT AUTO_INCREMENT PRIMARY KEY,
  first_name   VARCHAR(60) NOT NULL,
  last_name_p  VARCHAR(60) NOT NULL
) ENGINE=InnoDB;

-- Relación médico–especialidad
CREATE TABLE medic_specialty (
  medic_id      INT NOT NULL,
  specialty_id  INT NOT NULL,
  PRIMARY KEY (medic_id, specialty_id),
  CONSTRAINT fk_ms_medic      FOREIGN KEY (medic_id)     REFERENCES medic(medic_id),
  CONSTRAINT fk_ms_specialty  FOREIGN KEY (specialty_id) REFERENCES specialty(specialty_id)
) ENGINE=InnoDB;

-- Espacios de agenda (schedule)
CREATE TABLE schedule (
  schedule_id   INT AUTO_INCREMENT PRIMARY KEY,
  center_id     INT NOT NULL,
  specialty_id  INT NOT NULL,
  medic_id      INT NOT NULL,
  start_time    DATETIME NOT NULL,  
  end_time      DATETIME NOT NULL,
  capacity      INT NOT NULL DEFAULT 1,  
  CONSTRAINT fk_sched_center    FOREIGN KEY (center_id)    REFERENCES medical_center(center_id),
  CONSTRAINT fk_sched_spec      FOREIGN KEY (specialty_id) REFERENCES specialty(specialty_id),
  CONSTRAINT fk_sched_medic     FOREIGN KEY (medic_id)     REFERENCES medic(medic_id),
  CONSTRAINT fk_sched_medic_spec FOREIGN KEY (medic_id, specialty_id)
    REFERENCES medic_specialty(medic_id, specialty_id),
  CONSTRAINT chk_sched_time CHECK (end_time > start_time),
  UNIQUE KEY uq_unique_slot (center_id, specialty_id, medic_id, start_time)
) ENGINE=InnoDB;

-- Citas
CREATE TABLE appointment (
  appointment_id  BIGINT AUTO_INCREMENT PRIMARY KEY,
  insured_id      CHAR(5)  NOT NULL,
  schedule_id     INT      NOT NULL,
  status          ENUM('BOOKED','CANCELLED','COMPLETED') NOT NULL DEFAULT 'BOOKED',
  booked_at       TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  notes           VARCHAR(300) NULL,
  CONSTRAINT fk_appt_insured  FOREIGN KEY (insured_id)  REFERENCES insured(insured_id),
  CONSTRAINT fk_appt_schedule FOREIGN KEY (schedule_id) REFERENCES schedule(schedule_id),
  UNIQUE KEY uq_one_booking_per_schedule (schedule_id)
) ENGINE=InnoDB;

-- =========================
-- Datos de prueba
-- =========================

-- Asegurados
INSERT INTO insured(insured_id, first_name, last_name_p) VALUES
('00012','Ana','Torres'),
('01234','Luis','Pérez'),
('12345','María','Gómez');

-- Centros médicos
INSERT INTO medical_center(center_name, address) VALUES
('Centro Médico Miraflores','Av. Larco 123, Lima'),
('Centro Médico San Isidro','Calle Los Laureles 456, Lima'),
('Clínica Providencia','Av. Providencia 789, Santiago'),
('Centro Surco','Av. Caminos del Inca 321, Lima'); 

-- Especialidades
INSERT INTO specialty(specialty_name) VALUES
('Medicina General'),   
('Pediatría'),        
('Cardiología');      

-- Médicos
INSERT INTO medic(first_name, last_name_p) VALUES
('Valeria','Ríos'),
('Carlos','Silva'),
('Paula','Núñez'),
('Javier','Medina'); 

-- Relación médico–especialidad
INSERT INTO medic_specialty(medic_id, specialty_id) VALUES
(1,1),(1,3),        
(2,1),              
(3,2),              
(4,3);              

-- Schedules
INSERT INTO schedule(schedule_id, center_id, specialty_id, medic_id, start_time, end_time, capacity) VALUES
(100, 4, 3, 4, '2024-09-30 12:30:00', '2024-09-30 13:00:00', 1),
(NULL, 1, 1, 1, '2025-10-01 14:00:00', '2025-10-01 14:30:00', 1),
(NULL, 1, 3, 1, '2025-10-01 15:00:00', '2025-10-01 15:30:00', 1),
(NULL, 3, 2, 3, '2025-10-02 09:00:00', '2025-10-02 09:30:00', 1),
(NULL, 4, 3, 4, '2025-10-03 11:00:00', '2025-10-03 11:30:00', 1);

-- Citas
INSERT INTO appointment(insured_id, schedule_id, status, notes)
VALUES ('01234', 100, 'BOOKED', 'Primera consulta cardiología');

INSERT INTO appointment(insured_id, schedule_id)
VALUES ('12345', (SELECT schedule_id FROM schedule WHERE center_id=3 AND specialty_id=2 AND medic_id=3 LIMIT 1));

