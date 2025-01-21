import React, { useEffect } from 'react';
import AdminDashboard from "./AdminDashboard";
import UserDashboard from './UserDashboard';
import { useSelector, useDispatch } from 'react-redux';
import { loadUser } from '../redux toolkit/user.slice';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.userSlice);

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch])

  return (
    <div>
          {user && user.role == "user" ? <div><UserDashboard/></div> : <div><AdminDashboard /></div>}
    </div>
  )
}

export default Dashboard
