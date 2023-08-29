import { styled } from "styled-components"

interface StyledWindowProps {
  w: number
}

const StyledWindow = styled.div<StyledWindowProps>`
  border-radius: 12px;
  background: white;
  width: ${(props) => props.w}px;
  height: 701px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: all 1s;
`

export const Window = ({ children }: any, props: { w: number }) => {
  return (
    <StyledWindow w={props.w}>
      { children }
    </StyledWindow>
  )
}