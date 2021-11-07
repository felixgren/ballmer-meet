import styled from "styled-components";

const TestText = styled.div`
  position: absolute;
  background-color: orange;
  color: black;
  font-size: 24px;
  max-width: 300px;
  user-select: none;
`;

export default function Instructions() {
  return <TestText>Test test test test! I am a test!</TestText>;
}
