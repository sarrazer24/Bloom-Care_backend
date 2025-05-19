# Crèche Management System

## Introduction
The Crèche Management System is designed to streamline the management of a crèche, focusing on the efficient handling of children's records, registrations, daily tracking, and communication with parents. This application aims to automate various processes to enhance the overall management and monitoring of crèche services.

## Features
### Gestion des Enfants et des Inscriptions
- User registration and authentication.
- Management of children's records, including personal details, allergies, and special needs.
- Admission management, including waiting lists and validation of new registrations.

### Suivi Quotidien
- Attendance tracking with arrival and departure times.
- Meal management and tracking of dietary restrictions.
- Daily activity organization and monitoring.
- Development tracking for children, including progress, behavior, and evaluations.

## Getting Started
To set up the Crèche Management System locally, follow these steps:

1. **Clone the repository:**
   ```
   git clone https://github.com/yourusername/creche-management-system.git
   ```

2. **Navigate to the project directory:**
   ```
   cd creche-management-system
   ```

3. **Build the project:**
   Use Maven to build the project:
   ```
   mvn clean install
   ```

4. **Configure the database:**
   Update the `src/main/resources/application.properties` file with your database connection settings.

5. **Initialize the database:**
   Run the SQL script located in `src/main/resources/db/schema.sql` to set up the database schema.

6. **Run the application:**
   Execute the main class:
   ```
   java -cp target/creche-management-system-1.0-SNAPSHOT.jar com.creche.Main
   ```

## Contributing
Contributions are welcome! Please feel free to submit a pull request or open an issue for any enhancements or bug fixes.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.