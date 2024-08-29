import { ThemedText } from "@/components/ThemedText";
import { Redirect, useRouter } from "expo-router";
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
} from "react-native-vision-camera";

export default function HomeScreen() {
  const { hasPermission } = useCameraPermission();
  const microphonePermission = Camera.getMicrophonePermissionStatus();
  const redirectToPermissions =
    !hasPermission || microphonePermission === "not-determined";

  const device = useCameraDevice("back");
  const router = useRouter();

  if (redirectToPermissions) return <Redirect href={"/permissions"} />;
  if (!device) return <></>;

  return <ThemedText>Hello World</ThemedText>;
}
