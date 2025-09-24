import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Navigate } from "react-router";

import './index.css'
import App from './App.jsx'
import Photo from './components/Photo/Photo.jsx'
import StartScreen from './components/StartScreen/StartScreen.jsx';
import HighScoreList from './components/HighScoreList/HighScoreList.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Navigate to="/wheresWaldo" replace /> },
      { path: '/wheresWaldo', element: <StartScreen /> },
      // { path: '/photos', element: <Photo /> },
      //to use in get request
      { path: '/photos/:photoId', element: <Photo /> },
      { path: '/highscores', element: <HighScoreList />}
    ],
  },
  // {
  //   path: 'highscores',
  //   element: <HighScoreList />
  // },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
