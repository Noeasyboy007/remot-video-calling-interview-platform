import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useUser } from "@clerk/nextjs";

export const useUserRole = () => {
  const { user } = useUser();

  const userData = useQuery(api.users.getUserByClerkId, {
    clerkId: user?.id || "",
  });

  const isLoading = userData === undefined;

  const isCandidate = userData?.role === "candidate";
  const isInterviewer = userData?.role === "interviewer";

  return { isCandidate, isInterviewer, isLoading };
};
