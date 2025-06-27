import React, { useContext } from "react";
import { ConfigContext, RepoContext } from "../context/Context";

import { Button, makeStyles, Tooltip, } from "@fluentui/react-components";
import { IconsRegular, OpenRegular, TagMultipleRegular } from "@fluentui/react-icons";


const useStyles = makeStyles({
  fileInfoBar: {
    padding: "10px",
    backgroundColor: "#f3f2f1",
    borderRadius: "5px",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "10px",
    "> small": {
      display: "flex",
      alignItems: "center",
      gap: "2px",
    }
  },
  icon: {
    fontSize: "16px",
  },
  iconEnd: {
    fontSize: "16px",
    marginLeft: "auto",
  }
});

interface ButtonData {
  text?: string | number;
  tooltip: string;
  icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  classes?: string;
}


export default function DisplayFileInfoBar() { 
  const { state: files } = useContext(RepoContext);
  const styles = useStyles();
  const distinctTagCount = React.useMemo(() => {
    const tags = files.flatMap(file => file.tags || []);
    return new Set(tags).size;
  }, [files]); 
  const {state: config} = useContext(ConfigContext);
  const ButtonData: ButtonData [] = [
    {
      text: files.length,
      tooltip: "Number of files in the repository",
      icon: IconsRegular,
    },
    {
      text: distinctTagCount,
      tooltip: "Number of distinct tags across all files",
      icon: TagMultipleRegular,
    },
  ]
  return (
    <div className={styles.fileInfoBar}>
      {ButtonData.map((button, index) => (
          <Tooltip 
            key={index} 
            content={button.tooltip} 
            relationship="description" 
            withArrow>
            <small>
              <button.icon className={styles.icon}/> {button.text}
            </small>
          </Tooltip>
      ))}
      {
        config.owner && config.repo && (
          <Tooltip content="Open repository on GitHub" relationship="description" withArrow>
            <Button className={styles.iconEnd} size="small" icon={<OpenRegular />} 
              onClick={() => window.open(`https://github.com/${config.owner}/${config.repo}`, "_blank", "noopener,noreferrer")}
            />
          </Tooltip>
        )
      }

    </div>
  )
}