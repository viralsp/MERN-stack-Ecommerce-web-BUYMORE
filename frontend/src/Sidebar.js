import React from "react";
import "./sidebar.css";
// import logo from "./images/logo.png";
import { Link } from "react-router-dom";
import { TreeView, TreeItem } from "@material-ui/lab";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import PostAddIcon from "@material-ui/icons/PostAdd";
import AddIcon from "@material-ui/icons/Add";
import ImportExportIcon from "@material-ui/icons/ImportExport";
import ListAltIcon from "@material-ui/icons/ListAlt";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleIcon from "@material-ui/icons/People";
import RateReviewIcon from "@material-ui/icons/RateReview";
import {useNavigate} from "react-router-dom"


const Sidebar = () => {
//   let navigate = useNavigate()
//   const keyword=''
// const handleonClick = ()=>{
//   console.log("ho")
//   navigate("/productlist", {state:{keyword}})
// }

  return (
    <div className="sidebar">
      <Link to="/">
        {/* <img src={logo} alt="Ecommerce" /> */}
        <h1>BuyMore</h1>
      </Link>
      <Link to="/admin/dashboard">
        <p>
          <DashboardIcon /> Dashboard
        </p>
      </Link>
      {/* <Link to="/admin/order/:id">
        <p><DashboardIcon />Update Status</p>
      </Link> */}
      <Link to="#">
        <TreeView
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ImportExportIcon />}
        >
          <TreeItem nodeId="1" label="Products">
            {/* <div className="sidebarproductlist" onClick={handleonClick} >
              <TreeItem nodeId="2" label="All" icon={<PostAddIcon />} />
            </div> */}

            <Link to="/admin/product">
              <TreeItem nodeId="3" label="Create" icon={<AddIcon />} />
            </Link>
          </TreeItem>
        </TreeView>
      </Link>
      <Link to="/admin/orders">
        <p>
          <ListAltIcon />
          Orders
        </p>
      </Link>
      <Link to="/admin/users">
        <p>
          <PeopleIcon /> Users
        </p>
      </Link>
      <Link to="/admin/reviews">
        <p>
          <RateReviewIcon />
          Reviews
        </p>
      </Link>
    </div>
  );
};

export default Sidebar;