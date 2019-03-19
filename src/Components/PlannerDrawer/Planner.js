import React, { Component } from 'react';


class Planner extends Component {
    constructor(){
        super()

        this.state={
            plan:[
                {day1:{
                    breakfast:[],
                    l:[],
                    d:[],
                    s:[]
                }},
                {day2:{
                    breakfast:[],
                    lunch:[],
                    dinner:[],
                    snack:[]
                }},
                {day3:{
                    breakfast:[],
                    lunch:[],
                    dinner:[],
                    snack:[]
                }},
                {day4:{
                    breakfast:[],
                    lunch:[],
                    dinner:[],
                    snack:[]
                }},
                {day5:{
                    breakfast:[],
                    lunch:[],
                    dinner:[],
                    snack:[]
                }},
                {day6:{
                    breakfast:[],
                    lunch:[],
                    dinner:[],
                    snack:[]
                }},
                {day7:{
                    breakfast:[],
                    lunch:[],
                    dinner:[],
                    snack:[]
                }}
            ]
        }
    }

    componentDidMount(){
        console.log(this.props)
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
        console.log(e.target)
      };


    render(){
        console.log(this.props.currentRecipe)
        return(
            <div>
                <div className='planner-main'>
                Planner
                    <div className='planner-top-section'>
                        <div className='day'>
                            <p>day1</p>
                            <input type='button' name='breakfast' value={this.props.currentRecipe} onClick={this.handleChange}/>
                        </div>

                    </div>
                    <div className='planner-bottom-section'>
                        <div className='day'>
                            day5
                            <div>breakfast</div>
                            <div>lunch</div>
                            <div>dinner</div>
                            <div>snack</div>
                        </div>
                        <div className='groceries'>
                            grocery list
                        </div>
                    </div>

                </div>
                






            </div>
        )
    }
}

export default Planner