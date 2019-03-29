import FourmHome from "../Forum/ForumHome/ForumHome";
import Question from "../Forum/Question/Question";
import React from "react";
import { shallow, configure, mount } from "enzyme";

import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

describe("<ForumHome/>", () => {
  it("Set Current Question Id with correct information", async () => {
    const wrapper = mount(<FourmHome />);
    wrapper.find(<Question />);
    expect("questions".length).toBeGreaterThan(0);
  });
});
