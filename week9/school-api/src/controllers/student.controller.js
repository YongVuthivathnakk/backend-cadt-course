import db from "../models/index.js";

/**
 * @swagger
 * tags:
 *   name: Students
 *   description: Student management
 */

export const createStudent = async (req, res) => {
  try {
    const student = await db.Student.create(req.body);
    res.status(201).json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * @swagger
 * /students:
 *   get:
 *     summary: Get all students
 *     tags: [Students]
 *     parameters:
 *     - in: query
 *       name: limit
 *       required: false
 *       schema: {
 *          type: integer,
 *          default: 10,
 *          minimum: 1
 *       }
 *       description: Number of students per page
 *     - in: query
 *       name: page
 *       required: false
 *       schema: {
 *          type: integer,
 *          default: 1,
 *          minimum: 1
 *        }
 *       description: Page number
 *     - in: query
 *       name: sort
 *       required: false
 *       schema: {
 *        type: string,
 *        enum: [asc, desc],
 *        default: asc
 *       }
 *     description: Sort students by creation time
 *     responses:
 *       200:
 *         description: List of students
 */
export const getAllStudents = async (req, res) => {
  const limit = parseInt(req.query.limit) || 10;
  const page = parseInt(req.query.page) || 1;
  const sort = req.query.sort === "asc" ? "ASC" : "DESC";
  const offset = (page - 1) * limit;

  try {
    const total = await db.Student.count();

    const students = await db.Student.findAll({
      limit,
      offset,
      include: db.Course,
      sort: [["creatAt", sort]],
    });
    res.json({
      data: students,
      meta: {
        page,
        limit,
        totalItems: total,
        totalPage: Math.ceil(total / limit),
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * @swagger
 * /students/{id}:
 *   get:
 *     summary: Get a student by ID
 *     tags: [Students]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: A student
 *       404:
 *         description: Not found
 */
export const getStudentById = async (req, res) => {
  try {
    const student = await db.Student.findByPk(req.params.id, {
      include: db.Course,
    });
    if (!student) return res.status(404).json({ message: "Not found" });
    res.json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * @swagger
 * /students/{id}:
 *   put:
 *     summary: Update a student
 *     tags: [Students]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { type: object }
 *     responses:
 *       200:
 *         description: Updated
 */
export const updateStudent = async (req, res) => {
  try {
    const student = await db.Student.findByPk(req.params.id);
    if (!student) return res.status(404).json({ message: "Not found" });
    await student.update(req.body);
    res.json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * @swagger
 * /students/{id}:
 *   delete:
 *     summary: Delete a student
 *     tags: [Students]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Deleted
 */
export const deleteStudent = async (req, res) => {
  try {
    const student = await db.Student.findByPk(req.params.id);
    if (!student) return res.status(404).json({ message: "Not found" });
    await student.destroy();
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
