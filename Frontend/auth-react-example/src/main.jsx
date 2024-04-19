import React, { Children } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import AuthContextProvider from './context/AuthProvider.jsx'
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import Registration from './page/Registration.jsx'
import Login from './page/Login.jsx'
import Profile from './page/Profile.jsx'
import ProtectedRoute from './page/ProtectedRoute.jsx'
import PersistLogin from './page/PersistantLogin.jsx'

import ImageUpload from './page/ImageUpload.jsx'

const router=createBrowserRouter([
  {path:'/register',element:<Registration/>},
  {path:'/login', element:<Login/>},
//   {path:'/profile', element:
//   <ProtectedRoute>
//   <Profile/>
//   </ProtectedRoute>
// },
{ element:<PersistLogin/>,children:[
  {path:"/profile",element:<ProtectedRoute><Profile/></ProtectedRoute>}
]
},
{path:'/image',element:<ImageUpload/>}
,
  {path:'/',element:<App/>}
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContextProvider>
    <RouterProvider router={router}/>
    </AuthContextProvider>
  </React.StrictMode>,
)
