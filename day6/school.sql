-- school.sql
-- Tables: students, courses, enrolments

PRAGMA foreign_keys = ON;

DROP TABLE IF EXISTS enrolments;
DROP TABLE IF EXISTS courses;
DROP TABLE IF EXISTS students;

-- ---------- Tables ----------
CREATE TABLE students (
  student_id INTEGER PRIMARY KEY AUTOINCREMENT,
  name       TEXT NOT NULL,
  email      TEXT NOT NULL UNIQUE
);

CREATE TABLE courses (
  course_id INTEGER PRIMARY KEY AUTOINCREMENT,
  title     TEXT NOT NULL,
  credits   INTEGER NOT NULL
);

CREATE TABLE enrolments (
  enrolment_id INTEGER PRIMARY KEY AUTOINCREMENT,
  student_id   INTEGER NOT NULL,
  course_id    INTEGER NOT NULL,
  grade        TEXT,
  FOREIGN KEY (student_id) REFERENCES students(student_id),
  FOREIGN KEY (course_id)  REFERENCES courses(course_id),
  UNIQUE (student_id, course_id)  -- same student cannot enrol on the same course twice
);

-- ---------- Sample data ----------
INSERT INTO students (name, email) VALUES
  ('Amina Hassan', 'amina@example.com'),
  ('Brian Otieno', 'brian@example.com'),
  ('Carol Wanjiru', 'carol@example.com'),
  ('David Kamau', 'david@example.com');

INSERT INTO courses (title, credits) VALUES
  ('Web Development', 3),
  ('Databases', 4),
  ('Python Programming', 3);

INSERT INTO enrolments (student_id, course_id, grade) VALUES
  (1, 1, 'A'),
  (1, 2, 'B'),
  (2, 1, 'B'),
  (2, 3, 'A'),
  (3, 2, 'C'),
  (3, 3, NULL);

-- ---------- Queries ----------

-- 1. All courses for one student (by name)
SELECT c.title, c.credits, e.grade
FROM students s
JOIN enrolments e ON e.student_id = s.student_id
JOIN courses c    ON c.course_id  = e.course_id
WHERE s.name = 'Amina Hassan';

-- 2. All students on one course
SELECT s.name, s.email, e.grade
FROM courses c
JOIN enrolments e ON e.course_id  = c.course_id
JOIN students s   ON s.student_id = e.student_id
WHERE c.title = 'Web Development';

-- 3. Number of students per course
SELECT c.title, COUNT(e.enrolment_id) AS student_count
FROM courses c
LEFT JOIN enrolments e ON e.course_id = c.course_id
GROUP BY c.course_id, c.title;

-- 4. Students who have no enrolments
SELECT s.name, s.email
FROM students s
LEFT JOIN enrolments e ON e.student_id = s.student_id
WHERE e.enrolment_id IS NULL;

-- 5. Update one enrolment's grade
UPDATE enrolments
SET grade = 'A'
WHERE student_id = (SELECT student_id FROM students WHERE name = 'Carol Wanjiru')
  AND course_id  = (SELECT course_id  FROM courses  WHERE title = 'Python Programming');

-- Check the update worked
SELECT s.name, c.title, e.grade
FROM enrolments e
JOIN students s ON s.student_id = e.student_id
JOIN courses c  ON c.course_id  = e.course_id
WHERE s.name = 'Carol Wanjiru';