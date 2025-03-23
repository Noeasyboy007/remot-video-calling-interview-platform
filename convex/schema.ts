import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    clerkId: v.string(),
    name: v.string(),
    email: v.string(),
    phone: v.string(),
    image: v.optional(v.string()),
    role: v.union(v.literal("candidate"), v.literal("interviewer")),
  }).index("byClerkId", ["clerkId"]),
});
