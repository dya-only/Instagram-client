import Profile from '../../assets/imgs/profile.png'

export default function Story () {
  return (
    <div className={'flex flex-col justify-center items-center mr-4'}>
      <div className={'relative flex justify-center items-center mb-1'}>
        <img className={'absolute w-[58px] h-[58px] rounded-full'} src={Profile}  alt={''}/>
        <div className={'rounded-full w-[64px] h-[64px] border-[1px]'}></div>
      </div>
      <div className={'text-[13px]'}>dy4code</div>
    </div>
  )
}