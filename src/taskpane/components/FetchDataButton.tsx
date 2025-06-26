import * as React from "react";
import { useState } from "react";
import { Button, Field, Textarea, tokens, makeStyles } from "@fluentui/react-components";

/* global HTMLTextAreaElement */

const useStyles = makeStyles({
    instructions: {
        fontWeight: tokens.fontWeightSemibold,
        marginTop: "20px",
        marginBottom: "10px",
    },
    textPromptAndInsertion: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    textAreaField: {
        marginLeft: "20px",
        marginTop: "30px",
        marginBottom: "20px",
        marginRight: "20px",
        maxWidth: "50%",
    },
});

const FetchDataButton: React.FC<{}> = () => {

    const READ_TOKEN = `placeholder`

    const [structure, setStructure] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const fetchRepoTree = async (
        owner: string,
        repo: string,
        path: string = '',
        depth: number = 0
    ): Promise<any[]> => {
        const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;
        console.log(`Fetching URL: ${url}`);
        const res = await fetch(url, {
            headers: {
                Authorization: `Bearer ${READ_TOKEN}`,
                Accept: 'application/vnd.github.v3+json',
            },
        });
        console.log(`Response status: ${res.status}`);
        if (!res.ok) {
            throw new Error(`GitHub API error: ${res.status}`);
        }
        console.log(`parsing json from response`);

        const data = await res.json();

        console.log(`Parsed data:`, data);

        const result = await Promise.all(
            data.map(async (item: any) => {
                if (item.type === 'dir') {
                    const children = await fetchRepoTree(owner, repo, item.path, depth + 1);
                    return { name: item.name, type: 'dir', children };
                } else {
                    return { name: item.name, type: 'file' };
                }
            })
        );

        return result;
    };

    const handleFetchClick = async () => {
        setLoading(true);
        setError('');
        try {
            const tree = await fetchRepoTree('freymaurer', 'svg-collection-poc');
            setStructure(tree);
        } catch (err: any) {
            console.error('Error fetching repository tree:', err);
            setError(err.message || 'Failed to fetch');
        } finally {
            setLoading(false);
        }
    };


    const styles = useStyles();


    const renderTree = (nodes: any[], indent = 0) => (
        <ul>
            {nodes.map((node, i) => (
                <li key={i} style={{ marginLeft: indent * 10 }}>
                    {node.type === 'dir' ? (
                        <>
                            📁 {node.name}
                            {renderTree(node.children, indent + 1)}
                        </>
                    ) : (
                        <>📄 {node.name}</>
                    )}
                </li>
            ))}
        </ul>
    );

    return (
        <div>
            <Button appearance="primary" disabled={false} size="large" onClick={handleFetchClick}>
                Fetch data
            </Button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {renderTree(structure)}
        </div>
    );
};


export default FetchDataButton;
