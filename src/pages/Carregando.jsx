import styled, { keyframes } from 'styled-components';

const frames = keyframes`
  0% {
    height: 5em;
  }
  50% {
    height: 0em;
  }
  100% {
    height: 5em;
  }
`;
const ContainerCharge = styled.div`
  height: 20vh;
  width: 20vw;
  position: fixed;
  display: flex;
  gap: 50px;
  align-items: center;
  justify-content: center;
  div {
    animation: ${frames} 1.5s linear infinite;
    height: 10em;
    width: 2em;
    background-color: white;
    &:nth-child(2) {
      animation-delay: 0.2s;
    }
    &:nth-child(3) {
      animation-delay: 0.4s;
    }
  }
`;
function Carregando() {
  return (
    <ContainerCharge>
      <div />
      <div />
      <div />
    </ContainerCharge>
  );
}

export default Carregando;
