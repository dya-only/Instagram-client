import {ReactNode} from "react"
import {css} from "@emotion/react"

class Props {
  children?: ReactNode
}

export function ModalContainer ({ children }: Props) {
  return (
    <div css={css`
      position: fixed;
      width: 100vw;
      height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      backdrop-filter: brightness(80%);
    `}>
      {children}
    </div>
  )
}