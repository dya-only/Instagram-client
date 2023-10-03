import { styled } from "styled-components"

interface StyledWindowProps {
  w: number
  h: number
}

const StyledWindow = styled.div<StyledWindowProps>`
  z-index: 60;
  border-radius: 12px;
  background: white;
  width: ${(props) => props.w}px;
  height: ${(props) => props.h}px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: all .5s;
`

export const Window = ({ children, w, h }: any) => {
  return (
    <StyledWindow w={w} h={h}>
      { children }
    </StyledWindow>
  )
}