import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Get all interviews
export const getAllInterviews = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthorized");
    }
    return ctx.db.query("interviews").collect();
  },
});

export const getMyInterviews = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return [];

    const interviews = await ctx.db
      .query("interviews")
      .withIndex("by_candidate_id", (q) =>
        q.eq("candidateId", identity.subject)
      )
      .collect();

    return interviews!;
  },
});

// Get an interview by ID
export const getInterviewById = query({
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthorized");
    }
    const interview = await ctx.db
      .query("interviews")
      .withIndex("by_candidate_id", (q) =>
        q.eq("candidateId", identity.subject)
      )
      .collect();

    return interview;
  },
});

// get all interviews by stream call id
export const getInterviewsByStreamCallId = query({
  args: {
    streamCallId: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("interviews")
      .withIndex("by_stream_call_id", (q) =>
        q.eq("streamCallId", args.streamCallId)
      )
      .first();
  },
});

// create an interview
export const createInterview = mutation({
  args: {
    title: v.string(),
    description: v.optional(v.string()),
    startTime: v.number(),
    endTime: v.optional(v.number()),
    status: v.string(),
    streamCallId: v.string(),
    candidateId: v.string(),
    interviewerIds: v.array(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthorized");
    }
    return await ctx.db.insert("interviews", {
      ...args,
    });
  },
});

// update an interview status
export const updateInterviewStatus = mutation({
  args: {
    id: v.id("interviews"),
    status: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.patch(args.id, {
      status: args.status,
      ...(args.status === "completed" ? { endTime: Date.now() } : {}),
    });
  },
});
