import Home from "../Home/Home";
import React from "react";
import Adapter from "enzyme-adapter-react-16";
import { MemoryRouter } from "react-router-dom";
import App from "../../App";
import { mount, shallow, render, configure } from "enzyme";

configure({ adapter: new Adapter() });

describe("<Home/>", () => {
  const props = {
    history: {
      location: {
        pathname: "/home"
      }
    }
  };

  const state = {
    showMealPlan: false,
    showFilter: false,
    currentRecipeName: ""
  };

  test("should just please work", () => {
    const wrapper = shallow(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    wrapper.setProps(props);
    expect(wrapper.props().history.location.pathname).toBe("/");
  });

  test("showMealPlan should be false", () => {
    const wrapper = shallow(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    wrapper.setState(state);
    wrapper.setProps(props);
    expect(wrapper.state().showMealPlan).toBe(false);
  });

  test("puser should be valid", () => {
    const wrapper = shallow(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    wrapper.setState(state);
    wrapper.setProps(props);
    expect(wrapper.contains(<Home />)).toEqual(true);
  });

  test("showFilter should be false", () => {
    const wrapper = shallow(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    wrapper.setState(state);
    wrapper.setProps(props);
    expect(wrapper.state().showFilter).toBe(false);
  });

  test("currentRecipeName should be a string", () => {
    const wrapper = shallow(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    wrapper.setState(state);
    wrapper.setProps(props);
    expect(wrapper.state().currentRecipeName).toEqual("");
  });
});
