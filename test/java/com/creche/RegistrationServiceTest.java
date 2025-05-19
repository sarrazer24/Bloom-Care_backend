import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import com.creche.models.Registration;
import com.creche.services.RegistrationService;

class RegistrationServiceTest {
    private RegistrationService registrationService;

    @BeforeEach
    void setUp() {
        registrationService = new RegistrationService();
    }

    @Test
    void testRegisterUser() {
        Registration registration = new Registration("user@example.com", "password123");
        boolean result = registrationService.registerUser(registration);
        assertTrue(result, "User should be registered successfully");
    }

    @Test
    void testRegisterUserWithExistingEmail() {
        Registration registration = new Registration("existing@example.com", "password123");
        registrationService.registerUser(registration); // Register first
        boolean result = registrationService.registerUser(registration); // Try to register again
        assertFalse(result, "User registration should fail for existing email");
    }

    @Test
    void testAuthenticateUser() {
        Registration registration = new Registration("user@example.com", "password123");
        registrationService.registerUser(registration);
        boolean result = registrationService.authenticateUser("user@example.com", "password123");
        assertTrue(result, "User should be authenticated successfully");
    }

    @Test
    void testAuthenticateUserWithWrongPassword() {
        Registration registration = new Registration("user@example.com", "password123");
        registrationService.registerUser(registration);
        boolean result = registrationService.authenticateUser("user@example.com", "wrongpassword");
        assertFalse(result, "User authentication should fail with wrong password");
    }
}