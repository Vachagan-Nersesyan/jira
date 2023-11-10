import React, { Suspense, lazy } from 'react';
import './App.css';

import { BrowserRouter, Routes as Switch, Route, Routes } from 'react-router-dom'
import { Provider } from 'react-redux';
import store from './redux/redux-store';
import BoardCompCont from './components/BoardComp/BoardScp';
import LoaderComp from './components/LoaderComp/LoaderScp';


const MainBarComp = lazy(() => import("./components/MainBarComp"))

const FilterComp = lazy(() => import("./components/FilterComp"))

const IssuesComp = lazy(() => import("./components/IssuesComp"))

const ProjectsComp = lazy(() => import("./components/ProjectsComp"))

const AllProjectsComp = lazy(() => import("./components/AllProjectsComp"))
const DashboardComp = lazy(() => import("./components/DashboardComp"))

const SearchPeopleComp = lazy(() => import("./components/SearchPeopleComp"))

const LayoutUnivComp = lazy(() => import("./components/LayoutUnivComp"))
const ProjectsItemComp = lazy(() => import("./components/ProjectsItemComp"))

const TimelineComp = lazy(() => import(("./components/TimelineComp")))

const LoginScp = lazy(() => import(("./components/LoginComp")))


const App: React.FC<OwnProps> = () => {
  return (
    <div className="App">
      <div className='App_container'>
        <BrowserRouter>
          <Provider store={store}>
            <Suspense fallback={<div className='loader_comp_content'><LoaderComp /></div>}>

              <MainBarComp />


              <Routes>

                <Route path='/jiraItems/login' element={<LoginScp />} />


                <Route path='/jiraItems/filter/:id' element={<FilterComp />} />
                <Route path='/jiraItems/dashboard' element={<DashboardComp />} />
                <Route path='/jiraItems/searchPeople' element={<SearchPeopleComp />} />
                <Route path='/jiraItems/allProjects' element={<AllProjectsComp />} />
                <Route path='/jiraItems/projectsWork' element={<ProjectsComp />} />

                

                {/* make page for board */}


                <Route path='/jiraItems/board/:id' element={<LayoutUnivComp />} />
                <Route path='/jiraItems/issues/:id' element={<LayoutUnivComp />} />
                <Route path='/jiraItems/timeline/:id' element={<LayoutUnivComp />} />
                <Route path='/jiraItems/backblog/:id' element={<LayoutUnivComp />} />
                <Route path='/jiraItems/development/:id' element={<LayoutUnivComp />} />
                <Route path='/jiraItems/projectPage/:id' element={<LayoutUnivComp />} />
                <Route path='/jiraItems/projectSettings/:id' element={<LayoutUnivComp />} />

                <Route path='/' element={<ProjectsComp />} />


              </Routes>

            </Suspense>
          </Provider>
        </BrowserRouter>

      </div>

    </div>
  );
}

export default App;


type OwnProps = {}