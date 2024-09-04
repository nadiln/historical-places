import { Text, TouchableOpacity, View } from "react-native";
import RemixIcon from "react-native-remix-icon";

type NavigationTopBarProps = {
  title?: string;
  showBackButton?: boolean;
  backAction?: () => void;
};
export default function NavigationTopBar({
  title,
  showBackButton = false,
  backAction,
}: NavigationTopBarProps) {
  return (
    <View className="flex-row items-start mx-5 mt-5 mb-3">
      {showBackButton && (
        <View className="flex-row items-center">
          <TouchableOpacity onPress={backAction}>
            <RemixIcon name="arrow-left-s-line" size={24} color="#000" />
          </TouchableOpacity>
        </View>
      )}
      <Text className="items-center ml-2 text-lg font-bold text-center ">{title}</Text>
    </View>
  );
}
