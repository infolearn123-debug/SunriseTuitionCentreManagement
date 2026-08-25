INSERT INTO classes (class_code, class_name, subjects, schedule_days, schedule_time, room, status)
VALUES
  ('primary1', 'Primary 1', 'English, Mathematics', 'Mon/Wed/Fri', '4:00 PM', 'Room A1', 'Active'),
  ('primary2', 'Primary 2', 'Science, English', 'Tue/Thu', '5:00 PM', 'Room B2', 'Active'),
  ('primary3', 'Primary 3', 'Mathematics, Reading', 'Mon/Tue/Thu', '3:30 PM', 'Room C3', 'Active'),
  ('primary4', 'Primary 4', 'Creative Writing, Maths', 'Wed/Fri', '4:30 PM', 'Room D4', 'Active'),
  ('primary5', 'Primary 5', 'Science, ICT', 'Mon/Wed', '4:15 PM', 'Room E5', 'Active'),
  ('primary6', 'Primary 6', 'English, Exam Prep', 'Tue/Thu/Sat', '9:00 AM', 'Room F6', 'Active')
ON CONFLICT (class_code) DO NOTHING;

INSERT INTO teachers (teacher_code, full_name, email, phone, subject_specialty, class_id, join_date, status)
VALUES
  ('teacher01', 'Alicia Tan', 'alicia.tan@sunrise.edu', '91234567', 'Mathematics', 1, '2023-01-10', 'Active'),
  ('teacher02', 'Benjamin Chan', 'benjamin.chan@sunrise.edu', '92345678', 'Science', 2, '2022-04-06', 'Active'),
  ('teacher03', 'Cynthia Lim', 'cynthia.lim@sunrise.edu', '93456789', 'English', 3, '2021-09-15', 'Active'),
  ('teacher04', 'Daniel Ong', 'daniel.ong@sunrise.edu', '94567890', 'Reading', 4, '2024-02-21', 'Active'),
  ('teacher05', 'Evelyn Koh', 'evelyn.koh@sunrise.edu', '95678901', 'ICT', 5, '2023-06-13', 'Active'),
  ('teacher06', 'Farid Hussain', 'farid.hussain@sunrise.edu', '96789012', 'Exam Prep', 6, '2022-11-04', 'Active')
ON CONFLICT (teacher_code) DO NOTHING;

INSERT INTO students (student_code, full_name, gender, age, class_id, guardian_name, guardian_phone, guardian_email, enrolment_date, status)
VALUES
  ('primary1-student01', 'Noah Lee', 'Male', 7, 1, 'Michele Lee', '91112233', 'michele.lee@example.com', '2024-01-10', 'Active'),
  ('primary1-student02', 'Emma Lim', 'Female', 7, 1, 'Sarah Lim', '92223344', 'sarah.lim@example.com', '2024-01-12', 'Active'),
  ('primary2-student01', 'Lucas Wong', 'Male', 8, 2, 'Jasmine Wong', '93334455', 'jasmine.wong@example.com', '2024-01-08', 'Active'),
  ('primary2-student02', 'Sophie Ng', 'Female', 8, 2, 'Brian Ng', '94445566', 'brian.ng@example.com', '2024-01-09', 'Active'),
  ('primary3-student01', 'Aiden Tan', 'Male', 9, 3, 'Elaine Tan', '95556677', 'elaine.tan@example.com', '2024-01-15', 'Active'),
  ('primary3-student02', 'Olivia Goh', 'Female', 9, 3, 'Marcus Goh', '96667788', 'marcus.goh@example.com', '2024-01-18', 'Active'),
  ('primary4-student01', 'Mason Teo', 'Male', 10, 4, 'Rachel Teo', '97778899', 'rachel.teo@example.com', '2024-01-11', 'Active'),
  ('primary4-student02', 'Grace Chua', 'Female', 10, 4, 'Kenneth Chua', '98889900', 'kenneth.chua@example.com', '2024-01-16', 'Active'),
  ('primary5-student01', 'Leo Ho', 'Male', 11, 5, 'Pearl Ho', '99990011', 'pearl.ho@example.com', '2024-01-22', 'Active'),
  ('primary5-student02', 'Charlotte Seow', 'Female', 11, 5, 'Harold Seow', '90001122', 'harold.seow@example.com', '2024-01-20', 'Active'),
  ('primary6-student01', 'Isaac Low', 'Male', 12, 6, 'Vera Low', '91112244', 'vera.low@example.com', '2024-01-25', 'Active'),
  ('primary6-student02', 'Zoe Tan', 'Female', 12, 6, 'Felix Tan', '92223355', 'felix.tan@example.com', '2024-01-26', 'Active')
ON CONFLICT (student_code) DO NOTHING;

UPDATE classes SET teacher_id = (SELECT teacher_id FROM teachers WHERE class_id = classes.class_id) WHERE class_id IN (SELECT class_id FROM teachers WHERE class_id IS NOT NULL);
