import styled from "styled-components/macro";

function FP(props) {
  const { className } = props;

  return <Container className={className}></Container>;
}

const Container = styled.section``;

export default FP;
