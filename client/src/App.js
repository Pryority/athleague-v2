// import OnboardCarousel from './components/Onboarding/OnboardCarousel';
// import CourseNav from './CourseNav/CourseNav';
import CourseMap from './components/Maps/CourseMap';

// import CreateMap from "./components/Maps/CourseMap";


function App() {
  return (
    <div id='map' className="flex bg-blue-400">
      <div className='flex flex-col w-full h-screen bg-blue-400 justify-between items-between'>
        {/* <CourseNav /> */}
        {/* <OnboardCarousel /> */}
        <CourseMap />
        {/* <CreateMap /> */}
      </div>
    </div>
  );
}

export default App;
