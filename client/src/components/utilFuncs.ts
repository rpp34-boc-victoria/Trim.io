export function calcTotalCal(foodItemsArr: Array<any>) {
  let totalCal = 0;
  for (let foodItem of foodItemsArr) {
    let kcalPerServing = foodItem.nutrients['ENERC_KCAL'] || 0;
    let servings = foodItem.servings || 1;
    totalCal += kcalPerServing * servings;
  }
  return totalCal
}