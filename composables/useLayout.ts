const layoutsMap = new Map([
  ["default", "default"],
  ["home", "home"],
]);
export const useLayout = (key: string) => {
  return (layoutsMap.get(key) || "default") as MaybeRef<false | "home">;
};
