import { createBrowserRouter, RouterProvider } from 'react-router'
import './App.css'
import Counter from './components/Counter'
import MainLayout from './layout/MainLayout'
import TaskManager from './pages/TaskManagerPage/TaskManager'
import CinemaLayout from './layout/CinemaLayout'
import NowPlayingPage from './pages/cinema/NowPlayingPage'
import PopularMoviesPage from './pages/cinema/PopularMoviesPage'
import UpcomingMoviesPage from './pages/cinema/UpcomingMoviesPage'
import MovieDetailPage from './pages/cinema/MovieDetailPage'
import FormPage from './pages/cinema/FormPage'



const router = createBrowserRouter([
  {
    path: '',
    element: <MainLayout />,
    children: [
      {
        path: 'counter',
        index: true,
        element: <Counter />
      },
      {
        path: 'task-manager',
        element: <TaskManager />
      },


      {
        path: 'cinema',
        element: <CinemaLayout />,
        children: [
          {
            path: 'now-playing',
            element: <NowPlayingPage />
          },
          {
            path: 'popular',
            element: <PopularMoviesPage />
          },
          {
            path: 'upcoming',
            element: <UpcomingMoviesPage />
          },
          {
            path: 'form',
            element: <FormPage />
          },
          {
            path: 'movie/:id',
            element: <MovieDetailPage />
          }
        ]
      },
    ]
  },
])


function App() {
  // const [count, setCount] = useState(0)

  return (
    <RouterProvider router={router} />
  )
}

export default App
