import * as React from "react";
import { Button, makeStyles } from "@fluentui/react-components";
import { insertImage, insertText } from "../taskpane";
import SvgInsertion from "./SvgInsertion";
import FetchDataButton from "./FetchDataButton";
import Navbar from "./Navbar";
import DisplayFileInfoBar from "./DisplayFileInfoBar";
import SVGGrid from "./SVG/SVGGrid";

const useStyles = makeStyles({
  root: {
    minHeight: "100vh",
    maxHeight: "100vh",
    display: "flex",
    flexDirection: "column",
  },
  mainContainer: {
    display: "flex",
    flexGrow: 1,
    minHeight: "unset",
    flexDirection: "column",
    overflowY: "auto",
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
        <SVGGrid />
        {/* <SvgInsertion insertSvg={insertImage} />
        <Button appearance="primary" size="large" onClick={() => insertText("Hello, world!")} >
          Insert Text
        </Button> */}
      </div>
    </div>
  );
};

export default App;
