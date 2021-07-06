import { signOut } from "next-auth/client";
import { useEffect, useState } from "react";

export interface Options {
  path?: string;
  predicate?: boolean;
  purge?: boolean;
  initialValue?: any;
}

export default function useApi(api: string, options: Options = {}) {
  const [data, setData] = useState(options.initialValue);

  useEffect(() => {
    if (options.predicate ?? true) {
      fetch(`/api/${api}${options.path ? `/${options.path}` : ""}`)
        .then((res) => {
          switch (res.status) {
            case 200:
              return res.json();
            case 401:
              signOut();
              throw Error("Expired Credentials");
            default:
              throw Error(`Status: ${res.status}`);
          }
        })
        .catch((e) => console.error(e))
        .then((res) => setData(res));
    } else if (options.purge) {
      setData(options.initialValue)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [api, options.path, options.predicate, options.purge]);

  return data;
}
