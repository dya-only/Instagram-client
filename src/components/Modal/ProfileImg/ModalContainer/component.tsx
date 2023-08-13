import styled from 'styled-components'

export const ModalContainer = styled.div`
  z-index: 60;
  position: fixed;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  backdrop-filter: brightness(30%);
`