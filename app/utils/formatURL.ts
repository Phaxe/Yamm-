// utils/formatUrl.ts
export function removeHttpsPrefix(url: string): string {
    return url.replace(/^https?:\/\//, "");
  }