import * as React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../redux/reducer/user.reducer";

const drawerMenu = [
  {
    Name: "Applicants",
    path: "/admin/applicants",
  },
  {
    Name: "Template",
    path: "/admin/template",
  },
  {
    Name: "Fields",
    path: "/admin/fields",
  },
  {
    Name: "Order",
    path: "/admin/order",
  },
];

export default function TemporaryDrawer() {
  const [open, setOpen] = React.useState(false);
  const [activeTab, setActive] = React.useState<any>("Applicants");

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="flex flex-col justify-between items-center h-screen bg-purple-300">
      <Box
        sx={{ width: "100%" }}
        role="presentation"
        onClick={toggleDrawer(false)}
      >
        <List>
          {drawerMenu.map((menu, index) => (
            <React.Fragment key={menu.Name}>
              <ListItem
                sx={{ color: activeTab === menu.Name ? "white" : "black" }}
                disablePadding
              >
                <ListItemButton
                  onClick={() => {
                    setActive(menu.Name);
                    navigate(menu.path);
                  }}
                >
                  <ListItemText primary={menu.Name} />
                </ListItemButton>
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
        </List>
      </Box>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
