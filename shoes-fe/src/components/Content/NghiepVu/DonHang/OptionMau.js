import { memo } from "react";
// const OptionMau = ({ dataMau }) => {
//   return (
//     <>
//       {dataMau.map((data) => (
//         <option value={data.value}>
//           {data.value} - {data.label}
//         </option>
//       ))}
//     </>
//   );
// };

// export default memo(OptionMau);

import { useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Menu from "@mui/material/Menu";
import MenuItemMau from "./MenuItemMau";

const OptionMau = ({ init, dataMau, handleChange }) => {
  console.log("init: ", init);
  const [valueShow, setValueShow] = useState(init);
  const [anchorEl, setAnchorEl] = useState(null);
  // const [selectedIndex, setSelectedIndex] = useState(1);
  const open = Boolean(anchorEl);
  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (event, index) => {
    // setSelectedIndex(index);
    setAnchorEl(null);
    handleChange(dataMau[index]["value"]);
    setValueShow(dataMau[index]["value"]);
    console.log("hello thu", index);
    console.log(dataMau[index]);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <List
        component="nav"
        aria-label="Device settings"
        sx={{ bgcolor: "background.paper" }}
      >
        <ListItem
          id="lock-button"
          aria-haspopup="listbox"
          aria-controls="lock-menu"
          aria-label="when device is locked"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClickListItem}
        >
          <ListItemText
            style={{ display: "inline-block", width: "100%", color: "red" }}
            primary={valueShow}
            // secondary={dataMau[selectedIndex]}
          />
        </ListItem>
      </List>
      <Menu
        id="lock-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "lock-button",
          role: "listbox",
        }}
      >
        <MenuItemMau
          dataMau={dataMau}
          handleMenuItemClick={handleMenuItemClick}
          // selectedIndex={selectedIndex}
        />
      </Menu>
    </div>
  );
};

export default OptionMau;
