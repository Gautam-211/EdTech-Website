import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/common/Navbar";
import Login from "./pages/Login";
import Error from "./pages/Error";
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";
import Signup from "./pages/Signup";
import VerifyEmail from "./pages/VerifyEmail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import OpenRoute from "./components/core/Auth/OpenRoute";
import PrivateRoute from "./components/core/Auth/PrivateRoute";
import Dashboard from "./pages/Dashboard";
import MyProfile from "./components/core/Dashboard/MyProfile";
import EnrolledCourses from "./components/core/Dashboard/EnrolledCourses";
import Cart from "./components/core/Dashboard/Cart";
import { useSelector } from "react-redux";
import { ACCOUNT_TYPE } from "./utils/constants";
import AddCourse from "./components/core/Dashboard/AddCourse";
import MyCourses from "./components/core/Dashboard/MyCourses";
import EditCourse from "./components/core/Dashboard/EditCourse";
import Catalog from "./pages/Catalog";
import CourseDetails from "./pages/CourseDetails";
import ViewCourse from "./pages/ViewCourse";
import VideoDetails from "./components/core/ViewCourse/VideoDetails/VideoDetails";
import Instructor from "./components/core/Dashboard/InstructorDashboard/Instructor";
import Settings from "./components/core/Dashboard/Settings";

function App() {

  const {user} = useSelector((state) => state.profile)

  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter items-center">
        <Navbar/>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/about" element={<About/>}/>
            <Route path="/contact" element={<Contact/>}/>
            <Route path="/catalog/:catalogName" element={<Catalog/>}/>
            <Route path="/courses/:courseId" element={<CourseDetails/>}/>

            <Route path="/login" element={
                                            <OpenRoute>
                                                <Login/>
                                            </OpenRoute>
                                          }/>

            <Route path="/signup" element={
                                            <OpenRoute>
                                                <Signup/>
                                            </OpenRoute>   
                                          }/>

            <Route path="/verify-email" element={
                                            <OpenRoute>
                                                <VerifyEmail/>
                                            </OpenRoute>   
                                          }/>

            <Route path="/forgot-password" element={
                                            <OpenRoute>
                                                <ForgotPassword/>
                                            </OpenRoute>   
                                          }/>

            <Route path="/update-password/:token" element={
                                            <OpenRoute>
                                                <UpdatePassword/>
                                            </OpenRoute>   
                                          }/>

          <Route
            element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
          }>

                  <Route path="dashboard/my-profile" element={<MyProfile/>}/>
                  <Route path="dashboard/settings" element={<Settings/>}/>
                  {
                    user?.accountType===ACCOUNT_TYPE.STUDENT && (
                          <>
                            <Route path="dashboard/enrolled-courses" element={<EnrolledCourses/>}/>
                            <Route path="dashboard/cart" element={<Cart/>}/>
                          </>
                    )
                  }
                  {
                    user?.accountType===ACCOUNT_TYPE.INSTRUCTOR && (
                      <>
                            <Route path="dashboard/my-courses" element={<MyCourses/>}/>
                            <Route path="dashboard/add-course" element={<AddCourse/>}/>
                            <Route path="dashboard/edit-course/:courseId" element={<EditCourse/>}/>
                            <Route path="dashboard/instructor" element={<Instructor/>}/>
                      </>
                    )
                  }

          </Route>

          <Route element={
            <PrivateRoute>
                <ViewCourse/>
            </PrivateRoute>
          }>

            {
                user?.accountType === ACCOUNT_TYPE.STUDENT && (
                    <>
                        <Route path="view-course/:courseId/section/:sectionId/sub-section/:subSectionId"
                        element={<VideoDetails/>}></Route>
                    </>
                )
            }
             
          </Route>
        

                                           
            <Route path="*" element={<Error/>}/>
        </Routes>

    </div>
  );
}

export default App;
