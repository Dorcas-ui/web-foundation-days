# School Database Design

## Tables

### students
Stores one row per student.
- `student_id` - primary key
- `name` - required
- `email` - required and unique, so no two students share an email

### courses
Stores one row per course.
- `course_id` - primary key
- `title` - required
- `credits` - required

### enrolments
Stores the fact that a student is enrolled on a course, plus their grade.
- `enrolment_id` - primary key
- `student_id` - foreign key to `students`
- `course_id` - foreign key to `courses`
- `grade` - optional, because a grade is not known until the course is marked
- A `UNIQUE (student_id, course_id)` rule stops the same student enrolling on the same course twice.

## Relationships

- **students to enrolments: one-to-many.** One student can have many enrolments, but each enrolment belongs to exactly one student.
- **courses to enrolments: one-to-many.** One course can have many enrolments, but each enrolment belongs to exactly one course.
- **students to courses: many-to-many.** A student can take many courses, and a course can have many students. This is the relationship the two one-to-many links above create together.

### Why a join table is needed

A relational table cannot store a list of values in one column. Putting a list of course ids in `students` (or student ids in `courses`) would make queries and updates messy and break the rules of good design. The `enrolments` table solves this: each row links one student to one course. It is also the right place for data that belongs to the *pair*, such as the grade, which belongs to neither the student alone nor the course alone.

## Index

I would add an index on `enrolments(course_id)`:

```sql
CREATE INDEX idx_enrolments_course_id ON enrolments(course_id);
```

**Reason:** queries such as "all students on one course" and "number of students per course" search enrolments by `course_id`. Without an index the database checks every row; with one it jumps straight to the matching rows. The `UNIQUE (student_id, course_id)` rule already creates an index that helps searches by student, so the missing one is for `course_id`.

## SQL or NoSQL?

I would choose SQL for this system. School data is highly structured and full of relationships: students, courses and enrolments link to each other, and I need queries that join them, such as counting students per course or finding students with no enrolments. SQL handles these joins well, and its constraints (foreign keys, unique emails, no duplicate enrolments) keep the data correct. A NoSQL database such as MongoDB is better when data has no fixed shape, changes often or must scale across many servers, and none of that applies to a school's records.