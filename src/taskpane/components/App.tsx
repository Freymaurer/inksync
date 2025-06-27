import * as React from "react";
import { Button, makeStyles } from "@fluentui/react-components";
import { insertImage, insertText } from "../taskpane";
import SvgInsertion from "./SvgInsertion";
import FetchDataButton from "./FetchDataButton";
import Navbar from "./Navbar";
import DisplayFileInfoBar from "./DisplayFileInfoBar";

const useStyles = makeStyles({
  root: {
    minHeight: "100vh",
  },
  mainContainer: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    padding: "20px",
  }
});

function App({}) {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <Navbar />
      <DisplayFileInfoBar />
      <div className={styles.mainContainer}>
        <SvgInsertion insertSvg={insertImage} />
        <Button appearance="primary" size="large" onClick={() => insertText("Hello, world!")} >
          Insert Text
        </Button>
      </div>
    </div>
  );
};

export default App;
