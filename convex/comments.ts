import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Create a comment
export const createComment = mutation({
  args: {
    interviewId: v.id("interviews"),
    content: v.string(),
    rating: v.number(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthorized");
    }

    return ctx.db.insert("comments", {
      interviewId: args.interviewId,
      content: args.content,
      rating: args.rating,
      interviewerId: identity.subject,
    });
  },
});

// Get comments for an interview
export const getComments = query({
  args: {
    interviewId: v.id("interviews"),
  },
  handler: async (ctx, args) => {
    return ctx.db.query("comments")
    .withIndex("by_interview_id", (q) => q
    .eq("interviewId", args.interviewId))
    .collect();
  },
});

