import SmallRecipe from "../Recipes/SmallRecipe/SmallRecipe";
import LargeRecipe from "../Recipes/LargeRecipe/LargeRecipe";
import React from "react";
import { shallow, configure } from "enzyme";

import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

describe("<SmallRecipe/>", () => {
  const props = [
    {
      created: "March 28th 2019, 2:50:51 am",
      dietTags: [],
      directions: "",
      edited: false,
      id: "Qiskq2H4tRktBi4oVJ55",
      imageURL: "https://image.flaticon.com/icons/png/512/45/45332.png",
      ingredient: [
        {
          name: "horchata",
          amount: "six"
        }
      ],
      public: true,
      recipeName: "hot dogs",
      upvotes: 0,
      user: ""
    }
  ];

  it("renders LargeRecipe", () => {
    const wrapper = shallow(<SmallRecipe recipes={props} />);
    expect(wrapper.find(LargeRecipe).length).toBe(1);
  });

  it("renders the main small recipe div from recipes.map", () => {
    const wrapper = shallow(<SmallRecipe recipes={props} />);
    expect(wrapper.find(".small-recipe-card-polaroid")).toBeDefined();
  });

  it("renders an image from the map", () => {
    const wrapper = shallow(<SmallRecipe recipes={props} />);
    expect(
      wrapper.containsAnyMatchingElements([
        <img
          src='https://image.flaticon.com/icons/png/512/45/45332.png'
          alt='recipe'
          className='small-recipe-card-image'
        />
      ])
    ).toBeTruthy();
  });

  it("renders the correct value for recipe name", () => {
    const wrapper = shallow(<SmallRecipe recipes={props} />);
    expect(wrapper.find(".recipe-name").get(0)).toEqual(
      <h3 className='recipe-name'>hot dogs</h3>
    );
  });
});
