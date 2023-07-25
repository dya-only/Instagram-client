import Profile from '../../assets/imgs/profile.png'

export default function Story () {
  return (
    <div className={'flex flex-col justify-center items-center mr-4 ml-4'}>
      <img className={'w-[64px] rounded-full border-[1px] p-[2px] mb-1'} src={Profile}  alt={''}/>
      <div className={'text-[13px]'}>dy4code</div>
    </div>
  )
}