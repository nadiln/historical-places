import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type ScreenSurfaceProps = React.PropsWithChildren<{}>;

export default function ScreenSurface({ children }: ScreenSurfaceProps) {
  const { top, bottom, left, right } = useSafeAreaInsets();
  return (
    <View
      style={{ marginTop: top, marginBottom: bottom, marginLeft: left, marginRight: right }}
      className="flex-1">
      {children}
    </View>
  );
}
