import User from '../assets/imgs/profile.png'
import Setting from "../components/Items/Setting.tsx"
import ProfileGrid from "../components/Items/ProfileGrid.tsx"
import ProfileBookmark from "../components/Items/ProfileBookmark.tsx"
import ProfileTag from "../components/Items/ProfileTag.tsx"

import StellLive from '../assets/imgs/template/stelllive.jpg'
import moreRoses from '../assets/imgs/template/moreRoses.jpg'

export default function Profile () {
  return (
    <div className={'w-screen flex flex-col items-center'}>
      <div className={'flex justify-center items-center mt-8 ml-24 mb-24'}>
        <img className={'w-[150px] h-[150px] mr-24'} src={User} alt={''} />

        <div>
          <div className={'flex items-center mb-4'}>
            <p className={'text-xl font-[500] mr-6'}>dy4code</p>
            <button className={'bg-[#efefef] pl-4 pr-4 pt-1 pb-1 rounded-lg text-[14px] font-bold mr-2'}>프로필 편집</button>
            <button className={'bg-[#efefef] pl-4 pr-4 pt-1 pb-1 rounded-lg text-[14px] font-bold mr-4'}>보관된 스토리 보기</button>
            <Setting />
          </div>

          <div className={'flex items-center mb-4'}>
            <p className={'text-[16px] mr-8'}>게시물 <strong>N</strong></p>
            <p className={'text-[16px] mr-8'}>팔로워 <strong>N</strong></p>
            <p className={'text-[16px]'}>팔로우 <strong>N</strong></p>
          </div>

          <p className={'text-[14px] font-[700]'}>손보석</p>
        </div>

      </div>

      <div className={'flex flex-col justify-center items-center ml-48'}>
        <div className={'w-[950px] border-b-[1px] -ml-3'} />
        <div className={'flex items-center'}>
          <div className={'flex items-center h-[50px] border-t-[1px] border-black mr-16 cursor-pointer'}>
            <ProfileGrid />
            <p className={'text-[13px] font-semibold ml-2'}>게시물</p>
          </div>

          <div className={'flex items-center h-[50px] mr-16 cursor-pointer'}>
            <ProfileBookmark />
            <p className={'text-[13px] font-semibold ml-2 text-gray-600'}>저장됨</p>
          </div>

          <div className={'flex items-center h-[50px] cursor-pointer'}>
            <ProfileTag />
            <p className={'text-[13px] font-semibold ml-2 text-gray-600'}>태그됨</p>
          </div>
        </div>

        <div className={'w-[960px] flex justify-start items-start flex-wrap'}>
          <img className={'w-[309px] h-[309px] object-cover mr-2 mb-2'} src={moreRoses} alt={''} />
          <img className={'w-[309px] h-[309px] object-cover mr-2 mb-2'} src={moreRoses} alt={''} />
          <img className={'w-[309px] h-[309px] object-cover mr-2 mb-2'} src={StellLive} alt={''} />
          <img className={'w-[309px] h-[309px] object-cover mr-2 mb-2'} src={StellLive} alt={''} />
        </div>
      </div>
    </div>
  )
}