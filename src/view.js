import { store, getContext } from "@wordpress/interactivity";

store.meals = []; // Initialize the store with an empty array

getContext("create-block", (context) => {
  // Define a callback to watch changes in the meals data
  context.callbacks = {
    logIsOpen: () => {
      console.log("Meals data:", store.meals);
    },
  };

  const fetchMeals = async () => {
    try {
      const response = await fetch(
        "https://www.themealdb.com/api/json/v1/1/filter.php?a=Indian"
      );
      const data = await response.json();
      store.meals = data.meals; // Update the store with fetched data
    } catch (error) {
      console.error("Error fetching meals data:", error);
    }
  };

  fetchMeals();
});
