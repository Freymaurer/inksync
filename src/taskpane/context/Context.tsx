import { createContext } from 'react';


type ContextState<T> = {
  state: T;
  setState: React.Dispatch<React.SetStateAction<T>>;
}

export type RepoFile = {
  name: string;
  path: string;
  download_url: string;
  tags: string[];
}

export type RepoContextType = ContextState<RepoFile []>;

// export type CachedFile = {
//   data: string; // raw file contents
//   fetchedAt: string; // ISO string
// };

// export type FileCache = {
//   [path: string]: CachedFile;
// };

// export type FileCacheContextType = {
//   cache: FileCache;
//   getFile: (path: string) => Promise<CachedFile>;
// };

export const RepoContext = createContext<RepoContextType>({ state: [], setState: () => {} });

// export const FileCacheContext = createContext<FileCacheContextType>({
//   cache: {},
//   getFile: async () => (console.error('getFile not implemented'), { data: '', fetchedAt: '' }),
// });

export const ErrorContext = createContext<ContextState<string | null>>({
  state: null,
  setState: () => {},
});

export type ConfigContextType = {
  owner: string,
  repo: string,
  pat: string
  store: boolean
}

export const ConfigContext = createContext<ContextState<ConfigContextType>>({
  state: {owner : '', repo: '', pat: '', store: false},
  setState: () => {},
});