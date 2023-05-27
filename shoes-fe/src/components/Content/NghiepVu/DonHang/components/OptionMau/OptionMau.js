import { memo } from "react";
import { useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Menu from "@mui/material/Menu";
import MenuItemMau from "./MenuItemMau";

const OptionMau = ({ dataMau, handleChange, id_row, id_column, dataTable }) => {
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
    console.log("hello thu", index);
    console.log(dataMau[index]);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div
      style={{
        display: "inline-block",
        width: "100%",
      }}
    >
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
            primary={dataTable[id_row][id_column]}
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

export default memo(OptionMau);
