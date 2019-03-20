import React, { Component } from 'react';

//this component is a filter drawer that renders along side SmallRecipes and Planner on the Home component

class Filter extends Component {




    render(){
        return(
            <div className="filter-main">
                <form>
                    <fieldset>
                        <legend>Filters:</legend>
                        <div className='filter-tags'>
                            <div className='tag'>
                                <input type="checkbox" name="dietTags" value="breakfast" id="breakfast" onClick={this.handleTags}/>
                                <label htmlFor="breakfast">Breakfast</label>
                            </div>
                            <div className='tag'>
                                <input type="checkbox" name="dietTags" value="lunch" id='lunch' onClick={this.handleTags}/>
                                <label htmlFor="lunch">Lunch</label>
                            </div>
                            <div className='tag'>
                                <input type="checkbox" name="dietTags" value="dinner" id='dinner' onClick={this.handleTags}/>
                                <label htmlFor="dinner">Dinner</label>
                            </div>
                            <div className='tag'>
                                <input type="checkbox" name="dietTags" value="dessert" id='dessert' onClick={this.handleTags}/>
                                <label htmlFor="dessert">Dessert</label>
                            </div>
                            <div className='tag'>
                                <input type="checkbox" name="dietTags" value="snack" id='snack' onClick={this.handleTags}/>
                                <label htmlFor="snack">Snack</label>
                            </div>
                            <div className='tag'>
                                <input type="checkbox" name="dietTags" value="vegetarian" id='vegetarian' onClick={this.handleTags}/>
                                <label htmlFor="vegetarian">Vegetarian</label>
                            </div>
                            <div className='tag'>
                                <input type="checkbox" name="dietTags" value="vegan" id='vegan' onClick={this.handleTags}/>
                                <label htmlFor="vegan">Vegan</label>
                            </div>
                            <div className='tag'>
                                <input type="checkbox" name="dietTags" value="paleo" id='paleo' onClick={this.handleTags}/>
                                <label htmlFor="paleo">Paleo</label>
                            </div>
                        </div>
                    </fieldset>
                </form>
            </div>
        )
    }
}

export default Filter