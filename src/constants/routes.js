
import ForgotPassword from "../features/authentication/forgotPassword";
import Login from "../features/authentication/login";
import MedicalStudents from "../features/authentication/medicalStudents";
import OTP from "../features/authentication/otp";
import Registration from "../features/authentication/registration";
import SchoolChildren from "../features/authentication/schoolChildren";
import SetPassword from "../features/authentication/setPassword";
import Language from "../features/common/Language";
import Loading from "../features/common/Loader";
import FirebaseDatabase from "../features/firebase_test/firebase";
import Homes from "../features/home";
import ExamPage from "../features/survey/ExamPage";
import StartSurvey from "../features/survey/StartSurvey";
import TestRequest from "../features/survey/TestRequest";
import ThankYouPage from "../features/survey/ThankYouPage";
import { routePath } from "./routePath";

export const routes = [
    {
      path: routePath.ROOT,
      component: <Language />,
    },
    {
      path: routePath.LOGIN,
      component: <Login />,
    },
    {
      path: routePath.FORGOTPASSWORD,
      component: <ForgotPassword />,
    },
    {
      path: routePath.REGISTRATION,
      component: <Registration />,
    },
    {
      path: routePath.SETPASSWORD,
      component: <SetPassword />,
    },
    {
      path: routePath.OTP,
      component: <OTP />,
    },
    {
      path: routePath.MEDICALSTUDENT,
      component: <MedicalStudents />,
    },
    {
      path: routePath.SCHOOLSTUDENT,
      component: <SchoolChildren />,
    },
    {
      path: routePath.HOME,
      component: <Homes />,
    },
    {
      path: routePath.STARTSURVEY,
      component: <StartSurvey />,
    },
    {
      path: routePath.TESTREQUEST,
      component: <TestRequest />,
    },
    {
      path: routePath.LOADING,
      component: <Loading />,
    },
    {
      path: routePath.EXAMPAGE,
      component: <ExamPage />,
    },
    {
      path: routePath.THANKYOUPAGE,
      component: <ThankYouPage />,
    },
    {
      path: routePath.FIREBASE,
      component: <FirebaseDatabase />,
    },

]