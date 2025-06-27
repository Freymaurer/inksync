import * as React from "react";
import { useState } from "react";
import { Button, Field, Text, tokens, makeStyles } from "@fluentui/react-components";
import { ConfigContext, ErrorContext, RepoContext, type RepoFile } from "../context/Context";
import {
  Dialog,
  DialogTrigger,
  DialogSurface,
  DialogTitle,
  DialogBody,
  DialogActions,
  DialogContent,
  Tooltip
} from "@fluentui/react-components";
import { Spinner } from "@fluentui/react-components";

/* global HTMLTextAreaElement */

const useStyles = makeStyles({
    container: {
    "> div": { padding: "20px" },
  },
});

interface FetchDataButtonProps {
    CustomButton?: React.FunctionComponent<{ onClick: () => void, disabled?: boolean }>;
}

function DisplayLoadingDialog({ loading, parsedFileCount }: { loading: boolean; parsedFileCount: number }) {
    const styles = useStyles();
    return (
        <Dialog open={loading}>
            <DialogSurface>
                <DialogBody>
                    <DialogTitle>Loading...</DialogTitle>
                    <DialogContent>
                        <div className={styles.container}>
                          <Spinner labelPosition="below" label={parsedFileCount + " files found"} />
                        </div>
                    </DialogContent>
                </DialogBody>
            </DialogSurface>
        </Dialog>
    );
}

export default function FetchDataButton({CustomButton}: FetchDataButtonProps) {

    const {setState: setFiles} = React.useContext(RepoContext);
    const {state: config} = React.useContext(ConfigContext);
    const [loading, setLoading] = useState(false);
    const [parsedFileCount, setParsedFilecount] = useState(0);
    const {setState: setError} = React.useContext(ErrorContext);
    const [visible, setVisible] = React.useState(false);

    function pathToTags(path) {
      const parts = path.split('/');
      // Remove the file name (last segment)
      return parts;
    }

    const fetchRepoTree = async (
        owner: string,
        repo: string,
        pat: string,
        path: string = '',
        depth: number = 0
    ): Promise<RepoFile[]> => {
        const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;
        const res = await fetch(url, {
            headers: {
                Authorization: `Bearer ${pat}`,
                Accept: 'application/vnd.github.v3+json',
            },
        });
        if (!res.ok) {
            throw new Error(`GitHub API error: ${res.status}`);
        }

        const data = await res.json();

        const files: RepoFile[] = [];

        for (const item of data) {
          if (item.type === 'dir') {
            const children = await fetchRepoTree(owner, repo, pat, item.path, depth + 1);
            files.push(...children);
          } else if (item.type === 'file') {
            // Only process SVG files
            if (!item.name.endsWith('.svg')) {
              continue;
            }
            const tags = pathToTags(path);
            files.push({
              name: item.name,
              path: item.path,
              download_url: item.download_url,
              tags,
            });
            setParsedFilecount((prevCount) => prevCount + 1);
          }
        }

        return files;
    };

    const handleFetchClick = async () => {
        setLoading(true);
        setFiles([]); // Clear previous files
        setParsedFilecount(0);
        try {
            if (!config.owner || !config.repo || !config.pat) {
                throw new Error('Repository configuration is incomplete. Please set owner, repo, and PAT.');
            }
            const files = await fetchRepoTree(config.owner, config.repo, config.pat);
            setFiles(files);
        } catch (err: any) {
            console.error('Error fetching repository tree:', err);
            setError(err.message || 'Failed to fetch');
        } finally {
            setLoading(false);
        }
    };

    const isDisabled = !config.owner || !config.repo || !config.pat;

    return (
        <Tooltip 
          content="Configure target repo before syncing images!" 
          relationship="label" 
          visible={visible && isDisabled}
          onVisibleChange={(_ev, data) => setVisible(data.visible)}>
            <div>
              {CustomButton ? (
                <CustomButton onClick={handleFetchClick} disabled={isDisabled} />
              ) : (
                <Button appearance="primary" onClick={handleFetchClick} disabled={isDisabled}>
                  Fetch Data
                </Button>
              )}
              <DisplayLoadingDialog loading={loading} parsedFileCount={parsedFileCount} />
            </div>
        </Tooltip>
    );
};