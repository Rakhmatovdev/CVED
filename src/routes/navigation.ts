// src/routes/navigation.ts
import type { NavigateFunction } from "react-router";

let _navigate: NavigateFunction | null = null;

export function setNavigator(nav: NavigateFunction) {
  _navigate = nav;
}

export function navigate(path: string, options?: { replace?: boolean }) {
  if (_navigate) {
    _navigate(path, options ?? {});
  } else {
    console.error("navigate() called before navigator was set");
  }
}
