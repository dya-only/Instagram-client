import { styled } from "styled-components"

const StyledContainer = styled.div`
  z-index: 30;
  position: fixed;
  width: 107vw;
  height: 101vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  backdrop-filter: brightness(30%);
  margin-top: -170px;
  margin-left: 173px;
`

export const Container2 = ({ children }: any) => {
  return (
    <StyledContainer>
      { children }
    </StyledContainer>
  )
}