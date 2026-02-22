import { LabeledInput, ScreenHeading, StateButton } from "@/components";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/providers/auth-provider";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useState } from "react";
import { View } from "react-native";
import { toast } from "sonner-native";

export default function Onboarding() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoading, setIsloading] = useState(false);
  const { session } = useAuth();
  const router = useRouter();

  const handleSubmit = async () => {
    if (!firstName || !lastName) {
      toast.error("Please fill both input!");
      return;
    }

    setIsloading(true);
    const { error } = await supabase.from("profiles").upsert({
      user_id: session?.user.id,
      first_name: firstName,
      last_name: lastName,
    });
    setIsloading(false);

    if (error) {
      console.log("Failed to insert names: ", error);
      toast.error(error.message);
      return;
    }

    toast.success("Sign in Successfully!");
    router.replace("/(tabs)");
  };

  return (
    <View className="flex-1 items-center justify-center bg-black px-6">
      <Image
        source={require("../assets/logo.svg")}
        style={{ width: 42, height: 42, marginBottom: 32 }}
      />
      <View className="items-center gap-5">
        <ScreenHeading heading="Welcome Onboard" />
        <View className="items-center gap-4">
          <LabeledInput
            label="First Name"
            placeholder="Enter your first name"
            autoFocus
            value={firstName}
            setValue={setFirstName}
          />
          <LabeledInput
            label="Last Name"
            placeholder="Enter your last name"
            autoFocus={false}
            value={lastName}
            setValue={setLastName}
          />
        </View>
        <StateButton
          text="Submit"
          handlerFn={handleSubmit}
          isDisabled={!firstName || !lastName}
          isLoading={isLoading}
        />
      </View>
    </View>
  );
}
