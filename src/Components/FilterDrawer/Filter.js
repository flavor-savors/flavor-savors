import React, { Component } from "react";

//this component is a filter drawer that renders along side SmallRecipes and Planner on the Home component

class Filter extends Component {
  constructor() {
    super();

    this.state = {
      tags: [
        "breakfast",
        "lunch",
        "dinner",
        "dessert",
        "snack",
        "vegetarian",
        "vegan",
        "paleo"
      ]
    };
  }

  render() {
    return (
      <div className='filter-main'>
        <form>
          <fieldset>
            <legend>Filters:</legend>
            <div className='filter-tags'>
              <div className='tag'>
                <input
                  type='checkbox'
                  name='dietTags'
                  value='breakfast'
                  id='breakfast'
                  onClick={() => this.props.setFilters("breakfast")}
                />
                <label htmlFor='breakfast'>Breakfast</label>
              </div>
              <div className='tag'>
                <input
                  type='checkbox'
                  name='dietTags'
                  value='lunch'
                  id='lunch'
                  onClick={() => this.props.setFilters("lunch")}
                />
                <label htmlFor='lunch'>Lunch</label>
              </div>
              <div className='tag'>
                <input
                  type='checkbox'
                  name='dietTags'
                  value='dinner'
                  id='dinner'
                  onClick={() => this.props.setFilters("dinner")}
                />
                <label htmlFor='dinner'>Dinner</label>
              </div>
              <div className='tag'>
                <input
                  type='checkbox'
                  name='dietTags'
                  value='dessert'
                  id='dessert'
                  onClick={() => this.props.setFilters("dessert")}
                />
                <label htmlFor='dessert'>Dessert</label>
              </div>
              <div className='tag'>
                <input
                  type='checkbox'
                  name='dietTags'
                  value='snack'
                  id='snack'
                  onClick={() => this.props.setFilters("snack")}
                />
                <label htmlFor='snack'>Snack</label>
              </div>
              <div className='tag'>
                <input
                  type='checkbox'
                  name='dietTags'
                  value='vegetarian'
                  id='vegetarian'
                  onClick={() => this.props.setFilters("vegetarian")}
                />
                <label htmlFor='vegetarian'>Vegetarian</label>
              </div>
              <div className='tag'>
                <input
                  type='checkbox'
                  name='dietTags'
                  value='vegan'
                  id='vegan'
                  onClick={() => this.props.setFilters("vegan")}
                />
                <label htmlFor='vegan'>Vegan</label>
              </div>
              <div className='tag'>
                <input
                  type='checkbox'
                  name='dietTags'
                  value='paleo'
                  id='paleo'
                  onClick={() => this.props.setFilters("paleo")}
                />
                <label htmlFor='paleo'>Paleo</label>
              </div>
            </div>
          </fieldset>
          <button type='reset' onClick={this.props.resetFilters}>
            Reset
          </button>
        </form>
        <button onClick={this.props.filterSearch}>Filter</button>
      </div>
    );
  }
}

export default Filter;
