import React from "react";
import { RepoContext, RepoFile } from "./Context";
import { useState } from "react";


export default function ProviderRepoContext({ children }: { children: React.ReactNode }) {
  const [files, setFiles] = React.useState<RepoFile[]>([]);

  return <RepoContext.Provider value={{ state: files, setState: setFiles }}>{children}</RepoContext.Provider>;
}
