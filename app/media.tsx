import Button from "@/components/Button";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { saveToLibraryAsync } from "expo-media-library";
import { Link, useLocalSearchParams, useRouter } from "expo-router";
import { Alert, Image } from "react-native";

export default function MediaScreen() {
  const { media, type } = useLocalSearchParams();
  const router = useRouter();

  return (
    <ThemedView className="flex-1 p-5">
      {type === "photo" ? (
        <Image
          source={{ uri: `file://${media}` }}
          className="w-full h-[80%]"
          style={{ resizeMode: "contain" }}
        />
      ) : null}
      <Button
        title="Save to Gallery"
        containerStyle={{ alignSelf: "center" }}
        onPress={async () => {
          saveToLibraryAsync(media as string);
          Alert.alert("Saved to gallery!");
          router.back();
        }}
      />
      <Link href="/" className="mt-4 py-4 self-center">
        <ThemedText type="link">Delete and go back</ThemedText>
      </Link>
    </ThemedView>
  );
}
