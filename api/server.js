const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;
const pool = process.env.DATABASE_URL ? new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL.includes('sslmode=require') ? { rejectUnauthorized: false } : false,
}) : null;

const memory = {
  classes: [
    { class_id: 1, class_code: 'primary1', class_name: 'Primary 1', subjects: 'English, Mathematics', schedule_days: 'Mon/Wed/Fri', schedule_time: '4:00 PM', room: 'Room A1', teacher_id: 1, status: 'Active', teacher_name: 'Alicia Tan' },
    { class_id: 2, class_code: 'primary2', class_name: 'Primary 2', subjects: 'Science, English', schedule_days: 'Tue/Thu', schedule_time: '5:00 PM', room: 'Room B2', teacher_id: 2, status: 'Active', teacher_name: 'Benjamin Chan' },
    { class_id: 3, class_code: 'primary3', class_name: 'Primary 3', subjects: 'Mathematics, Reading', schedule_days: 'Mon/Tue/Thu', schedule_time: '3:30 PM', room: 'Room C3', teacher_id: 3, status: 'Active', teacher_name: 'Cynthia Lim' },
    { class_id: 4, class_code: 'primary4', class_name: 'Primary 4', subjects: 'Creative Writing, Maths', schedule_days: 'Wed/Fri', schedule_time: '4:30 PM', room: 'Room D4', teacher_id: null, status: 'Active', teacher_name: null },
    { class_id: 5, class_code: 'primary5', class_name: 'Primary 5', subjects: 'Science, ICT', schedule_days: 'Mon/Wed', schedule_time: '4:15 PM', room: 'Room E5', teacher_id: 5, status: 'Active', teacher_name: 'Evelyn Koh' },
    { class_id: 6, class_code: 'primary6', class_name: 'Primary 6', subjects: 'English, Exam Prep', schedule_days: 'Tue/Thu/Sat', schedule_time: '9:00 AM', room: 'Room F6', teacher_id: 6, status: 'Active', teacher_name: 'Farid Hussain' }
  ],
  teachers: [
    { teacher_id: 1, teacher_code: 'teacher01', full_name: 'Alicia Tan', email: 'alicia.tan@sunrise.edu', phone: '91234567', subject_specialty: 'Mathematics', class_id: 1, class_name: 'Primary 1', join_date: '2023-01-10', status: 'Active' },
    { teacher_id: 2, teacher_code: 'teacher02', full_name: 'Benjamin Chan', email: 'benjamin.chan@sunrise.edu', phone: '92345678', subject_specialty: 'Science', class_id: 2, class_name: 'Primary 2', join_date: '2022-04-06', status: 'Active' },
    { teacher_id: 3, teacher_code: 'teacher03', full_name: 'Cynthia Lim', email: 'cynthia.lim@sunrise.edu', phone: '93456789', subject_specialty: 'English', class_id: 3, class_name: 'Primary 3', join_date: '2021-09-15', status: 'Active' },
    { teacher_id: 4, teacher_code: 'teacher04', full_name: 'Daniel Ong', email: 'daniel.ong@sunrise.edu', phone: '94567890', subject_specialty: 'Reading', class_id: null, class_name: null, join_date: '2024-02-21', status: 'Active' },
    { teacher_id: 5, teacher_code: 'teacher05', full_name: 'Evelyn Koh', email: 'evelyn.koh@sunrise.edu', phone: '95678901', subject_specialty: 'ICT', class_id: 5, class_name: 'Primary 5', join_date: '2023-06-13', status: 'Active' },
    { teacher_id: 6, teacher_code: 'teacher06', full_name: 'Farid Hussain', email: 'farid.hussain@sunrise.edu', phone: '96789012', subject_specialty: 'Exam Prep', class_id: 6, class_name: 'Primary 6', join_date: '2022-11-04', status: 'Active' }
  ],
  students: [
    { student_id: 1, student_code: 'primary1-student01', full_name: 'Noah Lee', gender: 'Male', age: 7, class_id: 1, class_name: 'Primary 1', class_code: 'primary1', guardian_name: 'Michele Lee', guardian_phone: '91112233', guardian_email: 'michele.lee@example.com', enrolment_date: '2024-01-10', status: 'Active' },
    { student_id: 2, student_code: 'primary1-student02', full_name: 'Emma Lim', gender: 'Female', age: 7, class_id: 1, class_name: 'Primary 1', class_code: 'primary1', guardian_name: 'Sarah Lim', guardian_phone: '92223344', guardian_email: 'sarah.lim@example.com', enrolment_date: '2024-01-12', status: 'Active' },
    { student_id: 3, student_code: 'primary2-student01', full_name: 'Lucas Wong', gender: 'Male', age: 8, class_id: 2, class_name: 'Primary 2', class_code: 'primary2', guardian_name: 'Jasmine Wong', guardian_phone: '93334455', guardian_email: 'jasmine.wong@example.com', enrolment_date: '2024-01-08', status: 'Active' },
    { student_id: 4, student_code: 'primary2-student02', full_name: 'Sophie Ng', gender: 'Female', age: 8, class_id: 2, class_name: 'Primary 2', class_code: 'primary2', guardian_name: 'Brian Ng', guardian_phone: '94445566', guardian_email: 'brian.ng@example.com', enrolment_date: '2024-01-09', status: 'Active' },
    { student_id: 5, student_code: 'primary3-student01', full_name: 'Aiden Tan', gender: 'Male', age: 9, class_id: 3, class_name: 'Primary 3', class_code: 'primary3', guardian_name: 'Elaine Tan', guardian_phone: '95556677', guardian_email: 'elaine.tan@example.com', enrolment_date: '2024-01-15', status: 'Active' },
    { student_id: 6, student_code: 'primary3-student02', full_name: 'Olivia Goh', gender: 'Female', age: 9, class_id: 3, class_name: 'Primary 3', class_code: 'primary3', guardian_name: 'Marcus Goh', guardian_phone: '96667788', guardian_email: 'marcus.goh@example.com', enrolment_date: '2024-01-18', status: 'Active' },
    { student_id: 7, student_code: 'primary4-student01', full_name: 'Mason Teo', gender: 'Male', age: 10, class_id: 4, class_name: 'Primary 4', class_code: 'primary4', guardian_name: 'Rachel Teo', guardian_phone: '97778899', guardian_email: 'rachel.teo@example.com', enrolment_date: '2024-01-11', status: 'Active' },
    { student_id: 8, student_code: 'primary4-student02', full_name: 'Grace Chua', gender: 'Female', age: 10, class_id: 4, class_name: 'Primary 4', class_code: 'primary4', guardian_name: 'Kenneth Chua', guardian_phone: '98889900', guardian_email: 'kenneth.chua@example.com', enrolment_date: '2024-01-16', status: 'Active' },
    { student_id: 9, student_code: 'primary5-student01', full_name: 'Leo Ho', gender: 'Male', age: 11, class_id: 5, class_name: 'Primary 5', class_code: 'primary5', guardian_name: 'Pearl Ho', guardian_phone: '99990011', guardian_email: 'pearl.ho@example.com', enrolment_date: '2024-01-22', status: 'Active' },
    { student_id: 10, student_code: 'primary5-student02', full_name: 'Charlotte Seow', gender: 'Female', age: 11, class_id: 5, class_name: 'Primary 5', class_code: 'primary5', guardian_name: 'Harold Seow', guardian_phone: '90001122', guardian_email: 'harold.seow@example.com', enrolment_date: '2024-01-20', status: 'Active' },
    { student_id: 11, student_code: 'primary6-student01', full_name: 'Isaac Low', gender: 'Male', age: 12, class_id: 6, class_name: 'Primary 6', class_code: 'primary6', guardian_name: 'Vera Low', guardian_phone: '91112244', guardian_email: 'vera.low@example.com', enrolment_date: '2024-01-25', status: 'Active' },
    { student_id: 12, student_code: 'primary6-student02', full_name: 'Zoe Tan', gender: 'Female', age: 12, class_id: 6, class_name: 'Primary 6', class_code: 'primary6', guardian_name: 'Felix Tan', guardian_phone: '92223355', guardian_email: 'felix.tan@example.com', enrolment_date: '2024-01-26', status: 'Active' }
  ]
};

app.use(express.json());
app.use(cors({ origin: process.env.CORS_ORIGIN || '*', credentials: true }));

function normalizeClasses(rows) {
  return rows.map((row) => {
    const teacher = memory.teachers.find((t) => String(t.teacher_id) === String(row.teacher_id));
    return { ...row, teacher_name: teacher ? teacher.full_name : null };
  });
}

function suggestStudentCode(classId) {
  const classRow = memory.classes.find((item) => String(item.class_id) === String(classId));
  if (!classRow) return '';
  const existing = memory.students.filter((item) => item.class_id === Number(classId)).length + 1;
  return `${classRow.class_code}-student${String(existing).padStart(2, '0')}`;
}

app.get('/api/health', async (req, res) => {
  if (!pool) {
    return res.json({ status: 'ok', db: 'memory' });
  }
  try {
    await pool.query('SELECT NOW()');
    res.json({ status: 'ok', db: 'connected' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

app.get('/api/db-check', async (req, res) => {
  if (!pool) {
    return res.json({ now: new Date().toISOString() });
  }
  try {
    const result = await pool.query('SELECT NOW() as now');
    res.json({ now: result.rows[0].now });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/classes', async (req, res) => {
  if (!pool) {
    return res.json(normalizeClasses(memory.classes));
  }
  try {
    const result = await pool.query(`SELECT c.*, t.full_name AS teacher_name FROM classes c LEFT JOIN teachers t ON t.teacher_id = c.teacher_id ORDER BY c.class_id ASC`);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/classes/:id', async (req, res) => {
  if (!pool) {
    const item = memory.classes.find((entry) => String(entry.class_id) === String(req.params.id));
    if (!item) return res.status(404).json({ error: 'Class not found' });
    return res.json({ ...item, teacher_name: memory.teachers.find((teacher) => String(teacher.teacher_id) === String(item.teacher_id))?.full_name || null });
  }
  try {
    const result = await pool.query(`SELECT c.*, t.full_name AS teacher_name FROM classes c LEFT JOIN teachers t ON t.teacher_id = c.teacher_id WHERE c.class_id = $1`, [req.params.id]);
    if (!result.rows[0]) return res.status(404).json({ error: 'Class not found' });
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/classes', async (req, res) => {
  const { class_code, class_name, subjects, schedule_days, schedule_time, room, teacher_id, status } = req.body;
  if (!class_code || !class_name) return res.status(400).json({ error: 'class_code and class_name are required' });
  if (!pool) {
    const id = memory.classes.length ? Math.max(...memory.classes.map((item) => item.class_id)) + 1 : 1;
    const item = { class_id: id, class_code, class_name, subjects: subjects || '', schedule_days: schedule_days || '', schedule_time: schedule_time || '', room: room || '', teacher_id: teacher_id ? Number(teacher_id) : null, status: status || 'Active', teacher_name: memory.teachers.find((t) => String(t.teacher_id) === String(teacher_id))?.full_name || null };
    memory.classes.push(item);
    return res.status(201).json(item);
  }
  try {
    const result = await pool.query('INSERT INTO classes (class_code, class_name, subjects, schedule_days, schedule_time, room, teacher_id, status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *', [class_code, class_name, subjects || '', schedule_days || '', schedule_time || '', room || '', teacher_id || null, status || 'Active']);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
});

app.put('/api/classes/:id', async (req, res) => {
  const { class_code, class_name, subjects, schedule_days, schedule_time, room, teacher_id, status } = req.body;
  if (!pool) {
    const itemIndex = memory.classes.findIndex((entry) => String(entry.class_id) === String(req.params.id));
    if (itemIndex < 0) return res.status(404).json({ error: 'Class not found' });
    memory.classes[itemIndex] = { ...memory.classes[itemIndex], class_code, class_name, subjects: subjects || '', schedule_days: schedule_days || '', schedule_time: schedule_time || '', room: room || '', teacher_id: teacher_id ? Number(teacher_id) : null, status: status || 'Active', teacher_name: memory.teachers.find((t) => String(t.teacher_id) === String(teacher_id))?.full_name || null };
    return res.json(memory.classes[itemIndex]);
  }
  try {
    const result = await pool.query('UPDATE classes SET class_code = $1, class_name = $2, subjects = $3, schedule_days = $4, schedule_time = $5, room = $6, teacher_id = $7, status = $8 WHERE class_id = $9 RETURNING *', [class_code, class_name, subjects || '', schedule_days || '', schedule_time || '', room || '', teacher_id || null, status || 'Active', req.params.id]);
    if (!result.rows[0]) return res.status(404).json({ error: 'Class not found' });
    res.json(result.rows[0]);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
});

app.delete('/api/classes/:id', async (req, res) => {
  if (!pool) {
    const hasStudents = memory.students.some((student) => String(student.class_id) === String(req.params.id));
    if (hasStudents) return res.status(400).json({ error: 'Cannot delete a class that still has students. Reassign or delete the students first.' });
    const index = memory.classes.findIndex((entry) => String(entry.class_id) === String(req.params.id));
    if (index < 0) return res.status(404).json({ error: 'Class not found' });
    const [deleted] = memory.classes.splice(index, 1);
    return res.json({ success: true, deleted });
  }
  try {
    const studentCheck = await pool.query('SELECT COUNT(*) AS count FROM students WHERE class_id = $1', [req.params.id]);
    if (Number(studentCheck.rows[0].count) > 0) return res.status(400).json({ error: 'Cannot delete a class that still has students. Reassign or delete the students first.' });
    const result = await pool.query('DELETE FROM classes WHERE class_id = $1 RETURNING *', [req.params.id]);
    if (!result.rows[0]) return res.status(404).json({ error: 'Class not found' });
    res.json({ success: true, deleted: result.rows[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/teachers', async (req, res) => {
  if (!pool) {
    return res.json(memory.teachers.map((teacher) => ({
      ...teacher,
      class_name: memory.classes.find((item) => String(item.class_id) === String(teacher.class_id))?.class_name || null
    })));
  }
  try {
    const result = await pool.query('SELECT t.*, c.class_name FROM teachers t LEFT JOIN classes c ON c.class_id = t.class_id ORDER BY t.teacher_id ASC');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/teachers/:id', async (req, res) => {
  if (!pool) {
    const teacher = memory.teachers.find((entry) => String(entry.teacher_id) === String(req.params.id));
    if (!teacher) return res.status(404).json({ error: 'Teacher not found' });
    return res.json({ ...teacher, class_name: memory.classes.find((item) => String(item.class_id) === String(teacher.class_id))?.class_name || null });
  }
  try {
    const result = await pool.query('SELECT t.*, c.class_name FROM teachers t LEFT JOIN classes c ON c.class_id = t.class_id WHERE t.teacher_id = $1', [req.params.id]);
    if (!result.rows[0]) return res.status(404).json({ error: 'Teacher not found' });
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/teachers', async (req, res) => {
  const { teacher_code, full_name, email, phone, subject_specialty, class_id, join_date, status } = req.body;
  if (!teacher_code || !full_name) return res.status(400).json({ error: 'teacher_code and full_name are required' });
  if (!pool) {
    const id = memory.teachers.length ? Math.max(...memory.teachers.map((teacher) => teacher.teacher_id)) + 1 : 1;
    const item = { teacher_id: id, teacher_code, full_name, email: email || '', phone: phone || '', subject_specialty: subject_specialty || '', class_id: class_id ? Number(class_id) : null, class_name: memory.classes.find((c) => String(c.class_id) === String(class_id))?.class_name || null, join_date: join_date || null, status: status || 'Active' };
    memory.teachers.push(item);
    return res.status(201).json(item);
  }
  try {
    const result = await pool.query('INSERT INTO teachers (teacher_code, full_name, email, phone, subject_specialty, class_id, join_date, status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *', [teacher_code, full_name, email || '', phone || '', subject_specialty || '', class_id || null, join_date || null, status || 'Active']);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
});

app.put('/api/teachers/:id', async (req, res) => {
  const { teacher_code, full_name, email, phone, subject_specialty, class_id, join_date, status } = req.body;
  if (!pool) {
    const index = memory.teachers.findIndex((entry) => String(entry.teacher_id) === String(req.params.id));
    if (index < 0) return res.status(404).json({ error: 'Teacher not found' });
    memory.teachers[index] = { ...memory.teachers[index], teacher_code, full_name, email: email || '', phone: phone || '', subject_specialty: subject_specialty || '', class_id: class_id ? Number(class_id) : null, class_name: memory.classes.find((c) => String(c.class_id) === String(class_id))?.class_name || null, join_date: join_date || null, status: status || 'Active' };
    return res.json(memory.teachers[index]);
  }
  try {
    const result = await pool.query('UPDATE teachers SET teacher_code = $1, full_name = $2, email = $3, phone = $4, subject_specialty = $5, class_id = $6, join_date = $7, status = $8 WHERE teacher_id = $9 RETURNING *', [teacher_code, full_name, email || '', phone || '', subject_specialty || '', class_id || null, join_date || null, status || 'Active', req.params.id]);
    if (!result.rows[0]) return res.status(404).json({ error: 'Teacher not found' });
    res.json(result.rows[0]);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
});

app.delete('/api/teachers/:id', async (req, res) => {
  if (!pool) {
    const teacherIndex = memory.teachers.findIndex((entry) => String(entry.teacher_id) === String(req.params.id));
    if (teacherIndex < 0) return res.status(404).json({ error: 'Teacher not found' });
    memory.classes = memory.classes.map((item) => String(item.teacher_id) === String(req.params.id) ? { ...item, teacher_id: null, teacher_name: null } : item);
    const [deleted] = memory.teachers.splice(teacherIndex, 1);
    return res.json({ success: true, deleted });
  }
  try {
    await pool.query('UPDATE classes SET teacher_id = NULL WHERE teacher_id = $1', [req.params.id]);
    const result = await pool.query('DELETE FROM teachers WHERE teacher_id = $1 RETURNING *', [req.params.id]);
    if (!result.rows[0]) return res.status(404).json({ error: 'Teacher not found' });
    res.json({ success: true, deleted: result.rows[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/students', async (req, res) => {
  const classId = req.query.class_id;
  if (!pool) {
    const rows = memory.students.filter((student) => !classId || String(student.class_id) === String(classId));
    return res.json(rows);
  }
  try {
    let query = 'SELECT s.*, c.class_name, c.class_code FROM students s LEFT JOIN classes c ON c.class_id = s.class_id';
    const params = [];
    if (classId) {
      query += ' WHERE s.class_id = $1';
      params.push(classId);
    }
    query += ' ORDER BY s.student_id ASC';
    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/students/:id', async (req, res) => {
  if (!pool) {
    const student = memory.students.find((entry) => String(entry.student_id) === String(req.params.id));
    if (!student) return res.status(404).json({ error: 'Student not found' });
    return res.json(student);
  }
  try {
    const result = await pool.query('SELECT s.*, c.class_name, c.class_code FROM students s LEFT JOIN classes c ON c.class_id = s.class_id WHERE s.student_id = $1', [req.params.id]);
    if (!result.rows[0]) return res.status(404).json({ error: 'Student not found' });
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/students', async (req, res) => {
  const { student_code, full_name, gender, age, class_id, guardian_name, guardian_phone, guardian_email, enrolment_date, status } = req.body;
  if (!full_name || !class_id) return res.status(400).json({ error: 'full_name and class_id are required' });
  if (!pool) {
    const classRow = memory.classes.find((entry) => String(entry.class_id) === String(class_id));
    const nextCode = student_code || suggestStudentCode(class_id);
    const id = memory.students.length ? Math.max(...memory.students.map((student) => student.student_id)) + 1 : 1;
    const item = { student_id: id, student_code: nextCode, full_name, gender: gender || '', age: age ? Number(age) : null, class_id: Number(class_id), class_name: classRow?.class_name || null, class_code: classRow?.class_code || null, guardian_name: guardian_name || '', guardian_phone: guardian_phone || '', guardian_email: guardian_email || '', enrolment_date: enrolment_date || null, status: status || 'Active' };
    memory.students.push(item);
    return res.status(201).json(item);
  }
  try {
    const result = await pool.query('INSERT INTO students (student_code, full_name, gender, age, class_id, guardian_name, guardian_phone, guardian_email, enrolment_date, status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *', [student_code, full_name, gender || '', age || null, class_id, guardian_name || '', guardian_phone || '', guardian_email || '', enrolment_date || null, status || 'Active']);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
});

app.put('/api/students/:id', async (req, res) => {
  if (!pool) {
    const index = memory.students.findIndex((entry) => String(entry.student_id) === String(req.params.id));
    if (index < 0) return res.status(404).json({ error: 'Student not found' });
    const { student_code, full_name, gender, age, class_id, guardian_name, guardian_phone, guardian_email, enrolment_date, status } = req.body;
    const classRow = memory.classes.find((entry) => String(entry.class_id) === String(class_id));
    memory.students[index] = {
      ...memory.students[index],
      student_code: student_code || memory.students[index].student_code,
      full_name: full_name || memory.students[index].full_name,
      gender: gender || '',
      age: age ? Number(age) : null,
      class_id: Number(class_id),
      class_name: classRow?.class_name || null,
      class_code: classRow?.class_code || null,
      guardian_name: guardian_name || '',
      guardian_phone: guardian_phone || '',
      guardian_email: guardian_email || '',
      enrolment_date: enrolment_date || null,
      status: status || 'Active'
    };
    return res.json(memory.students[index]);
  }
  try {
    const { student_code, full_name, gender, age, class_id, guardian_name, guardian_phone, guardian_email, enrolment_date, status } = req.body;
    const result = await pool.query('UPDATE students SET student_code = $1, full_name = $2, gender = $3, age = $4, class_id = $5, guardian_name = $6, guardian_phone = $7, guardian_email = $8, enrolment_date = $9, status = $10 WHERE student_id = $11 RETURNING *', [student_code, full_name, gender || '', age || null, class_id, guardian_name || '', guardian_phone || '', guardian_email || '', enrolment_date || null, status || 'Active', req.params.id]);
    if (!result.rows[0]) return res.status(404).json({ error: 'Student not found' });
    res.json(result.rows[0]);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
});

app.delete('/api/students/:id', async (req, res) => {
  if (!pool) {
    const index = memory.students.findIndex((entry) => String(entry.student_id) === String(req.params.id));
    if (index < 0) return res.status(404).json({ error: 'Student not found' });
    const [deleted] = memory.students.splice(index, 1);
    return res.json({ success: true, deleted });
  }
  try {
    const result = await pool.query('DELETE FROM students WHERE student_id = $1 RETURNING *', [req.params.id]);
    if (!result.rows[0]) return res.status(404).json({ error: 'Student not found' });
    res.json({ success: true, deleted: result.rows[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Sunrise Tuition Centre API running on port ${port}`);
});
