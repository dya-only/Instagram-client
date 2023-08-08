import Err from '../../assets/imgs/error.svg'

export default function Component (props: { content: string } ) {
  return (
    <div className={'fixed p-4'}>
      <img className={'w-4 h-4'} src={Err} alt={''} />

      <p>{ props.content }</p>
    </div>
  )
}