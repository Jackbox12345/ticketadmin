// import Sidebar from '../component/ui/dashboard/Sidebar';
import MainSection from '../component/ui/dashboard/MainSection';

const Dashboard = () => {
  return (
   <>
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text-primary)] flex animate-slide-in-left">

      {/* <Sidebar/> */}
      <MainSection/>
    </div>
   </>
  )
}

export default Dashboard
