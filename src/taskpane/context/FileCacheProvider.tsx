import React, { createContext, useContext, useState } from 'react';
// import { type FileCache, type CachedFile, FileCacheContext } from './Context';


// export const FileCacheProvider = ({ children }: { children: React.ReactNode }) => {
//   const [cache, setCache] = useState<FileCache>({});

//   const getFile = async (path: string): Promise<CachedFile> => {
//     if (cache[path]) return cache[path];

//     const res = await fetch(`https://raw.githubusercontent.com/username/repo/main/${path}`);
//     const data = await res.text();
//     const fetched = { data, fetchedAt: new Date().toISOString() };

//     setCache(prev => ({ ...prev, [path]: fetched }));
//     return fetched;
//   };

//   return (
//     <FileCacheContext.Provider value={{ cache, getFile }}>
//       {children}
//     </FileCacheContext.Provider>
//   );
// };
