import React from "react";
import { ConfigContext, ConfigContextType } from "./Context";
import { useState } from "react";

// string literals for config and pat keys

const __KEY_CONFIG__ = 'inksync_config';
const __KEY_PAT__ = 'inksync_pat';

const initConfig = {
  owner: '',
  repo: '',
  pat: '',
  store: false
}

function withoutPAT(config: ConfigContextType): Omit<ConfigContextType, 'pat'> {
  const { pat, ...rest } = config;
  return rest;
}

// add error handling for encodePAT and decodePAT
function encodePAT(pat: string): string {
  try {
    return btoa(pat);
  } catch (error) {
    console.error("Error encoding PAT:", error);
    return '';
  }
}

export default function ProviderRepoContext({ children }: { children: React.ReactNode }) {
  const [config, setConfig] = React.useState<ConfigContextType>(initConfig);

  // Try get config from localStorage, if it exists
  React.useEffect(() => {
    const storedConfigValue = localStorage.getItem(__KEY_CONFIG__);
    const patValue = localStorage.getItem(__KEY_PAT__);
    let config = initConfig; 
    if (storedConfigValue) {
      const storedConfig: ConfigContextType = JSON.parse(storedConfigValue);
      config = {pat: '', ...withoutPAT(storedConfig)};
    }
    if (patValue && patValue.replace(/\s+/g, '') !== "") {
      config = {
        ...config, pat: atob(patValue)}
    }
    setConfig(config);
  }, []);

  // We store the config in local storage, only pat is stored in memory
  // if store is true, we can use localStorage to persist the pat
  React.useEffect(() => {
    const privacyConfig = withoutPAT(config);
    localStorage.setItem(__KEY_CONFIG__, JSON.stringify(privacyConfig));
    if (config.store && config.pat.replace(/\s+/g, '') !== "") {
      localStorage.setItem(__KEY_PAT__, encodePAT(config.pat));
    } else {
      localStorage.removeItem(__KEY_PAT__);
    }
  }, [config]);

  return <ConfigContext.Provider value={{ state: config, setState: setConfig }}>{children}</ConfigContext.Provider>;
}