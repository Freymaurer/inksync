import {
  Button,
  Caption1,
  Image,
  makeResetStyles,
  makeStyles,
  Menu,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
  mergeClasses,
  Text,
  tokens,
  TagGroup,
  InteractionTag,
  InteractionTagPrimary,
  Tag,
} from "@fluentui/react-components";
import { MoreHorizontal20Regular } from "@fluentui/react-icons";
import { List, ListItem } from "@fluentui/react-components";

import * as React from "react";
import { ErrorContext, RepoContext, type RepoFile } from "../../context/Context";
import { insertImage } from "../../taskpane";

const useListItemRootStyles = makeResetStyles({
  position: "relative",
  flexGrow: "1",
  gap: "8px",
  border: "1px solid grey",
  alignItems: "center",
  borderRadius: "8px",
  gridTemplate: `"preview preview preview" auto
      "header header action" auto 
      "tags tags tags" auto / auto auto auto
    `,
});

const useStyles = makeStyles({
  list: {
    display: "grid",
    gap: "16px",
    maxWidth: "100%",    // or your container limit
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
  },
  listItem: {
    maxWidth: "300px",
    display: "grid",
    padding: "8px",
  },
  caption: {
    color: tokens.colorNeutralForeground3,
  },
  image: {
    height: "160px",
    maxWidth: "100%",
    objectFit: "contain",
    borderRadius: "5px",
  },
  title: {
    color: tokens.colorNeutralForeground1,
    fontWeight: 600,
    display: "block",
  },
  checkmark: {
    position: "absolute",
    left: "10px",
    top: "10px",
    zIndex: 1,
  },
  preview: { gridArea: "preview", overflow: "hidden", width: "100%", maxWidth: "300px" },
  header: { gridArea: "header", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "100%" },
  action: { gridArea: "action" },
  tags: {
    gridArea: "tags",
  },
  secondaryAction: { gridArea: "secondary_action" },
});

function CustomListItem({ item }: {
  item: RepoFile; }) {

  const PLACEHOLDER_IMAGE = "https://fabricweb.azureedge.net/fabric-website/assets/images/wireframe/image.png"
  const listItemStyles = useListItemRootStyles();
  const styles = useStyles();
  const [svgText, setSvgText] = React.useState<string | null>(null);
  const [loaded, setLoading] = React.useState(false);
  const {setState: setError} = React.useContext(ErrorContext);

  React.useEffect(() => {
    setLoading(true);
    console.log("Fetching SVG from URL:", item.download_url);
    fetch(item.download_url)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch SVG");
        return res.text();
      })
      .then((text) => {
        setSvgText(text);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [item.download_url]);

  return (
    <ListItem
      value={item.name}
      className={mergeClasses(listItemStyles, styles.listItem)}
      // checkmark={{
      //   root: { role: "gridcell" },
      //   className: styles.checkmark,
      //   "aria-label": item.name,
      // }}
      aria-label={item.name}
    >
      <div role="gridcell" className={styles.preview}>
        <Image
          fit="contain"
          className={styles.image}
          src={loaded ? item.download_url : PLACEHOLDER_IMAGE}
          alt={item.name}
          onLoad={() => setLoading(true)}
        />
      </div>
      <div role="gridcell" className={styles.header}>
        <Text className={styles.title}>{item.name}</Text>
        <Caption1 className={styles.caption}>{item.path}</Caption1>
      </div>
      <div role="gridcell" className={styles.action}>
        <Button
          appearance="primary"
          aria-label="Install"
          onClick={(e) => {
            e.preventDefault();
            insertImage(svgText);
          }}
        >
          Insert
        </Button>
      </div>
      <div role="gridcell" className={styles.secondaryAction}>

        {/* <Menu>
          <MenuTrigger disableButtonEnhancement>
            <Button
              onClick={(e) => {
                e.preventDefault();
              }}
              appearance="transparent"
              icon={<MoreHorizontal20Regular />}
              aria-label="More actions"
            />
          </MenuTrigger>

          <MenuPopover>
            <MenuList>
              <MenuItem
                onClick={(e) => {
                  e.preventDefault();
                  alert("Clicked menu item");
                }}
              >
                About
              </MenuItem>
              <MenuItem
                onClick={(e) => {
                  e.preventDefault();
                  alert("Clicked menu item");
                }}
              >
                Uninstall
              </MenuItem>
              <MenuItem
                onClick={(e) => {
                  e.preventDefault();
                  alert("Clicked menu item");
                }}
              >
                Block
              </MenuItem>
            </MenuList>
          </MenuPopover>
        </Menu> */}
      </div>
      <div className={styles.tags} role="gridcell">
        <TagGroup aria-label="Simple tag group with Tag" role="list">
          {item.tags.map((tag, index) => (
            <Tag
              key={index}
              role="listitem"
              >{tag}</Tag>
          ))}
        </TagGroup>
      </div>
    </ListItem>
  );
};

export default function functionMultipleActionsSelection({}) {
  const classes = useStyles();

  const {state: files} = React.useContext(RepoContext);

  const [selectedItems, setSelectedItems] = React.useState<
    Array<string | number>
  >([]);

  return (
    <List
      className={classes.list}
      navigationMode="composite"
      // selectionMode="multiselect"
      selectedItems={selectedItems}
      onSelectionChange={(e, data) => setSelectedItems(data.selectedItems)}
    >
      {files.map((file) => (
        <CustomListItem
          key={file.path}
          item={file}
        />
      ))}
    </List>
  );
};