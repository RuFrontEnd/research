import styled from "styled-components/macro";

function Template(props) {
  const { className } = props;

  return <Container className={className}></Container>;
}

const Container = styled.section``;

export default Template;
