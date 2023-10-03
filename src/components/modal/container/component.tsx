import { styled } from "styled-components"

const StyledContainer = styled.div`
  z-index: 50;
  position: fixed;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  backdrop-filter: brightness(30%);
`

export const Container = ({ children }: any) => {
  return (
    <StyledContainer>
      { children }
    </StyledContainer>
  )
}