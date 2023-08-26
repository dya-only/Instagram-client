import Menu from "../../assets/svgs/Menu.tsx"
import Heart from "../../assets/svgs/Heart.tsx"
import Chat from "../../assets/svgs/Chat.tsx"
import Message from "../../assets/svgs/Message.tsx"
import Bookmark from "../../assets/svgs/Bookmark.tsx"
import Emoji from "../../assets/svgs/Emoji.tsx"
import User from '../../assets/imgs/profile.jpg'
import MoreRoses from '../../assets/imgs/template/moreRoses.jpg'

export default function Post () {
  return (
    <div className={'w-[470px] pt-8 pb-8 flex flex-col items-center'}>
      <div className={'w-[470px] flex justify-between items-center mb-4'}>
        <div className={'flex justify-start items-center cursor-pointer'}>
          <div className={'relative flex justify-center items-center'}>
            <img className={'absolute w-[30px] border-[0.5px] rounded-full'} src={User} alt={''} />
            <div className={'rounded-full w-[32px] h-[32px] border-[1px]'}></div>
          </div>
          <div className={'font-bold text-black text-[13px] ml-3'}>dy4code</div>
        </div>
        <Menu />
      </div>
      <img className={'w-[468px] rounded-md mb-4 max-h-[600px] object-cover'} src={MoreRoses} alt={''} />

      <div className={'w-full flex justify-between items-center mb-2'}>
        <div className={'flex items-center'}>
          <Heart w={40} h={40} />
          <span className={'w-4'} />
          <Chat />
          <span className={'w-4'} />
          <Message />
        </div>

        <Bookmark />
      </div>

      <p className={'w-full font-[700] text-[14px] mb-1 cursor-pointer'}>좋아요 N개</p>

      <div className={'w-full flex justify-start items-start mb-1'}>
        <p className={'font-[700] text-[15px] mr-2 cursor-pointer hover:text-gray-400 transition duration-200'}>dy4code</p>
        <p className={'text-[14px]'}>게시물의 설명</p>
      </div>

      <div className={'w-full flex'}>
        <textarea className={'w-[98%] h-6 focus:h-12 outline-none border-none text-sm mb-4 resize-none'} placeholder={'댓글 달기...'} />
        <Emoji w={13} h={13} />
      </div>
      <div className={'w-full border-b-[1px] border-gray-300'} />
    </div>
  )
}