CREATE TABLE IF NOT EXISTS children (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    age INT NOT NULL,
    allergies VARCHAR(255),
    special_needs VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS registrations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    registration_status BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS daily_tracking (
    id INT AUTO_INCREMENT PRIMARY KEY,
    child_id INT NOT NULL,
    attendance_time DATETIME NOT NULL,
    meal_details VARCHAR(255),
    activity_logs TEXT,
    FOREIGN KEY (child_id) REFERENCES children(id)
);

CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Add some initial roles
INSERT INTO users (username, password, role) VALUES 
('admin', '$2a$10$XaXz5RQfPxWoOGdPCq5PG.tBmaX8B.Qx1xk7mxpPmL4hhtcHwFk4e', 'ADMIN')
ON DUPLICATE KEY UPDATE username=username;
-- Note: The password for admin user is 'admin123'