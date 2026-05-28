"use client";

import { greetFromBrowserUtils } from "@beratiyilik/browser-utils";

export type BrowserInfoProps = {
  name: string;
};

export const BrowserInfo = ({ name }: BrowserInfoProps) => {
  return <div>{greetFromBrowserUtils(name)}</div>;
};
