import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import com.creche.models.Child;
import com.creche.services.ChildService;

import java.util.ArrayList;
import java.util.List;

public class ChildServiceTest {
    private ChildService childService;

    @BeforeEach
    public void setUp() {
        childService = new ChildService();
    }

    @Test
    public void testAddChild() {
        Child child = new Child(1, "John Doe", 3, "Peanut allergy", "None");
        childService.addChild(child);
        assertEquals(child, childService.getChildById(1));
    }

    @Test
    public void testGetChildById() {
        Child child = new Child(2, "Jane Doe", 4, "None", "Special needs");
        childService.addChild(child);
        assertEquals(child, childService.getChildById(2));
    }

    @Test
    public void testUpdateChild() {
        Child child = new Child(3, "Mark Smith", 5, "None", "None");
        childService.addChild(child);
        child.setName("Mark Johnson");
        childService.updateChild(child);
        assertEquals("Mark Johnson", childService.getChildById(3).getName());
    }

    @Test
    public void testGetAllChildren() {
        Child child1 = new Child(4, "Alice", 2, "None", "None");
        Child child2 = new Child(5, "Bob", 3, "Lactose intolerance", "None");
        childService.addChild(child1);
        childService.addChild(child2);
        
        List<Child> expectedChildren = new ArrayList<>();
        expectedChildren.add(child1);
        expectedChildren.add(child2);
        
        assertEquals(expectedChildren, childService.getAllChildren());
    }

    @Test
    public void testRemoveChild() {
        Child child = new Child(6, "Charlie", 1, "None", "None");
        childService.addChild(child);
        childService.removeChild(6);
        assertNull(childService.getChildById(6));
    }
}