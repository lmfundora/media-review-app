export const useLayout = (key: string) => {
  return layoutsMap.get(key) || layoutsMap.get("default");
};

const layoutsMap = new Map([
  ["default", "default"],
  ["home", "home"],
]);
