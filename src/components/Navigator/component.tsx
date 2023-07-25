import Instagram from "../Items/Instagram.tsx"
import Home from "../Items/Home.tsx"
import Search from "../Items/Search.tsx"
import Explore from "../Items/Explore.tsx"
import Reels from "../Items/Reels.tsx"
import Message from "../Items/Message.tsx"
import Notification from "../Items/Notification.tsx"
import Create from "../Items/Create.tsx"
import About from "../Items/About.tsx"
import User from '../../assets/imgs/profile.png'
import InstagramMini from "../Items/InstagramMini.tsx"

export default function Component () {
  return (
    <nav className={'fixed flex flex-col justify-between xs:items-start lg:items-start md:items-center sm:items-center xs:w-[244px] lg:w-[244px] md:w-[72px] p-4 xs:h-screen lg:h-screen md:h-screen sm:w-screen sm:h-[72px] xs:border-r-[1px] lg:border-r-[1px] md:border-r-[1px] sm:border-b-[1px] border-gray-300'}>
      <div className="flex flex-col xs:items-start lg:items-start md:items-center sm:items-center">
        <div className={'xs:block lg:block md:hidden sm:hidden'}><Instagram /></div>
        <div className={'xs:hidden lg:hidden md:block sm:block'}><InstagramMini /></div>

        {/*XS, LG*/}
        <div className="xs:flex lg:flex md:hidden sm:hidden flex-col items-start">
          <a className={'flex justify-center items-end ml-2 mb-8'} href={''}>
            <span className={'mr-[15px] font-[noto]'}><Home /></span>
            <p className={'font-[500] text-[16px]'}>홈</p>
          </a>

          <a className={'flex justify-center items-end ml-2 mb-8'} href={''}>
            <span className={'mr-[15px] font-[noto]'}><Search /></span>
            <p className={'font-[500] text-[16px]'}>검색</p>
          </a>

          <a className={'flex justify-center items-end ml-2 mb-8'} href={''}>
            <span className={'mr-[15px] font-[noto]'}><Explore /></span>
            <p className={'font-[500] text-[16px]'}>탐색 탭</p>
          </a>

          <a className={'flex justify-center items-end ml-2 mb-8'} href={''}>
            <span className={'mr-[15px] font-[noto]'}><Reels /></span>
            <p className={'font-[500] text-[16px]'}>릴스</p>
          </a>

          <a className={'flex justify-center items-end ml-2 mb-8'} href={''}>
            <span className={'mr-[15px] font-[noto]'}><Message /></span>
            <p className={'font-[500] text-[16px]'}>메시지</p>
          </a>

          <a className={'flex justify-center items-end ml-2 mb-8'} href={''}>
            <span className={'mr-[15px] font-[noto]'}><Notification /></span>
            <p className={'font-[500] text-[16px]'}>알림</p>
          </a>

          <a className={'flex justify-center items-end ml-2 mb-8'} href={''}>
            <span className={'mr-[15px] font-[noto]'}><Create /></span>
            <p className={'font-[500] text-[16px]'}>만들기</p>
          </a>

          <a className={'flex justify-center items-end ml-2 mb-8'} href={''}>
            <img className={'w-[24px] mr-[15px] font-[noto]'} src={User} alt=""/>
            <p className={'font-[500] text-[16px]'}>프로필</p>
          </a>
        </div>

        {/*MD, SM*/}
        <div className="xs:hidden lg:hidden md:block sm:block">
          <a className={'flex justify-center items-end mb-8'} href={''}>
            <span className={'font-[noto]'}><Home /></span>
          </a>

          <a className={'flex justify-center items-end mb-8'} href={''}>
            <span className={'font-[noto]'}><Search /></span>
          </a>

          <a className={'flex justify-center items-end mb-8'} href={''}>
            <span className={'font-[noto]'}><Explore /></span>
          </a>

          <a className={'flex justify-center items-end mb-8'} href={''}>
            <span className={'font-[noto]'}><Reels /></span>
          </a>

          <a className={'flex justify-center items-end mb-8'} href={''}>
            <span className={'font-[noto]'}><Message /></span>
          </a>

          <a className={'flex justify-center items-end mb-8'} href={''}>
            <span className={'font-[noto]'}><Notification /></span>
          </a>

          <a className={'flex justify-center items-end mb-8'} href={''}>
            <span className={'font-[noto]'}><Create /></span>
          </a>

          <a className={'flex justify-center items-end mb-8'} href={''}>
            <img className={'w-[24px] font-[noto]'} src={User} alt=""/>
          </a>
        </div>
      </div>

      <a className={'flex justify-center items-end ml-2 mb-4'} href={''}>
        <span className={'font-[noto]'}><About /></span>
        <p className={'font-[500] text-[16px] ml-[15px] xs:block lg:block md:hidden sm:hidden'}>더보기</p>
      </a>
    </nav>
  )
}
