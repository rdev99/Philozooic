import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
const NavBar = React.lazy(() => import("./NavBar"));
const Footer = React.lazy(() => import("./Footer"));
const HomePage = React.lazy(() => import("./HomePage"));
const AboutUs = React.lazy(() => import("./AboutUs"));
const SignUp = React.lazy(() => import("./SignUp"));
const Login = React.lazy(() => import("./Login"));
const FAQPage = React.lazy(() => import("./FAQPage"));
const AllDoctorPage = React.lazy(() => import("./AllDoctorPage"));
const DoctorPage = React.lazy(() => import("./DoctorPage"));
const AllCaretakerPage = React.lazy(() => import("./AllCaretakerPage"));
const CaretakerPage = React.lazy(() => import("./CaretakerPage"));
const AllDateAndMatePage = React.lazy(() => import("./AllDateAndMatePage"));
const DateAndMatePage = React.lazy(() => import("./DateAndMatePage"));
const AllNGOPage = React.lazy(() => import("./AllNGOPage"));
const NGOPage = React.lazy(() => import("./NGOPage"));
const ProfilePage = React.lazy(() => import("./ProfilePage"));
const UserAllPetsPage = React.lazy(() => import("./UserPetSection"));
const EditReactPage = React.lazy(() => import("./EditPetPage"));

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    let loggedInUser = localStorage.getItem("loggedInUser");
    if (user === null && loggedInUser) {
      setUser(JSON.parse(loggedInUser).user);
    }
  }, [user]);

  return (
    <Router>
      <div>
        <React.Suspense fallback={<span uk-spinner={"ratio: 4.5"} />}>
          <NavBar user={user} setUser={setUser} />
          <Switch>
            <Route path={"/"} exact component={HomePage} />
            <Route path={"/about-us"} component={AboutUs} />
            <Route path={"/faq"} component={FAQPage} />
            <Route path={"/sign-up"} component={SignUp} />
            <Route
              path={"/login"}
              component={() => <Login setUser={setUser} />}
            />
            <Route
              path={"/signup"}
              component={() => <SignUp setUser={setUser} user={user} />}
            />
            <Route path={"/doctor/:doctorId"} component={DoctorPage} />
            <Route path={"/doctor"} component={AllDoctorPage} />
            <Route path={"/caretaker/:caretakerId"} component={CaretakerPage} />
            <Route path={"/caretaker"} component={AllCaretakerPage} />
            <Route path={"/date-mate/:petId"} component={DateAndMatePage} />
            <Route path={"/date-mate"} component={AllDateAndMatePage} />
            <Route path={"/ngo/:ngoId"} component={NGOPage} />
            <Route path={"/ngo"} component={AllNGOPage} />
            <Route
              path={"/user/:userId"}
              component={() => (
                <ProfilePage user={user} setUserMain={setUser} />
              )}
            />
            <Route
              path={"/my-pets"}
              component={() => <UserAllPetsPage user={user} />}
            />
            <Route
              path={"/pet/:petId/:userId"}
              component={() => <EditReactPage user={user} />}
            />
            <Route path={"*"} component={() => <Redirect to={"/"} />} />
          </Switch>
          <Footer />
        </React.Suspense>
      </div>
    </Router>
  );
};

export default App;
