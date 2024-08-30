import Button from "@/components/Button";
import ExposureControls from "@/components/ExposureControls";
import { ThemedText } from "@/components/ThemedText";
import ZoomControls from "@/components/ZoomControls";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { Redirect, useRouter } from "expo-router";
import { useRef, useState } from "react";
import {
  Linking,
  Platform,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
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

  const [cameraPosition, setCameraPosition] = useState<"front" | "back">(
    "back"
  );

  const device = useCameraDevice(cameraPosition);

  const [showZoomControls, setShowZoomControls] = useState(false);
  const [showExposureControls, setShowExposureControls] = useState(false);

  const [zoom, setZoom] = useState(device?.neutralZoom);
  const [exposure, setExposure] = useState(0);
  const [flash, setFlash] = useState<"off" | "on">("off");
  const [torch, setTorch] = useState<"off" | "on">("off");
  const camera = useRef<Camera>(null);

  const router = useRouter();

  const takePicture = async () => {
    try {
      if (camera.current == null) throw new Error("Camera ref is null!");

      console.log("taking a picture...");
      const photo = await camera.current.takePhoto({
        flash: flash,
        enableShutterSound: false,
      });

      router.push({
        pathname: "/media",
        params: { media: photo.path, type: "photo" },
      });
    } catch (e) {
      console.log(e);
    }
  };

  if (redirectToPermissions) return <Redirect href={"/permissions"} />;
  if (!device) return <></>;

  return (
    <>
      <SafeAreaView className="flex-1">
        <View className="flex-[2] overflow-hidden rounded-xl">
          <Camera
            ref={camera}
            className="flex-1"
            device={device}
            isActive
            zoom={zoom}
            resizeMode="cover"
            exposure={exposure}
            torch={torch}
            video
            photo
          />
          <BlurView
            intensity={100}
            tint="systemThinMaterialDark"
            style={{
              flex: 1,
              position: "absolute",
              bottom: 0,
              right: 0,
              padding: 10,
            }}
            experimentalBlurMethod="dimezisBlurView"
          >
            <ThemedText style={{ color: "white" }}>
              Exposure: {exposure} | Zoom: x{zoom}
            </ThemedText>
          </BlurView>
        </View>

        {showZoomControls ? (
          <ZoomControls
            setZoom={setZoom}
            setShowZoomControls={setShowZoomControls}
            zoom={zoom ?? 1}
          />
        ) : showExposureControls ? (
          <ExposureControls
            setExposure={setExposure}
            setShowExposureControls={setShowExposureControls}
            exposure={exposure}
          />
        ) : (
          <View className="flex-1">
            {/* Top section */}
            <View className="flex-[0.7]">
              <ThemedText>Max FPS: {device.formats[0].maxFps}</ThemedText>
              <ThemedText>
                Width: {device.formats[0].photoWidth} Height:{" "}
                {device.formats[0].photoHeight}
              </ThemedText>
              <ThemedText>Camera: {device.name}</ThemedText>
            </View>

            {/* Middle section */}
            <View className="flex-[0.7] flex-row justify-evenly">
              <Button
                iconName={torch === "on" ? "flashlight" : "flashlight-outline"}
                onPress={() => setTorch((t) => (t === "off" ? "on" : "off"))}
                containerStyle={{ alignSelf: "center" }}
              />
              <Button
                iconName={
                  flash === "on" ? "flash-outline" : "flash-off-outline"
                }
                onPress={() => setFlash((f) => (f === "off" ? "on" : "off"))}
                containerStyle={{ alignSelf: "center" }}
              />
              <Button
                iconName="camera-reverse-outline"
                onPress={() =>
                  setCameraPosition((p) => (p === "back" ? "front" : "back"))
                }
                containerStyle={{ alignSelf: "center" }}
              />
              <Button
                iconName="image-outline"
                onPress={() => {
                  const link = Platform.select({
                    ios: "photos-redirect://",
                    android: "content://media/external/images/media",
                  });
                  Linking.openURL(link!);
                }}
                containerStyle={{ alignSelf: "center" }}
              />
              <Button
                iconName="settings-outline"
                onPress={() => router.push("/_sitemap")}
                containerStyle={{ alignSelf: "center" }}
              />
            </View>

            {/* Bottom section */}
            <View className="flex-[1.1] flex-row justify-evenly items-center">
              <Button
                iconSize={40}
                title="+/-"
                onPress={() => setShowZoomControls((s) => !s)}
                containerStyle={{ alignSelf: "center" }}
              />
              <TouchableHighlight onPress={takePicture}>
                <FontAwesome5 name="dot-circle" size={55} color={"white"} />
              </TouchableHighlight>
              <Button
                iconSize={40}
                title="1x"
                onPress={() => setShowExposureControls((s) => !s)}
                containerStyle={{ alignSelf: "center" }}
              />
            </View>
          </View>
        )}
      </SafeAreaView>
    </>
  );
}
