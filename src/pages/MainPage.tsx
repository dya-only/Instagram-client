import Story from "../components/Story/component.tsx"
import Post from "../components/Post/component.tsx"

export default function MainPage () {
  return (
    <div className={'w-screen flex justify-center items-center'}>
      <div className={'w-[600px] h-screen flex flex-col justify-start items-center mt-[45px] mr-20 xs:ml-64 lg:ml-64 md:ml-28 sm:ml-28'}>
        <div className={'w-full h-[100px] flex justify-start items-center overflow-x-scroll pl-1 pr-4'}>
          <Story /><Story /><Story /><Story /><Story /><Story />
          <Story /><Story /><Story /><Story /><Story /><Story />
        </div>

        <div className={'w-full flex flex-col justify-start items-center mt-6'}>
          <Post />
        </div>
      </div>
      <div className={'w-[343px] h-screen bg-red-100 opacity-50 xs:block lg:block md:hidden sm:hidden'}>recommend tab</div>
    </div>
  )
}