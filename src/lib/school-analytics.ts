import { supabase } from "./supabase";
import { differenceInDays, startOfDay, startOfWeek, subDays } from "date-fns";

export interface StudentAnalytics {
  studentId: string;
  studentName: string;
  totalSessions: number;
  totalMessages: number;
  totalMinutes: number;
  lastActive: Date | null;
  engagementScore: number;
  topSubjects: string[];
  isAtRisk: boolean;
}

export interface SchoolAnalytics {
  totalStudents: number;
  activeToday: number;
  activeThisWeek: number;
  totalSessions: number;
  totalMessages: number;
  avgSessionDuration: number;
  avgMessagesPerStudent: number;
  atRiskStudents: number;
  topSubjects: Array<{ subject: string; count: number; percentage: number }>;
  usageTrend: Array<{ date: string; sessions: number; messages: number }>;
}

export interface RiskIndicator {
  studentId: string;
  studentName: string;
  riskType: "inactive" | "struggling" | "excessive";
  daysSinceActivity: number;
  recommendation: string;
}

export const getSchoolAnalytics = async (schoolName: string): Promise<SchoolAnalytics> => {
  try {
    // Get all students for this school
    const { data: students, error: studentsError } = await supabase
      .from("student_signups")
      .select("id, full_name")
      .eq("school_name", schoolName);

    if (studentsError) throw studentsError;
    if (!students || students.length === 0) {
      return {
        totalStudents: 0,
        activeToday: 0,
        activeThisWeek: 0,
        totalSessions: 0,
        totalMessages: 0,
        avgSessionDuration: 0,
        avgMessagesPerStudent: 0,
        atRiskStudents: 0,
        topSubjects: [],
        usageTrend: [],
      };
    }

    const studentIds = students.map((s) => s.id);

    // Get all conversations for these students
    const { data: conversations, error: convError } = await supabase
      .from("chat_conversations")
      .select("*")
      .in("student_signup_id", studentIds);

    if (convError) throw convError;

    const conversationIds = conversations?.map((c) => c.id) || [];

    // Get all messages
    const { data: messages, error: messagesError } = await supabase
      .from("chat_messages")
      .select("*")
      .in("conversation_id", conversationIds);

    if (messagesError) throw messagesError;

    // Calculate metrics
    const now = new Date();
    const todayStart = startOfDay(now);
    const weekStart = startOfWeek(now);

    const activeToday = new Set(
      messages?.filter((m) => new Date(m.created_at) >= todayStart).map((m) => m.conversation_id)
    ).size;

    const activeThisWeek = new Set(
      messages?.filter((m) => new Date(m.created_at) >= weekStart).map((m) => m.conversation_id)
    ).size;

    // Subject distribution
    const subjectCounts: Record<string, number> = {};
    conversations?.forEach((c) => {
      subjectCounts[c.subject] = (subjectCounts[c.subject] || 0) + 1;
    });

    const topSubjects = Object.entries(subjectCounts)
      .map(([subject, count]) => ({
        subject,
        count,
        percentage: (count / (conversations?.length || 1)) * 100,
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    // At-risk students (no activity in 7+ days)
    const sevenDaysAgo = subDays(now, 7);
    const recentlyActive = new Set(
      messages?.filter((m) => new Date(m.created_at) >= sevenDaysAgo).map((m) => {
        const conv = conversations?.find((c) => c.id === m.conversation_id);
        return conv?.student_signup_id;
      })
    );
    const atRiskStudents = students.filter((s) => !recentlyActive.has(s.id)).length;

    // Usage trend (last 7 days)
    const usageTrend = [];
    for (let i = 6; i >= 0; i--) {
      const dayStart = startOfDay(subDays(now, i));
      const dayEnd = startOfDay(subDays(now, i - 1));
      
      const daySessions = conversations?.filter(
        (c) => new Date(c.created_at) >= dayStart && new Date(c.created_at) < dayEnd
      ).length || 0;

      const dayMessages = messages?.filter(
        (m) => new Date(m.created_at) >= dayStart && new Date(m.created_at) < dayEnd
      ).length || 0;

      usageTrend.push({
        date: dayStart.toLocaleDateString('en-ZA', { month: 'short', day: 'numeric' }),
        sessions: daySessions,
        messages: dayMessages,
      });
    }

    return {
      totalStudents: students.length,
      activeToday,
      activeThisWeek,
      totalSessions: conversations?.length || 0,
      totalMessages: messages?.length || 0,
      avgSessionDuration: conversations?.length
        ? Math.round((messages?.length || 0) / conversations.length)
        : 0,
      avgMessagesPerStudent: students.length
        ? Math.round((messages?.length || 0) / students.length)
        : 0,
      atRiskStudents,
      topSubjects,
      usageTrend,
    };
  } catch (error) {
    console.error("Error fetching school analytics:", error);
    throw error;
  }
};

export const getStudentAnalytics = async (studentIds: string[]): Promise<StudentAnalytics[]> => {
  try {
    if (studentIds.length === 0) return [];

    // Get student details
    const { data: students, error: studentsError } = await supabase
      .from("student_signups")
      .select("id, full_name")
      .in("id", studentIds);

    if (studentsError) throw studentsError;

    // Get conversations for these students
    const { data: conversations, error: convError } = await supabase
      .from("chat_conversations")
      .select("*")
      .in("student_signup_id", studentIds);

    if (convError) throw convError;

    const conversationIds = conversations?.map((c) => c.id) || [];

    // Get messages
    const { data: messages, error: messagesError } = await supabase
      .from("chat_messages")
      .select("*")
      .in("conversation_id", conversationIds);

    if (messagesError) throw messagesError;

    return (students || []).map((student) => {
      const studentConvs = conversations?.filter((c) => c.student_signup_id === student.id) || [];
      const studentConvIds = studentConvs.map((c) => c.id);
      const studentMessages = messages?.filter((m) => studentConvIds.includes(m.conversation_id)) || [];

      // Last active
      const lastMessage = studentMessages.sort(
        (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      )[0];
      const lastActive = lastMessage ? new Date(lastMessage.created_at) : null;

      // Top subjects
      const subjectCounts: Record<string, number> = {};
      studentConvs.forEach((c) => {
        subjectCounts[c.subject] = (subjectCounts[c.subject] || 0) + 1;
      });
      const topSubjects = Object.entries(subjectCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3)
        .map(([subject]) => subject);

      // Engagement score (0-100)
      const messageScore = Math.min(studentMessages.length * 2, 50);
      const sessionScore = Math.min(studentConvs.length * 5, 30);
      const recencyScore = lastActive
        ? Math.max(20 - differenceInDays(new Date(), lastActive) * 2, 0)
        : 0;
      const engagementScore = Math.min(messageScore + sessionScore + recencyScore, 100);

      // At-risk check (no activity in 7+ days OR very low engagement)
      const isAtRisk =
        !lastActive ||
        differenceInDays(new Date(), lastActive) > 7 ||
        engagementScore < 20;

      return {
        studentId: student.id,
        studentName: student.full_name,
        totalSessions: studentConvs.length,
        totalMessages: studentMessages.length,
        totalMinutes: Math.round(studentMessages.length * 1.5), // Rough estimate
        lastActive,
        engagementScore: Math.round(engagementScore),
        topSubjects,
        isAtRisk,
      };
    });
  } catch (error) {
    console.error("Error fetching student analytics:", error);
    throw error;
  }
};

export const getRiskIndicators = async (schoolName: string): Promise<RiskIndicator[]> => {
  try {
    // Get all students for this school
    const { data: students, error: studentsError } = await supabase
      .from("student_signups")
      .select("id, full_name")
      .eq("school_name", schoolName);

    if (studentsError) throw studentsError;
    if (!students) return [];

    const studentIds = students.map((s) => s.id);

    // Get conversations
    const { data: conversations, error: convError } = await supabase
      .from("chat_conversations")
      .select("*")
      .in("student_signup_id", studentIds);

    if (convError) throw convError;

    const conversationIds = conversations?.map((c) => c.id) || [];

    // Get messages
    const { data: messages, error: messagesError } = await supabase
      .from("chat_messages")
      .select("*")
      .in("conversation_id", conversationIds);

    if (messagesError) throw messagesError;

    const risks: RiskIndicator[] = [];
    const now = new Date();

    students.forEach((student) => {
      const studentConvs = conversations?.filter((c) => c.student_signup_id === student.id) || [];
      const studentConvIds = studentConvs.map((c) => c.id);
      const studentMessages = messages?.filter((m) => studentConvIds.includes(m.conversation_id)) || [];

      // Last active
      const lastMessage = studentMessages.sort(
        (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      )[0];
      const lastActive = lastMessage ? new Date(lastMessage.created_at) : null;
      const daysSinceActivity = lastActive ? differenceInDays(now, lastActive) : 999;

      // Inactive risk (no activity in 7+ days)
      if (daysSinceActivity >= 7) {
        risks.push({
          studentId: student.id,
          studentName: student.full_name,
          riskType: "inactive",
          daysSinceActivity,
          recommendation: `No AI tutoring activity for ${daysSinceActivity} days. Consider checking in with student or parent.`,
        });
      }

      // Struggling pattern (many sessions but low message count - giving up quickly)
      if (studentConvs.length > 5 && studentMessages.length / studentConvs.length < 3) {
        risks.push({
          studentId: student.id,
          studentName: student.full_name,
          riskType: "struggling",
          daysSinceActivity,
          recommendation: "Student starts many sessions but sends few messages. May be struggling with content or engagement.",
        });
      }

      // Excessive use (might indicate over-reliance)
      if (studentMessages.length > 200 && daysSinceActivity < 30) {
        risks.push({
          studentId: student.id,
          studentName: student.full_name,
          riskType: "excessive",
          daysSinceActivity,
          recommendation: "Very high usage detected. Monitor to ensure healthy learning patterns and not over-dependence.",
        });
      }
    });

    return risks;
  } catch (error) {
    console.error("Error fetching risk indicators:", error);
    throw error;
  }
};
