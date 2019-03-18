import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Landing from './Components/Landing/Landing';
import Home from './Components/Home/Home';
import Profile from './Components/Profile/Profile';
import Tutorial from './Components/Tutorial/Tutorial';

export default (
    <Switch>
        <Route path='/' exact component={Landing}/>
        <Route path='/home' component={Home}/>
        <Route path='/profile' component={Profile}/>
        <Route path='/tutorial' component={Tutorial}/>
        <Route path='/home/build' component={Home}/>
        <Route/>
        <Route/>
        <Route/>
    </Switch>
)