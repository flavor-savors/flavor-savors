import React, { Component } from 'react';

//this component is a filter drawer that renders along side SmallRecipes and Planner on the Home component

class Filter extends Component {


    render(){
        return(
            <div>
                <form>
                <fieldset>
                        <legend>Filters:</legend>
                        <input type="checkbox" name="tags" value="placeholder"/>
                        <input type="checkbox" name="tags" value="placeholder"/>
                        <input type="checkbox" name="tags" value="placeholder"/>
                        <input type="checkbox" name="tags" value="placeholder"/>
                        <input type="checkbox" name="tags" value="placeholder"/>
                        <input type="checkbox" name="tags" value="placeholder"/>
                    </fieldset>
                </form>
            </div>
        )
    }
}

export default Filter