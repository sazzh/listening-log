import db from '../db.js';

// Get user by username from the database
export const getUserByUsername = async (username) => {
    const result = await db.query('SELECT * FROM users WHERE username = $1', [username]);
    return result.rows[0] || null;
};

// Get user by Id from the database
export const getUserById = async (userId) => {
    const result = await db.query('SELECT * FROM users WHERE user_id = $1', [userId]);
    return result.rows[0];
};

// Get user by email from the database
export const getUserByEmail = async (email) => {
    const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    return result.rows[0] || null;
};

// Get all users from the database
export const getAllUsers = async () => {
    const result = await db.query('SELECT user_id, username, first_name, last_name, email FROM users');
    return result.rows;
};

// Get a user's role by user ID
export const getUserRole = async (userId) => {
    const result = await db.query(`
        SELECT r.role_name
        FROM user_roles ur
        JOIN roles r ON ur.role_id = r.role_id
        WHERE ur.user_id = $1
    `, [userId]);
    return result.rows[0];
};

// Create a new user in the database
// Returns non-sensitive user info (no password)
export const createUser = async (username, hashedPassword, firstName, lastName, email) => {
    const result = await db.query('INSERT INTO users (username, passwd, first_name, last_name, email) VALUES ($1, $2, $3, $4, $5) RETURNING user_id, username, first_name, last_name, email',
        [username, hashedPassword, firstName, lastName, email]);
    return result.rows[0];
};

// Assign user to admin or user role in user_roles table
export const addRoleToUser = async (userId, roleId) => {
    // const result = await db.query('INSERT INTO user_roles (user_id, role_id) VALUES ($1, (SELECT role_id FROM roles WHERE role_name = $2)) RETURNING *', // try pass in Id from frontend first
    const result = await db.query('INSERT INTO user_roles (user_id, role_id) VALUES ($1, $2) RETURNING *',
        [userId, roleId]);
    return result.rows[0];
};


