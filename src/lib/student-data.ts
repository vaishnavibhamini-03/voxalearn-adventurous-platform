import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";

export type StudentProfile = {
  id: string;
  full_name: string;
  username: string;
  email: string;
  avatar_url: string | null;
  xp: number;
  created_at: string;
};

export type StudentProgress = {
  overall_progress: number;
  levels_completed: number;
};

export type LeaderboardRow = {
  rank: number;
  user_id: string;
  username: string;
  avatar_url: string | null;
  xp: number;
  achievement_count: number;
};

const FRIENDLY = "Unable to load your data right now. Please try again.";

export function useStudentProfile() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["student", "profile", user?.id],
    enabled: Boolean(user?.id),
    queryFn: async (): Promise<StudentProfile | null> => {
      const { data, error } = await supabase
        .from("profiles")
        .select("id, full_name, username, email, avatar_url, xp, created_at")
        .eq("id", user!.id)
        .maybeSingle();
      if (error) throw new Error(FRIENDLY);
      return data as StudentProfile | null;
    },
  });
}

export function useStudentProgress() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["student", "progress", user?.id],
    enabled: Boolean(user?.id),
    queryFn: async (): Promise<StudentProgress> => {
      const { data, error } = await supabase
        .from("student_progress")
        .select("overall_progress, levels_completed")
        .eq("student_id", user!.id)
        .maybeSingle();
      if (error) throw new Error(FRIENDLY);
      return data ?? { overall_progress: 0, levels_completed: 0 };
    },
  });
}

export function useStudentRewards() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["student", "rewards", user?.id],
    enabled: Boolean(user?.id),
    queryFn: async () => {
      const { data, error } = await supabase
        .from("rewards")
        .select("id, reward_name, description, earned_at")
        .eq("student_id", user!.id)
        .order("earned_at", { ascending: false });
      if (error) throw new Error(FRIENDLY);
      return data ?? [];
    },
  });
}

export function useStudentAchievements() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["student", "achievements", user?.id],
    enabled: Boolean(user?.id),
    queryFn: async () => {
      const { data, error } = await supabase
        .from("achievements")
        .select("id, achievement_name, description, earned_at")
        .eq("student_id", user!.id)
        .order("earned_at", { ascending: false });
      if (error) throw new Error(FRIENDLY);
      return data ?? [];
    },
  });
}

export function useLeaderboard() {
  const { isAuthenticated } = useAuth();
  return useQuery({
    queryKey: ["leaderboard"],
    enabled: isAuthenticated,
    queryFn: async (): Promise<LeaderboardRow[]> => {
      const { data, error } = await supabase.rpc("get_leaderboard", { _limit: 50 });
      if (error) throw new Error("Unable to load the leaderboard right now. Please try again.");
      return (data ?? []) as LeaderboardRow[];
    },
  });
}

export function useInvalidateStudent() {
  const queryClient = useQueryClient();
  return () => queryClient.invalidateQueries({ queryKey: ["student"] });
}
