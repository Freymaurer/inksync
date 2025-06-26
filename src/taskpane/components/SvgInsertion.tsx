import * as React from "react";
import { useState } from "react";
import { Button, Field, Textarea, tokens, makeStyles } from "@fluentui/react-components";

/* global HTMLTextAreaElement */

interface SvgInsertionProps {
    insertSvg: () => Promise<void>;
}

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

const SvgInsertion: React.FC<SvgInsertionProps> = (props: SvgInsertionProps) => {

    const handleImageInsertion = async () => {
        await props.insertSvg();
    };

    const styles = useStyles();

    return (
        <div className={styles.textPromptAndInsertion}>
            <Button appearance="primary" disabled={false} size="large" onClick={handleImageInsertion}>
                Insert image
            </Button>
        </div>
    );
};

export default SvgInsertion;
