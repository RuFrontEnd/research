import styled from "styled-components/macro";

function Test(props) {
  const { className } = props;

  return <Container className={className}></Container>;
}

const Container = styled.section``;

export default Test;
