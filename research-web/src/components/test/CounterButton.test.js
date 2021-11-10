import { shallow } from "enzyme";
import CounterButton from "components/test/CounterButton";

it("expect to render CounterButton component", () => {
  const mockColor = "red";
  const $counterButton = shallow(<CounterButton color={mockColor} />);
  expect($counterButton).toMatchSnapshot();
});

it("expect to click CounterButton component", () => {
  const mockColor = "red";
  const $counterButton = shallow(<CounterButton color={mockColor} />);
  expect($counterButton).toMatchSnapshot();
});
