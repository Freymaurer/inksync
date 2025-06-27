import * as React from "react";
import {
  CloudSyncRegular,
  MoreHorizontal24Filled,
} from "@fluentui/react-icons";
import {
  Toolbar,
  ToolbarButton,
  ToolbarDivider,
  Menu,
  MenuTrigger,
  MenuPopover,
  MenuList,
  MenuItem,
  tokens,
  makeStyles
} from "@fluentui/react-components";
import type { ToolbarProps } from "@fluentui/react-components";
import FetchDataButton from "./FetchDataButton";
import SetConfigButton from "./SetConfigButton";

let useStyles = makeStyles({
  navbar: {
    backgroundColor: tokens.colorNeutralBackground1,
    color: tokens.colorNeutralForeground1,
  }
})

function FetchButton() {

  function IconButton({onClick, ...props}: {onClick: () => void}) {
    return <ToolbarButton
      onClick={onClick}
      aria-label="Increase Font Size"
      appearance="primary"
      {...props}
      icon={<CloudSyncRegular />}
    />
  }

  return (
    <FetchDataButton CustomButton={IconButton} />
  );
}

export default function Default (props: Partial<ToolbarProps>) {
  const styles = useStyles();
  return (
    <div className={styles.navbar}>
      <Toolbar aria-label="medium" size="medium" {...props} style={{gap: '0.5rem'}}>
        <FetchButton />
        <SetConfigButton />
        {/* <ToolbarButton
          aria-label="Decrease Font Size"
          icon={<FontDecrease24Regular />}
        />
        <ToolbarButton aria-label="Reset Font Size" icon={<TextFont24Regular />} /> */}
        {/* <ToolbarDivider />
        <Menu>
          <MenuTrigger>
            <ToolbarButton aria-label="More" icon={<MoreHorizontal24Filled />} />
          </MenuTrigger>
    
          <MenuPopover>
            <MenuList>
              <MenuItem>New </MenuItem>
              <MenuItem>New Window</MenuItem>
              <MenuItem disabled>Open File</MenuItem>
              <MenuItem>Open Folder</MenuItem>
            </MenuList>
          </MenuPopover>
        </Menu> */}
      </Toolbar>
    </div>
  );
} 