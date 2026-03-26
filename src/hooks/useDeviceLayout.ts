import { useWindowDimensions } from "react-native";

const TABLET_BREAKPOINT = 600;

export function useDeviceLayout() {
  const { width, height } = useWindowDimensions();
  const isTablet = height >= TABLET_BREAKPOINT;
  const isLandscape = width < height;
  console.log(width, height, isTablet, isLandscape, "<<<<<");
  return {
    isTablet,
    isPhone: !isTablet,
    isLandscape,
    // Tablet landscape = 4 cols, tablet portrait = 3 cols, phone = 2 cols
    catalogCols: isTablet ? (isLandscape ? 4 : 3) : 2,
    screenWidth: width,
    screenHeight: height,
  };
}
