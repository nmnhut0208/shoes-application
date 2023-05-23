import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import { memo } from "react";

const MenuItemMau = ({ dataMau, handleMenuItemClick, selectedIndex }) => {
  return (
    <>
      {dataMau.map((option, index) => (
        <MenuItem
          //   key={option.value}
          //   disabled={index === 0}
          //   selected={index === selectedIndex}
          onClick={(event) => handleMenuItemClick(event, index)}
        >
          {/* <ListItemText>
            {option.value} - {option.label}
          </ListItemText> */}
          <ListItemText>{option.value}</ListItemText>
          <Typography variant="body2" color="text.secondary">
            {option.label}
          </Typography>
        </MenuItem>
      ))}
    </>
  );
};

export default memo(MenuItemMau);
