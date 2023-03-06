import React, { Fragment, useEffect } from "react";
import { useSelector } from "react-redux";
import MetaData from "./layout/MetaData";
import Loader from './layout/Loader/Loader'
import { Link } from "react-router-dom";
import Header from './Header';
import "./Profile.css";
import {useNavigate} from "react-router-dom"
import { logout } from "./actions/userAction";
import { useDispatch } from "react-redux";
import { getAdminProduct } from "./actions/productAction";


const Profile = ({ history }) => {
  const { user, loading, isAuthenticated } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleonClick = ()=>{
    dispatch(logout())
    navigate(`/`)
  }
  const handleonClick2 = ()=>{
    dispatch((getAdminProduct))
    navigate(`/admin/dashboard`)
  }

  let navigate = useNavigate()
  useEffect(() => {
    if (isAuthenticated === false) {
      //history.push("/login");
      navigate(`/login`)
    }
  }, [history, isAuthenticated ,navigate]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <Header />
          <MetaData title={`${user.name}'s Profile`} />
          <div className="profileContainer">
            <div>
              <h1>My Profile</h1>
              <img src={user.avatar.url} alt={user.name} />
              <Link to="/me/update">Edit Profile</Link>
            </div>
            <div>
              <div>
                <h4>Full Name</h4>
                <p>{user.name}</p>
              </div>
              <div>
                <h4>Email</h4>
                <p>{user.email}</p>
              </div>
              <div>
                <h4>Joined On</h4>
                <p>{String(user.createdAt).substr(0, 10)}</p>
              </div>

              <div>
                <Link to="/orders">My Orders</Link>
                <Link to="/password/update">Change Password</Link>
                <button className="logoutbtn"  onClick={(handleonClick)}>LogOut</button>
                {
                  user.role==="admin" && <button className="logoutbtn2" onClick={(handleonClick2)}>Admin Dashboard</button>
                }
              </div>
            </div>
          </div>
          {/* <button onClick={()=>{logout()}}>LogOut</button> */}
        </Fragment>
      )}
    </Fragment>
  );
};

export default Profile;
