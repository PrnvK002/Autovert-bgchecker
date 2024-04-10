import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { useNavigate } from "react-router-dom";

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

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const navigate = useNavigate();

  return (
    <Box sx={{ width: "100%" }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {drawerMenu.map((menu, index) => (
          <>
            <ListItem key={menu.Name} disablePadding>
              <ListItemButton onClick={() => navigate(menu.path)}>
                <ListItemText primary={menu.Name} />
              </ListItemButton>
            </ListItem>
            <Divider />
          </>
        ))}
      </List>
    </Box>
  );
}
