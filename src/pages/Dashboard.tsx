// import Sidebar from '../component/ui/dashboard/Sidebar';
import MainSection from '../component/ui/dashboard/MainSection';

const Dashboard = () => {
  return (
   <>
    <div className="min-h-screen h-[100dvh] bg-[var(--bg)] text-[var(--text-primary)] flex">

      {/* <Sidebar/> */}
      <MainSection/>
    </div>
   </>
  )
}

export default Dashboard