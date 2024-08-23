import { __ } from "@wordpress/i18n";
import { useBlockProps } from "@wordpress/block-editor";
import { useEffect } from "@wordpress/element";

export default function Edit(props) {
  const blockProps = useBlockProps();

  const { attributes, setAttributes } = props;
  const { mealsData } = attributes;

  // Fetch meals data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://www.themealdb.com/api/json/v1/1/filter.php?a=Indian"
        );
        const data = await response.json();
        setAttributes({ mealsData: data.meals });
        // console.log(mealsData);
      } catch (error) {
        console.error("Error fetching meals data:", error);
      }
    };

    fetchData();
  }, []);

  // Render the list of meals in the editor
  return (
    <div {...blockProps}>
      {mealsData && mealsData.length > 0 ? (
        <ul>
          {mealsData.map((meal) => (
            <div>
              <img src={meal.strMealThumb} alt={meal.strMeal} />
              <li key={meal.idMeal}>{meal.strMeal}</li>
            </div>
          ))}
        </ul>
      ) : (
        <p>{__("Loading meals...", "swiggy-block-interactive-v1")}</p>
      )}
    </div>
  );
}
