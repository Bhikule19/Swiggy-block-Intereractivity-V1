import { __ } from "@wordpress/i18n";
import { useBlockProps } from "@wordpress/block-editor";
import { useEffect } from "@wordpress/element";
import { Dropdown, Button, MenuGroup, MenuItem } from "@wordpress/components";

export default function Edit({ attributes, setAttributes }) {
  const blockProps = useBlockProps();
  const { mealsData, areas } = attributes;

  useEffect(() => {
    const fetchAreas = async () => {
      try {
        const response = await fetch(
          "https://www.themealdb.com/api/json/v1/1/list.php?a=list"
        );
        const data = await response.json();
        setAttributes({ areas: data.meals.map((area) => area.strArea) });
      } catch (error) {
        console.error("Error fetching areas:", error);
      }
    };

    const fetchMeals = async () => {
      try {
        const response = await fetch(
          "https://www.themealdb.com/api/json/v1/1/filter.php?a=Indian"
        );
        const data = await response.json();
        setAttributes({ mealsData: data.meals });
      } catch (error) {
        console.error("Error fetching meals data:", error);
      }
    };

    fetchAreas();
    fetchMeals();
  }, []);

  return (
    <div {...blockProps}>
      <Dropdown
        contentClassName="my-dropdown-content"
        renderToggle={({ onToggle }) => (
          <Button onClick={onToggle} className="button-filter">
            {__("Filter by Area", "swiggy-block-interactive-v1")}
          </Button>
        )}
        renderContent={() => (
          <MenuGroup
            label={__("Filter by Area", "swiggy-block-interactive-v1")}
          >
            {areas.map((option, index) => (
              <MenuItem key={index}>{option}</MenuItem>
            ))}
          </MenuGroup>
        )}
      />

      {mealsData && mealsData.length > 0 ? (
        <ul>
          {mealsData.map((meal) => (
            <div key={meal.idMeal}>
              <img src={meal.strMealThumb} alt={meal.strMeal} />
              <li>{meal.strMeal}</li>
            </div>
          ))}
        </ul>
      ) : (
        <p>{__("Loading meals...", "swiggy-block-interactive-v1")}</p>
      )}
    </div>
  );
}
