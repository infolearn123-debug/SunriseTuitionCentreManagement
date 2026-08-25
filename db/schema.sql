CREATE TABLE IF NOT EXISTS classes (
  class_id SERIAL PRIMARY KEY,
  class_code TEXT UNIQUE NOT NULL,
  class_name TEXT NOT NULL,
  subjects TEXT,
  schedule_days TEXT,
  schedule_time TEXT,
  room TEXT,
  teacher_id INTEGER,
  status TEXT DEFAULT 'Active'
);

CREATE TABLE IF NOT EXISTS teachers (
  teacher_id SERIAL PRIMARY KEY,
  teacher_code TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  subject_specialty TEXT,
  class_id INTEGER,
  join_date DATE,
  status TEXT DEFAULT 'Active'
);

CREATE TABLE IF NOT EXISTS students (
  student_id SERIAL PRIMARY KEY,
  student_code TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  gender TEXT,
  age INTEGER,
  class_id INTEGER NOT NULL,
  guardian_name TEXT,
  guardian_phone TEXT,
  guardian_email TEXT,
  enrolment_date DATE,
  status TEXT DEFAULT 'Active'
);

ALTER TABLE classes ADD CONSTRAINT IF NOT EXISTS classes_teacher_fk FOREIGN KEY (teacher_id) REFERENCES teachers(teacher_id) ON DELETE SET NULL;
ALTER TABLE teachers ADD CONSTRAINT IF NOT EXISTS teachers_class_fk FOREIGN KEY (class_id) REFERENCES classes(class_id) ON DELETE SET NULL;
ALTER TABLE students ADD CONSTRAINT IF NOT EXISTS students_class_fk FOREIGN KEY (class_id) REFERENCES classes(class_id) ON DELETE RESTRICT;
