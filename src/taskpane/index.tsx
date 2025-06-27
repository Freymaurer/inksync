import * as React from "react";
import { createRoot } from "react-dom/client";
import App from "./components/App";
import { FluentProvider, webLightTheme } from "@fluentui/react-components";

/* global document, Office, module, require, HTMLElement */

const rootElement: HTMLElement | null = document.getElementById("container");
const root = rootElement ? createRoot(rootElement) : undefined;

import "core-js/stable";
import "regenerator-runtime/runtime";
import ProviderErrorContext from "./context/ProviderErrorContext";
import ProviderRepoContext from "./context/ProviderRepoContext";
import ProviderConfigContext from "./context/ProviderConfigContext";

/* Render application after Office initializes */
Office.onReady(() => {
  root?.render(
    <FluentProvider theme={webLightTheme}>
      <ProviderErrorContext >
        <ProviderConfigContext>
          <ProviderRepoContext>
            <App />
          </ProviderRepoContext>
        </ProviderConfigContext>
      </ProviderErrorContext>
      {/* <div>Testing</div> */}
    </FluentProvider>
  );
});

if ((module as any).hot) {
  (module as any).hot.accept("./components/App", () => {
    const NextApp = require("./components/App").default;
    root?.render(NextApp);
  });
}
