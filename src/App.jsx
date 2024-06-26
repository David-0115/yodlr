import React, { useState } from 'react'
import AppContext from './AppContext';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import UserAlert from './UserAlert';
import './App.css'

function App() {
  const [appData, setAppData] = useState({})
  const [alertMsg, setAlertMsg] = useState(null)

  const updateAppData = (key, val) => {
    setAppData(data => ({
      ...data,
      [key]: val
    }));
  };

  const updateAlertMsg = (msgObj) => {
    setAlertMsg(msgObj);
  };

  return (
    <>
      <BrowserRouter>
        <AppContext.Provider value={
          {
            appData, updateAppData,
            alertMsg, updateAlertMsg
          }
        }>
          {alertMsg ? <UserAlert /> : ""}
          <AppRoutes />
        </AppContext.Provider>
      </BrowserRouter>
    </>
  )
}

export default App




// useEffect(() => {
//   async function getUsersData() {
//     const userData = await yodlrApi.getUsers();
//     console.log(userData)
//     setAppData(data => ({
//       ...data,
//       users: userData.data
//     }))
//     console.log(appData.users)
//     setIsLoading(false)
//   }

//   getUsersData()
// }, [])

// console.log("appData:", appData)

// return (
//   <>
//     {isLoading ? (
//       <div>
//         Loading...
//       </div>
//     ) : (
//       <div>
//         {appData.users.map((user) => (
//           <ul key={user.id}>
//             <li>{user.firstName}</li>
//             <li>{user.lastName}</li>
//             <li>{user.email}</li>
//             <li>{user.state}</li>
//             <li>{user.id}</li>
//           </ul>
//         ))}
//       </div>
//     )}
//   </>

// )