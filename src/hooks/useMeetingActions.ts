import { useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const useMeetingActions = () => {
  const router = useRouter();
  const client = useStreamVideoClient();

  //For creating a meeting
  const createInstantMeeting = async () => {
    if (!client) return;
    try {
      const id = crypto.randomUUID();
      const call = client?.call("default", id);

      await call.getOrCreate({
        data: {
          starts_at: new Date().toISOString(),
          custom: {
            description: "instant meeting",
          },
        },
      });

      router.push(`/meeting/${call.id}`);
      toast.success("Meeting created successfully");
    } catch (error) {
      console.log(error);
      toast.error("Failed to create meeting");
    }
  };

  //For joining a meeting
  const joinMeeting = async (meetingId: string) => {
    if (!client) return toast.error("Failed to join meeting please try again");
    try {
      const call = client?.call("default", meetingId);
      await call.join();
      router.push(`/meeting/${meetingId}`);
      toast.success("Meeting joined successfully");
    } catch (error) {
      console.log(error);
      toast.error("Failed to join meeting");
    }
  };

  return { createInstantMeeting, joinMeeting };
};

export default useMeetingActions;
