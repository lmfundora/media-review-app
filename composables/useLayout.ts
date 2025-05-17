import type { LayoutKey } from "#build/types/layouts";

const layoutsMap = new Map([
  ["default", "default"],
  ["home", "dashboard"],
  ["auth", "auth"],
]);
export const useLayout = (key: string) => {
  return (layoutsMap.get(key) || "default") as MaybeRef<false | LayoutKey>;
};
