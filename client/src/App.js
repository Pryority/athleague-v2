// import OnboardCarousel from './components/Onboarding/OnboardCarousel';
// import CourseNav from './CourseNav/CourseNav';
import CourseMap from './components/Maps/CourseMap';
import CreateMap from "./components/Maps/CreateMap";

function App() {
  return (
    <div id='map' className="flex">
      <div className='flex flex-col w-full h-screen justify-between items-between'>
        {/* <CourseNav /> */}
        {/* <OnboardCarousel /> */}
        {/* <CourseMap /> */}
        <CreateMap />
      </div>
    </div>

  );

}

export default App;
