export default function MainPage () {
  return (
    <div className={'w-screen flex justify-center items-center'}>
      <div className={'w-[630px] h-screen bg-blue-100 mr-20 xs:ml-64 lg:ml-64 md:ml-28 sm:ml-28 opacity-50'}>main tab</div>
      <div className={'w-[343px] h-screen bg-red-100 opacity-50 xs:block lg:block md:hidden sm:hidden'}>recommend tab</div>
    </div>
  )
}