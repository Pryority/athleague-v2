import { useState } from 'react';
// import OnboardCarousel from './components/Onboarding/OnboardCarousel';
// import CourseNav from './CourseNav/CourseNav';
import CourseMap from './components/Maps/CourseMap';
import CreateMap from "./components/Maps/CreateMap";
import CurrentCourse from "./components/Maps/CurrentCourse";
import MintPage from './components/NFT/MintPage';
import Intro from './components/Intro/Intro';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import demo from './assets/images/demo.png'
import Home from './components/Home/Home'
function App() {
  const [showIntro, setShowIntro] = useState(false);
  return (
    <div id='map' className="h-screen">
      <div className='flex flex-col w-full h-full justify-center items-center '>
        <BrowserRouter>
          {/* <CourseNav /> */}
          {/* <OnboardCarousel /> */}
          {/* <CourseMap /> */}
          {/* <CreateMap /> */}
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/current' element={<CurrentCourse />} />
            <Route path='/create' element={<CreateMap />} />
          </Routes>
          {/* <MintPage /> */}
        </BrowserRouter>
      </div>
    </div>
  );

}

export default App;
