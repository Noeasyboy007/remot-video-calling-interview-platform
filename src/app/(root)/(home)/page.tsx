"use client";
import { useState } from "react";
import { QUICK_ACTIONS } from "@/constants";
import { useUserRole } from "@/hooks/useUserRole";
import ActionCard from "@/components/actionCard/ActionCard";
import { useRouter } from "next/navigation";
import MeetingModal from "@/components/meetingModal/MeetingModal";
import { api } from "../../../../convex/_generated/api";
import { useQuery } from "convex/react";

export default function Home() {
  const { isInterviewer, isCandidate, isLoading } = useUserRole();
  const interviews = useQuery(api.interviews.getMyInterviews);

  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<"start" | "join">();

  const router = useRouter();

  const handleQuickAction = (title: string) => {
    switch (title) {
      case "New Call":
        setModalType("start");
        setShowModal(true);
        break;
      case "Join Interview":
        setModalType("join");
        setShowModal(true);
        break;
      default:
        router.push(`/${title.toLowerCase()}`);
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="container max-w-7xl mx-auto p-6">
      {/* WELCOME SECTION */}
      <div className="rounded-lg bg-card p-6 border shadow-sm mb-10">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-indigo-400 bg-clip-text text-transparent">
          Welcome back!
        </h1>

        <p className="text-muted-foreground mt-2 mb-3">
          {isInterviewer
            ? "Manage your interviews and review candidates effectively"
            : "Access your upcoming interviews and preparations"}
        </p>

        {isInterviewer ? (
          <>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {QUICK_ACTIONS.map((action) => (
                <ActionCard
                  key={action.title}
                  action={action}
                  onClick={() => handleQuickAction(action.title)}
                />
              ))}

              <MeetingModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                title={modalType === "join" ? "Join Meeting" : "Start Meeting"}
                isJoinMeeting={modalType === "join"}
              />
            </div>
          </>
        ) : (
          <>
            <div>candidate views goes here</div>
          </>
        )}
      </div>
    </div>
  );
}
