import { store } from "@wordpress/interactivity";

const { state, effects } = store("create-block", {
  state: {
    meals: [],
    areas: [],
  },

  effects: {
    fetchAreas: async () => {
      try {
        const response = await fetch(
          "https://www.themealdb.com/api/json/v1/1/list.php?a=list"
        );
        const data = await response.json();
        state.areas = data.meals.map((area) => area.strArea);
      } catch (error) {
        console.error("Error fetching areas:", error);
      }
    },
    fetchMeals: async (area) => {
      try {
        const response = await fetch(
          `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`
        );
        const data = await response.json();
        state.meals = data.meals;
      } catch (error) {
        console.error("Error fetching meals data:", error);
      }
    },
  },
  callbacks: {
    logMeals: () => {
      console.log("Meals data:", state.meals);
    },
  },
});

effects.fetchAreas().then(() => {
  if (state.areas.length > 0) {
    effects.fetchMeals(state.areas[0]); // Fetch meals for the first area initially
  }
});
