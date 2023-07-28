
import {createBrowserRouter} from 'react-router-dom';
import React from 'react';
import App from './App';
import Home from './components/Home';
import StarredWords from './components/StarredWords';


export const routes = createBrowserRouter([
  {
    element: <App />,
    children: [
          {
            path: "/",
            element: <Home />,
          },
          {
            path: "/starred",
            element: <StarredWords />,
          },
    ],
  },
]);
