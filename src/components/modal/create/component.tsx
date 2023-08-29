import styled from 'styled-components'

export const Container = styled.div`
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

const Window = styled.div`
  border-radius: 12px;
  background: white;
  width: 658px;
  height: 701px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: all 1s;
`
