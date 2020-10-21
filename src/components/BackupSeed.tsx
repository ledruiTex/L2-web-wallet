import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  TextField,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { TabContext, TabPanel } from "@material-ui/lab";
import {
  ArrowBackIos as BackIcon,
  VpnKey as KeyIcon,
  VpnLock as LockIcon,
  SaveAlt as SaveIcon,
  CropFree as ScanIcon,
  ImportContacts as ContactsIcon,
} from "@material-ui/icons";
import { loadSecret } from "../utils/initialize";
import { walletSecretFYI } from "../utils/constants";
import { AddRcvrAddress } from "./AddRcvrAddress";
import { ScanRcvrAddress } from "./ScanRcvrAddress";

const useStyles = makeStyles( theme => ({
  appbar: {
    flex: 1,
    bottom: 0,
    top: 'auto',
  },
  back: {
    marginRight: theme.spacing(2),
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: theme.spacing(10),
    marginBottom: theme.spacing(2),
  },
  typography: {
    marginLeft: theme.spacing(5),
    marginRight: theme.spacing(5),
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
}));

export const BackupSeed = (props: any) => {
  const classes = useStyles();
  const [secret, setSecret] = useState(loadSecret());
  const [addressOpt, setAddressOpt] = useState("contacts");

  const updateSelection = (event: React.ChangeEvent<{}>, selectedTab: string) => {
    setAddressOpt(selectedTab);
  };

  return (
    <>
      <AppBar position="fixed" className={classes.appbar}>
          <IconButton className={classes.back} component={Link} to={"/"}>
            <BackIcon />
          </IconButton>
      </AppBar>
      <Paper className={classes.paper}>
        <Typography variant="h5"> Your Magic Words</Typography>
        <Typography align="center" variant="caption" className={classes.typography}>
          A secret key is a unique combination of 12 words associated with your wallet
        </Typography>
        <TextField
          disabled
          id="secret-key"
          inputProps={{style: { textAlign: "center" }}}
          InputProps={{style: { letterSpacing: "2px" }}}
          defaultValue={secret}
          multiline
          rows={4}
          margin="normal"
          variant="filled"
        />
        
        <List>
          <ListItem>
            <ListItemIcon> <KeyIcon /> </ListItemIcon>
            <ListItemText primary={walletSecretFYI[0]} />
          </ListItem>
          <ListItem>
            <ListItemIcon> <LockIcon /> </ListItemIcon>
            <ListItemText primary={walletSecretFYI[1]} />
          </ListItem>
          <ListItem>
            <ListItemIcon> <SaveIcon /> </ListItemIcon>
            <ListItemText primary={walletSecretFYI[2]} />
          </ListItem>
        </List>
      </Paper>
    </>
  )
};