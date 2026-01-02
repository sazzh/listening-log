import db from '../db.js';

// Check if user with given email exists in database
export const userExists = async (email) => {
    const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    return result.rows.length > 0;
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


