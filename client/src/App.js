// import OnboardCarousel from './components/Onboarding/OnboardCarousel';
// import CourseNav from './CourseNav/CourseNav';
import MainMap from './components/Map/MainMap';

function App() {
  return (
    <div id='map' className="flex bg-blue-400">
      <div className='flex flex-col w-full h-screen bg-blue-400 justify-between items-between'>
        {/* <CourseNav /> */}
        {/* <OnboardCarousel /> */}
        <MainMap />
      </div>
    </div>
  );
}

export default App;
