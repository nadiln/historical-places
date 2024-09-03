import { Text, TouchableOpacity, View } from "react-native";
import RemixIcon from "react-native-remix-icon";

type NavigationTopBarProps = {
  title?: string;
  showBackButton?: boolean;
  backAction?: () => void;
};
export default function NavigationTopBar({ title, showBackButton = false }: NavigationTopBarProps) {
  return (
    <View className="mt-5 mb-3  items-center justify-center">
      {showBackButton && (
        <View className="flex-row items-center">
          <TouchableOpacity onPress={() => {}}>
            <RemixIcon name="arrow-left-s-line" size={24} color="#000" />
          </TouchableOpacity>
        </View>
      )}
      <Text className="ml-2 text-lg font-semibold font-bold items-center text-center ">
        {title}
      </Text>
    </View>
  );
}
