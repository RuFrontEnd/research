import styled from "styled-components/macro";

function StyledComp(props) {
  return <StyledBox />;
}

const StyledBox = styled.section``;
StyledBox.displayName = "StyledBox";

export default StyledComp;
