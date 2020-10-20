import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  IconButton,
  Snackbar,
  Tab,
  Tabs,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { Alert, TabContext, TabPanel } from "@material-ui/lab";
import {
  ArrowBackIos as BackIcon,
  Check as ConfirmIcon,
  Clear as RejectIcon,
  CropFree as ScanIcon,
  ImportContacts as ContactsIcon,
} from "@material-ui/icons";
import QrReader from "react-qr-reader";
import { SendParamConfirm } from "./SendParamConfirm";

const useStyles = makeStyles( theme => ({
  appbar: {
    flex: 1,
  },
  panel: {
    marginTop: theme.spacing(8),
  },
  qrCode: {
    marginRight: theme.spacing(65),
  },
  contacts: {
    marginLeft: theme.spacing(65),
  },
}));

export const Send = (props: any) => {
  const classes = useStyles();
  const scanner = {
    width: "100%",
  };
  const [address, setAddress] = useState("");
  const [open, setOpen] = useState(false);
  const [error, setError] = useState();
  const [addressOpt, setAddressOpt] =useState("qrCode");

  const toggleSnackBar = () => { setOpen(!open); };
  const handleReject = () => { setAddress(""); };
  const updateSelection = (event: React.ChangeEvent<{}>, selectedTab: string) => {
    setAddressOpt(selectedTab);
  };
  const handleScan = (data: any) => {
    if (data) {
      const add = data.match(/0x[a-fA-F0-9]{40}/g);
      if (add) {
        console.log(add[0]);
        setAddress(add[0]);
      } else {
        setError("Scanned input is not an Ethereum address, Please check");
        setOpen(true);
        console.log(data);
      }
    }
  };

  return (
    <>
      <TabContext value={addressOpt}>
        <AppBar position="fixed" className={classes.appbar}>
          <Tabs
            value={"qrCode"}
            onChange={updateSelection}
            indicatorColor="secondary"
            textColor="secondary"
            variant="fullWidth"
          >
            <Tab value="back" icon={<BackIcon />} component={Link} to={"/"} />
            <Tab value="qrCode" icon={<ScanIcon />} />
            <Tab value="contacts" icon={<ContactsIcon />} />
          </Tabs>
        </AppBar>
        <TabPanel value="qrCode" className={classes.panel}>
          { address
            ? <SendParamConfirm address={address} amount="0" reject={handleReject} />
            : <QrReader
                delay={100}
                style={{width: "100%"}}
                onError={(err: any) => console.log(err)}
                onScan={handleScan}
              />
          }
        </TabPanel>
        <TabPanel value="contacts" className={classes.panel}>
          Contacts
        </TabPanel>
      </TabContext>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={open}
        onClose={toggleSnackBar}
        autoHideDuration={10000}
      >
        <Alert onClose={toggleSnackBar} severity="error"> {error} </Alert>
      </Snackbar>
    </>
  )
};