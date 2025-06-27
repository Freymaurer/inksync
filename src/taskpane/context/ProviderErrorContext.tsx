import React from "react";
import { ErrorContext } from "./Context";
import { Button, Field, Text, tokens, makeStyles } from "@fluentui/react-components";
import {
  Dialog,
  DialogTrigger,
  DialogSurface,
  DialogTitle,
  DialogBody,
  DialogActions,
  DialogContent,
} from "@fluentui/react-components";
import { ErrorCircleRegular } from '@fluentui/react-icons';
import {
  MessageBar,
  MessageBarTitle,
  MessageBarBody,
  MessageBarIntent,
  Link,
} from "@fluentui/react-components";


function DisplayErrorDialog({ error, setError }: { error: string | null; setError: React.Dispatch<React.SetStateAction<string | null>> }) {
    return (
        <Dialog open={error !== null}>
            <DialogSurface>
                <DialogBody>
                    <DialogTitle>
                      Error
                    </DialogTitle>
                    <DialogContent>
                      <MessageBar key="main_error_msg" intent="error">
                        <MessageBarBody>
                          <MessageBarTitle>Error</MessageBarTitle>
                          {error}
                        </MessageBarBody>
                      </MessageBar>
                    </DialogContent>
                    <DialogActions>
                      <Button appearance="secondary" onClick={() => setError(null)}>Close</Button>
                    </DialogActions>
                </DialogBody>
            </DialogSurface>
        </Dialog>
    );
}

export default function RepoContextProvider({ children }: { children: React.ReactNode }) {
  const [error, setError] = React.useState<string | null>(null);

  return <ErrorContext.Provider 
      value={{
        state: error,
        setState: setError,
      }}>
    <DisplayErrorDialog error={error} setError={setError} />
    {children}
  </ErrorContext.Provider>;
}
