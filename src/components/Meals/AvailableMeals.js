import { useEffect, useState } from "react";
import Card from "../UI/Card";
import styles from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";

function AvailableMeals(props) {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [httpError, setHttpError] = useState(null);

  useEffect(() => {
    async function fetchMeals() {
      setIsLoading(true);

      const response = await fetch(
        "https://react-food-order-app-8d1fe-default-rtdb.firebaseio.com/meals.json"
      );
      const meals = await response.json();
      const loadedMeals = [];
      for (const key in meals) {
        loadedMeals.push({ id: key, ...meals[key] });
      }
      setMeals(loadedMeals);

      setIsLoading(false);
    }

    fetchMeals().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []);

  if (httpError) {
    return (
      <section className={styles.MealsError}>
        <p>{httpError}</p>
      </section>
    );
  }

  if (isLoading) {
    return (
      <section className={styles.MealsLoading}>
        <p>Meals Loading...</p>
      </section>
    );
  }

  return (
    <section className={styles.meals}>
      <Card>
        <ul>
          {meals.map((meal) => (
            <MealItem
              key={meal.id}
              id={meal.id}
              name={meal.name}
              description={meal.description}
              price={meal.price}
            />
          ))}
        </ul>
      </Card>
    </section>
  );
}

export default AvailableMeals;
