import User from '../../assets/imgs/profile.png'

export default function Recommend() {
  return (
    <div className={'w-[343px] mt-[60px] h-screen xs:block lg:block md:hidden sm:hidden flex flex-col justify-start items-center'}>
      <div className={'flex justify-between items-center w-[290px]'}>
        <div className={'flex'}>
          <img className={'w-[44px] h-[44px] mr-4'} src={User} alt={''} />
          <div>
            <p className={'text-[14px] font-semibold'}>dy4code</p>
            <p className={'text-[14px] font-[500] text-gray-500'}>손보석</p>
          </div>
        </div>

        <a className={'text-[12px] font-bold text-blue-500'} href={'/'}>전환</a>
      </div>
    </div>
  )
}