import { useState } from "react";
import { CameraPermissionStatus } from "react-native-vision-camera";
import * as ExpoMediaLibrary from "expo-media-library";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { Stack } from "expo-router";
import { Switch, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const ICON_SIZE = 26;

export default function permissionsScreen() {
  const [cameraPermissionStatus, setCameraPermissionStatus] =
    useState<CameraPermissionStatus>("not-determined");
  const [microphonePermissionStatus, setMicrophonePermissionStatus] =
    useState<CameraPermissionStatus>("not-determined");

  const [mediaLibraryPermission, requestMediaLibraryPermissions] =
    ExpoMediaLibrary.usePermissions();

  return (
    <>
      <Stack.Screen options={{ headerTitle: "Permissions" }} />
      <ThemedView className="flex-1 p-5">
        <ThemedText type="subtitle" className="text-center">
          Luna needs to access to a few permissions in order to work properly.
        </ThemedText>
        <View className="my-3" />

        <View className="flex-row items-center gap-1">
          <Ionicons
            name="lock-closed-outline"
            size={ICON_SIZE}
            color={"orange"}
          />
          <ThemedText className="text-[14px] font-bold tracking-widest">
            Required
          </ThemedText>
        </View>

        <View className="my-3" />

        <View className="flex-row items-center bg-[#ffffff20] rounded-[10px] p-3 mb-4 justify-between">
          <Ionicons name="camera-outline" size={ICON_SIZE} color={"gray"} />
          <View className="ml-4 flex-shrink">
            <ThemedText type="subtitle">Camera</ThemedText>
            <ThemedText>Used for taking Photos and Videos.</ThemedText>
          </View>
          <Switch
            trackColor={{ true: "orange" }}
            value={cameraPermissionStatus === "granted"}
            // onChange={}
          />
        </View>
        <View className="flex-row items-center bg-[#ffffff20] rounded-[10px] p-3 mb-4 justify-between">
          <Ionicons name="mic-circle-outline" size={ICON_SIZE} color={"gray"} />
          <View className="ml-2 flex-shrink">
            <ThemedText type="subtitle">Microphone</ThemedText>
            <ThemedText>Used for recording Video voice </ThemedText>
          </View>
          <Switch
            trackColor={{ true: "orange" }}
            value={microphonePermissionStatus === "granted"}
            // onChange={}
          />
        </View>
        <View className="flex-row items-center bg-[#ffffff20] rounded-[10px] p-3 justify-between">
          <Ionicons name="library-outline" size={ICON_SIZE} color={"gray"} />
          <View className="ml-5 flex-shrink">
            <ThemedText type="subtitle">Library</ThemedText>
            <ThemedText>Used for saving, viewing and more.</ThemedText>
          </View>
          <Switch
            trackColor={{ true: "orange" }}
            value={cameraPermissionStatus === "granted"}
            // onChange={}
          />
        </View>

        <View className="my-3" />
        <View className="my-3" />
        <View className="my-3" />

        <TouchableOpacity>
          <Ionicons
            name="arrow-forward-outline"
            color={"white"}
            size={ICON_SIZE}
          />
        </TouchableOpacity>
      </ThemedView>
    </>
  );
}
