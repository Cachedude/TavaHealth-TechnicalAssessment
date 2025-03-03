## Scenario

You recently started a new role at Initech as a Software Engineer. Your team is working on an HR tool, and your boss, Lumbergh, has asked you to come in on Saturday to build the employees section of the new application.

You were provided with some mockups by Tom, your project manager, who, despite having great people skills, isn’t the most detail-oriented PM. The mockups are in image format and can be found in the `/mockups` directory. You'll need to translate these mockups into HTML and CSS as closely as possible.

Michael Bolton, a coworker, planned to build out an API for you but was pulled into another project. He left you with only a data file (`src/server/data.ts`). You'll need to create an API to serve this data. The API should support CRUD operations, including `get`, `getList`, and `update`.

You may create a mock server, use GraphQL, or build a REST API. Time is of the essence, so aim to complete the essentials before Lumbergh suggests you come in on Sunday.

## Task

Build out the employee list and edit workflow as shown in the mockups using the API you created. Here’s a breakdown of the requirements:

1. **List View**
   - The employees are in a flat array from the API, but they need to be grouped by department in the list view.
   - The yellow background color in the list mockup represents the hover state for each row.
   - No detail view is required; route directly to an edit view.

2. **Edit View**
   - Implement an editable form for employee details based on the data structure.

3. **Navigation**
   - Finish styling the navigation bar and add a routeable item for **Employees**.

4. **Filtering**
   - Add a text input filter to search employees by name or other key fields.
   - Employees should remain grouped by department as the list filters.
   - If all employees in a department are filtered out, that department should be removed from the list view.

5. **Styling**
   - Use the `src/styles.css` file to write raw CSS, or feel free to bring in a component library like Material UI to help with styling and layout if you prefer.

6. **Type Definitions**
   - Use the `src/types.ts` file to define types for your API.
   - You’ll need an interface for the **Employee** and types for each CRUD action implemented in the API.

## Notes

Use the `notes.md` file to document your thought process as you work through the assessment. Include any ideas, challenges, or decisions you made along the way. During the technical interview, we'll discuss these notes, giving you an opportunity to explain what you might do differently with more time or how you approached specific parts of the challenge.

## Submission

CodeSandbox will generate a unique URL for your project once you fork the project. When you’re ready, simply click "Share" at the top right and send us the URL.

## Bonus (Optional)

Impress the team by going above and beyond with these extras:

- **Additional API Functionality**: Implement `create` and `delete` methods.

- **Enriched Data**: Expand the data file with additional details for each employee to create a more comprehensive and engaging UI experience.

- **Unit and Integration Tests**: Add tests to cover key components and API methods.

- **Sorting**: Allow sorting of employees by name or department.

- **Responsiveness**: Make the UI responsive for mobile and tablet views.

- **Data Persistence**: Store data persistently (e.g., local storage or in-memory database).

- **Error Handling and User Feedback**: Implement user-friendly error messages and loading states.


- **Advanced Filtering**: Allow filtering by multiple fields like department or status.

- **Dark Mode**: Add a toggle for dark mode to showcase design flexibility.