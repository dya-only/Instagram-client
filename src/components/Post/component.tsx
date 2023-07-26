import Menu from "../Items/Menu.tsx"
import User from '../../assets/imgs/profile.png'
import MoreRoses from '../../assets/imgs/moreRoses.jpg'

export default function Post () {
  return (
    <div className={'w-[470px] pt-8 pb-8 flex flex-col items-center'}>
      <div className={'w-[470px] flex justify-between items-center mb-4'}>
        <div className={'flex justify-start items-center'}>
          <div className={'relative flex justify-center items-center'}>
            <img className={'absolute w-[30px] border-[0.5px] rounded-full'} src={User} alt={''} />
            <div className={'rounded-full w-[32px] h-[32px] border-[1px]'}></div>
          </div>
          <div className={'font-bold text-black text-[13px] ml-3'}>dy4code</div>
        </div>
        <Menu />
      </div>
      <img className={'w-[468px] rounded-md mb-4'} src={MoreRoses} alt={''} />

      <div className={'flex justify-start items-center'}>

      </div>
    </div>
  )
}