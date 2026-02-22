import { supabase } from "@/lib/supabase";
import { useAuth } from "@/providers/auth-provider";
import { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { toast } from "sonner-native";

export default function Watchlist() {
  const { session } = useAuth();
  const [userData, setUserData] = useState<{
    firstName: string;
    lastName: string;
  } | null>();
  const [isError, setIsError] = useState(false);

  const handleLogOut = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.log("Error while logging out: ", error);
      toast.error(error.message);
    }

    toast.info("Logged out!");
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!session) return;
      const { data, error } = await supabase
        .from("profiles")
        .select()
        .eq("user_id", session?.user.id);

      if (error) {
        console.log(error);
        setIsError(true);
        return;
      }

      setUserData({
        firstName: data[0].first_name,
        lastName: data[0].last_name,
      });
    };

    fetchData();
  }, [session]);

  return (
    <View className="flex-1 items-center bg-neutral-950 px-8 pt-12">
      {isError ? (
        <Text className="max-w-full text-xl font-semibold text-white">
          Oops! Something went wrong, please try again later :(
        </Text>
      ) : (
        <View className="w-full flex-row items-center justify-between">
          <View>
            <Text className="text-xl font-semibold text-white">
              {userData?.firstName} {userData?.lastName}
            </Text>
            <Text className="text-neutral-400">{session?.user.email}</Text>
          </View>
          <Pressable
            onPress={handleLogOut}
            className="rounded-lg bg-red-500/20 px-4 py-2"
          >
            <Text className="text-red-500">Log Out</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}
