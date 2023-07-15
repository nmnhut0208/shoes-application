import { memo } from "react";
import { useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Menu from "@mui/material/Menu";
import MenuItemMau from "./MenuItemMau";

const OptionMau = ({
  dataMau,
  handleChange,
  id_row,
  id_column,
  dataTable,
  readOnly,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClickListItem = (event) => {
    if (readOnly) return;
    setAnchorEl(event.currentTarget); // ở lại trang hiện tại
  };

  const handleMenuItemClick = (event, index) => {
    setAnchorEl(null);
    handleChange(dataMau[index]["value"], dataMau[index]["label"]);
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
        sx={{ bgcolor: "none" }}
      >
        <ListItem
          id="lock-button"
          // aria-haspopup="listbox"
          // aria-controls="lock-menu"
          // aria-label="when device is locked"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClickListItem}
        >
          <ListItemText
            primary={dataTable[id_row][id_column]}
            primaryTypographyProps={{ fontSize: "1.4rem" }}
          />
        </ListItem>
      </List>
      <Menu
        id="lock-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        transitionDuration={0}
        MenuListProps={{
          "aria-labelledby": "lock-button",
          role: "listbox",
        }}
      >
        {!readOnly && (
          <MenuItemMau
            dataMau={dataMau}
            handleMenuItemClick={handleMenuItemClick}
          />
        )}
      </Menu>
    </div>
  );
};

export default memo(OptionMau);
