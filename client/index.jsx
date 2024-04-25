import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { BrowserRouter, Router, Route, Routes } from 'react-router-dom';

import tripReducer from './reducers/tripReducer';
import itineraryReducer from './reducers/itineraryReducer';

import App from './App.jsx';
import Manager from './components/Manager.jsx';
import Main from './components/Main.jsx';

import About from './components/About.jsx';
import Login from './components/Login.jsx';
import Form from './components/Form.jsx';
import Page1 from './components/formPages/Page1.jsx';
import Page2 from './components/formPages/Page2.jsx';
import Page3 from './components/formPages/Page3.jsx';
import Page4 from './components/formPages/Page4.jsx';
import Page5 from './components/formPages/Page5.jsx';
import Page6 from './components/formPages/Page6.jsx';
import ItineraryPage from './components/ItineraryPage.jsx';
import Register from './components/Register.jsx';
import './styles.css';

export const store = configureStore({
  reducer: {
    trip: tripReducer,
    itinerary: itineraryReducer,
  }
});

const root = createRoot(document.getElementById('root'));

// react router issues...won't render properly...will render App, but not everything else

// converted from vite to webpack...converted from yarn to node...imported react to all components ...correctly set up dotenv...moved styles.css into client... 
root.render(

  <React.StrictMode>

    <Provider store={store}>
    
      {console.log('in the routes')}
       <Router>
        <Routes>
    
          <Route path="/" element={<App />}>
            <Route index element={<Main />} />
            <Route path='/manager' element={<Manager />} />
            <Route path='/about' element={<About />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path="/form" element={<Form />}>
              <Route index element={<Page1 />} />
              <Route path="/form/page2" element={<Page2 />} />
              <Route path="/form/page3" element={<Page3 />} />
              <Route path="/form/page4" element={<Page4 />} />
              <Route path="/form/page5" element={<Page5 />} />
              <Route path="/form/page6" element={<Page6 />} />
            </Route>
          </Route>
          <Route path="/itinerary" element={<ItineraryPage />} />
        </Routes>
      </Router> 
    </Provider>
    </React.StrictMode>
 
);