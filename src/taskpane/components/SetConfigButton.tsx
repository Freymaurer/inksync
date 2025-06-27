import * as React from "react";
import {
  Dialog,
  DialogTrigger,
  DialogSurface,
  DialogTitle,
  DialogContent,
  DialogBody,
  DialogActions,
  Button,
  Input,
  Label,
  makeStyles,
  ToolbarButton,
  Checkbox,
  Field,
  makeResetStyles,
  tokens,
  LabelProps,
  InfoLabel,
  Link,
  Text,
  MessageBar,
  MessageBarBody,
  MessageBarTitle
} from "@fluentui/react-components";
import { DeleteRegular, SettingsRegular } from "@fluentui/react-icons";
import { config } from "process";
import { ConfigContext } from "../context/Context";

const useStyles = makeStyles({
  content: {
    display: "flex",
    flexDirection: "column",
    rowGap: tokens.spacingVerticalL,
  },
});

const initConfig = {
  owner: '',
  repo: '',
  pat: '',
  store: false
}


export default function Default({}) {
  const styles = useStyles();

  const {state: config, setState: setConfig} = React.useContext(ConfigContext);

  const setOwner = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfig((prev) => ({ ...prev, owner: e.target.value }));
  };

  const setRepo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfig((prev) => ({ ...prev, repo: e.target.value }));
  }

  const setPAT = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfig((prev) => ({ ...prev, pat: e.target.value }));
  }

  const toggleStore = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Toggle store:", e.target.checked);
    setConfig((prev) => ({ ...prev, store: e.target.checked }));
  }

  const resetAll = () => {
    setConfig(initConfig);
    // update defaultValues in the form to reflect new state

  };

  const DEFAULT_PAT_PLACEHOLDER = "••••••••••••••••••••••";

  return (
    <Dialog modalType="non-modal">
      <DialogTrigger disableButtonEnhancement>
        <ToolbarButton icon={<SettingsRegular />} />
      </DialogTrigger>
      <DialogSurface>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            // handle submit logic here if needed
          }}
        >
          <DialogBody>
            <DialogTitle>GitHub Repo Config</DialogTitle>
            <DialogContent>
              <div className={styles.content}>
                <Field label="GitHub Owner" required>
                  <Input value={config.owner} onChange={setOwner} />
                </Field>

                <Field label="GitHub Repo" required>
                  <Input value={config.repo} onChange={setRepo} />
                </Field>

                <Field 
                  label={{
                    children: (_: unknown, props: LabelProps) => (
                      <InfoLabel {...props} info={
                            <>
                              <Text>A PAT is used to authenticate with GitHub. For best security:</Text>
                              <ul>
                                <li>Create a read-only token</li>
                                <li>Limit its access to only the repository you want to use</li>
                                <li>Avoid granting unnecessary scopes</li>
                              </ul>
                              <Text>Learn more in the <Link href="https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens">GitHub PAT documentation</Link></Text>.
                            </>
                          }>
                        GitHub PAT
                      </InfoLabel>
                    ),
                  }} 
                  required 
                  hint="Your PAT must have read access to the repo." >
                  <Input type="password" value={config.pat !== "" ? DEFAULT_PAT_PLACEHOLDER : ''} onChange={setPAT}/>
                </Field>  

                <Field hint={<>
                    <Text>Your PAT will be stored in your browser's local storage.</Text>
                    <MessageBar intent="warning">
                      <MessageBarBody>
                        <MessageBarTitle>Security</MessageBarTitle>
                        <Text>Storing your PAT in browser local storage may expose it to anyone with access to this device. Only enable on trusted, private devices and ensure read-only scopes for public/specific repos.</Text>
                      </MessageBarBody>
                    </MessageBar>
                  </>}>
                  <Checkbox label="Remember PAT" onChange={toggleStore} checked={config.store} />
                </Field>
              </div>
            </DialogContent>
            <DialogActions>
              <Button size="small" icon={<DeleteRegular />} onClick={() => setConfig(initConfig)}>
                Reset All
              </Button>
              <DialogTrigger disableButtonEnhancement>
                <Button appearance="primary">Close</Button>
              </DialogTrigger>
            </DialogActions>
          </DialogBody>
        </form>
      </DialogSurface>
    </Dialog>
  );
};