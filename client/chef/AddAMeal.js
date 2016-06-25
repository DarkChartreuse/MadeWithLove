import React from 'react';

class AddAMeal extends React.Component {

handleSubmit(e) {
  dispatch()
}


render() {
  return (
    <div className="container center">
      <h4 className="center grey-text text-darken-4"> Add A Meal </h4>
      <form>
        <input type="date" name="add_date" />
        <input type="time" name="add_time" />
        <input type="text" placeholder="type of food" />
        <input type="text" placeholder="price" />
        <input type="text" placeholder="quantity" />
        <button type="submit">Submit Meal</button>
      </form>
    </div>
  );
}

}

export default AddAMeal;