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

it("correctly increments the counter", () => {
  const mockColor = "red";
  const $counterButton = shallow(<CounterButton color={mockColor} />);
  $counterButton.find('[id="counter"]').simulate("click"); // 模擬點擊事件
  expect($counterButton.find("#counter").text()).toEqual("1");
  expect($counterButton.props().color).toEqual("red");
});
