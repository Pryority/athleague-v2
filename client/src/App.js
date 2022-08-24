// import OnboardCarousel from './components/Onboarding/OnboardCarousel';
// import CourseNav from './CourseNav/CourseNav';
import CourseMap from './components/Maps/CourseMap';
import CreateMap from "./components/Maps/CreateMap";
import MintPage from './components/MintPage';

function App() {
  return (
    <div id='map' className="flex h-screen">
      <div className='flex flex-col w-full h-full justify-center items-center '>
        {/* <CourseNav /> */}
        {/* <OnboardCarousel /> */}
        {/* <CourseMap /> */}
        {/* <CreateMap /> */}
        <MintPage />
      </div>
    </div>

  );

}

export default App;
