import Home from "../Home/Home";
import React from "react";
import { shallow, configure } from "enzyme";

import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

describe("<Header/>", () => {
  it("should return 4", () => {
    expect(2 + 2).toBe(4);
  });
});
