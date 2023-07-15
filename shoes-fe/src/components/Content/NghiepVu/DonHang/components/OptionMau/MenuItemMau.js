import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import { memo } from "react";

const MenuItemMau = ({ dataMau, handleMenuItemClick }) => {
  return (
    <>
      {dataMau.map((option, index) => (
        <MenuItem
          onClick={(event) => handleMenuItemClick(event, index)}
          // onDoubleClick={(event) => handleMenuItemClick(event, index)}
        >
          <ListItemText primaryTypographyProps={{ fontSize: "1.4rem" }}>
            {option.value}
          </ListItemText>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontSize: "1.4rem" }}
          >
            {option.label}
          </Typography>
        </MenuItem>
      ))}
    </>
  );
};

export default memo(MenuItemMau);
