## FLAVOR-SAVORS

A full stack application that allows users to browse recipes, build a meal plan, and brows a cooking realated forum.
Registered users can also input their own recipes and post questions and replies to the forum

### Tech used

This app was created with React and utilizes:

- Node.js
- Express.js
- React
- Firebase
- Docker
- Redis
- Sass
- React-to-print

## User Views

### Landing Page

The user first encouters the user page with links to a tutorial, browsing recipes, and a link to build a meal plan.
Both links take the user to the same component, however clicking build a plan will render the page with the meal planning drawer open.

### Home

This view includes three components:

####Main view of all recipes
The header of this view includes buttons to open and close the filter and meal planner, and if the user is logged in it also includes buttons to only view favorites or their own input recipes.

The recipes are rendered as preview cards, and includes a favorites icon if the user is logged in. On click a modal is activated for the user to inspect each recipe for more information. This includes the ability to favorite the recipe, or add the recipe to the meal plan, and if the user is logged in it also includes the ability to delete the recipe.

####A filter drawer
Allows users to narrow down recipes rendered with preset filters.

####A meal planner drawer
This component allows users to save recipes to four meals per day with seven days of planning allowed. Multiple recipes can be planned for each meal.

To use the meal planner, the user must first inspect a recipe and click the 'Add to meal plan' button. This closes the modal, and opens the meal planner drawer if not already open. To add the recipe the user clicks the button for the meal they would like to save it to. the recipe name and a button to delete the recipe is rendered so the user can track what they have planned.

####Meal Plan Generation
After the user is satisfied with their plan they can click the 'Generate meal plan' button, which opens a modal with a formatted calendar with the full recipes for each meal and a grocery list of all ingredients listed in the planned recipes. Using react-to-print the user can print a copy of the component.

### Forum

The forum is intended for users to ask questions about recipes or cooking topics. Any user can access and read the forum, but only registered users can post or reply.
