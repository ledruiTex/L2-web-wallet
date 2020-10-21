import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  makeStyles,
} from "@material-ui/core";
import {
  CloseOutlined as CloseIcon,
  Menu as MenuIcon,
  Backup as BackupIcon,
} from "@material-ui/icons";

const useStyles = makeStyles( theme => ({
  appbarTop: {
    flex: 1,
  },
  menu: {
    marginRight: theme.spacing(2),
  },
}));

export const HamburgerMenu = (props: any) => {
  const classes = useStyles();
  const { setTheme, title } = props;

  const [open, setOpen] = useState(false);
  const toggleDrawer = (event: React.KeyboardEvent | React.MouseEvent) => {
    setOpen(!open);
  };

  return (
    <>
      <AppBar color="inherit" position="fixed" className={classes.appbarTop}>
        <Toolbar>
          <IconButton onClick={toggleDrawer} edge="start" className={classes.menu} color="inherit">
            <MenuIcon />
          </IconButton>
          {title
            ?  <Typography
                  variant="h5"
                  align={"center"}
                  noWrap
                >
                  {title}
                </Typography>
            : null
          }
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="left"
        open={open}
        onClose={toggleDrawer}
      >
        <Paper onClick={toggleDrawer} onKeyDown={toggleDrawer}>
          <IconButton onClick={toggleDrawer}>
            <CloseIcon />
          </IconButton>
          <List>
            <ListItem button component={Link} to={"/backup"} key="import-seed">
              <ListItemIcon> <BackupIcon /> </ListItemIcon>
              <ListItemText primary={"Backup"} />
            </ListItem>
          </List>
        </Paper>
      </Drawer>
    </>
  );
}
