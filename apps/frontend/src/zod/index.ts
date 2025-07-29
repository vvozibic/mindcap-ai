import { z } from 'zod';
import type { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const AdminUserScalarFieldEnumSchema = z.enum(['id','username','password','role','createdAt','updatedAt']);

export const UserScalarFieldEnumSchema = z.enum(['id','createdAt','updatedAt','username','avatarUrl','platform','email','twitterHandle','referralCode','referredById','onboardingStep','completedTasks','earnedPoints','kolId','primaryWalletId']);

export const WalletScalarFieldEnumSchema = z.enum(['id','address','chain','userId','verified','label','createdAt']);

export const NarrativeScalarFieldEnumSchema = z.enum(['id','narrativeId','name','slug','description','projectCount','totalViews','totalPosts','totalMarketCapUsd','marketCapChange24h','marketCapChange7d','marketCapChange30d','marketCapChange90d','mindsharePercent','mindshareChange24h','mindshareChange7d','mindshareChange30d','mindshareChange90d','createdAt','updatedAt','fetchedAt']);

export const NarrativeSnapshotScalarFieldEnumSchema = z.enum(['id','narrativeId','projectCount','totalViews','totalPosts','totalMarketCapUsd','marketCapChange24h','marketCapChange7d','marketCapChange30d','marketCapChange90d','mindsharePercent','mindshareChange24h','mindshareChange7d','mindshareChange30d','mindshareChange90d','source','updatedBy','fetchedDate']);

export const ProjectScalarFieldEnumSchema = z.enum(['id','stage','featured','hidden','mindshare','twitterId','twitterUsername','twitterDisplayName','twitterAvatarUrl','twitterDescription','twitterDescriptionLink','twitterFollowersCount','twitterFollowingCount','twitterIsVerified','twitterGoldBadge','twitterLang','twitterCreatedAt','coinSymbol','coinMarketCap','coinPrice','coinContractAddress','coinName','coinImageUrl','createdAt','updatedAt','fetchedAt']);

export const ProjectSnapshotScalarFieldEnumSchema = z.enum(['id','totalViews','totalPosts','mindsharePercent','mindshareChange24h','mindshareChange7d','mindshareChange30d','mindshareChange90d','source','updatedBy','fetchedDate','projectId','narrativeId']);

export const ProjectToNarrativeScalarFieldEnumSchema = z.enum(['id','narrativeId','projectId','totalViews','totalPosts','mindsharePercent','mindshareChange24h','mindshareChange7d','mindshareChange30d','mindshareChange90d','createdAt']);

export const KOLScalarFieldEnumSchema = z.enum(['id','hidden','isAlsoProject','twitterId','twitterUsername','twitterDisplayName','twitterAvatarUrl','twitterDescription','twitterDescriptionLink','twitterFollowersCount','twitterFollowingCount','twitterIsVerified','twitterGoldBadge','twitterLang','twitterCreatedAt','kolScore','kolScorePercentFromTotal','smartFollowersCount','threadsCount','engagementRate','smartEngagement','avgViews','avgLikes','totalPosts','totalViews','totalInteractions','totalOrganicPosts','totalOrganicViews','totalOrganicInteractions','totalAccountPosts','totalAccountViews','totalAccountInteractions','totalAccountComments','totalAccountLikes','totalAccountRetweets','totalAccountReplies','totalPostsChange','totalInteractionsChange','totalViewsChange','followersChange','smartEngagementChange','createdAt','updatedAt','fetchedAt']);

export const KOLSnapshotScalarFieldEnumSchema = z.enum(['id','kolId','kolScore','smartFollowersCount','threadsCount','engagementRate','smartEngagement','avgViews','avgLikes','totalPosts','totalViews','totalInteractions','totalOrganicPosts','totalOrganicViews','totalOrganicInteractions','totalAccountPosts','totalAccountViews','totalAccountInteractions','totalAccountComments','totalAccountLikes','totalAccountRetweets','totalAccountReplies','totalPostsChange','totalInteractionsChange','totalViewsChange','followersChange','smartEngagementChange','fetchedDate']);

export const KOLToProjectScalarFieldEnumSchema = z.enum(['id','kolId','projectId','totalPosts','totalViews','totalInteractions','totalComments','qualityScore','proofOfWork','mindoMetric','createdAt','updatedAt','fetchedAt']);

export const RewardPoolScalarFieldEnumSchema = z.enum(['id','title','description','reward','rewardRate','rewardUnit','deadline','platforms','status','totalAmountUsd','paidOutUsd','campaignTargetViews','participantsCount','completedCount','requirements','projectId']);

export const LogScalarFieldEnumSchema = z.enum(['id','level','message','url','timestamp']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const QueryModeSchema = z.enum(['default','insensitive']);

export const NullsOrderSchema = z.enum(['first','last']);

export const RewardPoolStatusSchema = z.enum(['active','upcoming','closed']);

export type RewardPoolStatusType = `${z.infer<typeof RewardPoolStatusSchema>}`

/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// ADMIN USER SCHEMA
/////////////////////////////////////////

export const AdminUserSchema = z.object({
  id: z.number().int(),
  username: z.string(),
  password: z.string(),
  role: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type AdminUser = z.infer<typeof AdminUserSchema>

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  id: z.number().int(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  username: z.string().nullable(),
  avatarUrl: z.string().nullable(),
  platform: z.string(),
  email: z.string().nullable(),
  twitterHandle: z.string().nullable(),
  referralCode: z.string().cuid(),
  referredById: z.number().int().nullable(),
  onboardingStep: z.number().int(),
  completedTasks: z.number().int(),
  earnedPoints: z.number().int(),
  kolId: z.string().nullable(),
  primaryWalletId: z.number().int().nullable(),
})

export type User = z.infer<typeof UserSchema>

/////////////////////////////////////////
// WALLET SCHEMA
/////////////////////////////////////////

export const WalletSchema = z.object({
  id: z.number().int(),
  address: z.string(),
  chain: z.string(),
  userId: z.number().int(),
  verified: z.boolean(),
  label: z.string().nullable(),
  createdAt: z.coerce.date(),
})

export type Wallet = z.infer<typeof WalletSchema>

/////////////////////////////////////////
// NARRATIVE SCHEMA
/////////////////////////////////////////

export const NarrativeSchema = z.object({
  id: z.string().cuid(),
  narrativeId: z.string(),
  name: z.string(),
  slug: z.string(),
  description: z.string().nullable(),
  projectCount: z.number().int(),
  totalViews: z.number(),
  totalPosts: z.number().int(),
  totalMarketCapUsd: z.number(),
  marketCapChange24h: z.number(),
  marketCapChange7d: z.number(),
  marketCapChange30d: z.number(),
  marketCapChange90d: z.number(),
  mindsharePercent: z.number(),
  mindshareChange24h: z.number(),
  mindshareChange7d: z.number(),
  mindshareChange30d: z.number(),
  mindshareChange90d: z.number(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  fetchedAt: z.coerce.date(),
})

export type Narrative = z.infer<typeof NarrativeSchema>

/////////////////////////////////////////
// NARRATIVE SNAPSHOT SCHEMA
/////////////////////////////////////////

export const NarrativeSnapshotSchema = z.object({
  id: z.string().cuid(),
  narrativeId: z.string(),
  projectCount: z.number().int(),
  totalViews: z.number(),
  totalPosts: z.number().int(),
  totalMarketCapUsd: z.number(),
  marketCapChange24h: z.number(),
  marketCapChange7d: z.number(),
  marketCapChange30d: z.number(),
  marketCapChange90d: z.number(),
  mindsharePercent: z.number(),
  mindshareChange24h: z.number(),
  mindshareChange7d: z.number(),
  mindshareChange30d: z.number(),
  mindshareChange90d: z.number(),
  source: z.string(),
  updatedBy: z.string(),
  fetchedDate: z.string(),
})

export type NarrativeSnapshot = z.infer<typeof NarrativeSnapshotSchema>

/////////////////////////////////////////
// PROJECT SCHEMA
/////////////////////////////////////////

export const ProjectSchema = z.object({
  id: z.string(),
  stage: z.string().nullable(),
  featured: z.boolean(),
  hidden: z.boolean(),
  mindshare: z.number(),
  twitterId: z.string(),
  twitterUsername: z.string(),
  twitterDisplayName: z.string(),
  twitterAvatarUrl: z.string(),
  twitterDescription: z.string(),
  twitterDescriptionLink: z.string().nullable(),
  twitterFollowersCount: z.number().int(),
  twitterFollowingCount: z.number().int(),
  twitterIsVerified: z.boolean(),
  twitterGoldBadge: z.boolean().nullable(),
  twitterLang: z.string(),
  twitterCreatedAt: z.coerce.date(),
  coinSymbol: z.string(),
  coinMarketCap: z.number(),
  coinPrice: z.number(),
  coinContractAddress: z.string().nullable(),
  coinName: z.string(),
  coinImageUrl: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  fetchedAt: z.coerce.date(),
})

export type Project = z.infer<typeof ProjectSchema>

/////////////////////////////////////////
// PROJECT SNAPSHOT SCHEMA
/////////////////////////////////////////

export const ProjectSnapshotSchema = z.object({
  id: z.string().cuid(),
  totalViews: z.number().int(),
  totalPosts: z.number().int(),
  mindsharePercent: z.number(),
  mindshareChange24h: z.number(),
  mindshareChange7d: z.number(),
  mindshareChange30d: z.number(),
  mindshareChange90d: z.number(),
  source: z.string(),
  updatedBy: z.string(),
  fetchedDate: z.string(),
  projectId: z.string(),
  narrativeId: z.string().nullable(),
})

export type ProjectSnapshot = z.infer<typeof ProjectSnapshotSchema>

/////////////////////////////////////////
// PROJECT TO NARRATIVE SCHEMA
/////////////////////////////////////////

export const ProjectToNarrativeSchema = z.object({
  id: z.string(),
  narrativeId: z.string(),
  projectId: z.string(),
  totalViews: z.number().int(),
  totalPosts: z.number().int(),
  mindsharePercent: z.number(),
  mindshareChange24h: z.number(),
  mindshareChange7d: z.number(),
  mindshareChange30d: z.number(),
  mindshareChange90d: z.number(),
  createdAt: z.coerce.date(),
})

export type ProjectToNarrative = z.infer<typeof ProjectToNarrativeSchema>

/////////////////////////////////////////
// KOL SCHEMA
/////////////////////////////////////////

export const KOLSchema = z.object({
  id: z.string(),
  hidden: z.boolean(),
  isAlsoProject: z.boolean(),
  twitterId: z.string(),
  twitterUsername: z.string(),
  twitterDisplayName: z.string(),
  twitterAvatarUrl: z.string(),
  twitterDescription: z.string(),
  twitterDescriptionLink: z.string().nullable(),
  twitterFollowersCount: z.number().int(),
  twitterFollowingCount: z.number().int(),
  twitterIsVerified: z.boolean(),
  twitterGoldBadge: z.boolean().nullable(),
  twitterLang: z.string(),
  twitterCreatedAt: z.coerce.date(),
  kolScore: z.number().nullable(),
  kolScorePercentFromTotal: z.number().nullable(),
  smartFollowersCount: z.number().int().nullable(),
  threadsCount: z.number().int().nullable(),
  engagementRate: z.number().nullable(),
  smartEngagement: z.number().nullable(),
  avgViews: z.number().int().nullable(),
  avgLikes: z.number().int().nullable(),
  totalPosts: z.number().int().nullable(),
  totalViews: z.bigint().nullable(),
  totalInteractions: z.bigint().nullable(),
  totalOrganicPosts: z.number().int().nullable(),
  totalOrganicViews: z.bigint().nullable(),
  totalOrganicInteractions: z.bigint().nullable(),
  totalAccountPosts: z.number().int().nullable(),
  totalAccountViews: z.bigint().nullable(),
  totalAccountInteractions: z.bigint().nullable(),
  totalAccountComments: z.number().int().nullable(),
  totalAccountLikes: z.number().int().nullable(),
  totalAccountRetweets: z.number().int().nullable(),
  totalAccountReplies: z.number().int().nullable(),
  totalPostsChange: z.number().nullable(),
  totalInteractionsChange: z.number().nullable(),
  totalViewsChange: z.number().nullable(),
  followersChange: z.number().nullable(),
  smartEngagementChange: z.number().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  fetchedAt: z.coerce.date(),
})

export type KOL = z.infer<typeof KOLSchema>

/////////////////////////////////////////
// KOL SNAPSHOT SCHEMA
/////////////////////////////////////////

export const KOLSnapshotSchema = z.object({
  id: z.string().cuid(),
  kolId: z.string(),
  kolScore: z.number(),
  smartFollowersCount: z.number().int(),
  threadsCount: z.number().int(),
  engagementRate: z.number(),
  smartEngagement: z.number(),
  avgViews: z.number().int().nullable(),
  avgLikes: z.number().int().nullable(),
  totalPosts: z.number().int(),
  totalViews: z.bigint(),
  totalInteractions: z.bigint(),
  totalOrganicPosts: z.number().int(),
  totalOrganicViews: z.bigint(),
  totalOrganicInteractions: z.bigint(),
  totalAccountPosts: z.number().int(),
  totalAccountViews: z.bigint(),
  totalAccountInteractions: z.bigint(),
  totalAccountComments: z.number().int(),
  totalAccountLikes: z.number().int(),
  totalAccountRetweets: z.number().int(),
  totalAccountReplies: z.number().int(),
  totalPostsChange: z.number(),
  totalInteractionsChange: z.number(),
  totalViewsChange: z.number(),
  followersChange: z.number(),
  smartEngagementChange: z.number(),
  fetchedDate: z.string(),
})

export type KOLSnapshot = z.infer<typeof KOLSnapshotSchema>

/////////////////////////////////////////
// KOL TO PROJECT SCHEMA
/////////////////////////////////////////

export const KOLToProjectSchema = z.object({
  id: z.string().cuid(),
  kolId: z.string(),
  projectId: z.string(),
  totalPosts: z.number().int(),
  totalViews: z.bigint(),
  totalInteractions: z.bigint(),
  totalComments: z.bigint(),
  qualityScore: z.number().nullable(),
  proofOfWork: z.number().nullable(),
  mindoMetric: z.number().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  fetchedAt: z.coerce.date(),
})

export type KOLToProject = z.infer<typeof KOLToProjectSchema>

/////////////////////////////////////////
// REWARD POOL SCHEMA
/////////////////////////////////////////

export const RewardPoolSchema = z.object({
  status: RewardPoolStatusSchema,
  id: z.string().cuid(),
  title: z.string(),
  description: z.string(),
  reward: z.string(),
  rewardRate: z.number().nullable(),
  rewardUnit: z.string().nullable(),
  deadline: z.coerce.date(),
  platforms: z.string().array(),
  totalAmountUsd: z.number(),
  paidOutUsd: z.number(),
  campaignTargetViews: z.number().int(),
  participantsCount: z.number().int(),
  completedCount: z.number().int(),
  requirements: z.string().array(),
  projectId: z.string(),
})

export type RewardPool = z.infer<typeof RewardPoolSchema>

/////////////////////////////////////////
// LOG SCHEMA
/////////////////////////////////////////

export const LogSchema = z.object({
  id: z.string().cuid(),
  level: z.string(),
  message: z.string(),
  url: z.string().nullable(),
  timestamp: z.coerce.date(),
})

export type Log = z.infer<typeof LogSchema>

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// ADMIN USER
//------------------------------------------------------

export const AdminUserSelectSchema: z.ZodType<Prisma.AdminUserSelect> = z.object({
  id: z.boolean().optional(),
  username: z.boolean().optional(),
  password: z.boolean().optional(),
  role: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
}).strict()

// USER
//------------------------------------------------------

export const UserIncludeSchema: z.ZodType<Prisma.UserInclude> = z.object({
  referredBy: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  referrals: z.union([z.boolean(),z.lazy(() => UserFindManyArgsSchema)]).optional(),
  kol: z.union([z.boolean(),z.lazy(() => KOLArgsSchema)]).optional(),
  wallets: z.union([z.boolean(),z.lazy(() => WalletFindManyArgsSchema)]).optional(),
  primaryWallet: z.union([z.boolean(),z.lazy(() => WalletArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const UserArgsSchema: z.ZodType<Prisma.UserDefaultArgs> = z.object({
  select: z.lazy(() => UserSelectSchema).optional(),
  include: z.lazy(() => UserIncludeSchema).optional(),
}).strict();

export const UserCountOutputTypeArgsSchema: z.ZodType<Prisma.UserCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => UserCountOutputTypeSelectSchema).nullish(),
}).strict();

export const UserCountOutputTypeSelectSchema: z.ZodType<Prisma.UserCountOutputTypeSelect> = z.object({
  referrals: z.boolean().optional(),
  wallets: z.boolean().optional(),
}).strict();

export const UserSelectSchema: z.ZodType<Prisma.UserSelect> = z.object({
  id: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  username: z.boolean().optional(),
  avatarUrl: z.boolean().optional(),
  platform: z.boolean().optional(),
  email: z.boolean().optional(),
  twitterHandle: z.boolean().optional(),
  referralCode: z.boolean().optional(),
  referredById: z.boolean().optional(),
  onboardingStep: z.boolean().optional(),
  completedTasks: z.boolean().optional(),
  earnedPoints: z.boolean().optional(),
  kolId: z.boolean().optional(),
  primaryWalletId: z.boolean().optional(),
  referredBy: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  referrals: z.union([z.boolean(),z.lazy(() => UserFindManyArgsSchema)]).optional(),
  kol: z.union([z.boolean(),z.lazy(() => KOLArgsSchema)]).optional(),
  wallets: z.union([z.boolean(),z.lazy(() => WalletFindManyArgsSchema)]).optional(),
  primaryWallet: z.union([z.boolean(),z.lazy(() => WalletArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

// WALLET
//------------------------------------------------------

export const WalletIncludeSchema: z.ZodType<Prisma.WalletInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  primaryFor: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const WalletArgsSchema: z.ZodType<Prisma.WalletDefaultArgs> = z.object({
  select: z.lazy(() => WalletSelectSchema).optional(),
  include: z.lazy(() => WalletIncludeSchema).optional(),
}).strict();

export const WalletSelectSchema: z.ZodType<Prisma.WalletSelect> = z.object({
  id: z.boolean().optional(),
  address: z.boolean().optional(),
  chain: z.boolean().optional(),
  userId: z.boolean().optional(),
  verified: z.boolean().optional(),
  label: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  primaryFor: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

// NARRATIVE
//------------------------------------------------------

export const NarrativeIncludeSchema: z.ZodType<Prisma.NarrativeInclude> = z.object({
  projectLinks: z.union([z.boolean(),z.lazy(() => ProjectToNarrativeFindManyArgsSchema)]).optional(),
  narrativeSnapshot: z.union([z.boolean(),z.lazy(() => NarrativeSnapshotFindManyArgsSchema)]).optional(),
  projectSnapshot: z.union([z.boolean(),z.lazy(() => ProjectSnapshotFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => NarrativeCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const NarrativeArgsSchema: z.ZodType<Prisma.NarrativeDefaultArgs> = z.object({
  select: z.lazy(() => NarrativeSelectSchema).optional(),
  include: z.lazy(() => NarrativeIncludeSchema).optional(),
}).strict();

export const NarrativeCountOutputTypeArgsSchema: z.ZodType<Prisma.NarrativeCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => NarrativeCountOutputTypeSelectSchema).nullish(),
}).strict();

export const NarrativeCountOutputTypeSelectSchema: z.ZodType<Prisma.NarrativeCountOutputTypeSelect> = z.object({
  projectLinks: z.boolean().optional(),
  narrativeSnapshot: z.boolean().optional(),
  projectSnapshot: z.boolean().optional(),
}).strict();

export const NarrativeSelectSchema: z.ZodType<Prisma.NarrativeSelect> = z.object({
  id: z.boolean().optional(),
  narrativeId: z.boolean().optional(),
  name: z.boolean().optional(),
  slug: z.boolean().optional(),
  description: z.boolean().optional(),
  projectCount: z.boolean().optional(),
  totalViews: z.boolean().optional(),
  totalPosts: z.boolean().optional(),
  totalMarketCapUsd: z.boolean().optional(),
  marketCapChange24h: z.boolean().optional(),
  marketCapChange7d: z.boolean().optional(),
  marketCapChange30d: z.boolean().optional(),
  marketCapChange90d: z.boolean().optional(),
  mindsharePercent: z.boolean().optional(),
  mindshareChange24h: z.boolean().optional(),
  mindshareChange7d: z.boolean().optional(),
  mindshareChange30d: z.boolean().optional(),
  mindshareChange90d: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  fetchedAt: z.boolean().optional(),
  projectLinks: z.union([z.boolean(),z.lazy(() => ProjectToNarrativeFindManyArgsSchema)]).optional(),
  narrativeSnapshot: z.union([z.boolean(),z.lazy(() => NarrativeSnapshotFindManyArgsSchema)]).optional(),
  projectSnapshot: z.union([z.boolean(),z.lazy(() => ProjectSnapshotFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => NarrativeCountOutputTypeArgsSchema)]).optional(),
}).strict()

// NARRATIVE SNAPSHOT
//------------------------------------------------------

export const NarrativeSnapshotIncludeSchema: z.ZodType<Prisma.NarrativeSnapshotInclude> = z.object({
  narrative: z.union([z.boolean(),z.lazy(() => NarrativeArgsSchema)]).optional(),
}).strict()

export const NarrativeSnapshotArgsSchema: z.ZodType<Prisma.NarrativeSnapshotDefaultArgs> = z.object({
  select: z.lazy(() => NarrativeSnapshotSelectSchema).optional(),
  include: z.lazy(() => NarrativeSnapshotIncludeSchema).optional(),
}).strict();

export const NarrativeSnapshotSelectSchema: z.ZodType<Prisma.NarrativeSnapshotSelect> = z.object({
  id: z.boolean().optional(),
  narrativeId: z.boolean().optional(),
  projectCount: z.boolean().optional(),
  totalViews: z.boolean().optional(),
  totalPosts: z.boolean().optional(),
  totalMarketCapUsd: z.boolean().optional(),
  marketCapChange24h: z.boolean().optional(),
  marketCapChange7d: z.boolean().optional(),
  marketCapChange30d: z.boolean().optional(),
  marketCapChange90d: z.boolean().optional(),
  mindsharePercent: z.boolean().optional(),
  mindshareChange24h: z.boolean().optional(),
  mindshareChange7d: z.boolean().optional(),
  mindshareChange30d: z.boolean().optional(),
  mindshareChange90d: z.boolean().optional(),
  source: z.boolean().optional(),
  updatedBy: z.boolean().optional(),
  fetchedDate: z.boolean().optional(),
  narrative: z.union([z.boolean(),z.lazy(() => NarrativeArgsSchema)]).optional(),
}).strict()

// PROJECT
//------------------------------------------------------

export const ProjectIncludeSchema: z.ZodType<Prisma.ProjectInclude> = z.object({
  projectSnapshot: z.union([z.boolean(),z.lazy(() => ProjectSnapshotFindManyArgsSchema)]).optional(),
  narrativeLinks: z.union([z.boolean(),z.lazy(() => ProjectToNarrativeFindManyArgsSchema)]).optional(),
  rewardPools: z.union([z.boolean(),z.lazy(() => RewardPoolFindManyArgsSchema)]).optional(),
  kols: z.union([z.boolean(),z.lazy(() => KOLToProjectFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => ProjectCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const ProjectArgsSchema: z.ZodType<Prisma.ProjectDefaultArgs> = z.object({
  select: z.lazy(() => ProjectSelectSchema).optional(),
  include: z.lazy(() => ProjectIncludeSchema).optional(),
}).strict();

export const ProjectCountOutputTypeArgsSchema: z.ZodType<Prisma.ProjectCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => ProjectCountOutputTypeSelectSchema).nullish(),
}).strict();

export const ProjectCountOutputTypeSelectSchema: z.ZodType<Prisma.ProjectCountOutputTypeSelect> = z.object({
  projectSnapshot: z.boolean().optional(),
  narrativeLinks: z.boolean().optional(),
  rewardPools: z.boolean().optional(),
  kols: z.boolean().optional(),
}).strict();

export const ProjectSelectSchema: z.ZodType<Prisma.ProjectSelect> = z.object({
  id: z.boolean().optional(),
  stage: z.boolean().optional(),
  featured: z.boolean().optional(),
  hidden: z.boolean().optional(),
  mindshare: z.boolean().optional(),
  twitterId: z.boolean().optional(),
  twitterUsername: z.boolean().optional(),
  twitterDisplayName: z.boolean().optional(),
  twitterAvatarUrl: z.boolean().optional(),
  twitterDescription: z.boolean().optional(),
  twitterDescriptionLink: z.boolean().optional(),
  twitterFollowersCount: z.boolean().optional(),
  twitterFollowingCount: z.boolean().optional(),
  twitterIsVerified: z.boolean().optional(),
  twitterGoldBadge: z.boolean().optional(),
  twitterLang: z.boolean().optional(),
  twitterCreatedAt: z.boolean().optional(),
  coinSymbol: z.boolean().optional(),
  coinMarketCap: z.boolean().optional(),
  coinPrice: z.boolean().optional(),
  coinContractAddress: z.boolean().optional(),
  coinName: z.boolean().optional(),
  coinImageUrl: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  fetchedAt: z.boolean().optional(),
  projectSnapshot: z.union([z.boolean(),z.lazy(() => ProjectSnapshotFindManyArgsSchema)]).optional(),
  narrativeLinks: z.union([z.boolean(),z.lazy(() => ProjectToNarrativeFindManyArgsSchema)]).optional(),
  rewardPools: z.union([z.boolean(),z.lazy(() => RewardPoolFindManyArgsSchema)]).optional(),
  kols: z.union([z.boolean(),z.lazy(() => KOLToProjectFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => ProjectCountOutputTypeArgsSchema)]).optional(),
}).strict()

// PROJECT SNAPSHOT
//------------------------------------------------------

export const ProjectSnapshotIncludeSchema: z.ZodType<Prisma.ProjectSnapshotInclude> = z.object({
  project: z.union([z.boolean(),z.lazy(() => ProjectArgsSchema)]).optional(),
  narrative: z.union([z.boolean(),z.lazy(() => NarrativeArgsSchema)]).optional(),
}).strict()

export const ProjectSnapshotArgsSchema: z.ZodType<Prisma.ProjectSnapshotDefaultArgs> = z.object({
  select: z.lazy(() => ProjectSnapshotSelectSchema).optional(),
  include: z.lazy(() => ProjectSnapshotIncludeSchema).optional(),
}).strict();

export const ProjectSnapshotSelectSchema: z.ZodType<Prisma.ProjectSnapshotSelect> = z.object({
  id: z.boolean().optional(),
  totalViews: z.boolean().optional(),
  totalPosts: z.boolean().optional(),
  mindsharePercent: z.boolean().optional(),
  mindshareChange24h: z.boolean().optional(),
  mindshareChange7d: z.boolean().optional(),
  mindshareChange30d: z.boolean().optional(),
  mindshareChange90d: z.boolean().optional(),
  source: z.boolean().optional(),
  updatedBy: z.boolean().optional(),
  fetchedDate: z.boolean().optional(),
  projectId: z.boolean().optional(),
  narrativeId: z.boolean().optional(),
  project: z.union([z.boolean(),z.lazy(() => ProjectArgsSchema)]).optional(),
  narrative: z.union([z.boolean(),z.lazy(() => NarrativeArgsSchema)]).optional(),
}).strict()

// PROJECT TO NARRATIVE
//------------------------------------------------------

export const ProjectToNarrativeIncludeSchema: z.ZodType<Prisma.ProjectToNarrativeInclude> = z.object({
  narrative: z.union([z.boolean(),z.lazy(() => NarrativeArgsSchema)]).optional(),
  project: z.union([z.boolean(),z.lazy(() => ProjectArgsSchema)]).optional(),
}).strict()

export const ProjectToNarrativeArgsSchema: z.ZodType<Prisma.ProjectToNarrativeDefaultArgs> = z.object({
  select: z.lazy(() => ProjectToNarrativeSelectSchema).optional(),
  include: z.lazy(() => ProjectToNarrativeIncludeSchema).optional(),
}).strict();

export const ProjectToNarrativeSelectSchema: z.ZodType<Prisma.ProjectToNarrativeSelect> = z.object({
  id: z.boolean().optional(),
  narrativeId: z.boolean().optional(),
  projectId: z.boolean().optional(),
  totalViews: z.boolean().optional(),
  totalPosts: z.boolean().optional(),
  mindsharePercent: z.boolean().optional(),
  mindshareChange24h: z.boolean().optional(),
  mindshareChange7d: z.boolean().optional(),
  mindshareChange30d: z.boolean().optional(),
  mindshareChange90d: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  narrative: z.union([z.boolean(),z.lazy(() => NarrativeArgsSchema)]).optional(),
  project: z.union([z.boolean(),z.lazy(() => ProjectArgsSchema)]).optional(),
}).strict()

// KOL
//------------------------------------------------------

export const KOLIncludeSchema: z.ZodType<Prisma.KOLInclude> = z.object({
  projects: z.union([z.boolean(),z.lazy(() => KOLToProjectFindManyArgsSchema)]).optional(),
  kolSnapshot: z.union([z.boolean(),z.lazy(() => KOLSnapshotFindManyArgsSchema)]).optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => KOLCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const KOLArgsSchema: z.ZodType<Prisma.KOLDefaultArgs> = z.object({
  select: z.lazy(() => KOLSelectSchema).optional(),
  include: z.lazy(() => KOLIncludeSchema).optional(),
}).strict();

export const KOLCountOutputTypeArgsSchema: z.ZodType<Prisma.KOLCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => KOLCountOutputTypeSelectSchema).nullish(),
}).strict();

export const KOLCountOutputTypeSelectSchema: z.ZodType<Prisma.KOLCountOutputTypeSelect> = z.object({
  projects: z.boolean().optional(),
  kolSnapshot: z.boolean().optional(),
}).strict();

export const KOLSelectSchema: z.ZodType<Prisma.KOLSelect> = z.object({
  id: z.boolean().optional(),
  hidden: z.boolean().optional(),
  isAlsoProject: z.boolean().optional(),
  twitterId: z.boolean().optional(),
  twitterUsername: z.boolean().optional(),
  twitterDisplayName: z.boolean().optional(),
  twitterAvatarUrl: z.boolean().optional(),
  twitterDescription: z.boolean().optional(),
  twitterDescriptionLink: z.boolean().optional(),
  twitterFollowersCount: z.boolean().optional(),
  twitterFollowingCount: z.boolean().optional(),
  twitterIsVerified: z.boolean().optional(),
  twitterGoldBadge: z.boolean().optional(),
  twitterLang: z.boolean().optional(),
  twitterCreatedAt: z.boolean().optional(),
  kolScore: z.boolean().optional(),
  kolScorePercentFromTotal: z.boolean().optional(),
  smartFollowersCount: z.boolean().optional(),
  threadsCount: z.boolean().optional(),
  engagementRate: z.boolean().optional(),
  smartEngagement: z.boolean().optional(),
  avgViews: z.boolean().optional(),
  avgLikes: z.boolean().optional(),
  totalPosts: z.boolean().optional(),
  totalViews: z.boolean().optional(),
  totalInteractions: z.boolean().optional(),
  totalOrganicPosts: z.boolean().optional(),
  totalOrganicViews: z.boolean().optional(),
  totalOrganicInteractions: z.boolean().optional(),
  totalAccountPosts: z.boolean().optional(),
  totalAccountViews: z.boolean().optional(),
  totalAccountInteractions: z.boolean().optional(),
  totalAccountComments: z.boolean().optional(),
  totalAccountLikes: z.boolean().optional(),
  totalAccountRetweets: z.boolean().optional(),
  totalAccountReplies: z.boolean().optional(),
  totalPostsChange: z.boolean().optional(),
  totalInteractionsChange: z.boolean().optional(),
  totalViewsChange: z.boolean().optional(),
  followersChange: z.boolean().optional(),
  smartEngagementChange: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  fetchedAt: z.boolean().optional(),
  projects: z.union([z.boolean(),z.lazy(() => KOLToProjectFindManyArgsSchema)]).optional(),
  kolSnapshot: z.union([z.boolean(),z.lazy(() => KOLSnapshotFindManyArgsSchema)]).optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => KOLCountOutputTypeArgsSchema)]).optional(),
}).strict()

// KOL SNAPSHOT
//------------------------------------------------------

export const KOLSnapshotIncludeSchema: z.ZodType<Prisma.KOLSnapshotInclude> = z.object({
  kol: z.union([z.boolean(),z.lazy(() => KOLArgsSchema)]).optional(),
}).strict()

export const KOLSnapshotArgsSchema: z.ZodType<Prisma.KOLSnapshotDefaultArgs> = z.object({
  select: z.lazy(() => KOLSnapshotSelectSchema).optional(),
  include: z.lazy(() => KOLSnapshotIncludeSchema).optional(),
}).strict();

export const KOLSnapshotSelectSchema: z.ZodType<Prisma.KOLSnapshotSelect> = z.object({
  id: z.boolean().optional(),
  kolId: z.boolean().optional(),
  kolScore: z.boolean().optional(),
  smartFollowersCount: z.boolean().optional(),
  threadsCount: z.boolean().optional(),
  engagementRate: z.boolean().optional(),
  smartEngagement: z.boolean().optional(),
  avgViews: z.boolean().optional(),
  avgLikes: z.boolean().optional(),
  totalPosts: z.boolean().optional(),
  totalViews: z.boolean().optional(),
  totalInteractions: z.boolean().optional(),
  totalOrganicPosts: z.boolean().optional(),
  totalOrganicViews: z.boolean().optional(),
  totalOrganicInteractions: z.boolean().optional(),
  totalAccountPosts: z.boolean().optional(),
  totalAccountViews: z.boolean().optional(),
  totalAccountInteractions: z.boolean().optional(),
  totalAccountComments: z.boolean().optional(),
  totalAccountLikes: z.boolean().optional(),
  totalAccountRetweets: z.boolean().optional(),
  totalAccountReplies: z.boolean().optional(),
  totalPostsChange: z.boolean().optional(),
  totalInteractionsChange: z.boolean().optional(),
  totalViewsChange: z.boolean().optional(),
  followersChange: z.boolean().optional(),
  smartEngagementChange: z.boolean().optional(),
  fetchedDate: z.boolean().optional(),
  kol: z.union([z.boolean(),z.lazy(() => KOLArgsSchema)]).optional(),
}).strict()

// KOL TO PROJECT
//------------------------------------------------------

export const KOLToProjectIncludeSchema: z.ZodType<Prisma.KOLToProjectInclude> = z.object({
  kol: z.union([z.boolean(),z.lazy(() => KOLArgsSchema)]).optional(),
  project: z.union([z.boolean(),z.lazy(() => ProjectArgsSchema)]).optional(),
}).strict()

export const KOLToProjectArgsSchema: z.ZodType<Prisma.KOLToProjectDefaultArgs> = z.object({
  select: z.lazy(() => KOLToProjectSelectSchema).optional(),
  include: z.lazy(() => KOLToProjectIncludeSchema).optional(),
}).strict();

export const KOLToProjectSelectSchema: z.ZodType<Prisma.KOLToProjectSelect> = z.object({
  id: z.boolean().optional(),
  kolId: z.boolean().optional(),
  projectId: z.boolean().optional(),
  totalPosts: z.boolean().optional(),
  totalViews: z.boolean().optional(),
  totalInteractions: z.boolean().optional(),
  totalComments: z.boolean().optional(),
  qualityScore: z.boolean().optional(),
  proofOfWork: z.boolean().optional(),
  mindoMetric: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  fetchedAt: z.boolean().optional(),
  kol: z.union([z.boolean(),z.lazy(() => KOLArgsSchema)]).optional(),
  project: z.union([z.boolean(),z.lazy(() => ProjectArgsSchema)]).optional(),
}).strict()

// REWARD POOL
//------------------------------------------------------

export const RewardPoolIncludeSchema: z.ZodType<Prisma.RewardPoolInclude> = z.object({
  project: z.union([z.boolean(),z.lazy(() => ProjectArgsSchema)]).optional(),
}).strict()

export const RewardPoolArgsSchema: z.ZodType<Prisma.RewardPoolDefaultArgs> = z.object({
  select: z.lazy(() => RewardPoolSelectSchema).optional(),
  include: z.lazy(() => RewardPoolIncludeSchema).optional(),
}).strict();

export const RewardPoolSelectSchema: z.ZodType<Prisma.RewardPoolSelect> = z.object({
  id: z.boolean().optional(),
  title: z.boolean().optional(),
  description: z.boolean().optional(),
  reward: z.boolean().optional(),
  rewardRate: z.boolean().optional(),
  rewardUnit: z.boolean().optional(),
  deadline: z.boolean().optional(),
  platforms: z.boolean().optional(),
  status: z.boolean().optional(),
  totalAmountUsd: z.boolean().optional(),
  paidOutUsd: z.boolean().optional(),
  campaignTargetViews: z.boolean().optional(),
  participantsCount: z.boolean().optional(),
  completedCount: z.boolean().optional(),
  requirements: z.boolean().optional(),
  projectId: z.boolean().optional(),
  project: z.union([z.boolean(),z.lazy(() => ProjectArgsSchema)]).optional(),
}).strict()

// LOG
//------------------------------------------------------

export const LogSelectSchema: z.ZodType<Prisma.LogSelect> = z.object({
  id: z.boolean().optional(),
  level: z.boolean().optional(),
  message: z.boolean().optional(),
  url: z.boolean().optional(),
  timestamp: z.boolean().optional(),
}).strict()


/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const AdminUserWhereInputSchema: z.ZodType<Prisma.AdminUserWhereInput> = z.object({
  AND: z.union([ z.lazy(() => AdminUserWhereInputSchema),z.lazy(() => AdminUserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AdminUserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AdminUserWhereInputSchema),z.lazy(() => AdminUserWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  username: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  password: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  role: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const AdminUserOrderByWithRelationInputSchema: z.ZodType<Prisma.AdminUserOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  username: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AdminUserWhereUniqueInputSchema: z.ZodType<Prisma.AdminUserWhereUniqueInput> = z.union([
  z.object({
    id: z.number().int(),
    username: z.string()
  }),
  z.object({
    id: z.number().int(),
  }),
  z.object({
    username: z.string(),
  }),
])
.and(z.object({
  id: z.number().int().optional(),
  username: z.string().optional(),
  AND: z.union([ z.lazy(() => AdminUserWhereInputSchema),z.lazy(() => AdminUserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AdminUserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AdminUserWhereInputSchema),z.lazy(() => AdminUserWhereInputSchema).array() ]).optional(),
  password: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  role: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict());

export const AdminUserOrderByWithAggregationInputSchema: z.ZodType<Prisma.AdminUserOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  username: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => AdminUserCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => AdminUserAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => AdminUserMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => AdminUserMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => AdminUserSumOrderByAggregateInputSchema).optional()
}).strict();

export const AdminUserScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.AdminUserScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => AdminUserScalarWhereWithAggregatesInputSchema),z.lazy(() => AdminUserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => AdminUserScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AdminUserScalarWhereWithAggregatesInputSchema),z.lazy(() => AdminUserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  username: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  password: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  role: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const UserWhereInputSchema: z.ZodType<Prisma.UserWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  username: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  avatarUrl: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  platform: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  twitterHandle: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  referralCode: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  referredById: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  onboardingStep: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  completedTasks: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  earnedPoints: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  kolId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  primaryWalletId: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  referredBy: z.union([ z.lazy(() => UserNullableRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional().nullable(),
  referrals: z.lazy(() => UserListRelationFilterSchema).optional(),
  kol: z.union([ z.lazy(() => KOLNullableRelationFilterSchema),z.lazy(() => KOLWhereInputSchema) ]).optional().nullable(),
  wallets: z.lazy(() => WalletListRelationFilterSchema).optional(),
  primaryWallet: z.union([ z.lazy(() => WalletNullableRelationFilterSchema),z.lazy(() => WalletWhereInputSchema) ]).optional().nullable(),
}).strict();

export const UserOrderByWithRelationInputSchema: z.ZodType<Prisma.UserOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  username: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  avatarUrl: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  platform: z.lazy(() => SortOrderSchema).optional(),
  email: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  twitterHandle: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  referralCode: z.lazy(() => SortOrderSchema).optional(),
  referredById: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  onboardingStep: z.lazy(() => SortOrderSchema).optional(),
  completedTasks: z.lazy(() => SortOrderSchema).optional(),
  earnedPoints: z.lazy(() => SortOrderSchema).optional(),
  kolId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  primaryWalletId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  referredBy: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  referrals: z.lazy(() => UserOrderByRelationAggregateInputSchema).optional(),
  kol: z.lazy(() => KOLOrderByWithRelationInputSchema).optional(),
  wallets: z.lazy(() => WalletOrderByRelationAggregateInputSchema).optional(),
  primaryWallet: z.lazy(() => WalletOrderByWithRelationInputSchema).optional()
}).strict();

export const UserWhereUniqueInputSchema: z.ZodType<Prisma.UserWhereUniqueInput> = z.union([
  z.object({
    id: z.number().int(),
    username: z.string(),
    email: z.string(),
    twitterHandle: z.string(),
    referralCode: z.string().cuid(),
    kolId: z.string(),
    primaryWalletId: z.number().int()
  }),
  z.object({
    id: z.number().int(),
    username: z.string(),
    email: z.string(),
    twitterHandle: z.string(),
    referralCode: z.string().cuid(),
    kolId: z.string(),
  }),
  z.object({
    id: z.number().int(),
    username: z.string(),
    email: z.string(),
    twitterHandle: z.string(),
    referralCode: z.string().cuid(),
    primaryWalletId: z.number().int(),
  }),
  z.object({
    id: z.number().int(),
    username: z.string(),
    email: z.string(),
    twitterHandle: z.string(),
    referralCode: z.string().cuid(),
  }),
  z.object({
    id: z.number().int(),
    username: z.string(),
    email: z.string(),
    twitterHandle: z.string(),
    kolId: z.string(),
    primaryWalletId: z.number().int(),
  }),
  z.object({
    id: z.number().int(),
    username: z.string(),
    email: z.string(),
    twitterHandle: z.string(),
    kolId: z.string(),
  }),
  z.object({
    id: z.number().int(),
    username: z.string(),
    email: z.string(),
    twitterHandle: z.string(),
    primaryWalletId: z.number().int(),
  }),
  z.object({
    id: z.number().int(),
    username: z.string(),
    email: z.string(),
    twitterHandle: z.string(),
  }),
  z.object({
    id: z.number().int(),
    username: z.string(),
    email: z.string(),
    referralCode: z.string().cuid(),
    kolId: z.string(),
    primaryWalletId: z.number().int(),
  }),
  z.object({
    id: z.number().int(),
    username: z.string(),
    email: z.string(),
    referralCode: z.string().cuid(),
    kolId: z.string(),
  }),
  z.object({
    id: z.number().int(),
    username: z.string(),
    email: z.string(),
    referralCode: z.string().cuid(),
    primaryWalletId: z.number().int(),
  }),
  z.object({
    id: z.number().int(),
    username: z.string(),
    email: z.string(),
    referralCode: z.string().cuid(),
  }),
  z.object({
    id: z.number().int(),
    username: z.string(),
    email: z.string(),
    kolId: z.string(),
    primaryWalletId: z.number().int(),
  }),
  z.object({
    id: z.number().int(),
    username: z.string(),
    email: z.string(),
    kolId: z.string(),
  }),
  z.object({
    id: z.number().int(),
    username: z.string(),
    email: z.string(),
    primaryWalletId: z.number().int(),
  }),
  z.object({
    id: z.number().int(),
    username: z.string(),
    email: z.string(),
  }),
  z.object({
    id: z.number().int(),
    username: z.string(),
    twitterHandle: z.string(),
    referralCode: z.string().cuid(),
    kolId: z.string(),
    primaryWalletId: z.number().int(),
  }),
  z.object({
    id: z.number().int(),
    username: z.string(),
    twitterHandle: z.string(),
    referralCode: z.string().cuid(),
    kolId: z.string(),
  }),
  z.object({
    id: z.number().int(),
    username: z.string(),
    twitterHandle: z.string(),
    referralCode: z.string().cuid(),
    primaryWalletId: z.number().int(),
  }),
  z.object({
    id: z.number().int(),
    username: z.string(),
    twitterHandle: z.string(),
    referralCode: z.string().cuid(),
  }),
  z.object({
    id: z.number().int(),
    username: z.string(),
    twitterHandle: z.string(),
    kolId: z.string(),
    primaryWalletId: z.number().int(),
  }),
  z.object({
    id: z.number().int(),
    username: z.string(),
    twitterHandle: z.string(),
    kolId: z.string(),
  }),
  z.object({
    id: z.number().int(),
    username: z.string(),
    twitterHandle: z.string(),
    primaryWalletId: z.number().int(),
  }),
  z.object({
    id: z.number().int(),
    username: z.string(),
    twitterHandle: z.string(),
  }),
  z.object({
    id: z.number().int(),
    username: z.string(),
    referralCode: z.string().cuid(),
    kolId: z.string(),
    primaryWalletId: z.number().int(),
  }),
  z.object({
    id: z.number().int(),
    username: z.string(),
    referralCode: z.string().cuid(),
    kolId: z.string(),
  }),
  z.object({
    id: z.number().int(),
    username: z.string(),
    referralCode: z.string().cuid(),
    primaryWalletId: z.number().int(),
  }),
  z.object({
    id: z.number().int(),
    username: z.string(),
    referralCode: z.string().cuid(),
  }),
  z.object({
    id: z.number().int(),
    username: z.string(),
    kolId: z.string(),
    primaryWalletId: z.number().int(),
  }),
  z.object({
    id: z.number().int(),
    username: z.string(),
    kolId: z.string(),
  }),
  z.object({
    id: z.number().int(),
    username: z.string(),
    primaryWalletId: z.number().int(),
  }),
  z.object({
    id: z.number().int(),
    username: z.string(),
  }),
  z.object({
    id: z.number().int(),
    email: z.string(),
    twitterHandle: z.string(),
    referralCode: z.string().cuid(),
    kolId: z.string(),
    primaryWalletId: z.number().int(),
  }),
  z.object({
    id: z.number().int(),
    email: z.string(),
    twitterHandle: z.string(),
    referralCode: z.string().cuid(),
    kolId: z.string(),
  }),
  z.object({
    id: z.number().int(),
    email: z.string(),
    twitterHandle: z.string(),
    referralCode: z.string().cuid(),
    primaryWalletId: z.number().int(),
  }),
  z.object({
    id: z.number().int(),
    email: z.string(),
    twitterHandle: z.string(),
    referralCode: z.string().cuid(),
  }),
  z.object({
    id: z.number().int(),
    email: z.string(),
    twitterHandle: z.string(),
    kolId: z.string(),
    primaryWalletId: z.number().int(),
  }),
  z.object({
    id: z.number().int(),
    email: z.string(),
    twitterHandle: z.string(),
    kolId: z.string(),
  }),
  z.object({
    id: z.number().int(),
    email: z.string(),
    twitterHandle: z.string(),
    primaryWalletId: z.number().int(),
  }),
  z.object({
    id: z.number().int(),
    email: z.string(),
    twitterHandle: z.string(),
  }),
  z.object({
    id: z.number().int(),
    email: z.string(),
    referralCode: z.string().cuid(),
    kolId: z.string(),
    primaryWalletId: z.number().int(),
  }),
  z.object({
    id: z.number().int(),
    email: z.string(),
    referralCode: z.string().cuid(),
    kolId: z.string(),
  }),
  z.object({
    id: z.number().int(),
    email: z.string(),
    referralCode: z.string().cuid(),
    primaryWalletId: z.number().int(),
  }),
  z.object({
    id: z.number().int(),
    email: z.string(),
    referralCode: z.string().cuid(),
  }),
  z.object({
    id: z.number().int(),
    email: z.string(),
    kolId: z.string(),
    primaryWalletId: z.number().int(),
  }),
  z.object({
    id: z.number().int(),
    email: z.string(),
    kolId: z.string(),
  }),
  z.object({
    id: z.number().int(),
    email: z.string(),
    primaryWalletId: z.number().int(),
  }),
  z.object({
    id: z.number().int(),
    email: z.string(),
  }),
  z.object({
    id: z.number().int(),
    twitterHandle: z.string(),
    referralCode: z.string().cuid(),
    kolId: z.string(),
    primaryWalletId: z.number().int(),
  }),
  z.object({
    id: z.number().int(),
    twitterHandle: z.string(),
    referralCode: z.string().cuid(),
    kolId: z.string(),
  }),
  z.object({
    id: z.number().int(),
    twitterHandle: z.string(),
    referralCode: z.string().cuid(),
    primaryWalletId: z.number().int(),
  }),
  z.object({
    id: z.number().int(),
    twitterHandle: z.string(),
    referralCode: z.string().cuid(),
  }),
  z.object({
    id: z.number().int(),
    twitterHandle: z.string(),
    kolId: z.string(),
    primaryWalletId: z.number().int(),
  }),
  z.object({
    id: z.number().int(),
    twitterHandle: z.string(),
    kolId: z.string(),
  }),
  z.object({
    id: z.number().int(),
    twitterHandle: z.string(),
    primaryWalletId: z.number().int(),
  }),
  z.object({
    id: z.number().int(),
    twitterHandle: z.string(),
  }),
  z.object({
    id: z.number().int(),
    referralCode: z.string().cuid(),
    kolId: z.string(),
    primaryWalletId: z.number().int(),
  }),
  z.object({
    id: z.number().int(),
    referralCode: z.string().cuid(),
    kolId: z.string(),
  }),
  z.object({
    id: z.number().int(),
    referralCode: z.string().cuid(),
    primaryWalletId: z.number().int(),
  }),
  z.object({
    id: z.number().int(),
    referralCode: z.string().cuid(),
  }),
  z.object({
    id: z.number().int(),
    kolId: z.string(),
    primaryWalletId: z.number().int(),
  }),
  z.object({
    id: z.number().int(),
    kolId: z.string(),
  }),
  z.object({
    id: z.number().int(),
    primaryWalletId: z.number().int(),
  }),
  z.object({
    id: z.number().int(),
  }),
  z.object({
    username: z.string(),
    email: z.string(),
    twitterHandle: z.string(),
    referralCode: z.string().cuid(),
    kolId: z.string(),
    primaryWalletId: z.number().int(),
  }),
  z.object({
    username: z.string(),
    email: z.string(),
    twitterHandle: z.string(),
    referralCode: z.string().cuid(),
    kolId: z.string(),
  }),
  z.object({
    username: z.string(),
    email: z.string(),
    twitterHandle: z.string(),
    referralCode: z.string().cuid(),
    primaryWalletId: z.number().int(),
  }),
  z.object({
    username: z.string(),
    email: z.string(),
    twitterHandle: z.string(),
    referralCode: z.string().cuid(),
  }),
  z.object({
    username: z.string(),
    email: z.string(),
    twitterHandle: z.string(),
    kolId: z.string(),
    primaryWalletId: z.number().int(),
  }),
  z.object({
    username: z.string(),
    email: z.string(),
    twitterHandle: z.string(),
    kolId: z.string(),
  }),
  z.object({
    username: z.string(),
    email: z.string(),
    twitterHandle: z.string(),
    primaryWalletId: z.number().int(),
  }),
  z.object({
    username: z.string(),
    email: z.string(),
    twitterHandle: z.string(),
  }),
  z.object({
    username: z.string(),
    email: z.string(),
    referralCode: z.string().cuid(),
    kolId: z.string(),
    primaryWalletId: z.number().int(),
  }),
  z.object({
    username: z.string(),
    email: z.string(),
    referralCode: z.string().cuid(),
    kolId: z.string(),
  }),
  z.object({
    username: z.string(),
    email: z.string(),
    referralCode: z.string().cuid(),
    primaryWalletId: z.number().int(),
  }),
  z.object({
    username: z.string(),
    email: z.string(),
    referralCode: z.string().cuid(),
  }),
  z.object({
    username: z.string(),
    email: z.string(),
    kolId: z.string(),
    primaryWalletId: z.number().int(),
  }),
  z.object({
    username: z.string(),
    email: z.string(),
    kolId: z.string(),
  }),
  z.object({
    username: z.string(),
    email: z.string(),
    primaryWalletId: z.number().int(),
  }),
  z.object({
    username: z.string(),
    email: z.string(),
  }),
  z.object({
    username: z.string(),
    twitterHandle: z.string(),
    referralCode: z.string().cuid(),
    kolId: z.string(),
    primaryWalletId: z.number().int(),
  }),
  z.object({
    username: z.string(),
    twitterHandle: z.string(),
    referralCode: z.string().cuid(),
    kolId: z.string(),
  }),
  z.object({
    username: z.string(),
    twitterHandle: z.string(),
    referralCode: z.string().cuid(),
    primaryWalletId: z.number().int(),
  }),
  z.object({
    username: z.string(),
    twitterHandle: z.string(),
    referralCode: z.string().cuid(),
  }),
  z.object({
    username: z.string(),
    twitterHandle: z.string(),
    kolId: z.string(),
    primaryWalletId: z.number().int(),
  }),
  z.object({
    username: z.string(),
    twitterHandle: z.string(),
    kolId: z.string(),
  }),
  z.object({
    username: z.string(),
    twitterHandle: z.string(),
    primaryWalletId: z.number().int(),
  }),
  z.object({
    username: z.string(),
    twitterHandle: z.string(),
  }),
  z.object({
    username: z.string(),
    referralCode: z.string().cuid(),
    kolId: z.string(),
    primaryWalletId: z.number().int(),
  }),
  z.object({
    username: z.string(),
    referralCode: z.string().cuid(),
    kolId: z.string(),
  }),
  z.object({
    username: z.string(),
    referralCode: z.string().cuid(),
    primaryWalletId: z.number().int(),
  }),
  z.object({
    username: z.string(),
    referralCode: z.string().cuid(),
  }),
  z.object({
    username: z.string(),
    kolId: z.string(),
    primaryWalletId: z.number().int(),
  }),
  z.object({
    username: z.string(),
    kolId: z.string(),
  }),
  z.object({
    username: z.string(),
    primaryWalletId: z.number().int(),
  }),
  z.object({
    username: z.string(),
  }),
  z.object({
    email: z.string(),
    twitterHandle: z.string(),
    referralCode: z.string().cuid(),
    kolId: z.string(),
    primaryWalletId: z.number().int(),
  }),
  z.object({
    email: z.string(),
    twitterHandle: z.string(),
    referralCode: z.string().cuid(),
    kolId: z.string(),
  }),
  z.object({
    email: z.string(),
    twitterHandle: z.string(),
    referralCode: z.string().cuid(),
    primaryWalletId: z.number().int(),
  }),
  z.object({
    email: z.string(),
    twitterHandle: z.string(),
    referralCode: z.string().cuid(),
  }),
  z.object({
    email: z.string(),
    twitterHandle: z.string(),
    kolId: z.string(),
    primaryWalletId: z.number().int(),
  }),
  z.object({
    email: z.string(),
    twitterHandle: z.string(),
    kolId: z.string(),
  }),
  z.object({
    email: z.string(),
    twitterHandle: z.string(),
    primaryWalletId: z.number().int(),
  }),
  z.object({
    email: z.string(),
    twitterHandle: z.string(),
  }),
  z.object({
    email: z.string(),
    referralCode: z.string().cuid(),
    kolId: z.string(),
    primaryWalletId: z.number().int(),
  }),
  z.object({
    email: z.string(),
    referralCode: z.string().cuid(),
    kolId: z.string(),
  }),
  z.object({
    email: z.string(),
    referralCode: z.string().cuid(),
    primaryWalletId: z.number().int(),
  }),
  z.object({
    email: z.string(),
    referralCode: z.string().cuid(),
  }),
  z.object({
    email: z.string(),
    kolId: z.string(),
    primaryWalletId: z.number().int(),
  }),
  z.object({
    email: z.string(),
    kolId: z.string(),
  }),
  z.object({
    email: z.string(),
    primaryWalletId: z.number().int(),
  }),
  z.object({
    email: z.string(),
  }),
  z.object({
    twitterHandle: z.string(),
    referralCode: z.string().cuid(),
    kolId: z.string(),
    primaryWalletId: z.number().int(),
  }),
  z.object({
    twitterHandle: z.string(),
    referralCode: z.string().cuid(),
    kolId: z.string(),
  }),
  z.object({
    twitterHandle: z.string(),
    referralCode: z.string().cuid(),
    primaryWalletId: z.number().int(),
  }),
  z.object({
    twitterHandle: z.string(),
    referralCode: z.string().cuid(),
  }),
  z.object({
    twitterHandle: z.string(),
    kolId: z.string(),
    primaryWalletId: z.number().int(),
  }),
  z.object({
    twitterHandle: z.string(),
    kolId: z.string(),
  }),
  z.object({
    twitterHandle: z.string(),
    primaryWalletId: z.number().int(),
  }),
  z.object({
    twitterHandle: z.string(),
  }),
  z.object({
    referralCode: z.string().cuid(),
    kolId: z.string(),
    primaryWalletId: z.number().int(),
  }),
  z.object({
    referralCode: z.string().cuid(),
    kolId: z.string(),
  }),
  z.object({
    referralCode: z.string().cuid(),
    primaryWalletId: z.number().int(),
  }),
  z.object({
    referralCode: z.string().cuid(),
  }),
  z.object({
    kolId: z.string(),
    primaryWalletId: z.number().int(),
  }),
  z.object({
    kolId: z.string(),
  }),
  z.object({
    primaryWalletId: z.number().int(),
  }),
])
.and(z.object({
  id: z.number().int().optional(),
  username: z.string().optional(),
  email: z.string().optional(),
  twitterHandle: z.string().optional(),
  referralCode: z.string().cuid().optional(),
  kolId: z.string().optional(),
  primaryWalletId: z.number().int().optional(),
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  avatarUrl: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  platform: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  referredById: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  onboardingStep: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  completedTasks: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  earnedPoints: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  referredBy: z.union([ z.lazy(() => UserNullableRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional().nullable(),
  referrals: z.lazy(() => UserListRelationFilterSchema).optional(),
  kol: z.union([ z.lazy(() => KOLNullableRelationFilterSchema),z.lazy(() => KOLWhereInputSchema) ]).optional().nullable(),
  wallets: z.lazy(() => WalletListRelationFilterSchema).optional(),
  primaryWallet: z.union([ z.lazy(() => WalletNullableRelationFilterSchema),z.lazy(() => WalletWhereInputSchema) ]).optional().nullable(),
}).strict());

export const UserOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  username: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  avatarUrl: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  platform: z.lazy(() => SortOrderSchema).optional(),
  email: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  twitterHandle: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  referralCode: z.lazy(() => SortOrderSchema).optional(),
  referredById: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  onboardingStep: z.lazy(() => SortOrderSchema).optional(),
  completedTasks: z.lazy(() => SortOrderSchema).optional(),
  earnedPoints: z.lazy(() => SortOrderSchema).optional(),
  kolId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  primaryWalletId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => UserCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => UserAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => UserMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => UserMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => UserSumOrderByAggregateInputSchema).optional()
}).strict();

export const UserScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UserScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  username: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  avatarUrl: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  platform: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  twitterHandle: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  referralCode: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  referredById: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  onboardingStep: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  completedTasks: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  earnedPoints: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  kolId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  primaryWalletId: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
}).strict();

export const WalletWhereInputSchema: z.ZodType<Prisma.WalletWhereInput> = z.object({
  AND: z.union([ z.lazy(() => WalletWhereInputSchema),z.lazy(() => WalletWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => WalletWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => WalletWhereInputSchema),z.lazy(() => WalletWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  address: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  chain: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  verified: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  label: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  primaryFor: z.union([ z.lazy(() => UserNullableRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional().nullable(),
}).strict();

export const WalletOrderByWithRelationInputSchema: z.ZodType<Prisma.WalletOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  address: z.lazy(() => SortOrderSchema).optional(),
  chain: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  verified: z.lazy(() => SortOrderSchema).optional(),
  label: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  primaryFor: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const WalletWhereUniqueInputSchema: z.ZodType<Prisma.WalletWhereUniqueInput> = z.union([
  z.object({
    id: z.number().int(),
    address: z.string()
  }),
  z.object({
    id: z.number().int(),
  }),
  z.object({
    address: z.string(),
  }),
])
.and(z.object({
  id: z.number().int().optional(),
  address: z.string().optional(),
  AND: z.union([ z.lazy(() => WalletWhereInputSchema),z.lazy(() => WalletWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => WalletWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => WalletWhereInputSchema),z.lazy(() => WalletWhereInputSchema).array() ]).optional(),
  chain: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  verified: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  label: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  primaryFor: z.union([ z.lazy(() => UserNullableRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional().nullable(),
}).strict());

export const WalletOrderByWithAggregationInputSchema: z.ZodType<Prisma.WalletOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  address: z.lazy(() => SortOrderSchema).optional(),
  chain: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  verified: z.lazy(() => SortOrderSchema).optional(),
  label: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => WalletCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => WalletAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => WalletMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => WalletMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => WalletSumOrderByAggregateInputSchema).optional()
}).strict();

export const WalletScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.WalletScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => WalletScalarWhereWithAggregatesInputSchema),z.lazy(() => WalletScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => WalletScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => WalletScalarWhereWithAggregatesInputSchema),z.lazy(() => WalletScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  address: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  chain: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  verified: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  label: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const NarrativeWhereInputSchema: z.ZodType<Prisma.NarrativeWhereInput> = z.object({
  AND: z.union([ z.lazy(() => NarrativeWhereInputSchema),z.lazy(() => NarrativeWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => NarrativeWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => NarrativeWhereInputSchema),z.lazy(() => NarrativeWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  narrativeId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  slug: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  projectCount: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  totalViews: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  totalPosts: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  totalMarketCapUsd: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  marketCapChange24h: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  marketCapChange7d: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  marketCapChange30d: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  marketCapChange90d: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  mindsharePercent: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  mindshareChange24h: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  mindshareChange7d: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  mindshareChange30d: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  mindshareChange90d: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  fetchedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  projectLinks: z.lazy(() => ProjectToNarrativeListRelationFilterSchema).optional(),
  narrativeSnapshot: z.lazy(() => NarrativeSnapshotListRelationFilterSchema).optional(),
  projectSnapshot: z.lazy(() => ProjectSnapshotListRelationFilterSchema).optional()
}).strict();

export const NarrativeOrderByWithRelationInputSchema: z.ZodType<Prisma.NarrativeOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  narrativeId: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
  description: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  projectCount: z.lazy(() => SortOrderSchema).optional(),
  totalViews: z.lazy(() => SortOrderSchema).optional(),
  totalPosts: z.lazy(() => SortOrderSchema).optional(),
  totalMarketCapUsd: z.lazy(() => SortOrderSchema).optional(),
  marketCapChange24h: z.lazy(() => SortOrderSchema).optional(),
  marketCapChange7d: z.lazy(() => SortOrderSchema).optional(),
  marketCapChange30d: z.lazy(() => SortOrderSchema).optional(),
  marketCapChange90d: z.lazy(() => SortOrderSchema).optional(),
  mindsharePercent: z.lazy(() => SortOrderSchema).optional(),
  mindshareChange24h: z.lazy(() => SortOrderSchema).optional(),
  mindshareChange7d: z.lazy(() => SortOrderSchema).optional(),
  mindshareChange30d: z.lazy(() => SortOrderSchema).optional(),
  mindshareChange90d: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  fetchedAt: z.lazy(() => SortOrderSchema).optional(),
  projectLinks: z.lazy(() => ProjectToNarrativeOrderByRelationAggregateInputSchema).optional(),
  narrativeSnapshot: z.lazy(() => NarrativeSnapshotOrderByRelationAggregateInputSchema).optional(),
  projectSnapshot: z.lazy(() => ProjectSnapshotOrderByRelationAggregateInputSchema).optional()
}).strict();

export const NarrativeWhereUniqueInputSchema: z.ZodType<Prisma.NarrativeWhereUniqueInput> = z.union([
  z.object({
    id: z.string().cuid(),
    narrativeId: z.string()
  }),
  z.object({
    id: z.string().cuid(),
  }),
  z.object({
    narrativeId: z.string(),
  }),
])
.and(z.object({
  id: z.string().cuid().optional(),
  narrativeId: z.string().optional(),
  AND: z.union([ z.lazy(() => NarrativeWhereInputSchema),z.lazy(() => NarrativeWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => NarrativeWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => NarrativeWhereInputSchema),z.lazy(() => NarrativeWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  slug: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  projectCount: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  totalViews: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  totalPosts: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  totalMarketCapUsd: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  marketCapChange24h: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  marketCapChange7d: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  marketCapChange30d: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  marketCapChange90d: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  mindsharePercent: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  mindshareChange24h: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  mindshareChange7d: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  mindshareChange30d: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  mindshareChange90d: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  fetchedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  projectLinks: z.lazy(() => ProjectToNarrativeListRelationFilterSchema).optional(),
  narrativeSnapshot: z.lazy(() => NarrativeSnapshotListRelationFilterSchema).optional(),
  projectSnapshot: z.lazy(() => ProjectSnapshotListRelationFilterSchema).optional()
}).strict());

export const NarrativeOrderByWithAggregationInputSchema: z.ZodType<Prisma.NarrativeOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  narrativeId: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
  description: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  projectCount: z.lazy(() => SortOrderSchema).optional(),
  totalViews: z.lazy(() => SortOrderSchema).optional(),
  totalPosts: z.lazy(() => SortOrderSchema).optional(),
  totalMarketCapUsd: z.lazy(() => SortOrderSchema).optional(),
  marketCapChange24h: z.lazy(() => SortOrderSchema).optional(),
  marketCapChange7d: z.lazy(() => SortOrderSchema).optional(),
  marketCapChange30d: z.lazy(() => SortOrderSchema).optional(),
  marketCapChange90d: z.lazy(() => SortOrderSchema).optional(),
  mindsharePercent: z.lazy(() => SortOrderSchema).optional(),
  mindshareChange24h: z.lazy(() => SortOrderSchema).optional(),
  mindshareChange7d: z.lazy(() => SortOrderSchema).optional(),
  mindshareChange30d: z.lazy(() => SortOrderSchema).optional(),
  mindshareChange90d: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  fetchedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => NarrativeCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => NarrativeAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => NarrativeMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => NarrativeMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => NarrativeSumOrderByAggregateInputSchema).optional()
}).strict();

export const NarrativeScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.NarrativeScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => NarrativeScalarWhereWithAggregatesInputSchema),z.lazy(() => NarrativeScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => NarrativeScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => NarrativeScalarWhereWithAggregatesInputSchema),z.lazy(() => NarrativeScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  narrativeId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  slug: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  projectCount: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  totalViews: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
  totalPosts: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  totalMarketCapUsd: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
  marketCapChange24h: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
  marketCapChange7d: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
  marketCapChange30d: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
  marketCapChange90d: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
  mindsharePercent: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
  mindshareChange24h: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
  mindshareChange7d: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
  mindshareChange30d: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
  mindshareChange90d: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  fetchedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const NarrativeSnapshotWhereInputSchema: z.ZodType<Prisma.NarrativeSnapshotWhereInput> = z.object({
  AND: z.union([ z.lazy(() => NarrativeSnapshotWhereInputSchema),z.lazy(() => NarrativeSnapshotWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => NarrativeSnapshotWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => NarrativeSnapshotWhereInputSchema),z.lazy(() => NarrativeSnapshotWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  narrativeId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  projectCount: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  totalViews: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  totalPosts: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  totalMarketCapUsd: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  marketCapChange24h: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  marketCapChange7d: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  marketCapChange30d: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  marketCapChange90d: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  mindsharePercent: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  mindshareChange24h: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  mindshareChange7d: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  mindshareChange30d: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  mindshareChange90d: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  source: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  updatedBy: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  fetchedDate: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  narrative: z.union([ z.lazy(() => NarrativeRelationFilterSchema),z.lazy(() => NarrativeWhereInputSchema) ]).optional(),
}).strict();

export const NarrativeSnapshotOrderByWithRelationInputSchema: z.ZodType<Prisma.NarrativeSnapshotOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  narrativeId: z.lazy(() => SortOrderSchema).optional(),
  projectCount: z.lazy(() => SortOrderSchema).optional(),
  totalViews: z.lazy(() => SortOrderSchema).optional(),
  totalPosts: z.lazy(() => SortOrderSchema).optional(),
  totalMarketCapUsd: z.lazy(() => SortOrderSchema).optional(),
  marketCapChange24h: z.lazy(() => SortOrderSchema).optional(),
  marketCapChange7d: z.lazy(() => SortOrderSchema).optional(),
  marketCapChange30d: z.lazy(() => SortOrderSchema).optional(),
  marketCapChange90d: z.lazy(() => SortOrderSchema).optional(),
  mindsharePercent: z.lazy(() => SortOrderSchema).optional(),
  mindshareChange24h: z.lazy(() => SortOrderSchema).optional(),
  mindshareChange7d: z.lazy(() => SortOrderSchema).optional(),
  mindshareChange30d: z.lazy(() => SortOrderSchema).optional(),
  mindshareChange90d: z.lazy(() => SortOrderSchema).optional(),
  source: z.lazy(() => SortOrderSchema).optional(),
  updatedBy: z.lazy(() => SortOrderSchema).optional(),
  fetchedDate: z.lazy(() => SortOrderSchema).optional(),
  narrative: z.lazy(() => NarrativeOrderByWithRelationInputSchema).optional()
}).strict();

export const NarrativeSnapshotWhereUniqueInputSchema: z.ZodType<Prisma.NarrativeSnapshotWhereUniqueInput> = z.union([
  z.object({
    id: z.string().cuid(),
    narrativeId_fetchedDate: z.lazy(() => NarrativeSnapshotNarrativeIdFetchedDateCompoundUniqueInputSchema)
  }),
  z.object({
    id: z.string().cuid(),
  }),
  z.object({
    narrativeId_fetchedDate: z.lazy(() => NarrativeSnapshotNarrativeIdFetchedDateCompoundUniqueInputSchema),
  }),
])
.and(z.object({
  id: z.string().cuid().optional(),
  narrativeId_fetchedDate: z.lazy(() => NarrativeSnapshotNarrativeIdFetchedDateCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => NarrativeSnapshotWhereInputSchema),z.lazy(() => NarrativeSnapshotWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => NarrativeSnapshotWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => NarrativeSnapshotWhereInputSchema),z.lazy(() => NarrativeSnapshotWhereInputSchema).array() ]).optional(),
  narrativeId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  projectCount: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  totalViews: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  totalPosts: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  totalMarketCapUsd: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  marketCapChange24h: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  marketCapChange7d: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  marketCapChange30d: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  marketCapChange90d: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  mindsharePercent: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  mindshareChange24h: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  mindshareChange7d: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  mindshareChange30d: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  mindshareChange90d: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  source: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  updatedBy: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  fetchedDate: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  narrative: z.union([ z.lazy(() => NarrativeRelationFilterSchema),z.lazy(() => NarrativeWhereInputSchema) ]).optional(),
}).strict());

export const NarrativeSnapshotOrderByWithAggregationInputSchema: z.ZodType<Prisma.NarrativeSnapshotOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  narrativeId: z.lazy(() => SortOrderSchema).optional(),
  projectCount: z.lazy(() => SortOrderSchema).optional(),
  totalViews: z.lazy(() => SortOrderSchema).optional(),
  totalPosts: z.lazy(() => SortOrderSchema).optional(),
  totalMarketCapUsd: z.lazy(() => SortOrderSchema).optional(),
  marketCapChange24h: z.lazy(() => SortOrderSchema).optional(),
  marketCapChange7d: z.lazy(() => SortOrderSchema).optional(),
  marketCapChange30d: z.lazy(() => SortOrderSchema).optional(),
  marketCapChange90d: z.lazy(() => SortOrderSchema).optional(),
  mindsharePercent: z.lazy(() => SortOrderSchema).optional(),
  mindshareChange24h: z.lazy(() => SortOrderSchema).optional(),
  mindshareChange7d: z.lazy(() => SortOrderSchema).optional(),
  mindshareChange30d: z.lazy(() => SortOrderSchema).optional(),
  mindshareChange90d: z.lazy(() => SortOrderSchema).optional(),
  source: z.lazy(() => SortOrderSchema).optional(),
  updatedBy: z.lazy(() => SortOrderSchema).optional(),
  fetchedDate: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => NarrativeSnapshotCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => NarrativeSnapshotAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => NarrativeSnapshotMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => NarrativeSnapshotMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => NarrativeSnapshotSumOrderByAggregateInputSchema).optional()
}).strict();

export const NarrativeSnapshotScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.NarrativeSnapshotScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => NarrativeSnapshotScalarWhereWithAggregatesInputSchema),z.lazy(() => NarrativeSnapshotScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => NarrativeSnapshotScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => NarrativeSnapshotScalarWhereWithAggregatesInputSchema),z.lazy(() => NarrativeSnapshotScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  narrativeId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  projectCount: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  totalViews: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
  totalPosts: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  totalMarketCapUsd: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
  marketCapChange24h: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
  marketCapChange7d: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
  marketCapChange30d: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
  marketCapChange90d: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
  mindsharePercent: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
  mindshareChange24h: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
  mindshareChange7d: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
  mindshareChange30d: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
  mindshareChange90d: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
  source: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  updatedBy: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  fetchedDate: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const ProjectWhereInputSchema: z.ZodType<Prisma.ProjectWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ProjectWhereInputSchema),z.lazy(() => ProjectWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ProjectWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ProjectWhereInputSchema),z.lazy(() => ProjectWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  stage: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  featured: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  hidden: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  mindshare: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  twitterId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  twitterUsername: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  twitterDisplayName: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  twitterAvatarUrl: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  twitterDescription: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  twitterDescriptionLink: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  twitterFollowersCount: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  twitterFollowingCount: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  twitterIsVerified: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  twitterGoldBadge: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  twitterLang: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  twitterCreatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  coinSymbol: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  coinMarketCap: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  coinPrice: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  coinContractAddress: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  coinName: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  coinImageUrl: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  fetchedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  projectSnapshot: z.lazy(() => ProjectSnapshotListRelationFilterSchema).optional(),
  narrativeLinks: z.lazy(() => ProjectToNarrativeListRelationFilterSchema).optional(),
  rewardPools: z.lazy(() => RewardPoolListRelationFilterSchema).optional(),
  kols: z.lazy(() => KOLToProjectListRelationFilterSchema).optional()
}).strict();

export const ProjectOrderByWithRelationInputSchema: z.ZodType<Prisma.ProjectOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  stage: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  featured: z.lazy(() => SortOrderSchema).optional(),
  hidden: z.lazy(() => SortOrderSchema).optional(),
  mindshare: z.lazy(() => SortOrderSchema).optional(),
  twitterId: z.lazy(() => SortOrderSchema).optional(),
  twitterUsername: z.lazy(() => SortOrderSchema).optional(),
  twitterDisplayName: z.lazy(() => SortOrderSchema).optional(),
  twitterAvatarUrl: z.lazy(() => SortOrderSchema).optional(),
  twitterDescription: z.lazy(() => SortOrderSchema).optional(),
  twitterDescriptionLink: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  twitterFollowersCount: z.lazy(() => SortOrderSchema).optional(),
  twitterFollowingCount: z.lazy(() => SortOrderSchema).optional(),
  twitterIsVerified: z.lazy(() => SortOrderSchema).optional(),
  twitterGoldBadge: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  twitterLang: z.lazy(() => SortOrderSchema).optional(),
  twitterCreatedAt: z.lazy(() => SortOrderSchema).optional(),
  coinSymbol: z.lazy(() => SortOrderSchema).optional(),
  coinMarketCap: z.lazy(() => SortOrderSchema).optional(),
  coinPrice: z.lazy(() => SortOrderSchema).optional(),
  coinContractAddress: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  coinName: z.lazy(() => SortOrderSchema).optional(),
  coinImageUrl: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  fetchedAt: z.lazy(() => SortOrderSchema).optional(),
  projectSnapshot: z.lazy(() => ProjectSnapshotOrderByRelationAggregateInputSchema).optional(),
  narrativeLinks: z.lazy(() => ProjectToNarrativeOrderByRelationAggregateInputSchema).optional(),
  rewardPools: z.lazy(() => RewardPoolOrderByRelationAggregateInputSchema).optional(),
  kols: z.lazy(() => KOLToProjectOrderByRelationAggregateInputSchema).optional()
}).strict();

export const ProjectWhereUniqueInputSchema: z.ZodType<Prisma.ProjectWhereUniqueInput> = z.union([
  z.object({
    id: z.string(),
    twitterId: z.string(),
    twitterUsername: z.string()
  }),
  z.object({
    id: z.string(),
    twitterId: z.string(),
  }),
  z.object({
    id: z.string(),
    twitterUsername: z.string(),
  }),
  z.object({
    id: z.string(),
  }),
  z.object({
    twitterId: z.string(),
    twitterUsername: z.string(),
  }),
  z.object({
    twitterId: z.string(),
  }),
  z.object({
    twitterUsername: z.string(),
  }),
])
.and(z.object({
  id: z.string().optional(),
  twitterId: z.string().optional(),
  twitterUsername: z.string().optional(),
  AND: z.union([ z.lazy(() => ProjectWhereInputSchema),z.lazy(() => ProjectWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ProjectWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ProjectWhereInputSchema),z.lazy(() => ProjectWhereInputSchema).array() ]).optional(),
  stage: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  featured: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  hidden: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  mindshare: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  twitterDisplayName: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  twitterAvatarUrl: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  twitterDescription: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  twitterDescriptionLink: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  twitterFollowersCount: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  twitterFollowingCount: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  twitterIsVerified: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  twitterGoldBadge: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  twitterLang: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  twitterCreatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  coinSymbol: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  coinMarketCap: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  coinPrice: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  coinContractAddress: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  coinName: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  coinImageUrl: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  fetchedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  projectSnapshot: z.lazy(() => ProjectSnapshotListRelationFilterSchema).optional(),
  narrativeLinks: z.lazy(() => ProjectToNarrativeListRelationFilterSchema).optional(),
  rewardPools: z.lazy(() => RewardPoolListRelationFilterSchema).optional(),
  kols: z.lazy(() => KOLToProjectListRelationFilterSchema).optional()
}).strict());

export const ProjectOrderByWithAggregationInputSchema: z.ZodType<Prisma.ProjectOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  stage: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  featured: z.lazy(() => SortOrderSchema).optional(),
  hidden: z.lazy(() => SortOrderSchema).optional(),
  mindshare: z.lazy(() => SortOrderSchema).optional(),
  twitterId: z.lazy(() => SortOrderSchema).optional(),
  twitterUsername: z.lazy(() => SortOrderSchema).optional(),
  twitterDisplayName: z.lazy(() => SortOrderSchema).optional(),
  twitterAvatarUrl: z.lazy(() => SortOrderSchema).optional(),
  twitterDescription: z.lazy(() => SortOrderSchema).optional(),
  twitterDescriptionLink: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  twitterFollowersCount: z.lazy(() => SortOrderSchema).optional(),
  twitterFollowingCount: z.lazy(() => SortOrderSchema).optional(),
  twitterIsVerified: z.lazy(() => SortOrderSchema).optional(),
  twitterGoldBadge: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  twitterLang: z.lazy(() => SortOrderSchema).optional(),
  twitterCreatedAt: z.lazy(() => SortOrderSchema).optional(),
  coinSymbol: z.lazy(() => SortOrderSchema).optional(),
  coinMarketCap: z.lazy(() => SortOrderSchema).optional(),
  coinPrice: z.lazy(() => SortOrderSchema).optional(),
  coinContractAddress: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  coinName: z.lazy(() => SortOrderSchema).optional(),
  coinImageUrl: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  fetchedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => ProjectCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => ProjectAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ProjectMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ProjectMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => ProjectSumOrderByAggregateInputSchema).optional()
}).strict();

export const ProjectScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ProjectScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ProjectScalarWhereWithAggregatesInputSchema),z.lazy(() => ProjectScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ProjectScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ProjectScalarWhereWithAggregatesInputSchema),z.lazy(() => ProjectScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  stage: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  featured: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  hidden: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  mindshare: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
  twitterId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  twitterUsername: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  twitterDisplayName: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  twitterAvatarUrl: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  twitterDescription: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  twitterDescriptionLink: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  twitterFollowersCount: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  twitterFollowingCount: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  twitterIsVerified: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  twitterGoldBadge: z.union([ z.lazy(() => BoolNullableWithAggregatesFilterSchema),z.boolean() ]).optional().nullable(),
  twitterLang: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  twitterCreatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  coinSymbol: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  coinMarketCap: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
  coinPrice: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
  coinContractAddress: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  coinName: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  coinImageUrl: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  fetchedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const ProjectSnapshotWhereInputSchema: z.ZodType<Prisma.ProjectSnapshotWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ProjectSnapshotWhereInputSchema),z.lazy(() => ProjectSnapshotWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ProjectSnapshotWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ProjectSnapshotWhereInputSchema),z.lazy(() => ProjectSnapshotWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  totalViews: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  totalPosts: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  mindsharePercent: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  mindshareChange24h: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  mindshareChange7d: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  mindshareChange30d: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  mindshareChange90d: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  source: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  updatedBy: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  fetchedDate: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  projectId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  narrativeId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  project: z.union([ z.lazy(() => ProjectRelationFilterSchema),z.lazy(() => ProjectWhereInputSchema) ]).optional(),
  narrative: z.union([ z.lazy(() => NarrativeNullableRelationFilterSchema),z.lazy(() => NarrativeWhereInputSchema) ]).optional().nullable(),
}).strict();

export const ProjectSnapshotOrderByWithRelationInputSchema: z.ZodType<Prisma.ProjectSnapshotOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  totalViews: z.lazy(() => SortOrderSchema).optional(),
  totalPosts: z.lazy(() => SortOrderSchema).optional(),
  mindsharePercent: z.lazy(() => SortOrderSchema).optional(),
  mindshareChange24h: z.lazy(() => SortOrderSchema).optional(),
  mindshareChange7d: z.lazy(() => SortOrderSchema).optional(),
  mindshareChange30d: z.lazy(() => SortOrderSchema).optional(),
  mindshareChange90d: z.lazy(() => SortOrderSchema).optional(),
  source: z.lazy(() => SortOrderSchema).optional(),
  updatedBy: z.lazy(() => SortOrderSchema).optional(),
  fetchedDate: z.lazy(() => SortOrderSchema).optional(),
  projectId: z.lazy(() => SortOrderSchema).optional(),
  narrativeId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  project: z.lazy(() => ProjectOrderByWithRelationInputSchema).optional(),
  narrative: z.lazy(() => NarrativeOrderByWithRelationInputSchema).optional()
}).strict();

export const ProjectSnapshotWhereUniqueInputSchema: z.ZodType<Prisma.ProjectSnapshotWhereUniqueInput> = z.union([
  z.object({
    id: z.string().cuid(),
    projectId_narrativeId_fetchedDate: z.lazy(() => ProjectSnapshotProjectIdNarrativeIdFetchedDateCompoundUniqueInputSchema)
  }),
  z.object({
    id: z.string().cuid(),
  }),
  z.object({
    projectId_narrativeId_fetchedDate: z.lazy(() => ProjectSnapshotProjectIdNarrativeIdFetchedDateCompoundUniqueInputSchema),
  }),
])
.and(z.object({
  id: z.string().cuid().optional(),
  projectId_narrativeId_fetchedDate: z.lazy(() => ProjectSnapshotProjectIdNarrativeIdFetchedDateCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => ProjectSnapshotWhereInputSchema),z.lazy(() => ProjectSnapshotWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ProjectSnapshotWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ProjectSnapshotWhereInputSchema),z.lazy(() => ProjectSnapshotWhereInputSchema).array() ]).optional(),
  totalViews: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  totalPosts: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  mindsharePercent: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  mindshareChange24h: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  mindshareChange7d: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  mindshareChange30d: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  mindshareChange90d: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  source: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  updatedBy: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  fetchedDate: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  projectId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  narrativeId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  project: z.union([ z.lazy(() => ProjectRelationFilterSchema),z.lazy(() => ProjectWhereInputSchema) ]).optional(),
  narrative: z.union([ z.lazy(() => NarrativeNullableRelationFilterSchema),z.lazy(() => NarrativeWhereInputSchema) ]).optional().nullable(),
}).strict());

export const ProjectSnapshotOrderByWithAggregationInputSchema: z.ZodType<Prisma.ProjectSnapshotOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  totalViews: z.lazy(() => SortOrderSchema).optional(),
  totalPosts: z.lazy(() => SortOrderSchema).optional(),
  mindsharePercent: z.lazy(() => SortOrderSchema).optional(),
  mindshareChange24h: z.lazy(() => SortOrderSchema).optional(),
  mindshareChange7d: z.lazy(() => SortOrderSchema).optional(),
  mindshareChange30d: z.lazy(() => SortOrderSchema).optional(),
  mindshareChange90d: z.lazy(() => SortOrderSchema).optional(),
  source: z.lazy(() => SortOrderSchema).optional(),
  updatedBy: z.lazy(() => SortOrderSchema).optional(),
  fetchedDate: z.lazy(() => SortOrderSchema).optional(),
  projectId: z.lazy(() => SortOrderSchema).optional(),
  narrativeId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => ProjectSnapshotCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => ProjectSnapshotAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ProjectSnapshotMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ProjectSnapshotMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => ProjectSnapshotSumOrderByAggregateInputSchema).optional()
}).strict();

export const ProjectSnapshotScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ProjectSnapshotScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ProjectSnapshotScalarWhereWithAggregatesInputSchema),z.lazy(() => ProjectSnapshotScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ProjectSnapshotScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ProjectSnapshotScalarWhereWithAggregatesInputSchema),z.lazy(() => ProjectSnapshotScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  totalViews: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  totalPosts: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  mindsharePercent: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
  mindshareChange24h: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
  mindshareChange7d: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
  mindshareChange30d: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
  mindshareChange90d: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
  source: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  updatedBy: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  fetchedDate: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  projectId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  narrativeId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const ProjectToNarrativeWhereInputSchema: z.ZodType<Prisma.ProjectToNarrativeWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ProjectToNarrativeWhereInputSchema),z.lazy(() => ProjectToNarrativeWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ProjectToNarrativeWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ProjectToNarrativeWhereInputSchema),z.lazy(() => ProjectToNarrativeWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  narrativeId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  projectId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  totalViews: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  totalPosts: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  mindsharePercent: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  mindshareChange24h: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  mindshareChange7d: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  mindshareChange30d: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  mindshareChange90d: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  narrative: z.union([ z.lazy(() => NarrativeRelationFilterSchema),z.lazy(() => NarrativeWhereInputSchema) ]).optional(),
  project: z.union([ z.lazy(() => ProjectRelationFilterSchema),z.lazy(() => ProjectWhereInputSchema) ]).optional(),
}).strict();

export const ProjectToNarrativeOrderByWithRelationInputSchema: z.ZodType<Prisma.ProjectToNarrativeOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  narrativeId: z.lazy(() => SortOrderSchema).optional(),
  projectId: z.lazy(() => SortOrderSchema).optional(),
  totalViews: z.lazy(() => SortOrderSchema).optional(),
  totalPosts: z.lazy(() => SortOrderSchema).optional(),
  mindsharePercent: z.lazy(() => SortOrderSchema).optional(),
  mindshareChange24h: z.lazy(() => SortOrderSchema).optional(),
  mindshareChange7d: z.lazy(() => SortOrderSchema).optional(),
  mindshareChange30d: z.lazy(() => SortOrderSchema).optional(),
  mindshareChange90d: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  narrative: z.lazy(() => NarrativeOrderByWithRelationInputSchema).optional(),
  project: z.lazy(() => ProjectOrderByWithRelationInputSchema).optional()
}).strict();

export const ProjectToNarrativeWhereUniqueInputSchema: z.ZodType<Prisma.ProjectToNarrativeWhereUniqueInput> = z.union([
  z.object({
    id: z.string(),
    narrativeId_projectId: z.lazy(() => ProjectToNarrativeNarrativeIdProjectIdCompoundUniqueInputSchema)
  }),
  z.object({
    id: z.string(),
  }),
  z.object({
    narrativeId_projectId: z.lazy(() => ProjectToNarrativeNarrativeIdProjectIdCompoundUniqueInputSchema),
  }),
])
.and(z.object({
  id: z.string().optional(),
  narrativeId_projectId: z.lazy(() => ProjectToNarrativeNarrativeIdProjectIdCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => ProjectToNarrativeWhereInputSchema),z.lazy(() => ProjectToNarrativeWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ProjectToNarrativeWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ProjectToNarrativeWhereInputSchema),z.lazy(() => ProjectToNarrativeWhereInputSchema).array() ]).optional(),
  narrativeId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  projectId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  totalViews: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  totalPosts: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  mindsharePercent: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  mindshareChange24h: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  mindshareChange7d: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  mindshareChange30d: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  mindshareChange90d: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  narrative: z.union([ z.lazy(() => NarrativeRelationFilterSchema),z.lazy(() => NarrativeWhereInputSchema) ]).optional(),
  project: z.union([ z.lazy(() => ProjectRelationFilterSchema),z.lazy(() => ProjectWhereInputSchema) ]).optional(),
}).strict());

export const ProjectToNarrativeOrderByWithAggregationInputSchema: z.ZodType<Prisma.ProjectToNarrativeOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  narrativeId: z.lazy(() => SortOrderSchema).optional(),
  projectId: z.lazy(() => SortOrderSchema).optional(),
  totalViews: z.lazy(() => SortOrderSchema).optional(),
  totalPosts: z.lazy(() => SortOrderSchema).optional(),
  mindsharePercent: z.lazy(() => SortOrderSchema).optional(),
  mindshareChange24h: z.lazy(() => SortOrderSchema).optional(),
  mindshareChange7d: z.lazy(() => SortOrderSchema).optional(),
  mindshareChange30d: z.lazy(() => SortOrderSchema).optional(),
  mindshareChange90d: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => ProjectToNarrativeCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => ProjectToNarrativeAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ProjectToNarrativeMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ProjectToNarrativeMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => ProjectToNarrativeSumOrderByAggregateInputSchema).optional()
}).strict();

export const ProjectToNarrativeScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ProjectToNarrativeScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ProjectToNarrativeScalarWhereWithAggregatesInputSchema),z.lazy(() => ProjectToNarrativeScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ProjectToNarrativeScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ProjectToNarrativeScalarWhereWithAggregatesInputSchema),z.lazy(() => ProjectToNarrativeScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  narrativeId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  projectId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  totalViews: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  totalPosts: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  mindsharePercent: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
  mindshareChange24h: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
  mindshareChange7d: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
  mindshareChange30d: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
  mindshareChange90d: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const KOLWhereInputSchema: z.ZodType<Prisma.KOLWhereInput> = z.object({
  AND: z.union([ z.lazy(() => KOLWhereInputSchema),z.lazy(() => KOLWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => KOLWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => KOLWhereInputSchema),z.lazy(() => KOLWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  hidden: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  isAlsoProject: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  twitterId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  twitterUsername: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  twitterDisplayName: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  twitterAvatarUrl: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  twitterDescription: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  twitterDescriptionLink: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  twitterFollowersCount: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  twitterFollowingCount: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  twitterIsVerified: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  twitterGoldBadge: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  twitterLang: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  twitterCreatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  kolScore: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  kolScorePercentFromTotal: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  smartFollowersCount: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  threadsCount: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  engagementRate: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  smartEngagement: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  avgViews: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  avgLikes: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  totalPosts: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  totalViews: z.union([ z.lazy(() => BigIntNullableFilterSchema),z.bigint() ]).optional().nullable(),
  totalInteractions: z.union([ z.lazy(() => BigIntNullableFilterSchema),z.bigint() ]).optional().nullable(),
  totalOrganicPosts: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  totalOrganicViews: z.union([ z.lazy(() => BigIntNullableFilterSchema),z.bigint() ]).optional().nullable(),
  totalOrganicInteractions: z.union([ z.lazy(() => BigIntNullableFilterSchema),z.bigint() ]).optional().nullable(),
  totalAccountPosts: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  totalAccountViews: z.union([ z.lazy(() => BigIntNullableFilterSchema),z.bigint() ]).optional().nullable(),
  totalAccountInteractions: z.union([ z.lazy(() => BigIntNullableFilterSchema),z.bigint() ]).optional().nullable(),
  totalAccountComments: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  totalAccountLikes: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  totalAccountRetweets: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  totalAccountReplies: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  totalPostsChange: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  totalInteractionsChange: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  totalViewsChange: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  followersChange: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  smartEngagementChange: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  fetchedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  projects: z.lazy(() => KOLToProjectListRelationFilterSchema).optional(),
  kolSnapshot: z.lazy(() => KOLSnapshotListRelationFilterSchema).optional(),
  user: z.union([ z.lazy(() => UserNullableRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional().nullable(),
}).strict();

export const KOLOrderByWithRelationInputSchema: z.ZodType<Prisma.KOLOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  hidden: z.lazy(() => SortOrderSchema).optional(),
  isAlsoProject: z.lazy(() => SortOrderSchema).optional(),
  twitterId: z.lazy(() => SortOrderSchema).optional(),
  twitterUsername: z.lazy(() => SortOrderSchema).optional(),
  twitterDisplayName: z.lazy(() => SortOrderSchema).optional(),
  twitterAvatarUrl: z.lazy(() => SortOrderSchema).optional(),
  twitterDescription: z.lazy(() => SortOrderSchema).optional(),
  twitterDescriptionLink: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  twitterFollowersCount: z.lazy(() => SortOrderSchema).optional(),
  twitterFollowingCount: z.lazy(() => SortOrderSchema).optional(),
  twitterIsVerified: z.lazy(() => SortOrderSchema).optional(),
  twitterGoldBadge: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  twitterLang: z.lazy(() => SortOrderSchema).optional(),
  twitterCreatedAt: z.lazy(() => SortOrderSchema).optional(),
  kolScore: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  kolScorePercentFromTotal: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  smartFollowersCount: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  threadsCount: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  engagementRate: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  smartEngagement: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  avgViews: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  avgLikes: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  totalPosts: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  totalViews: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  totalInteractions: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  totalOrganicPosts: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  totalOrganicViews: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  totalOrganicInteractions: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  totalAccountPosts: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  totalAccountViews: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  totalAccountInteractions: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  totalAccountComments: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  totalAccountLikes: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  totalAccountRetweets: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  totalAccountReplies: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  totalPostsChange: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  totalInteractionsChange: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  totalViewsChange: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  followersChange: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  smartEngagementChange: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  fetchedAt: z.lazy(() => SortOrderSchema).optional(),
  projects: z.lazy(() => KOLToProjectOrderByRelationAggregateInputSchema).optional(),
  kolSnapshot: z.lazy(() => KOLSnapshotOrderByRelationAggregateInputSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const KOLWhereUniqueInputSchema: z.ZodType<Prisma.KOLWhereUniqueInput> = z.union([
  z.object({
    id: z.string(),
    twitterId: z.string(),
    twitterUsername: z.string()
  }),
  z.object({
    id: z.string(),
    twitterId: z.string(),
  }),
  z.object({
    id: z.string(),
    twitterUsername: z.string(),
  }),
  z.object({
    id: z.string(),
  }),
  z.object({
    twitterId: z.string(),
    twitterUsername: z.string(),
  }),
  z.object({
    twitterId: z.string(),
  }),
  z.object({
    twitterUsername: z.string(),
  }),
])
.and(z.object({
  id: z.string().optional(),
  twitterId: z.string().optional(),
  twitterUsername: z.string().optional(),
  AND: z.union([ z.lazy(() => KOLWhereInputSchema),z.lazy(() => KOLWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => KOLWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => KOLWhereInputSchema),z.lazy(() => KOLWhereInputSchema).array() ]).optional(),
  hidden: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  isAlsoProject: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  twitterDisplayName: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  twitterAvatarUrl: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  twitterDescription: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  twitterDescriptionLink: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  twitterFollowersCount: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  twitterFollowingCount: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  twitterIsVerified: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  twitterGoldBadge: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  twitterLang: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  twitterCreatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  kolScore: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  kolScorePercentFromTotal: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  smartFollowersCount: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  threadsCount: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  engagementRate: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  smartEngagement: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  avgViews: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  avgLikes: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  totalPosts: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  totalViews: z.union([ z.lazy(() => BigIntNullableFilterSchema),z.bigint() ]).optional().nullable(),
  totalInteractions: z.union([ z.lazy(() => BigIntNullableFilterSchema),z.bigint() ]).optional().nullable(),
  totalOrganicPosts: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  totalOrganicViews: z.union([ z.lazy(() => BigIntNullableFilterSchema),z.bigint() ]).optional().nullable(),
  totalOrganicInteractions: z.union([ z.lazy(() => BigIntNullableFilterSchema),z.bigint() ]).optional().nullable(),
  totalAccountPosts: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  totalAccountViews: z.union([ z.lazy(() => BigIntNullableFilterSchema),z.bigint() ]).optional().nullable(),
  totalAccountInteractions: z.union([ z.lazy(() => BigIntNullableFilterSchema),z.bigint() ]).optional().nullable(),
  totalAccountComments: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  totalAccountLikes: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  totalAccountRetweets: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  totalAccountReplies: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  totalPostsChange: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  totalInteractionsChange: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  totalViewsChange: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  followersChange: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  smartEngagementChange: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  fetchedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  projects: z.lazy(() => KOLToProjectListRelationFilterSchema).optional(),
  kolSnapshot: z.lazy(() => KOLSnapshotListRelationFilterSchema).optional(),
  user: z.union([ z.lazy(() => UserNullableRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional().nullable(),
}).strict());

export const KOLOrderByWithAggregationInputSchema: z.ZodType<Prisma.KOLOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  hidden: z.lazy(() => SortOrderSchema).optional(),
  isAlsoProject: z.lazy(() => SortOrderSchema).optional(),
  twitterId: z.lazy(() => SortOrderSchema).optional(),
  twitterUsername: z.lazy(() => SortOrderSchema).optional(),
  twitterDisplayName: z.lazy(() => SortOrderSchema).optional(),
  twitterAvatarUrl: z.lazy(() => SortOrderSchema).optional(),
  twitterDescription: z.lazy(() => SortOrderSchema).optional(),
  twitterDescriptionLink: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  twitterFollowersCount: z.lazy(() => SortOrderSchema).optional(),
  twitterFollowingCount: z.lazy(() => SortOrderSchema).optional(),
  twitterIsVerified: z.lazy(() => SortOrderSchema).optional(),
  twitterGoldBadge: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  twitterLang: z.lazy(() => SortOrderSchema).optional(),
  twitterCreatedAt: z.lazy(() => SortOrderSchema).optional(),
  kolScore: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  kolScorePercentFromTotal: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  smartFollowersCount: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  threadsCount: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  engagementRate: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  smartEngagement: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  avgViews: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  avgLikes: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  totalPosts: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  totalViews: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  totalInteractions: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  totalOrganicPosts: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  totalOrganicViews: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  totalOrganicInteractions: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  totalAccountPosts: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  totalAccountViews: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  totalAccountInteractions: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  totalAccountComments: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  totalAccountLikes: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  totalAccountRetweets: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  totalAccountReplies: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  totalPostsChange: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  totalInteractionsChange: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  totalViewsChange: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  followersChange: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  smartEngagementChange: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  fetchedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => KOLCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => KOLAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => KOLMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => KOLMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => KOLSumOrderByAggregateInputSchema).optional()
}).strict();

export const KOLScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.KOLScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => KOLScalarWhereWithAggregatesInputSchema),z.lazy(() => KOLScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => KOLScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => KOLScalarWhereWithAggregatesInputSchema),z.lazy(() => KOLScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  hidden: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  isAlsoProject: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  twitterId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  twitterUsername: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  twitterDisplayName: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  twitterAvatarUrl: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  twitterDescription: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  twitterDescriptionLink: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  twitterFollowersCount: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  twitterFollowingCount: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  twitterIsVerified: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  twitterGoldBadge: z.union([ z.lazy(() => BoolNullableWithAggregatesFilterSchema),z.boolean() ]).optional().nullable(),
  twitterLang: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  twitterCreatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  kolScore: z.union([ z.lazy(() => FloatNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  kolScorePercentFromTotal: z.union([ z.lazy(() => FloatNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  smartFollowersCount: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  threadsCount: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  engagementRate: z.union([ z.lazy(() => FloatNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  smartEngagement: z.union([ z.lazy(() => FloatNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  avgViews: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  avgLikes: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  totalPosts: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  totalViews: z.union([ z.lazy(() => BigIntNullableWithAggregatesFilterSchema),z.bigint() ]).optional().nullable(),
  totalInteractions: z.union([ z.lazy(() => BigIntNullableWithAggregatesFilterSchema),z.bigint() ]).optional().nullable(),
  totalOrganicPosts: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  totalOrganicViews: z.union([ z.lazy(() => BigIntNullableWithAggregatesFilterSchema),z.bigint() ]).optional().nullable(),
  totalOrganicInteractions: z.union([ z.lazy(() => BigIntNullableWithAggregatesFilterSchema),z.bigint() ]).optional().nullable(),
  totalAccountPosts: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  totalAccountViews: z.union([ z.lazy(() => BigIntNullableWithAggregatesFilterSchema),z.bigint() ]).optional().nullable(),
  totalAccountInteractions: z.union([ z.lazy(() => BigIntNullableWithAggregatesFilterSchema),z.bigint() ]).optional().nullable(),
  totalAccountComments: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  totalAccountLikes: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  totalAccountRetweets: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  totalAccountReplies: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  totalPostsChange: z.union([ z.lazy(() => FloatNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  totalInteractionsChange: z.union([ z.lazy(() => FloatNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  totalViewsChange: z.union([ z.lazy(() => FloatNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  followersChange: z.union([ z.lazy(() => FloatNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  smartEngagementChange: z.union([ z.lazy(() => FloatNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  fetchedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const KOLSnapshotWhereInputSchema: z.ZodType<Prisma.KOLSnapshotWhereInput> = z.object({
  AND: z.union([ z.lazy(() => KOLSnapshotWhereInputSchema),z.lazy(() => KOLSnapshotWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => KOLSnapshotWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => KOLSnapshotWhereInputSchema),z.lazy(() => KOLSnapshotWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  kolId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  kolScore: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  smartFollowersCount: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  threadsCount: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  engagementRate: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  smartEngagement: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  avgViews: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  avgLikes: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  totalPosts: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  totalViews: z.union([ z.lazy(() => BigIntFilterSchema),z.bigint() ]).optional(),
  totalInteractions: z.union([ z.lazy(() => BigIntFilterSchema),z.bigint() ]).optional(),
  totalOrganicPosts: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  totalOrganicViews: z.union([ z.lazy(() => BigIntFilterSchema),z.bigint() ]).optional(),
  totalOrganicInteractions: z.union([ z.lazy(() => BigIntFilterSchema),z.bigint() ]).optional(),
  totalAccountPosts: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  totalAccountViews: z.union([ z.lazy(() => BigIntFilterSchema),z.bigint() ]).optional(),
  totalAccountInteractions: z.union([ z.lazy(() => BigIntFilterSchema),z.bigint() ]).optional(),
  totalAccountComments: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  totalAccountLikes: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  totalAccountRetweets: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  totalAccountReplies: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  totalPostsChange: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  totalInteractionsChange: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  totalViewsChange: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  followersChange: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  smartEngagementChange: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  fetchedDate: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  kol: z.union([ z.lazy(() => KOLRelationFilterSchema),z.lazy(() => KOLWhereInputSchema) ]).optional(),
}).strict();

export const KOLSnapshotOrderByWithRelationInputSchema: z.ZodType<Prisma.KOLSnapshotOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  kolId: z.lazy(() => SortOrderSchema).optional(),
  kolScore: z.lazy(() => SortOrderSchema).optional(),
  smartFollowersCount: z.lazy(() => SortOrderSchema).optional(),
  threadsCount: z.lazy(() => SortOrderSchema).optional(),
  engagementRate: z.lazy(() => SortOrderSchema).optional(),
  smartEngagement: z.lazy(() => SortOrderSchema).optional(),
  avgViews: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  avgLikes: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  totalPosts: z.lazy(() => SortOrderSchema).optional(),
  totalViews: z.lazy(() => SortOrderSchema).optional(),
  totalInteractions: z.lazy(() => SortOrderSchema).optional(),
  totalOrganicPosts: z.lazy(() => SortOrderSchema).optional(),
  totalOrganicViews: z.lazy(() => SortOrderSchema).optional(),
  totalOrganicInteractions: z.lazy(() => SortOrderSchema).optional(),
  totalAccountPosts: z.lazy(() => SortOrderSchema).optional(),
  totalAccountViews: z.lazy(() => SortOrderSchema).optional(),
  totalAccountInteractions: z.lazy(() => SortOrderSchema).optional(),
  totalAccountComments: z.lazy(() => SortOrderSchema).optional(),
  totalAccountLikes: z.lazy(() => SortOrderSchema).optional(),
  totalAccountRetweets: z.lazy(() => SortOrderSchema).optional(),
  totalAccountReplies: z.lazy(() => SortOrderSchema).optional(),
  totalPostsChange: z.lazy(() => SortOrderSchema).optional(),
  totalInteractionsChange: z.lazy(() => SortOrderSchema).optional(),
  totalViewsChange: z.lazy(() => SortOrderSchema).optional(),
  followersChange: z.lazy(() => SortOrderSchema).optional(),
  smartEngagementChange: z.lazy(() => SortOrderSchema).optional(),
  fetchedDate: z.lazy(() => SortOrderSchema).optional(),
  kol: z.lazy(() => KOLOrderByWithRelationInputSchema).optional()
}).strict();

export const KOLSnapshotWhereUniqueInputSchema: z.ZodType<Prisma.KOLSnapshotWhereUniqueInput> = z.union([
  z.object({
    id: z.string().cuid(),
    kolId_fetchedDate: z.lazy(() => KOLSnapshotKolIdFetchedDateCompoundUniqueInputSchema)
  }),
  z.object({
    id: z.string().cuid(),
  }),
  z.object({
    kolId_fetchedDate: z.lazy(() => KOLSnapshotKolIdFetchedDateCompoundUniqueInputSchema),
  }),
])
.and(z.object({
  id: z.string().cuid().optional(),
  kolId_fetchedDate: z.lazy(() => KOLSnapshotKolIdFetchedDateCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => KOLSnapshotWhereInputSchema),z.lazy(() => KOLSnapshotWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => KOLSnapshotWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => KOLSnapshotWhereInputSchema),z.lazy(() => KOLSnapshotWhereInputSchema).array() ]).optional(),
  kolId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  kolScore: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  smartFollowersCount: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  threadsCount: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  engagementRate: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  smartEngagement: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  avgViews: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  avgLikes: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  totalPosts: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  totalViews: z.union([ z.lazy(() => BigIntFilterSchema),z.bigint() ]).optional(),
  totalInteractions: z.union([ z.lazy(() => BigIntFilterSchema),z.bigint() ]).optional(),
  totalOrganicPosts: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  totalOrganicViews: z.union([ z.lazy(() => BigIntFilterSchema),z.bigint() ]).optional(),
  totalOrganicInteractions: z.union([ z.lazy(() => BigIntFilterSchema),z.bigint() ]).optional(),
  totalAccountPosts: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  totalAccountViews: z.union([ z.lazy(() => BigIntFilterSchema),z.bigint() ]).optional(),
  totalAccountInteractions: z.union([ z.lazy(() => BigIntFilterSchema),z.bigint() ]).optional(),
  totalAccountComments: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  totalAccountLikes: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  totalAccountRetweets: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  totalAccountReplies: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  totalPostsChange: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  totalInteractionsChange: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  totalViewsChange: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  followersChange: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  smartEngagementChange: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  fetchedDate: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  kol: z.union([ z.lazy(() => KOLRelationFilterSchema),z.lazy(() => KOLWhereInputSchema) ]).optional(),
}).strict());

export const KOLSnapshotOrderByWithAggregationInputSchema: z.ZodType<Prisma.KOLSnapshotOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  kolId: z.lazy(() => SortOrderSchema).optional(),
  kolScore: z.lazy(() => SortOrderSchema).optional(),
  smartFollowersCount: z.lazy(() => SortOrderSchema).optional(),
  threadsCount: z.lazy(() => SortOrderSchema).optional(),
  engagementRate: z.lazy(() => SortOrderSchema).optional(),
  smartEngagement: z.lazy(() => SortOrderSchema).optional(),
  avgViews: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  avgLikes: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  totalPosts: z.lazy(() => SortOrderSchema).optional(),
  totalViews: z.lazy(() => SortOrderSchema).optional(),
  totalInteractions: z.lazy(() => SortOrderSchema).optional(),
  totalOrganicPosts: z.lazy(() => SortOrderSchema).optional(),
  totalOrganicViews: z.lazy(() => SortOrderSchema).optional(),
  totalOrganicInteractions: z.lazy(() => SortOrderSchema).optional(),
  totalAccountPosts: z.lazy(() => SortOrderSchema).optional(),
  totalAccountViews: z.lazy(() => SortOrderSchema).optional(),
  totalAccountInteractions: z.lazy(() => SortOrderSchema).optional(),
  totalAccountComments: z.lazy(() => SortOrderSchema).optional(),
  totalAccountLikes: z.lazy(() => SortOrderSchema).optional(),
  totalAccountRetweets: z.lazy(() => SortOrderSchema).optional(),
  totalAccountReplies: z.lazy(() => SortOrderSchema).optional(),
  totalPostsChange: z.lazy(() => SortOrderSchema).optional(),
  totalInteractionsChange: z.lazy(() => SortOrderSchema).optional(),
  totalViewsChange: z.lazy(() => SortOrderSchema).optional(),
  followersChange: z.lazy(() => SortOrderSchema).optional(),
  smartEngagementChange: z.lazy(() => SortOrderSchema).optional(),
  fetchedDate: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => KOLSnapshotCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => KOLSnapshotAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => KOLSnapshotMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => KOLSnapshotMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => KOLSnapshotSumOrderByAggregateInputSchema).optional()
}).strict();

export const KOLSnapshotScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.KOLSnapshotScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => KOLSnapshotScalarWhereWithAggregatesInputSchema),z.lazy(() => KOLSnapshotScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => KOLSnapshotScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => KOLSnapshotScalarWhereWithAggregatesInputSchema),z.lazy(() => KOLSnapshotScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  kolId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  kolScore: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
  smartFollowersCount: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  threadsCount: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  engagementRate: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
  smartEngagement: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
  avgViews: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  avgLikes: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  totalPosts: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  totalViews: z.union([ z.lazy(() => BigIntWithAggregatesFilterSchema),z.bigint() ]).optional(),
  totalInteractions: z.union([ z.lazy(() => BigIntWithAggregatesFilterSchema),z.bigint() ]).optional(),
  totalOrganicPosts: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  totalOrganicViews: z.union([ z.lazy(() => BigIntWithAggregatesFilterSchema),z.bigint() ]).optional(),
  totalOrganicInteractions: z.union([ z.lazy(() => BigIntWithAggregatesFilterSchema),z.bigint() ]).optional(),
  totalAccountPosts: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  totalAccountViews: z.union([ z.lazy(() => BigIntWithAggregatesFilterSchema),z.bigint() ]).optional(),
  totalAccountInteractions: z.union([ z.lazy(() => BigIntWithAggregatesFilterSchema),z.bigint() ]).optional(),
  totalAccountComments: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  totalAccountLikes: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  totalAccountRetweets: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  totalAccountReplies: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  totalPostsChange: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
  totalInteractionsChange: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
  totalViewsChange: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
  followersChange: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
  smartEngagementChange: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
  fetchedDate: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const KOLToProjectWhereInputSchema: z.ZodType<Prisma.KOLToProjectWhereInput> = z.object({
  AND: z.union([ z.lazy(() => KOLToProjectWhereInputSchema),z.lazy(() => KOLToProjectWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => KOLToProjectWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => KOLToProjectWhereInputSchema),z.lazy(() => KOLToProjectWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  kolId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  projectId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  totalPosts: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  totalViews: z.union([ z.lazy(() => BigIntFilterSchema),z.bigint() ]).optional(),
  totalInteractions: z.union([ z.lazy(() => BigIntFilterSchema),z.bigint() ]).optional(),
  totalComments: z.union([ z.lazy(() => BigIntFilterSchema),z.bigint() ]).optional(),
  qualityScore: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  proofOfWork: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  mindoMetric: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  fetchedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  kol: z.union([ z.lazy(() => KOLRelationFilterSchema),z.lazy(() => KOLWhereInputSchema) ]).optional(),
  project: z.union([ z.lazy(() => ProjectRelationFilterSchema),z.lazy(() => ProjectWhereInputSchema) ]).optional(),
}).strict();

export const KOLToProjectOrderByWithRelationInputSchema: z.ZodType<Prisma.KOLToProjectOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  kolId: z.lazy(() => SortOrderSchema).optional(),
  projectId: z.lazy(() => SortOrderSchema).optional(),
  totalPosts: z.lazy(() => SortOrderSchema).optional(),
  totalViews: z.lazy(() => SortOrderSchema).optional(),
  totalInteractions: z.lazy(() => SortOrderSchema).optional(),
  totalComments: z.lazy(() => SortOrderSchema).optional(),
  qualityScore: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  proofOfWork: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  mindoMetric: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  fetchedAt: z.lazy(() => SortOrderSchema).optional(),
  kol: z.lazy(() => KOLOrderByWithRelationInputSchema).optional(),
  project: z.lazy(() => ProjectOrderByWithRelationInputSchema).optional()
}).strict();

export const KOLToProjectWhereUniqueInputSchema: z.ZodType<Prisma.KOLToProjectWhereUniqueInput> = z.union([
  z.object({
    id: z.string().cuid(),
    kolId_projectId: z.lazy(() => KOLToProjectKolIdProjectIdCompoundUniqueInputSchema)
  }),
  z.object({
    id: z.string().cuid(),
  }),
  z.object({
    kolId_projectId: z.lazy(() => KOLToProjectKolIdProjectIdCompoundUniqueInputSchema),
  }),
])
.and(z.object({
  id: z.string().cuid().optional(),
  kolId_projectId: z.lazy(() => KOLToProjectKolIdProjectIdCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => KOLToProjectWhereInputSchema),z.lazy(() => KOLToProjectWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => KOLToProjectWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => KOLToProjectWhereInputSchema),z.lazy(() => KOLToProjectWhereInputSchema).array() ]).optional(),
  kolId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  projectId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  totalPosts: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  totalViews: z.union([ z.lazy(() => BigIntFilterSchema),z.bigint() ]).optional(),
  totalInteractions: z.union([ z.lazy(() => BigIntFilterSchema),z.bigint() ]).optional(),
  totalComments: z.union([ z.lazy(() => BigIntFilterSchema),z.bigint() ]).optional(),
  qualityScore: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  proofOfWork: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  mindoMetric: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  fetchedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  kol: z.union([ z.lazy(() => KOLRelationFilterSchema),z.lazy(() => KOLWhereInputSchema) ]).optional(),
  project: z.union([ z.lazy(() => ProjectRelationFilterSchema),z.lazy(() => ProjectWhereInputSchema) ]).optional(),
}).strict());

export const KOLToProjectOrderByWithAggregationInputSchema: z.ZodType<Prisma.KOLToProjectOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  kolId: z.lazy(() => SortOrderSchema).optional(),
  projectId: z.lazy(() => SortOrderSchema).optional(),
  totalPosts: z.lazy(() => SortOrderSchema).optional(),
  totalViews: z.lazy(() => SortOrderSchema).optional(),
  totalInteractions: z.lazy(() => SortOrderSchema).optional(),
  totalComments: z.lazy(() => SortOrderSchema).optional(),
  qualityScore: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  proofOfWork: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  mindoMetric: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  fetchedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => KOLToProjectCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => KOLToProjectAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => KOLToProjectMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => KOLToProjectMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => KOLToProjectSumOrderByAggregateInputSchema).optional()
}).strict();

export const KOLToProjectScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.KOLToProjectScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => KOLToProjectScalarWhereWithAggregatesInputSchema),z.lazy(() => KOLToProjectScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => KOLToProjectScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => KOLToProjectScalarWhereWithAggregatesInputSchema),z.lazy(() => KOLToProjectScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  kolId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  projectId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  totalPosts: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  totalViews: z.union([ z.lazy(() => BigIntWithAggregatesFilterSchema),z.bigint() ]).optional(),
  totalInteractions: z.union([ z.lazy(() => BigIntWithAggregatesFilterSchema),z.bigint() ]).optional(),
  totalComments: z.union([ z.lazy(() => BigIntWithAggregatesFilterSchema),z.bigint() ]).optional(),
  qualityScore: z.union([ z.lazy(() => FloatNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  proofOfWork: z.union([ z.lazy(() => FloatNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  mindoMetric: z.union([ z.lazy(() => FloatNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  fetchedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const RewardPoolWhereInputSchema: z.ZodType<Prisma.RewardPoolWhereInput> = z.object({
  AND: z.union([ z.lazy(() => RewardPoolWhereInputSchema),z.lazy(() => RewardPoolWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => RewardPoolWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RewardPoolWhereInputSchema),z.lazy(() => RewardPoolWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  reward: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  rewardRate: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  rewardUnit: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  deadline: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  platforms: z.lazy(() => StringNullableListFilterSchema).optional(),
  status: z.union([ z.lazy(() => EnumRewardPoolStatusFilterSchema),z.lazy(() => RewardPoolStatusSchema) ]).optional(),
  totalAmountUsd: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  paidOutUsd: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  campaignTargetViews: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  participantsCount: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  completedCount: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  requirements: z.lazy(() => StringNullableListFilterSchema).optional(),
  projectId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  project: z.union([ z.lazy(() => ProjectRelationFilterSchema),z.lazy(() => ProjectWhereInputSchema) ]).optional(),
}).strict();

export const RewardPoolOrderByWithRelationInputSchema: z.ZodType<Prisma.RewardPoolOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  reward: z.lazy(() => SortOrderSchema).optional(),
  rewardRate: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  rewardUnit: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  deadline: z.lazy(() => SortOrderSchema).optional(),
  platforms: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  totalAmountUsd: z.lazy(() => SortOrderSchema).optional(),
  paidOutUsd: z.lazy(() => SortOrderSchema).optional(),
  campaignTargetViews: z.lazy(() => SortOrderSchema).optional(),
  participantsCount: z.lazy(() => SortOrderSchema).optional(),
  completedCount: z.lazy(() => SortOrderSchema).optional(),
  requirements: z.lazy(() => SortOrderSchema).optional(),
  projectId: z.lazy(() => SortOrderSchema).optional(),
  project: z.lazy(() => ProjectOrderByWithRelationInputSchema).optional()
}).strict();

export const RewardPoolWhereUniqueInputSchema: z.ZodType<Prisma.RewardPoolWhereUniqueInput> = z.object({
  id: z.string().cuid()
})
.and(z.object({
  id: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => RewardPoolWhereInputSchema),z.lazy(() => RewardPoolWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => RewardPoolWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RewardPoolWhereInputSchema),z.lazy(() => RewardPoolWhereInputSchema).array() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  reward: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  rewardRate: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  rewardUnit: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  deadline: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  platforms: z.lazy(() => StringNullableListFilterSchema).optional(),
  status: z.union([ z.lazy(() => EnumRewardPoolStatusFilterSchema),z.lazy(() => RewardPoolStatusSchema) ]).optional(),
  totalAmountUsd: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  paidOutUsd: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  campaignTargetViews: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  participantsCount: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  completedCount: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  requirements: z.lazy(() => StringNullableListFilterSchema).optional(),
  projectId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  project: z.union([ z.lazy(() => ProjectRelationFilterSchema),z.lazy(() => ProjectWhereInputSchema) ]).optional(),
}).strict());

export const RewardPoolOrderByWithAggregationInputSchema: z.ZodType<Prisma.RewardPoolOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  reward: z.lazy(() => SortOrderSchema).optional(),
  rewardRate: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  rewardUnit: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  deadline: z.lazy(() => SortOrderSchema).optional(),
  platforms: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  totalAmountUsd: z.lazy(() => SortOrderSchema).optional(),
  paidOutUsd: z.lazy(() => SortOrderSchema).optional(),
  campaignTargetViews: z.lazy(() => SortOrderSchema).optional(),
  participantsCount: z.lazy(() => SortOrderSchema).optional(),
  completedCount: z.lazy(() => SortOrderSchema).optional(),
  requirements: z.lazy(() => SortOrderSchema).optional(),
  projectId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => RewardPoolCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => RewardPoolAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => RewardPoolMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => RewardPoolMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => RewardPoolSumOrderByAggregateInputSchema).optional()
}).strict();

export const RewardPoolScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.RewardPoolScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => RewardPoolScalarWhereWithAggregatesInputSchema),z.lazy(() => RewardPoolScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => RewardPoolScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RewardPoolScalarWhereWithAggregatesInputSchema),z.lazy(() => RewardPoolScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  reward: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  rewardRate: z.union([ z.lazy(() => FloatNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  rewardUnit: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  deadline: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  platforms: z.lazy(() => StringNullableListFilterSchema).optional(),
  status: z.union([ z.lazy(() => EnumRewardPoolStatusWithAggregatesFilterSchema),z.lazy(() => RewardPoolStatusSchema) ]).optional(),
  totalAmountUsd: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
  paidOutUsd: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
  campaignTargetViews: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  participantsCount: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  completedCount: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  requirements: z.lazy(() => StringNullableListFilterSchema).optional(),
  projectId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const LogWhereInputSchema: z.ZodType<Prisma.LogWhereInput> = z.object({
  AND: z.union([ z.lazy(() => LogWhereInputSchema),z.lazy(() => LogWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => LogWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => LogWhereInputSchema),z.lazy(() => LogWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  level: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  message: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  url: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  timestamp: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const LogOrderByWithRelationInputSchema: z.ZodType<Prisma.LogOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  level: z.lazy(() => SortOrderSchema).optional(),
  message: z.lazy(() => SortOrderSchema).optional(),
  url: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  timestamp: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const LogWhereUniqueInputSchema: z.ZodType<Prisma.LogWhereUniqueInput> = z.object({
  id: z.string().cuid()
})
.and(z.object({
  id: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => LogWhereInputSchema),z.lazy(() => LogWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => LogWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => LogWhereInputSchema),z.lazy(() => LogWhereInputSchema).array() ]).optional(),
  level: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  message: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  url: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  timestamp: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict());

export const LogOrderByWithAggregationInputSchema: z.ZodType<Prisma.LogOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  level: z.lazy(() => SortOrderSchema).optional(),
  message: z.lazy(() => SortOrderSchema).optional(),
  url: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  timestamp: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => LogCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => LogMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => LogMinOrderByAggregateInputSchema).optional()
}).strict();

export const LogScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.LogScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => LogScalarWhereWithAggregatesInputSchema),z.lazy(() => LogScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => LogScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => LogScalarWhereWithAggregatesInputSchema),z.lazy(() => LogScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  level: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  message: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  url: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  timestamp: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const AdminUserCreateInputSchema: z.ZodType<Prisma.AdminUserCreateInput> = z.object({
  username: z.string(),
  password: z.string(),
  role: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const AdminUserUncheckedCreateInputSchema: z.ZodType<Prisma.AdminUserUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  username: z.string(),
  password: z.string(),
  role: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const AdminUserUpdateInputSchema: z.ZodType<Prisma.AdminUserUpdateInput> = z.object({
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AdminUserUncheckedUpdateInputSchema: z.ZodType<Prisma.AdminUserUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AdminUserCreateManyInputSchema: z.ZodType<Prisma.AdminUserCreateManyInput> = z.object({
  id: z.number().int().optional(),
  username: z.string(),
  password: z.string(),
  role: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const AdminUserUpdateManyMutationInputSchema: z.ZodType<Prisma.AdminUserUpdateManyMutationInput> = z.object({
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AdminUserUncheckedUpdateManyInputSchema: z.ZodType<Prisma.AdminUserUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserCreateInputSchema: z.ZodType<Prisma.UserCreateInput> = z.object({
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  username: z.string().optional().nullable(),
  avatarUrl: z.string().optional().nullable(),
  platform: z.string().optional(),
  email: z.string().optional().nullable(),
  twitterHandle: z.string().optional().nullable(),
  referralCode: z.string().cuid().optional(),
  onboardingStep: z.number().int().optional(),
  completedTasks: z.number().int().optional(),
  earnedPoints: z.number().int().optional(),
  referredBy: z.lazy(() => UserCreateNestedOneWithoutReferralsInputSchema).optional(),
  referrals: z.lazy(() => UserCreateNestedManyWithoutReferredByInputSchema).optional(),
  kol: z.lazy(() => KOLCreateNestedOneWithoutUserInputSchema).optional(),
  wallets: z.lazy(() => WalletCreateNestedManyWithoutUserInputSchema).optional(),
  primaryWallet: z.lazy(() => WalletCreateNestedOneWithoutPrimaryForInputSchema).optional()
}).strict();

export const UserUncheckedCreateInputSchema: z.ZodType<Prisma.UserUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  username: z.string().optional().nullable(),
  avatarUrl: z.string().optional().nullable(),
  platform: z.string().optional(),
  email: z.string().optional().nullable(),
  twitterHandle: z.string().optional().nullable(),
  referralCode: z.string().cuid().optional(),
  referredById: z.number().int().optional().nullable(),
  onboardingStep: z.number().int().optional(),
  completedTasks: z.number().int().optional(),
  earnedPoints: z.number().int().optional(),
  kolId: z.string().optional().nullable(),
  primaryWalletId: z.number().int().optional().nullable(),
  referrals: z.lazy(() => UserUncheckedCreateNestedManyWithoutReferredByInputSchema).optional(),
  wallets: z.lazy(() => WalletUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUpdateInputSchema: z.ZodType<Prisma.UserUpdateInput> = z.object({
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  avatarUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  platform: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  twitterHandle: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  referralCode: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  onboardingStep: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  completedTasks: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  earnedPoints: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  referredBy: z.lazy(() => UserUpdateOneWithoutReferralsNestedInputSchema).optional(),
  referrals: z.lazy(() => UserUpdateManyWithoutReferredByNestedInputSchema).optional(),
  kol: z.lazy(() => KOLUpdateOneWithoutUserNestedInputSchema).optional(),
  wallets: z.lazy(() => WalletUpdateManyWithoutUserNestedInputSchema).optional(),
  primaryWallet: z.lazy(() => WalletUpdateOneWithoutPrimaryForNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateInputSchema: z.ZodType<Prisma.UserUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  avatarUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  platform: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  twitterHandle: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  referralCode: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  referredById: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  onboardingStep: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  completedTasks: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  earnedPoints: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  kolId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  primaryWalletId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  referrals: z.lazy(() => UserUncheckedUpdateManyWithoutReferredByNestedInputSchema).optional(),
  wallets: z.lazy(() => WalletUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserCreateManyInputSchema: z.ZodType<Prisma.UserCreateManyInput> = z.object({
  id: z.number().int().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  username: z.string().optional().nullable(),
  avatarUrl: z.string().optional().nullable(),
  platform: z.string().optional(),
  email: z.string().optional().nullable(),
  twitterHandle: z.string().optional().nullable(),
  referralCode: z.string().cuid().optional(),
  referredById: z.number().int().optional().nullable(),
  onboardingStep: z.number().int().optional(),
  completedTasks: z.number().int().optional(),
  earnedPoints: z.number().int().optional(),
  kolId: z.string().optional().nullable(),
  primaryWalletId: z.number().int().optional().nullable()
}).strict();

export const UserUpdateManyMutationInputSchema: z.ZodType<Prisma.UserUpdateManyMutationInput> = z.object({
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  avatarUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  platform: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  twitterHandle: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  referralCode: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  onboardingStep: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  completedTasks: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  earnedPoints: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  avatarUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  platform: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  twitterHandle: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  referralCode: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  referredById: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  onboardingStep: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  completedTasks: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  earnedPoints: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  kolId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  primaryWalletId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const WalletCreateInputSchema: z.ZodType<Prisma.WalletCreateInput> = z.object({
  address: z.string(),
  chain: z.string(),
  verified: z.boolean().optional(),
  label: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutWalletsInputSchema),
  primaryFor: z.lazy(() => UserCreateNestedOneWithoutPrimaryWalletInputSchema).optional()
}).strict();

export const WalletUncheckedCreateInputSchema: z.ZodType<Prisma.WalletUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  address: z.string(),
  chain: z.string(),
  userId: z.number().int(),
  verified: z.boolean().optional(),
  label: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  primaryFor: z.lazy(() => UserUncheckedCreateNestedOneWithoutPrimaryWalletInputSchema).optional()
}).strict();

export const WalletUpdateInputSchema: z.ZodType<Prisma.WalletUpdateInput> = z.object({
  address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  chain: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  verified: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  label: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutWalletsNestedInputSchema).optional(),
  primaryFor: z.lazy(() => UserUpdateOneWithoutPrimaryWalletNestedInputSchema).optional()
}).strict();

export const WalletUncheckedUpdateInputSchema: z.ZodType<Prisma.WalletUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  chain: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  verified: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  label: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  primaryFor: z.lazy(() => UserUncheckedUpdateOneWithoutPrimaryWalletNestedInputSchema).optional()
}).strict();

export const WalletCreateManyInputSchema: z.ZodType<Prisma.WalletCreateManyInput> = z.object({
  id: z.number().int().optional(),
  address: z.string(),
  chain: z.string(),
  userId: z.number().int(),
  verified: z.boolean().optional(),
  label: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional()
}).strict();

export const WalletUpdateManyMutationInputSchema: z.ZodType<Prisma.WalletUpdateManyMutationInput> = z.object({
  address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  chain: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  verified: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  label: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const WalletUncheckedUpdateManyInputSchema: z.ZodType<Prisma.WalletUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  chain: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  verified: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  label: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const NarrativeCreateInputSchema: z.ZodType<Prisma.NarrativeCreateInput> = z.object({
  id: z.string().cuid().optional(),
  narrativeId: z.string(),
  name: z.string(),
  slug: z.string(),
  description: z.string().optional().nullable(),
  projectCount: z.number().int(),
  totalViews: z.number(),
  totalPosts: z.number().int(),
  totalMarketCapUsd: z.number(),
  marketCapChange24h: z.number(),
  marketCapChange7d: z.number(),
  marketCapChange30d: z.number(),
  marketCapChange90d: z.number(),
  mindsharePercent: z.number(),
  mindshareChange24h: z.number(),
  mindshareChange7d: z.number(),
  mindshareChange30d: z.number(),
  mindshareChange90d: z.number(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  fetchedAt: z.coerce.date().optional(),
  projectLinks: z.lazy(() => ProjectToNarrativeCreateNestedManyWithoutNarrativeInputSchema).optional(),
  narrativeSnapshot: z.lazy(() => NarrativeSnapshotCreateNestedManyWithoutNarrativeInputSchema).optional(),
  projectSnapshot: z.lazy(() => ProjectSnapshotCreateNestedManyWithoutNarrativeInputSchema).optional()
}).strict();

export const NarrativeUncheckedCreateInputSchema: z.ZodType<Prisma.NarrativeUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  narrativeId: z.string(),
  name: z.string(),
  slug: z.string(),
  description: z.string().optional().nullable(),
  projectCount: z.number().int(),
  totalViews: z.number(),
  totalPosts: z.number().int(),
  totalMarketCapUsd: z.number(),
  marketCapChange24h: z.number(),
  marketCapChange7d: z.number(),
  marketCapChange30d: z.number(),
  marketCapChange90d: z.number(),
  mindsharePercent: z.number(),
  mindshareChange24h: z.number(),
  mindshareChange7d: z.number(),
  mindshareChange30d: z.number(),
  mindshareChange90d: z.number(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  fetchedAt: z.coerce.date().optional(),
  projectLinks: z.lazy(() => ProjectToNarrativeUncheckedCreateNestedManyWithoutNarrativeInputSchema).optional(),
  narrativeSnapshot: z.lazy(() => NarrativeSnapshotUncheckedCreateNestedManyWithoutNarrativeInputSchema).optional(),
  projectSnapshot: z.lazy(() => ProjectSnapshotUncheckedCreateNestedManyWithoutNarrativeInputSchema).optional()
}).strict();

export const NarrativeUpdateInputSchema: z.ZodType<Prisma.NarrativeUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  narrativeId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  projectCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  totalViews: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  totalPosts: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  totalMarketCapUsd: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  marketCapChange24h: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  marketCapChange7d: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  marketCapChange30d: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  marketCapChange90d: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  mindsharePercent: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  mindshareChange24h: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  mindshareChange7d: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  mindshareChange30d: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  mindshareChange90d: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  fetchedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  projectLinks: z.lazy(() => ProjectToNarrativeUpdateManyWithoutNarrativeNestedInputSchema).optional(),
  narrativeSnapshot: z.lazy(() => NarrativeSnapshotUpdateManyWithoutNarrativeNestedInputSchema).optional(),
  projectSnapshot: z.lazy(() => ProjectSnapshotUpdateManyWithoutNarrativeNestedInputSchema).optional()
}).strict();

export const NarrativeUncheckedUpdateInputSchema: z.ZodType<Prisma.NarrativeUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  narrativeId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  projectCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  totalViews: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  totalPosts: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  totalMarketCapUsd: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  marketCapChange24h: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  marketCapChange7d: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  marketCapChange30d: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  marketCapChange90d: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  mindsharePercent: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  mindshareChange24h: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  mindshareChange7d: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  mindshareChange30d: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  mindshareChange90d: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  fetchedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  projectLinks: z.lazy(() => ProjectToNarrativeUncheckedUpdateManyWithoutNarrativeNestedInputSchema).optional(),
  narrativeSnapshot: z.lazy(() => NarrativeSnapshotUncheckedUpdateManyWithoutNarrativeNestedInputSchema).optional(),
  projectSnapshot: z.lazy(() => ProjectSnapshotUncheckedUpdateManyWithoutNarrativeNestedInputSchema).optional()
}).strict();

export const NarrativeCreateManyInputSchema: z.ZodType<Prisma.NarrativeCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  narrativeId: z.string(),
  name: z.string(),
  slug: z.string(),
  description: z.string().optional().nullable(),
  projectCount: z.number().int(),
  totalViews: z.number(),
  totalPosts: z.number().int(),
  totalMarketCapUsd: z.number(),
  marketCapChange24h: z.number(),
  marketCapChange7d: z.number(),
  marketCapChange30d: z.number(),
  marketCapChange90d: z.number(),
  mindsharePercent: z.number(),
  mindshareChange24h: z.number(),
  mindshareChange7d: z.number(),
  mindshareChange30d: z.number(),
  mindshareChange90d: z.number(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  fetchedAt: z.coerce.date().optional()
}).strict();

export const NarrativeUpdateManyMutationInputSchema: z.ZodType<Prisma.NarrativeUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  narrativeId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  projectCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  totalViews: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  totalPosts: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  totalMarketCapUsd: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  marketCapChange24h: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  marketCapChange7d: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  marketCapChange30d: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  marketCapChange90d: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  mindsharePercent: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  mindshareChange24h: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  mindshareChange7d: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  mindshareChange30d: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  mindshareChange90d: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  fetchedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const NarrativeUncheckedUpdateManyInputSchema: z.ZodType<Prisma.NarrativeUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  narrativeId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  projectCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  totalViews: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  totalPosts: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  totalMarketCapUsd: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  marketCapChange24h: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  marketCapChange7d: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  marketCapChange30d: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  marketCapChange90d: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  mindsharePercent: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  mindshareChange24h: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  mindshareChange7d: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  mindshareChange30d: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  mindshareChange90d: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  fetchedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const NarrativeSnapshotCreateInputSchema: z.ZodType<Prisma.NarrativeSnapshotCreateInput> = z.object({
  id: z.string().cuid().optional(),
  projectCount: z.number().int(),
  totalViews: z.number(),
  totalPosts: z.number().int(),
  totalMarketCapUsd: z.number(),
  marketCapChange24h: z.number(),
  marketCapChange7d: z.number(),
  marketCapChange30d: z.number(),
  marketCapChange90d: z.number(),
  mindsharePercent: z.number(),
  mindshareChange24h: z.number(),
  mindshareChange7d: z.number(),
  mindshareChange30d: z.number(),
  mindshareChange90d: z.number(),
  source: z.string(),
  updatedBy: z.string(),
  fetchedDate: z.string(),
  narrative: z.lazy(() => NarrativeCreateNestedOneWithoutNarrativeSnapshotInputSchema)
}).strict();

export const NarrativeSnapshotUncheckedCreateInputSchema: z.ZodType<Prisma.NarrativeSnapshotUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  narrativeId: z.string(),
  projectCount: z.number().int(),
  totalViews: z.number(),
  totalPosts: z.number().int(),
  totalMarketCapUsd: z.number(),
  marketCapChange24h: z.number(),
  marketCapChange7d: z.number(),
  marketCapChange30d: z.number(),
  marketCapChange90d: z.number(),
  mindsharePercent: z.number(),
  mindshareChange24h: z.number(),
  mindshareChange7d: z.number(),
  mindshareChange30d: z.number(),
  mindshareChange90d: z.number(),
  source: z.string(),
  updatedBy: z.string(),
  fetchedDate: z.string()
}).strict();

export const NarrativeSnapshotUpdateInputSchema: z.ZodType<Prisma.NarrativeSnapshotUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  projectCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  totalViews: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  totalPosts: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  totalMarketCapUsd: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  marketCapChange24h: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  marketCapChange7d: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  marketCapChange30d: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  marketCapChange90d: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  mindsharePercent: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  mindshareChange24h: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  mindshareChange7d: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  mindshareChange30d: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  mindshareChange90d: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  source: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  updatedBy: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  fetchedDate: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  narrative: z.lazy(() => NarrativeUpdateOneRequiredWithoutNarrativeSnapshotNestedInputSchema).optional()
}).strict();

export const NarrativeSnapshotUncheckedUpdateInputSchema: z.ZodType<Prisma.NarrativeSnapshotUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  narrativeId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  projectCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  totalViews: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  totalPosts: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  totalMarketCapUsd: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  marketCapChange24h: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  marketCapChange7d: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  marketCapChange30d: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  marketCapChange90d: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  mindsharePercent: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  mindshareChange24h: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  mindshareChange7d: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  mindshareChange30d: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  mindshareChange90d: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  source: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  updatedBy: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  fetchedDate: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const NarrativeSnapshotCreateManyInputSchema: z.ZodType<Prisma.NarrativeSnapshotCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  narrativeId: z.string(),
  projectCount: z.number().int(),
  totalViews: z.number(),
  totalPosts: z.number().int(),
  totalMarketCapUsd: z.number(),
  marketCapChange24h: z.number(),
  marketCapChange7d: z.number(),
  marketCapChange30d: z.number(),
  marketCapChange90d: z.number(),
  mindsharePercent: z.number(),
  mindshareChange24h: z.number(),
  mindshareChange7d: z.number(),
  mindshareChange30d: z.number(),
  mindshareChange90d: z.number(),
  source: z.string(),
  updatedBy: z.string(),
  fetchedDate: z.string()
}).strict();

export const NarrativeSnapshotUpdateManyMutationInputSchema: z.ZodType<Prisma.NarrativeSnapshotUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  projectCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  totalViews: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  totalPosts: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  totalMarketCapUsd: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  marketCapChange24h: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  marketCapChange7d: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  marketCapChange30d: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  marketCapChange90d: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  mindsharePercent: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  mindshareChange24h: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  mindshareChange7d: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  mindshareChange30d: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  mindshareChange90d: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  source: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  updatedBy: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  fetchedDate: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const NarrativeSnapshotUncheckedUpdateManyInputSchema: z.ZodType<Prisma.NarrativeSnapshotUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  narrativeId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  projectCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  totalViews: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  totalPosts: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  totalMarketCapUsd: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  marketCapChange24h: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  marketCapChange7d: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  marketCapChange30d: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  marketCapChange90d: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  mindsharePercent: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  mindshareChange24h: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  mindshareChange7d: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  mindshareChange30d: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  mindshareChange90d: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  source: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  updatedBy: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  fetchedDate: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ProjectCreateInputSchema: z.ZodType<Prisma.ProjectCreateInput> = z.object({
  id: z.string().optional(),
  stage: z.string().optional().nullable(),
  featured: z.boolean().optional(),
  hidden: z.boolean().optional(),
  mindshare: z.number(),
  twitterId: z.string(),
  twitterUsername: z.string(),
  twitterDisplayName: z.string(),
  twitterAvatarUrl: z.string(),
  twitterDescription: z.string(),
  twitterDescriptionLink: z.string().optional().nullable(),
  twitterFollowersCount: z.number().int(),
  twitterFollowingCount: z.number().int(),
  twitterIsVerified: z.boolean(),
  twitterGoldBadge: z.boolean().optional().nullable(),
  twitterLang: z.string(),
  twitterCreatedAt: z.coerce.date(),
  coinSymbol: z.string(),
  coinMarketCap: z.number(),
  coinPrice: z.number(),
  coinContractAddress: z.string().optional().nullable(),
  coinName: z.string(),
  coinImageUrl: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  fetchedAt: z.coerce.date().optional(),
  projectSnapshot: z.lazy(() => ProjectSnapshotCreateNestedManyWithoutProjectInputSchema).optional(),
  narrativeLinks: z.lazy(() => ProjectToNarrativeCreateNestedManyWithoutProjectInputSchema).optional(),
  rewardPools: z.lazy(() => RewardPoolCreateNestedManyWithoutProjectInputSchema).optional(),
  kols: z.lazy(() => KOLToProjectCreateNestedManyWithoutProjectInputSchema).optional()
}).strict();

export const ProjectUncheckedCreateInputSchema: z.ZodType<Prisma.ProjectUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  stage: z.string().optional().nullable(),
  featured: z.boolean().optional(),
  hidden: z.boolean().optional(),
  mindshare: z.number(),
  twitterId: z.string(),
  twitterUsername: z.string(),
  twitterDisplayName: z.string(),
  twitterAvatarUrl: z.string(),
  twitterDescription: z.string(),
  twitterDescriptionLink: z.string().optional().nullable(),
  twitterFollowersCount: z.number().int(),
  twitterFollowingCount: z.number().int(),
  twitterIsVerified: z.boolean(),
  twitterGoldBadge: z.boolean().optional().nullable(),
  twitterLang: z.string(),
  twitterCreatedAt: z.coerce.date(),
  coinSymbol: z.string(),
  coinMarketCap: z.number(),
  coinPrice: z.number(),
  coinContractAddress: z.string().optional().nullable(),
  coinName: z.string(),
  coinImageUrl: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  fetchedAt: z.coerce.date().optional(),
  projectSnapshot: z.lazy(() => ProjectSnapshotUncheckedCreateNestedManyWithoutProjectInputSchema).optional(),
  narrativeLinks: z.lazy(() => ProjectToNarrativeUncheckedCreateNestedManyWithoutProjectInputSchema).optional(),
  rewardPools: z.lazy(() => RewardPoolUncheckedCreateNestedManyWithoutProjectInputSchema).optional(),
  kols: z.lazy(() => KOLToProjectUncheckedCreateNestedManyWithoutProjectInputSchema).optional()
}).strict();

export const ProjectUpdateInputSchema: z.ZodType<Prisma.ProjectUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  stage: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  featured: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  hidden: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  mindshare: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  twitterId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  twitterUsername: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  twitterDisplayName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  twitterAvatarUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  twitterDescription: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  twitterDescriptionLink: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  twitterFollowersCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  twitterFollowingCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  twitterIsVerified: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  twitterGoldBadge: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  twitterLang: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  twitterCreatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  coinSymbol: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  coinMarketCap: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  coinPrice: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  coinContractAddress: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  coinName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  coinImageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  fetchedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  projectSnapshot: z.lazy(() => ProjectSnapshotUpdateManyWithoutProjectNestedInputSchema).optional(),
  narrativeLinks: z.lazy(() => ProjectToNarrativeUpdateManyWithoutProjectNestedInputSchema).optional(),
  rewardPools: z.lazy(() => RewardPoolUpdateManyWithoutProjectNestedInputSchema).optional(),
  kols: z.lazy(() => KOLToProjectUpdateManyWithoutProjectNestedInputSchema).optional()
}).strict();

export const ProjectUncheckedUpdateInputSchema: z.ZodType<Prisma.ProjectUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  stage: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  featured: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  hidden: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  mindshare: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  twitterId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  twitterUsername: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  twitterDisplayName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  twitterAvatarUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  twitterDescription: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  twitterDescriptionLink: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  twitterFollowersCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  twitterFollowingCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  twitterIsVerified: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  twitterGoldBadge: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  twitterLang: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  twitterCreatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  coinSymbol: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  coinMarketCap: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  coinPrice: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  coinContractAddress: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  coinName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  coinImageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  fetchedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  projectSnapshot: z.lazy(() => ProjectSnapshotUncheckedUpdateManyWithoutProjectNestedInputSchema).optional(),
  narrativeLinks: z.lazy(() => ProjectToNarrativeUncheckedUpdateManyWithoutProjectNestedInputSchema).optional(),
  rewardPools: z.lazy(() => RewardPoolUncheckedUpdateManyWithoutProjectNestedInputSchema).optional(),
  kols: z.lazy(() => KOLToProjectUncheckedUpdateManyWithoutProjectNestedInputSchema).optional()
}).strict();

export const ProjectCreateManyInputSchema: z.ZodType<Prisma.ProjectCreateManyInput> = z.object({
  id: z.string().optional(),
  stage: z.string().optional().nullable(),
  featured: z.boolean().optional(),
  hidden: z.boolean().optional(),
  mindshare: z.number(),
  twitterId: z.string(),
  twitterUsername: z.string(),
  twitterDisplayName: z.string(),
  twitterAvatarUrl: z.string(),
  twitterDescription: z.string(),
  twitterDescriptionLink: z.string().optional().nullable(),
  twitterFollowersCount: z.number().int(),
  twitterFollowingCount: z.number().int(),
  twitterIsVerified: z.boolean(),
  twitterGoldBadge: z.boolean().optional().nullable(),
  twitterLang: z.string(),
  twitterCreatedAt: z.coerce.date(),
  coinSymbol: z.string(),
  coinMarketCap: z.number(),
  coinPrice: z.number(),
  coinContractAddress: z.string().optional().nullable(),
  coinName: z.string(),
  coinImageUrl: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  fetchedAt: z.coerce.date().optional()
}).strict();

export const ProjectUpdateManyMutationInputSchema: z.ZodType<Prisma.ProjectUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  stage: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  featured: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  hidden: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  mindshare: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  twitterId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  twitterUsername: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  twitterDisplayName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  twitterAvatarUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  twitterDescription: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  twitterDescriptionLink: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  twitterFollowersCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  twitterFollowingCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  twitterIsVerified: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  twitterGoldBadge: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  twitterLang: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  twitterCreatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  coinSymbol: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  coinMarketCap: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  coinPrice: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  coinContractAddress: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  coinName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  coinImageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  fetchedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ProjectUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ProjectUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  stage: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  featured: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  hidden: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  mindshare: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  twitterId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  twitterUsername: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  twitterDisplayName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  twitterAvatarUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  twitterDescription: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  twitterDescriptionLink: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  twitterFollowersCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  twitterFollowingCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  twitterIsVerified: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  twitterGoldBadge: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  twitterLang: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  twitterCreatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  coinSymbol: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  coinMarketCap: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  coinPrice: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  coinContractAddress: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  coinName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  coinImageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  fetchedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ProjectSnapshotCreateInputSchema: z.ZodType<Prisma.ProjectSnapshotCreateInput> = z.object({
  id: z.string().cuid().optional(),
  totalViews: z.number().int(),
  totalPosts: z.number().int(),
  mindsharePercent: z.number(),
  mindshareChange24h: z.number(),
  mindshareChange7d: z.number(),
  mindshareChange30d: z.number(),
  mindshareChange90d: z.number(),
  source: z.string(),
  updatedBy: z.string(),
  fetchedDate: z.string(),
  project: z.lazy(() => ProjectCreateNestedOneWithoutProjectSnapshotInputSchema),
  narrative: z.lazy(() => NarrativeCreateNestedOneWithoutProjectSnapshotInputSchema).optional()
}).strict();

export const ProjectSnapshotUncheckedCreateInputSchema: z.ZodType<Prisma.ProjectSnapshotUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  totalViews: z.number().int(),
  totalPosts: z.number().int(),
  mindsharePercent: z.number(),
  mindshareChange24h: z.number(),
  mindshareChange7d: z.number(),
  mindshareChange30d: z.number(),
  mindshareChange90d: z.number(),
  source: z.string(),
  updatedBy: z.string(),
  fetchedDate: z.string(),
  projectId: z.string(),
  narrativeId: z.string().optional().nullable()
}).strict();

export const ProjectSnapshotUpdateInputSchema: z.ZodType<Prisma.ProjectSnapshotUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  totalViews: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  totalPosts: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  mindsharePercent: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  mindshareChange24h: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  mindshareChange7d: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  mindshareChange30d: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  mindshareChange90d: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  source: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  updatedBy: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  fetchedDate: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  project: z.lazy(() => ProjectUpdateOneRequiredWithoutProjectSnapshotNestedInputSchema).optional(),
  narrative: z.lazy(() => NarrativeUpdateOneWithoutProjectSnapshotNestedInputSchema).optional()
}).strict();

export const ProjectSnapshotUncheckedUpdateInputSchema: z.ZodType<Prisma.ProjectSnapshotUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  totalViews: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  totalPosts: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  mindsharePercent: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  mindshareChange24h: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  mindshareChange7d: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  mindshareChange30d: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  mindshareChange90d: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  source: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  updatedBy: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  fetchedDate: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  projectId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  narrativeId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const ProjectSnapshotCreateManyInputSchema: z.ZodType<Prisma.ProjectSnapshotCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  totalViews: z.number().int(),
  totalPosts: z.number().int(),
  mindsharePercent: z.number(),
  mindshareChange24h: z.number(),
  mindshareChange7d: z.number(),
  mindshareChange30d: z.number(),
  mindshareChange90d: z.number(),
  source: z.string(),
  updatedBy: z.string(),
  fetchedDate: z.string(),
  projectId: z.string(),
  narrativeId: z.string().optional().nullable()
}).strict();

export const ProjectSnapshotUpdateManyMutationInputSchema: z.ZodType<Prisma.ProjectSnapshotUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  totalViews: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  totalPosts: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  mindsharePercent: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  mindshareChange24h: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  mindshareChange7d: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  mindshareChange30d: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  mindshareChange90d: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  source: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  updatedBy: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  fetchedDate: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ProjectSnapshotUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ProjectSnapshotUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  totalViews: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  totalPosts: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  mindsharePercent: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  mindshareChange24h: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  mindshareChange7d: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  mindshareChange30d: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  mindshareChange90d: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  source: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  updatedBy: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  fetchedDate: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  projectId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  narrativeId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const ProjectToNarrativeCreateInputSchema: z.ZodType<Prisma.ProjectToNarrativeCreateInput> = z.object({
  id: z.string().optional(),
  totalViews: z.number().int(),
  totalPosts: z.number().int(),
  mindsharePercent: z.number(),
  mindshareChange24h: z.number(),
  mindshareChange7d: z.number(),
  mindshareChange30d: z.number(),
  mindshareChange90d: z.number(),
  createdAt: z.coerce.date().optional(),
  narrative: z.lazy(() => NarrativeCreateNestedOneWithoutProjectLinksInputSchema),
  project: z.lazy(() => ProjectCreateNestedOneWithoutNarrativeLinksInputSchema)
}).strict();

export const ProjectToNarrativeUncheckedCreateInputSchema: z.ZodType<Prisma.ProjectToNarrativeUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  narrativeId: z.string(),
  projectId: z.string(),
  totalViews: z.number().int(),
  totalPosts: z.number().int(),
  mindsharePercent: z.number(),
  mindshareChange24h: z.number(),
  mindshareChange7d: z.number(),
  mindshareChange30d: z.number(),
  mindshareChange90d: z.number(),
  createdAt: z.coerce.date().optional()
}).strict();

export const ProjectToNarrativeUpdateInputSchema: z.ZodType<Prisma.ProjectToNarrativeUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  totalViews: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  totalPosts: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  mindsharePercent: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  mindshareChange24h: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  mindshareChange7d: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  mindshareChange30d: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  mindshareChange90d: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  narrative: z.lazy(() => NarrativeUpdateOneRequiredWithoutProjectLinksNestedInputSchema).optional(),
  project: z.lazy(() => ProjectUpdateOneRequiredWithoutNarrativeLinksNestedInputSchema).optional()
}).strict();

export const ProjectToNarrativeUncheckedUpdateInputSchema: z.ZodType<Prisma.ProjectToNarrativeUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  narrativeId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  projectId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  totalViews: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  totalPosts: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  mindsharePercent: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  mindshareChange24h: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  mindshareChange7d: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  mindshareChange30d: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  mindshareChange90d: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ProjectToNarrativeCreateManyInputSchema: z.ZodType<Prisma.ProjectToNarrativeCreateManyInput> = z.object({
  id: z.string().optional(),
  narrativeId: z.string(),
  projectId: z.string(),
  totalViews: z.number().int(),
  totalPosts: z.number().int(),
  mindsharePercent: z.number(),
  mindshareChange24h: z.number(),
  mindshareChange7d: z.number(),
  mindshareChange30d: z.number(),
  mindshareChange90d: z.number(),
  createdAt: z.coerce.date().optional()
}).strict();

export const ProjectToNarrativeUpdateManyMutationInputSchema: z.ZodType<Prisma.ProjectToNarrativeUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  totalViews: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  totalPosts: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  mindsharePercent: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  mindshareChange24h: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  mindshareChange7d: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  mindshareChange30d: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  mindshareChange90d: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ProjectToNarrativeUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ProjectToNarrativeUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  narrativeId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  projectId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  totalViews: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  totalPosts: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  mindsharePercent: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  mindshareChange24h: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  mindshareChange7d: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  mindshareChange30d: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  mindshareChange90d: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const KOLCreateInputSchema: z.ZodType<Prisma.KOLCreateInput> = z.object({
  id: z.string().optional(),
  hidden: z.boolean().optional(),
  isAlsoProject: z.boolean().optional(),
  twitterId: z.string(),
  twitterUsername: z.string(),
  twitterDisplayName: z.string(),
  twitterAvatarUrl: z.string(),
  twitterDescription: z.string(),
  twitterDescriptionLink: z.string().optional().nullable(),
  twitterFollowersCount: z.number().int(),
  twitterFollowingCount: z.number().int(),
  twitterIsVerified: z.boolean(),
  twitterGoldBadge: z.boolean().optional().nullable(),
  twitterLang: z.string(),
  twitterCreatedAt: z.coerce.date(),
  kolScore: z.number().optional().nullable(),
  kolScorePercentFromTotal: z.number().optional().nullable(),
  smartFollowersCount: z.number().int().optional().nullable(),
  threadsCount: z.number().int().optional().nullable(),
  engagementRate: z.number().optional().nullable(),
  smartEngagement: z.number().optional().nullable(),
  avgViews: z.number().int().optional().nullable(),
  avgLikes: z.number().int().optional().nullable(),
  totalPosts: z.number().int().optional().nullable(),
  totalViews: z.bigint().optional().nullable(),
  totalInteractions: z.bigint().optional().nullable(),
  totalOrganicPosts: z.number().int().optional().nullable(),
  totalOrganicViews: z.bigint().optional().nullable(),
  totalOrganicInteractions: z.bigint().optional().nullable(),
  totalAccountPosts: z.number().int().optional().nullable(),
  totalAccountViews: z.bigint().optional().nullable(),
  totalAccountInteractions: z.bigint().optional().nullable(),
  totalAccountComments: z.number().int().optional().nullable(),
  totalAccountLikes: z.number().int().optional().nullable(),
  totalAccountRetweets: z.number().int().optional().nullable(),
  totalAccountReplies: z.number().int().optional().nullable(),
  totalPostsChange: z.number().optional().nullable(),
  totalInteractionsChange: z.number().optional().nullable(),
  totalViewsChange: z.number().optional().nullable(),
  followersChange: z.number().optional().nullable(),
  smartEngagementChange: z.number().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  fetchedAt: z.coerce.date().optional(),
  projects: z.lazy(() => KOLToProjectCreateNestedManyWithoutKolInputSchema).optional(),
  kolSnapshot: z.lazy(() => KOLSnapshotCreateNestedManyWithoutKolInputSchema).optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutKolInputSchema).optional()
}).strict();

export const KOLUncheckedCreateInputSchema: z.ZodType<Prisma.KOLUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  hidden: z.boolean().optional(),
  isAlsoProject: z.boolean().optional(),
  twitterId: z.string(),
  twitterUsername: z.string(),
  twitterDisplayName: z.string(),
  twitterAvatarUrl: z.string(),
  twitterDescription: z.string(),
  twitterDescriptionLink: z.string().optional().nullable(),
  twitterFollowersCount: z.number().int(),
  twitterFollowingCount: z.number().int(),
  twitterIsVerified: z.boolean(),
  twitterGoldBadge: z.boolean().optional().nullable(),
  twitterLang: z.string(),
  twitterCreatedAt: z.coerce.date(),
  kolScore: z.number().optional().nullable(),
  kolScorePercentFromTotal: z.number().optional().nullable(),
  smartFollowersCount: z.number().int().optional().nullable(),
  threadsCount: z.number().int().optional().nullable(),
  engagementRate: z.number().optional().nullable(),
  smartEngagement: z.number().optional().nullable(),
  avgViews: z.number().int().optional().nullable(),
  avgLikes: z.number().int().optional().nullable(),
  totalPosts: z.number().int().optional().nullable(),
  totalViews: z.bigint().optional().nullable(),
  totalInteractions: z.bigint().optional().nullable(),
  totalOrganicPosts: z.number().int().optional().nullable(),
  totalOrganicViews: z.bigint().optional().nullable(),
  totalOrganicInteractions: z.bigint().optional().nullable(),
  totalAccountPosts: z.number().int().optional().nullable(),
  totalAccountViews: z.bigint().optional().nullable(),
  totalAccountInteractions: z.bigint().optional().nullable(),
  totalAccountComments: z.number().int().optional().nullable(),
  totalAccountLikes: z.number().int().optional().nullable(),
  totalAccountRetweets: z.number().int().optional().nullable(),
  totalAccountReplies: z.number().int().optional().nullable(),
  totalPostsChange: z.number().optional().nullable(),
  totalInteractionsChange: z.number().optional().nullable(),
  totalViewsChange: z.number().optional().nullable(),
  followersChange: z.number().optional().nullable(),
  smartEngagementChange: z.number().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  fetchedAt: z.coerce.date().optional(),
  projects: z.lazy(() => KOLToProjectUncheckedCreateNestedManyWithoutKolInputSchema).optional(),
  kolSnapshot: z.lazy(() => KOLSnapshotUncheckedCreateNestedManyWithoutKolInputSchema).optional(),
  user: z.lazy(() => UserUncheckedCreateNestedOneWithoutKolInputSchema).optional()
}).strict();

export const KOLUpdateInputSchema: z.ZodType<Prisma.KOLUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hidden: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isAlsoProject: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  twitterId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  twitterUsername: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  twitterDisplayName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  twitterAvatarUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  twitterDescription: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  twitterDescriptionLink: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  twitterFollowersCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  twitterFollowingCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  twitterIsVerified: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  twitterGoldBadge: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  twitterLang: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  twitterCreatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  kolScore: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  kolScorePercentFromTotal: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  smartFollowersCount: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  threadsCount: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  engagementRate: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  smartEngagement: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  avgViews: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  avgLikes: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  totalPosts: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  totalViews: z.union([ z.bigint(),z.lazy(() => NullableBigIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  totalInteractions: z.union([ z.bigint(),z.lazy(() => NullableBigIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  totalOrganicPosts: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  totalOrganicViews: z.union([ z.bigint(),z.lazy(() => NullableBigIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  totalOrganicInteractions: z.union([ z.bigint(),z.lazy(() => NullableBigIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  totalAccountPosts: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  totalAccountViews: z.union([ z.bigint(),z.lazy(() => NullableBigIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  totalAccountInteractions: z.union([ z.bigint(),z.lazy(() => NullableBigIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  totalAccountComments: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  totalAccountLikes: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  totalAccountRetweets: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  totalAccountReplies: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  totalPostsChange: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  totalInteractionsChange: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  totalViewsChange: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  followersChange: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  smartEngagementChange: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  fetchedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  projects: z.lazy(() => KOLToProjectUpdateManyWithoutKolNestedInputSchema).optional(),
  kolSnapshot: z.lazy(() => KOLSnapshotUpdateManyWithoutKolNestedInputSchema).optional(),
  user: z.lazy(() => UserUpdateOneWithoutKolNestedInputSchema).optional()
}).strict();

export const KOLUncheckedUpdateInputSchema: z.ZodType<Prisma.KOLUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hidden: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isAlsoProject: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  twitterId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  twitterUsername: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  twitterDisplayName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  twitterAvatarUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  twitterDescription: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  twitterDescriptionLink: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  twitterFollowersCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  twitterFollowingCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  twitterIsVerified: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  twitterGoldBadge: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  twitterLang: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  twitterCreatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  kolScore: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  kolScorePercentFromTotal: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  smartFollowersCount: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  threadsCount: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  engagementRate: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  smartEngagement: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  avgViews: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  avgLikes: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  totalPosts: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  totalViews: z.union([ z.bigint(),z.lazy(() => NullableBigIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  totalInteractions: z.union([ z.bigint(),z.lazy(() => NullableBigIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  totalOrganicPosts: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  totalOrganicViews: z.union([ z.bigint(),z.lazy(() => NullableBigIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  totalOrganicInteractions: z.union([ z.bigint(),z.lazy(() => NullableBigIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  totalAccountPosts: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  totalAccountViews: z.union([ z.bigint(),z.lazy(() => NullableBigIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  totalAccountInteractions: z.union([ z.bigint(),z.lazy(() => NullableBigIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  totalAccountComments: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  totalAccountLikes: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  totalAccountRetweets: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  totalAccountReplies: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  totalPostsChange: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  totalInteractionsChange: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  totalViewsChange: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  followersChange: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  smartEngagementChange: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  fetchedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  projects: z.lazy(() => KOLToProjectUncheckedUpdateManyWithoutKolNestedInputSchema).optional(),
  kolSnapshot: z.lazy(() => KOLSnapshotUncheckedUpdateManyWithoutKolNestedInputSchema).optional(),
  user: z.lazy(() => UserUncheckedUpdateOneWithoutKolNestedInputSchema).optional()
}).strict();

export const KOLCreateManyInputSchema: z.ZodType<Prisma.KOLCreateManyInput> = z.object({
  id: z.string().optional(),
  hidden: z.boolean().optional(),
  isAlsoProject: z.boolean().optional(),
  twitterId: z.string(),
  twitterUsername: z.string(),
  twitterDisplayName: z.string(),
  twitterAvatarUrl: z.string(),
  twitterDescription: z.string(),
  twitterDescriptionLink: z.string().optional().nullable(),
  twitterFollowersCount: z.number().int(),
  twitterFollowingCount: z.number().int(),
  twitterIsVerified: z.boolean(),
  twitterGoldBadge: z.boolean().optional().nullable(),
  twitterLang: z.string(),
  twitterCreatedAt: z.coerce.date(),
  kolScore: z.number().optional().nullable(),
  kolScorePercentFromTotal: z.number().optional().nullable(),
  smartFollowersCount: z.number().int().optional().nullable(),
  threadsCount: z.number().int().optional().nullable(),
  engagementRate: z.number().optional().nullable(),
  smartEngagement: z.number().optional().nullable(),
  avgViews: z.number().int().optional().nullable(),
  avgLikes: z.number().int().optional().nullable(),
  totalPosts: z.number().int().optional().nullable(),
  totalViews: z.bigint().optional().nullable(),
  totalInteractions: z.bigint().optional().nullable(),
  totalOrganicPosts: z.number().int().optional().nullable(),
  totalOrganicViews: z.bigint().optional().nullable(),
  totalOrganicInteractions: z.bigint().optional().nullable(),
  totalAccountPosts: z.number().int().optional().nullable(),
  totalAccountViews: z.bigint().optional().nullable(),
  totalAccountInteractions: z.bigint().optional().nullable(),
  totalAccountComments: z.number().int().optional().nullable(),
  totalAccountLikes: z.number().int().optional().nullable(),
  totalAccountRetweets: z.number().int().optional().nullable(),
  totalAccountReplies: z.number().int().optional().nullable(),
  totalPostsChange: z.number().optional().nullable(),
  totalInteractionsChange: z.number().optional().nullable(),
  totalViewsChange: z.number().optional().nullable(),
  followersChange: z.number().optional().nullable(),
  smartEngagementChange: z.number().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  fetchedAt: z.coerce.date().optional()
}).strict();

export const KOLUpdateManyMutationInputSchema: z.ZodType<Prisma.KOLUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hidden: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isAlsoProject: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  twitterId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  twitterUsername: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  twitterDisplayName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  twitterAvatarUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  twitterDescription: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  twitterDescriptionLink: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  twitterFollowersCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  twitterFollowingCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  twitterIsVerified: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  twitterGoldBadge: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  twitterLang: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  twitterCreatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  kolScore: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  kolScorePercentFromTotal: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  smartFollowersCount: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  threadsCount: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  engagementRate: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  smartEngagement: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  avgViews: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  avgLikes: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  totalPosts: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  totalViews: z.union([ z.bigint(),z.lazy(() => NullableBigIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  totalInteractions: z.union([ z.bigint(),z.lazy(() => NullableBigIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  totalOrganicPosts: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  totalOrganicViews: z.union([ z.bigint(),z.lazy(() => NullableBigIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  totalOrganicInteractions: z.union([ z.bigint(),z.lazy(() => NullableBigIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  totalAccountPosts: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  totalAccountViews: z.union([ z.bigint(),z.lazy(() => NullableBigIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  totalAccountInteractions: z.union([ z.bigint(),z.lazy(() => NullableBigIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  totalAccountComments: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  totalAccountLikes: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  totalAccountRetweets: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  totalAccountReplies: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  totalPostsChange: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  totalInteractionsChange: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  totalViewsChange: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  followersChange: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  smartEngagementChange: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  fetchedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const KOLUncheckedUpdateManyInputSchema: z.ZodType<Prisma.KOLUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hidden: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isAlsoProject: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  twitterId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  twitterUsername: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  twitterDisplayName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  twitterAvatarUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  twitterDescription: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  twitterDescriptionLink: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  twitterFollowersCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  twitterFollowingCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  twitterIsVerified: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  twitterGoldBadge: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  twitterLang: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  twitterCreatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  kolScore: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  kolScorePercentFromTotal: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  smartFollowersCount: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  threadsCount: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  engagementRate: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  smartEngagement: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  avgViews: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  avgLikes: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  totalPosts: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  totalViews: z.union([ z.bigint(),z.lazy(() => NullableBigIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  totalInteractions: z.union([ z.bigint(),z.lazy(() => NullableBigIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  totalOrganicPosts: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  totalOrganicViews: z.union([ z.bigint(),z.lazy(() => NullableBigIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  totalOrganicInteractions: z.union([ z.bigint(),z.lazy(() => NullableBigIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  totalAccountPosts: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  totalAccountViews: z.union([ z.bigint(),z.lazy(() => NullableBigIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  totalAccountInteractions: z.union([ z.bigint(),z.lazy(() => NullableBigIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  totalAccountComments: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  totalAccountLikes: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  totalAccountRetweets: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  totalAccountReplies: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  totalPostsChange: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  totalInteractionsChange: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  totalViewsChange: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  followersChange: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  smartEngagementChange: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  fetchedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const KOLSnapshotCreateInputSchema: z.ZodType<Prisma.KOLSnapshotCreateInput> = z.object({
  id: z.string().cuid().optional(),
  kolScore: z.number(),
  smartFollowersCount: z.number().int(),
  threadsCount: z.number().int(),
  engagementRate: z.number(),
  smartEngagement: z.number(),
  avgViews: z.number().int().optional().nullable(),
  avgLikes: z.number().int().optional().nullable(),
  totalPosts: z.number().int(),
  totalViews: z.bigint(),
  totalInteractions: z.bigint(),
  totalOrganicPosts: z.number().int(),
  totalOrganicViews: z.bigint(),
  totalOrganicInteractions: z.bigint(),
  totalAccountPosts: z.number().int(),
  totalAccountViews: z.bigint(),
  totalAccountInteractions: z.bigint(),
  totalAccountComments: z.number().int(),
  totalAccountLikes: z.number().int(),
  totalAccountRetweets: z.number().int(),
  totalAccountReplies: z.number().int(),
  totalPostsChange: z.number(),
  totalInteractionsChange: z.number(),
  totalViewsChange: z.number(),
  followersChange: z.number(),
  smartEngagementChange: z.number(),
  fetchedDate: z.string(),
  kol: z.lazy(() => KOLCreateNestedOneWithoutKolSnapshotInputSchema)
}).strict();

export const KOLSnapshotUncheckedCreateInputSchema: z.ZodType<Prisma.KOLSnapshotUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  kolId: z.string(),
  kolScore: z.number(),
  smartFollowersCount: z.number().int(),
  threadsCount: z.number().int(),
  engagementRate: z.number(),
  smartEngagement: z.number(),
  avgViews: z.number().int().optional().nullable(),
  avgLikes: z.number().int().optional().nullable(),
  totalPosts: z.number().int(),
  totalViews: z.bigint(),
  totalInteractions: z.bigint(),
  totalOrganicPosts: z.number().int(),
  totalOrganicViews: z.bigint(),
  totalOrganicInteractions: z.bigint(),
  totalAccountPosts: z.number().int(),
  totalAccountViews: z.bigint(),
  totalAccountInteractions: z.bigint(),
  totalAccountComments: z.number().int(),
  totalAccountLikes: z.number().int(),
  totalAccountRetweets: z.number().int(),
  totalAccountReplies: z.number().int(),
  totalPostsChange: z.number(),
  totalInteractionsChange: z.number(),
  totalViewsChange: z.number(),
  followersChange: z.number(),
  smartEngagementChange: z.number(),
  fetchedDate: z.string()
}).strict();

export const KOLSnapshotUpdateInputSchema: z.ZodType<Prisma.KOLSnapshotUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  kolScore: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  smartFollowersCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  threadsCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  engagementRate: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  smartEngagement: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  avgViews: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  avgLikes: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  totalPosts: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  totalViews: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
  totalInteractions: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
  totalOrganicPosts: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  totalOrganicViews: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
  totalOrganicInteractions: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
  totalAccountPosts: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  totalAccountViews: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
  totalAccountInteractions: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
  totalAccountComments: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  totalAccountLikes: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  totalAccountRetweets: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  totalAccountReplies: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  totalPostsChange: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  totalInteractionsChange: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  totalViewsChange: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  followersChange: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  smartEngagementChange: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  fetchedDate: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  kol: z.lazy(() => KOLUpdateOneRequiredWithoutKolSnapshotNestedInputSchema).optional()
}).strict();

export const KOLSnapshotUncheckedUpdateInputSchema: z.ZodType<Prisma.KOLSnapshotUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  kolId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  kolScore: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  smartFollowersCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  threadsCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  engagementRate: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  smartEngagement: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  avgViews: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  avgLikes: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  totalPosts: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  totalViews: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
  totalInteractions: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
  totalOrganicPosts: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  totalOrganicViews: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
  totalOrganicInteractions: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
  totalAccountPosts: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  totalAccountViews: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
  totalAccountInteractions: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
  totalAccountComments: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  totalAccountLikes: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  totalAccountRetweets: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  totalAccountReplies: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  totalPostsChange: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  totalInteractionsChange: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  totalViewsChange: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  followersChange: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  smartEngagementChange: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  fetchedDate: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const KOLSnapshotCreateManyInputSchema: z.ZodType<Prisma.KOLSnapshotCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  kolId: z.string(),
  kolScore: z.number(),
  smartFollowersCount: z.number().int(),
  threadsCount: z.number().int(),
  engagementRate: z.number(),
  smartEngagement: z.number(),
  avgViews: z.number().int().optional().nullable(),
  avgLikes: z.number().int().optional().nullable(),
  totalPosts: z.number().int(),
  totalViews: z.bigint(),
  totalInteractions: z.bigint(),
  totalOrganicPosts: z.number().int(),
  totalOrganicViews: z.bigint(),
  totalOrganicInteractions: z.bigint(),
  totalAccountPosts: z.number().int(),
  totalAccountViews: z.bigint(),
  totalAccountInteractions: z.bigint(),
  totalAccountComments: z.number().int(),
  totalAccountLikes: z.number().int(),
  totalAccountRetweets: z.number().int(),
  totalAccountReplies: z.number().int(),
  totalPostsChange: z.number(),
  totalInteractionsChange: z.number(),
  totalViewsChange: z.number(),
  followersChange: z.number(),
  smartEngagementChange: z.number(),
  fetchedDate: z.string()
}).strict();

export const KOLSnapshotUpdateManyMutationInputSchema: z.ZodType<Prisma.KOLSnapshotUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  kolScore: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  smartFollowersCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  threadsCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  engagementRate: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  smartEngagement: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  avgViews: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  avgLikes: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  totalPosts: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  totalViews: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
  totalInteractions: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
  totalOrganicPosts: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  totalOrganicViews: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
  totalOrganicInteractions: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
  totalAccountPosts: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  totalAccountViews: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
  totalAccountInteractions: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
  totalAccountComments: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  totalAccountLikes: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  totalAccountRetweets: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  totalAccountReplies: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  totalPostsChange: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  totalInteractionsChange: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  totalViewsChange: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  followersChange: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  smartEngagementChange: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  fetchedDate: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const KOLSnapshotUncheckedUpdateManyInputSchema: z.ZodType<Prisma.KOLSnapshotUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  kolId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  kolScore: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  smartFollowersCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  threadsCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  engagementRate: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  smartEngagement: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  avgViews: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  avgLikes: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  totalPosts: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  totalViews: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
  totalInteractions: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
  totalOrganicPosts: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  totalOrganicViews: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
  totalOrganicInteractions: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
  totalAccountPosts: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  totalAccountViews: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
  totalAccountInteractions: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
  totalAccountComments: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  totalAccountLikes: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  totalAccountRetweets: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  totalAccountReplies: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  totalPostsChange: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  totalInteractionsChange: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  totalViewsChange: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  followersChange: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  smartEngagementChange: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  fetchedDate: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const KOLToProjectCreateInputSchema: z.ZodType<Prisma.KOLToProjectCreateInput> = z.object({
  id: z.string().cuid().optional(),
  totalPosts: z.number().int(),
  totalViews: z.bigint(),
  totalInteractions: z.bigint(),
  totalComments: z.bigint(),
  qualityScore: z.number().optional().nullable(),
  proofOfWork: z.number().optional().nullable(),
  mindoMetric: z.number().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  fetchedAt: z.coerce.date().optional(),
  kol: z.lazy(() => KOLCreateNestedOneWithoutProjectsInputSchema),
  project: z.lazy(() => ProjectCreateNestedOneWithoutKolsInputSchema)
}).strict();

export const KOLToProjectUncheckedCreateInputSchema: z.ZodType<Prisma.KOLToProjectUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  kolId: z.string(),
  projectId: z.string(),
  totalPosts: z.number().int(),
  totalViews: z.bigint(),
  totalInteractions: z.bigint(),
  totalComments: z.bigint(),
  qualityScore: z.number().optional().nullable(),
  proofOfWork: z.number().optional().nullable(),
  mindoMetric: z.number().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  fetchedAt: z.coerce.date().optional()
}).strict();

export const KOLToProjectUpdateInputSchema: z.ZodType<Prisma.KOLToProjectUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  totalPosts: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  totalViews: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
  totalInteractions: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
  totalComments: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
  qualityScore: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  proofOfWork: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  mindoMetric: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  fetchedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  kol: z.lazy(() => KOLUpdateOneRequiredWithoutProjectsNestedInputSchema).optional(),
  project: z.lazy(() => ProjectUpdateOneRequiredWithoutKolsNestedInputSchema).optional()
}).strict();

export const KOLToProjectUncheckedUpdateInputSchema: z.ZodType<Prisma.KOLToProjectUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  kolId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  projectId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  totalPosts: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  totalViews: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
  totalInteractions: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
  totalComments: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
  qualityScore: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  proofOfWork: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  mindoMetric: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  fetchedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const KOLToProjectCreateManyInputSchema: z.ZodType<Prisma.KOLToProjectCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  kolId: z.string(),
  projectId: z.string(),
  totalPosts: z.number().int(),
  totalViews: z.bigint(),
  totalInteractions: z.bigint(),
  totalComments: z.bigint(),
  qualityScore: z.number().optional().nullable(),
  proofOfWork: z.number().optional().nullable(),
  mindoMetric: z.number().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  fetchedAt: z.coerce.date().optional()
}).strict();

export const KOLToProjectUpdateManyMutationInputSchema: z.ZodType<Prisma.KOLToProjectUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  totalPosts: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  totalViews: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
  totalInteractions: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
  totalComments: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
  qualityScore: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  proofOfWork: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  mindoMetric: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  fetchedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const KOLToProjectUncheckedUpdateManyInputSchema: z.ZodType<Prisma.KOLToProjectUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  kolId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  projectId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  totalPosts: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  totalViews: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
  totalInteractions: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
  totalComments: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
  qualityScore: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  proofOfWork: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  mindoMetric: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  fetchedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RewardPoolCreateInputSchema: z.ZodType<Prisma.RewardPoolCreateInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  description: z.string(),
  reward: z.string(),
  rewardRate: z.number().optional().nullable(),
  rewardUnit: z.string().optional().nullable(),
  deadline: z.coerce.date(),
  platforms: z.union([ z.lazy(() => RewardPoolCreateplatformsInputSchema),z.string().array() ]).optional(),
  status: z.lazy(() => RewardPoolStatusSchema),
  totalAmountUsd: z.number(),
  paidOutUsd: z.number(),
  campaignTargetViews: z.number().int(),
  participantsCount: z.number().int(),
  completedCount: z.number().int(),
  requirements: z.union([ z.lazy(() => RewardPoolCreaterequirementsInputSchema),z.string().array() ]).optional(),
  project: z.lazy(() => ProjectCreateNestedOneWithoutRewardPoolsInputSchema)
}).strict();

export const RewardPoolUncheckedCreateInputSchema: z.ZodType<Prisma.RewardPoolUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  description: z.string(),
  reward: z.string(),
  rewardRate: z.number().optional().nullable(),
  rewardUnit: z.string().optional().nullable(),
  deadline: z.coerce.date(),
  platforms: z.union([ z.lazy(() => RewardPoolCreateplatformsInputSchema),z.string().array() ]).optional(),
  status: z.lazy(() => RewardPoolStatusSchema),
  totalAmountUsd: z.number(),
  paidOutUsd: z.number(),
  campaignTargetViews: z.number().int(),
  participantsCount: z.number().int(),
  completedCount: z.number().int(),
  requirements: z.union([ z.lazy(() => RewardPoolCreaterequirementsInputSchema),z.string().array() ]).optional(),
  projectId: z.string()
}).strict();

export const RewardPoolUpdateInputSchema: z.ZodType<Prisma.RewardPoolUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  reward: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rewardRate: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rewardUnit: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  deadline: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  platforms: z.union([ z.lazy(() => RewardPoolUpdateplatformsInputSchema),z.string().array() ]).optional(),
  status: z.union([ z.lazy(() => RewardPoolStatusSchema),z.lazy(() => EnumRewardPoolStatusFieldUpdateOperationsInputSchema) ]).optional(),
  totalAmountUsd: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  paidOutUsd: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  campaignTargetViews: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  participantsCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  completedCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  requirements: z.union([ z.lazy(() => RewardPoolUpdaterequirementsInputSchema),z.string().array() ]).optional(),
  project: z.lazy(() => ProjectUpdateOneRequiredWithoutRewardPoolsNestedInputSchema).optional()
}).strict();

export const RewardPoolUncheckedUpdateInputSchema: z.ZodType<Prisma.RewardPoolUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  reward: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rewardRate: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rewardUnit: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  deadline: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  platforms: z.union([ z.lazy(() => RewardPoolUpdateplatformsInputSchema),z.string().array() ]).optional(),
  status: z.union([ z.lazy(() => RewardPoolStatusSchema),z.lazy(() => EnumRewardPoolStatusFieldUpdateOperationsInputSchema) ]).optional(),
  totalAmountUsd: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  paidOutUsd: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  campaignTargetViews: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  participantsCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  completedCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  requirements: z.union([ z.lazy(() => RewardPoolUpdaterequirementsInputSchema),z.string().array() ]).optional(),
  projectId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RewardPoolCreateManyInputSchema: z.ZodType<Prisma.RewardPoolCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  description: z.string(),
  reward: z.string(),
  rewardRate: z.number().optional().nullable(),
  rewardUnit: z.string().optional().nullable(),
  deadline: z.coerce.date(),
  platforms: z.union([ z.lazy(() => RewardPoolCreateplatformsInputSchema),z.string().array() ]).optional(),
  status: z.lazy(() => RewardPoolStatusSchema),
  totalAmountUsd: z.number(),
  paidOutUsd: z.number(),
  campaignTargetViews: z.number().int(),
  participantsCount: z.number().int(),
  completedCount: z.number().int(),
  requirements: z.union([ z.lazy(() => RewardPoolCreaterequirementsInputSchema),z.string().array() ]).optional(),
  projectId: z.string()
}).strict();

export const RewardPoolUpdateManyMutationInputSchema: z.ZodType<Prisma.RewardPoolUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  reward: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rewardRate: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rewardUnit: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  deadline: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  platforms: z.union([ z.lazy(() => RewardPoolUpdateplatformsInputSchema),z.string().array() ]).optional(),
  status: z.union([ z.lazy(() => RewardPoolStatusSchema),z.lazy(() => EnumRewardPoolStatusFieldUpdateOperationsInputSchema) ]).optional(),
  totalAmountUsd: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  paidOutUsd: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  campaignTargetViews: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  participantsCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  completedCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  requirements: z.union([ z.lazy(() => RewardPoolUpdaterequirementsInputSchema),z.string().array() ]).optional(),
}).strict();

export const RewardPoolUncheckedUpdateManyInputSchema: z.ZodType<Prisma.RewardPoolUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  reward: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rewardRate: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rewardUnit: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  deadline: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  platforms: z.union([ z.lazy(() => RewardPoolUpdateplatformsInputSchema),z.string().array() ]).optional(),
  status: z.union([ z.lazy(() => RewardPoolStatusSchema),z.lazy(() => EnumRewardPoolStatusFieldUpdateOperationsInputSchema) ]).optional(),
  totalAmountUsd: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  paidOutUsd: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  campaignTargetViews: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  participantsCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  completedCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  requirements: z.union([ z.lazy(() => RewardPoolUpdaterequirementsInputSchema),z.string().array() ]).optional(),
  projectId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const LogCreateInputSchema: z.ZodType<Prisma.LogCreateInput> = z.object({
  id: z.string().cuid().optional(),
  level: z.string(),
  message: z.string(),
  url: z.string().optional().nullable(),
  timestamp: z.coerce.date().optional()
}).strict();

export const LogUncheckedCreateInputSchema: z.ZodType<Prisma.LogUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  level: z.string(),
  message: z.string(),
  url: z.string().optional().nullable(),
  timestamp: z.coerce.date().optional()
}).strict();

export const LogUpdateInputSchema: z.ZodType<Prisma.LogUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  level: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  message: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  timestamp: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const LogUncheckedUpdateInputSchema: z.ZodType<Prisma.LogUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  level: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  message: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  timestamp: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const LogCreateManyInputSchema: z.ZodType<Prisma.LogCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  level: z.string(),
  message: z.string(),
  url: z.string().optional().nullable(),
  timestamp: z.coerce.date().optional()
}).strict();

export const LogUpdateManyMutationInputSchema: z.ZodType<Prisma.LogUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  level: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  message: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  timestamp: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const LogUncheckedUpdateManyInputSchema: z.ZodType<Prisma.LogUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  level: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  message: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  timestamp: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const IntFilterSchema: z.ZodType<Prisma.IntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const DateTimeFilterSchema: z.ZodType<Prisma.DateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const AdminUserCountOrderByAggregateInputSchema: z.ZodType<Prisma.AdminUserCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  username: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AdminUserAvgOrderByAggregateInputSchema: z.ZodType<Prisma.AdminUserAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AdminUserMaxOrderByAggregateInputSchema: z.ZodType<Prisma.AdminUserMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  username: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AdminUserMinOrderByAggregateInputSchema: z.ZodType<Prisma.AdminUserMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  username: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AdminUserSumOrderByAggregateInputSchema: z.ZodType<Prisma.AdminUserSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const IntWithAggregatesFilterSchema: z.ZodType<Prisma.IntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const DateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const StringNullableFilterSchema: z.ZodType<Prisma.StringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const IntNullableFilterSchema: z.ZodType<Prisma.IntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const UserNullableRelationFilterSchema: z.ZodType<Prisma.UserNullableRelationFilter> = z.object({
  is: z.lazy(() => UserWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => UserWhereInputSchema).optional().nullable()
}).strict();

export const UserListRelationFilterSchema: z.ZodType<Prisma.UserListRelationFilter> = z.object({
  every: z.lazy(() => UserWhereInputSchema).optional(),
  some: z.lazy(() => UserWhereInputSchema).optional(),
  none: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const KOLNullableRelationFilterSchema: z.ZodType<Prisma.KOLNullableRelationFilter> = z.object({
  is: z.lazy(() => KOLWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => KOLWhereInputSchema).optional().nullable()
}).strict();

export const WalletListRelationFilterSchema: z.ZodType<Prisma.WalletListRelationFilter> = z.object({
  every: z.lazy(() => WalletWhereInputSchema).optional(),
  some: z.lazy(() => WalletWhereInputSchema).optional(),
  none: z.lazy(() => WalletWhereInputSchema).optional()
}).strict();

export const WalletNullableRelationFilterSchema: z.ZodType<Prisma.WalletNullableRelationFilter> = z.object({
  is: z.lazy(() => WalletWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => WalletWhereInputSchema).optional().nullable()
}).strict();

export const SortOrderInputSchema: z.ZodType<Prisma.SortOrderInput> = z.object({
  sort: z.lazy(() => SortOrderSchema),
  nulls: z.lazy(() => NullsOrderSchema).optional()
}).strict();

export const UserOrderByRelationAggregateInputSchema: z.ZodType<Prisma.UserOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const WalletOrderByRelationAggregateInputSchema: z.ZodType<Prisma.WalletOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  username: z.lazy(() => SortOrderSchema).optional(),
  avatarUrl: z.lazy(() => SortOrderSchema).optional(),
  platform: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  twitterHandle: z.lazy(() => SortOrderSchema).optional(),
  referralCode: z.lazy(() => SortOrderSchema).optional(),
  referredById: z.lazy(() => SortOrderSchema).optional(),
  onboardingStep: z.lazy(() => SortOrderSchema).optional(),
  completedTasks: z.lazy(() => SortOrderSchema).optional(),
  earnedPoints: z.lazy(() => SortOrderSchema).optional(),
  kolId: z.lazy(() => SortOrderSchema).optional(),
  primaryWalletId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserAvgOrderByAggregateInputSchema: z.ZodType<Prisma.UserAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  referredById: z.lazy(() => SortOrderSchema).optional(),
  onboardingStep: z.lazy(() => SortOrderSchema).optional(),
  completedTasks: z.lazy(() => SortOrderSchema).optional(),
  earnedPoints: z.lazy(() => SortOrderSchema).optional(),
  primaryWalletId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  username: z.lazy(() => SortOrderSchema).optional(),
  avatarUrl: z.lazy(() => SortOrderSchema).optional(),
  platform: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  twitterHandle: z.lazy(() => SortOrderSchema).optional(),
  referralCode: z.lazy(() => SortOrderSchema).optional(),
  referredById: z.lazy(() => SortOrderSchema).optional(),
  onboardingStep: z.lazy(() => SortOrderSchema).optional(),
  completedTasks: z.lazy(() => SortOrderSchema).optional(),
  earnedPoints: z.lazy(() => SortOrderSchema).optional(),
  kolId: z.lazy(() => SortOrderSchema).optional(),
  primaryWalletId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  username: z.lazy(() => SortOrderSchema).optional(),
  avatarUrl: z.lazy(() => SortOrderSchema).optional(),
  platform: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  twitterHandle: z.lazy(() => SortOrderSchema).optional(),
  referralCode: z.lazy(() => SortOrderSchema).optional(),
  referredById: z.lazy(() => SortOrderSchema).optional(),
  onboardingStep: z.lazy(() => SortOrderSchema).optional(),
  completedTasks: z.lazy(() => SortOrderSchema).optional(),
  earnedPoints: z.lazy(() => SortOrderSchema).optional(),
  kolId: z.lazy(() => SortOrderSchema).optional(),
  primaryWalletId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserSumOrderByAggregateInputSchema: z.ZodType<Prisma.UserSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  referredById: z.lazy(() => SortOrderSchema).optional(),
  onboardingStep: z.lazy(() => SortOrderSchema).optional(),
  completedTasks: z.lazy(() => SortOrderSchema).optional(),
  earnedPoints: z.lazy(() => SortOrderSchema).optional(),
  primaryWalletId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.StringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const IntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.IntNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedIntNullableFilterSchema).optional()
}).strict();

export const BoolFilterSchema: z.ZodType<Prisma.BoolFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
}).strict();

export const UserRelationFilterSchema: z.ZodType<Prisma.UserRelationFilter> = z.object({
  is: z.lazy(() => UserWhereInputSchema).optional(),
  isNot: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const WalletCountOrderByAggregateInputSchema: z.ZodType<Prisma.WalletCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  address: z.lazy(() => SortOrderSchema).optional(),
  chain: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  verified: z.lazy(() => SortOrderSchema).optional(),
  label: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const WalletAvgOrderByAggregateInputSchema: z.ZodType<Prisma.WalletAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const WalletMaxOrderByAggregateInputSchema: z.ZodType<Prisma.WalletMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  address: z.lazy(() => SortOrderSchema).optional(),
  chain: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  verified: z.lazy(() => SortOrderSchema).optional(),
  label: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const WalletMinOrderByAggregateInputSchema: z.ZodType<Prisma.WalletMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  address: z.lazy(() => SortOrderSchema).optional(),
  chain: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  verified: z.lazy(() => SortOrderSchema).optional(),
  label: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const WalletSumOrderByAggregateInputSchema: z.ZodType<Prisma.WalletSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BoolWithAggregatesFilterSchema: z.ZodType<Prisma.BoolWithAggregatesFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional()
}).strict();

export const FloatFilterSchema: z.ZodType<Prisma.FloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
}).strict();

export const ProjectToNarrativeListRelationFilterSchema: z.ZodType<Prisma.ProjectToNarrativeListRelationFilter> = z.object({
  every: z.lazy(() => ProjectToNarrativeWhereInputSchema).optional(),
  some: z.lazy(() => ProjectToNarrativeWhereInputSchema).optional(),
  none: z.lazy(() => ProjectToNarrativeWhereInputSchema).optional()
}).strict();

export const NarrativeSnapshotListRelationFilterSchema: z.ZodType<Prisma.NarrativeSnapshotListRelationFilter> = z.object({
  every: z.lazy(() => NarrativeSnapshotWhereInputSchema).optional(),
  some: z.lazy(() => NarrativeSnapshotWhereInputSchema).optional(),
  none: z.lazy(() => NarrativeSnapshotWhereInputSchema).optional()
}).strict();

export const ProjectSnapshotListRelationFilterSchema: z.ZodType<Prisma.ProjectSnapshotListRelationFilter> = z.object({
  every: z.lazy(() => ProjectSnapshotWhereInputSchema).optional(),
  some: z.lazy(() => ProjectSnapshotWhereInputSchema).optional(),
  none: z.lazy(() => ProjectSnapshotWhereInputSchema).optional()
}).strict();

export const ProjectToNarrativeOrderByRelationAggregateInputSchema: z.ZodType<Prisma.ProjectToNarrativeOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const NarrativeSnapshotOrderByRelationAggregateInputSchema: z.ZodType<Prisma.NarrativeSnapshotOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ProjectSnapshotOrderByRelationAggregateInputSchema: z.ZodType<Prisma.ProjectSnapshotOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const NarrativeCountOrderByAggregateInputSchema: z.ZodType<Prisma.NarrativeCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  narrativeId: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  projectCount: z.lazy(() => SortOrderSchema).optional(),
  totalViews: z.lazy(() => SortOrderSchema).optional(),
  totalPosts: z.lazy(() => SortOrderSchema).optional(),
  totalMarketCapUsd: z.lazy(() => SortOrderSchema).optional(),
  marketCapChange24h: z.lazy(() => SortOrderSchema).optional(),
  marketCapChange7d: z.lazy(() => SortOrderSchema).optional(),
  marketCapChange30d: z.lazy(() => SortOrderSchema).optional(),
  marketCapChange90d: z.lazy(() => SortOrderSchema).optional(),
  mindsharePercent: z.lazy(() => SortOrderSchema).optional(),
  mindshareChange24h: z.lazy(() => SortOrderSchema).optional(),
  mindshareChange7d: z.lazy(() => SortOrderSchema).optional(),
  mindshareChange30d: z.lazy(() => SortOrderSchema).optional(),
  mindshareChange90d: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  fetchedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const NarrativeAvgOrderByAggregateInputSchema: z.ZodType<Prisma.NarrativeAvgOrderByAggregateInput> = z.object({
  projectCount: z.lazy(() => SortOrderSchema).optional(),
  totalViews: z.lazy(() => SortOrderSchema).optional(),
  totalPosts: z.lazy(() => SortOrderSchema).optional(),
  totalMarketCapUsd: z.lazy(() => SortOrderSchema).optional(),
  marketCapChange24h: z.lazy(() => SortOrderSchema).optional(),
  marketCapChange7d: z.lazy(() => SortOrderSchema).optional(),
  marketCapChange30d: z.lazy(() => SortOrderSchema).optional(),
  marketCapChange90d: z.lazy(() => SortOrderSchema).optional(),
  mindsharePercent: z.lazy(() => SortOrderSchema).optional(),
  mindshareChange24h: z.lazy(() => SortOrderSchema).optional(),
  mindshareChange7d: z.lazy(() => SortOrderSchema).optional(),
  mindshareChange30d: z.lazy(() => SortOrderSchema).optional(),
  mindshareChange90d: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const NarrativeMaxOrderByAggregateInputSchema: z.ZodType<Prisma.NarrativeMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  narrativeId: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  projectCount: z.lazy(() => SortOrderSchema).optional(),
  totalViews: z.lazy(() => SortOrderSchema).optional(),
  totalPosts: z.lazy(() => SortOrderSchema).optional(),
  totalMarketCapUsd: z.lazy(() => SortOrderSchema).optional(),
  marketCapChange24h: z.lazy(() => SortOrderSchema).optional(),
  marketCapChange7d: z.lazy(() => SortOrderSchema).optional(),
  marketCapChange30d: z.lazy(() => SortOrderSchema).optional(),
  marketCapChange90d: z.lazy(() => SortOrderSchema).optional(),
  mindsharePercent: z.lazy(() => SortOrderSchema).optional(),
  mindshareChange24h: z.lazy(() => SortOrderSchema).optional(),
  mindshareChange7d: z.lazy(() => SortOrderSchema).optional(),
  mindshareChange30d: z.lazy(() => SortOrderSchema).optional(),
  mindshareChange90d: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  fetchedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const NarrativeMinOrderByAggregateInputSchema: z.ZodType<Prisma.NarrativeMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  narrativeId: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  projectCount: z.lazy(() => SortOrderSchema).optional(),
  totalViews: z.lazy(() => SortOrderSchema).optional(),
  totalPosts: z.lazy(() => SortOrderSchema).optional(),
  totalMarketCapUsd: z.lazy(() => SortOrderSchema).optional(),
  marketCapChange24h: z.lazy(() => SortOrderSchema).optional(),
  marketCapChange7d: z.lazy(() => SortOrderSchema).optional(),
  marketCapChange30d: z.lazy(() => SortOrderSchema).optional(),
  marketCapChange90d: z.lazy(() => SortOrderSchema).optional(),
  mindsharePercent: z.lazy(() => SortOrderSchema).optional(),
  mindshareChange24h: z.lazy(() => SortOrderSchema).optional(),
  mindshareChange7d: z.lazy(() => SortOrderSchema).optional(),
  mindshareChange30d: z.lazy(() => SortOrderSchema).optional(),
  mindshareChange90d: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  fetchedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const NarrativeSumOrderByAggregateInputSchema: z.ZodType<Prisma.NarrativeSumOrderByAggregateInput> = z.object({
  projectCount: z.lazy(() => SortOrderSchema).optional(),
  totalViews: z.lazy(() => SortOrderSchema).optional(),
  totalPosts: z.lazy(() => SortOrderSchema).optional(),
  totalMarketCapUsd: z.lazy(() => SortOrderSchema).optional(),
  marketCapChange24h: z.lazy(() => SortOrderSchema).optional(),
  marketCapChange7d: z.lazy(() => SortOrderSchema).optional(),
  marketCapChange30d: z.lazy(() => SortOrderSchema).optional(),
  marketCapChange90d: z.lazy(() => SortOrderSchema).optional(),
  mindsharePercent: z.lazy(() => SortOrderSchema).optional(),
  mindshareChange24h: z.lazy(() => SortOrderSchema).optional(),
  mindshareChange7d: z.lazy(() => SortOrderSchema).optional(),
  mindshareChange30d: z.lazy(() => SortOrderSchema).optional(),
  mindshareChange90d: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FloatWithAggregatesFilterSchema: z.ZodType<Prisma.FloatWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedFloatFilterSchema).optional(),
  _min: z.lazy(() => NestedFloatFilterSchema).optional(),
  _max: z.lazy(() => NestedFloatFilterSchema).optional()
}).strict();

export const NarrativeRelationFilterSchema: z.ZodType<Prisma.NarrativeRelationFilter> = z.object({
  is: z.lazy(() => NarrativeWhereInputSchema).optional(),
  isNot: z.lazy(() => NarrativeWhereInputSchema).optional()
}).strict();

export const NarrativeSnapshotNarrativeIdFetchedDateCompoundUniqueInputSchema: z.ZodType<Prisma.NarrativeSnapshotNarrativeIdFetchedDateCompoundUniqueInput> = z.object({
  narrativeId: z.string(),
  fetchedDate: z.string()
}).strict();

export const NarrativeSnapshotCountOrderByAggregateInputSchema: z.ZodType<Prisma.NarrativeSnapshotCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  narrativeId: z.lazy(() => SortOrderSchema).optional(),
  projectCount: z.lazy(() => SortOrderSchema).optional(),
  totalViews: z.lazy(() => SortOrderSchema).optional(),
  totalPosts: z.lazy(() => SortOrderSchema).optional(),
  totalMarketCapUsd: z.lazy(() => SortOrderSchema).optional(),
  marketCapChange24h: z.lazy(() => SortOrderSchema).optional(),
  marketCapChange7d: z.lazy(() => SortOrderSchema).optional(),
  marketCapChange30d: z.lazy(() => SortOrderSchema).optional(),
  marketCapChange90d: z.lazy(() => SortOrderSchema).optional(),
  mindsharePercent: z.lazy(() => SortOrderSchema).optional(),
  mindshareChange24h: z.lazy(() => SortOrderSchema).optional(),
  mindshareChange7d: z.lazy(() => SortOrderSchema).optional(),
  mindshareChange30d: z.lazy(() => SortOrderSchema).optional(),
  mindshareChange90d: z.lazy(() => SortOrderSchema).optional(),
  source: z.lazy(() => SortOrderSchema).optional(),
  updatedBy: z.lazy(() => SortOrderSchema).optional(),
  fetchedDate: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const NarrativeSnapshotAvgOrderByAggregateInputSchema: z.ZodType<Prisma.NarrativeSnapshotAvgOrderByAggregateInput> = z.object({
  projectCount: z.lazy(() => SortOrderSchema).optional(),
  totalViews: z.lazy(() => SortOrderSchema).optional(),
  totalPosts: z.lazy(() => SortOrderSchema).optional(),
  totalMarketCapUsd: z.lazy(() => SortOrderSchema).optional(),
  marketCapChange24h: z.lazy(() => SortOrderSchema).optional(),
  marketCapChange7d: z.lazy(() => SortOrderSchema).optional(),
  marketCapChange30d: z.lazy(() => SortOrderSchema).optional(),
  marketCapChange90d: z.lazy(() => SortOrderSchema).optional(),
  mindsharePercent: z.lazy(() => SortOrderSchema).optional(),
  mindshareChange24h: z.lazy(() => SortOrderSchema).optional(),
  mindshareChange7d: z.lazy(() => SortOrderSchema).optional(),
  mindshareChange30d: z.lazy(() => SortOrderSchema).optional(),
  mindshareChange90d: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const NarrativeSnapshotMaxOrderByAggregateInputSchema: z.ZodType<Prisma.NarrativeSnapshotMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  narrativeId: z.lazy(() => SortOrderSchema).optional(),
  projectCount: z.lazy(() => SortOrderSchema).optional(),
  totalViews: z.lazy(() => SortOrderSchema).optional(),
  totalPosts: z.lazy(() => SortOrderSchema).optional(),
  totalMarketCapUsd: z.lazy(() => SortOrderSchema).optional(),
  marketCapChange24h: z.lazy(() => SortOrderSchema).optional(),
  marketCapChange7d: z.lazy(() => SortOrderSchema).optional(),
  marketCapChange30d: z.lazy(() => SortOrderSchema).optional(),
  marketCapChange90d: z.lazy(() => SortOrderSchema).optional(),
  mindsharePercent: z.lazy(() => SortOrderSchema).optional(),
  mindshareChange24h: z.lazy(() => SortOrderSchema).optional(),
  mindshareChange7d: z.lazy(() => SortOrderSchema).optional(),
  mindshareChange30d: z.lazy(() => SortOrderSchema).optional(),
  mindshareChange90d: z.lazy(() => SortOrderSchema).optional(),
  source: z.lazy(() => SortOrderSchema).optional(),
  updatedBy: z.lazy(() => SortOrderSchema).optional(),
  fetchedDate: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const NarrativeSnapshotMinOrderByAggregateInputSchema: z.ZodType<Prisma.NarrativeSnapshotMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  narrativeId: z.lazy(() => SortOrderSchema).optional(),
  projectCount: z.lazy(() => SortOrderSchema).optional(),
  totalViews: z.lazy(() => SortOrderSchema).optional(),
  totalPosts: z.lazy(() => SortOrderSchema).optional(),
  totalMarketCapUsd: z.lazy(() => SortOrderSchema).optional(),
  marketCapChange24h: z.lazy(() => SortOrderSchema).optional(),
  marketCapChange7d: z.lazy(() => SortOrderSchema).optional(),
  marketCapChange30d: z.lazy(() => SortOrderSchema).optional(),
  marketCapChange90d: z.lazy(() => SortOrderSchema).optional(),
  mindsharePercent: z.lazy(() => SortOrderSchema).optional(),
  mindshareChange24h: z.lazy(() => SortOrderSchema).optional(),
  mindshareChange7d: z.lazy(() => SortOrderSchema).optional(),
  mindshareChange30d: z.lazy(() => SortOrderSchema).optional(),
  mindshareChange90d: z.lazy(() => SortOrderSchema).optional(),
  source: z.lazy(() => SortOrderSchema).optional(),
  updatedBy: z.lazy(() => SortOrderSchema).optional(),
  fetchedDate: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const NarrativeSnapshotSumOrderByAggregateInputSchema: z.ZodType<Prisma.NarrativeSnapshotSumOrderByAggregateInput> = z.object({
  projectCount: z.lazy(() => SortOrderSchema).optional(),
  totalViews: z.lazy(() => SortOrderSchema).optional(),
  totalPosts: z.lazy(() => SortOrderSchema).optional(),
  totalMarketCapUsd: z.lazy(() => SortOrderSchema).optional(),
  marketCapChange24h: z.lazy(() => SortOrderSchema).optional(),
  marketCapChange7d: z.lazy(() => SortOrderSchema).optional(),
  marketCapChange30d: z.lazy(() => SortOrderSchema).optional(),
  marketCapChange90d: z.lazy(() => SortOrderSchema).optional(),
  mindsharePercent: z.lazy(() => SortOrderSchema).optional(),
  mindshareChange24h: z.lazy(() => SortOrderSchema).optional(),
  mindshareChange7d: z.lazy(() => SortOrderSchema).optional(),
  mindshareChange30d: z.lazy(() => SortOrderSchema).optional(),
  mindshareChange90d: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BoolNullableFilterSchema: z.ZodType<Prisma.BoolNullableFilter> = z.object({
  equals: z.boolean().optional().nullable(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const RewardPoolListRelationFilterSchema: z.ZodType<Prisma.RewardPoolListRelationFilter> = z.object({
  every: z.lazy(() => RewardPoolWhereInputSchema).optional(),
  some: z.lazy(() => RewardPoolWhereInputSchema).optional(),
  none: z.lazy(() => RewardPoolWhereInputSchema).optional()
}).strict();

export const KOLToProjectListRelationFilterSchema: z.ZodType<Prisma.KOLToProjectListRelationFilter> = z.object({
  every: z.lazy(() => KOLToProjectWhereInputSchema).optional(),
  some: z.lazy(() => KOLToProjectWhereInputSchema).optional(),
  none: z.lazy(() => KOLToProjectWhereInputSchema).optional()
}).strict();

export const RewardPoolOrderByRelationAggregateInputSchema: z.ZodType<Prisma.RewardPoolOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const KOLToProjectOrderByRelationAggregateInputSchema: z.ZodType<Prisma.KOLToProjectOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ProjectCountOrderByAggregateInputSchema: z.ZodType<Prisma.ProjectCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  stage: z.lazy(() => SortOrderSchema).optional(),
  featured: z.lazy(() => SortOrderSchema).optional(),
  hidden: z.lazy(() => SortOrderSchema).optional(),
  mindshare: z.lazy(() => SortOrderSchema).optional(),
  twitterId: z.lazy(() => SortOrderSchema).optional(),
  twitterUsername: z.lazy(() => SortOrderSchema).optional(),
  twitterDisplayName: z.lazy(() => SortOrderSchema).optional(),
  twitterAvatarUrl: z.lazy(() => SortOrderSchema).optional(),
  twitterDescription: z.lazy(() => SortOrderSchema).optional(),
  twitterDescriptionLink: z.lazy(() => SortOrderSchema).optional(),
  twitterFollowersCount: z.lazy(() => SortOrderSchema).optional(),
  twitterFollowingCount: z.lazy(() => SortOrderSchema).optional(),
  twitterIsVerified: z.lazy(() => SortOrderSchema).optional(),
  twitterGoldBadge: z.lazy(() => SortOrderSchema).optional(),
  twitterLang: z.lazy(() => SortOrderSchema).optional(),
  twitterCreatedAt: z.lazy(() => SortOrderSchema).optional(),
  coinSymbol: z.lazy(() => SortOrderSchema).optional(),
  coinMarketCap: z.lazy(() => SortOrderSchema).optional(),
  coinPrice: z.lazy(() => SortOrderSchema).optional(),
  coinContractAddress: z.lazy(() => SortOrderSchema).optional(),
  coinName: z.lazy(() => SortOrderSchema).optional(),
  coinImageUrl: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  fetchedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ProjectAvgOrderByAggregateInputSchema: z.ZodType<Prisma.ProjectAvgOrderByAggregateInput> = z.object({
  mindshare: z.lazy(() => SortOrderSchema).optional(),
  twitterFollowersCount: z.lazy(() => SortOrderSchema).optional(),
  twitterFollowingCount: z.lazy(() => SortOrderSchema).optional(),
  coinMarketCap: z.lazy(() => SortOrderSchema).optional(),
  coinPrice: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ProjectMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ProjectMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  stage: z.lazy(() => SortOrderSchema).optional(),
  featured: z.lazy(() => SortOrderSchema).optional(),
  hidden: z.lazy(() => SortOrderSchema).optional(),
  mindshare: z.lazy(() => SortOrderSchema).optional(),
  twitterId: z.lazy(() => SortOrderSchema).optional(),
  twitterUsername: z.lazy(() => SortOrderSchema).optional(),
  twitterDisplayName: z.lazy(() => SortOrderSchema).optional(),
  twitterAvatarUrl: z.lazy(() => SortOrderSchema).optional(),
  twitterDescription: z.lazy(() => SortOrderSchema).optional(),
  twitterDescriptionLink: z.lazy(() => SortOrderSchema).optional(),
  twitterFollowersCount: z.lazy(() => SortOrderSchema).optional(),
  twitterFollowingCount: z.lazy(() => SortOrderSchema).optional(),
  twitterIsVerified: z.lazy(() => SortOrderSchema).optional(),
  twitterGoldBadge: z.lazy(() => SortOrderSchema).optional(),
  twitterLang: z.lazy(() => SortOrderSchema).optional(),
  twitterCreatedAt: z.lazy(() => SortOrderSchema).optional(),
  coinSymbol: z.lazy(() => SortOrderSchema).optional(),
  coinMarketCap: z.lazy(() => SortOrderSchema).optional(),
  coinPrice: z.lazy(() => SortOrderSchema).optional(),
  coinContractAddress: z.lazy(() => SortOrderSchema).optional(),
  coinName: z.lazy(() => SortOrderSchema).optional(),
  coinImageUrl: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  fetchedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ProjectMinOrderByAggregateInputSchema: z.ZodType<Prisma.ProjectMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  stage: z.lazy(() => SortOrderSchema).optional(),
  featured: z.lazy(() => SortOrderSchema).optional(),
  hidden: z.lazy(() => SortOrderSchema).optional(),
  mindshare: z.lazy(() => SortOrderSchema).optional(),
  twitterId: z.lazy(() => SortOrderSchema).optional(),
  twitterUsername: z.lazy(() => SortOrderSchema).optional(),
  twitterDisplayName: z.lazy(() => SortOrderSchema).optional(),
  twitterAvatarUrl: z.lazy(() => SortOrderSchema).optional(),
  twitterDescription: z.lazy(() => SortOrderSchema).optional(),
  twitterDescriptionLink: z.lazy(() => SortOrderSchema).optional(),
  twitterFollowersCount: z.lazy(() => SortOrderSchema).optional(),
  twitterFollowingCount: z.lazy(() => SortOrderSchema).optional(),
  twitterIsVerified: z.lazy(() => SortOrderSchema).optional(),
  twitterGoldBadge: z.lazy(() => SortOrderSchema).optional(),
  twitterLang: z.lazy(() => SortOrderSchema).optional(),
  twitterCreatedAt: z.lazy(() => SortOrderSchema).optional(),
  coinSymbol: z.lazy(() => SortOrderSchema).optional(),
  coinMarketCap: z.lazy(() => SortOrderSchema).optional(),
  coinPrice: z.lazy(() => SortOrderSchema).optional(),
  coinContractAddress: z.lazy(() => SortOrderSchema).optional(),
  coinName: z.lazy(() => SortOrderSchema).optional(),
  coinImageUrl: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  fetchedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ProjectSumOrderByAggregateInputSchema: z.ZodType<Prisma.ProjectSumOrderByAggregateInput> = z.object({
  mindshare: z.lazy(() => SortOrderSchema).optional(),
  twitterFollowersCount: z.lazy(() => SortOrderSchema).optional(),
  twitterFollowingCount: z.lazy(() => SortOrderSchema).optional(),
  coinMarketCap: z.lazy(() => SortOrderSchema).optional(),
  coinPrice: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BoolNullableWithAggregatesFilterSchema: z.ZodType<Prisma.BoolNullableWithAggregatesFilter> = z.object({
  equals: z.boolean().optional().nullable(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolNullableFilterSchema).optional()
}).strict();

export const ProjectRelationFilterSchema: z.ZodType<Prisma.ProjectRelationFilter> = z.object({
  is: z.lazy(() => ProjectWhereInputSchema).optional(),
  isNot: z.lazy(() => ProjectWhereInputSchema).optional()
}).strict();

export const NarrativeNullableRelationFilterSchema: z.ZodType<Prisma.NarrativeNullableRelationFilter> = z.object({
  is: z.lazy(() => NarrativeWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => NarrativeWhereInputSchema).optional().nullable()
}).strict();

export const ProjectSnapshotProjectIdNarrativeIdFetchedDateCompoundUniqueInputSchema: z.ZodType<Prisma.ProjectSnapshotProjectIdNarrativeIdFetchedDateCompoundUniqueInput> = z.object({
  projectId: z.string(),
  narrativeId: z.string(),
  fetchedDate: z.string()
}).strict();

export const ProjectSnapshotCountOrderByAggregateInputSchema: z.ZodType<Prisma.ProjectSnapshotCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  totalViews: z.lazy(() => SortOrderSchema).optional(),
  totalPosts: z.lazy(() => SortOrderSchema).optional(),
  mindsharePercent: z.lazy(() => SortOrderSchema).optional(),
  mindshareChange24h: z.lazy(() => SortOrderSchema).optional(),
  mindshareChange7d: z.lazy(() => SortOrderSchema).optional(),
  mindshareChange30d: z.lazy(() => SortOrderSchema).optional(),
  mindshareChange90d: z.lazy(() => SortOrderSchema).optional(),
  source: z.lazy(() => SortOrderSchema).optional(),
  updatedBy: z.lazy(() => SortOrderSchema).optional(),
  fetchedDate: z.lazy(() => SortOrderSchema).optional(),
  projectId: z.lazy(() => SortOrderSchema).optional(),
  narrativeId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ProjectSnapshotAvgOrderByAggregateInputSchema: z.ZodType<Prisma.ProjectSnapshotAvgOrderByAggregateInput> = z.object({
  totalViews: z.lazy(() => SortOrderSchema).optional(),
  totalPosts: z.lazy(() => SortOrderSchema).optional(),
  mindsharePercent: z.lazy(() => SortOrderSchema).optional(),
  mindshareChange24h: z.lazy(() => SortOrderSchema).optional(),
  mindshareChange7d: z.lazy(() => SortOrderSchema).optional(),
  mindshareChange30d: z.lazy(() => SortOrderSchema).optional(),
  mindshareChange90d: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ProjectSnapshotMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ProjectSnapshotMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  totalViews: z.lazy(() => SortOrderSchema).optional(),
  totalPosts: z.lazy(() => SortOrderSchema).optional(),
  mindsharePercent: z.lazy(() => SortOrderSchema).optional(),
  mindshareChange24h: z.lazy(() => SortOrderSchema).optional(),
  mindshareChange7d: z.lazy(() => SortOrderSchema).optional(),
  mindshareChange30d: z.lazy(() => SortOrderSchema).optional(),
  mindshareChange90d: z.lazy(() => SortOrderSchema).optional(),
  source: z.lazy(() => SortOrderSchema).optional(),
  updatedBy: z.lazy(() => SortOrderSchema).optional(),
  fetchedDate: z.lazy(() => SortOrderSchema).optional(),
  projectId: z.lazy(() => SortOrderSchema).optional(),
  narrativeId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ProjectSnapshotMinOrderByAggregateInputSchema: z.ZodType<Prisma.ProjectSnapshotMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  totalViews: z.lazy(() => SortOrderSchema).optional(),
  totalPosts: z.lazy(() => SortOrderSchema).optional(),
  mindsharePercent: z.lazy(() => SortOrderSchema).optional(),
  mindshareChange24h: z.lazy(() => SortOrderSchema).optional(),
  mindshareChange7d: z.lazy(() => SortOrderSchema).optional(),
  mindshareChange30d: z.lazy(() => SortOrderSchema).optional(),
  mindshareChange90d: z.lazy(() => SortOrderSchema).optional(),
  source: z.lazy(() => SortOrderSchema).optional(),
  updatedBy: z.lazy(() => SortOrderSchema).optional(),
  fetchedDate: z.lazy(() => SortOrderSchema).optional(),
  projectId: z.lazy(() => SortOrderSchema).optional(),
  narrativeId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ProjectSnapshotSumOrderByAggregateInputSchema: z.ZodType<Prisma.ProjectSnapshotSumOrderByAggregateInput> = z.object({
  totalViews: z.lazy(() => SortOrderSchema).optional(),
  totalPosts: z.lazy(() => SortOrderSchema).optional(),
  mindsharePercent: z.lazy(() => SortOrderSchema).optional(),
  mindshareChange24h: z.lazy(() => SortOrderSchema).optional(),
  mindshareChange7d: z.lazy(() => SortOrderSchema).optional(),
  mindshareChange30d: z.lazy(() => SortOrderSchema).optional(),
  mindshareChange90d: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ProjectToNarrativeNarrativeIdProjectIdCompoundUniqueInputSchema: z.ZodType<Prisma.ProjectToNarrativeNarrativeIdProjectIdCompoundUniqueInput> = z.object({
  narrativeId: z.string(),
  projectId: z.string()
}).strict();

export const ProjectToNarrativeCountOrderByAggregateInputSchema: z.ZodType<Prisma.ProjectToNarrativeCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  narrativeId: z.lazy(() => SortOrderSchema).optional(),
  projectId: z.lazy(() => SortOrderSchema).optional(),
  totalViews: z.lazy(() => SortOrderSchema).optional(),
  totalPosts: z.lazy(() => SortOrderSchema).optional(),
  mindsharePercent: z.lazy(() => SortOrderSchema).optional(),
  mindshareChange24h: z.lazy(() => SortOrderSchema).optional(),
  mindshareChange7d: z.lazy(() => SortOrderSchema).optional(),
  mindshareChange30d: z.lazy(() => SortOrderSchema).optional(),
  mindshareChange90d: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ProjectToNarrativeAvgOrderByAggregateInputSchema: z.ZodType<Prisma.ProjectToNarrativeAvgOrderByAggregateInput> = z.object({
  totalViews: z.lazy(() => SortOrderSchema).optional(),
  totalPosts: z.lazy(() => SortOrderSchema).optional(),
  mindsharePercent: z.lazy(() => SortOrderSchema).optional(),
  mindshareChange24h: z.lazy(() => SortOrderSchema).optional(),
  mindshareChange7d: z.lazy(() => SortOrderSchema).optional(),
  mindshareChange30d: z.lazy(() => SortOrderSchema).optional(),
  mindshareChange90d: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ProjectToNarrativeMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ProjectToNarrativeMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  narrativeId: z.lazy(() => SortOrderSchema).optional(),
  projectId: z.lazy(() => SortOrderSchema).optional(),
  totalViews: z.lazy(() => SortOrderSchema).optional(),
  totalPosts: z.lazy(() => SortOrderSchema).optional(),
  mindsharePercent: z.lazy(() => SortOrderSchema).optional(),
  mindshareChange24h: z.lazy(() => SortOrderSchema).optional(),
  mindshareChange7d: z.lazy(() => SortOrderSchema).optional(),
  mindshareChange30d: z.lazy(() => SortOrderSchema).optional(),
  mindshareChange90d: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ProjectToNarrativeMinOrderByAggregateInputSchema: z.ZodType<Prisma.ProjectToNarrativeMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  narrativeId: z.lazy(() => SortOrderSchema).optional(),
  projectId: z.lazy(() => SortOrderSchema).optional(),
  totalViews: z.lazy(() => SortOrderSchema).optional(),
  totalPosts: z.lazy(() => SortOrderSchema).optional(),
  mindsharePercent: z.lazy(() => SortOrderSchema).optional(),
  mindshareChange24h: z.lazy(() => SortOrderSchema).optional(),
  mindshareChange7d: z.lazy(() => SortOrderSchema).optional(),
  mindshareChange30d: z.lazy(() => SortOrderSchema).optional(),
  mindshareChange90d: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ProjectToNarrativeSumOrderByAggregateInputSchema: z.ZodType<Prisma.ProjectToNarrativeSumOrderByAggregateInput> = z.object({
  totalViews: z.lazy(() => SortOrderSchema).optional(),
  totalPosts: z.lazy(() => SortOrderSchema).optional(),
  mindsharePercent: z.lazy(() => SortOrderSchema).optional(),
  mindshareChange24h: z.lazy(() => SortOrderSchema).optional(),
  mindshareChange7d: z.lazy(() => SortOrderSchema).optional(),
  mindshareChange30d: z.lazy(() => SortOrderSchema).optional(),
  mindshareChange90d: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FloatNullableFilterSchema: z.ZodType<Prisma.FloatNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const BigIntNullableFilterSchema: z.ZodType<Prisma.BigIntNullableFilter> = z.object({
  equals: z.bigint().optional().nullable(),
  in: z.bigint().array().optional().nullable(),
  notIn: z.bigint().array().optional().nullable(),
  lt: z.bigint().optional(),
  lte: z.bigint().optional(),
  gt: z.bigint().optional(),
  gte: z.bigint().optional(),
  not: z.union([ z.bigint(),z.lazy(() => NestedBigIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const KOLSnapshotListRelationFilterSchema: z.ZodType<Prisma.KOLSnapshotListRelationFilter> = z.object({
  every: z.lazy(() => KOLSnapshotWhereInputSchema).optional(),
  some: z.lazy(() => KOLSnapshotWhereInputSchema).optional(),
  none: z.lazy(() => KOLSnapshotWhereInputSchema).optional()
}).strict();

export const KOLSnapshotOrderByRelationAggregateInputSchema: z.ZodType<Prisma.KOLSnapshotOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const KOLCountOrderByAggregateInputSchema: z.ZodType<Prisma.KOLCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  hidden: z.lazy(() => SortOrderSchema).optional(),
  isAlsoProject: z.lazy(() => SortOrderSchema).optional(),
  twitterId: z.lazy(() => SortOrderSchema).optional(),
  twitterUsername: z.lazy(() => SortOrderSchema).optional(),
  twitterDisplayName: z.lazy(() => SortOrderSchema).optional(),
  twitterAvatarUrl: z.lazy(() => SortOrderSchema).optional(),
  twitterDescription: z.lazy(() => SortOrderSchema).optional(),
  twitterDescriptionLink: z.lazy(() => SortOrderSchema).optional(),
  twitterFollowersCount: z.lazy(() => SortOrderSchema).optional(),
  twitterFollowingCount: z.lazy(() => SortOrderSchema).optional(),
  twitterIsVerified: z.lazy(() => SortOrderSchema).optional(),
  twitterGoldBadge: z.lazy(() => SortOrderSchema).optional(),
  twitterLang: z.lazy(() => SortOrderSchema).optional(),
  twitterCreatedAt: z.lazy(() => SortOrderSchema).optional(),
  kolScore: z.lazy(() => SortOrderSchema).optional(),
  kolScorePercentFromTotal: z.lazy(() => SortOrderSchema).optional(),
  smartFollowersCount: z.lazy(() => SortOrderSchema).optional(),
  threadsCount: z.lazy(() => SortOrderSchema).optional(),
  engagementRate: z.lazy(() => SortOrderSchema).optional(),
  smartEngagement: z.lazy(() => SortOrderSchema).optional(),
  avgViews: z.lazy(() => SortOrderSchema).optional(),
  avgLikes: z.lazy(() => SortOrderSchema).optional(),
  totalPosts: z.lazy(() => SortOrderSchema).optional(),
  totalViews: z.lazy(() => SortOrderSchema).optional(),
  totalInteractions: z.lazy(() => SortOrderSchema).optional(),
  totalOrganicPosts: z.lazy(() => SortOrderSchema).optional(),
  totalOrganicViews: z.lazy(() => SortOrderSchema).optional(),
  totalOrganicInteractions: z.lazy(() => SortOrderSchema).optional(),
  totalAccountPosts: z.lazy(() => SortOrderSchema).optional(),
  totalAccountViews: z.lazy(() => SortOrderSchema).optional(),
  totalAccountInteractions: z.lazy(() => SortOrderSchema).optional(),
  totalAccountComments: z.lazy(() => SortOrderSchema).optional(),
  totalAccountLikes: z.lazy(() => SortOrderSchema).optional(),
  totalAccountRetweets: z.lazy(() => SortOrderSchema).optional(),
  totalAccountReplies: z.lazy(() => SortOrderSchema).optional(),
  totalPostsChange: z.lazy(() => SortOrderSchema).optional(),
  totalInteractionsChange: z.lazy(() => SortOrderSchema).optional(),
  totalViewsChange: z.lazy(() => SortOrderSchema).optional(),
  followersChange: z.lazy(() => SortOrderSchema).optional(),
  smartEngagementChange: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  fetchedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const KOLAvgOrderByAggregateInputSchema: z.ZodType<Prisma.KOLAvgOrderByAggregateInput> = z.object({
  twitterFollowersCount: z.lazy(() => SortOrderSchema).optional(),
  twitterFollowingCount: z.lazy(() => SortOrderSchema).optional(),
  kolScore: z.lazy(() => SortOrderSchema).optional(),
  kolScorePercentFromTotal: z.lazy(() => SortOrderSchema).optional(),
  smartFollowersCount: z.lazy(() => SortOrderSchema).optional(),
  threadsCount: z.lazy(() => SortOrderSchema).optional(),
  engagementRate: z.lazy(() => SortOrderSchema).optional(),
  smartEngagement: z.lazy(() => SortOrderSchema).optional(),
  avgViews: z.lazy(() => SortOrderSchema).optional(),
  avgLikes: z.lazy(() => SortOrderSchema).optional(),
  totalPosts: z.lazy(() => SortOrderSchema).optional(),
  totalViews: z.lazy(() => SortOrderSchema).optional(),
  totalInteractions: z.lazy(() => SortOrderSchema).optional(),
  totalOrganicPosts: z.lazy(() => SortOrderSchema).optional(),
  totalOrganicViews: z.lazy(() => SortOrderSchema).optional(),
  totalOrganicInteractions: z.lazy(() => SortOrderSchema).optional(),
  totalAccountPosts: z.lazy(() => SortOrderSchema).optional(),
  totalAccountViews: z.lazy(() => SortOrderSchema).optional(),
  totalAccountInteractions: z.lazy(() => SortOrderSchema).optional(),
  totalAccountComments: z.lazy(() => SortOrderSchema).optional(),
  totalAccountLikes: z.lazy(() => SortOrderSchema).optional(),
  totalAccountRetweets: z.lazy(() => SortOrderSchema).optional(),
  totalAccountReplies: z.lazy(() => SortOrderSchema).optional(),
  totalPostsChange: z.lazy(() => SortOrderSchema).optional(),
  totalInteractionsChange: z.lazy(() => SortOrderSchema).optional(),
  totalViewsChange: z.lazy(() => SortOrderSchema).optional(),
  followersChange: z.lazy(() => SortOrderSchema).optional(),
  smartEngagementChange: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const KOLMaxOrderByAggregateInputSchema: z.ZodType<Prisma.KOLMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  hidden: z.lazy(() => SortOrderSchema).optional(),
  isAlsoProject: z.lazy(() => SortOrderSchema).optional(),
  twitterId: z.lazy(() => SortOrderSchema).optional(),
  twitterUsername: z.lazy(() => SortOrderSchema).optional(),
  twitterDisplayName: z.lazy(() => SortOrderSchema).optional(),
  twitterAvatarUrl: z.lazy(() => SortOrderSchema).optional(),
  twitterDescription: z.lazy(() => SortOrderSchema).optional(),
  twitterDescriptionLink: z.lazy(() => SortOrderSchema).optional(),
  twitterFollowersCount: z.lazy(() => SortOrderSchema).optional(),
  twitterFollowingCount: z.lazy(() => SortOrderSchema).optional(),
  twitterIsVerified: z.lazy(() => SortOrderSchema).optional(),
  twitterGoldBadge: z.lazy(() => SortOrderSchema).optional(),
  twitterLang: z.lazy(() => SortOrderSchema).optional(),
  twitterCreatedAt: z.lazy(() => SortOrderSchema).optional(),
  kolScore: z.lazy(() => SortOrderSchema).optional(),
  kolScorePercentFromTotal: z.lazy(() => SortOrderSchema).optional(),
  smartFollowersCount: z.lazy(() => SortOrderSchema).optional(),
  threadsCount: z.lazy(() => SortOrderSchema).optional(),
  engagementRate: z.lazy(() => SortOrderSchema).optional(),
  smartEngagement: z.lazy(() => SortOrderSchema).optional(),
  avgViews: z.lazy(() => SortOrderSchema).optional(),
  avgLikes: z.lazy(() => SortOrderSchema).optional(),
  totalPosts: z.lazy(() => SortOrderSchema).optional(),
  totalViews: z.lazy(() => SortOrderSchema).optional(),
  totalInteractions: z.lazy(() => SortOrderSchema).optional(),
  totalOrganicPosts: z.lazy(() => SortOrderSchema).optional(),
  totalOrganicViews: z.lazy(() => SortOrderSchema).optional(),
  totalOrganicInteractions: z.lazy(() => SortOrderSchema).optional(),
  totalAccountPosts: z.lazy(() => SortOrderSchema).optional(),
  totalAccountViews: z.lazy(() => SortOrderSchema).optional(),
  totalAccountInteractions: z.lazy(() => SortOrderSchema).optional(),
  totalAccountComments: z.lazy(() => SortOrderSchema).optional(),
  totalAccountLikes: z.lazy(() => SortOrderSchema).optional(),
  totalAccountRetweets: z.lazy(() => SortOrderSchema).optional(),
  totalAccountReplies: z.lazy(() => SortOrderSchema).optional(),
  totalPostsChange: z.lazy(() => SortOrderSchema).optional(),
  totalInteractionsChange: z.lazy(() => SortOrderSchema).optional(),
  totalViewsChange: z.lazy(() => SortOrderSchema).optional(),
  followersChange: z.lazy(() => SortOrderSchema).optional(),
  smartEngagementChange: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  fetchedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const KOLMinOrderByAggregateInputSchema: z.ZodType<Prisma.KOLMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  hidden: z.lazy(() => SortOrderSchema).optional(),
  isAlsoProject: z.lazy(() => SortOrderSchema).optional(),
  twitterId: z.lazy(() => SortOrderSchema).optional(),
  twitterUsername: z.lazy(() => SortOrderSchema).optional(),
  twitterDisplayName: z.lazy(() => SortOrderSchema).optional(),
  twitterAvatarUrl: z.lazy(() => SortOrderSchema).optional(),
  twitterDescription: z.lazy(() => SortOrderSchema).optional(),
  twitterDescriptionLink: z.lazy(() => SortOrderSchema).optional(),
  twitterFollowersCount: z.lazy(() => SortOrderSchema).optional(),
  twitterFollowingCount: z.lazy(() => SortOrderSchema).optional(),
  twitterIsVerified: z.lazy(() => SortOrderSchema).optional(),
  twitterGoldBadge: z.lazy(() => SortOrderSchema).optional(),
  twitterLang: z.lazy(() => SortOrderSchema).optional(),
  twitterCreatedAt: z.lazy(() => SortOrderSchema).optional(),
  kolScore: z.lazy(() => SortOrderSchema).optional(),
  kolScorePercentFromTotal: z.lazy(() => SortOrderSchema).optional(),
  smartFollowersCount: z.lazy(() => SortOrderSchema).optional(),
  threadsCount: z.lazy(() => SortOrderSchema).optional(),
  engagementRate: z.lazy(() => SortOrderSchema).optional(),
  smartEngagement: z.lazy(() => SortOrderSchema).optional(),
  avgViews: z.lazy(() => SortOrderSchema).optional(),
  avgLikes: z.lazy(() => SortOrderSchema).optional(),
  totalPosts: z.lazy(() => SortOrderSchema).optional(),
  totalViews: z.lazy(() => SortOrderSchema).optional(),
  totalInteractions: z.lazy(() => SortOrderSchema).optional(),
  totalOrganicPosts: z.lazy(() => SortOrderSchema).optional(),
  totalOrganicViews: z.lazy(() => SortOrderSchema).optional(),
  totalOrganicInteractions: z.lazy(() => SortOrderSchema).optional(),
  totalAccountPosts: z.lazy(() => SortOrderSchema).optional(),
  totalAccountViews: z.lazy(() => SortOrderSchema).optional(),
  totalAccountInteractions: z.lazy(() => SortOrderSchema).optional(),
  totalAccountComments: z.lazy(() => SortOrderSchema).optional(),
  totalAccountLikes: z.lazy(() => SortOrderSchema).optional(),
  totalAccountRetweets: z.lazy(() => SortOrderSchema).optional(),
  totalAccountReplies: z.lazy(() => SortOrderSchema).optional(),
  totalPostsChange: z.lazy(() => SortOrderSchema).optional(),
  totalInteractionsChange: z.lazy(() => SortOrderSchema).optional(),
  totalViewsChange: z.lazy(() => SortOrderSchema).optional(),
  followersChange: z.lazy(() => SortOrderSchema).optional(),
  smartEngagementChange: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  fetchedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const KOLSumOrderByAggregateInputSchema: z.ZodType<Prisma.KOLSumOrderByAggregateInput> = z.object({
  twitterFollowersCount: z.lazy(() => SortOrderSchema).optional(),
  twitterFollowingCount: z.lazy(() => SortOrderSchema).optional(),
  kolScore: z.lazy(() => SortOrderSchema).optional(),
  kolScorePercentFromTotal: z.lazy(() => SortOrderSchema).optional(),
  smartFollowersCount: z.lazy(() => SortOrderSchema).optional(),
  threadsCount: z.lazy(() => SortOrderSchema).optional(),
  engagementRate: z.lazy(() => SortOrderSchema).optional(),
  smartEngagement: z.lazy(() => SortOrderSchema).optional(),
  avgViews: z.lazy(() => SortOrderSchema).optional(),
  avgLikes: z.lazy(() => SortOrderSchema).optional(),
  totalPosts: z.lazy(() => SortOrderSchema).optional(),
  totalViews: z.lazy(() => SortOrderSchema).optional(),
  totalInteractions: z.lazy(() => SortOrderSchema).optional(),
  totalOrganicPosts: z.lazy(() => SortOrderSchema).optional(),
  totalOrganicViews: z.lazy(() => SortOrderSchema).optional(),
  totalOrganicInteractions: z.lazy(() => SortOrderSchema).optional(),
  totalAccountPosts: z.lazy(() => SortOrderSchema).optional(),
  totalAccountViews: z.lazy(() => SortOrderSchema).optional(),
  totalAccountInteractions: z.lazy(() => SortOrderSchema).optional(),
  totalAccountComments: z.lazy(() => SortOrderSchema).optional(),
  totalAccountLikes: z.lazy(() => SortOrderSchema).optional(),
  totalAccountRetweets: z.lazy(() => SortOrderSchema).optional(),
  totalAccountReplies: z.lazy(() => SortOrderSchema).optional(),
  totalPostsChange: z.lazy(() => SortOrderSchema).optional(),
  totalInteractionsChange: z.lazy(() => SortOrderSchema).optional(),
  totalViewsChange: z.lazy(() => SortOrderSchema).optional(),
  followersChange: z.lazy(() => SortOrderSchema).optional(),
  smartEngagementChange: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FloatNullableWithAggregatesFilterSchema: z.ZodType<Prisma.FloatNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedFloatNullableFilterSchema).optional()
}).strict();

export const BigIntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.BigIntNullableWithAggregatesFilter> = z.object({
  equals: z.bigint().optional().nullable(),
  in: z.bigint().array().optional().nullable(),
  notIn: z.bigint().array().optional().nullable(),
  lt: z.bigint().optional(),
  lte: z.bigint().optional(),
  gt: z.bigint().optional(),
  gte: z.bigint().optional(),
  not: z.union([ z.bigint(),z.lazy(() => NestedBigIntNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedBigIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedBigIntNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedBigIntNullableFilterSchema).optional()
}).strict();

export const BigIntFilterSchema: z.ZodType<Prisma.BigIntFilter> = z.object({
  equals: z.bigint().optional(),
  in: z.bigint().array().optional(),
  notIn: z.bigint().array().optional(),
  lt: z.bigint().optional(),
  lte: z.bigint().optional(),
  gt: z.bigint().optional(),
  gte: z.bigint().optional(),
  not: z.union([ z.bigint(),z.lazy(() => NestedBigIntFilterSchema) ]).optional(),
}).strict();

export const KOLRelationFilterSchema: z.ZodType<Prisma.KOLRelationFilter> = z.object({
  is: z.lazy(() => KOLWhereInputSchema).optional(),
  isNot: z.lazy(() => KOLWhereInputSchema).optional()
}).strict();

export const KOLSnapshotKolIdFetchedDateCompoundUniqueInputSchema: z.ZodType<Prisma.KOLSnapshotKolIdFetchedDateCompoundUniqueInput> = z.object({
  kolId: z.string(),
  fetchedDate: z.string()
}).strict();

export const KOLSnapshotCountOrderByAggregateInputSchema: z.ZodType<Prisma.KOLSnapshotCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  kolId: z.lazy(() => SortOrderSchema).optional(),
  kolScore: z.lazy(() => SortOrderSchema).optional(),
  smartFollowersCount: z.lazy(() => SortOrderSchema).optional(),
  threadsCount: z.lazy(() => SortOrderSchema).optional(),
  engagementRate: z.lazy(() => SortOrderSchema).optional(),
  smartEngagement: z.lazy(() => SortOrderSchema).optional(),
  avgViews: z.lazy(() => SortOrderSchema).optional(),
  avgLikes: z.lazy(() => SortOrderSchema).optional(),
  totalPosts: z.lazy(() => SortOrderSchema).optional(),
  totalViews: z.lazy(() => SortOrderSchema).optional(),
  totalInteractions: z.lazy(() => SortOrderSchema).optional(),
  totalOrganicPosts: z.lazy(() => SortOrderSchema).optional(),
  totalOrganicViews: z.lazy(() => SortOrderSchema).optional(),
  totalOrganicInteractions: z.lazy(() => SortOrderSchema).optional(),
  totalAccountPosts: z.lazy(() => SortOrderSchema).optional(),
  totalAccountViews: z.lazy(() => SortOrderSchema).optional(),
  totalAccountInteractions: z.lazy(() => SortOrderSchema).optional(),
  totalAccountComments: z.lazy(() => SortOrderSchema).optional(),
  totalAccountLikes: z.lazy(() => SortOrderSchema).optional(),
  totalAccountRetweets: z.lazy(() => SortOrderSchema).optional(),
  totalAccountReplies: z.lazy(() => SortOrderSchema).optional(),
  totalPostsChange: z.lazy(() => SortOrderSchema).optional(),
  totalInteractionsChange: z.lazy(() => SortOrderSchema).optional(),
  totalViewsChange: z.lazy(() => SortOrderSchema).optional(),
  followersChange: z.lazy(() => SortOrderSchema).optional(),
  smartEngagementChange: z.lazy(() => SortOrderSchema).optional(),
  fetchedDate: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const KOLSnapshotAvgOrderByAggregateInputSchema: z.ZodType<Prisma.KOLSnapshotAvgOrderByAggregateInput> = z.object({
  kolScore: z.lazy(() => SortOrderSchema).optional(),
  smartFollowersCount: z.lazy(() => SortOrderSchema).optional(),
  threadsCount: z.lazy(() => SortOrderSchema).optional(),
  engagementRate: z.lazy(() => SortOrderSchema).optional(),
  smartEngagement: z.lazy(() => SortOrderSchema).optional(),
  avgViews: z.lazy(() => SortOrderSchema).optional(),
  avgLikes: z.lazy(() => SortOrderSchema).optional(),
  totalPosts: z.lazy(() => SortOrderSchema).optional(),
  totalViews: z.lazy(() => SortOrderSchema).optional(),
  totalInteractions: z.lazy(() => SortOrderSchema).optional(),
  totalOrganicPosts: z.lazy(() => SortOrderSchema).optional(),
  totalOrganicViews: z.lazy(() => SortOrderSchema).optional(),
  totalOrganicInteractions: z.lazy(() => SortOrderSchema).optional(),
  totalAccountPosts: z.lazy(() => SortOrderSchema).optional(),
  totalAccountViews: z.lazy(() => SortOrderSchema).optional(),
  totalAccountInteractions: z.lazy(() => SortOrderSchema).optional(),
  totalAccountComments: z.lazy(() => SortOrderSchema).optional(),
  totalAccountLikes: z.lazy(() => SortOrderSchema).optional(),
  totalAccountRetweets: z.lazy(() => SortOrderSchema).optional(),
  totalAccountReplies: z.lazy(() => SortOrderSchema).optional(),
  totalPostsChange: z.lazy(() => SortOrderSchema).optional(),
  totalInteractionsChange: z.lazy(() => SortOrderSchema).optional(),
  totalViewsChange: z.lazy(() => SortOrderSchema).optional(),
  followersChange: z.lazy(() => SortOrderSchema).optional(),
  smartEngagementChange: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const KOLSnapshotMaxOrderByAggregateInputSchema: z.ZodType<Prisma.KOLSnapshotMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  kolId: z.lazy(() => SortOrderSchema).optional(),
  kolScore: z.lazy(() => SortOrderSchema).optional(),
  smartFollowersCount: z.lazy(() => SortOrderSchema).optional(),
  threadsCount: z.lazy(() => SortOrderSchema).optional(),
  engagementRate: z.lazy(() => SortOrderSchema).optional(),
  smartEngagement: z.lazy(() => SortOrderSchema).optional(),
  avgViews: z.lazy(() => SortOrderSchema).optional(),
  avgLikes: z.lazy(() => SortOrderSchema).optional(),
  totalPosts: z.lazy(() => SortOrderSchema).optional(),
  totalViews: z.lazy(() => SortOrderSchema).optional(),
  totalInteractions: z.lazy(() => SortOrderSchema).optional(),
  totalOrganicPosts: z.lazy(() => SortOrderSchema).optional(),
  totalOrganicViews: z.lazy(() => SortOrderSchema).optional(),
  totalOrganicInteractions: z.lazy(() => SortOrderSchema).optional(),
  totalAccountPosts: z.lazy(() => SortOrderSchema).optional(),
  totalAccountViews: z.lazy(() => SortOrderSchema).optional(),
  totalAccountInteractions: z.lazy(() => SortOrderSchema).optional(),
  totalAccountComments: z.lazy(() => SortOrderSchema).optional(),
  totalAccountLikes: z.lazy(() => SortOrderSchema).optional(),
  totalAccountRetweets: z.lazy(() => SortOrderSchema).optional(),
  totalAccountReplies: z.lazy(() => SortOrderSchema).optional(),
  totalPostsChange: z.lazy(() => SortOrderSchema).optional(),
  totalInteractionsChange: z.lazy(() => SortOrderSchema).optional(),
  totalViewsChange: z.lazy(() => SortOrderSchema).optional(),
  followersChange: z.lazy(() => SortOrderSchema).optional(),
  smartEngagementChange: z.lazy(() => SortOrderSchema).optional(),
  fetchedDate: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const KOLSnapshotMinOrderByAggregateInputSchema: z.ZodType<Prisma.KOLSnapshotMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  kolId: z.lazy(() => SortOrderSchema).optional(),
  kolScore: z.lazy(() => SortOrderSchema).optional(),
  smartFollowersCount: z.lazy(() => SortOrderSchema).optional(),
  threadsCount: z.lazy(() => SortOrderSchema).optional(),
  engagementRate: z.lazy(() => SortOrderSchema).optional(),
  smartEngagement: z.lazy(() => SortOrderSchema).optional(),
  avgViews: z.lazy(() => SortOrderSchema).optional(),
  avgLikes: z.lazy(() => SortOrderSchema).optional(),
  totalPosts: z.lazy(() => SortOrderSchema).optional(),
  totalViews: z.lazy(() => SortOrderSchema).optional(),
  totalInteractions: z.lazy(() => SortOrderSchema).optional(),
  totalOrganicPosts: z.lazy(() => SortOrderSchema).optional(),
  totalOrganicViews: z.lazy(() => SortOrderSchema).optional(),
  totalOrganicInteractions: z.lazy(() => SortOrderSchema).optional(),
  totalAccountPosts: z.lazy(() => SortOrderSchema).optional(),
  totalAccountViews: z.lazy(() => SortOrderSchema).optional(),
  totalAccountInteractions: z.lazy(() => SortOrderSchema).optional(),
  totalAccountComments: z.lazy(() => SortOrderSchema).optional(),
  totalAccountLikes: z.lazy(() => SortOrderSchema).optional(),
  totalAccountRetweets: z.lazy(() => SortOrderSchema).optional(),
  totalAccountReplies: z.lazy(() => SortOrderSchema).optional(),
  totalPostsChange: z.lazy(() => SortOrderSchema).optional(),
  totalInteractionsChange: z.lazy(() => SortOrderSchema).optional(),
  totalViewsChange: z.lazy(() => SortOrderSchema).optional(),
  followersChange: z.lazy(() => SortOrderSchema).optional(),
  smartEngagementChange: z.lazy(() => SortOrderSchema).optional(),
  fetchedDate: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const KOLSnapshotSumOrderByAggregateInputSchema: z.ZodType<Prisma.KOLSnapshotSumOrderByAggregateInput> = z.object({
  kolScore: z.lazy(() => SortOrderSchema).optional(),
  smartFollowersCount: z.lazy(() => SortOrderSchema).optional(),
  threadsCount: z.lazy(() => SortOrderSchema).optional(),
  engagementRate: z.lazy(() => SortOrderSchema).optional(),
  smartEngagement: z.lazy(() => SortOrderSchema).optional(),
  avgViews: z.lazy(() => SortOrderSchema).optional(),
  avgLikes: z.lazy(() => SortOrderSchema).optional(),
  totalPosts: z.lazy(() => SortOrderSchema).optional(),
  totalViews: z.lazy(() => SortOrderSchema).optional(),
  totalInteractions: z.lazy(() => SortOrderSchema).optional(),
  totalOrganicPosts: z.lazy(() => SortOrderSchema).optional(),
  totalOrganicViews: z.lazy(() => SortOrderSchema).optional(),
  totalOrganicInteractions: z.lazy(() => SortOrderSchema).optional(),
  totalAccountPosts: z.lazy(() => SortOrderSchema).optional(),
  totalAccountViews: z.lazy(() => SortOrderSchema).optional(),
  totalAccountInteractions: z.lazy(() => SortOrderSchema).optional(),
  totalAccountComments: z.lazy(() => SortOrderSchema).optional(),
  totalAccountLikes: z.lazy(() => SortOrderSchema).optional(),
  totalAccountRetweets: z.lazy(() => SortOrderSchema).optional(),
  totalAccountReplies: z.lazy(() => SortOrderSchema).optional(),
  totalPostsChange: z.lazy(() => SortOrderSchema).optional(),
  totalInteractionsChange: z.lazy(() => SortOrderSchema).optional(),
  totalViewsChange: z.lazy(() => SortOrderSchema).optional(),
  followersChange: z.lazy(() => SortOrderSchema).optional(),
  smartEngagementChange: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BigIntWithAggregatesFilterSchema: z.ZodType<Prisma.BigIntWithAggregatesFilter> = z.object({
  equals: z.bigint().optional(),
  in: z.bigint().array().optional(),
  notIn: z.bigint().array().optional(),
  lt: z.bigint().optional(),
  lte: z.bigint().optional(),
  gt: z.bigint().optional(),
  gte: z.bigint().optional(),
  not: z.union([ z.bigint(),z.lazy(() => NestedBigIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedBigIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBigIntFilterSchema).optional(),
  _max: z.lazy(() => NestedBigIntFilterSchema).optional()
}).strict();

export const KOLToProjectKolIdProjectIdCompoundUniqueInputSchema: z.ZodType<Prisma.KOLToProjectKolIdProjectIdCompoundUniqueInput> = z.object({
  kolId: z.string(),
  projectId: z.string()
}).strict();

export const KOLToProjectCountOrderByAggregateInputSchema: z.ZodType<Prisma.KOLToProjectCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  kolId: z.lazy(() => SortOrderSchema).optional(),
  projectId: z.lazy(() => SortOrderSchema).optional(),
  totalPosts: z.lazy(() => SortOrderSchema).optional(),
  totalViews: z.lazy(() => SortOrderSchema).optional(),
  totalInteractions: z.lazy(() => SortOrderSchema).optional(),
  totalComments: z.lazy(() => SortOrderSchema).optional(),
  qualityScore: z.lazy(() => SortOrderSchema).optional(),
  proofOfWork: z.lazy(() => SortOrderSchema).optional(),
  mindoMetric: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  fetchedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const KOLToProjectAvgOrderByAggregateInputSchema: z.ZodType<Prisma.KOLToProjectAvgOrderByAggregateInput> = z.object({
  totalPosts: z.lazy(() => SortOrderSchema).optional(),
  totalViews: z.lazy(() => SortOrderSchema).optional(),
  totalInteractions: z.lazy(() => SortOrderSchema).optional(),
  totalComments: z.lazy(() => SortOrderSchema).optional(),
  qualityScore: z.lazy(() => SortOrderSchema).optional(),
  proofOfWork: z.lazy(() => SortOrderSchema).optional(),
  mindoMetric: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const KOLToProjectMaxOrderByAggregateInputSchema: z.ZodType<Prisma.KOLToProjectMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  kolId: z.lazy(() => SortOrderSchema).optional(),
  projectId: z.lazy(() => SortOrderSchema).optional(),
  totalPosts: z.lazy(() => SortOrderSchema).optional(),
  totalViews: z.lazy(() => SortOrderSchema).optional(),
  totalInteractions: z.lazy(() => SortOrderSchema).optional(),
  totalComments: z.lazy(() => SortOrderSchema).optional(),
  qualityScore: z.lazy(() => SortOrderSchema).optional(),
  proofOfWork: z.lazy(() => SortOrderSchema).optional(),
  mindoMetric: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  fetchedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const KOLToProjectMinOrderByAggregateInputSchema: z.ZodType<Prisma.KOLToProjectMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  kolId: z.lazy(() => SortOrderSchema).optional(),
  projectId: z.lazy(() => SortOrderSchema).optional(),
  totalPosts: z.lazy(() => SortOrderSchema).optional(),
  totalViews: z.lazy(() => SortOrderSchema).optional(),
  totalInteractions: z.lazy(() => SortOrderSchema).optional(),
  totalComments: z.lazy(() => SortOrderSchema).optional(),
  qualityScore: z.lazy(() => SortOrderSchema).optional(),
  proofOfWork: z.lazy(() => SortOrderSchema).optional(),
  mindoMetric: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  fetchedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const KOLToProjectSumOrderByAggregateInputSchema: z.ZodType<Prisma.KOLToProjectSumOrderByAggregateInput> = z.object({
  totalPosts: z.lazy(() => SortOrderSchema).optional(),
  totalViews: z.lazy(() => SortOrderSchema).optional(),
  totalInteractions: z.lazy(() => SortOrderSchema).optional(),
  totalComments: z.lazy(() => SortOrderSchema).optional(),
  qualityScore: z.lazy(() => SortOrderSchema).optional(),
  proofOfWork: z.lazy(() => SortOrderSchema).optional(),
  mindoMetric: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StringNullableListFilterSchema: z.ZodType<Prisma.StringNullableListFilter> = z.object({
  equals: z.string().array().optional().nullable(),
  has: z.string().optional().nullable(),
  hasEvery: z.string().array().optional(),
  hasSome: z.string().array().optional(),
  isEmpty: z.boolean().optional()
}).strict();

export const EnumRewardPoolStatusFilterSchema: z.ZodType<Prisma.EnumRewardPoolStatusFilter> = z.object({
  equals: z.lazy(() => RewardPoolStatusSchema).optional(),
  in: z.lazy(() => RewardPoolStatusSchema).array().optional(),
  notIn: z.lazy(() => RewardPoolStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => RewardPoolStatusSchema),z.lazy(() => NestedEnumRewardPoolStatusFilterSchema) ]).optional(),
}).strict();

export const RewardPoolCountOrderByAggregateInputSchema: z.ZodType<Prisma.RewardPoolCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  reward: z.lazy(() => SortOrderSchema).optional(),
  rewardRate: z.lazy(() => SortOrderSchema).optional(),
  rewardUnit: z.lazy(() => SortOrderSchema).optional(),
  deadline: z.lazy(() => SortOrderSchema).optional(),
  platforms: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  totalAmountUsd: z.lazy(() => SortOrderSchema).optional(),
  paidOutUsd: z.lazy(() => SortOrderSchema).optional(),
  campaignTargetViews: z.lazy(() => SortOrderSchema).optional(),
  participantsCount: z.lazy(() => SortOrderSchema).optional(),
  completedCount: z.lazy(() => SortOrderSchema).optional(),
  requirements: z.lazy(() => SortOrderSchema).optional(),
  projectId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RewardPoolAvgOrderByAggregateInputSchema: z.ZodType<Prisma.RewardPoolAvgOrderByAggregateInput> = z.object({
  rewardRate: z.lazy(() => SortOrderSchema).optional(),
  totalAmountUsd: z.lazy(() => SortOrderSchema).optional(),
  paidOutUsd: z.lazy(() => SortOrderSchema).optional(),
  campaignTargetViews: z.lazy(() => SortOrderSchema).optional(),
  participantsCount: z.lazy(() => SortOrderSchema).optional(),
  completedCount: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RewardPoolMaxOrderByAggregateInputSchema: z.ZodType<Prisma.RewardPoolMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  reward: z.lazy(() => SortOrderSchema).optional(),
  rewardRate: z.lazy(() => SortOrderSchema).optional(),
  rewardUnit: z.lazy(() => SortOrderSchema).optional(),
  deadline: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  totalAmountUsd: z.lazy(() => SortOrderSchema).optional(),
  paidOutUsd: z.lazy(() => SortOrderSchema).optional(),
  campaignTargetViews: z.lazy(() => SortOrderSchema).optional(),
  participantsCount: z.lazy(() => SortOrderSchema).optional(),
  completedCount: z.lazy(() => SortOrderSchema).optional(),
  projectId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RewardPoolMinOrderByAggregateInputSchema: z.ZodType<Prisma.RewardPoolMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  reward: z.lazy(() => SortOrderSchema).optional(),
  rewardRate: z.lazy(() => SortOrderSchema).optional(),
  rewardUnit: z.lazy(() => SortOrderSchema).optional(),
  deadline: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  totalAmountUsd: z.lazy(() => SortOrderSchema).optional(),
  paidOutUsd: z.lazy(() => SortOrderSchema).optional(),
  campaignTargetViews: z.lazy(() => SortOrderSchema).optional(),
  participantsCount: z.lazy(() => SortOrderSchema).optional(),
  completedCount: z.lazy(() => SortOrderSchema).optional(),
  projectId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RewardPoolSumOrderByAggregateInputSchema: z.ZodType<Prisma.RewardPoolSumOrderByAggregateInput> = z.object({
  rewardRate: z.lazy(() => SortOrderSchema).optional(),
  totalAmountUsd: z.lazy(() => SortOrderSchema).optional(),
  paidOutUsd: z.lazy(() => SortOrderSchema).optional(),
  campaignTargetViews: z.lazy(() => SortOrderSchema).optional(),
  participantsCount: z.lazy(() => SortOrderSchema).optional(),
  completedCount: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumRewardPoolStatusWithAggregatesFilterSchema: z.ZodType<Prisma.EnumRewardPoolStatusWithAggregatesFilter> = z.object({
  equals: z.lazy(() => RewardPoolStatusSchema).optional(),
  in: z.lazy(() => RewardPoolStatusSchema).array().optional(),
  notIn: z.lazy(() => RewardPoolStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => RewardPoolStatusSchema),z.lazy(() => NestedEnumRewardPoolStatusWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumRewardPoolStatusFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumRewardPoolStatusFilterSchema).optional()
}).strict();

export const LogCountOrderByAggregateInputSchema: z.ZodType<Prisma.LogCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  level: z.lazy(() => SortOrderSchema).optional(),
  message: z.lazy(() => SortOrderSchema).optional(),
  url: z.lazy(() => SortOrderSchema).optional(),
  timestamp: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const LogMaxOrderByAggregateInputSchema: z.ZodType<Prisma.LogMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  level: z.lazy(() => SortOrderSchema).optional(),
  message: z.lazy(() => SortOrderSchema).optional(),
  url: z.lazy(() => SortOrderSchema).optional(),
  timestamp: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const LogMinOrderByAggregateInputSchema: z.ZodType<Prisma.LogMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  level: z.lazy(() => SortOrderSchema).optional(),
  message: z.lazy(() => SortOrderSchema).optional(),
  url: z.lazy(() => SortOrderSchema).optional(),
  timestamp: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional()
}).strict();

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional()
}).strict();

export const IntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.IntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const UserCreateNestedOneWithoutReferralsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutReferralsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutReferralsInputSchema),z.lazy(() => UserUncheckedCreateWithoutReferralsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutReferralsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const UserCreateNestedManyWithoutReferredByInputSchema: z.ZodType<Prisma.UserCreateNestedManyWithoutReferredByInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutReferredByInputSchema),z.lazy(() => UserCreateWithoutReferredByInputSchema).array(),z.lazy(() => UserUncheckedCreateWithoutReferredByInputSchema),z.lazy(() => UserUncheckedCreateWithoutReferredByInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserCreateOrConnectWithoutReferredByInputSchema),z.lazy(() => UserCreateOrConnectWithoutReferredByInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserCreateManyReferredByInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const KOLCreateNestedOneWithoutUserInputSchema: z.ZodType<Prisma.KOLCreateNestedOneWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => KOLCreateWithoutUserInputSchema),z.lazy(() => KOLUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => KOLCreateOrConnectWithoutUserInputSchema).optional(),
  connect: z.lazy(() => KOLWhereUniqueInputSchema).optional()
}).strict();

export const WalletCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.WalletCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => WalletCreateWithoutUserInputSchema),z.lazy(() => WalletCreateWithoutUserInputSchema).array(),z.lazy(() => WalletUncheckedCreateWithoutUserInputSchema),z.lazy(() => WalletUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => WalletCreateOrConnectWithoutUserInputSchema),z.lazy(() => WalletCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => WalletCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => WalletWhereUniqueInputSchema),z.lazy(() => WalletWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const WalletCreateNestedOneWithoutPrimaryForInputSchema: z.ZodType<Prisma.WalletCreateNestedOneWithoutPrimaryForInput> = z.object({
  create: z.union([ z.lazy(() => WalletCreateWithoutPrimaryForInputSchema),z.lazy(() => WalletUncheckedCreateWithoutPrimaryForInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => WalletCreateOrConnectWithoutPrimaryForInputSchema).optional(),
  connect: z.lazy(() => WalletWhereUniqueInputSchema).optional()
}).strict();

export const UserUncheckedCreateNestedManyWithoutReferredByInputSchema: z.ZodType<Prisma.UserUncheckedCreateNestedManyWithoutReferredByInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutReferredByInputSchema),z.lazy(() => UserCreateWithoutReferredByInputSchema).array(),z.lazy(() => UserUncheckedCreateWithoutReferredByInputSchema),z.lazy(() => UserUncheckedCreateWithoutReferredByInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserCreateOrConnectWithoutReferredByInputSchema),z.lazy(() => UserCreateOrConnectWithoutReferredByInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserCreateManyReferredByInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const WalletUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.WalletUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => WalletCreateWithoutUserInputSchema),z.lazy(() => WalletCreateWithoutUserInputSchema).array(),z.lazy(() => WalletUncheckedCreateWithoutUserInputSchema),z.lazy(() => WalletUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => WalletCreateOrConnectWithoutUserInputSchema),z.lazy(() => WalletCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => WalletCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => WalletWhereUniqueInputSchema),z.lazy(() => WalletWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional().nullable()
}).strict();

export const UserUpdateOneWithoutReferralsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneWithoutReferralsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutReferralsInputSchema),z.lazy(() => UserUncheckedCreateWithoutReferralsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutReferralsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutReferralsInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => UserWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => UserWhereInputSchema) ]).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutReferralsInputSchema),z.lazy(() => UserUpdateWithoutReferralsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutReferralsInputSchema) ]).optional(),
}).strict();

export const UserUpdateManyWithoutReferredByNestedInputSchema: z.ZodType<Prisma.UserUpdateManyWithoutReferredByNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutReferredByInputSchema),z.lazy(() => UserCreateWithoutReferredByInputSchema).array(),z.lazy(() => UserUncheckedCreateWithoutReferredByInputSchema),z.lazy(() => UserUncheckedCreateWithoutReferredByInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserCreateOrConnectWithoutReferredByInputSchema),z.lazy(() => UserCreateOrConnectWithoutReferredByInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UserUpsertWithWhereUniqueWithoutReferredByInputSchema),z.lazy(() => UserUpsertWithWhereUniqueWithoutReferredByInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserCreateManyReferredByInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UserUpdateWithWhereUniqueWithoutReferredByInputSchema),z.lazy(() => UserUpdateWithWhereUniqueWithoutReferredByInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UserUpdateManyWithWhereWithoutReferredByInputSchema),z.lazy(() => UserUpdateManyWithWhereWithoutReferredByInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UserScalarWhereInputSchema),z.lazy(() => UserScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const KOLUpdateOneWithoutUserNestedInputSchema: z.ZodType<Prisma.KOLUpdateOneWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => KOLCreateWithoutUserInputSchema),z.lazy(() => KOLUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => KOLCreateOrConnectWithoutUserInputSchema).optional(),
  upsert: z.lazy(() => KOLUpsertWithoutUserInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => KOLWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => KOLWhereInputSchema) ]).optional(),
  connect: z.lazy(() => KOLWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => KOLUpdateToOneWithWhereWithoutUserInputSchema),z.lazy(() => KOLUpdateWithoutUserInputSchema),z.lazy(() => KOLUncheckedUpdateWithoutUserInputSchema) ]).optional(),
}).strict();

export const WalletUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.WalletUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => WalletCreateWithoutUserInputSchema),z.lazy(() => WalletCreateWithoutUserInputSchema).array(),z.lazy(() => WalletUncheckedCreateWithoutUserInputSchema),z.lazy(() => WalletUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => WalletCreateOrConnectWithoutUserInputSchema),z.lazy(() => WalletCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => WalletUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => WalletUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => WalletCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => WalletWhereUniqueInputSchema),z.lazy(() => WalletWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => WalletWhereUniqueInputSchema),z.lazy(() => WalletWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => WalletWhereUniqueInputSchema),z.lazy(() => WalletWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => WalletWhereUniqueInputSchema),z.lazy(() => WalletWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => WalletUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => WalletUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => WalletUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => WalletUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => WalletScalarWhereInputSchema),z.lazy(() => WalletScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const WalletUpdateOneWithoutPrimaryForNestedInputSchema: z.ZodType<Prisma.WalletUpdateOneWithoutPrimaryForNestedInput> = z.object({
  create: z.union([ z.lazy(() => WalletCreateWithoutPrimaryForInputSchema),z.lazy(() => WalletUncheckedCreateWithoutPrimaryForInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => WalletCreateOrConnectWithoutPrimaryForInputSchema).optional(),
  upsert: z.lazy(() => WalletUpsertWithoutPrimaryForInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => WalletWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => WalletWhereInputSchema) ]).optional(),
  connect: z.lazy(() => WalletWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => WalletUpdateToOneWithWhereWithoutPrimaryForInputSchema),z.lazy(() => WalletUpdateWithoutPrimaryForInputSchema),z.lazy(() => WalletUncheckedUpdateWithoutPrimaryForInputSchema) ]).optional(),
}).strict();

export const NullableIntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableIntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional().nullable(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const UserUncheckedUpdateManyWithoutReferredByNestedInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyWithoutReferredByNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutReferredByInputSchema),z.lazy(() => UserCreateWithoutReferredByInputSchema).array(),z.lazy(() => UserUncheckedCreateWithoutReferredByInputSchema),z.lazy(() => UserUncheckedCreateWithoutReferredByInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserCreateOrConnectWithoutReferredByInputSchema),z.lazy(() => UserCreateOrConnectWithoutReferredByInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UserUpsertWithWhereUniqueWithoutReferredByInputSchema),z.lazy(() => UserUpsertWithWhereUniqueWithoutReferredByInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserCreateManyReferredByInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UserUpdateWithWhereUniqueWithoutReferredByInputSchema),z.lazy(() => UserUpdateWithWhereUniqueWithoutReferredByInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UserUpdateManyWithWhereWithoutReferredByInputSchema),z.lazy(() => UserUpdateManyWithWhereWithoutReferredByInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UserScalarWhereInputSchema),z.lazy(() => UserScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const WalletUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.WalletUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => WalletCreateWithoutUserInputSchema),z.lazy(() => WalletCreateWithoutUserInputSchema).array(),z.lazy(() => WalletUncheckedCreateWithoutUserInputSchema),z.lazy(() => WalletUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => WalletCreateOrConnectWithoutUserInputSchema),z.lazy(() => WalletCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => WalletUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => WalletUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => WalletCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => WalletWhereUniqueInputSchema),z.lazy(() => WalletWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => WalletWhereUniqueInputSchema),z.lazy(() => WalletWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => WalletWhereUniqueInputSchema),z.lazy(() => WalletWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => WalletWhereUniqueInputSchema),z.lazy(() => WalletWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => WalletUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => WalletUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => WalletUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => WalletUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => WalletScalarWhereInputSchema),z.lazy(() => WalletScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutWalletsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutWalletsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutWalletsInputSchema),z.lazy(() => UserUncheckedCreateWithoutWalletsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutWalletsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const UserCreateNestedOneWithoutPrimaryWalletInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutPrimaryWalletInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutPrimaryWalletInputSchema),z.lazy(() => UserUncheckedCreateWithoutPrimaryWalletInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutPrimaryWalletInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const UserUncheckedCreateNestedOneWithoutPrimaryWalletInputSchema: z.ZodType<Prisma.UserUncheckedCreateNestedOneWithoutPrimaryWalletInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutPrimaryWalletInputSchema),z.lazy(() => UserUncheckedCreateWithoutPrimaryWalletInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutPrimaryWalletInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const BoolFieldUpdateOperationsInputSchema: z.ZodType<Prisma.BoolFieldUpdateOperationsInput> = z.object({
  set: z.boolean().optional()
}).strict();

export const UserUpdateOneRequiredWithoutWalletsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutWalletsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutWalletsInputSchema),z.lazy(() => UserUncheckedCreateWithoutWalletsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutWalletsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutWalletsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutWalletsInputSchema),z.lazy(() => UserUpdateWithoutWalletsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutWalletsInputSchema) ]).optional(),
}).strict();

export const UserUpdateOneWithoutPrimaryWalletNestedInputSchema: z.ZodType<Prisma.UserUpdateOneWithoutPrimaryWalletNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutPrimaryWalletInputSchema),z.lazy(() => UserUncheckedCreateWithoutPrimaryWalletInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutPrimaryWalletInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutPrimaryWalletInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => UserWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => UserWhereInputSchema) ]).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutPrimaryWalletInputSchema),z.lazy(() => UserUpdateWithoutPrimaryWalletInputSchema),z.lazy(() => UserUncheckedUpdateWithoutPrimaryWalletInputSchema) ]).optional(),
}).strict();

export const UserUncheckedUpdateOneWithoutPrimaryWalletNestedInputSchema: z.ZodType<Prisma.UserUncheckedUpdateOneWithoutPrimaryWalletNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutPrimaryWalletInputSchema),z.lazy(() => UserUncheckedCreateWithoutPrimaryWalletInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutPrimaryWalletInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutPrimaryWalletInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => UserWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => UserWhereInputSchema) ]).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutPrimaryWalletInputSchema),z.lazy(() => UserUpdateWithoutPrimaryWalletInputSchema),z.lazy(() => UserUncheckedUpdateWithoutPrimaryWalletInputSchema) ]).optional(),
}).strict();

export const ProjectToNarrativeCreateNestedManyWithoutNarrativeInputSchema: z.ZodType<Prisma.ProjectToNarrativeCreateNestedManyWithoutNarrativeInput> = z.object({
  create: z.union([ z.lazy(() => ProjectToNarrativeCreateWithoutNarrativeInputSchema),z.lazy(() => ProjectToNarrativeCreateWithoutNarrativeInputSchema).array(),z.lazy(() => ProjectToNarrativeUncheckedCreateWithoutNarrativeInputSchema),z.lazy(() => ProjectToNarrativeUncheckedCreateWithoutNarrativeInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ProjectToNarrativeCreateOrConnectWithoutNarrativeInputSchema),z.lazy(() => ProjectToNarrativeCreateOrConnectWithoutNarrativeInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ProjectToNarrativeCreateManyNarrativeInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ProjectToNarrativeWhereUniqueInputSchema),z.lazy(() => ProjectToNarrativeWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const NarrativeSnapshotCreateNestedManyWithoutNarrativeInputSchema: z.ZodType<Prisma.NarrativeSnapshotCreateNestedManyWithoutNarrativeInput> = z.object({
  create: z.union([ z.lazy(() => NarrativeSnapshotCreateWithoutNarrativeInputSchema),z.lazy(() => NarrativeSnapshotCreateWithoutNarrativeInputSchema).array(),z.lazy(() => NarrativeSnapshotUncheckedCreateWithoutNarrativeInputSchema),z.lazy(() => NarrativeSnapshotUncheckedCreateWithoutNarrativeInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => NarrativeSnapshotCreateOrConnectWithoutNarrativeInputSchema),z.lazy(() => NarrativeSnapshotCreateOrConnectWithoutNarrativeInputSchema).array() ]).optional(),
  createMany: z.lazy(() => NarrativeSnapshotCreateManyNarrativeInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => NarrativeSnapshotWhereUniqueInputSchema),z.lazy(() => NarrativeSnapshotWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ProjectSnapshotCreateNestedManyWithoutNarrativeInputSchema: z.ZodType<Prisma.ProjectSnapshotCreateNestedManyWithoutNarrativeInput> = z.object({
  create: z.union([ z.lazy(() => ProjectSnapshotCreateWithoutNarrativeInputSchema),z.lazy(() => ProjectSnapshotCreateWithoutNarrativeInputSchema).array(),z.lazy(() => ProjectSnapshotUncheckedCreateWithoutNarrativeInputSchema),z.lazy(() => ProjectSnapshotUncheckedCreateWithoutNarrativeInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ProjectSnapshotCreateOrConnectWithoutNarrativeInputSchema),z.lazy(() => ProjectSnapshotCreateOrConnectWithoutNarrativeInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ProjectSnapshotCreateManyNarrativeInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ProjectSnapshotWhereUniqueInputSchema),z.lazy(() => ProjectSnapshotWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ProjectToNarrativeUncheckedCreateNestedManyWithoutNarrativeInputSchema: z.ZodType<Prisma.ProjectToNarrativeUncheckedCreateNestedManyWithoutNarrativeInput> = z.object({
  create: z.union([ z.lazy(() => ProjectToNarrativeCreateWithoutNarrativeInputSchema),z.lazy(() => ProjectToNarrativeCreateWithoutNarrativeInputSchema).array(),z.lazy(() => ProjectToNarrativeUncheckedCreateWithoutNarrativeInputSchema),z.lazy(() => ProjectToNarrativeUncheckedCreateWithoutNarrativeInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ProjectToNarrativeCreateOrConnectWithoutNarrativeInputSchema),z.lazy(() => ProjectToNarrativeCreateOrConnectWithoutNarrativeInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ProjectToNarrativeCreateManyNarrativeInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ProjectToNarrativeWhereUniqueInputSchema),z.lazy(() => ProjectToNarrativeWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const NarrativeSnapshotUncheckedCreateNestedManyWithoutNarrativeInputSchema: z.ZodType<Prisma.NarrativeSnapshotUncheckedCreateNestedManyWithoutNarrativeInput> = z.object({
  create: z.union([ z.lazy(() => NarrativeSnapshotCreateWithoutNarrativeInputSchema),z.lazy(() => NarrativeSnapshotCreateWithoutNarrativeInputSchema).array(),z.lazy(() => NarrativeSnapshotUncheckedCreateWithoutNarrativeInputSchema),z.lazy(() => NarrativeSnapshotUncheckedCreateWithoutNarrativeInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => NarrativeSnapshotCreateOrConnectWithoutNarrativeInputSchema),z.lazy(() => NarrativeSnapshotCreateOrConnectWithoutNarrativeInputSchema).array() ]).optional(),
  createMany: z.lazy(() => NarrativeSnapshotCreateManyNarrativeInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => NarrativeSnapshotWhereUniqueInputSchema),z.lazy(() => NarrativeSnapshotWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ProjectSnapshotUncheckedCreateNestedManyWithoutNarrativeInputSchema: z.ZodType<Prisma.ProjectSnapshotUncheckedCreateNestedManyWithoutNarrativeInput> = z.object({
  create: z.union([ z.lazy(() => ProjectSnapshotCreateWithoutNarrativeInputSchema),z.lazy(() => ProjectSnapshotCreateWithoutNarrativeInputSchema).array(),z.lazy(() => ProjectSnapshotUncheckedCreateWithoutNarrativeInputSchema),z.lazy(() => ProjectSnapshotUncheckedCreateWithoutNarrativeInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ProjectSnapshotCreateOrConnectWithoutNarrativeInputSchema),z.lazy(() => ProjectSnapshotCreateOrConnectWithoutNarrativeInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ProjectSnapshotCreateManyNarrativeInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ProjectSnapshotWhereUniqueInputSchema),z.lazy(() => ProjectSnapshotWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const FloatFieldUpdateOperationsInputSchema: z.ZodType<Prisma.FloatFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const ProjectToNarrativeUpdateManyWithoutNarrativeNestedInputSchema: z.ZodType<Prisma.ProjectToNarrativeUpdateManyWithoutNarrativeNestedInput> = z.object({
  create: z.union([ z.lazy(() => ProjectToNarrativeCreateWithoutNarrativeInputSchema),z.lazy(() => ProjectToNarrativeCreateWithoutNarrativeInputSchema).array(),z.lazy(() => ProjectToNarrativeUncheckedCreateWithoutNarrativeInputSchema),z.lazy(() => ProjectToNarrativeUncheckedCreateWithoutNarrativeInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ProjectToNarrativeCreateOrConnectWithoutNarrativeInputSchema),z.lazy(() => ProjectToNarrativeCreateOrConnectWithoutNarrativeInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ProjectToNarrativeUpsertWithWhereUniqueWithoutNarrativeInputSchema),z.lazy(() => ProjectToNarrativeUpsertWithWhereUniqueWithoutNarrativeInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ProjectToNarrativeCreateManyNarrativeInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ProjectToNarrativeWhereUniqueInputSchema),z.lazy(() => ProjectToNarrativeWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ProjectToNarrativeWhereUniqueInputSchema),z.lazy(() => ProjectToNarrativeWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ProjectToNarrativeWhereUniqueInputSchema),z.lazy(() => ProjectToNarrativeWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ProjectToNarrativeWhereUniqueInputSchema),z.lazy(() => ProjectToNarrativeWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ProjectToNarrativeUpdateWithWhereUniqueWithoutNarrativeInputSchema),z.lazy(() => ProjectToNarrativeUpdateWithWhereUniqueWithoutNarrativeInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ProjectToNarrativeUpdateManyWithWhereWithoutNarrativeInputSchema),z.lazy(() => ProjectToNarrativeUpdateManyWithWhereWithoutNarrativeInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ProjectToNarrativeScalarWhereInputSchema),z.lazy(() => ProjectToNarrativeScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const NarrativeSnapshotUpdateManyWithoutNarrativeNestedInputSchema: z.ZodType<Prisma.NarrativeSnapshotUpdateManyWithoutNarrativeNestedInput> = z.object({
  create: z.union([ z.lazy(() => NarrativeSnapshotCreateWithoutNarrativeInputSchema),z.lazy(() => NarrativeSnapshotCreateWithoutNarrativeInputSchema).array(),z.lazy(() => NarrativeSnapshotUncheckedCreateWithoutNarrativeInputSchema),z.lazy(() => NarrativeSnapshotUncheckedCreateWithoutNarrativeInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => NarrativeSnapshotCreateOrConnectWithoutNarrativeInputSchema),z.lazy(() => NarrativeSnapshotCreateOrConnectWithoutNarrativeInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => NarrativeSnapshotUpsertWithWhereUniqueWithoutNarrativeInputSchema),z.lazy(() => NarrativeSnapshotUpsertWithWhereUniqueWithoutNarrativeInputSchema).array() ]).optional(),
  createMany: z.lazy(() => NarrativeSnapshotCreateManyNarrativeInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => NarrativeSnapshotWhereUniqueInputSchema),z.lazy(() => NarrativeSnapshotWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => NarrativeSnapshotWhereUniqueInputSchema),z.lazy(() => NarrativeSnapshotWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => NarrativeSnapshotWhereUniqueInputSchema),z.lazy(() => NarrativeSnapshotWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => NarrativeSnapshotWhereUniqueInputSchema),z.lazy(() => NarrativeSnapshotWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => NarrativeSnapshotUpdateWithWhereUniqueWithoutNarrativeInputSchema),z.lazy(() => NarrativeSnapshotUpdateWithWhereUniqueWithoutNarrativeInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => NarrativeSnapshotUpdateManyWithWhereWithoutNarrativeInputSchema),z.lazy(() => NarrativeSnapshotUpdateManyWithWhereWithoutNarrativeInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => NarrativeSnapshotScalarWhereInputSchema),z.lazy(() => NarrativeSnapshotScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ProjectSnapshotUpdateManyWithoutNarrativeNestedInputSchema: z.ZodType<Prisma.ProjectSnapshotUpdateManyWithoutNarrativeNestedInput> = z.object({
  create: z.union([ z.lazy(() => ProjectSnapshotCreateWithoutNarrativeInputSchema),z.lazy(() => ProjectSnapshotCreateWithoutNarrativeInputSchema).array(),z.lazy(() => ProjectSnapshotUncheckedCreateWithoutNarrativeInputSchema),z.lazy(() => ProjectSnapshotUncheckedCreateWithoutNarrativeInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ProjectSnapshotCreateOrConnectWithoutNarrativeInputSchema),z.lazy(() => ProjectSnapshotCreateOrConnectWithoutNarrativeInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ProjectSnapshotUpsertWithWhereUniqueWithoutNarrativeInputSchema),z.lazy(() => ProjectSnapshotUpsertWithWhereUniqueWithoutNarrativeInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ProjectSnapshotCreateManyNarrativeInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ProjectSnapshotWhereUniqueInputSchema),z.lazy(() => ProjectSnapshotWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ProjectSnapshotWhereUniqueInputSchema),z.lazy(() => ProjectSnapshotWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ProjectSnapshotWhereUniqueInputSchema),z.lazy(() => ProjectSnapshotWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ProjectSnapshotWhereUniqueInputSchema),z.lazy(() => ProjectSnapshotWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ProjectSnapshotUpdateWithWhereUniqueWithoutNarrativeInputSchema),z.lazy(() => ProjectSnapshotUpdateWithWhereUniqueWithoutNarrativeInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ProjectSnapshotUpdateManyWithWhereWithoutNarrativeInputSchema),z.lazy(() => ProjectSnapshotUpdateManyWithWhereWithoutNarrativeInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ProjectSnapshotScalarWhereInputSchema),z.lazy(() => ProjectSnapshotScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ProjectToNarrativeUncheckedUpdateManyWithoutNarrativeNestedInputSchema: z.ZodType<Prisma.ProjectToNarrativeUncheckedUpdateManyWithoutNarrativeNestedInput> = z.object({
  create: z.union([ z.lazy(() => ProjectToNarrativeCreateWithoutNarrativeInputSchema),z.lazy(() => ProjectToNarrativeCreateWithoutNarrativeInputSchema).array(),z.lazy(() => ProjectToNarrativeUncheckedCreateWithoutNarrativeInputSchema),z.lazy(() => ProjectToNarrativeUncheckedCreateWithoutNarrativeInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ProjectToNarrativeCreateOrConnectWithoutNarrativeInputSchema),z.lazy(() => ProjectToNarrativeCreateOrConnectWithoutNarrativeInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ProjectToNarrativeUpsertWithWhereUniqueWithoutNarrativeInputSchema),z.lazy(() => ProjectToNarrativeUpsertWithWhereUniqueWithoutNarrativeInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ProjectToNarrativeCreateManyNarrativeInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ProjectToNarrativeWhereUniqueInputSchema),z.lazy(() => ProjectToNarrativeWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ProjectToNarrativeWhereUniqueInputSchema),z.lazy(() => ProjectToNarrativeWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ProjectToNarrativeWhereUniqueInputSchema),z.lazy(() => ProjectToNarrativeWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ProjectToNarrativeWhereUniqueInputSchema),z.lazy(() => ProjectToNarrativeWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ProjectToNarrativeUpdateWithWhereUniqueWithoutNarrativeInputSchema),z.lazy(() => ProjectToNarrativeUpdateWithWhereUniqueWithoutNarrativeInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ProjectToNarrativeUpdateManyWithWhereWithoutNarrativeInputSchema),z.lazy(() => ProjectToNarrativeUpdateManyWithWhereWithoutNarrativeInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ProjectToNarrativeScalarWhereInputSchema),z.lazy(() => ProjectToNarrativeScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const NarrativeSnapshotUncheckedUpdateManyWithoutNarrativeNestedInputSchema: z.ZodType<Prisma.NarrativeSnapshotUncheckedUpdateManyWithoutNarrativeNestedInput> = z.object({
  create: z.union([ z.lazy(() => NarrativeSnapshotCreateWithoutNarrativeInputSchema),z.lazy(() => NarrativeSnapshotCreateWithoutNarrativeInputSchema).array(),z.lazy(() => NarrativeSnapshotUncheckedCreateWithoutNarrativeInputSchema),z.lazy(() => NarrativeSnapshotUncheckedCreateWithoutNarrativeInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => NarrativeSnapshotCreateOrConnectWithoutNarrativeInputSchema),z.lazy(() => NarrativeSnapshotCreateOrConnectWithoutNarrativeInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => NarrativeSnapshotUpsertWithWhereUniqueWithoutNarrativeInputSchema),z.lazy(() => NarrativeSnapshotUpsertWithWhereUniqueWithoutNarrativeInputSchema).array() ]).optional(),
  createMany: z.lazy(() => NarrativeSnapshotCreateManyNarrativeInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => NarrativeSnapshotWhereUniqueInputSchema),z.lazy(() => NarrativeSnapshotWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => NarrativeSnapshotWhereUniqueInputSchema),z.lazy(() => NarrativeSnapshotWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => NarrativeSnapshotWhereUniqueInputSchema),z.lazy(() => NarrativeSnapshotWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => NarrativeSnapshotWhereUniqueInputSchema),z.lazy(() => NarrativeSnapshotWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => NarrativeSnapshotUpdateWithWhereUniqueWithoutNarrativeInputSchema),z.lazy(() => NarrativeSnapshotUpdateWithWhereUniqueWithoutNarrativeInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => NarrativeSnapshotUpdateManyWithWhereWithoutNarrativeInputSchema),z.lazy(() => NarrativeSnapshotUpdateManyWithWhereWithoutNarrativeInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => NarrativeSnapshotScalarWhereInputSchema),z.lazy(() => NarrativeSnapshotScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ProjectSnapshotUncheckedUpdateManyWithoutNarrativeNestedInputSchema: z.ZodType<Prisma.ProjectSnapshotUncheckedUpdateManyWithoutNarrativeNestedInput> = z.object({
  create: z.union([ z.lazy(() => ProjectSnapshotCreateWithoutNarrativeInputSchema),z.lazy(() => ProjectSnapshotCreateWithoutNarrativeInputSchema).array(),z.lazy(() => ProjectSnapshotUncheckedCreateWithoutNarrativeInputSchema),z.lazy(() => ProjectSnapshotUncheckedCreateWithoutNarrativeInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ProjectSnapshotCreateOrConnectWithoutNarrativeInputSchema),z.lazy(() => ProjectSnapshotCreateOrConnectWithoutNarrativeInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ProjectSnapshotUpsertWithWhereUniqueWithoutNarrativeInputSchema),z.lazy(() => ProjectSnapshotUpsertWithWhereUniqueWithoutNarrativeInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ProjectSnapshotCreateManyNarrativeInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ProjectSnapshotWhereUniqueInputSchema),z.lazy(() => ProjectSnapshotWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ProjectSnapshotWhereUniqueInputSchema),z.lazy(() => ProjectSnapshotWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ProjectSnapshotWhereUniqueInputSchema),z.lazy(() => ProjectSnapshotWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ProjectSnapshotWhereUniqueInputSchema),z.lazy(() => ProjectSnapshotWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ProjectSnapshotUpdateWithWhereUniqueWithoutNarrativeInputSchema),z.lazy(() => ProjectSnapshotUpdateWithWhereUniqueWithoutNarrativeInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ProjectSnapshotUpdateManyWithWhereWithoutNarrativeInputSchema),z.lazy(() => ProjectSnapshotUpdateManyWithWhereWithoutNarrativeInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ProjectSnapshotScalarWhereInputSchema),z.lazy(() => ProjectSnapshotScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const NarrativeCreateNestedOneWithoutNarrativeSnapshotInputSchema: z.ZodType<Prisma.NarrativeCreateNestedOneWithoutNarrativeSnapshotInput> = z.object({
  create: z.union([ z.lazy(() => NarrativeCreateWithoutNarrativeSnapshotInputSchema),z.lazy(() => NarrativeUncheckedCreateWithoutNarrativeSnapshotInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => NarrativeCreateOrConnectWithoutNarrativeSnapshotInputSchema).optional(),
  connect: z.lazy(() => NarrativeWhereUniqueInputSchema).optional()
}).strict();

export const NarrativeUpdateOneRequiredWithoutNarrativeSnapshotNestedInputSchema: z.ZodType<Prisma.NarrativeUpdateOneRequiredWithoutNarrativeSnapshotNestedInput> = z.object({
  create: z.union([ z.lazy(() => NarrativeCreateWithoutNarrativeSnapshotInputSchema),z.lazy(() => NarrativeUncheckedCreateWithoutNarrativeSnapshotInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => NarrativeCreateOrConnectWithoutNarrativeSnapshotInputSchema).optional(),
  upsert: z.lazy(() => NarrativeUpsertWithoutNarrativeSnapshotInputSchema).optional(),
  connect: z.lazy(() => NarrativeWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => NarrativeUpdateToOneWithWhereWithoutNarrativeSnapshotInputSchema),z.lazy(() => NarrativeUpdateWithoutNarrativeSnapshotInputSchema),z.lazy(() => NarrativeUncheckedUpdateWithoutNarrativeSnapshotInputSchema) ]).optional(),
}).strict();

export const ProjectSnapshotCreateNestedManyWithoutProjectInputSchema: z.ZodType<Prisma.ProjectSnapshotCreateNestedManyWithoutProjectInput> = z.object({
  create: z.union([ z.lazy(() => ProjectSnapshotCreateWithoutProjectInputSchema),z.lazy(() => ProjectSnapshotCreateWithoutProjectInputSchema).array(),z.lazy(() => ProjectSnapshotUncheckedCreateWithoutProjectInputSchema),z.lazy(() => ProjectSnapshotUncheckedCreateWithoutProjectInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ProjectSnapshotCreateOrConnectWithoutProjectInputSchema),z.lazy(() => ProjectSnapshotCreateOrConnectWithoutProjectInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ProjectSnapshotCreateManyProjectInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ProjectSnapshotWhereUniqueInputSchema),z.lazy(() => ProjectSnapshotWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ProjectToNarrativeCreateNestedManyWithoutProjectInputSchema: z.ZodType<Prisma.ProjectToNarrativeCreateNestedManyWithoutProjectInput> = z.object({
  create: z.union([ z.lazy(() => ProjectToNarrativeCreateWithoutProjectInputSchema),z.lazy(() => ProjectToNarrativeCreateWithoutProjectInputSchema).array(),z.lazy(() => ProjectToNarrativeUncheckedCreateWithoutProjectInputSchema),z.lazy(() => ProjectToNarrativeUncheckedCreateWithoutProjectInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ProjectToNarrativeCreateOrConnectWithoutProjectInputSchema),z.lazy(() => ProjectToNarrativeCreateOrConnectWithoutProjectInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ProjectToNarrativeCreateManyProjectInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ProjectToNarrativeWhereUniqueInputSchema),z.lazy(() => ProjectToNarrativeWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const RewardPoolCreateNestedManyWithoutProjectInputSchema: z.ZodType<Prisma.RewardPoolCreateNestedManyWithoutProjectInput> = z.object({
  create: z.union([ z.lazy(() => RewardPoolCreateWithoutProjectInputSchema),z.lazy(() => RewardPoolCreateWithoutProjectInputSchema).array(),z.lazy(() => RewardPoolUncheckedCreateWithoutProjectInputSchema),z.lazy(() => RewardPoolUncheckedCreateWithoutProjectInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RewardPoolCreateOrConnectWithoutProjectInputSchema),z.lazy(() => RewardPoolCreateOrConnectWithoutProjectInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RewardPoolCreateManyProjectInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => RewardPoolWhereUniqueInputSchema),z.lazy(() => RewardPoolWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const KOLToProjectCreateNestedManyWithoutProjectInputSchema: z.ZodType<Prisma.KOLToProjectCreateNestedManyWithoutProjectInput> = z.object({
  create: z.union([ z.lazy(() => KOLToProjectCreateWithoutProjectInputSchema),z.lazy(() => KOLToProjectCreateWithoutProjectInputSchema).array(),z.lazy(() => KOLToProjectUncheckedCreateWithoutProjectInputSchema),z.lazy(() => KOLToProjectUncheckedCreateWithoutProjectInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => KOLToProjectCreateOrConnectWithoutProjectInputSchema),z.lazy(() => KOLToProjectCreateOrConnectWithoutProjectInputSchema).array() ]).optional(),
  createMany: z.lazy(() => KOLToProjectCreateManyProjectInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => KOLToProjectWhereUniqueInputSchema),z.lazy(() => KOLToProjectWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ProjectSnapshotUncheckedCreateNestedManyWithoutProjectInputSchema: z.ZodType<Prisma.ProjectSnapshotUncheckedCreateNestedManyWithoutProjectInput> = z.object({
  create: z.union([ z.lazy(() => ProjectSnapshotCreateWithoutProjectInputSchema),z.lazy(() => ProjectSnapshotCreateWithoutProjectInputSchema).array(),z.lazy(() => ProjectSnapshotUncheckedCreateWithoutProjectInputSchema),z.lazy(() => ProjectSnapshotUncheckedCreateWithoutProjectInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ProjectSnapshotCreateOrConnectWithoutProjectInputSchema),z.lazy(() => ProjectSnapshotCreateOrConnectWithoutProjectInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ProjectSnapshotCreateManyProjectInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ProjectSnapshotWhereUniqueInputSchema),z.lazy(() => ProjectSnapshotWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ProjectToNarrativeUncheckedCreateNestedManyWithoutProjectInputSchema: z.ZodType<Prisma.ProjectToNarrativeUncheckedCreateNestedManyWithoutProjectInput> = z.object({
  create: z.union([ z.lazy(() => ProjectToNarrativeCreateWithoutProjectInputSchema),z.lazy(() => ProjectToNarrativeCreateWithoutProjectInputSchema).array(),z.lazy(() => ProjectToNarrativeUncheckedCreateWithoutProjectInputSchema),z.lazy(() => ProjectToNarrativeUncheckedCreateWithoutProjectInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ProjectToNarrativeCreateOrConnectWithoutProjectInputSchema),z.lazy(() => ProjectToNarrativeCreateOrConnectWithoutProjectInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ProjectToNarrativeCreateManyProjectInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ProjectToNarrativeWhereUniqueInputSchema),z.lazy(() => ProjectToNarrativeWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const RewardPoolUncheckedCreateNestedManyWithoutProjectInputSchema: z.ZodType<Prisma.RewardPoolUncheckedCreateNestedManyWithoutProjectInput> = z.object({
  create: z.union([ z.lazy(() => RewardPoolCreateWithoutProjectInputSchema),z.lazy(() => RewardPoolCreateWithoutProjectInputSchema).array(),z.lazy(() => RewardPoolUncheckedCreateWithoutProjectInputSchema),z.lazy(() => RewardPoolUncheckedCreateWithoutProjectInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RewardPoolCreateOrConnectWithoutProjectInputSchema),z.lazy(() => RewardPoolCreateOrConnectWithoutProjectInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RewardPoolCreateManyProjectInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => RewardPoolWhereUniqueInputSchema),z.lazy(() => RewardPoolWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const KOLToProjectUncheckedCreateNestedManyWithoutProjectInputSchema: z.ZodType<Prisma.KOLToProjectUncheckedCreateNestedManyWithoutProjectInput> = z.object({
  create: z.union([ z.lazy(() => KOLToProjectCreateWithoutProjectInputSchema),z.lazy(() => KOLToProjectCreateWithoutProjectInputSchema).array(),z.lazy(() => KOLToProjectUncheckedCreateWithoutProjectInputSchema),z.lazy(() => KOLToProjectUncheckedCreateWithoutProjectInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => KOLToProjectCreateOrConnectWithoutProjectInputSchema),z.lazy(() => KOLToProjectCreateOrConnectWithoutProjectInputSchema).array() ]).optional(),
  createMany: z.lazy(() => KOLToProjectCreateManyProjectInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => KOLToProjectWhereUniqueInputSchema),z.lazy(() => KOLToProjectWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const NullableBoolFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableBoolFieldUpdateOperationsInput> = z.object({
  set: z.boolean().optional().nullable()
}).strict();

export const ProjectSnapshotUpdateManyWithoutProjectNestedInputSchema: z.ZodType<Prisma.ProjectSnapshotUpdateManyWithoutProjectNestedInput> = z.object({
  create: z.union([ z.lazy(() => ProjectSnapshotCreateWithoutProjectInputSchema),z.lazy(() => ProjectSnapshotCreateWithoutProjectInputSchema).array(),z.lazy(() => ProjectSnapshotUncheckedCreateWithoutProjectInputSchema),z.lazy(() => ProjectSnapshotUncheckedCreateWithoutProjectInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ProjectSnapshotCreateOrConnectWithoutProjectInputSchema),z.lazy(() => ProjectSnapshotCreateOrConnectWithoutProjectInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ProjectSnapshotUpsertWithWhereUniqueWithoutProjectInputSchema),z.lazy(() => ProjectSnapshotUpsertWithWhereUniqueWithoutProjectInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ProjectSnapshotCreateManyProjectInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ProjectSnapshotWhereUniqueInputSchema),z.lazy(() => ProjectSnapshotWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ProjectSnapshotWhereUniqueInputSchema),z.lazy(() => ProjectSnapshotWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ProjectSnapshotWhereUniqueInputSchema),z.lazy(() => ProjectSnapshotWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ProjectSnapshotWhereUniqueInputSchema),z.lazy(() => ProjectSnapshotWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ProjectSnapshotUpdateWithWhereUniqueWithoutProjectInputSchema),z.lazy(() => ProjectSnapshotUpdateWithWhereUniqueWithoutProjectInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ProjectSnapshotUpdateManyWithWhereWithoutProjectInputSchema),z.lazy(() => ProjectSnapshotUpdateManyWithWhereWithoutProjectInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ProjectSnapshotScalarWhereInputSchema),z.lazy(() => ProjectSnapshotScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ProjectToNarrativeUpdateManyWithoutProjectNestedInputSchema: z.ZodType<Prisma.ProjectToNarrativeUpdateManyWithoutProjectNestedInput> = z.object({
  create: z.union([ z.lazy(() => ProjectToNarrativeCreateWithoutProjectInputSchema),z.lazy(() => ProjectToNarrativeCreateWithoutProjectInputSchema).array(),z.lazy(() => ProjectToNarrativeUncheckedCreateWithoutProjectInputSchema),z.lazy(() => ProjectToNarrativeUncheckedCreateWithoutProjectInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ProjectToNarrativeCreateOrConnectWithoutProjectInputSchema),z.lazy(() => ProjectToNarrativeCreateOrConnectWithoutProjectInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ProjectToNarrativeUpsertWithWhereUniqueWithoutProjectInputSchema),z.lazy(() => ProjectToNarrativeUpsertWithWhereUniqueWithoutProjectInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ProjectToNarrativeCreateManyProjectInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ProjectToNarrativeWhereUniqueInputSchema),z.lazy(() => ProjectToNarrativeWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ProjectToNarrativeWhereUniqueInputSchema),z.lazy(() => ProjectToNarrativeWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ProjectToNarrativeWhereUniqueInputSchema),z.lazy(() => ProjectToNarrativeWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ProjectToNarrativeWhereUniqueInputSchema),z.lazy(() => ProjectToNarrativeWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ProjectToNarrativeUpdateWithWhereUniqueWithoutProjectInputSchema),z.lazy(() => ProjectToNarrativeUpdateWithWhereUniqueWithoutProjectInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ProjectToNarrativeUpdateManyWithWhereWithoutProjectInputSchema),z.lazy(() => ProjectToNarrativeUpdateManyWithWhereWithoutProjectInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ProjectToNarrativeScalarWhereInputSchema),z.lazy(() => ProjectToNarrativeScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const RewardPoolUpdateManyWithoutProjectNestedInputSchema: z.ZodType<Prisma.RewardPoolUpdateManyWithoutProjectNestedInput> = z.object({
  create: z.union([ z.lazy(() => RewardPoolCreateWithoutProjectInputSchema),z.lazy(() => RewardPoolCreateWithoutProjectInputSchema).array(),z.lazy(() => RewardPoolUncheckedCreateWithoutProjectInputSchema),z.lazy(() => RewardPoolUncheckedCreateWithoutProjectInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RewardPoolCreateOrConnectWithoutProjectInputSchema),z.lazy(() => RewardPoolCreateOrConnectWithoutProjectInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => RewardPoolUpsertWithWhereUniqueWithoutProjectInputSchema),z.lazy(() => RewardPoolUpsertWithWhereUniqueWithoutProjectInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RewardPoolCreateManyProjectInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => RewardPoolWhereUniqueInputSchema),z.lazy(() => RewardPoolWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => RewardPoolWhereUniqueInputSchema),z.lazy(() => RewardPoolWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => RewardPoolWhereUniqueInputSchema),z.lazy(() => RewardPoolWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RewardPoolWhereUniqueInputSchema),z.lazy(() => RewardPoolWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => RewardPoolUpdateWithWhereUniqueWithoutProjectInputSchema),z.lazy(() => RewardPoolUpdateWithWhereUniqueWithoutProjectInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => RewardPoolUpdateManyWithWhereWithoutProjectInputSchema),z.lazy(() => RewardPoolUpdateManyWithWhereWithoutProjectInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => RewardPoolScalarWhereInputSchema),z.lazy(() => RewardPoolScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const KOLToProjectUpdateManyWithoutProjectNestedInputSchema: z.ZodType<Prisma.KOLToProjectUpdateManyWithoutProjectNestedInput> = z.object({
  create: z.union([ z.lazy(() => KOLToProjectCreateWithoutProjectInputSchema),z.lazy(() => KOLToProjectCreateWithoutProjectInputSchema).array(),z.lazy(() => KOLToProjectUncheckedCreateWithoutProjectInputSchema),z.lazy(() => KOLToProjectUncheckedCreateWithoutProjectInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => KOLToProjectCreateOrConnectWithoutProjectInputSchema),z.lazy(() => KOLToProjectCreateOrConnectWithoutProjectInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => KOLToProjectUpsertWithWhereUniqueWithoutProjectInputSchema),z.lazy(() => KOLToProjectUpsertWithWhereUniqueWithoutProjectInputSchema).array() ]).optional(),
  createMany: z.lazy(() => KOLToProjectCreateManyProjectInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => KOLToProjectWhereUniqueInputSchema),z.lazy(() => KOLToProjectWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => KOLToProjectWhereUniqueInputSchema),z.lazy(() => KOLToProjectWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => KOLToProjectWhereUniqueInputSchema),z.lazy(() => KOLToProjectWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => KOLToProjectWhereUniqueInputSchema),z.lazy(() => KOLToProjectWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => KOLToProjectUpdateWithWhereUniqueWithoutProjectInputSchema),z.lazy(() => KOLToProjectUpdateWithWhereUniqueWithoutProjectInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => KOLToProjectUpdateManyWithWhereWithoutProjectInputSchema),z.lazy(() => KOLToProjectUpdateManyWithWhereWithoutProjectInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => KOLToProjectScalarWhereInputSchema),z.lazy(() => KOLToProjectScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ProjectSnapshotUncheckedUpdateManyWithoutProjectNestedInputSchema: z.ZodType<Prisma.ProjectSnapshotUncheckedUpdateManyWithoutProjectNestedInput> = z.object({
  create: z.union([ z.lazy(() => ProjectSnapshotCreateWithoutProjectInputSchema),z.lazy(() => ProjectSnapshotCreateWithoutProjectInputSchema).array(),z.lazy(() => ProjectSnapshotUncheckedCreateWithoutProjectInputSchema),z.lazy(() => ProjectSnapshotUncheckedCreateWithoutProjectInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ProjectSnapshotCreateOrConnectWithoutProjectInputSchema),z.lazy(() => ProjectSnapshotCreateOrConnectWithoutProjectInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ProjectSnapshotUpsertWithWhereUniqueWithoutProjectInputSchema),z.lazy(() => ProjectSnapshotUpsertWithWhereUniqueWithoutProjectInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ProjectSnapshotCreateManyProjectInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ProjectSnapshotWhereUniqueInputSchema),z.lazy(() => ProjectSnapshotWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ProjectSnapshotWhereUniqueInputSchema),z.lazy(() => ProjectSnapshotWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ProjectSnapshotWhereUniqueInputSchema),z.lazy(() => ProjectSnapshotWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ProjectSnapshotWhereUniqueInputSchema),z.lazy(() => ProjectSnapshotWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ProjectSnapshotUpdateWithWhereUniqueWithoutProjectInputSchema),z.lazy(() => ProjectSnapshotUpdateWithWhereUniqueWithoutProjectInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ProjectSnapshotUpdateManyWithWhereWithoutProjectInputSchema),z.lazy(() => ProjectSnapshotUpdateManyWithWhereWithoutProjectInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ProjectSnapshotScalarWhereInputSchema),z.lazy(() => ProjectSnapshotScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ProjectToNarrativeUncheckedUpdateManyWithoutProjectNestedInputSchema: z.ZodType<Prisma.ProjectToNarrativeUncheckedUpdateManyWithoutProjectNestedInput> = z.object({
  create: z.union([ z.lazy(() => ProjectToNarrativeCreateWithoutProjectInputSchema),z.lazy(() => ProjectToNarrativeCreateWithoutProjectInputSchema).array(),z.lazy(() => ProjectToNarrativeUncheckedCreateWithoutProjectInputSchema),z.lazy(() => ProjectToNarrativeUncheckedCreateWithoutProjectInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ProjectToNarrativeCreateOrConnectWithoutProjectInputSchema),z.lazy(() => ProjectToNarrativeCreateOrConnectWithoutProjectInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ProjectToNarrativeUpsertWithWhereUniqueWithoutProjectInputSchema),z.lazy(() => ProjectToNarrativeUpsertWithWhereUniqueWithoutProjectInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ProjectToNarrativeCreateManyProjectInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ProjectToNarrativeWhereUniqueInputSchema),z.lazy(() => ProjectToNarrativeWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ProjectToNarrativeWhereUniqueInputSchema),z.lazy(() => ProjectToNarrativeWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ProjectToNarrativeWhereUniqueInputSchema),z.lazy(() => ProjectToNarrativeWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ProjectToNarrativeWhereUniqueInputSchema),z.lazy(() => ProjectToNarrativeWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ProjectToNarrativeUpdateWithWhereUniqueWithoutProjectInputSchema),z.lazy(() => ProjectToNarrativeUpdateWithWhereUniqueWithoutProjectInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ProjectToNarrativeUpdateManyWithWhereWithoutProjectInputSchema),z.lazy(() => ProjectToNarrativeUpdateManyWithWhereWithoutProjectInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ProjectToNarrativeScalarWhereInputSchema),z.lazy(() => ProjectToNarrativeScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const RewardPoolUncheckedUpdateManyWithoutProjectNestedInputSchema: z.ZodType<Prisma.RewardPoolUncheckedUpdateManyWithoutProjectNestedInput> = z.object({
  create: z.union([ z.lazy(() => RewardPoolCreateWithoutProjectInputSchema),z.lazy(() => RewardPoolCreateWithoutProjectInputSchema).array(),z.lazy(() => RewardPoolUncheckedCreateWithoutProjectInputSchema),z.lazy(() => RewardPoolUncheckedCreateWithoutProjectInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RewardPoolCreateOrConnectWithoutProjectInputSchema),z.lazy(() => RewardPoolCreateOrConnectWithoutProjectInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => RewardPoolUpsertWithWhereUniqueWithoutProjectInputSchema),z.lazy(() => RewardPoolUpsertWithWhereUniqueWithoutProjectInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RewardPoolCreateManyProjectInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => RewardPoolWhereUniqueInputSchema),z.lazy(() => RewardPoolWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => RewardPoolWhereUniqueInputSchema),z.lazy(() => RewardPoolWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => RewardPoolWhereUniqueInputSchema),z.lazy(() => RewardPoolWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RewardPoolWhereUniqueInputSchema),z.lazy(() => RewardPoolWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => RewardPoolUpdateWithWhereUniqueWithoutProjectInputSchema),z.lazy(() => RewardPoolUpdateWithWhereUniqueWithoutProjectInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => RewardPoolUpdateManyWithWhereWithoutProjectInputSchema),z.lazy(() => RewardPoolUpdateManyWithWhereWithoutProjectInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => RewardPoolScalarWhereInputSchema),z.lazy(() => RewardPoolScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const KOLToProjectUncheckedUpdateManyWithoutProjectNestedInputSchema: z.ZodType<Prisma.KOLToProjectUncheckedUpdateManyWithoutProjectNestedInput> = z.object({
  create: z.union([ z.lazy(() => KOLToProjectCreateWithoutProjectInputSchema),z.lazy(() => KOLToProjectCreateWithoutProjectInputSchema).array(),z.lazy(() => KOLToProjectUncheckedCreateWithoutProjectInputSchema),z.lazy(() => KOLToProjectUncheckedCreateWithoutProjectInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => KOLToProjectCreateOrConnectWithoutProjectInputSchema),z.lazy(() => KOLToProjectCreateOrConnectWithoutProjectInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => KOLToProjectUpsertWithWhereUniqueWithoutProjectInputSchema),z.lazy(() => KOLToProjectUpsertWithWhereUniqueWithoutProjectInputSchema).array() ]).optional(),
  createMany: z.lazy(() => KOLToProjectCreateManyProjectInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => KOLToProjectWhereUniqueInputSchema),z.lazy(() => KOLToProjectWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => KOLToProjectWhereUniqueInputSchema),z.lazy(() => KOLToProjectWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => KOLToProjectWhereUniqueInputSchema),z.lazy(() => KOLToProjectWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => KOLToProjectWhereUniqueInputSchema),z.lazy(() => KOLToProjectWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => KOLToProjectUpdateWithWhereUniqueWithoutProjectInputSchema),z.lazy(() => KOLToProjectUpdateWithWhereUniqueWithoutProjectInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => KOLToProjectUpdateManyWithWhereWithoutProjectInputSchema),z.lazy(() => KOLToProjectUpdateManyWithWhereWithoutProjectInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => KOLToProjectScalarWhereInputSchema),z.lazy(() => KOLToProjectScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ProjectCreateNestedOneWithoutProjectSnapshotInputSchema: z.ZodType<Prisma.ProjectCreateNestedOneWithoutProjectSnapshotInput> = z.object({
  create: z.union([ z.lazy(() => ProjectCreateWithoutProjectSnapshotInputSchema),z.lazy(() => ProjectUncheckedCreateWithoutProjectSnapshotInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ProjectCreateOrConnectWithoutProjectSnapshotInputSchema).optional(),
  connect: z.lazy(() => ProjectWhereUniqueInputSchema).optional()
}).strict();

export const NarrativeCreateNestedOneWithoutProjectSnapshotInputSchema: z.ZodType<Prisma.NarrativeCreateNestedOneWithoutProjectSnapshotInput> = z.object({
  create: z.union([ z.lazy(() => NarrativeCreateWithoutProjectSnapshotInputSchema),z.lazy(() => NarrativeUncheckedCreateWithoutProjectSnapshotInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => NarrativeCreateOrConnectWithoutProjectSnapshotInputSchema).optional(),
  connect: z.lazy(() => NarrativeWhereUniqueInputSchema).optional()
}).strict();

export const ProjectUpdateOneRequiredWithoutProjectSnapshotNestedInputSchema: z.ZodType<Prisma.ProjectUpdateOneRequiredWithoutProjectSnapshotNestedInput> = z.object({
  create: z.union([ z.lazy(() => ProjectCreateWithoutProjectSnapshotInputSchema),z.lazy(() => ProjectUncheckedCreateWithoutProjectSnapshotInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ProjectCreateOrConnectWithoutProjectSnapshotInputSchema).optional(),
  upsert: z.lazy(() => ProjectUpsertWithoutProjectSnapshotInputSchema).optional(),
  connect: z.lazy(() => ProjectWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ProjectUpdateToOneWithWhereWithoutProjectSnapshotInputSchema),z.lazy(() => ProjectUpdateWithoutProjectSnapshotInputSchema),z.lazy(() => ProjectUncheckedUpdateWithoutProjectSnapshotInputSchema) ]).optional(),
}).strict();

export const NarrativeUpdateOneWithoutProjectSnapshotNestedInputSchema: z.ZodType<Prisma.NarrativeUpdateOneWithoutProjectSnapshotNestedInput> = z.object({
  create: z.union([ z.lazy(() => NarrativeCreateWithoutProjectSnapshotInputSchema),z.lazy(() => NarrativeUncheckedCreateWithoutProjectSnapshotInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => NarrativeCreateOrConnectWithoutProjectSnapshotInputSchema).optional(),
  upsert: z.lazy(() => NarrativeUpsertWithoutProjectSnapshotInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => NarrativeWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => NarrativeWhereInputSchema) ]).optional(),
  connect: z.lazy(() => NarrativeWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => NarrativeUpdateToOneWithWhereWithoutProjectSnapshotInputSchema),z.lazy(() => NarrativeUpdateWithoutProjectSnapshotInputSchema),z.lazy(() => NarrativeUncheckedUpdateWithoutProjectSnapshotInputSchema) ]).optional(),
}).strict();

export const NarrativeCreateNestedOneWithoutProjectLinksInputSchema: z.ZodType<Prisma.NarrativeCreateNestedOneWithoutProjectLinksInput> = z.object({
  create: z.union([ z.lazy(() => NarrativeCreateWithoutProjectLinksInputSchema),z.lazy(() => NarrativeUncheckedCreateWithoutProjectLinksInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => NarrativeCreateOrConnectWithoutProjectLinksInputSchema).optional(),
  connect: z.lazy(() => NarrativeWhereUniqueInputSchema).optional()
}).strict();

export const ProjectCreateNestedOneWithoutNarrativeLinksInputSchema: z.ZodType<Prisma.ProjectCreateNestedOneWithoutNarrativeLinksInput> = z.object({
  create: z.union([ z.lazy(() => ProjectCreateWithoutNarrativeLinksInputSchema),z.lazy(() => ProjectUncheckedCreateWithoutNarrativeLinksInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ProjectCreateOrConnectWithoutNarrativeLinksInputSchema).optional(),
  connect: z.lazy(() => ProjectWhereUniqueInputSchema).optional()
}).strict();

export const NarrativeUpdateOneRequiredWithoutProjectLinksNestedInputSchema: z.ZodType<Prisma.NarrativeUpdateOneRequiredWithoutProjectLinksNestedInput> = z.object({
  create: z.union([ z.lazy(() => NarrativeCreateWithoutProjectLinksInputSchema),z.lazy(() => NarrativeUncheckedCreateWithoutProjectLinksInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => NarrativeCreateOrConnectWithoutProjectLinksInputSchema).optional(),
  upsert: z.lazy(() => NarrativeUpsertWithoutProjectLinksInputSchema).optional(),
  connect: z.lazy(() => NarrativeWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => NarrativeUpdateToOneWithWhereWithoutProjectLinksInputSchema),z.lazy(() => NarrativeUpdateWithoutProjectLinksInputSchema),z.lazy(() => NarrativeUncheckedUpdateWithoutProjectLinksInputSchema) ]).optional(),
}).strict();

export const ProjectUpdateOneRequiredWithoutNarrativeLinksNestedInputSchema: z.ZodType<Prisma.ProjectUpdateOneRequiredWithoutNarrativeLinksNestedInput> = z.object({
  create: z.union([ z.lazy(() => ProjectCreateWithoutNarrativeLinksInputSchema),z.lazy(() => ProjectUncheckedCreateWithoutNarrativeLinksInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ProjectCreateOrConnectWithoutNarrativeLinksInputSchema).optional(),
  upsert: z.lazy(() => ProjectUpsertWithoutNarrativeLinksInputSchema).optional(),
  connect: z.lazy(() => ProjectWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ProjectUpdateToOneWithWhereWithoutNarrativeLinksInputSchema),z.lazy(() => ProjectUpdateWithoutNarrativeLinksInputSchema),z.lazy(() => ProjectUncheckedUpdateWithoutNarrativeLinksInputSchema) ]).optional(),
}).strict();

export const KOLToProjectCreateNestedManyWithoutKolInputSchema: z.ZodType<Prisma.KOLToProjectCreateNestedManyWithoutKolInput> = z.object({
  create: z.union([ z.lazy(() => KOLToProjectCreateWithoutKolInputSchema),z.lazy(() => KOLToProjectCreateWithoutKolInputSchema).array(),z.lazy(() => KOLToProjectUncheckedCreateWithoutKolInputSchema),z.lazy(() => KOLToProjectUncheckedCreateWithoutKolInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => KOLToProjectCreateOrConnectWithoutKolInputSchema),z.lazy(() => KOLToProjectCreateOrConnectWithoutKolInputSchema).array() ]).optional(),
  createMany: z.lazy(() => KOLToProjectCreateManyKolInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => KOLToProjectWhereUniqueInputSchema),z.lazy(() => KOLToProjectWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const KOLSnapshotCreateNestedManyWithoutKolInputSchema: z.ZodType<Prisma.KOLSnapshotCreateNestedManyWithoutKolInput> = z.object({
  create: z.union([ z.lazy(() => KOLSnapshotCreateWithoutKolInputSchema),z.lazy(() => KOLSnapshotCreateWithoutKolInputSchema).array(),z.lazy(() => KOLSnapshotUncheckedCreateWithoutKolInputSchema),z.lazy(() => KOLSnapshotUncheckedCreateWithoutKolInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => KOLSnapshotCreateOrConnectWithoutKolInputSchema),z.lazy(() => KOLSnapshotCreateOrConnectWithoutKolInputSchema).array() ]).optional(),
  createMany: z.lazy(() => KOLSnapshotCreateManyKolInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => KOLSnapshotWhereUniqueInputSchema),z.lazy(() => KOLSnapshotWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutKolInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutKolInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutKolInputSchema),z.lazy(() => UserUncheckedCreateWithoutKolInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutKolInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const KOLToProjectUncheckedCreateNestedManyWithoutKolInputSchema: z.ZodType<Prisma.KOLToProjectUncheckedCreateNestedManyWithoutKolInput> = z.object({
  create: z.union([ z.lazy(() => KOLToProjectCreateWithoutKolInputSchema),z.lazy(() => KOLToProjectCreateWithoutKolInputSchema).array(),z.lazy(() => KOLToProjectUncheckedCreateWithoutKolInputSchema),z.lazy(() => KOLToProjectUncheckedCreateWithoutKolInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => KOLToProjectCreateOrConnectWithoutKolInputSchema),z.lazy(() => KOLToProjectCreateOrConnectWithoutKolInputSchema).array() ]).optional(),
  createMany: z.lazy(() => KOLToProjectCreateManyKolInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => KOLToProjectWhereUniqueInputSchema),z.lazy(() => KOLToProjectWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const KOLSnapshotUncheckedCreateNestedManyWithoutKolInputSchema: z.ZodType<Prisma.KOLSnapshotUncheckedCreateNestedManyWithoutKolInput> = z.object({
  create: z.union([ z.lazy(() => KOLSnapshotCreateWithoutKolInputSchema),z.lazy(() => KOLSnapshotCreateWithoutKolInputSchema).array(),z.lazy(() => KOLSnapshotUncheckedCreateWithoutKolInputSchema),z.lazy(() => KOLSnapshotUncheckedCreateWithoutKolInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => KOLSnapshotCreateOrConnectWithoutKolInputSchema),z.lazy(() => KOLSnapshotCreateOrConnectWithoutKolInputSchema).array() ]).optional(),
  createMany: z.lazy(() => KOLSnapshotCreateManyKolInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => KOLSnapshotWhereUniqueInputSchema),z.lazy(() => KOLSnapshotWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UserUncheckedCreateNestedOneWithoutKolInputSchema: z.ZodType<Prisma.UserUncheckedCreateNestedOneWithoutKolInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutKolInputSchema),z.lazy(() => UserUncheckedCreateWithoutKolInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutKolInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const NullableFloatFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableFloatFieldUpdateOperationsInput> = z.object({
  set: z.number().optional().nullable(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const NullableBigIntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableBigIntFieldUpdateOperationsInput> = z.object({
  set: z.bigint().optional().nullable(),
  increment: z.bigint().optional(),
  decrement: z.bigint().optional(),
  multiply: z.bigint().optional(),
  divide: z.bigint().optional()
}).strict();

export const KOLToProjectUpdateManyWithoutKolNestedInputSchema: z.ZodType<Prisma.KOLToProjectUpdateManyWithoutKolNestedInput> = z.object({
  create: z.union([ z.lazy(() => KOLToProjectCreateWithoutKolInputSchema),z.lazy(() => KOLToProjectCreateWithoutKolInputSchema).array(),z.lazy(() => KOLToProjectUncheckedCreateWithoutKolInputSchema),z.lazy(() => KOLToProjectUncheckedCreateWithoutKolInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => KOLToProjectCreateOrConnectWithoutKolInputSchema),z.lazy(() => KOLToProjectCreateOrConnectWithoutKolInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => KOLToProjectUpsertWithWhereUniqueWithoutKolInputSchema),z.lazy(() => KOLToProjectUpsertWithWhereUniqueWithoutKolInputSchema).array() ]).optional(),
  createMany: z.lazy(() => KOLToProjectCreateManyKolInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => KOLToProjectWhereUniqueInputSchema),z.lazy(() => KOLToProjectWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => KOLToProjectWhereUniqueInputSchema),z.lazy(() => KOLToProjectWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => KOLToProjectWhereUniqueInputSchema),z.lazy(() => KOLToProjectWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => KOLToProjectWhereUniqueInputSchema),z.lazy(() => KOLToProjectWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => KOLToProjectUpdateWithWhereUniqueWithoutKolInputSchema),z.lazy(() => KOLToProjectUpdateWithWhereUniqueWithoutKolInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => KOLToProjectUpdateManyWithWhereWithoutKolInputSchema),z.lazy(() => KOLToProjectUpdateManyWithWhereWithoutKolInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => KOLToProjectScalarWhereInputSchema),z.lazy(() => KOLToProjectScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const KOLSnapshotUpdateManyWithoutKolNestedInputSchema: z.ZodType<Prisma.KOLSnapshotUpdateManyWithoutKolNestedInput> = z.object({
  create: z.union([ z.lazy(() => KOLSnapshotCreateWithoutKolInputSchema),z.lazy(() => KOLSnapshotCreateWithoutKolInputSchema).array(),z.lazy(() => KOLSnapshotUncheckedCreateWithoutKolInputSchema),z.lazy(() => KOLSnapshotUncheckedCreateWithoutKolInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => KOLSnapshotCreateOrConnectWithoutKolInputSchema),z.lazy(() => KOLSnapshotCreateOrConnectWithoutKolInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => KOLSnapshotUpsertWithWhereUniqueWithoutKolInputSchema),z.lazy(() => KOLSnapshotUpsertWithWhereUniqueWithoutKolInputSchema).array() ]).optional(),
  createMany: z.lazy(() => KOLSnapshotCreateManyKolInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => KOLSnapshotWhereUniqueInputSchema),z.lazy(() => KOLSnapshotWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => KOLSnapshotWhereUniqueInputSchema),z.lazy(() => KOLSnapshotWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => KOLSnapshotWhereUniqueInputSchema),z.lazy(() => KOLSnapshotWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => KOLSnapshotWhereUniqueInputSchema),z.lazy(() => KOLSnapshotWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => KOLSnapshotUpdateWithWhereUniqueWithoutKolInputSchema),z.lazy(() => KOLSnapshotUpdateWithWhereUniqueWithoutKolInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => KOLSnapshotUpdateManyWithWhereWithoutKolInputSchema),z.lazy(() => KOLSnapshotUpdateManyWithWhereWithoutKolInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => KOLSnapshotScalarWhereInputSchema),z.lazy(() => KOLSnapshotScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserUpdateOneWithoutKolNestedInputSchema: z.ZodType<Prisma.UserUpdateOneWithoutKolNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutKolInputSchema),z.lazy(() => UserUncheckedCreateWithoutKolInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutKolInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutKolInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => UserWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => UserWhereInputSchema) ]).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutKolInputSchema),z.lazy(() => UserUpdateWithoutKolInputSchema),z.lazy(() => UserUncheckedUpdateWithoutKolInputSchema) ]).optional(),
}).strict();

export const KOLToProjectUncheckedUpdateManyWithoutKolNestedInputSchema: z.ZodType<Prisma.KOLToProjectUncheckedUpdateManyWithoutKolNestedInput> = z.object({
  create: z.union([ z.lazy(() => KOLToProjectCreateWithoutKolInputSchema),z.lazy(() => KOLToProjectCreateWithoutKolInputSchema).array(),z.lazy(() => KOLToProjectUncheckedCreateWithoutKolInputSchema),z.lazy(() => KOLToProjectUncheckedCreateWithoutKolInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => KOLToProjectCreateOrConnectWithoutKolInputSchema),z.lazy(() => KOLToProjectCreateOrConnectWithoutKolInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => KOLToProjectUpsertWithWhereUniqueWithoutKolInputSchema),z.lazy(() => KOLToProjectUpsertWithWhereUniqueWithoutKolInputSchema).array() ]).optional(),
  createMany: z.lazy(() => KOLToProjectCreateManyKolInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => KOLToProjectWhereUniqueInputSchema),z.lazy(() => KOLToProjectWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => KOLToProjectWhereUniqueInputSchema),z.lazy(() => KOLToProjectWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => KOLToProjectWhereUniqueInputSchema),z.lazy(() => KOLToProjectWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => KOLToProjectWhereUniqueInputSchema),z.lazy(() => KOLToProjectWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => KOLToProjectUpdateWithWhereUniqueWithoutKolInputSchema),z.lazy(() => KOLToProjectUpdateWithWhereUniqueWithoutKolInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => KOLToProjectUpdateManyWithWhereWithoutKolInputSchema),z.lazy(() => KOLToProjectUpdateManyWithWhereWithoutKolInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => KOLToProjectScalarWhereInputSchema),z.lazy(() => KOLToProjectScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const KOLSnapshotUncheckedUpdateManyWithoutKolNestedInputSchema: z.ZodType<Prisma.KOLSnapshotUncheckedUpdateManyWithoutKolNestedInput> = z.object({
  create: z.union([ z.lazy(() => KOLSnapshotCreateWithoutKolInputSchema),z.lazy(() => KOLSnapshotCreateWithoutKolInputSchema).array(),z.lazy(() => KOLSnapshotUncheckedCreateWithoutKolInputSchema),z.lazy(() => KOLSnapshotUncheckedCreateWithoutKolInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => KOLSnapshotCreateOrConnectWithoutKolInputSchema),z.lazy(() => KOLSnapshotCreateOrConnectWithoutKolInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => KOLSnapshotUpsertWithWhereUniqueWithoutKolInputSchema),z.lazy(() => KOLSnapshotUpsertWithWhereUniqueWithoutKolInputSchema).array() ]).optional(),
  createMany: z.lazy(() => KOLSnapshotCreateManyKolInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => KOLSnapshotWhereUniqueInputSchema),z.lazy(() => KOLSnapshotWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => KOLSnapshotWhereUniqueInputSchema),z.lazy(() => KOLSnapshotWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => KOLSnapshotWhereUniqueInputSchema),z.lazy(() => KOLSnapshotWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => KOLSnapshotWhereUniqueInputSchema),z.lazy(() => KOLSnapshotWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => KOLSnapshotUpdateWithWhereUniqueWithoutKolInputSchema),z.lazy(() => KOLSnapshotUpdateWithWhereUniqueWithoutKolInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => KOLSnapshotUpdateManyWithWhereWithoutKolInputSchema),z.lazy(() => KOLSnapshotUpdateManyWithWhereWithoutKolInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => KOLSnapshotScalarWhereInputSchema),z.lazy(() => KOLSnapshotScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserUncheckedUpdateOneWithoutKolNestedInputSchema: z.ZodType<Prisma.UserUncheckedUpdateOneWithoutKolNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutKolInputSchema),z.lazy(() => UserUncheckedCreateWithoutKolInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutKolInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutKolInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => UserWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => UserWhereInputSchema) ]).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutKolInputSchema),z.lazy(() => UserUpdateWithoutKolInputSchema),z.lazy(() => UserUncheckedUpdateWithoutKolInputSchema) ]).optional(),
}).strict();

export const KOLCreateNestedOneWithoutKolSnapshotInputSchema: z.ZodType<Prisma.KOLCreateNestedOneWithoutKolSnapshotInput> = z.object({
  create: z.union([ z.lazy(() => KOLCreateWithoutKolSnapshotInputSchema),z.lazy(() => KOLUncheckedCreateWithoutKolSnapshotInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => KOLCreateOrConnectWithoutKolSnapshotInputSchema).optional(),
  connect: z.lazy(() => KOLWhereUniqueInputSchema).optional()
}).strict();

export const BigIntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.BigIntFieldUpdateOperationsInput> = z.object({
  set: z.bigint().optional(),
  increment: z.bigint().optional(),
  decrement: z.bigint().optional(),
  multiply: z.bigint().optional(),
  divide: z.bigint().optional()
}).strict();

export const KOLUpdateOneRequiredWithoutKolSnapshotNestedInputSchema: z.ZodType<Prisma.KOLUpdateOneRequiredWithoutKolSnapshotNestedInput> = z.object({
  create: z.union([ z.lazy(() => KOLCreateWithoutKolSnapshotInputSchema),z.lazy(() => KOLUncheckedCreateWithoutKolSnapshotInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => KOLCreateOrConnectWithoutKolSnapshotInputSchema).optional(),
  upsert: z.lazy(() => KOLUpsertWithoutKolSnapshotInputSchema).optional(),
  connect: z.lazy(() => KOLWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => KOLUpdateToOneWithWhereWithoutKolSnapshotInputSchema),z.lazy(() => KOLUpdateWithoutKolSnapshotInputSchema),z.lazy(() => KOLUncheckedUpdateWithoutKolSnapshotInputSchema) ]).optional(),
}).strict();

export const KOLCreateNestedOneWithoutProjectsInputSchema: z.ZodType<Prisma.KOLCreateNestedOneWithoutProjectsInput> = z.object({
  create: z.union([ z.lazy(() => KOLCreateWithoutProjectsInputSchema),z.lazy(() => KOLUncheckedCreateWithoutProjectsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => KOLCreateOrConnectWithoutProjectsInputSchema).optional(),
  connect: z.lazy(() => KOLWhereUniqueInputSchema).optional()
}).strict();

export const ProjectCreateNestedOneWithoutKolsInputSchema: z.ZodType<Prisma.ProjectCreateNestedOneWithoutKolsInput> = z.object({
  create: z.union([ z.lazy(() => ProjectCreateWithoutKolsInputSchema),z.lazy(() => ProjectUncheckedCreateWithoutKolsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ProjectCreateOrConnectWithoutKolsInputSchema).optional(),
  connect: z.lazy(() => ProjectWhereUniqueInputSchema).optional()
}).strict();

export const KOLUpdateOneRequiredWithoutProjectsNestedInputSchema: z.ZodType<Prisma.KOLUpdateOneRequiredWithoutProjectsNestedInput> = z.object({
  create: z.union([ z.lazy(() => KOLCreateWithoutProjectsInputSchema),z.lazy(() => KOLUncheckedCreateWithoutProjectsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => KOLCreateOrConnectWithoutProjectsInputSchema).optional(),
  upsert: z.lazy(() => KOLUpsertWithoutProjectsInputSchema).optional(),
  connect: z.lazy(() => KOLWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => KOLUpdateToOneWithWhereWithoutProjectsInputSchema),z.lazy(() => KOLUpdateWithoutProjectsInputSchema),z.lazy(() => KOLUncheckedUpdateWithoutProjectsInputSchema) ]).optional(),
}).strict();

export const ProjectUpdateOneRequiredWithoutKolsNestedInputSchema: z.ZodType<Prisma.ProjectUpdateOneRequiredWithoutKolsNestedInput> = z.object({
  create: z.union([ z.lazy(() => ProjectCreateWithoutKolsInputSchema),z.lazy(() => ProjectUncheckedCreateWithoutKolsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ProjectCreateOrConnectWithoutKolsInputSchema).optional(),
  upsert: z.lazy(() => ProjectUpsertWithoutKolsInputSchema).optional(),
  connect: z.lazy(() => ProjectWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ProjectUpdateToOneWithWhereWithoutKolsInputSchema),z.lazy(() => ProjectUpdateWithoutKolsInputSchema),z.lazy(() => ProjectUncheckedUpdateWithoutKolsInputSchema) ]).optional(),
}).strict();

export const RewardPoolCreateplatformsInputSchema: z.ZodType<Prisma.RewardPoolCreateplatformsInput> = z.object({
  set: z.string().array()
}).strict();

export const RewardPoolCreaterequirementsInputSchema: z.ZodType<Prisma.RewardPoolCreaterequirementsInput> = z.object({
  set: z.string().array()
}).strict();

export const ProjectCreateNestedOneWithoutRewardPoolsInputSchema: z.ZodType<Prisma.ProjectCreateNestedOneWithoutRewardPoolsInput> = z.object({
  create: z.union([ z.lazy(() => ProjectCreateWithoutRewardPoolsInputSchema),z.lazy(() => ProjectUncheckedCreateWithoutRewardPoolsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ProjectCreateOrConnectWithoutRewardPoolsInputSchema).optional(),
  connect: z.lazy(() => ProjectWhereUniqueInputSchema).optional()
}).strict();

export const RewardPoolUpdateplatformsInputSchema: z.ZodType<Prisma.RewardPoolUpdateplatformsInput> = z.object({
  set: z.string().array().optional(),
  push: z.union([ z.string(),z.string().array() ]).optional(),
}).strict();

export const EnumRewardPoolStatusFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumRewardPoolStatusFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => RewardPoolStatusSchema).optional()
}).strict();

export const RewardPoolUpdaterequirementsInputSchema: z.ZodType<Prisma.RewardPoolUpdaterequirementsInput> = z.object({
  set: z.string().array().optional(),
  push: z.union([ z.string(),z.string().array() ]).optional(),
}).strict();

export const ProjectUpdateOneRequiredWithoutRewardPoolsNestedInputSchema: z.ZodType<Prisma.ProjectUpdateOneRequiredWithoutRewardPoolsNestedInput> = z.object({
  create: z.union([ z.lazy(() => ProjectCreateWithoutRewardPoolsInputSchema),z.lazy(() => ProjectUncheckedCreateWithoutRewardPoolsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ProjectCreateOrConnectWithoutRewardPoolsInputSchema).optional(),
  upsert: z.lazy(() => ProjectUpsertWithoutRewardPoolsInputSchema).optional(),
  connect: z.lazy(() => ProjectWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ProjectUpdateToOneWithWhereWithoutRewardPoolsInputSchema),z.lazy(() => ProjectUpdateWithoutRewardPoolsInputSchema),z.lazy(() => ProjectUncheckedUpdateWithoutRewardPoolsInputSchema) ]).optional(),
}).strict();

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const NestedDateTimeFilterSchema: z.ZodType<Prisma.NestedDateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const NestedIntWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const NestedFloatFilterSchema: z.ZodType<Prisma.NestedFloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
}).strict();

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const NestedDateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const NestedStringNullableFilterSchema: z.ZodType<Prisma.NestedStringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedStringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const NestedIntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedIntNullableFilterSchema).optional()
}).strict();

export const NestedFloatNullableFilterSchema: z.ZodType<Prisma.NestedFloatNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedBoolFilterSchema: z.ZodType<Prisma.NestedBoolFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
}).strict();

export const NestedBoolWithAggregatesFilterSchema: z.ZodType<Prisma.NestedBoolWithAggregatesFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional()
}).strict();

export const NestedFloatWithAggregatesFilterSchema: z.ZodType<Prisma.NestedFloatWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedFloatFilterSchema).optional(),
  _min: z.lazy(() => NestedFloatFilterSchema).optional(),
  _max: z.lazy(() => NestedFloatFilterSchema).optional()
}).strict();

export const NestedBoolNullableFilterSchema: z.ZodType<Prisma.NestedBoolNullableFilter> = z.object({
  equals: z.boolean().optional().nullable(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedBoolNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedBoolNullableWithAggregatesFilter> = z.object({
  equals: z.boolean().optional().nullable(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolNullableFilterSchema).optional()
}).strict();

export const NestedBigIntNullableFilterSchema: z.ZodType<Prisma.NestedBigIntNullableFilter> = z.object({
  equals: z.bigint().optional().nullable(),
  in: z.bigint().array().optional().nullable(),
  notIn: z.bigint().array().optional().nullable(),
  lt: z.bigint().optional(),
  lte: z.bigint().optional(),
  gt: z.bigint().optional(),
  gte: z.bigint().optional(),
  not: z.union([ z.bigint(),z.lazy(() => NestedBigIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedFloatNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedFloatNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedFloatNullableFilterSchema).optional()
}).strict();

export const NestedBigIntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedBigIntNullableWithAggregatesFilter> = z.object({
  equals: z.bigint().optional().nullable(),
  in: z.bigint().array().optional().nullable(),
  notIn: z.bigint().array().optional().nullable(),
  lt: z.bigint().optional(),
  lte: z.bigint().optional(),
  gt: z.bigint().optional(),
  gte: z.bigint().optional(),
  not: z.union([ z.bigint(),z.lazy(() => NestedBigIntNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedBigIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedBigIntNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedBigIntNullableFilterSchema).optional()
}).strict();

export const NestedBigIntFilterSchema: z.ZodType<Prisma.NestedBigIntFilter> = z.object({
  equals: z.bigint().optional(),
  in: z.bigint().array().optional(),
  notIn: z.bigint().array().optional(),
  lt: z.bigint().optional(),
  lte: z.bigint().optional(),
  gt: z.bigint().optional(),
  gte: z.bigint().optional(),
  not: z.union([ z.bigint(),z.lazy(() => NestedBigIntFilterSchema) ]).optional(),
}).strict();

export const NestedBigIntWithAggregatesFilterSchema: z.ZodType<Prisma.NestedBigIntWithAggregatesFilter> = z.object({
  equals: z.bigint().optional(),
  in: z.bigint().array().optional(),
  notIn: z.bigint().array().optional(),
  lt: z.bigint().optional(),
  lte: z.bigint().optional(),
  gt: z.bigint().optional(),
  gte: z.bigint().optional(),
  not: z.union([ z.bigint(),z.lazy(() => NestedBigIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedBigIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBigIntFilterSchema).optional(),
  _max: z.lazy(() => NestedBigIntFilterSchema).optional()
}).strict();

export const NestedEnumRewardPoolStatusFilterSchema: z.ZodType<Prisma.NestedEnumRewardPoolStatusFilter> = z.object({
  equals: z.lazy(() => RewardPoolStatusSchema).optional(),
  in: z.lazy(() => RewardPoolStatusSchema).array().optional(),
  notIn: z.lazy(() => RewardPoolStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => RewardPoolStatusSchema),z.lazy(() => NestedEnumRewardPoolStatusFilterSchema) ]).optional(),
}).strict();

export const NestedEnumRewardPoolStatusWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumRewardPoolStatusWithAggregatesFilter> = z.object({
  equals: z.lazy(() => RewardPoolStatusSchema).optional(),
  in: z.lazy(() => RewardPoolStatusSchema).array().optional(),
  notIn: z.lazy(() => RewardPoolStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => RewardPoolStatusSchema),z.lazy(() => NestedEnumRewardPoolStatusWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumRewardPoolStatusFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumRewardPoolStatusFilterSchema).optional()
}).strict();

export const UserCreateWithoutReferralsInputSchema: z.ZodType<Prisma.UserCreateWithoutReferralsInput> = z.object({
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  username: z.string().optional().nullable(),
  avatarUrl: z.string().optional().nullable(),
  platform: z.string().optional(),
  email: z.string().optional().nullable(),
  twitterHandle: z.string().optional().nullable(),
  referralCode: z.string().cuid().optional(),
  onboardingStep: z.number().int().optional(),
  completedTasks: z.number().int().optional(),
  earnedPoints: z.number().int().optional(),
  referredBy: z.lazy(() => UserCreateNestedOneWithoutReferralsInputSchema).optional(),
  kol: z.lazy(() => KOLCreateNestedOneWithoutUserInputSchema).optional(),
  wallets: z.lazy(() => WalletCreateNestedManyWithoutUserInputSchema).optional(),
  primaryWallet: z.lazy(() => WalletCreateNestedOneWithoutPrimaryForInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutReferralsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutReferralsInput> = z.object({
  id: z.number().int().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  username: z.string().optional().nullable(),
  avatarUrl: z.string().optional().nullable(),
  platform: z.string().optional(),
  email: z.string().optional().nullable(),
  twitterHandle: z.string().optional().nullable(),
  referralCode: z.string().cuid().optional(),
  referredById: z.number().int().optional().nullable(),
  onboardingStep: z.number().int().optional(),
  completedTasks: z.number().int().optional(),
  earnedPoints: z.number().int().optional(),
  kolId: z.string().optional().nullable(),
  primaryWalletId: z.number().int().optional().nullable(),
  wallets: z.lazy(() => WalletUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutReferralsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutReferralsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutReferralsInputSchema),z.lazy(() => UserUncheckedCreateWithoutReferralsInputSchema) ]),
}).strict();

export const UserCreateWithoutReferredByInputSchema: z.ZodType<Prisma.UserCreateWithoutReferredByInput> = z.object({
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  username: z.string().optional().nullable(),
  avatarUrl: z.string().optional().nullable(),
  platform: z.string().optional(),
  email: z.string().optional().nullable(),
  twitterHandle: z.string().optional().nullable(),
  referralCode: z.string().cuid().optional(),
  onboardingStep: z.number().int().optional(),
  completedTasks: z.number().int().optional(),
  earnedPoints: z.number().int().optional(),
  referrals: z.lazy(() => UserCreateNestedManyWithoutReferredByInputSchema).optional(),
  kol: z.lazy(() => KOLCreateNestedOneWithoutUserInputSchema).optional(),
  wallets: z.lazy(() => WalletCreateNestedManyWithoutUserInputSchema).optional(),
  primaryWallet: z.lazy(() => WalletCreateNestedOneWithoutPrimaryForInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutReferredByInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutReferredByInput> = z.object({
  id: z.number().int().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  username: z.string().optional().nullable(),
  avatarUrl: z.string().optional().nullable(),
  platform: z.string().optional(),
  email: z.string().optional().nullable(),
  twitterHandle: z.string().optional().nullable(),
  referralCode: z.string().cuid().optional(),
  onboardingStep: z.number().int().optional(),
  completedTasks: z.number().int().optional(),
  earnedPoints: z.number().int().optional(),
  kolId: z.string().optional().nullable(),
  primaryWalletId: z.number().int().optional().nullable(),
  referrals: z.lazy(() => UserUncheckedCreateNestedManyWithoutReferredByInputSchema).optional(),
  wallets: z.lazy(() => WalletUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutReferredByInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutReferredByInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutReferredByInputSchema),z.lazy(() => UserUncheckedCreateWithoutReferredByInputSchema) ]),
}).strict();

export const UserCreateManyReferredByInputEnvelopeSchema: z.ZodType<Prisma.UserCreateManyReferredByInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => UserCreateManyReferredByInputSchema),z.lazy(() => UserCreateManyReferredByInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const KOLCreateWithoutUserInputSchema: z.ZodType<Prisma.KOLCreateWithoutUserInput> = z.object({
  id: z.string().optional(),
  hidden: z.boolean().optional(),
  isAlsoProject: z.boolean().optional(),
  twitterId: z.string(),
  twitterUsername: z.string(),
  twitterDisplayName: z.string(),
  twitterAvatarUrl: z.string(),
  twitterDescription: z.string(),
  twitterDescriptionLink: z.string().optional().nullable(),
  twitterFollowersCount: z.number().int(),
  twitterFollowingCount: z.number().int(),
  twitterIsVerified: z.boolean(),
  twitterGoldBadge: z.boolean().optional().nullable(),
  twitterLang: z.string(),
  twitterCreatedAt: z.coerce.date(),
  kolScore: z.number().optional().nullable(),
  kolScorePercentFromTotal: z.number().optional().nullable(),
  smartFollowersCount: z.number().int().optional().nullable(),
  threadsCount: z.number().int().optional().nullable(),
  engagementRate: z.number().optional().nullable(),
  smartEngagement: z.number().optional().nullable(),
  avgViews: z.number().int().optional().nullable(),
  avgLikes: z.number().int().optional().nullable(),
  totalPosts: z.number().int().optional().nullable(),
  totalViews: z.bigint().optional().nullable(),
  totalInteractions: z.bigint().optional().nullable(),
  totalOrganicPosts: z.number().int().optional().nullable(),
  totalOrganicViews: z.bigint().optional().nullable(),
  totalOrganicInteractions: z.bigint().optional().nullable(),
  totalAccountPosts: z.number().int().optional().nullable(),
  totalAccountViews: z.bigint().optional().nullable(),
  totalAccountInteractions: z.bigint().optional().nullable(),
  totalAccountComments: z.number().int().optional().nullable(),
  totalAccountLikes: z.number().int().optional().nullable(),
  totalAccountRetweets: z.number().int().optional().nullable(),
  totalAccountReplies: z.number().int().optional().nullable(),
  totalPostsChange: z.number().optional().nullable(),
  totalInteractionsChange: z.number().optional().nullable(),
  totalViewsChange: z.number().optional().nullable(),
  followersChange: z.number().optional().nullable(),
  smartEngagementChange: z.number().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  fetchedAt: z.coerce.date().optional(),
  projects: z.lazy(() => KOLToProjectCreateNestedManyWithoutKolInputSchema).optional(),
  kolSnapshot: z.lazy(() => KOLSnapshotCreateNestedManyWithoutKolInputSchema).optional()
}).strict();

export const KOLUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.KOLUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().optional(),
  hidden: z.boolean().optional(),
  isAlsoProject: z.boolean().optional(),
  twitterId: z.string(),
  twitterUsername: z.string(),
  twitterDisplayName: z.string(),
  twitterAvatarUrl: z.string(),
  twitterDescription: z.string(),
  twitterDescriptionLink: z.string().optional().nullable(),
  twitterFollowersCount: z.number().int(),
  twitterFollowingCount: z.number().int(),
  twitterIsVerified: z.boolean(),
  twitterGoldBadge: z.boolean().optional().nullable(),
  twitterLang: z.string(),
  twitterCreatedAt: z.coerce.date(),
  kolScore: z.number().optional().nullable(),
  kolScorePercentFromTotal: z.number().optional().nullable(),
  smartFollowersCount: z.number().int().optional().nullable(),
  threadsCount: z.number().int().optional().nullable(),
  engagementRate: z.number().optional().nullable(),
  smartEngagement: z.number().optional().nullable(),
  avgViews: z.number().int().optional().nullable(),
  avgLikes: z.number().int().optional().nullable(),
  totalPosts: z.number().int().optional().nullable(),
  totalViews: z.bigint().optional().nullable(),
  totalInteractions: z.bigint().optional().nullable(),
  totalOrganicPosts: z.number().int().optional().nullable(),
  totalOrganicViews: z.bigint().optional().nullable(),
  totalOrganicInteractions: z.bigint().optional().nullable(),
  totalAccountPosts: z.number().int().optional().nullable(),
  totalAccountViews: z.bigint().optional().nullable(),
  totalAccountInteractions: z.bigint().optional().nullable(),
  totalAccountComments: z.number().int().optional().nullable(),
  totalAccountLikes: z.number().int().optional().nullable(),
  totalAccountRetweets: z.number().int().optional().nullable(),
  totalAccountReplies: z.number().int().optional().nullable(),
  totalPostsChange: z.number().optional().nullable(),
  totalInteractionsChange: z.number().optional().nullable(),
  totalViewsChange: z.number().optional().nullable(),
  followersChange: z.number().optional().nullable(),
  smartEngagementChange: z.number().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  fetchedAt: z.coerce.date().optional(),
  projects: z.lazy(() => KOLToProjectUncheckedCreateNestedManyWithoutKolInputSchema).optional(),
  kolSnapshot: z.lazy(() => KOLSnapshotUncheckedCreateNestedManyWithoutKolInputSchema).optional()
}).strict();

export const KOLCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.KOLCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => KOLWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => KOLCreateWithoutUserInputSchema),z.lazy(() => KOLUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const WalletCreateWithoutUserInputSchema: z.ZodType<Prisma.WalletCreateWithoutUserInput> = z.object({
  address: z.string(),
  chain: z.string(),
  verified: z.boolean().optional(),
  label: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  primaryFor: z.lazy(() => UserCreateNestedOneWithoutPrimaryWalletInputSchema).optional()
}).strict();

export const WalletUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.WalletUncheckedCreateWithoutUserInput> = z.object({
  id: z.number().int().optional(),
  address: z.string(),
  chain: z.string(),
  verified: z.boolean().optional(),
  label: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  primaryFor: z.lazy(() => UserUncheckedCreateNestedOneWithoutPrimaryWalletInputSchema).optional()
}).strict();

export const WalletCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.WalletCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => WalletWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => WalletCreateWithoutUserInputSchema),z.lazy(() => WalletUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const WalletCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.WalletCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => WalletCreateManyUserInputSchema),z.lazy(() => WalletCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const WalletCreateWithoutPrimaryForInputSchema: z.ZodType<Prisma.WalletCreateWithoutPrimaryForInput> = z.object({
  address: z.string(),
  chain: z.string(),
  verified: z.boolean().optional(),
  label: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutWalletsInputSchema)
}).strict();

export const WalletUncheckedCreateWithoutPrimaryForInputSchema: z.ZodType<Prisma.WalletUncheckedCreateWithoutPrimaryForInput> = z.object({
  id: z.number().int().optional(),
  address: z.string(),
  chain: z.string(),
  userId: z.number().int(),
  verified: z.boolean().optional(),
  label: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional()
}).strict();

export const WalletCreateOrConnectWithoutPrimaryForInputSchema: z.ZodType<Prisma.WalletCreateOrConnectWithoutPrimaryForInput> = z.object({
  where: z.lazy(() => WalletWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => WalletCreateWithoutPrimaryForInputSchema),z.lazy(() => WalletUncheckedCreateWithoutPrimaryForInputSchema) ]),
}).strict();

export const UserUpsertWithoutReferralsInputSchema: z.ZodType<Prisma.UserUpsertWithoutReferralsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutReferralsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutReferralsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutReferralsInputSchema),z.lazy(() => UserUncheckedCreateWithoutReferralsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutReferralsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutReferralsInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutReferralsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutReferralsInputSchema) ]),
}).strict();

export const UserUpdateWithoutReferralsInputSchema: z.ZodType<Prisma.UserUpdateWithoutReferralsInput> = z.object({
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  avatarUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  platform: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  twitterHandle: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  referralCode: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  onboardingStep: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  completedTasks: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  earnedPoints: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  referredBy: z.lazy(() => UserUpdateOneWithoutReferralsNestedInputSchema).optional(),
  kol: z.lazy(() => KOLUpdateOneWithoutUserNestedInputSchema).optional(),
  wallets: z.lazy(() => WalletUpdateManyWithoutUserNestedInputSchema).optional(),
  primaryWallet: z.lazy(() => WalletUpdateOneWithoutPrimaryForNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutReferralsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutReferralsInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  avatarUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  platform: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  twitterHandle: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  referralCode: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  referredById: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  onboardingStep: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  completedTasks: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  earnedPoints: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  kolId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  primaryWalletId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  wallets: z.lazy(() => WalletUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUpsertWithWhereUniqueWithoutReferredByInputSchema: z.ZodType<Prisma.UserUpsertWithWhereUniqueWithoutReferredByInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => UserUpdateWithoutReferredByInputSchema),z.lazy(() => UserUncheckedUpdateWithoutReferredByInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutReferredByInputSchema),z.lazy(() => UserUncheckedCreateWithoutReferredByInputSchema) ]),
}).strict();

export const UserUpdateWithWhereUniqueWithoutReferredByInputSchema: z.ZodType<Prisma.UserUpdateWithWhereUniqueWithoutReferredByInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => UserUpdateWithoutReferredByInputSchema),z.lazy(() => UserUncheckedUpdateWithoutReferredByInputSchema) ]),
}).strict();

export const UserUpdateManyWithWhereWithoutReferredByInputSchema: z.ZodType<Prisma.UserUpdateManyWithWhereWithoutReferredByInput> = z.object({
  where: z.lazy(() => UserScalarWhereInputSchema),
  data: z.union([ z.lazy(() => UserUpdateManyMutationInputSchema),z.lazy(() => UserUncheckedUpdateManyWithoutReferredByInputSchema) ]),
}).strict();

export const UserScalarWhereInputSchema: z.ZodType<Prisma.UserScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserScalarWhereInputSchema),z.lazy(() => UserScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserScalarWhereInputSchema),z.lazy(() => UserScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  username: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  avatarUrl: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  platform: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  twitterHandle: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  referralCode: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  referredById: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  onboardingStep: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  completedTasks: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  earnedPoints: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  kolId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  primaryWalletId: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
}).strict();

export const KOLUpsertWithoutUserInputSchema: z.ZodType<Prisma.KOLUpsertWithoutUserInput> = z.object({
  update: z.union([ z.lazy(() => KOLUpdateWithoutUserInputSchema),z.lazy(() => KOLUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => KOLCreateWithoutUserInputSchema),z.lazy(() => KOLUncheckedCreateWithoutUserInputSchema) ]),
  where: z.lazy(() => KOLWhereInputSchema).optional()
}).strict();

export const KOLUpdateToOneWithWhereWithoutUserInputSchema: z.ZodType<Prisma.KOLUpdateToOneWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => KOLWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => KOLUpdateWithoutUserInputSchema),z.lazy(() => KOLUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const KOLUpdateWithoutUserInputSchema: z.ZodType<Prisma.KOLUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hidden: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isAlsoProject: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  twitterId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  twitterUsername: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  twitterDisplayName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  twitterAvatarUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  twitterDescription: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  twitterDescriptionLink: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  twitterFollowersCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  twitterFollowingCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  twitterIsVerified: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  twitterGoldBadge: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  twitterLang: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  twitterCreatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  kolScore: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  kolScorePercentFromTotal: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  smartFollowersCount: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  threadsCount: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  engagementRate: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  smartEngagement: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  avgViews: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  avgLikes: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  totalPosts: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  totalViews: z.union([ z.bigint(),z.lazy(() => NullableBigIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  totalInteractions: z.union([ z.bigint(),z.lazy(() => NullableBigIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  totalOrganicPosts: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  totalOrganicViews: z.union([ z.bigint(),z.lazy(() => NullableBigIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  totalOrganicInteractions: z.union([ z.bigint(),z.lazy(() => NullableBigIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  totalAccountPosts: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  totalAccountViews: z.union([ z.bigint(),z.lazy(() => NullableBigIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  totalAccountInteractions: z.union([ z.bigint(),z.lazy(() => NullableBigIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  totalAccountComments: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  totalAccountLikes: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  totalAccountRetweets: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  totalAccountReplies: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  totalPostsChange: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  totalInteractionsChange: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  totalViewsChange: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  followersChange: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  smartEngagementChange: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  fetchedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  projects: z.lazy(() => KOLToProjectUpdateManyWithoutKolNestedInputSchema).optional(),
  kolSnapshot: z.lazy(() => KOLSnapshotUpdateManyWithoutKolNestedInputSchema).optional()
}).strict();

export const KOLUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.KOLUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hidden: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isAlsoProject: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  twitterId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  twitterUsername: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  twitterDisplayName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  twitterAvatarUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  twitterDescription: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  twitterDescriptionLink: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  twitterFollowersCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  twitterFollowingCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  twitterIsVerified: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  twitterGoldBadge: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  twitterLang: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  twitterCreatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  kolScore: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  kolScorePercentFromTotal: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  smartFollowersCount: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  threadsCount: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  engagementRate: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  smartEngagement: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  avgViews: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  avgLikes: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  totalPosts: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  totalViews: z.union([ z.bigint(),z.lazy(() => NullableBigIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  totalInteractions: z.union([ z.bigint(),z.lazy(() => NullableBigIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  totalOrganicPosts: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  totalOrganicViews: z.union([ z.bigint(),z.lazy(() => NullableBigIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  totalOrganicInteractions: z.union([ z.bigint(),z.lazy(() => NullableBigIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  totalAccountPosts: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  totalAccountViews: z.union([ z.bigint(),z.lazy(() => NullableBigIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  totalAccountInteractions: z.union([ z.bigint(),z.lazy(() => NullableBigIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  totalAccountComments: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  totalAccountLikes: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  totalAccountRetweets: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  totalAccountReplies: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  totalPostsChange: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  totalInteractionsChange: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  totalViewsChange: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  followersChange: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  smartEngagementChange: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  fetchedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  projects: z.lazy(() => KOLToProjectUncheckedUpdateManyWithoutKolNestedInputSchema).optional(),
  kolSnapshot: z.lazy(() => KOLSnapshotUncheckedUpdateManyWithoutKolNestedInputSchema).optional()
}).strict();

export const WalletUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.WalletUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => WalletWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => WalletUpdateWithoutUserInputSchema),z.lazy(() => WalletUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => WalletCreateWithoutUserInputSchema),z.lazy(() => WalletUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const WalletUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.WalletUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => WalletWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => WalletUpdateWithoutUserInputSchema),z.lazy(() => WalletUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const WalletUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.WalletUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => WalletScalarWhereInputSchema),
  data: z.union([ z.lazy(() => WalletUpdateManyMutationInputSchema),z.lazy(() => WalletUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const WalletScalarWhereInputSchema: z.ZodType<Prisma.WalletScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => WalletScalarWhereInputSchema),z.lazy(() => WalletScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => WalletScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => WalletScalarWhereInputSchema),z.lazy(() => WalletScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  address: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  chain: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  verified: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  label: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const WalletUpsertWithoutPrimaryForInputSchema: z.ZodType<Prisma.WalletUpsertWithoutPrimaryForInput> = z.object({
  update: z.union([ z.lazy(() => WalletUpdateWithoutPrimaryForInputSchema),z.lazy(() => WalletUncheckedUpdateWithoutPrimaryForInputSchema) ]),
  create: z.union([ z.lazy(() => WalletCreateWithoutPrimaryForInputSchema),z.lazy(() => WalletUncheckedCreateWithoutPrimaryForInputSchema) ]),
  where: z.lazy(() => WalletWhereInputSchema).optional()
}).strict();

export const WalletUpdateToOneWithWhereWithoutPrimaryForInputSchema: z.ZodType<Prisma.WalletUpdateToOneWithWhereWithoutPrimaryForInput> = z.object({
  where: z.lazy(() => WalletWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => WalletUpdateWithoutPrimaryForInputSchema),z.lazy(() => WalletUncheckedUpdateWithoutPrimaryForInputSchema) ]),
}).strict();

export const WalletUpdateWithoutPrimaryForInputSchema: z.ZodType<Prisma.WalletUpdateWithoutPrimaryForInput> = z.object({
  address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  chain: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  verified: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  label: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutWalletsNestedInputSchema).optional()
}).strict();

export const WalletUncheckedUpdateWithoutPrimaryForInputSchema: z.ZodType<Prisma.WalletUncheckedUpdateWithoutPrimaryForInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  chain: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  verified: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  label: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserCreateWithoutWalletsInputSchema: z.ZodType<Prisma.UserCreateWithoutWalletsInput> = z.object({
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  username: z.string().optional().nullable(),
  avatarUrl: z.string().optional().nullable(),
  platform: z.string().optional(),
  email: z.string().optional().nullable(),
  twitterHandle: z.string().optional().nullable(),
  referralCode: z.string().cuid().optional(),
  onboardingStep: z.number().int().optional(),
  completedTasks: z.number().int().optional(),
  earnedPoints: z.number().int().optional(),
  referredBy: z.lazy(() => UserCreateNestedOneWithoutReferralsInputSchema).optional(),
  referrals: z.lazy(() => UserCreateNestedManyWithoutReferredByInputSchema).optional(),
  kol: z.lazy(() => KOLCreateNestedOneWithoutUserInputSchema).optional(),
  primaryWallet: z.lazy(() => WalletCreateNestedOneWithoutPrimaryForInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutWalletsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutWalletsInput> = z.object({
  id: z.number().int().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  username: z.string().optional().nullable(),
  avatarUrl: z.string().optional().nullable(),
  platform: z.string().optional(),
  email: z.string().optional().nullable(),
  twitterHandle: z.string().optional().nullable(),
  referralCode: z.string().cuid().optional(),
  referredById: z.number().int().optional().nullable(),
  onboardingStep: z.number().int().optional(),
  completedTasks: z.number().int().optional(),
  earnedPoints: z.number().int().optional(),
  kolId: z.string().optional().nullable(),
  primaryWalletId: z.number().int().optional().nullable(),
  referrals: z.lazy(() => UserUncheckedCreateNestedManyWithoutReferredByInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutWalletsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutWalletsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutWalletsInputSchema),z.lazy(() => UserUncheckedCreateWithoutWalletsInputSchema) ]),
}).strict();

export const UserCreateWithoutPrimaryWalletInputSchema: z.ZodType<Prisma.UserCreateWithoutPrimaryWalletInput> = z.object({
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  username: z.string().optional().nullable(),
  avatarUrl: z.string().optional().nullable(),
  platform: z.string().optional(),
  email: z.string().optional().nullable(),
  twitterHandle: z.string().optional().nullable(),
  referralCode: z.string().cuid().optional(),
  onboardingStep: z.number().int().optional(),
  completedTasks: z.number().int().optional(),
  earnedPoints: z.number().int().optional(),
  referredBy: z.lazy(() => UserCreateNestedOneWithoutReferralsInputSchema).optional(),
  referrals: z.lazy(() => UserCreateNestedManyWithoutReferredByInputSchema).optional(),
  kol: z.lazy(() => KOLCreateNestedOneWithoutUserInputSchema).optional(),
  wallets: z.lazy(() => WalletCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutPrimaryWalletInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutPrimaryWalletInput> = z.object({
  id: z.number().int().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  username: z.string().optional().nullable(),
  avatarUrl: z.string().optional().nullable(),
  platform: z.string().optional(),
  email: z.string().optional().nullable(),
  twitterHandle: z.string().optional().nullable(),
  referralCode: z.string().cuid().optional(),
  referredById: z.number().int().optional().nullable(),
  onboardingStep: z.number().int().optional(),
  completedTasks: z.number().int().optional(),
  earnedPoints: z.number().int().optional(),
  kolId: z.string().optional().nullable(),
  referrals: z.lazy(() => UserUncheckedCreateNestedManyWithoutReferredByInputSchema).optional(),
  wallets: z.lazy(() => WalletUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutPrimaryWalletInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutPrimaryWalletInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutPrimaryWalletInputSchema),z.lazy(() => UserUncheckedCreateWithoutPrimaryWalletInputSchema) ]),
}).strict();

export const UserUpsertWithoutWalletsInputSchema: z.ZodType<Prisma.UserUpsertWithoutWalletsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutWalletsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutWalletsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutWalletsInputSchema),z.lazy(() => UserUncheckedCreateWithoutWalletsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutWalletsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutWalletsInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutWalletsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutWalletsInputSchema) ]),
}).strict();

export const UserUpdateWithoutWalletsInputSchema: z.ZodType<Prisma.UserUpdateWithoutWalletsInput> = z.object({
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  avatarUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  platform: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  twitterHandle: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  referralCode: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  onboardingStep: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  completedTasks: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  earnedPoints: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  referredBy: z.lazy(() => UserUpdateOneWithoutReferralsNestedInputSchema).optional(),
  referrals: z.lazy(() => UserUpdateManyWithoutReferredByNestedInputSchema).optional(),
  kol: z.lazy(() => KOLUpdateOneWithoutUserNestedInputSchema).optional(),
  primaryWallet: z.lazy(() => WalletUpdateOneWithoutPrimaryForNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutWalletsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutWalletsInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  avatarUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  platform: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  twitterHandle: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  referralCode: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  referredById: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  onboardingStep: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  completedTasks: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  earnedPoints: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  kolId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  primaryWalletId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  referrals: z.lazy(() => UserUncheckedUpdateManyWithoutReferredByNestedInputSchema).optional()
}).strict();

export const UserUpsertWithoutPrimaryWalletInputSchema: z.ZodType<Prisma.UserUpsertWithoutPrimaryWalletInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutPrimaryWalletInputSchema),z.lazy(() => UserUncheckedUpdateWithoutPrimaryWalletInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutPrimaryWalletInputSchema),z.lazy(() => UserUncheckedCreateWithoutPrimaryWalletInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutPrimaryWalletInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutPrimaryWalletInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutPrimaryWalletInputSchema),z.lazy(() => UserUncheckedUpdateWithoutPrimaryWalletInputSchema) ]),
}).strict();

export const UserUpdateWithoutPrimaryWalletInputSchema: z.ZodType<Prisma.UserUpdateWithoutPrimaryWalletInput> = z.object({
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  avatarUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  platform: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  twitterHandle: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  referralCode: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  onboardingStep: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  completedTasks: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  earnedPoints: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  referredBy: z.lazy(() => UserUpdateOneWithoutReferralsNestedInputSchema).optional(),
  referrals: z.lazy(() => UserUpdateManyWithoutReferredByNestedInputSchema).optional(),
  kol: z.lazy(() => KOLUpdateOneWithoutUserNestedInputSchema).optional(),
  wallets: z.lazy(() => WalletUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutPrimaryWalletInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutPrimaryWalletInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  avatarUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  platform: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  twitterHandle: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  referralCode: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  referredById: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  onboardingStep: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  completedTasks: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  earnedPoints: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  kolId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  referrals: z.lazy(() => UserUncheckedUpdateManyWithoutReferredByNestedInputSchema).optional(),
  wallets: z.lazy(() => WalletUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const ProjectToNarrativeCreateWithoutNarrativeInputSchema: z.ZodType<Prisma.ProjectToNarrativeCreateWithoutNarrativeInput> = z.object({
  id: z.string().optional(),
  totalViews: z.number().int(),
  totalPosts: z.number().int(),
  mindsharePercent: z.number(),
  mindshareChange24h: z.number(),
  mindshareChange7d: z.number(),
  mindshareChange30d: z.number(),
  mindshareChange90d: z.number(),
  createdAt: z.coerce.date().optional(),
  project: z.lazy(() => ProjectCreateNestedOneWithoutNarrativeLinksInputSchema)
}).strict();

export const ProjectToNarrativeUncheckedCreateWithoutNarrativeInputSchema: z.ZodType<Prisma.ProjectToNarrativeUncheckedCreateWithoutNarrativeInput> = z.object({
  id: z.string().optional(),
  projectId: z.string(),
  totalViews: z.number().int(),
  totalPosts: z.number().int(),
  mindsharePercent: z.number(),
  mindshareChange24h: z.number(),
  mindshareChange7d: z.number(),
  mindshareChange30d: z.number(),
  mindshareChange90d: z.number(),
  createdAt: z.coerce.date().optional()
}).strict();

export const ProjectToNarrativeCreateOrConnectWithoutNarrativeInputSchema: z.ZodType<Prisma.ProjectToNarrativeCreateOrConnectWithoutNarrativeInput> = z.object({
  where: z.lazy(() => ProjectToNarrativeWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ProjectToNarrativeCreateWithoutNarrativeInputSchema),z.lazy(() => ProjectToNarrativeUncheckedCreateWithoutNarrativeInputSchema) ]),
}).strict();

export const ProjectToNarrativeCreateManyNarrativeInputEnvelopeSchema: z.ZodType<Prisma.ProjectToNarrativeCreateManyNarrativeInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => ProjectToNarrativeCreateManyNarrativeInputSchema),z.lazy(() => ProjectToNarrativeCreateManyNarrativeInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const NarrativeSnapshotCreateWithoutNarrativeInputSchema: z.ZodType<Prisma.NarrativeSnapshotCreateWithoutNarrativeInput> = z.object({
  id: z.string().cuid().optional(),
  projectCount: z.number().int(),
  totalViews: z.number(),
  totalPosts: z.number().int(),
  totalMarketCapUsd: z.number(),
  marketCapChange24h: z.number(),
  marketCapChange7d: z.number(),
  marketCapChange30d: z.number(),
  marketCapChange90d: z.number(),
  mindsharePercent: z.number(),
  mindshareChange24h: z.number(),
  mindshareChange7d: z.number(),
  mindshareChange30d: z.number(),
  mindshareChange90d: z.number(),
  source: z.string(),
  updatedBy: z.string(),
  fetchedDate: z.string()
}).strict();

export const NarrativeSnapshotUncheckedCreateWithoutNarrativeInputSchema: z.ZodType<Prisma.NarrativeSnapshotUncheckedCreateWithoutNarrativeInput> = z.object({
  id: z.string().cuid().optional(),
  projectCount: z.number().int(),
  totalViews: z.number(),
  totalPosts: z.number().int(),
  totalMarketCapUsd: z.number(),
  marketCapChange24h: z.number(),
  marketCapChange7d: z.number(),
  marketCapChange30d: z.number(),
  marketCapChange90d: z.number(),
  mindsharePercent: z.number(),
  mindshareChange24h: z.number(),
  mindshareChange7d: z.number(),
  mindshareChange30d: z.number(),
  mindshareChange90d: z.number(),
  source: z.string(),
  updatedBy: z.string(),
  fetchedDate: z.string()
}).strict();

export const NarrativeSnapshotCreateOrConnectWithoutNarrativeInputSchema: z.ZodType<Prisma.NarrativeSnapshotCreateOrConnectWithoutNarrativeInput> = z.object({
  where: z.lazy(() => NarrativeSnapshotWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => NarrativeSnapshotCreateWithoutNarrativeInputSchema),z.lazy(() => NarrativeSnapshotUncheckedCreateWithoutNarrativeInputSchema) ]),
}).strict();

export const NarrativeSnapshotCreateManyNarrativeInputEnvelopeSchema: z.ZodType<Prisma.NarrativeSnapshotCreateManyNarrativeInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => NarrativeSnapshotCreateManyNarrativeInputSchema),z.lazy(() => NarrativeSnapshotCreateManyNarrativeInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const ProjectSnapshotCreateWithoutNarrativeInputSchema: z.ZodType<Prisma.ProjectSnapshotCreateWithoutNarrativeInput> = z.object({
  id: z.string().cuid().optional(),
  totalViews: z.number().int(),
  totalPosts: z.number().int(),
  mindsharePercent: z.number(),
  mindshareChange24h: z.number(),
  mindshareChange7d: z.number(),
  mindshareChange30d: z.number(),
  mindshareChange90d: z.number(),
  source: z.string(),
  updatedBy: z.string(),
  fetchedDate: z.string(),
  project: z.lazy(() => ProjectCreateNestedOneWithoutProjectSnapshotInputSchema)
}).strict();

export const ProjectSnapshotUncheckedCreateWithoutNarrativeInputSchema: z.ZodType<Prisma.ProjectSnapshotUncheckedCreateWithoutNarrativeInput> = z.object({
  id: z.string().cuid().optional(),
  totalViews: z.number().int(),
  totalPosts: z.number().int(),
  mindsharePercent: z.number(),
  mindshareChange24h: z.number(),
  mindshareChange7d: z.number(),
  mindshareChange30d: z.number(),
  mindshareChange90d: z.number(),
  source: z.string(),
  updatedBy: z.string(),
  fetchedDate: z.string(),
  projectId: z.string()
}).strict();

export const ProjectSnapshotCreateOrConnectWithoutNarrativeInputSchema: z.ZodType<Prisma.ProjectSnapshotCreateOrConnectWithoutNarrativeInput> = z.object({
  where: z.lazy(() => ProjectSnapshotWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ProjectSnapshotCreateWithoutNarrativeInputSchema),z.lazy(() => ProjectSnapshotUncheckedCreateWithoutNarrativeInputSchema) ]),
}).strict();

export const ProjectSnapshotCreateManyNarrativeInputEnvelopeSchema: z.ZodType<Prisma.ProjectSnapshotCreateManyNarrativeInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => ProjectSnapshotCreateManyNarrativeInputSchema),z.lazy(() => ProjectSnapshotCreateManyNarrativeInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const ProjectToNarrativeUpsertWithWhereUniqueWithoutNarrativeInputSchema: z.ZodType<Prisma.ProjectToNarrativeUpsertWithWhereUniqueWithoutNarrativeInput> = z.object({
  where: z.lazy(() => ProjectToNarrativeWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ProjectToNarrativeUpdateWithoutNarrativeInputSchema),z.lazy(() => ProjectToNarrativeUncheckedUpdateWithoutNarrativeInputSchema) ]),
  create: z.union([ z.lazy(() => ProjectToNarrativeCreateWithoutNarrativeInputSchema),z.lazy(() => ProjectToNarrativeUncheckedCreateWithoutNarrativeInputSchema) ]),
}).strict();

export const ProjectToNarrativeUpdateWithWhereUniqueWithoutNarrativeInputSchema: z.ZodType<Prisma.ProjectToNarrativeUpdateWithWhereUniqueWithoutNarrativeInput> = z.object({
  where: z.lazy(() => ProjectToNarrativeWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ProjectToNarrativeUpdateWithoutNarrativeInputSchema),z.lazy(() => ProjectToNarrativeUncheckedUpdateWithoutNarrativeInputSchema) ]),
}).strict();

export const ProjectToNarrativeUpdateManyWithWhereWithoutNarrativeInputSchema: z.ZodType<Prisma.ProjectToNarrativeUpdateManyWithWhereWithoutNarrativeInput> = z.object({
  where: z.lazy(() => ProjectToNarrativeScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ProjectToNarrativeUpdateManyMutationInputSchema),z.lazy(() => ProjectToNarrativeUncheckedUpdateManyWithoutNarrativeInputSchema) ]),
}).strict();

export const ProjectToNarrativeScalarWhereInputSchema: z.ZodType<Prisma.ProjectToNarrativeScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ProjectToNarrativeScalarWhereInputSchema),z.lazy(() => ProjectToNarrativeScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ProjectToNarrativeScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ProjectToNarrativeScalarWhereInputSchema),z.lazy(() => ProjectToNarrativeScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  narrativeId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  projectId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  totalViews: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  totalPosts: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  mindsharePercent: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  mindshareChange24h: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  mindshareChange7d: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  mindshareChange30d: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  mindshareChange90d: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const NarrativeSnapshotUpsertWithWhereUniqueWithoutNarrativeInputSchema: z.ZodType<Prisma.NarrativeSnapshotUpsertWithWhereUniqueWithoutNarrativeInput> = z.object({
  where: z.lazy(() => NarrativeSnapshotWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => NarrativeSnapshotUpdateWithoutNarrativeInputSchema),z.lazy(() => NarrativeSnapshotUncheckedUpdateWithoutNarrativeInputSchema) ]),
  create: z.union([ z.lazy(() => NarrativeSnapshotCreateWithoutNarrativeInputSchema),z.lazy(() => NarrativeSnapshotUncheckedCreateWithoutNarrativeInputSchema) ]),
}).strict();

export const NarrativeSnapshotUpdateWithWhereUniqueWithoutNarrativeInputSchema: z.ZodType<Prisma.NarrativeSnapshotUpdateWithWhereUniqueWithoutNarrativeInput> = z.object({
  where: z.lazy(() => NarrativeSnapshotWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => NarrativeSnapshotUpdateWithoutNarrativeInputSchema),z.lazy(() => NarrativeSnapshotUncheckedUpdateWithoutNarrativeInputSchema) ]),
}).strict();

export const NarrativeSnapshotUpdateManyWithWhereWithoutNarrativeInputSchema: z.ZodType<Prisma.NarrativeSnapshotUpdateManyWithWhereWithoutNarrativeInput> = z.object({
  where: z.lazy(() => NarrativeSnapshotScalarWhereInputSchema),
  data: z.union([ z.lazy(() => NarrativeSnapshotUpdateManyMutationInputSchema),z.lazy(() => NarrativeSnapshotUncheckedUpdateManyWithoutNarrativeInputSchema) ]),
}).strict();

export const NarrativeSnapshotScalarWhereInputSchema: z.ZodType<Prisma.NarrativeSnapshotScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => NarrativeSnapshotScalarWhereInputSchema),z.lazy(() => NarrativeSnapshotScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => NarrativeSnapshotScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => NarrativeSnapshotScalarWhereInputSchema),z.lazy(() => NarrativeSnapshotScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  narrativeId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  projectCount: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  totalViews: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  totalPosts: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  totalMarketCapUsd: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  marketCapChange24h: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  marketCapChange7d: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  marketCapChange30d: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  marketCapChange90d: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  mindsharePercent: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  mindshareChange24h: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  mindshareChange7d: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  mindshareChange30d: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  mindshareChange90d: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  source: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  updatedBy: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  fetchedDate: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const ProjectSnapshotUpsertWithWhereUniqueWithoutNarrativeInputSchema: z.ZodType<Prisma.ProjectSnapshotUpsertWithWhereUniqueWithoutNarrativeInput> = z.object({
  where: z.lazy(() => ProjectSnapshotWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ProjectSnapshotUpdateWithoutNarrativeInputSchema),z.lazy(() => ProjectSnapshotUncheckedUpdateWithoutNarrativeInputSchema) ]),
  create: z.union([ z.lazy(() => ProjectSnapshotCreateWithoutNarrativeInputSchema),z.lazy(() => ProjectSnapshotUncheckedCreateWithoutNarrativeInputSchema) ]),
}).strict();

export const ProjectSnapshotUpdateWithWhereUniqueWithoutNarrativeInputSchema: z.ZodType<Prisma.ProjectSnapshotUpdateWithWhereUniqueWithoutNarrativeInput> = z.object({
  where: z.lazy(() => ProjectSnapshotWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ProjectSnapshotUpdateWithoutNarrativeInputSchema),z.lazy(() => ProjectSnapshotUncheckedUpdateWithoutNarrativeInputSchema) ]),
}).strict();

export const ProjectSnapshotUpdateManyWithWhereWithoutNarrativeInputSchema: z.ZodType<Prisma.ProjectSnapshotUpdateManyWithWhereWithoutNarrativeInput> = z.object({
  where: z.lazy(() => ProjectSnapshotScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ProjectSnapshotUpdateManyMutationInputSchema),z.lazy(() => ProjectSnapshotUncheckedUpdateManyWithoutNarrativeInputSchema) ]),
}).strict();

export const ProjectSnapshotScalarWhereInputSchema: z.ZodType<Prisma.ProjectSnapshotScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ProjectSnapshotScalarWhereInputSchema),z.lazy(() => ProjectSnapshotScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ProjectSnapshotScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ProjectSnapshotScalarWhereInputSchema),z.lazy(() => ProjectSnapshotScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  totalViews: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  totalPosts: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  mindsharePercent: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  mindshareChange24h: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  mindshareChange7d: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  mindshareChange30d: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  mindshareChange90d: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  source: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  updatedBy: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  fetchedDate: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  projectId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  narrativeId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const NarrativeCreateWithoutNarrativeSnapshotInputSchema: z.ZodType<Prisma.NarrativeCreateWithoutNarrativeSnapshotInput> = z.object({
  id: z.string().cuid().optional(),
  narrativeId: z.string(),
  name: z.string(),
  slug: z.string(),
  description: z.string().optional().nullable(),
  projectCount: z.number().int(),
  totalViews: z.number(),
  totalPosts: z.number().int(),
  totalMarketCapUsd: z.number(),
  marketCapChange24h: z.number(),
  marketCapChange7d: z.number(),
  marketCapChange30d: z.number(),
  marketCapChange90d: z.number(),
  mindsharePercent: z.number(),
  mindshareChange24h: z.number(),
  mindshareChange7d: z.number(),
  mindshareChange30d: z.number(),
  mindshareChange90d: z.number(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  fetchedAt: z.coerce.date().optional(),
  projectLinks: z.lazy(() => ProjectToNarrativeCreateNestedManyWithoutNarrativeInputSchema).optional(),
  projectSnapshot: z.lazy(() => ProjectSnapshotCreateNestedManyWithoutNarrativeInputSchema).optional()
}).strict();

export const NarrativeUncheckedCreateWithoutNarrativeSnapshotInputSchema: z.ZodType<Prisma.NarrativeUncheckedCreateWithoutNarrativeSnapshotInput> = z.object({
  id: z.string().cuid().optional(),
  narrativeId: z.string(),
  name: z.string(),
  slug: z.string(),
  description: z.string().optional().nullable(),
  projectCount: z.number().int(),
  totalViews: z.number(),
  totalPosts: z.number().int(),
  totalMarketCapUsd: z.number(),
  marketCapChange24h: z.number(),
  marketCapChange7d: z.number(),
  marketCapChange30d: z.number(),
  marketCapChange90d: z.number(),
  mindsharePercent: z.number(),
  mindshareChange24h: z.number(),
  mindshareChange7d: z.number(),
  mindshareChange30d: z.number(),
  mindshareChange90d: z.number(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  fetchedAt: z.coerce.date().optional(),
  projectLinks: z.lazy(() => ProjectToNarrativeUncheckedCreateNestedManyWithoutNarrativeInputSchema).optional(),
  projectSnapshot: z.lazy(() => ProjectSnapshotUncheckedCreateNestedManyWithoutNarrativeInputSchema).optional()
}).strict();

export const NarrativeCreateOrConnectWithoutNarrativeSnapshotInputSchema: z.ZodType<Prisma.NarrativeCreateOrConnectWithoutNarrativeSnapshotInput> = z.object({
  where: z.lazy(() => NarrativeWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => NarrativeCreateWithoutNarrativeSnapshotInputSchema),z.lazy(() => NarrativeUncheckedCreateWithoutNarrativeSnapshotInputSchema) ]),
}).strict();

export const NarrativeUpsertWithoutNarrativeSnapshotInputSchema: z.ZodType<Prisma.NarrativeUpsertWithoutNarrativeSnapshotInput> = z.object({
  update: z.union([ z.lazy(() => NarrativeUpdateWithoutNarrativeSnapshotInputSchema),z.lazy(() => NarrativeUncheckedUpdateWithoutNarrativeSnapshotInputSchema) ]),
  create: z.union([ z.lazy(() => NarrativeCreateWithoutNarrativeSnapshotInputSchema),z.lazy(() => NarrativeUncheckedCreateWithoutNarrativeSnapshotInputSchema) ]),
  where: z.lazy(() => NarrativeWhereInputSchema).optional()
}).strict();

export const NarrativeUpdateToOneWithWhereWithoutNarrativeSnapshotInputSchema: z.ZodType<Prisma.NarrativeUpdateToOneWithWhereWithoutNarrativeSnapshotInput> = z.object({
  where: z.lazy(() => NarrativeWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => NarrativeUpdateWithoutNarrativeSnapshotInputSchema),z.lazy(() => NarrativeUncheckedUpdateWithoutNarrativeSnapshotInputSchema) ]),
}).strict();

export const NarrativeUpdateWithoutNarrativeSnapshotInputSchema: z.ZodType<Prisma.NarrativeUpdateWithoutNarrativeSnapshotInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  narrativeId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  projectCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  totalViews: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  totalPosts: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  totalMarketCapUsd: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  marketCapChange24h: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  marketCapChange7d: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  marketCapChange30d: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  marketCapChange90d: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  mindsharePercent: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  mindshareChange24h: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  mindshareChange7d: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  mindshareChange30d: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  mindshareChange90d: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  fetchedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  projectLinks: z.lazy(() => ProjectToNarrativeUpdateManyWithoutNarrativeNestedInputSchema).optional(),
  projectSnapshot: z.lazy(() => ProjectSnapshotUpdateManyWithoutNarrativeNestedInputSchema).optional()
}).strict();

export const NarrativeUncheckedUpdateWithoutNarrativeSnapshotInputSchema: z.ZodType<Prisma.NarrativeUncheckedUpdateWithoutNarrativeSnapshotInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  narrativeId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  projectCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  totalViews: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  totalPosts: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  totalMarketCapUsd: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  marketCapChange24h: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  marketCapChange7d: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  marketCapChange30d: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  marketCapChange90d: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  mindsharePercent: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  mindshareChange24h: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  mindshareChange7d: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  mindshareChange30d: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  mindshareChange90d: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  fetchedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  projectLinks: z.lazy(() => ProjectToNarrativeUncheckedUpdateManyWithoutNarrativeNestedInputSchema).optional(),
  projectSnapshot: z.lazy(() => ProjectSnapshotUncheckedUpdateManyWithoutNarrativeNestedInputSchema).optional()
}).strict();

export const ProjectSnapshotCreateWithoutProjectInputSchema: z.ZodType<Prisma.ProjectSnapshotCreateWithoutProjectInput> = z.object({
  id: z.string().cuid().optional(),
  totalViews: z.number().int(),
  totalPosts: z.number().int(),
  mindsharePercent: z.number(),
  mindshareChange24h: z.number(),
  mindshareChange7d: z.number(),
  mindshareChange30d: z.number(),
  mindshareChange90d: z.number(),
  source: z.string(),
  updatedBy: z.string(),
  fetchedDate: z.string(),
  narrative: z.lazy(() => NarrativeCreateNestedOneWithoutProjectSnapshotInputSchema).optional()
}).strict();

export const ProjectSnapshotUncheckedCreateWithoutProjectInputSchema: z.ZodType<Prisma.ProjectSnapshotUncheckedCreateWithoutProjectInput> = z.object({
  id: z.string().cuid().optional(),
  totalViews: z.number().int(),
  totalPosts: z.number().int(),
  mindsharePercent: z.number(),
  mindshareChange24h: z.number(),
  mindshareChange7d: z.number(),
  mindshareChange30d: z.number(),
  mindshareChange90d: z.number(),
  source: z.string(),
  updatedBy: z.string(),
  fetchedDate: z.string(),
  narrativeId: z.string().optional().nullable()
}).strict();

export const ProjectSnapshotCreateOrConnectWithoutProjectInputSchema: z.ZodType<Prisma.ProjectSnapshotCreateOrConnectWithoutProjectInput> = z.object({
  where: z.lazy(() => ProjectSnapshotWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ProjectSnapshotCreateWithoutProjectInputSchema),z.lazy(() => ProjectSnapshotUncheckedCreateWithoutProjectInputSchema) ]),
}).strict();

export const ProjectSnapshotCreateManyProjectInputEnvelopeSchema: z.ZodType<Prisma.ProjectSnapshotCreateManyProjectInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => ProjectSnapshotCreateManyProjectInputSchema),z.lazy(() => ProjectSnapshotCreateManyProjectInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const ProjectToNarrativeCreateWithoutProjectInputSchema: z.ZodType<Prisma.ProjectToNarrativeCreateWithoutProjectInput> = z.object({
  id: z.string().optional(),
  totalViews: z.number().int(),
  totalPosts: z.number().int(),
  mindsharePercent: z.number(),
  mindshareChange24h: z.number(),
  mindshareChange7d: z.number(),
  mindshareChange30d: z.number(),
  mindshareChange90d: z.number(),
  createdAt: z.coerce.date().optional(),
  narrative: z.lazy(() => NarrativeCreateNestedOneWithoutProjectLinksInputSchema)
}).strict();

export const ProjectToNarrativeUncheckedCreateWithoutProjectInputSchema: z.ZodType<Prisma.ProjectToNarrativeUncheckedCreateWithoutProjectInput> = z.object({
  id: z.string().optional(),
  narrativeId: z.string(),
  totalViews: z.number().int(),
  totalPosts: z.number().int(),
  mindsharePercent: z.number(),
  mindshareChange24h: z.number(),
  mindshareChange7d: z.number(),
  mindshareChange30d: z.number(),
  mindshareChange90d: z.number(),
  createdAt: z.coerce.date().optional()
}).strict();

export const ProjectToNarrativeCreateOrConnectWithoutProjectInputSchema: z.ZodType<Prisma.ProjectToNarrativeCreateOrConnectWithoutProjectInput> = z.object({
  where: z.lazy(() => ProjectToNarrativeWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ProjectToNarrativeCreateWithoutProjectInputSchema),z.lazy(() => ProjectToNarrativeUncheckedCreateWithoutProjectInputSchema) ]),
}).strict();

export const ProjectToNarrativeCreateManyProjectInputEnvelopeSchema: z.ZodType<Prisma.ProjectToNarrativeCreateManyProjectInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => ProjectToNarrativeCreateManyProjectInputSchema),z.lazy(() => ProjectToNarrativeCreateManyProjectInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const RewardPoolCreateWithoutProjectInputSchema: z.ZodType<Prisma.RewardPoolCreateWithoutProjectInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  description: z.string(),
  reward: z.string(),
  rewardRate: z.number().optional().nullable(),
  rewardUnit: z.string().optional().nullable(),
  deadline: z.coerce.date(),
  platforms: z.union([ z.lazy(() => RewardPoolCreateplatformsInputSchema),z.string().array() ]).optional(),
  status: z.lazy(() => RewardPoolStatusSchema),
  totalAmountUsd: z.number(),
  paidOutUsd: z.number(),
  campaignTargetViews: z.number().int(),
  participantsCount: z.number().int(),
  completedCount: z.number().int(),
  requirements: z.union([ z.lazy(() => RewardPoolCreaterequirementsInputSchema),z.string().array() ]).optional(),
}).strict();

export const RewardPoolUncheckedCreateWithoutProjectInputSchema: z.ZodType<Prisma.RewardPoolUncheckedCreateWithoutProjectInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  description: z.string(),
  reward: z.string(),
  rewardRate: z.number().optional().nullable(),
  rewardUnit: z.string().optional().nullable(),
  deadline: z.coerce.date(),
  platforms: z.union([ z.lazy(() => RewardPoolCreateplatformsInputSchema),z.string().array() ]).optional(),
  status: z.lazy(() => RewardPoolStatusSchema),
  totalAmountUsd: z.number(),
  paidOutUsd: z.number(),
  campaignTargetViews: z.number().int(),
  participantsCount: z.number().int(),
  completedCount: z.number().int(),
  requirements: z.union([ z.lazy(() => RewardPoolCreaterequirementsInputSchema),z.string().array() ]).optional(),
}).strict();

export const RewardPoolCreateOrConnectWithoutProjectInputSchema: z.ZodType<Prisma.RewardPoolCreateOrConnectWithoutProjectInput> = z.object({
  where: z.lazy(() => RewardPoolWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => RewardPoolCreateWithoutProjectInputSchema),z.lazy(() => RewardPoolUncheckedCreateWithoutProjectInputSchema) ]),
}).strict();

export const RewardPoolCreateManyProjectInputEnvelopeSchema: z.ZodType<Prisma.RewardPoolCreateManyProjectInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => RewardPoolCreateManyProjectInputSchema),z.lazy(() => RewardPoolCreateManyProjectInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const KOLToProjectCreateWithoutProjectInputSchema: z.ZodType<Prisma.KOLToProjectCreateWithoutProjectInput> = z.object({
  id: z.string().cuid().optional(),
  totalPosts: z.number().int(),
  totalViews: z.bigint(),
  totalInteractions: z.bigint(),
  totalComments: z.bigint(),
  qualityScore: z.number().optional().nullable(),
  proofOfWork: z.number().optional().nullable(),
  mindoMetric: z.number().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  fetchedAt: z.coerce.date().optional(),
  kol: z.lazy(() => KOLCreateNestedOneWithoutProjectsInputSchema)
}).strict();

export const KOLToProjectUncheckedCreateWithoutProjectInputSchema: z.ZodType<Prisma.KOLToProjectUncheckedCreateWithoutProjectInput> = z.object({
  id: z.string().cuid().optional(),
  kolId: z.string(),
  totalPosts: z.number().int(),
  totalViews: z.bigint(),
  totalInteractions: z.bigint(),
  totalComments: z.bigint(),
  qualityScore: z.number().optional().nullable(),
  proofOfWork: z.number().optional().nullable(),
  mindoMetric: z.number().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  fetchedAt: z.coerce.date().optional()
}).strict();

export const KOLToProjectCreateOrConnectWithoutProjectInputSchema: z.ZodType<Prisma.KOLToProjectCreateOrConnectWithoutProjectInput> = z.object({
  where: z.lazy(() => KOLToProjectWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => KOLToProjectCreateWithoutProjectInputSchema),z.lazy(() => KOLToProjectUncheckedCreateWithoutProjectInputSchema) ]),
}).strict();

export const KOLToProjectCreateManyProjectInputEnvelopeSchema: z.ZodType<Prisma.KOLToProjectCreateManyProjectInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => KOLToProjectCreateManyProjectInputSchema),z.lazy(() => KOLToProjectCreateManyProjectInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const ProjectSnapshotUpsertWithWhereUniqueWithoutProjectInputSchema: z.ZodType<Prisma.ProjectSnapshotUpsertWithWhereUniqueWithoutProjectInput> = z.object({
  where: z.lazy(() => ProjectSnapshotWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ProjectSnapshotUpdateWithoutProjectInputSchema),z.lazy(() => ProjectSnapshotUncheckedUpdateWithoutProjectInputSchema) ]),
  create: z.union([ z.lazy(() => ProjectSnapshotCreateWithoutProjectInputSchema),z.lazy(() => ProjectSnapshotUncheckedCreateWithoutProjectInputSchema) ]),
}).strict();

export const ProjectSnapshotUpdateWithWhereUniqueWithoutProjectInputSchema: z.ZodType<Prisma.ProjectSnapshotUpdateWithWhereUniqueWithoutProjectInput> = z.object({
  where: z.lazy(() => ProjectSnapshotWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ProjectSnapshotUpdateWithoutProjectInputSchema),z.lazy(() => ProjectSnapshotUncheckedUpdateWithoutProjectInputSchema) ]),
}).strict();

export const ProjectSnapshotUpdateManyWithWhereWithoutProjectInputSchema: z.ZodType<Prisma.ProjectSnapshotUpdateManyWithWhereWithoutProjectInput> = z.object({
  where: z.lazy(() => ProjectSnapshotScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ProjectSnapshotUpdateManyMutationInputSchema),z.lazy(() => ProjectSnapshotUncheckedUpdateManyWithoutProjectInputSchema) ]),
}).strict();

export const ProjectToNarrativeUpsertWithWhereUniqueWithoutProjectInputSchema: z.ZodType<Prisma.ProjectToNarrativeUpsertWithWhereUniqueWithoutProjectInput> = z.object({
  where: z.lazy(() => ProjectToNarrativeWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ProjectToNarrativeUpdateWithoutProjectInputSchema),z.lazy(() => ProjectToNarrativeUncheckedUpdateWithoutProjectInputSchema) ]),
  create: z.union([ z.lazy(() => ProjectToNarrativeCreateWithoutProjectInputSchema),z.lazy(() => ProjectToNarrativeUncheckedCreateWithoutProjectInputSchema) ]),
}).strict();

export const ProjectToNarrativeUpdateWithWhereUniqueWithoutProjectInputSchema: z.ZodType<Prisma.ProjectToNarrativeUpdateWithWhereUniqueWithoutProjectInput> = z.object({
  where: z.lazy(() => ProjectToNarrativeWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ProjectToNarrativeUpdateWithoutProjectInputSchema),z.lazy(() => ProjectToNarrativeUncheckedUpdateWithoutProjectInputSchema) ]),
}).strict();

export const ProjectToNarrativeUpdateManyWithWhereWithoutProjectInputSchema: z.ZodType<Prisma.ProjectToNarrativeUpdateManyWithWhereWithoutProjectInput> = z.object({
  where: z.lazy(() => ProjectToNarrativeScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ProjectToNarrativeUpdateManyMutationInputSchema),z.lazy(() => ProjectToNarrativeUncheckedUpdateManyWithoutProjectInputSchema) ]),
}).strict();

export const RewardPoolUpsertWithWhereUniqueWithoutProjectInputSchema: z.ZodType<Prisma.RewardPoolUpsertWithWhereUniqueWithoutProjectInput> = z.object({
  where: z.lazy(() => RewardPoolWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => RewardPoolUpdateWithoutProjectInputSchema),z.lazy(() => RewardPoolUncheckedUpdateWithoutProjectInputSchema) ]),
  create: z.union([ z.lazy(() => RewardPoolCreateWithoutProjectInputSchema),z.lazy(() => RewardPoolUncheckedCreateWithoutProjectInputSchema) ]),
}).strict();

export const RewardPoolUpdateWithWhereUniqueWithoutProjectInputSchema: z.ZodType<Prisma.RewardPoolUpdateWithWhereUniqueWithoutProjectInput> = z.object({
  where: z.lazy(() => RewardPoolWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => RewardPoolUpdateWithoutProjectInputSchema),z.lazy(() => RewardPoolUncheckedUpdateWithoutProjectInputSchema) ]),
}).strict();

export const RewardPoolUpdateManyWithWhereWithoutProjectInputSchema: z.ZodType<Prisma.RewardPoolUpdateManyWithWhereWithoutProjectInput> = z.object({
  where: z.lazy(() => RewardPoolScalarWhereInputSchema),
  data: z.union([ z.lazy(() => RewardPoolUpdateManyMutationInputSchema),z.lazy(() => RewardPoolUncheckedUpdateManyWithoutProjectInputSchema) ]),
}).strict();

export const RewardPoolScalarWhereInputSchema: z.ZodType<Prisma.RewardPoolScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => RewardPoolScalarWhereInputSchema),z.lazy(() => RewardPoolScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => RewardPoolScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RewardPoolScalarWhereInputSchema),z.lazy(() => RewardPoolScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  reward: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  rewardRate: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  rewardUnit: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  deadline: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  platforms: z.lazy(() => StringNullableListFilterSchema).optional(),
  status: z.union([ z.lazy(() => EnumRewardPoolStatusFilterSchema),z.lazy(() => RewardPoolStatusSchema) ]).optional(),
  totalAmountUsd: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  paidOutUsd: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  campaignTargetViews: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  participantsCount: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  completedCount: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  requirements: z.lazy(() => StringNullableListFilterSchema).optional(),
  projectId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const KOLToProjectUpsertWithWhereUniqueWithoutProjectInputSchema: z.ZodType<Prisma.KOLToProjectUpsertWithWhereUniqueWithoutProjectInput> = z.object({
  where: z.lazy(() => KOLToProjectWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => KOLToProjectUpdateWithoutProjectInputSchema),z.lazy(() => KOLToProjectUncheckedUpdateWithoutProjectInputSchema) ]),
  create: z.union([ z.lazy(() => KOLToProjectCreateWithoutProjectInputSchema),z.lazy(() => KOLToProjectUncheckedCreateWithoutProjectInputSchema) ]),
}).strict();

export const KOLToProjectUpdateWithWhereUniqueWithoutProjectInputSchema: z.ZodType<Prisma.KOLToProjectUpdateWithWhereUniqueWithoutProjectInput> = z.object({
  where: z.lazy(() => KOLToProjectWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => KOLToProjectUpdateWithoutProjectInputSchema),z.lazy(() => KOLToProjectUncheckedUpdateWithoutProjectInputSchema) ]),
}).strict();

export const KOLToProjectUpdateManyWithWhereWithoutProjectInputSchema: z.ZodType<Prisma.KOLToProjectUpdateManyWithWhereWithoutProjectInput> = z.object({
  where: z.lazy(() => KOLToProjectScalarWhereInputSchema),
  data: z.union([ z.lazy(() => KOLToProjectUpdateManyMutationInputSchema),z.lazy(() => KOLToProjectUncheckedUpdateManyWithoutProjectInputSchema) ]),
}).strict();

export const KOLToProjectScalarWhereInputSchema: z.ZodType<Prisma.KOLToProjectScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => KOLToProjectScalarWhereInputSchema),z.lazy(() => KOLToProjectScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => KOLToProjectScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => KOLToProjectScalarWhereInputSchema),z.lazy(() => KOLToProjectScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  kolId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  projectId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  totalPosts: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  totalViews: z.union([ z.lazy(() => BigIntFilterSchema),z.bigint() ]).optional(),
  totalInteractions: z.union([ z.lazy(() => BigIntFilterSchema),z.bigint() ]).optional(),
  totalComments: z.union([ z.lazy(() => BigIntFilterSchema),z.bigint() ]).optional(),
  qualityScore: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  proofOfWork: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  mindoMetric: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  fetchedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const ProjectCreateWithoutProjectSnapshotInputSchema: z.ZodType<Prisma.ProjectCreateWithoutProjectSnapshotInput> = z.object({
  id: z.string().optional(),
  stage: z.string().optional().nullable(),
  featured: z.boolean().optional(),
  hidden: z.boolean().optional(),
  mindshare: z.number(),
  twitterId: z.string(),
  twitterUsername: z.string(),
  twitterDisplayName: z.string(),
  twitterAvatarUrl: z.string(),
  twitterDescription: z.string(),
  twitterDescriptionLink: z.string().optional().nullable(),
  twitterFollowersCount: z.number().int(),
  twitterFollowingCount: z.number().int(),
  twitterIsVerified: z.boolean(),
  twitterGoldBadge: z.boolean().optional().nullable(),
  twitterLang: z.string(),
  twitterCreatedAt: z.coerce.date(),
  coinSymbol: z.string(),
  coinMarketCap: z.number(),
  coinPrice: z.number(),
  coinContractAddress: z.string().optional().nullable(),
  coinName: z.string(),
  coinImageUrl: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  fetchedAt: z.coerce.date().optional(),
  narrativeLinks: z.lazy(() => ProjectToNarrativeCreateNestedManyWithoutProjectInputSchema).optional(),
  rewardPools: z.lazy(() => RewardPoolCreateNestedManyWithoutProjectInputSchema).optional(),
  kols: z.lazy(() => KOLToProjectCreateNestedManyWithoutProjectInputSchema).optional()
}).strict();

export const ProjectUncheckedCreateWithoutProjectSnapshotInputSchema: z.ZodType<Prisma.ProjectUncheckedCreateWithoutProjectSnapshotInput> = z.object({
  id: z.string().optional(),
  stage: z.string().optional().nullable(),
  featured: z.boolean().optional(),
  hidden: z.boolean().optional(),
  mindshare: z.number(),
  twitterId: z.string(),
  twitterUsername: z.string(),
  twitterDisplayName: z.string(),
  twitterAvatarUrl: z.string(),
  twitterDescription: z.string(),
  twitterDescriptionLink: z.string().optional().nullable(),
  twitterFollowersCount: z.number().int(),
  twitterFollowingCount: z.number().int(),
  twitterIsVerified: z.boolean(),
  twitterGoldBadge: z.boolean().optional().nullable(),
  twitterLang: z.string(),
  twitterCreatedAt: z.coerce.date(),
  coinSymbol: z.string(),
  coinMarketCap: z.number(),
  coinPrice: z.number(),
  coinContractAddress: z.string().optional().nullable(),
  coinName: z.string(),
  coinImageUrl: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  fetchedAt: z.coerce.date().optional(),
  narrativeLinks: z.lazy(() => ProjectToNarrativeUncheckedCreateNestedManyWithoutProjectInputSchema).optional(),
  rewardPools: z.lazy(() => RewardPoolUncheckedCreateNestedManyWithoutProjectInputSchema).optional(),
  kols: z.lazy(() => KOLToProjectUncheckedCreateNestedManyWithoutProjectInputSchema).optional()
}).strict();

export const ProjectCreateOrConnectWithoutProjectSnapshotInputSchema: z.ZodType<Prisma.ProjectCreateOrConnectWithoutProjectSnapshotInput> = z.object({
  where: z.lazy(() => ProjectWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ProjectCreateWithoutProjectSnapshotInputSchema),z.lazy(() => ProjectUncheckedCreateWithoutProjectSnapshotInputSchema) ]),
}).strict();

export const NarrativeCreateWithoutProjectSnapshotInputSchema: z.ZodType<Prisma.NarrativeCreateWithoutProjectSnapshotInput> = z.object({
  id: z.string().cuid().optional(),
  narrativeId: z.string(),
  name: z.string(),
  slug: z.string(),
  description: z.string().optional().nullable(),
  projectCount: z.number().int(),
  totalViews: z.number(),
  totalPosts: z.number().int(),
  totalMarketCapUsd: z.number(),
  marketCapChange24h: z.number(),
  marketCapChange7d: z.number(),
  marketCapChange30d: z.number(),
  marketCapChange90d: z.number(),
  mindsharePercent: z.number(),
  mindshareChange24h: z.number(),
  mindshareChange7d: z.number(),
  mindshareChange30d: z.number(),
  mindshareChange90d: z.number(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  fetchedAt: z.coerce.date().optional(),
  projectLinks: z.lazy(() => ProjectToNarrativeCreateNestedManyWithoutNarrativeInputSchema).optional(),
  narrativeSnapshot: z.lazy(() => NarrativeSnapshotCreateNestedManyWithoutNarrativeInputSchema).optional()
}).strict();

export const NarrativeUncheckedCreateWithoutProjectSnapshotInputSchema: z.ZodType<Prisma.NarrativeUncheckedCreateWithoutProjectSnapshotInput> = z.object({
  id: z.string().cuid().optional(),
  narrativeId: z.string(),
  name: z.string(),
  slug: z.string(),
  description: z.string().optional().nullable(),
  projectCount: z.number().int(),
  totalViews: z.number(),
  totalPosts: z.number().int(),
  totalMarketCapUsd: z.number(),
  marketCapChange24h: z.number(),
  marketCapChange7d: z.number(),
  marketCapChange30d: z.number(),
  marketCapChange90d: z.number(),
  mindsharePercent: z.number(),
  mindshareChange24h: z.number(),
  mindshareChange7d: z.number(),
  mindshareChange30d: z.number(),
  mindshareChange90d: z.number(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  fetchedAt: z.coerce.date().optional(),
  projectLinks: z.lazy(() => ProjectToNarrativeUncheckedCreateNestedManyWithoutNarrativeInputSchema).optional(),
  narrativeSnapshot: z.lazy(() => NarrativeSnapshotUncheckedCreateNestedManyWithoutNarrativeInputSchema).optional()
}).strict();

export const NarrativeCreateOrConnectWithoutProjectSnapshotInputSchema: z.ZodType<Prisma.NarrativeCreateOrConnectWithoutProjectSnapshotInput> = z.object({
  where: z.lazy(() => NarrativeWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => NarrativeCreateWithoutProjectSnapshotInputSchema),z.lazy(() => NarrativeUncheckedCreateWithoutProjectSnapshotInputSchema) ]),
}).strict();

export const ProjectUpsertWithoutProjectSnapshotInputSchema: z.ZodType<Prisma.ProjectUpsertWithoutProjectSnapshotInput> = z.object({
  update: z.union([ z.lazy(() => ProjectUpdateWithoutProjectSnapshotInputSchema),z.lazy(() => ProjectUncheckedUpdateWithoutProjectSnapshotInputSchema) ]),
  create: z.union([ z.lazy(() => ProjectCreateWithoutProjectSnapshotInputSchema),z.lazy(() => ProjectUncheckedCreateWithoutProjectSnapshotInputSchema) ]),
  where: z.lazy(() => ProjectWhereInputSchema).optional()
}).strict();

export const ProjectUpdateToOneWithWhereWithoutProjectSnapshotInputSchema: z.ZodType<Prisma.ProjectUpdateToOneWithWhereWithoutProjectSnapshotInput> = z.object({
  where: z.lazy(() => ProjectWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => ProjectUpdateWithoutProjectSnapshotInputSchema),z.lazy(() => ProjectUncheckedUpdateWithoutProjectSnapshotInputSchema) ]),
}).strict();

export const ProjectUpdateWithoutProjectSnapshotInputSchema: z.ZodType<Prisma.ProjectUpdateWithoutProjectSnapshotInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  stage: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  featured: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  hidden: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  mindshare: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  twitterId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  twitterUsername: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  twitterDisplayName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  twitterAvatarUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  twitterDescription: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  twitterDescriptionLink: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  twitterFollowersCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  twitterFollowingCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  twitterIsVerified: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  twitterGoldBadge: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  twitterLang: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  twitterCreatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  coinSymbol: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  coinMarketCap: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  coinPrice: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  coinContractAddress: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  coinName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  coinImageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  fetchedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  narrativeLinks: z.lazy(() => ProjectToNarrativeUpdateManyWithoutProjectNestedInputSchema).optional(),
  rewardPools: z.lazy(() => RewardPoolUpdateManyWithoutProjectNestedInputSchema).optional(),
  kols: z.lazy(() => KOLToProjectUpdateManyWithoutProjectNestedInputSchema).optional()
}).strict();

export const ProjectUncheckedUpdateWithoutProjectSnapshotInputSchema: z.ZodType<Prisma.ProjectUncheckedUpdateWithoutProjectSnapshotInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  stage: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  featured: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  hidden: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  mindshare: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  twitterId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  twitterUsername: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  twitterDisplayName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  twitterAvatarUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  twitterDescription: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  twitterDescriptionLink: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  twitterFollowersCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  twitterFollowingCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  twitterIsVerified: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  twitterGoldBadge: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  twitterLang: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  twitterCreatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  coinSymbol: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  coinMarketCap: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  coinPrice: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  coinContractAddress: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  coinName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  coinImageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  fetchedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  narrativeLinks: z.lazy(() => ProjectToNarrativeUncheckedUpdateManyWithoutProjectNestedInputSchema).optional(),
  rewardPools: z.lazy(() => RewardPoolUncheckedUpdateManyWithoutProjectNestedInputSchema).optional(),
  kols: z.lazy(() => KOLToProjectUncheckedUpdateManyWithoutProjectNestedInputSchema).optional()
}).strict();

export const NarrativeUpsertWithoutProjectSnapshotInputSchema: z.ZodType<Prisma.NarrativeUpsertWithoutProjectSnapshotInput> = z.object({
  update: z.union([ z.lazy(() => NarrativeUpdateWithoutProjectSnapshotInputSchema),z.lazy(() => NarrativeUncheckedUpdateWithoutProjectSnapshotInputSchema) ]),
  create: z.union([ z.lazy(() => NarrativeCreateWithoutProjectSnapshotInputSchema),z.lazy(() => NarrativeUncheckedCreateWithoutProjectSnapshotInputSchema) ]),
  where: z.lazy(() => NarrativeWhereInputSchema).optional()
}).strict();

export const NarrativeUpdateToOneWithWhereWithoutProjectSnapshotInputSchema: z.ZodType<Prisma.NarrativeUpdateToOneWithWhereWithoutProjectSnapshotInput> = z.object({
  where: z.lazy(() => NarrativeWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => NarrativeUpdateWithoutProjectSnapshotInputSchema),z.lazy(() => NarrativeUncheckedUpdateWithoutProjectSnapshotInputSchema) ]),
}).strict();

export const NarrativeUpdateWithoutProjectSnapshotInputSchema: z.ZodType<Prisma.NarrativeUpdateWithoutProjectSnapshotInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  narrativeId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  projectCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  totalViews: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  totalPosts: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  totalMarketCapUsd: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  marketCapChange24h: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  marketCapChange7d: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  marketCapChange30d: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  marketCapChange90d: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  mindsharePercent: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  mindshareChange24h: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  mindshareChange7d: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  mindshareChange30d: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  mindshareChange90d: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  fetchedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  projectLinks: z.lazy(() => ProjectToNarrativeUpdateManyWithoutNarrativeNestedInputSchema).optional(),
  narrativeSnapshot: z.lazy(() => NarrativeSnapshotUpdateManyWithoutNarrativeNestedInputSchema).optional()
}).strict();

export const NarrativeUncheckedUpdateWithoutProjectSnapshotInputSchema: z.ZodType<Prisma.NarrativeUncheckedUpdateWithoutProjectSnapshotInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  narrativeId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  projectCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  totalViews: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  totalPosts: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  totalMarketCapUsd: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  marketCapChange24h: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  marketCapChange7d: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  marketCapChange30d: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  marketCapChange90d: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  mindsharePercent: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  mindshareChange24h: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  mindshareChange7d: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  mindshareChange30d: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  mindshareChange90d: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  fetchedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  projectLinks: z.lazy(() => ProjectToNarrativeUncheckedUpdateManyWithoutNarrativeNestedInputSchema).optional(),
  narrativeSnapshot: z.lazy(() => NarrativeSnapshotUncheckedUpdateManyWithoutNarrativeNestedInputSchema).optional()
}).strict();

export const NarrativeCreateWithoutProjectLinksInputSchema: z.ZodType<Prisma.NarrativeCreateWithoutProjectLinksInput> = z.object({
  id: z.string().cuid().optional(),
  narrativeId: z.string(),
  name: z.string(),
  slug: z.string(),
  description: z.string().optional().nullable(),
  projectCount: z.number().int(),
  totalViews: z.number(),
  totalPosts: z.number().int(),
  totalMarketCapUsd: z.number(),
  marketCapChange24h: z.number(),
  marketCapChange7d: z.number(),
  marketCapChange30d: z.number(),
  marketCapChange90d: z.number(),
  mindsharePercent: z.number(),
  mindshareChange24h: z.number(),
  mindshareChange7d: z.number(),
  mindshareChange30d: z.number(),
  mindshareChange90d: z.number(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  fetchedAt: z.coerce.date().optional(),
  narrativeSnapshot: z.lazy(() => NarrativeSnapshotCreateNestedManyWithoutNarrativeInputSchema).optional(),
  projectSnapshot: z.lazy(() => ProjectSnapshotCreateNestedManyWithoutNarrativeInputSchema).optional()
}).strict();

export const NarrativeUncheckedCreateWithoutProjectLinksInputSchema: z.ZodType<Prisma.NarrativeUncheckedCreateWithoutProjectLinksInput> = z.object({
  id: z.string().cuid().optional(),
  narrativeId: z.string(),
  name: z.string(),
  slug: z.string(),
  description: z.string().optional().nullable(),
  projectCount: z.number().int(),
  totalViews: z.number(),
  totalPosts: z.number().int(),
  totalMarketCapUsd: z.number(),
  marketCapChange24h: z.number(),
  marketCapChange7d: z.number(),
  marketCapChange30d: z.number(),
  marketCapChange90d: z.number(),
  mindsharePercent: z.number(),
  mindshareChange24h: z.number(),
  mindshareChange7d: z.number(),
  mindshareChange30d: z.number(),
  mindshareChange90d: z.number(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  fetchedAt: z.coerce.date().optional(),
  narrativeSnapshot: z.lazy(() => NarrativeSnapshotUncheckedCreateNestedManyWithoutNarrativeInputSchema).optional(),
  projectSnapshot: z.lazy(() => ProjectSnapshotUncheckedCreateNestedManyWithoutNarrativeInputSchema).optional()
}).strict();

export const NarrativeCreateOrConnectWithoutProjectLinksInputSchema: z.ZodType<Prisma.NarrativeCreateOrConnectWithoutProjectLinksInput> = z.object({
  where: z.lazy(() => NarrativeWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => NarrativeCreateWithoutProjectLinksInputSchema),z.lazy(() => NarrativeUncheckedCreateWithoutProjectLinksInputSchema) ]),
}).strict();

export const ProjectCreateWithoutNarrativeLinksInputSchema: z.ZodType<Prisma.ProjectCreateWithoutNarrativeLinksInput> = z.object({
  id: z.string().optional(),
  stage: z.string().optional().nullable(),
  featured: z.boolean().optional(),
  hidden: z.boolean().optional(),
  mindshare: z.number(),
  twitterId: z.string(),
  twitterUsername: z.string(),
  twitterDisplayName: z.string(),
  twitterAvatarUrl: z.string(),
  twitterDescription: z.string(),
  twitterDescriptionLink: z.string().optional().nullable(),
  twitterFollowersCount: z.number().int(),
  twitterFollowingCount: z.number().int(),
  twitterIsVerified: z.boolean(),
  twitterGoldBadge: z.boolean().optional().nullable(),
  twitterLang: z.string(),
  twitterCreatedAt: z.coerce.date(),
  coinSymbol: z.string(),
  coinMarketCap: z.number(),
  coinPrice: z.number(),
  coinContractAddress: z.string().optional().nullable(),
  coinName: z.string(),
  coinImageUrl: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  fetchedAt: z.coerce.date().optional(),
  projectSnapshot: z.lazy(() => ProjectSnapshotCreateNestedManyWithoutProjectInputSchema).optional(),
  rewardPools: z.lazy(() => RewardPoolCreateNestedManyWithoutProjectInputSchema).optional(),
  kols: z.lazy(() => KOLToProjectCreateNestedManyWithoutProjectInputSchema).optional()
}).strict();

export const ProjectUncheckedCreateWithoutNarrativeLinksInputSchema: z.ZodType<Prisma.ProjectUncheckedCreateWithoutNarrativeLinksInput> = z.object({
  id: z.string().optional(),
  stage: z.string().optional().nullable(),
  featured: z.boolean().optional(),
  hidden: z.boolean().optional(),
  mindshare: z.number(),
  twitterId: z.string(),
  twitterUsername: z.string(),
  twitterDisplayName: z.string(),
  twitterAvatarUrl: z.string(),
  twitterDescription: z.string(),
  twitterDescriptionLink: z.string().optional().nullable(),
  twitterFollowersCount: z.number().int(),
  twitterFollowingCount: z.number().int(),
  twitterIsVerified: z.boolean(),
  twitterGoldBadge: z.boolean().optional().nullable(),
  twitterLang: z.string(),
  twitterCreatedAt: z.coerce.date(),
  coinSymbol: z.string(),
  coinMarketCap: z.number(),
  coinPrice: z.number(),
  coinContractAddress: z.string().optional().nullable(),
  coinName: z.string(),
  coinImageUrl: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  fetchedAt: z.coerce.date().optional(),
  projectSnapshot: z.lazy(() => ProjectSnapshotUncheckedCreateNestedManyWithoutProjectInputSchema).optional(),
  rewardPools: z.lazy(() => RewardPoolUncheckedCreateNestedManyWithoutProjectInputSchema).optional(),
  kols: z.lazy(() => KOLToProjectUncheckedCreateNestedManyWithoutProjectInputSchema).optional()
}).strict();

export const ProjectCreateOrConnectWithoutNarrativeLinksInputSchema: z.ZodType<Prisma.ProjectCreateOrConnectWithoutNarrativeLinksInput> = z.object({
  where: z.lazy(() => ProjectWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ProjectCreateWithoutNarrativeLinksInputSchema),z.lazy(() => ProjectUncheckedCreateWithoutNarrativeLinksInputSchema) ]),
}).strict();

export const NarrativeUpsertWithoutProjectLinksInputSchema: z.ZodType<Prisma.NarrativeUpsertWithoutProjectLinksInput> = z.object({
  update: z.union([ z.lazy(() => NarrativeUpdateWithoutProjectLinksInputSchema),z.lazy(() => NarrativeUncheckedUpdateWithoutProjectLinksInputSchema) ]),
  create: z.union([ z.lazy(() => NarrativeCreateWithoutProjectLinksInputSchema),z.lazy(() => NarrativeUncheckedCreateWithoutProjectLinksInputSchema) ]),
  where: z.lazy(() => NarrativeWhereInputSchema).optional()
}).strict();

export const NarrativeUpdateToOneWithWhereWithoutProjectLinksInputSchema: z.ZodType<Prisma.NarrativeUpdateToOneWithWhereWithoutProjectLinksInput> = z.object({
  where: z.lazy(() => NarrativeWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => NarrativeUpdateWithoutProjectLinksInputSchema),z.lazy(() => NarrativeUncheckedUpdateWithoutProjectLinksInputSchema) ]),
}).strict();

export const NarrativeUpdateWithoutProjectLinksInputSchema: z.ZodType<Prisma.NarrativeUpdateWithoutProjectLinksInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  narrativeId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  projectCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  totalViews: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  totalPosts: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  totalMarketCapUsd: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  marketCapChange24h: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  marketCapChange7d: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  marketCapChange30d: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  marketCapChange90d: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  mindsharePercent: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  mindshareChange24h: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  mindshareChange7d: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  mindshareChange30d: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  mindshareChange90d: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  fetchedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  narrativeSnapshot: z.lazy(() => NarrativeSnapshotUpdateManyWithoutNarrativeNestedInputSchema).optional(),
  projectSnapshot: z.lazy(() => ProjectSnapshotUpdateManyWithoutNarrativeNestedInputSchema).optional()
}).strict();

export const NarrativeUncheckedUpdateWithoutProjectLinksInputSchema: z.ZodType<Prisma.NarrativeUncheckedUpdateWithoutProjectLinksInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  narrativeId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  projectCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  totalViews: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  totalPosts: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  totalMarketCapUsd: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  marketCapChange24h: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  marketCapChange7d: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  marketCapChange30d: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  marketCapChange90d: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  mindsharePercent: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  mindshareChange24h: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  mindshareChange7d: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  mindshareChange30d: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  mindshareChange90d: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  fetchedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  narrativeSnapshot: z.lazy(() => NarrativeSnapshotUncheckedUpdateManyWithoutNarrativeNestedInputSchema).optional(),
  projectSnapshot: z.lazy(() => ProjectSnapshotUncheckedUpdateManyWithoutNarrativeNestedInputSchema).optional()
}).strict();

export const ProjectUpsertWithoutNarrativeLinksInputSchema: z.ZodType<Prisma.ProjectUpsertWithoutNarrativeLinksInput> = z.object({
  update: z.union([ z.lazy(() => ProjectUpdateWithoutNarrativeLinksInputSchema),z.lazy(() => ProjectUncheckedUpdateWithoutNarrativeLinksInputSchema) ]),
  create: z.union([ z.lazy(() => ProjectCreateWithoutNarrativeLinksInputSchema),z.lazy(() => ProjectUncheckedCreateWithoutNarrativeLinksInputSchema) ]),
  where: z.lazy(() => ProjectWhereInputSchema).optional()
}).strict();

export const ProjectUpdateToOneWithWhereWithoutNarrativeLinksInputSchema: z.ZodType<Prisma.ProjectUpdateToOneWithWhereWithoutNarrativeLinksInput> = z.object({
  where: z.lazy(() => ProjectWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => ProjectUpdateWithoutNarrativeLinksInputSchema),z.lazy(() => ProjectUncheckedUpdateWithoutNarrativeLinksInputSchema) ]),
}).strict();

export const ProjectUpdateWithoutNarrativeLinksInputSchema: z.ZodType<Prisma.ProjectUpdateWithoutNarrativeLinksInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  stage: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  featured: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  hidden: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  mindshare: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  twitterId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  twitterUsername: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  twitterDisplayName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  twitterAvatarUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  twitterDescription: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  twitterDescriptionLink: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  twitterFollowersCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  twitterFollowingCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  twitterIsVerified: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  twitterGoldBadge: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  twitterLang: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  twitterCreatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  coinSymbol: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  coinMarketCap: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  coinPrice: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  coinContractAddress: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  coinName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  coinImageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  fetchedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  projectSnapshot: z.lazy(() => ProjectSnapshotUpdateManyWithoutProjectNestedInputSchema).optional(),
  rewardPools: z.lazy(() => RewardPoolUpdateManyWithoutProjectNestedInputSchema).optional(),
  kols: z.lazy(() => KOLToProjectUpdateManyWithoutProjectNestedInputSchema).optional()
}).strict();

export const ProjectUncheckedUpdateWithoutNarrativeLinksInputSchema: z.ZodType<Prisma.ProjectUncheckedUpdateWithoutNarrativeLinksInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  stage: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  featured: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  hidden: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  mindshare: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  twitterId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  twitterUsername: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  twitterDisplayName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  twitterAvatarUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  twitterDescription: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  twitterDescriptionLink: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  twitterFollowersCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  twitterFollowingCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  twitterIsVerified: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  twitterGoldBadge: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  twitterLang: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  twitterCreatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  coinSymbol: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  coinMarketCap: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  coinPrice: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  coinContractAddress: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  coinName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  coinImageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  fetchedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  projectSnapshot: z.lazy(() => ProjectSnapshotUncheckedUpdateManyWithoutProjectNestedInputSchema).optional(),
  rewardPools: z.lazy(() => RewardPoolUncheckedUpdateManyWithoutProjectNestedInputSchema).optional(),
  kols: z.lazy(() => KOLToProjectUncheckedUpdateManyWithoutProjectNestedInputSchema).optional()
}).strict();

export const KOLToProjectCreateWithoutKolInputSchema: z.ZodType<Prisma.KOLToProjectCreateWithoutKolInput> = z.object({
  id: z.string().cuid().optional(),
  totalPosts: z.number().int(),
  totalViews: z.bigint(),
  totalInteractions: z.bigint(),
  totalComments: z.bigint(),
  qualityScore: z.number().optional().nullable(),
  proofOfWork: z.number().optional().nullable(),
  mindoMetric: z.number().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  fetchedAt: z.coerce.date().optional(),
  project: z.lazy(() => ProjectCreateNestedOneWithoutKolsInputSchema)
}).strict();

export const KOLToProjectUncheckedCreateWithoutKolInputSchema: z.ZodType<Prisma.KOLToProjectUncheckedCreateWithoutKolInput> = z.object({
  id: z.string().cuid().optional(),
  projectId: z.string(),
  totalPosts: z.number().int(),
  totalViews: z.bigint(),
  totalInteractions: z.bigint(),
  totalComments: z.bigint(),
  qualityScore: z.number().optional().nullable(),
  proofOfWork: z.number().optional().nullable(),
  mindoMetric: z.number().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  fetchedAt: z.coerce.date().optional()
}).strict();

export const KOLToProjectCreateOrConnectWithoutKolInputSchema: z.ZodType<Prisma.KOLToProjectCreateOrConnectWithoutKolInput> = z.object({
  where: z.lazy(() => KOLToProjectWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => KOLToProjectCreateWithoutKolInputSchema),z.lazy(() => KOLToProjectUncheckedCreateWithoutKolInputSchema) ]),
}).strict();

export const KOLToProjectCreateManyKolInputEnvelopeSchema: z.ZodType<Prisma.KOLToProjectCreateManyKolInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => KOLToProjectCreateManyKolInputSchema),z.lazy(() => KOLToProjectCreateManyKolInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const KOLSnapshotCreateWithoutKolInputSchema: z.ZodType<Prisma.KOLSnapshotCreateWithoutKolInput> = z.object({
  id: z.string().cuid().optional(),
  kolScore: z.number(),
  smartFollowersCount: z.number().int(),
  threadsCount: z.number().int(),
  engagementRate: z.number(),
  smartEngagement: z.number(),
  avgViews: z.number().int().optional().nullable(),
  avgLikes: z.number().int().optional().nullable(),
  totalPosts: z.number().int(),
  totalViews: z.bigint(),
  totalInteractions: z.bigint(),
  totalOrganicPosts: z.number().int(),
  totalOrganicViews: z.bigint(),
  totalOrganicInteractions: z.bigint(),
  totalAccountPosts: z.number().int(),
  totalAccountViews: z.bigint(),
  totalAccountInteractions: z.bigint(),
  totalAccountComments: z.number().int(),
  totalAccountLikes: z.number().int(),
  totalAccountRetweets: z.number().int(),
  totalAccountReplies: z.number().int(),
  totalPostsChange: z.number(),
  totalInteractionsChange: z.number(),
  totalViewsChange: z.number(),
  followersChange: z.number(),
  smartEngagementChange: z.number(),
  fetchedDate: z.string()
}).strict();

export const KOLSnapshotUncheckedCreateWithoutKolInputSchema: z.ZodType<Prisma.KOLSnapshotUncheckedCreateWithoutKolInput> = z.object({
  id: z.string().cuid().optional(),
  kolScore: z.number(),
  smartFollowersCount: z.number().int(),
  threadsCount: z.number().int(),
  engagementRate: z.number(),
  smartEngagement: z.number(),
  avgViews: z.number().int().optional().nullable(),
  avgLikes: z.number().int().optional().nullable(),
  totalPosts: z.number().int(),
  totalViews: z.bigint(),
  totalInteractions: z.bigint(),
  totalOrganicPosts: z.number().int(),
  totalOrganicViews: z.bigint(),
  totalOrganicInteractions: z.bigint(),
  totalAccountPosts: z.number().int(),
  totalAccountViews: z.bigint(),
  totalAccountInteractions: z.bigint(),
  totalAccountComments: z.number().int(),
  totalAccountLikes: z.number().int(),
  totalAccountRetweets: z.number().int(),
  totalAccountReplies: z.number().int(),
  totalPostsChange: z.number(),
  totalInteractionsChange: z.number(),
  totalViewsChange: z.number(),
  followersChange: z.number(),
  smartEngagementChange: z.number(),
  fetchedDate: z.string()
}).strict();

export const KOLSnapshotCreateOrConnectWithoutKolInputSchema: z.ZodType<Prisma.KOLSnapshotCreateOrConnectWithoutKolInput> = z.object({
  where: z.lazy(() => KOLSnapshotWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => KOLSnapshotCreateWithoutKolInputSchema),z.lazy(() => KOLSnapshotUncheckedCreateWithoutKolInputSchema) ]),
}).strict();

export const KOLSnapshotCreateManyKolInputEnvelopeSchema: z.ZodType<Prisma.KOLSnapshotCreateManyKolInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => KOLSnapshotCreateManyKolInputSchema),z.lazy(() => KOLSnapshotCreateManyKolInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const UserCreateWithoutKolInputSchema: z.ZodType<Prisma.UserCreateWithoutKolInput> = z.object({
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  username: z.string().optional().nullable(),
  avatarUrl: z.string().optional().nullable(),
  platform: z.string().optional(),
  email: z.string().optional().nullable(),
  twitterHandle: z.string().optional().nullable(),
  referralCode: z.string().cuid().optional(),
  onboardingStep: z.number().int().optional(),
  completedTasks: z.number().int().optional(),
  earnedPoints: z.number().int().optional(),
  referredBy: z.lazy(() => UserCreateNestedOneWithoutReferralsInputSchema).optional(),
  referrals: z.lazy(() => UserCreateNestedManyWithoutReferredByInputSchema).optional(),
  wallets: z.lazy(() => WalletCreateNestedManyWithoutUserInputSchema).optional(),
  primaryWallet: z.lazy(() => WalletCreateNestedOneWithoutPrimaryForInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutKolInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutKolInput> = z.object({
  id: z.number().int().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  username: z.string().optional().nullable(),
  avatarUrl: z.string().optional().nullable(),
  platform: z.string().optional(),
  email: z.string().optional().nullable(),
  twitterHandle: z.string().optional().nullable(),
  referralCode: z.string().cuid().optional(),
  referredById: z.number().int().optional().nullable(),
  onboardingStep: z.number().int().optional(),
  completedTasks: z.number().int().optional(),
  earnedPoints: z.number().int().optional(),
  primaryWalletId: z.number().int().optional().nullable(),
  referrals: z.lazy(() => UserUncheckedCreateNestedManyWithoutReferredByInputSchema).optional(),
  wallets: z.lazy(() => WalletUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutKolInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutKolInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutKolInputSchema),z.lazy(() => UserUncheckedCreateWithoutKolInputSchema) ]),
}).strict();

export const KOLToProjectUpsertWithWhereUniqueWithoutKolInputSchema: z.ZodType<Prisma.KOLToProjectUpsertWithWhereUniqueWithoutKolInput> = z.object({
  where: z.lazy(() => KOLToProjectWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => KOLToProjectUpdateWithoutKolInputSchema),z.lazy(() => KOLToProjectUncheckedUpdateWithoutKolInputSchema) ]),
  create: z.union([ z.lazy(() => KOLToProjectCreateWithoutKolInputSchema),z.lazy(() => KOLToProjectUncheckedCreateWithoutKolInputSchema) ]),
}).strict();

export const KOLToProjectUpdateWithWhereUniqueWithoutKolInputSchema: z.ZodType<Prisma.KOLToProjectUpdateWithWhereUniqueWithoutKolInput> = z.object({
  where: z.lazy(() => KOLToProjectWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => KOLToProjectUpdateWithoutKolInputSchema),z.lazy(() => KOLToProjectUncheckedUpdateWithoutKolInputSchema) ]),
}).strict();

export const KOLToProjectUpdateManyWithWhereWithoutKolInputSchema: z.ZodType<Prisma.KOLToProjectUpdateManyWithWhereWithoutKolInput> = z.object({
  where: z.lazy(() => KOLToProjectScalarWhereInputSchema),
  data: z.union([ z.lazy(() => KOLToProjectUpdateManyMutationInputSchema),z.lazy(() => KOLToProjectUncheckedUpdateManyWithoutKolInputSchema) ]),
}).strict();

export const KOLSnapshotUpsertWithWhereUniqueWithoutKolInputSchema: z.ZodType<Prisma.KOLSnapshotUpsertWithWhereUniqueWithoutKolInput> = z.object({
  where: z.lazy(() => KOLSnapshotWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => KOLSnapshotUpdateWithoutKolInputSchema),z.lazy(() => KOLSnapshotUncheckedUpdateWithoutKolInputSchema) ]),
  create: z.union([ z.lazy(() => KOLSnapshotCreateWithoutKolInputSchema),z.lazy(() => KOLSnapshotUncheckedCreateWithoutKolInputSchema) ]),
}).strict();

export const KOLSnapshotUpdateWithWhereUniqueWithoutKolInputSchema: z.ZodType<Prisma.KOLSnapshotUpdateWithWhereUniqueWithoutKolInput> = z.object({
  where: z.lazy(() => KOLSnapshotWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => KOLSnapshotUpdateWithoutKolInputSchema),z.lazy(() => KOLSnapshotUncheckedUpdateWithoutKolInputSchema) ]),
}).strict();

export const KOLSnapshotUpdateManyWithWhereWithoutKolInputSchema: z.ZodType<Prisma.KOLSnapshotUpdateManyWithWhereWithoutKolInput> = z.object({
  where: z.lazy(() => KOLSnapshotScalarWhereInputSchema),
  data: z.union([ z.lazy(() => KOLSnapshotUpdateManyMutationInputSchema),z.lazy(() => KOLSnapshotUncheckedUpdateManyWithoutKolInputSchema) ]),
}).strict();

export const KOLSnapshotScalarWhereInputSchema: z.ZodType<Prisma.KOLSnapshotScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => KOLSnapshotScalarWhereInputSchema),z.lazy(() => KOLSnapshotScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => KOLSnapshotScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => KOLSnapshotScalarWhereInputSchema),z.lazy(() => KOLSnapshotScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  kolId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  kolScore: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  smartFollowersCount: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  threadsCount: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  engagementRate: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  smartEngagement: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  avgViews: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  avgLikes: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  totalPosts: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  totalViews: z.union([ z.lazy(() => BigIntFilterSchema),z.bigint() ]).optional(),
  totalInteractions: z.union([ z.lazy(() => BigIntFilterSchema),z.bigint() ]).optional(),
  totalOrganicPosts: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  totalOrganicViews: z.union([ z.lazy(() => BigIntFilterSchema),z.bigint() ]).optional(),
  totalOrganicInteractions: z.union([ z.lazy(() => BigIntFilterSchema),z.bigint() ]).optional(),
  totalAccountPosts: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  totalAccountViews: z.union([ z.lazy(() => BigIntFilterSchema),z.bigint() ]).optional(),
  totalAccountInteractions: z.union([ z.lazy(() => BigIntFilterSchema),z.bigint() ]).optional(),
  totalAccountComments: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  totalAccountLikes: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  totalAccountRetweets: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  totalAccountReplies: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  totalPostsChange: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  totalInteractionsChange: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  totalViewsChange: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  followersChange: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  smartEngagementChange: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  fetchedDate: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const UserUpsertWithoutKolInputSchema: z.ZodType<Prisma.UserUpsertWithoutKolInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutKolInputSchema),z.lazy(() => UserUncheckedUpdateWithoutKolInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutKolInputSchema),z.lazy(() => UserUncheckedCreateWithoutKolInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutKolInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutKolInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutKolInputSchema),z.lazy(() => UserUncheckedUpdateWithoutKolInputSchema) ]),
}).strict();

export const UserUpdateWithoutKolInputSchema: z.ZodType<Prisma.UserUpdateWithoutKolInput> = z.object({
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  avatarUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  platform: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  twitterHandle: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  referralCode: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  onboardingStep: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  completedTasks: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  earnedPoints: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  referredBy: z.lazy(() => UserUpdateOneWithoutReferralsNestedInputSchema).optional(),
  referrals: z.lazy(() => UserUpdateManyWithoutReferredByNestedInputSchema).optional(),
  wallets: z.lazy(() => WalletUpdateManyWithoutUserNestedInputSchema).optional(),
  primaryWallet: z.lazy(() => WalletUpdateOneWithoutPrimaryForNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutKolInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutKolInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  avatarUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  platform: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  twitterHandle: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  referralCode: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  referredById: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  onboardingStep: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  completedTasks: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  earnedPoints: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  primaryWalletId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  referrals: z.lazy(() => UserUncheckedUpdateManyWithoutReferredByNestedInputSchema).optional(),
  wallets: z.lazy(() => WalletUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const KOLCreateWithoutKolSnapshotInputSchema: z.ZodType<Prisma.KOLCreateWithoutKolSnapshotInput> = z.object({
  id: z.string().optional(),
  hidden: z.boolean().optional(),
  isAlsoProject: z.boolean().optional(),
  twitterId: z.string(),
  twitterUsername: z.string(),
  twitterDisplayName: z.string(),
  twitterAvatarUrl: z.string(),
  twitterDescription: z.string(),
  twitterDescriptionLink: z.string().optional().nullable(),
  twitterFollowersCount: z.number().int(),
  twitterFollowingCount: z.number().int(),
  twitterIsVerified: z.boolean(),
  twitterGoldBadge: z.boolean().optional().nullable(),
  twitterLang: z.string(),
  twitterCreatedAt: z.coerce.date(),
  kolScore: z.number().optional().nullable(),
  kolScorePercentFromTotal: z.number().optional().nullable(),
  smartFollowersCount: z.number().int().optional().nullable(),
  threadsCount: z.number().int().optional().nullable(),
  engagementRate: z.number().optional().nullable(),
  smartEngagement: z.number().optional().nullable(),
  avgViews: z.number().int().optional().nullable(),
  avgLikes: z.number().int().optional().nullable(),
  totalPosts: z.number().int().optional().nullable(),
  totalViews: z.bigint().optional().nullable(),
  totalInteractions: z.bigint().optional().nullable(),
  totalOrganicPosts: z.number().int().optional().nullable(),
  totalOrganicViews: z.bigint().optional().nullable(),
  totalOrganicInteractions: z.bigint().optional().nullable(),
  totalAccountPosts: z.number().int().optional().nullable(),
  totalAccountViews: z.bigint().optional().nullable(),
  totalAccountInteractions: z.bigint().optional().nullable(),
  totalAccountComments: z.number().int().optional().nullable(),
  totalAccountLikes: z.number().int().optional().nullable(),
  totalAccountRetweets: z.number().int().optional().nullable(),
  totalAccountReplies: z.number().int().optional().nullable(),
  totalPostsChange: z.number().optional().nullable(),
  totalInteractionsChange: z.number().optional().nullable(),
  totalViewsChange: z.number().optional().nullable(),
  followersChange: z.number().optional().nullable(),
  smartEngagementChange: z.number().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  fetchedAt: z.coerce.date().optional(),
  projects: z.lazy(() => KOLToProjectCreateNestedManyWithoutKolInputSchema).optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutKolInputSchema).optional()
}).strict();

export const KOLUncheckedCreateWithoutKolSnapshotInputSchema: z.ZodType<Prisma.KOLUncheckedCreateWithoutKolSnapshotInput> = z.object({
  id: z.string().optional(),
  hidden: z.boolean().optional(),
  isAlsoProject: z.boolean().optional(),
  twitterId: z.string(),
  twitterUsername: z.string(),
  twitterDisplayName: z.string(),
  twitterAvatarUrl: z.string(),
  twitterDescription: z.string(),
  twitterDescriptionLink: z.string().optional().nullable(),
  twitterFollowersCount: z.number().int(),
  twitterFollowingCount: z.number().int(),
  twitterIsVerified: z.boolean(),
  twitterGoldBadge: z.boolean().optional().nullable(),
  twitterLang: z.string(),
  twitterCreatedAt: z.coerce.date(),
  kolScore: z.number().optional().nullable(),
  kolScorePercentFromTotal: z.number().optional().nullable(),
  smartFollowersCount: z.number().int().optional().nullable(),
  threadsCount: z.number().int().optional().nullable(),
  engagementRate: z.number().optional().nullable(),
  smartEngagement: z.number().optional().nullable(),
  avgViews: z.number().int().optional().nullable(),
  avgLikes: z.number().int().optional().nullable(),
  totalPosts: z.number().int().optional().nullable(),
  totalViews: z.bigint().optional().nullable(),
  totalInteractions: z.bigint().optional().nullable(),
  totalOrganicPosts: z.number().int().optional().nullable(),
  totalOrganicViews: z.bigint().optional().nullable(),
  totalOrganicInteractions: z.bigint().optional().nullable(),
  totalAccountPosts: z.number().int().optional().nullable(),
  totalAccountViews: z.bigint().optional().nullable(),
  totalAccountInteractions: z.bigint().optional().nullable(),
  totalAccountComments: z.number().int().optional().nullable(),
  totalAccountLikes: z.number().int().optional().nullable(),
  totalAccountRetweets: z.number().int().optional().nullable(),
  totalAccountReplies: z.number().int().optional().nullable(),
  totalPostsChange: z.number().optional().nullable(),
  totalInteractionsChange: z.number().optional().nullable(),
  totalViewsChange: z.number().optional().nullable(),
  followersChange: z.number().optional().nullable(),
  smartEngagementChange: z.number().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  fetchedAt: z.coerce.date().optional(),
  projects: z.lazy(() => KOLToProjectUncheckedCreateNestedManyWithoutKolInputSchema).optional(),
  user: z.lazy(() => UserUncheckedCreateNestedOneWithoutKolInputSchema).optional()
}).strict();

export const KOLCreateOrConnectWithoutKolSnapshotInputSchema: z.ZodType<Prisma.KOLCreateOrConnectWithoutKolSnapshotInput> = z.object({
  where: z.lazy(() => KOLWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => KOLCreateWithoutKolSnapshotInputSchema),z.lazy(() => KOLUncheckedCreateWithoutKolSnapshotInputSchema) ]),
}).strict();

export const KOLUpsertWithoutKolSnapshotInputSchema: z.ZodType<Prisma.KOLUpsertWithoutKolSnapshotInput> = z.object({
  update: z.union([ z.lazy(() => KOLUpdateWithoutKolSnapshotInputSchema),z.lazy(() => KOLUncheckedUpdateWithoutKolSnapshotInputSchema) ]),
  create: z.union([ z.lazy(() => KOLCreateWithoutKolSnapshotInputSchema),z.lazy(() => KOLUncheckedCreateWithoutKolSnapshotInputSchema) ]),
  where: z.lazy(() => KOLWhereInputSchema).optional()
}).strict();

export const KOLUpdateToOneWithWhereWithoutKolSnapshotInputSchema: z.ZodType<Prisma.KOLUpdateToOneWithWhereWithoutKolSnapshotInput> = z.object({
  where: z.lazy(() => KOLWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => KOLUpdateWithoutKolSnapshotInputSchema),z.lazy(() => KOLUncheckedUpdateWithoutKolSnapshotInputSchema) ]),
}).strict();

export const KOLUpdateWithoutKolSnapshotInputSchema: z.ZodType<Prisma.KOLUpdateWithoutKolSnapshotInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hidden: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isAlsoProject: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  twitterId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  twitterUsername: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  twitterDisplayName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  twitterAvatarUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  twitterDescription: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  twitterDescriptionLink: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  twitterFollowersCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  twitterFollowingCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  twitterIsVerified: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  twitterGoldBadge: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  twitterLang: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  twitterCreatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  kolScore: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  kolScorePercentFromTotal: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  smartFollowersCount: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  threadsCount: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  engagementRate: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  smartEngagement: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  avgViews: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  avgLikes: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  totalPosts: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  totalViews: z.union([ z.bigint(),z.lazy(() => NullableBigIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  totalInteractions: z.union([ z.bigint(),z.lazy(() => NullableBigIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  totalOrganicPosts: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  totalOrganicViews: z.union([ z.bigint(),z.lazy(() => NullableBigIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  totalOrganicInteractions: z.union([ z.bigint(),z.lazy(() => NullableBigIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  totalAccountPosts: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  totalAccountViews: z.union([ z.bigint(),z.lazy(() => NullableBigIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  totalAccountInteractions: z.union([ z.bigint(),z.lazy(() => NullableBigIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  totalAccountComments: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  totalAccountLikes: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  totalAccountRetweets: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  totalAccountReplies: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  totalPostsChange: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  totalInteractionsChange: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  totalViewsChange: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  followersChange: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  smartEngagementChange: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  fetchedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  projects: z.lazy(() => KOLToProjectUpdateManyWithoutKolNestedInputSchema).optional(),
  user: z.lazy(() => UserUpdateOneWithoutKolNestedInputSchema).optional()
}).strict();

export const KOLUncheckedUpdateWithoutKolSnapshotInputSchema: z.ZodType<Prisma.KOLUncheckedUpdateWithoutKolSnapshotInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hidden: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isAlsoProject: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  twitterId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  twitterUsername: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  twitterDisplayName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  twitterAvatarUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  twitterDescription: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  twitterDescriptionLink: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  twitterFollowersCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  twitterFollowingCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  twitterIsVerified: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  twitterGoldBadge: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  twitterLang: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  twitterCreatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  kolScore: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  kolScorePercentFromTotal: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  smartFollowersCount: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  threadsCount: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  engagementRate: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  smartEngagement: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  avgViews: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  avgLikes: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  totalPosts: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  totalViews: z.union([ z.bigint(),z.lazy(() => NullableBigIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  totalInteractions: z.union([ z.bigint(),z.lazy(() => NullableBigIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  totalOrganicPosts: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  totalOrganicViews: z.union([ z.bigint(),z.lazy(() => NullableBigIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  totalOrganicInteractions: z.union([ z.bigint(),z.lazy(() => NullableBigIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  totalAccountPosts: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  totalAccountViews: z.union([ z.bigint(),z.lazy(() => NullableBigIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  totalAccountInteractions: z.union([ z.bigint(),z.lazy(() => NullableBigIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  totalAccountComments: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  totalAccountLikes: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  totalAccountRetweets: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  totalAccountReplies: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  totalPostsChange: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  totalInteractionsChange: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  totalViewsChange: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  followersChange: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  smartEngagementChange: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  fetchedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  projects: z.lazy(() => KOLToProjectUncheckedUpdateManyWithoutKolNestedInputSchema).optional(),
  user: z.lazy(() => UserUncheckedUpdateOneWithoutKolNestedInputSchema).optional()
}).strict();

export const KOLCreateWithoutProjectsInputSchema: z.ZodType<Prisma.KOLCreateWithoutProjectsInput> = z.object({
  id: z.string().optional(),
  hidden: z.boolean().optional(),
  isAlsoProject: z.boolean().optional(),
  twitterId: z.string(),
  twitterUsername: z.string(),
  twitterDisplayName: z.string(),
  twitterAvatarUrl: z.string(),
  twitterDescription: z.string(),
  twitterDescriptionLink: z.string().optional().nullable(),
  twitterFollowersCount: z.number().int(),
  twitterFollowingCount: z.number().int(),
  twitterIsVerified: z.boolean(),
  twitterGoldBadge: z.boolean().optional().nullable(),
  twitterLang: z.string(),
  twitterCreatedAt: z.coerce.date(),
  kolScore: z.number().optional().nullable(),
  kolScorePercentFromTotal: z.number().optional().nullable(),
  smartFollowersCount: z.number().int().optional().nullable(),
  threadsCount: z.number().int().optional().nullable(),
  engagementRate: z.number().optional().nullable(),
  smartEngagement: z.number().optional().nullable(),
  avgViews: z.number().int().optional().nullable(),
  avgLikes: z.number().int().optional().nullable(),
  totalPosts: z.number().int().optional().nullable(),
  totalViews: z.bigint().optional().nullable(),
  totalInteractions: z.bigint().optional().nullable(),
  totalOrganicPosts: z.number().int().optional().nullable(),
  totalOrganicViews: z.bigint().optional().nullable(),
  totalOrganicInteractions: z.bigint().optional().nullable(),
  totalAccountPosts: z.number().int().optional().nullable(),
  totalAccountViews: z.bigint().optional().nullable(),
  totalAccountInteractions: z.bigint().optional().nullable(),
  totalAccountComments: z.number().int().optional().nullable(),
  totalAccountLikes: z.number().int().optional().nullable(),
  totalAccountRetweets: z.number().int().optional().nullable(),
  totalAccountReplies: z.number().int().optional().nullable(),
  totalPostsChange: z.number().optional().nullable(),
  totalInteractionsChange: z.number().optional().nullable(),
  totalViewsChange: z.number().optional().nullable(),
  followersChange: z.number().optional().nullable(),
  smartEngagementChange: z.number().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  fetchedAt: z.coerce.date().optional(),
  kolSnapshot: z.lazy(() => KOLSnapshotCreateNestedManyWithoutKolInputSchema).optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutKolInputSchema).optional()
}).strict();

export const KOLUncheckedCreateWithoutProjectsInputSchema: z.ZodType<Prisma.KOLUncheckedCreateWithoutProjectsInput> = z.object({
  id: z.string().optional(),
  hidden: z.boolean().optional(),
  isAlsoProject: z.boolean().optional(),
  twitterId: z.string(),
  twitterUsername: z.string(),
  twitterDisplayName: z.string(),
  twitterAvatarUrl: z.string(),
  twitterDescription: z.string(),
  twitterDescriptionLink: z.string().optional().nullable(),
  twitterFollowersCount: z.number().int(),
  twitterFollowingCount: z.number().int(),
  twitterIsVerified: z.boolean(),
  twitterGoldBadge: z.boolean().optional().nullable(),
  twitterLang: z.string(),
  twitterCreatedAt: z.coerce.date(),
  kolScore: z.number().optional().nullable(),
  kolScorePercentFromTotal: z.number().optional().nullable(),
  smartFollowersCount: z.number().int().optional().nullable(),
  threadsCount: z.number().int().optional().nullable(),
  engagementRate: z.number().optional().nullable(),
  smartEngagement: z.number().optional().nullable(),
  avgViews: z.number().int().optional().nullable(),
  avgLikes: z.number().int().optional().nullable(),
  totalPosts: z.number().int().optional().nullable(),
  totalViews: z.bigint().optional().nullable(),
  totalInteractions: z.bigint().optional().nullable(),
  totalOrganicPosts: z.number().int().optional().nullable(),
  totalOrganicViews: z.bigint().optional().nullable(),
  totalOrganicInteractions: z.bigint().optional().nullable(),
  totalAccountPosts: z.number().int().optional().nullable(),
  totalAccountViews: z.bigint().optional().nullable(),
  totalAccountInteractions: z.bigint().optional().nullable(),
  totalAccountComments: z.number().int().optional().nullable(),
  totalAccountLikes: z.number().int().optional().nullable(),
  totalAccountRetweets: z.number().int().optional().nullable(),
  totalAccountReplies: z.number().int().optional().nullable(),
  totalPostsChange: z.number().optional().nullable(),
  totalInteractionsChange: z.number().optional().nullable(),
  totalViewsChange: z.number().optional().nullable(),
  followersChange: z.number().optional().nullable(),
  smartEngagementChange: z.number().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  fetchedAt: z.coerce.date().optional(),
  kolSnapshot: z.lazy(() => KOLSnapshotUncheckedCreateNestedManyWithoutKolInputSchema).optional(),
  user: z.lazy(() => UserUncheckedCreateNestedOneWithoutKolInputSchema).optional()
}).strict();

export const KOLCreateOrConnectWithoutProjectsInputSchema: z.ZodType<Prisma.KOLCreateOrConnectWithoutProjectsInput> = z.object({
  where: z.lazy(() => KOLWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => KOLCreateWithoutProjectsInputSchema),z.lazy(() => KOLUncheckedCreateWithoutProjectsInputSchema) ]),
}).strict();

export const ProjectCreateWithoutKolsInputSchema: z.ZodType<Prisma.ProjectCreateWithoutKolsInput> = z.object({
  id: z.string().optional(),
  stage: z.string().optional().nullable(),
  featured: z.boolean().optional(),
  hidden: z.boolean().optional(),
  mindshare: z.number(),
  twitterId: z.string(),
  twitterUsername: z.string(),
  twitterDisplayName: z.string(),
  twitterAvatarUrl: z.string(),
  twitterDescription: z.string(),
  twitterDescriptionLink: z.string().optional().nullable(),
  twitterFollowersCount: z.number().int(),
  twitterFollowingCount: z.number().int(),
  twitterIsVerified: z.boolean(),
  twitterGoldBadge: z.boolean().optional().nullable(),
  twitterLang: z.string(),
  twitterCreatedAt: z.coerce.date(),
  coinSymbol: z.string(),
  coinMarketCap: z.number(),
  coinPrice: z.number(),
  coinContractAddress: z.string().optional().nullable(),
  coinName: z.string(),
  coinImageUrl: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  fetchedAt: z.coerce.date().optional(),
  projectSnapshot: z.lazy(() => ProjectSnapshotCreateNestedManyWithoutProjectInputSchema).optional(),
  narrativeLinks: z.lazy(() => ProjectToNarrativeCreateNestedManyWithoutProjectInputSchema).optional(),
  rewardPools: z.lazy(() => RewardPoolCreateNestedManyWithoutProjectInputSchema).optional()
}).strict();

export const ProjectUncheckedCreateWithoutKolsInputSchema: z.ZodType<Prisma.ProjectUncheckedCreateWithoutKolsInput> = z.object({
  id: z.string().optional(),
  stage: z.string().optional().nullable(),
  featured: z.boolean().optional(),
  hidden: z.boolean().optional(),
  mindshare: z.number(),
  twitterId: z.string(),
  twitterUsername: z.string(),
  twitterDisplayName: z.string(),
  twitterAvatarUrl: z.string(),
  twitterDescription: z.string(),
  twitterDescriptionLink: z.string().optional().nullable(),
  twitterFollowersCount: z.number().int(),
  twitterFollowingCount: z.number().int(),
  twitterIsVerified: z.boolean(),
  twitterGoldBadge: z.boolean().optional().nullable(),
  twitterLang: z.string(),
  twitterCreatedAt: z.coerce.date(),
  coinSymbol: z.string(),
  coinMarketCap: z.number(),
  coinPrice: z.number(),
  coinContractAddress: z.string().optional().nullable(),
  coinName: z.string(),
  coinImageUrl: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  fetchedAt: z.coerce.date().optional(),
  projectSnapshot: z.lazy(() => ProjectSnapshotUncheckedCreateNestedManyWithoutProjectInputSchema).optional(),
  narrativeLinks: z.lazy(() => ProjectToNarrativeUncheckedCreateNestedManyWithoutProjectInputSchema).optional(),
  rewardPools: z.lazy(() => RewardPoolUncheckedCreateNestedManyWithoutProjectInputSchema).optional()
}).strict();

export const ProjectCreateOrConnectWithoutKolsInputSchema: z.ZodType<Prisma.ProjectCreateOrConnectWithoutKolsInput> = z.object({
  where: z.lazy(() => ProjectWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ProjectCreateWithoutKolsInputSchema),z.lazy(() => ProjectUncheckedCreateWithoutKolsInputSchema) ]),
}).strict();

export const KOLUpsertWithoutProjectsInputSchema: z.ZodType<Prisma.KOLUpsertWithoutProjectsInput> = z.object({
  update: z.union([ z.lazy(() => KOLUpdateWithoutProjectsInputSchema),z.lazy(() => KOLUncheckedUpdateWithoutProjectsInputSchema) ]),
  create: z.union([ z.lazy(() => KOLCreateWithoutProjectsInputSchema),z.lazy(() => KOLUncheckedCreateWithoutProjectsInputSchema) ]),
  where: z.lazy(() => KOLWhereInputSchema).optional()
}).strict();

export const KOLUpdateToOneWithWhereWithoutProjectsInputSchema: z.ZodType<Prisma.KOLUpdateToOneWithWhereWithoutProjectsInput> = z.object({
  where: z.lazy(() => KOLWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => KOLUpdateWithoutProjectsInputSchema),z.lazy(() => KOLUncheckedUpdateWithoutProjectsInputSchema) ]),
}).strict();

export const KOLUpdateWithoutProjectsInputSchema: z.ZodType<Prisma.KOLUpdateWithoutProjectsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hidden: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isAlsoProject: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  twitterId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  twitterUsername: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  twitterDisplayName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  twitterAvatarUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  twitterDescription: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  twitterDescriptionLink: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  twitterFollowersCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  twitterFollowingCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  twitterIsVerified: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  twitterGoldBadge: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  twitterLang: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  twitterCreatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  kolScore: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  kolScorePercentFromTotal: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  smartFollowersCount: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  threadsCount: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  engagementRate: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  smartEngagement: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  avgViews: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  avgLikes: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  totalPosts: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  totalViews: z.union([ z.bigint(),z.lazy(() => NullableBigIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  totalInteractions: z.union([ z.bigint(),z.lazy(() => NullableBigIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  totalOrganicPosts: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  totalOrganicViews: z.union([ z.bigint(),z.lazy(() => NullableBigIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  totalOrganicInteractions: z.union([ z.bigint(),z.lazy(() => NullableBigIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  totalAccountPosts: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  totalAccountViews: z.union([ z.bigint(),z.lazy(() => NullableBigIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  totalAccountInteractions: z.union([ z.bigint(),z.lazy(() => NullableBigIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  totalAccountComments: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  totalAccountLikes: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  totalAccountRetweets: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  totalAccountReplies: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  totalPostsChange: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  totalInteractionsChange: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  totalViewsChange: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  followersChange: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  smartEngagementChange: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  fetchedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  kolSnapshot: z.lazy(() => KOLSnapshotUpdateManyWithoutKolNestedInputSchema).optional(),
  user: z.lazy(() => UserUpdateOneWithoutKolNestedInputSchema).optional()
}).strict();

export const KOLUncheckedUpdateWithoutProjectsInputSchema: z.ZodType<Prisma.KOLUncheckedUpdateWithoutProjectsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hidden: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isAlsoProject: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  twitterId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  twitterUsername: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  twitterDisplayName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  twitterAvatarUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  twitterDescription: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  twitterDescriptionLink: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  twitterFollowersCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  twitterFollowingCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  twitterIsVerified: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  twitterGoldBadge: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  twitterLang: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  twitterCreatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  kolScore: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  kolScorePercentFromTotal: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  smartFollowersCount: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  threadsCount: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  engagementRate: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  smartEngagement: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  avgViews: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  avgLikes: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  totalPosts: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  totalViews: z.union([ z.bigint(),z.lazy(() => NullableBigIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  totalInteractions: z.union([ z.bigint(),z.lazy(() => NullableBigIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  totalOrganicPosts: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  totalOrganicViews: z.union([ z.bigint(),z.lazy(() => NullableBigIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  totalOrganicInteractions: z.union([ z.bigint(),z.lazy(() => NullableBigIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  totalAccountPosts: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  totalAccountViews: z.union([ z.bigint(),z.lazy(() => NullableBigIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  totalAccountInteractions: z.union([ z.bigint(),z.lazy(() => NullableBigIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  totalAccountComments: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  totalAccountLikes: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  totalAccountRetweets: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  totalAccountReplies: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  totalPostsChange: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  totalInteractionsChange: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  totalViewsChange: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  followersChange: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  smartEngagementChange: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  fetchedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  kolSnapshot: z.lazy(() => KOLSnapshotUncheckedUpdateManyWithoutKolNestedInputSchema).optional(),
  user: z.lazy(() => UserUncheckedUpdateOneWithoutKolNestedInputSchema).optional()
}).strict();

export const ProjectUpsertWithoutKolsInputSchema: z.ZodType<Prisma.ProjectUpsertWithoutKolsInput> = z.object({
  update: z.union([ z.lazy(() => ProjectUpdateWithoutKolsInputSchema),z.lazy(() => ProjectUncheckedUpdateWithoutKolsInputSchema) ]),
  create: z.union([ z.lazy(() => ProjectCreateWithoutKolsInputSchema),z.lazy(() => ProjectUncheckedCreateWithoutKolsInputSchema) ]),
  where: z.lazy(() => ProjectWhereInputSchema).optional()
}).strict();

export const ProjectUpdateToOneWithWhereWithoutKolsInputSchema: z.ZodType<Prisma.ProjectUpdateToOneWithWhereWithoutKolsInput> = z.object({
  where: z.lazy(() => ProjectWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => ProjectUpdateWithoutKolsInputSchema),z.lazy(() => ProjectUncheckedUpdateWithoutKolsInputSchema) ]),
}).strict();

export const ProjectUpdateWithoutKolsInputSchema: z.ZodType<Prisma.ProjectUpdateWithoutKolsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  stage: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  featured: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  hidden: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  mindshare: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  twitterId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  twitterUsername: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  twitterDisplayName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  twitterAvatarUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  twitterDescription: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  twitterDescriptionLink: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  twitterFollowersCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  twitterFollowingCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  twitterIsVerified: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  twitterGoldBadge: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  twitterLang: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  twitterCreatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  coinSymbol: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  coinMarketCap: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  coinPrice: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  coinContractAddress: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  coinName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  coinImageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  fetchedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  projectSnapshot: z.lazy(() => ProjectSnapshotUpdateManyWithoutProjectNestedInputSchema).optional(),
  narrativeLinks: z.lazy(() => ProjectToNarrativeUpdateManyWithoutProjectNestedInputSchema).optional(),
  rewardPools: z.lazy(() => RewardPoolUpdateManyWithoutProjectNestedInputSchema).optional()
}).strict();

export const ProjectUncheckedUpdateWithoutKolsInputSchema: z.ZodType<Prisma.ProjectUncheckedUpdateWithoutKolsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  stage: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  featured: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  hidden: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  mindshare: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  twitterId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  twitterUsername: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  twitterDisplayName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  twitterAvatarUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  twitterDescription: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  twitterDescriptionLink: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  twitterFollowersCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  twitterFollowingCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  twitterIsVerified: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  twitterGoldBadge: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  twitterLang: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  twitterCreatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  coinSymbol: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  coinMarketCap: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  coinPrice: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  coinContractAddress: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  coinName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  coinImageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  fetchedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  projectSnapshot: z.lazy(() => ProjectSnapshotUncheckedUpdateManyWithoutProjectNestedInputSchema).optional(),
  narrativeLinks: z.lazy(() => ProjectToNarrativeUncheckedUpdateManyWithoutProjectNestedInputSchema).optional(),
  rewardPools: z.lazy(() => RewardPoolUncheckedUpdateManyWithoutProjectNestedInputSchema).optional()
}).strict();

export const ProjectCreateWithoutRewardPoolsInputSchema: z.ZodType<Prisma.ProjectCreateWithoutRewardPoolsInput> = z.object({
  id: z.string().optional(),
  stage: z.string().optional().nullable(),
  featured: z.boolean().optional(),
  hidden: z.boolean().optional(),
  mindshare: z.number(),
  twitterId: z.string(),
  twitterUsername: z.string(),
  twitterDisplayName: z.string(),
  twitterAvatarUrl: z.string(),
  twitterDescription: z.string(),
  twitterDescriptionLink: z.string().optional().nullable(),
  twitterFollowersCount: z.number().int(),
  twitterFollowingCount: z.number().int(),
  twitterIsVerified: z.boolean(),
  twitterGoldBadge: z.boolean().optional().nullable(),
  twitterLang: z.string(),
  twitterCreatedAt: z.coerce.date(),
  coinSymbol: z.string(),
  coinMarketCap: z.number(),
  coinPrice: z.number(),
  coinContractAddress: z.string().optional().nullable(),
  coinName: z.string(),
  coinImageUrl: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  fetchedAt: z.coerce.date().optional(),
  projectSnapshot: z.lazy(() => ProjectSnapshotCreateNestedManyWithoutProjectInputSchema).optional(),
  narrativeLinks: z.lazy(() => ProjectToNarrativeCreateNestedManyWithoutProjectInputSchema).optional(),
  kols: z.lazy(() => KOLToProjectCreateNestedManyWithoutProjectInputSchema).optional()
}).strict();

export const ProjectUncheckedCreateWithoutRewardPoolsInputSchema: z.ZodType<Prisma.ProjectUncheckedCreateWithoutRewardPoolsInput> = z.object({
  id: z.string().optional(),
  stage: z.string().optional().nullable(),
  featured: z.boolean().optional(),
  hidden: z.boolean().optional(),
  mindshare: z.number(),
  twitterId: z.string(),
  twitterUsername: z.string(),
  twitterDisplayName: z.string(),
  twitterAvatarUrl: z.string(),
  twitterDescription: z.string(),
  twitterDescriptionLink: z.string().optional().nullable(),
  twitterFollowersCount: z.number().int(),
  twitterFollowingCount: z.number().int(),
  twitterIsVerified: z.boolean(),
  twitterGoldBadge: z.boolean().optional().nullable(),
  twitterLang: z.string(),
  twitterCreatedAt: z.coerce.date(),
  coinSymbol: z.string(),
  coinMarketCap: z.number(),
  coinPrice: z.number(),
  coinContractAddress: z.string().optional().nullable(),
  coinName: z.string(),
  coinImageUrl: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  fetchedAt: z.coerce.date().optional(),
  projectSnapshot: z.lazy(() => ProjectSnapshotUncheckedCreateNestedManyWithoutProjectInputSchema).optional(),
  narrativeLinks: z.lazy(() => ProjectToNarrativeUncheckedCreateNestedManyWithoutProjectInputSchema).optional(),
  kols: z.lazy(() => KOLToProjectUncheckedCreateNestedManyWithoutProjectInputSchema).optional()
}).strict();

export const ProjectCreateOrConnectWithoutRewardPoolsInputSchema: z.ZodType<Prisma.ProjectCreateOrConnectWithoutRewardPoolsInput> = z.object({
  where: z.lazy(() => ProjectWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ProjectCreateWithoutRewardPoolsInputSchema),z.lazy(() => ProjectUncheckedCreateWithoutRewardPoolsInputSchema) ]),
}).strict();

export const ProjectUpsertWithoutRewardPoolsInputSchema: z.ZodType<Prisma.ProjectUpsertWithoutRewardPoolsInput> = z.object({
  update: z.union([ z.lazy(() => ProjectUpdateWithoutRewardPoolsInputSchema),z.lazy(() => ProjectUncheckedUpdateWithoutRewardPoolsInputSchema) ]),
  create: z.union([ z.lazy(() => ProjectCreateWithoutRewardPoolsInputSchema),z.lazy(() => ProjectUncheckedCreateWithoutRewardPoolsInputSchema) ]),
  where: z.lazy(() => ProjectWhereInputSchema).optional()
}).strict();

export const ProjectUpdateToOneWithWhereWithoutRewardPoolsInputSchema: z.ZodType<Prisma.ProjectUpdateToOneWithWhereWithoutRewardPoolsInput> = z.object({
  where: z.lazy(() => ProjectWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => ProjectUpdateWithoutRewardPoolsInputSchema),z.lazy(() => ProjectUncheckedUpdateWithoutRewardPoolsInputSchema) ]),
}).strict();

export const ProjectUpdateWithoutRewardPoolsInputSchema: z.ZodType<Prisma.ProjectUpdateWithoutRewardPoolsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  stage: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  featured: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  hidden: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  mindshare: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  twitterId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  twitterUsername: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  twitterDisplayName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  twitterAvatarUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  twitterDescription: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  twitterDescriptionLink: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  twitterFollowersCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  twitterFollowingCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  twitterIsVerified: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  twitterGoldBadge: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  twitterLang: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  twitterCreatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  coinSymbol: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  coinMarketCap: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  coinPrice: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  coinContractAddress: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  coinName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  coinImageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  fetchedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  projectSnapshot: z.lazy(() => ProjectSnapshotUpdateManyWithoutProjectNestedInputSchema).optional(),
  narrativeLinks: z.lazy(() => ProjectToNarrativeUpdateManyWithoutProjectNestedInputSchema).optional(),
  kols: z.lazy(() => KOLToProjectUpdateManyWithoutProjectNestedInputSchema).optional()
}).strict();

export const ProjectUncheckedUpdateWithoutRewardPoolsInputSchema: z.ZodType<Prisma.ProjectUncheckedUpdateWithoutRewardPoolsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  stage: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  featured: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  hidden: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  mindshare: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  twitterId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  twitterUsername: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  twitterDisplayName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  twitterAvatarUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  twitterDescription: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  twitterDescriptionLink: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  twitterFollowersCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  twitterFollowingCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  twitterIsVerified: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  twitterGoldBadge: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  twitterLang: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  twitterCreatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  coinSymbol: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  coinMarketCap: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  coinPrice: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  coinContractAddress: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  coinName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  coinImageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  fetchedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  projectSnapshot: z.lazy(() => ProjectSnapshotUncheckedUpdateManyWithoutProjectNestedInputSchema).optional(),
  narrativeLinks: z.lazy(() => ProjectToNarrativeUncheckedUpdateManyWithoutProjectNestedInputSchema).optional(),
  kols: z.lazy(() => KOLToProjectUncheckedUpdateManyWithoutProjectNestedInputSchema).optional()
}).strict();

export const UserCreateManyReferredByInputSchema: z.ZodType<Prisma.UserCreateManyReferredByInput> = z.object({
  id: z.number().int().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  username: z.string().optional().nullable(),
  avatarUrl: z.string().optional().nullable(),
  platform: z.string().optional(),
  email: z.string().optional().nullable(),
  twitterHandle: z.string().optional().nullable(),
  referralCode: z.string().cuid().optional(),
  onboardingStep: z.number().int().optional(),
  completedTasks: z.number().int().optional(),
  earnedPoints: z.number().int().optional(),
  kolId: z.string().optional().nullable(),
  primaryWalletId: z.number().int().optional().nullable()
}).strict();

export const WalletCreateManyUserInputSchema: z.ZodType<Prisma.WalletCreateManyUserInput> = z.object({
  id: z.number().int().optional(),
  address: z.string(),
  chain: z.string(),
  verified: z.boolean().optional(),
  label: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional()
}).strict();

export const UserUpdateWithoutReferredByInputSchema: z.ZodType<Prisma.UserUpdateWithoutReferredByInput> = z.object({
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  avatarUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  platform: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  twitterHandle: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  referralCode: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  onboardingStep: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  completedTasks: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  earnedPoints: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  referrals: z.lazy(() => UserUpdateManyWithoutReferredByNestedInputSchema).optional(),
  kol: z.lazy(() => KOLUpdateOneWithoutUserNestedInputSchema).optional(),
  wallets: z.lazy(() => WalletUpdateManyWithoutUserNestedInputSchema).optional(),
  primaryWallet: z.lazy(() => WalletUpdateOneWithoutPrimaryForNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutReferredByInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutReferredByInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  avatarUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  platform: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  twitterHandle: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  referralCode: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  onboardingStep: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  completedTasks: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  earnedPoints: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  kolId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  primaryWalletId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  referrals: z.lazy(() => UserUncheckedUpdateManyWithoutReferredByNestedInputSchema).optional(),
  wallets: z.lazy(() => WalletUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateManyWithoutReferredByInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyWithoutReferredByInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  avatarUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  platform: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  twitterHandle: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  referralCode: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  onboardingStep: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  completedTasks: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  earnedPoints: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  kolId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  primaryWalletId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const WalletUpdateWithoutUserInputSchema: z.ZodType<Prisma.WalletUpdateWithoutUserInput> = z.object({
  address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  chain: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  verified: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  label: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  primaryFor: z.lazy(() => UserUpdateOneWithoutPrimaryWalletNestedInputSchema).optional()
}).strict();

export const WalletUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.WalletUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  chain: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  verified: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  label: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  primaryFor: z.lazy(() => UserUncheckedUpdateOneWithoutPrimaryWalletNestedInputSchema).optional()
}).strict();

export const WalletUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.WalletUncheckedUpdateManyWithoutUserInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  chain: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  verified: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  label: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ProjectToNarrativeCreateManyNarrativeInputSchema: z.ZodType<Prisma.ProjectToNarrativeCreateManyNarrativeInput> = z.object({
  id: z.string().optional(),
  projectId: z.string(),
  totalViews: z.number().int(),
  totalPosts: z.number().int(),
  mindsharePercent: z.number(),
  mindshareChange24h: z.number(),
  mindshareChange7d: z.number(),
  mindshareChange30d: z.number(),
  mindshareChange90d: z.number(),
  createdAt: z.coerce.date().optional()
}).strict();

export const NarrativeSnapshotCreateManyNarrativeInputSchema: z.ZodType<Prisma.NarrativeSnapshotCreateManyNarrativeInput> = z.object({
  id: z.string().cuid().optional(),
  projectCount: z.number().int(),
  totalViews: z.number(),
  totalPosts: z.number().int(),
  totalMarketCapUsd: z.number(),
  marketCapChange24h: z.number(),
  marketCapChange7d: z.number(),
  marketCapChange30d: z.number(),
  marketCapChange90d: z.number(),
  mindsharePercent: z.number(),
  mindshareChange24h: z.number(),
  mindshareChange7d: z.number(),
  mindshareChange30d: z.number(),
  mindshareChange90d: z.number(),
  source: z.string(),
  updatedBy: z.string(),
  fetchedDate: z.string()
}).strict();

export const ProjectSnapshotCreateManyNarrativeInputSchema: z.ZodType<Prisma.ProjectSnapshotCreateManyNarrativeInput> = z.object({
  id: z.string().cuid().optional(),
  totalViews: z.number().int(),
  totalPosts: z.number().int(),
  mindsharePercent: z.number(),
  mindshareChange24h: z.number(),
  mindshareChange7d: z.number(),
  mindshareChange30d: z.number(),
  mindshareChange90d: z.number(),
  source: z.string(),
  updatedBy: z.string(),
  fetchedDate: z.string(),
  projectId: z.string()
}).strict();

export const ProjectToNarrativeUpdateWithoutNarrativeInputSchema: z.ZodType<Prisma.ProjectToNarrativeUpdateWithoutNarrativeInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  totalViews: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  totalPosts: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  mindsharePercent: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  mindshareChange24h: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  mindshareChange7d: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  mindshareChange30d: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  mindshareChange90d: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  project: z.lazy(() => ProjectUpdateOneRequiredWithoutNarrativeLinksNestedInputSchema).optional()
}).strict();

export const ProjectToNarrativeUncheckedUpdateWithoutNarrativeInputSchema: z.ZodType<Prisma.ProjectToNarrativeUncheckedUpdateWithoutNarrativeInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  projectId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  totalViews: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  totalPosts: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  mindsharePercent: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  mindshareChange24h: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  mindshareChange7d: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  mindshareChange30d: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  mindshareChange90d: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ProjectToNarrativeUncheckedUpdateManyWithoutNarrativeInputSchema: z.ZodType<Prisma.ProjectToNarrativeUncheckedUpdateManyWithoutNarrativeInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  projectId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  totalViews: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  totalPosts: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  mindsharePercent: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  mindshareChange24h: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  mindshareChange7d: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  mindshareChange30d: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  mindshareChange90d: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const NarrativeSnapshotUpdateWithoutNarrativeInputSchema: z.ZodType<Prisma.NarrativeSnapshotUpdateWithoutNarrativeInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  projectCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  totalViews: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  totalPosts: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  totalMarketCapUsd: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  marketCapChange24h: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  marketCapChange7d: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  marketCapChange30d: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  marketCapChange90d: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  mindsharePercent: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  mindshareChange24h: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  mindshareChange7d: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  mindshareChange30d: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  mindshareChange90d: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  source: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  updatedBy: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  fetchedDate: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const NarrativeSnapshotUncheckedUpdateWithoutNarrativeInputSchema: z.ZodType<Prisma.NarrativeSnapshotUncheckedUpdateWithoutNarrativeInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  projectCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  totalViews: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  totalPosts: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  totalMarketCapUsd: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  marketCapChange24h: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  marketCapChange7d: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  marketCapChange30d: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  marketCapChange90d: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  mindsharePercent: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  mindshareChange24h: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  mindshareChange7d: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  mindshareChange30d: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  mindshareChange90d: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  source: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  updatedBy: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  fetchedDate: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const NarrativeSnapshotUncheckedUpdateManyWithoutNarrativeInputSchema: z.ZodType<Prisma.NarrativeSnapshotUncheckedUpdateManyWithoutNarrativeInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  projectCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  totalViews: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  totalPosts: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  totalMarketCapUsd: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  marketCapChange24h: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  marketCapChange7d: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  marketCapChange30d: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  marketCapChange90d: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  mindsharePercent: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  mindshareChange24h: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  mindshareChange7d: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  mindshareChange30d: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  mindshareChange90d: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  source: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  updatedBy: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  fetchedDate: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ProjectSnapshotUpdateWithoutNarrativeInputSchema: z.ZodType<Prisma.ProjectSnapshotUpdateWithoutNarrativeInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  totalViews: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  totalPosts: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  mindsharePercent: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  mindshareChange24h: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  mindshareChange7d: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  mindshareChange30d: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  mindshareChange90d: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  source: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  updatedBy: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  fetchedDate: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  project: z.lazy(() => ProjectUpdateOneRequiredWithoutProjectSnapshotNestedInputSchema).optional()
}).strict();

export const ProjectSnapshotUncheckedUpdateWithoutNarrativeInputSchema: z.ZodType<Prisma.ProjectSnapshotUncheckedUpdateWithoutNarrativeInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  totalViews: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  totalPosts: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  mindsharePercent: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  mindshareChange24h: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  mindshareChange7d: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  mindshareChange30d: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  mindshareChange90d: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  source: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  updatedBy: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  fetchedDate: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  projectId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ProjectSnapshotUncheckedUpdateManyWithoutNarrativeInputSchema: z.ZodType<Prisma.ProjectSnapshotUncheckedUpdateManyWithoutNarrativeInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  totalViews: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  totalPosts: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  mindsharePercent: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  mindshareChange24h: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  mindshareChange7d: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  mindshareChange30d: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  mindshareChange90d: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  source: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  updatedBy: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  fetchedDate: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  projectId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ProjectSnapshotCreateManyProjectInputSchema: z.ZodType<Prisma.ProjectSnapshotCreateManyProjectInput> = z.object({
  id: z.string().cuid().optional(),
  totalViews: z.number().int(),
  totalPosts: z.number().int(),
  mindsharePercent: z.number(),
  mindshareChange24h: z.number(),
  mindshareChange7d: z.number(),
  mindshareChange30d: z.number(),
  mindshareChange90d: z.number(),
  source: z.string(),
  updatedBy: z.string(),
  fetchedDate: z.string(),
  narrativeId: z.string().optional().nullable()
}).strict();

export const ProjectToNarrativeCreateManyProjectInputSchema: z.ZodType<Prisma.ProjectToNarrativeCreateManyProjectInput> = z.object({
  id: z.string().optional(),
  narrativeId: z.string(),
  totalViews: z.number().int(),
  totalPosts: z.number().int(),
  mindsharePercent: z.number(),
  mindshareChange24h: z.number(),
  mindshareChange7d: z.number(),
  mindshareChange30d: z.number(),
  mindshareChange90d: z.number(),
  createdAt: z.coerce.date().optional()
}).strict();

export const RewardPoolCreateManyProjectInputSchema: z.ZodType<Prisma.RewardPoolCreateManyProjectInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  description: z.string(),
  reward: z.string(),
  rewardRate: z.number().optional().nullable(),
  rewardUnit: z.string().optional().nullable(),
  deadline: z.coerce.date(),
  platforms: z.union([ z.lazy(() => RewardPoolCreateplatformsInputSchema),z.string().array() ]).optional(),
  status: z.lazy(() => RewardPoolStatusSchema),
  totalAmountUsd: z.number(),
  paidOutUsd: z.number(),
  campaignTargetViews: z.number().int(),
  participantsCount: z.number().int(),
  completedCount: z.number().int(),
  requirements: z.union([ z.lazy(() => RewardPoolCreaterequirementsInputSchema),z.string().array() ]).optional(),
}).strict();

export const KOLToProjectCreateManyProjectInputSchema: z.ZodType<Prisma.KOLToProjectCreateManyProjectInput> = z.object({
  id: z.string().cuid().optional(),
  kolId: z.string(),
  totalPosts: z.number().int(),
  totalViews: z.bigint(),
  totalInteractions: z.bigint(),
  totalComments: z.bigint(),
  qualityScore: z.number().optional().nullable(),
  proofOfWork: z.number().optional().nullable(),
  mindoMetric: z.number().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  fetchedAt: z.coerce.date().optional()
}).strict();

export const ProjectSnapshotUpdateWithoutProjectInputSchema: z.ZodType<Prisma.ProjectSnapshotUpdateWithoutProjectInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  totalViews: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  totalPosts: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  mindsharePercent: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  mindshareChange24h: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  mindshareChange7d: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  mindshareChange30d: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  mindshareChange90d: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  source: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  updatedBy: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  fetchedDate: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  narrative: z.lazy(() => NarrativeUpdateOneWithoutProjectSnapshotNestedInputSchema).optional()
}).strict();

export const ProjectSnapshotUncheckedUpdateWithoutProjectInputSchema: z.ZodType<Prisma.ProjectSnapshotUncheckedUpdateWithoutProjectInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  totalViews: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  totalPosts: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  mindsharePercent: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  mindshareChange24h: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  mindshareChange7d: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  mindshareChange30d: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  mindshareChange90d: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  source: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  updatedBy: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  fetchedDate: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  narrativeId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const ProjectSnapshotUncheckedUpdateManyWithoutProjectInputSchema: z.ZodType<Prisma.ProjectSnapshotUncheckedUpdateManyWithoutProjectInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  totalViews: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  totalPosts: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  mindsharePercent: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  mindshareChange24h: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  mindshareChange7d: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  mindshareChange30d: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  mindshareChange90d: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  source: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  updatedBy: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  fetchedDate: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  narrativeId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const ProjectToNarrativeUpdateWithoutProjectInputSchema: z.ZodType<Prisma.ProjectToNarrativeUpdateWithoutProjectInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  totalViews: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  totalPosts: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  mindsharePercent: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  mindshareChange24h: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  mindshareChange7d: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  mindshareChange30d: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  mindshareChange90d: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  narrative: z.lazy(() => NarrativeUpdateOneRequiredWithoutProjectLinksNestedInputSchema).optional()
}).strict();

export const ProjectToNarrativeUncheckedUpdateWithoutProjectInputSchema: z.ZodType<Prisma.ProjectToNarrativeUncheckedUpdateWithoutProjectInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  narrativeId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  totalViews: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  totalPosts: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  mindsharePercent: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  mindshareChange24h: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  mindshareChange7d: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  mindshareChange30d: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  mindshareChange90d: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ProjectToNarrativeUncheckedUpdateManyWithoutProjectInputSchema: z.ZodType<Prisma.ProjectToNarrativeUncheckedUpdateManyWithoutProjectInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  narrativeId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  totalViews: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  totalPosts: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  mindsharePercent: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  mindshareChange24h: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  mindshareChange7d: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  mindshareChange30d: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  mindshareChange90d: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RewardPoolUpdateWithoutProjectInputSchema: z.ZodType<Prisma.RewardPoolUpdateWithoutProjectInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  reward: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rewardRate: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rewardUnit: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  deadline: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  platforms: z.union([ z.lazy(() => RewardPoolUpdateplatformsInputSchema),z.string().array() ]).optional(),
  status: z.union([ z.lazy(() => RewardPoolStatusSchema),z.lazy(() => EnumRewardPoolStatusFieldUpdateOperationsInputSchema) ]).optional(),
  totalAmountUsd: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  paidOutUsd: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  campaignTargetViews: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  participantsCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  completedCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  requirements: z.union([ z.lazy(() => RewardPoolUpdaterequirementsInputSchema),z.string().array() ]).optional(),
}).strict();

export const RewardPoolUncheckedUpdateWithoutProjectInputSchema: z.ZodType<Prisma.RewardPoolUncheckedUpdateWithoutProjectInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  reward: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rewardRate: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rewardUnit: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  deadline: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  platforms: z.union([ z.lazy(() => RewardPoolUpdateplatformsInputSchema),z.string().array() ]).optional(),
  status: z.union([ z.lazy(() => RewardPoolStatusSchema),z.lazy(() => EnumRewardPoolStatusFieldUpdateOperationsInputSchema) ]).optional(),
  totalAmountUsd: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  paidOutUsd: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  campaignTargetViews: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  participantsCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  completedCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  requirements: z.union([ z.lazy(() => RewardPoolUpdaterequirementsInputSchema),z.string().array() ]).optional(),
}).strict();

export const RewardPoolUncheckedUpdateManyWithoutProjectInputSchema: z.ZodType<Prisma.RewardPoolUncheckedUpdateManyWithoutProjectInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  reward: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rewardRate: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rewardUnit: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  deadline: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  platforms: z.union([ z.lazy(() => RewardPoolUpdateplatformsInputSchema),z.string().array() ]).optional(),
  status: z.union([ z.lazy(() => RewardPoolStatusSchema),z.lazy(() => EnumRewardPoolStatusFieldUpdateOperationsInputSchema) ]).optional(),
  totalAmountUsd: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  paidOutUsd: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  campaignTargetViews: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  participantsCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  completedCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  requirements: z.union([ z.lazy(() => RewardPoolUpdaterequirementsInputSchema),z.string().array() ]).optional(),
}).strict();

export const KOLToProjectUpdateWithoutProjectInputSchema: z.ZodType<Prisma.KOLToProjectUpdateWithoutProjectInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  totalPosts: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  totalViews: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
  totalInteractions: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
  totalComments: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
  qualityScore: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  proofOfWork: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  mindoMetric: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  fetchedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  kol: z.lazy(() => KOLUpdateOneRequiredWithoutProjectsNestedInputSchema).optional()
}).strict();

export const KOLToProjectUncheckedUpdateWithoutProjectInputSchema: z.ZodType<Prisma.KOLToProjectUncheckedUpdateWithoutProjectInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  kolId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  totalPosts: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  totalViews: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
  totalInteractions: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
  totalComments: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
  qualityScore: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  proofOfWork: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  mindoMetric: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  fetchedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const KOLToProjectUncheckedUpdateManyWithoutProjectInputSchema: z.ZodType<Prisma.KOLToProjectUncheckedUpdateManyWithoutProjectInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  kolId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  totalPosts: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  totalViews: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
  totalInteractions: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
  totalComments: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
  qualityScore: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  proofOfWork: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  mindoMetric: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  fetchedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const KOLToProjectCreateManyKolInputSchema: z.ZodType<Prisma.KOLToProjectCreateManyKolInput> = z.object({
  id: z.string().cuid().optional(),
  projectId: z.string(),
  totalPosts: z.number().int(),
  totalViews: z.bigint(),
  totalInteractions: z.bigint(),
  totalComments: z.bigint(),
  qualityScore: z.number().optional().nullable(),
  proofOfWork: z.number().optional().nullable(),
  mindoMetric: z.number().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  fetchedAt: z.coerce.date().optional()
}).strict();

export const KOLSnapshotCreateManyKolInputSchema: z.ZodType<Prisma.KOLSnapshotCreateManyKolInput> = z.object({
  id: z.string().cuid().optional(),
  kolScore: z.number(),
  smartFollowersCount: z.number().int(),
  threadsCount: z.number().int(),
  engagementRate: z.number(),
  smartEngagement: z.number(),
  avgViews: z.number().int().optional().nullable(),
  avgLikes: z.number().int().optional().nullable(),
  totalPosts: z.number().int(),
  totalViews: z.bigint(),
  totalInteractions: z.bigint(),
  totalOrganicPosts: z.number().int(),
  totalOrganicViews: z.bigint(),
  totalOrganicInteractions: z.bigint(),
  totalAccountPosts: z.number().int(),
  totalAccountViews: z.bigint(),
  totalAccountInteractions: z.bigint(),
  totalAccountComments: z.number().int(),
  totalAccountLikes: z.number().int(),
  totalAccountRetweets: z.number().int(),
  totalAccountReplies: z.number().int(),
  totalPostsChange: z.number(),
  totalInteractionsChange: z.number(),
  totalViewsChange: z.number(),
  followersChange: z.number(),
  smartEngagementChange: z.number(),
  fetchedDate: z.string()
}).strict();

export const KOLToProjectUpdateWithoutKolInputSchema: z.ZodType<Prisma.KOLToProjectUpdateWithoutKolInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  totalPosts: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  totalViews: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
  totalInteractions: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
  totalComments: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
  qualityScore: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  proofOfWork: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  mindoMetric: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  fetchedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  project: z.lazy(() => ProjectUpdateOneRequiredWithoutKolsNestedInputSchema).optional()
}).strict();

export const KOLToProjectUncheckedUpdateWithoutKolInputSchema: z.ZodType<Prisma.KOLToProjectUncheckedUpdateWithoutKolInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  projectId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  totalPosts: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  totalViews: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
  totalInteractions: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
  totalComments: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
  qualityScore: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  proofOfWork: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  mindoMetric: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  fetchedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const KOLToProjectUncheckedUpdateManyWithoutKolInputSchema: z.ZodType<Prisma.KOLToProjectUncheckedUpdateManyWithoutKolInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  projectId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  totalPosts: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  totalViews: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
  totalInteractions: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
  totalComments: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
  qualityScore: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  proofOfWork: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  mindoMetric: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  fetchedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const KOLSnapshotUpdateWithoutKolInputSchema: z.ZodType<Prisma.KOLSnapshotUpdateWithoutKolInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  kolScore: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  smartFollowersCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  threadsCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  engagementRate: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  smartEngagement: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  avgViews: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  avgLikes: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  totalPosts: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  totalViews: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
  totalInteractions: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
  totalOrganicPosts: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  totalOrganicViews: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
  totalOrganicInteractions: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
  totalAccountPosts: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  totalAccountViews: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
  totalAccountInteractions: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
  totalAccountComments: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  totalAccountLikes: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  totalAccountRetweets: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  totalAccountReplies: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  totalPostsChange: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  totalInteractionsChange: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  totalViewsChange: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  followersChange: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  smartEngagementChange: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  fetchedDate: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const KOLSnapshotUncheckedUpdateWithoutKolInputSchema: z.ZodType<Prisma.KOLSnapshotUncheckedUpdateWithoutKolInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  kolScore: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  smartFollowersCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  threadsCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  engagementRate: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  smartEngagement: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  avgViews: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  avgLikes: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  totalPosts: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  totalViews: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
  totalInteractions: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
  totalOrganicPosts: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  totalOrganicViews: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
  totalOrganicInteractions: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
  totalAccountPosts: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  totalAccountViews: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
  totalAccountInteractions: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
  totalAccountComments: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  totalAccountLikes: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  totalAccountRetweets: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  totalAccountReplies: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  totalPostsChange: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  totalInteractionsChange: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  totalViewsChange: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  followersChange: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  smartEngagementChange: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  fetchedDate: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const KOLSnapshotUncheckedUpdateManyWithoutKolInputSchema: z.ZodType<Prisma.KOLSnapshotUncheckedUpdateManyWithoutKolInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  kolScore: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  smartFollowersCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  threadsCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  engagementRate: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  smartEngagement: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  avgViews: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  avgLikes: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  totalPosts: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  totalViews: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
  totalInteractions: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
  totalOrganicPosts: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  totalOrganicViews: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
  totalOrganicInteractions: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
  totalAccountPosts: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  totalAccountViews: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
  totalAccountInteractions: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
  totalAccountComments: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  totalAccountLikes: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  totalAccountRetweets: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  totalAccountReplies: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  totalPostsChange: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  totalInteractionsChange: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  totalViewsChange: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  followersChange: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  smartEngagementChange: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  fetchedDate: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const AdminUserFindFirstArgsSchema: z.ZodType<Prisma.AdminUserFindFirstArgs> = z.object({
  select: AdminUserSelectSchema.optional(),
  where: AdminUserWhereInputSchema.optional(),
  orderBy: z.union([ AdminUserOrderByWithRelationInputSchema.array(),AdminUserOrderByWithRelationInputSchema ]).optional(),
  cursor: AdminUserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AdminUserScalarFieldEnumSchema,AdminUserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const AdminUserFindFirstOrThrowArgsSchema: z.ZodType<Prisma.AdminUserFindFirstOrThrowArgs> = z.object({
  select: AdminUserSelectSchema.optional(),
  where: AdminUserWhereInputSchema.optional(),
  orderBy: z.union([ AdminUserOrderByWithRelationInputSchema.array(),AdminUserOrderByWithRelationInputSchema ]).optional(),
  cursor: AdminUserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AdminUserScalarFieldEnumSchema,AdminUserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const AdminUserFindManyArgsSchema: z.ZodType<Prisma.AdminUserFindManyArgs> = z.object({
  select: AdminUserSelectSchema.optional(),
  where: AdminUserWhereInputSchema.optional(),
  orderBy: z.union([ AdminUserOrderByWithRelationInputSchema.array(),AdminUserOrderByWithRelationInputSchema ]).optional(),
  cursor: AdminUserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AdminUserScalarFieldEnumSchema,AdminUserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const AdminUserAggregateArgsSchema: z.ZodType<Prisma.AdminUserAggregateArgs> = z.object({
  where: AdminUserWhereInputSchema.optional(),
  orderBy: z.union([ AdminUserOrderByWithRelationInputSchema.array(),AdminUserOrderByWithRelationInputSchema ]).optional(),
  cursor: AdminUserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const AdminUserGroupByArgsSchema: z.ZodType<Prisma.AdminUserGroupByArgs> = z.object({
  where: AdminUserWhereInputSchema.optional(),
  orderBy: z.union([ AdminUserOrderByWithAggregationInputSchema.array(),AdminUserOrderByWithAggregationInputSchema ]).optional(),
  by: AdminUserScalarFieldEnumSchema.array(),
  having: AdminUserScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const AdminUserFindUniqueArgsSchema: z.ZodType<Prisma.AdminUserFindUniqueArgs> = z.object({
  select: AdminUserSelectSchema.optional(),
  where: AdminUserWhereUniqueInputSchema,
}).strict() ;

export const AdminUserFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.AdminUserFindUniqueOrThrowArgs> = z.object({
  select: AdminUserSelectSchema.optional(),
  where: AdminUserWhereUniqueInputSchema,
}).strict() ;

export const UserFindFirstArgsSchema: z.ZodType<Prisma.UserFindFirstArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UserFindFirstOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserFindManyArgsSchema: z.ZodType<Prisma.UserFindManyArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserAggregateArgsSchema: z.ZodType<Prisma.UserAggregateArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserGroupByArgsSchema: z.ZodType<Prisma.UserGroupByArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithAggregationInputSchema.array(),UserOrderByWithAggregationInputSchema ]).optional(),
  by: UserScalarFieldEnumSchema.array(),
  having: UserScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserFindUniqueArgsSchema: z.ZodType<Prisma.UserFindUniqueArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UserFindUniqueOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const WalletFindFirstArgsSchema: z.ZodType<Prisma.WalletFindFirstArgs> = z.object({
  select: WalletSelectSchema.optional(),
  include: WalletIncludeSchema.optional(),
  where: WalletWhereInputSchema.optional(),
  orderBy: z.union([ WalletOrderByWithRelationInputSchema.array(),WalletOrderByWithRelationInputSchema ]).optional(),
  cursor: WalletWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ WalletScalarFieldEnumSchema,WalletScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const WalletFindFirstOrThrowArgsSchema: z.ZodType<Prisma.WalletFindFirstOrThrowArgs> = z.object({
  select: WalletSelectSchema.optional(),
  include: WalletIncludeSchema.optional(),
  where: WalletWhereInputSchema.optional(),
  orderBy: z.union([ WalletOrderByWithRelationInputSchema.array(),WalletOrderByWithRelationInputSchema ]).optional(),
  cursor: WalletWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ WalletScalarFieldEnumSchema,WalletScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const WalletFindManyArgsSchema: z.ZodType<Prisma.WalletFindManyArgs> = z.object({
  select: WalletSelectSchema.optional(),
  include: WalletIncludeSchema.optional(),
  where: WalletWhereInputSchema.optional(),
  orderBy: z.union([ WalletOrderByWithRelationInputSchema.array(),WalletOrderByWithRelationInputSchema ]).optional(),
  cursor: WalletWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ WalletScalarFieldEnumSchema,WalletScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const WalletAggregateArgsSchema: z.ZodType<Prisma.WalletAggregateArgs> = z.object({
  where: WalletWhereInputSchema.optional(),
  orderBy: z.union([ WalletOrderByWithRelationInputSchema.array(),WalletOrderByWithRelationInputSchema ]).optional(),
  cursor: WalletWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const WalletGroupByArgsSchema: z.ZodType<Prisma.WalletGroupByArgs> = z.object({
  where: WalletWhereInputSchema.optional(),
  orderBy: z.union([ WalletOrderByWithAggregationInputSchema.array(),WalletOrderByWithAggregationInputSchema ]).optional(),
  by: WalletScalarFieldEnumSchema.array(),
  having: WalletScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const WalletFindUniqueArgsSchema: z.ZodType<Prisma.WalletFindUniqueArgs> = z.object({
  select: WalletSelectSchema.optional(),
  include: WalletIncludeSchema.optional(),
  where: WalletWhereUniqueInputSchema,
}).strict() ;

export const WalletFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.WalletFindUniqueOrThrowArgs> = z.object({
  select: WalletSelectSchema.optional(),
  include: WalletIncludeSchema.optional(),
  where: WalletWhereUniqueInputSchema,
}).strict() ;

export const NarrativeFindFirstArgsSchema: z.ZodType<Prisma.NarrativeFindFirstArgs> = z.object({
  select: NarrativeSelectSchema.optional(),
  include: NarrativeIncludeSchema.optional(),
  where: NarrativeWhereInputSchema.optional(),
  orderBy: z.union([ NarrativeOrderByWithRelationInputSchema.array(),NarrativeOrderByWithRelationInputSchema ]).optional(),
  cursor: NarrativeWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ NarrativeScalarFieldEnumSchema,NarrativeScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const NarrativeFindFirstOrThrowArgsSchema: z.ZodType<Prisma.NarrativeFindFirstOrThrowArgs> = z.object({
  select: NarrativeSelectSchema.optional(),
  include: NarrativeIncludeSchema.optional(),
  where: NarrativeWhereInputSchema.optional(),
  orderBy: z.union([ NarrativeOrderByWithRelationInputSchema.array(),NarrativeOrderByWithRelationInputSchema ]).optional(),
  cursor: NarrativeWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ NarrativeScalarFieldEnumSchema,NarrativeScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const NarrativeFindManyArgsSchema: z.ZodType<Prisma.NarrativeFindManyArgs> = z.object({
  select: NarrativeSelectSchema.optional(),
  include: NarrativeIncludeSchema.optional(),
  where: NarrativeWhereInputSchema.optional(),
  orderBy: z.union([ NarrativeOrderByWithRelationInputSchema.array(),NarrativeOrderByWithRelationInputSchema ]).optional(),
  cursor: NarrativeWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ NarrativeScalarFieldEnumSchema,NarrativeScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const NarrativeAggregateArgsSchema: z.ZodType<Prisma.NarrativeAggregateArgs> = z.object({
  where: NarrativeWhereInputSchema.optional(),
  orderBy: z.union([ NarrativeOrderByWithRelationInputSchema.array(),NarrativeOrderByWithRelationInputSchema ]).optional(),
  cursor: NarrativeWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const NarrativeGroupByArgsSchema: z.ZodType<Prisma.NarrativeGroupByArgs> = z.object({
  where: NarrativeWhereInputSchema.optional(),
  orderBy: z.union([ NarrativeOrderByWithAggregationInputSchema.array(),NarrativeOrderByWithAggregationInputSchema ]).optional(),
  by: NarrativeScalarFieldEnumSchema.array(),
  having: NarrativeScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const NarrativeFindUniqueArgsSchema: z.ZodType<Prisma.NarrativeFindUniqueArgs> = z.object({
  select: NarrativeSelectSchema.optional(),
  include: NarrativeIncludeSchema.optional(),
  where: NarrativeWhereUniqueInputSchema,
}).strict() ;

export const NarrativeFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.NarrativeFindUniqueOrThrowArgs> = z.object({
  select: NarrativeSelectSchema.optional(),
  include: NarrativeIncludeSchema.optional(),
  where: NarrativeWhereUniqueInputSchema,
}).strict() ;

export const NarrativeSnapshotFindFirstArgsSchema: z.ZodType<Prisma.NarrativeSnapshotFindFirstArgs> = z.object({
  select: NarrativeSnapshotSelectSchema.optional(),
  include: NarrativeSnapshotIncludeSchema.optional(),
  where: NarrativeSnapshotWhereInputSchema.optional(),
  orderBy: z.union([ NarrativeSnapshotOrderByWithRelationInputSchema.array(),NarrativeSnapshotOrderByWithRelationInputSchema ]).optional(),
  cursor: NarrativeSnapshotWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ NarrativeSnapshotScalarFieldEnumSchema,NarrativeSnapshotScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const NarrativeSnapshotFindFirstOrThrowArgsSchema: z.ZodType<Prisma.NarrativeSnapshotFindFirstOrThrowArgs> = z.object({
  select: NarrativeSnapshotSelectSchema.optional(),
  include: NarrativeSnapshotIncludeSchema.optional(),
  where: NarrativeSnapshotWhereInputSchema.optional(),
  orderBy: z.union([ NarrativeSnapshotOrderByWithRelationInputSchema.array(),NarrativeSnapshotOrderByWithRelationInputSchema ]).optional(),
  cursor: NarrativeSnapshotWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ NarrativeSnapshotScalarFieldEnumSchema,NarrativeSnapshotScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const NarrativeSnapshotFindManyArgsSchema: z.ZodType<Prisma.NarrativeSnapshotFindManyArgs> = z.object({
  select: NarrativeSnapshotSelectSchema.optional(),
  include: NarrativeSnapshotIncludeSchema.optional(),
  where: NarrativeSnapshotWhereInputSchema.optional(),
  orderBy: z.union([ NarrativeSnapshotOrderByWithRelationInputSchema.array(),NarrativeSnapshotOrderByWithRelationInputSchema ]).optional(),
  cursor: NarrativeSnapshotWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ NarrativeSnapshotScalarFieldEnumSchema,NarrativeSnapshotScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const NarrativeSnapshotAggregateArgsSchema: z.ZodType<Prisma.NarrativeSnapshotAggregateArgs> = z.object({
  where: NarrativeSnapshotWhereInputSchema.optional(),
  orderBy: z.union([ NarrativeSnapshotOrderByWithRelationInputSchema.array(),NarrativeSnapshotOrderByWithRelationInputSchema ]).optional(),
  cursor: NarrativeSnapshotWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const NarrativeSnapshotGroupByArgsSchema: z.ZodType<Prisma.NarrativeSnapshotGroupByArgs> = z.object({
  where: NarrativeSnapshotWhereInputSchema.optional(),
  orderBy: z.union([ NarrativeSnapshotOrderByWithAggregationInputSchema.array(),NarrativeSnapshotOrderByWithAggregationInputSchema ]).optional(),
  by: NarrativeSnapshotScalarFieldEnumSchema.array(),
  having: NarrativeSnapshotScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const NarrativeSnapshotFindUniqueArgsSchema: z.ZodType<Prisma.NarrativeSnapshotFindUniqueArgs> = z.object({
  select: NarrativeSnapshotSelectSchema.optional(),
  include: NarrativeSnapshotIncludeSchema.optional(),
  where: NarrativeSnapshotWhereUniqueInputSchema,
}).strict() ;

export const NarrativeSnapshotFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.NarrativeSnapshotFindUniqueOrThrowArgs> = z.object({
  select: NarrativeSnapshotSelectSchema.optional(),
  include: NarrativeSnapshotIncludeSchema.optional(),
  where: NarrativeSnapshotWhereUniqueInputSchema,
}).strict() ;

export const ProjectFindFirstArgsSchema: z.ZodType<Prisma.ProjectFindFirstArgs> = z.object({
  select: ProjectSelectSchema.optional(),
  include: ProjectIncludeSchema.optional(),
  where: ProjectWhereInputSchema.optional(),
  orderBy: z.union([ ProjectOrderByWithRelationInputSchema.array(),ProjectOrderByWithRelationInputSchema ]).optional(),
  cursor: ProjectWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ProjectScalarFieldEnumSchema,ProjectScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ProjectFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ProjectFindFirstOrThrowArgs> = z.object({
  select: ProjectSelectSchema.optional(),
  include: ProjectIncludeSchema.optional(),
  where: ProjectWhereInputSchema.optional(),
  orderBy: z.union([ ProjectOrderByWithRelationInputSchema.array(),ProjectOrderByWithRelationInputSchema ]).optional(),
  cursor: ProjectWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ProjectScalarFieldEnumSchema,ProjectScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ProjectFindManyArgsSchema: z.ZodType<Prisma.ProjectFindManyArgs> = z.object({
  select: ProjectSelectSchema.optional(),
  include: ProjectIncludeSchema.optional(),
  where: ProjectWhereInputSchema.optional(),
  orderBy: z.union([ ProjectOrderByWithRelationInputSchema.array(),ProjectOrderByWithRelationInputSchema ]).optional(),
  cursor: ProjectWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ProjectScalarFieldEnumSchema,ProjectScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ProjectAggregateArgsSchema: z.ZodType<Prisma.ProjectAggregateArgs> = z.object({
  where: ProjectWhereInputSchema.optional(),
  orderBy: z.union([ ProjectOrderByWithRelationInputSchema.array(),ProjectOrderByWithRelationInputSchema ]).optional(),
  cursor: ProjectWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ProjectGroupByArgsSchema: z.ZodType<Prisma.ProjectGroupByArgs> = z.object({
  where: ProjectWhereInputSchema.optional(),
  orderBy: z.union([ ProjectOrderByWithAggregationInputSchema.array(),ProjectOrderByWithAggregationInputSchema ]).optional(),
  by: ProjectScalarFieldEnumSchema.array(),
  having: ProjectScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ProjectFindUniqueArgsSchema: z.ZodType<Prisma.ProjectFindUniqueArgs> = z.object({
  select: ProjectSelectSchema.optional(),
  include: ProjectIncludeSchema.optional(),
  where: ProjectWhereUniqueInputSchema,
}).strict() ;

export const ProjectFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ProjectFindUniqueOrThrowArgs> = z.object({
  select: ProjectSelectSchema.optional(),
  include: ProjectIncludeSchema.optional(),
  where: ProjectWhereUniqueInputSchema,
}).strict() ;

export const ProjectSnapshotFindFirstArgsSchema: z.ZodType<Prisma.ProjectSnapshotFindFirstArgs> = z.object({
  select: ProjectSnapshotSelectSchema.optional(),
  include: ProjectSnapshotIncludeSchema.optional(),
  where: ProjectSnapshotWhereInputSchema.optional(),
  orderBy: z.union([ ProjectSnapshotOrderByWithRelationInputSchema.array(),ProjectSnapshotOrderByWithRelationInputSchema ]).optional(),
  cursor: ProjectSnapshotWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ProjectSnapshotScalarFieldEnumSchema,ProjectSnapshotScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ProjectSnapshotFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ProjectSnapshotFindFirstOrThrowArgs> = z.object({
  select: ProjectSnapshotSelectSchema.optional(),
  include: ProjectSnapshotIncludeSchema.optional(),
  where: ProjectSnapshotWhereInputSchema.optional(),
  orderBy: z.union([ ProjectSnapshotOrderByWithRelationInputSchema.array(),ProjectSnapshotOrderByWithRelationInputSchema ]).optional(),
  cursor: ProjectSnapshotWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ProjectSnapshotScalarFieldEnumSchema,ProjectSnapshotScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ProjectSnapshotFindManyArgsSchema: z.ZodType<Prisma.ProjectSnapshotFindManyArgs> = z.object({
  select: ProjectSnapshotSelectSchema.optional(),
  include: ProjectSnapshotIncludeSchema.optional(),
  where: ProjectSnapshotWhereInputSchema.optional(),
  orderBy: z.union([ ProjectSnapshotOrderByWithRelationInputSchema.array(),ProjectSnapshotOrderByWithRelationInputSchema ]).optional(),
  cursor: ProjectSnapshotWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ProjectSnapshotScalarFieldEnumSchema,ProjectSnapshotScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ProjectSnapshotAggregateArgsSchema: z.ZodType<Prisma.ProjectSnapshotAggregateArgs> = z.object({
  where: ProjectSnapshotWhereInputSchema.optional(),
  orderBy: z.union([ ProjectSnapshotOrderByWithRelationInputSchema.array(),ProjectSnapshotOrderByWithRelationInputSchema ]).optional(),
  cursor: ProjectSnapshotWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ProjectSnapshotGroupByArgsSchema: z.ZodType<Prisma.ProjectSnapshotGroupByArgs> = z.object({
  where: ProjectSnapshotWhereInputSchema.optional(),
  orderBy: z.union([ ProjectSnapshotOrderByWithAggregationInputSchema.array(),ProjectSnapshotOrderByWithAggregationInputSchema ]).optional(),
  by: ProjectSnapshotScalarFieldEnumSchema.array(),
  having: ProjectSnapshotScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ProjectSnapshotFindUniqueArgsSchema: z.ZodType<Prisma.ProjectSnapshotFindUniqueArgs> = z.object({
  select: ProjectSnapshotSelectSchema.optional(),
  include: ProjectSnapshotIncludeSchema.optional(),
  where: ProjectSnapshotWhereUniqueInputSchema,
}).strict() ;

export const ProjectSnapshotFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ProjectSnapshotFindUniqueOrThrowArgs> = z.object({
  select: ProjectSnapshotSelectSchema.optional(),
  include: ProjectSnapshotIncludeSchema.optional(),
  where: ProjectSnapshotWhereUniqueInputSchema,
}).strict() ;

export const ProjectToNarrativeFindFirstArgsSchema: z.ZodType<Prisma.ProjectToNarrativeFindFirstArgs> = z.object({
  select: ProjectToNarrativeSelectSchema.optional(),
  include: ProjectToNarrativeIncludeSchema.optional(),
  where: ProjectToNarrativeWhereInputSchema.optional(),
  orderBy: z.union([ ProjectToNarrativeOrderByWithRelationInputSchema.array(),ProjectToNarrativeOrderByWithRelationInputSchema ]).optional(),
  cursor: ProjectToNarrativeWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ProjectToNarrativeScalarFieldEnumSchema,ProjectToNarrativeScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ProjectToNarrativeFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ProjectToNarrativeFindFirstOrThrowArgs> = z.object({
  select: ProjectToNarrativeSelectSchema.optional(),
  include: ProjectToNarrativeIncludeSchema.optional(),
  where: ProjectToNarrativeWhereInputSchema.optional(),
  orderBy: z.union([ ProjectToNarrativeOrderByWithRelationInputSchema.array(),ProjectToNarrativeOrderByWithRelationInputSchema ]).optional(),
  cursor: ProjectToNarrativeWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ProjectToNarrativeScalarFieldEnumSchema,ProjectToNarrativeScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ProjectToNarrativeFindManyArgsSchema: z.ZodType<Prisma.ProjectToNarrativeFindManyArgs> = z.object({
  select: ProjectToNarrativeSelectSchema.optional(),
  include: ProjectToNarrativeIncludeSchema.optional(),
  where: ProjectToNarrativeWhereInputSchema.optional(),
  orderBy: z.union([ ProjectToNarrativeOrderByWithRelationInputSchema.array(),ProjectToNarrativeOrderByWithRelationInputSchema ]).optional(),
  cursor: ProjectToNarrativeWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ProjectToNarrativeScalarFieldEnumSchema,ProjectToNarrativeScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ProjectToNarrativeAggregateArgsSchema: z.ZodType<Prisma.ProjectToNarrativeAggregateArgs> = z.object({
  where: ProjectToNarrativeWhereInputSchema.optional(),
  orderBy: z.union([ ProjectToNarrativeOrderByWithRelationInputSchema.array(),ProjectToNarrativeOrderByWithRelationInputSchema ]).optional(),
  cursor: ProjectToNarrativeWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ProjectToNarrativeGroupByArgsSchema: z.ZodType<Prisma.ProjectToNarrativeGroupByArgs> = z.object({
  where: ProjectToNarrativeWhereInputSchema.optional(),
  orderBy: z.union([ ProjectToNarrativeOrderByWithAggregationInputSchema.array(),ProjectToNarrativeOrderByWithAggregationInputSchema ]).optional(),
  by: ProjectToNarrativeScalarFieldEnumSchema.array(),
  having: ProjectToNarrativeScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ProjectToNarrativeFindUniqueArgsSchema: z.ZodType<Prisma.ProjectToNarrativeFindUniqueArgs> = z.object({
  select: ProjectToNarrativeSelectSchema.optional(),
  include: ProjectToNarrativeIncludeSchema.optional(),
  where: ProjectToNarrativeWhereUniqueInputSchema,
}).strict() ;

export const ProjectToNarrativeFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ProjectToNarrativeFindUniqueOrThrowArgs> = z.object({
  select: ProjectToNarrativeSelectSchema.optional(),
  include: ProjectToNarrativeIncludeSchema.optional(),
  where: ProjectToNarrativeWhereUniqueInputSchema,
}).strict() ;

export const KOLFindFirstArgsSchema: z.ZodType<Prisma.KOLFindFirstArgs> = z.object({
  select: KOLSelectSchema.optional(),
  include: KOLIncludeSchema.optional(),
  where: KOLWhereInputSchema.optional(),
  orderBy: z.union([ KOLOrderByWithRelationInputSchema.array(),KOLOrderByWithRelationInputSchema ]).optional(),
  cursor: KOLWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ KOLScalarFieldEnumSchema,KOLScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const KOLFindFirstOrThrowArgsSchema: z.ZodType<Prisma.KOLFindFirstOrThrowArgs> = z.object({
  select: KOLSelectSchema.optional(),
  include: KOLIncludeSchema.optional(),
  where: KOLWhereInputSchema.optional(),
  orderBy: z.union([ KOLOrderByWithRelationInputSchema.array(),KOLOrderByWithRelationInputSchema ]).optional(),
  cursor: KOLWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ KOLScalarFieldEnumSchema,KOLScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const KOLFindManyArgsSchema: z.ZodType<Prisma.KOLFindManyArgs> = z.object({
  select: KOLSelectSchema.optional(),
  include: KOLIncludeSchema.optional(),
  where: KOLWhereInputSchema.optional(),
  orderBy: z.union([ KOLOrderByWithRelationInputSchema.array(),KOLOrderByWithRelationInputSchema ]).optional(),
  cursor: KOLWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ KOLScalarFieldEnumSchema,KOLScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const KOLAggregateArgsSchema: z.ZodType<Prisma.KOLAggregateArgs> = z.object({
  where: KOLWhereInputSchema.optional(),
  orderBy: z.union([ KOLOrderByWithRelationInputSchema.array(),KOLOrderByWithRelationInputSchema ]).optional(),
  cursor: KOLWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const KOLGroupByArgsSchema: z.ZodType<Prisma.KOLGroupByArgs> = z.object({
  where: KOLWhereInputSchema.optional(),
  orderBy: z.union([ KOLOrderByWithAggregationInputSchema.array(),KOLOrderByWithAggregationInputSchema ]).optional(),
  by: KOLScalarFieldEnumSchema.array(),
  having: KOLScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const KOLFindUniqueArgsSchema: z.ZodType<Prisma.KOLFindUniqueArgs> = z.object({
  select: KOLSelectSchema.optional(),
  include: KOLIncludeSchema.optional(),
  where: KOLWhereUniqueInputSchema,
}).strict() ;

export const KOLFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.KOLFindUniqueOrThrowArgs> = z.object({
  select: KOLSelectSchema.optional(),
  include: KOLIncludeSchema.optional(),
  where: KOLWhereUniqueInputSchema,
}).strict() ;

export const KOLSnapshotFindFirstArgsSchema: z.ZodType<Prisma.KOLSnapshotFindFirstArgs> = z.object({
  select: KOLSnapshotSelectSchema.optional(),
  include: KOLSnapshotIncludeSchema.optional(),
  where: KOLSnapshotWhereInputSchema.optional(),
  orderBy: z.union([ KOLSnapshotOrderByWithRelationInputSchema.array(),KOLSnapshotOrderByWithRelationInputSchema ]).optional(),
  cursor: KOLSnapshotWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ KOLSnapshotScalarFieldEnumSchema,KOLSnapshotScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const KOLSnapshotFindFirstOrThrowArgsSchema: z.ZodType<Prisma.KOLSnapshotFindFirstOrThrowArgs> = z.object({
  select: KOLSnapshotSelectSchema.optional(),
  include: KOLSnapshotIncludeSchema.optional(),
  where: KOLSnapshotWhereInputSchema.optional(),
  orderBy: z.union([ KOLSnapshotOrderByWithRelationInputSchema.array(),KOLSnapshotOrderByWithRelationInputSchema ]).optional(),
  cursor: KOLSnapshotWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ KOLSnapshotScalarFieldEnumSchema,KOLSnapshotScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const KOLSnapshotFindManyArgsSchema: z.ZodType<Prisma.KOLSnapshotFindManyArgs> = z.object({
  select: KOLSnapshotSelectSchema.optional(),
  include: KOLSnapshotIncludeSchema.optional(),
  where: KOLSnapshotWhereInputSchema.optional(),
  orderBy: z.union([ KOLSnapshotOrderByWithRelationInputSchema.array(),KOLSnapshotOrderByWithRelationInputSchema ]).optional(),
  cursor: KOLSnapshotWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ KOLSnapshotScalarFieldEnumSchema,KOLSnapshotScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const KOLSnapshotAggregateArgsSchema: z.ZodType<Prisma.KOLSnapshotAggregateArgs> = z.object({
  where: KOLSnapshotWhereInputSchema.optional(),
  orderBy: z.union([ KOLSnapshotOrderByWithRelationInputSchema.array(),KOLSnapshotOrderByWithRelationInputSchema ]).optional(),
  cursor: KOLSnapshotWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const KOLSnapshotGroupByArgsSchema: z.ZodType<Prisma.KOLSnapshotGroupByArgs> = z.object({
  where: KOLSnapshotWhereInputSchema.optional(),
  orderBy: z.union([ KOLSnapshotOrderByWithAggregationInputSchema.array(),KOLSnapshotOrderByWithAggregationInputSchema ]).optional(),
  by: KOLSnapshotScalarFieldEnumSchema.array(),
  having: KOLSnapshotScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const KOLSnapshotFindUniqueArgsSchema: z.ZodType<Prisma.KOLSnapshotFindUniqueArgs> = z.object({
  select: KOLSnapshotSelectSchema.optional(),
  include: KOLSnapshotIncludeSchema.optional(),
  where: KOLSnapshotWhereUniqueInputSchema,
}).strict() ;

export const KOLSnapshotFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.KOLSnapshotFindUniqueOrThrowArgs> = z.object({
  select: KOLSnapshotSelectSchema.optional(),
  include: KOLSnapshotIncludeSchema.optional(),
  where: KOLSnapshotWhereUniqueInputSchema,
}).strict() ;

export const KOLToProjectFindFirstArgsSchema: z.ZodType<Prisma.KOLToProjectFindFirstArgs> = z.object({
  select: KOLToProjectSelectSchema.optional(),
  include: KOLToProjectIncludeSchema.optional(),
  where: KOLToProjectWhereInputSchema.optional(),
  orderBy: z.union([ KOLToProjectOrderByWithRelationInputSchema.array(),KOLToProjectOrderByWithRelationInputSchema ]).optional(),
  cursor: KOLToProjectWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ KOLToProjectScalarFieldEnumSchema,KOLToProjectScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const KOLToProjectFindFirstOrThrowArgsSchema: z.ZodType<Prisma.KOLToProjectFindFirstOrThrowArgs> = z.object({
  select: KOLToProjectSelectSchema.optional(),
  include: KOLToProjectIncludeSchema.optional(),
  where: KOLToProjectWhereInputSchema.optional(),
  orderBy: z.union([ KOLToProjectOrderByWithRelationInputSchema.array(),KOLToProjectOrderByWithRelationInputSchema ]).optional(),
  cursor: KOLToProjectWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ KOLToProjectScalarFieldEnumSchema,KOLToProjectScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const KOLToProjectFindManyArgsSchema: z.ZodType<Prisma.KOLToProjectFindManyArgs> = z.object({
  select: KOLToProjectSelectSchema.optional(),
  include: KOLToProjectIncludeSchema.optional(),
  where: KOLToProjectWhereInputSchema.optional(),
  orderBy: z.union([ KOLToProjectOrderByWithRelationInputSchema.array(),KOLToProjectOrderByWithRelationInputSchema ]).optional(),
  cursor: KOLToProjectWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ KOLToProjectScalarFieldEnumSchema,KOLToProjectScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const KOLToProjectAggregateArgsSchema: z.ZodType<Prisma.KOLToProjectAggregateArgs> = z.object({
  where: KOLToProjectWhereInputSchema.optional(),
  orderBy: z.union([ KOLToProjectOrderByWithRelationInputSchema.array(),KOLToProjectOrderByWithRelationInputSchema ]).optional(),
  cursor: KOLToProjectWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const KOLToProjectGroupByArgsSchema: z.ZodType<Prisma.KOLToProjectGroupByArgs> = z.object({
  where: KOLToProjectWhereInputSchema.optional(),
  orderBy: z.union([ KOLToProjectOrderByWithAggregationInputSchema.array(),KOLToProjectOrderByWithAggregationInputSchema ]).optional(),
  by: KOLToProjectScalarFieldEnumSchema.array(),
  having: KOLToProjectScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const KOLToProjectFindUniqueArgsSchema: z.ZodType<Prisma.KOLToProjectFindUniqueArgs> = z.object({
  select: KOLToProjectSelectSchema.optional(),
  include: KOLToProjectIncludeSchema.optional(),
  where: KOLToProjectWhereUniqueInputSchema,
}).strict() ;

export const KOLToProjectFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.KOLToProjectFindUniqueOrThrowArgs> = z.object({
  select: KOLToProjectSelectSchema.optional(),
  include: KOLToProjectIncludeSchema.optional(),
  where: KOLToProjectWhereUniqueInputSchema,
}).strict() ;

export const RewardPoolFindFirstArgsSchema: z.ZodType<Prisma.RewardPoolFindFirstArgs> = z.object({
  select: RewardPoolSelectSchema.optional(),
  include: RewardPoolIncludeSchema.optional(),
  where: RewardPoolWhereInputSchema.optional(),
  orderBy: z.union([ RewardPoolOrderByWithRelationInputSchema.array(),RewardPoolOrderByWithRelationInputSchema ]).optional(),
  cursor: RewardPoolWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RewardPoolScalarFieldEnumSchema,RewardPoolScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const RewardPoolFindFirstOrThrowArgsSchema: z.ZodType<Prisma.RewardPoolFindFirstOrThrowArgs> = z.object({
  select: RewardPoolSelectSchema.optional(),
  include: RewardPoolIncludeSchema.optional(),
  where: RewardPoolWhereInputSchema.optional(),
  orderBy: z.union([ RewardPoolOrderByWithRelationInputSchema.array(),RewardPoolOrderByWithRelationInputSchema ]).optional(),
  cursor: RewardPoolWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RewardPoolScalarFieldEnumSchema,RewardPoolScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const RewardPoolFindManyArgsSchema: z.ZodType<Prisma.RewardPoolFindManyArgs> = z.object({
  select: RewardPoolSelectSchema.optional(),
  include: RewardPoolIncludeSchema.optional(),
  where: RewardPoolWhereInputSchema.optional(),
  orderBy: z.union([ RewardPoolOrderByWithRelationInputSchema.array(),RewardPoolOrderByWithRelationInputSchema ]).optional(),
  cursor: RewardPoolWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RewardPoolScalarFieldEnumSchema,RewardPoolScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const RewardPoolAggregateArgsSchema: z.ZodType<Prisma.RewardPoolAggregateArgs> = z.object({
  where: RewardPoolWhereInputSchema.optional(),
  orderBy: z.union([ RewardPoolOrderByWithRelationInputSchema.array(),RewardPoolOrderByWithRelationInputSchema ]).optional(),
  cursor: RewardPoolWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const RewardPoolGroupByArgsSchema: z.ZodType<Prisma.RewardPoolGroupByArgs> = z.object({
  where: RewardPoolWhereInputSchema.optional(),
  orderBy: z.union([ RewardPoolOrderByWithAggregationInputSchema.array(),RewardPoolOrderByWithAggregationInputSchema ]).optional(),
  by: RewardPoolScalarFieldEnumSchema.array(),
  having: RewardPoolScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const RewardPoolFindUniqueArgsSchema: z.ZodType<Prisma.RewardPoolFindUniqueArgs> = z.object({
  select: RewardPoolSelectSchema.optional(),
  include: RewardPoolIncludeSchema.optional(),
  where: RewardPoolWhereUniqueInputSchema,
}).strict() ;

export const RewardPoolFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.RewardPoolFindUniqueOrThrowArgs> = z.object({
  select: RewardPoolSelectSchema.optional(),
  include: RewardPoolIncludeSchema.optional(),
  where: RewardPoolWhereUniqueInputSchema,
}).strict() ;

export const LogFindFirstArgsSchema: z.ZodType<Prisma.LogFindFirstArgs> = z.object({
  select: LogSelectSchema.optional(),
  where: LogWhereInputSchema.optional(),
  orderBy: z.union([ LogOrderByWithRelationInputSchema.array(),LogOrderByWithRelationInputSchema ]).optional(),
  cursor: LogWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ LogScalarFieldEnumSchema,LogScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const LogFindFirstOrThrowArgsSchema: z.ZodType<Prisma.LogFindFirstOrThrowArgs> = z.object({
  select: LogSelectSchema.optional(),
  where: LogWhereInputSchema.optional(),
  orderBy: z.union([ LogOrderByWithRelationInputSchema.array(),LogOrderByWithRelationInputSchema ]).optional(),
  cursor: LogWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ LogScalarFieldEnumSchema,LogScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const LogFindManyArgsSchema: z.ZodType<Prisma.LogFindManyArgs> = z.object({
  select: LogSelectSchema.optional(),
  where: LogWhereInputSchema.optional(),
  orderBy: z.union([ LogOrderByWithRelationInputSchema.array(),LogOrderByWithRelationInputSchema ]).optional(),
  cursor: LogWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ LogScalarFieldEnumSchema,LogScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const LogAggregateArgsSchema: z.ZodType<Prisma.LogAggregateArgs> = z.object({
  where: LogWhereInputSchema.optional(),
  orderBy: z.union([ LogOrderByWithRelationInputSchema.array(),LogOrderByWithRelationInputSchema ]).optional(),
  cursor: LogWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const LogGroupByArgsSchema: z.ZodType<Prisma.LogGroupByArgs> = z.object({
  where: LogWhereInputSchema.optional(),
  orderBy: z.union([ LogOrderByWithAggregationInputSchema.array(),LogOrderByWithAggregationInputSchema ]).optional(),
  by: LogScalarFieldEnumSchema.array(),
  having: LogScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const LogFindUniqueArgsSchema: z.ZodType<Prisma.LogFindUniqueArgs> = z.object({
  select: LogSelectSchema.optional(),
  where: LogWhereUniqueInputSchema,
}).strict() ;

export const LogFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.LogFindUniqueOrThrowArgs> = z.object({
  select: LogSelectSchema.optional(),
  where: LogWhereUniqueInputSchema,
}).strict() ;

export const AdminUserCreateArgsSchema: z.ZodType<Prisma.AdminUserCreateArgs> = z.object({
  select: AdminUserSelectSchema.optional(),
  data: z.union([ AdminUserCreateInputSchema,AdminUserUncheckedCreateInputSchema ]),
}).strict() ;

export const AdminUserUpsertArgsSchema: z.ZodType<Prisma.AdminUserUpsertArgs> = z.object({
  select: AdminUserSelectSchema.optional(),
  where: AdminUserWhereUniqueInputSchema,
  create: z.union([ AdminUserCreateInputSchema,AdminUserUncheckedCreateInputSchema ]),
  update: z.union([ AdminUserUpdateInputSchema,AdminUserUncheckedUpdateInputSchema ]),
}).strict() ;

export const AdminUserCreateManyArgsSchema: z.ZodType<Prisma.AdminUserCreateManyArgs> = z.object({
  data: z.union([ AdminUserCreateManyInputSchema,AdminUserCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const AdminUserCreateManyAndReturnArgsSchema: z.ZodType<Prisma.AdminUserCreateManyAndReturnArgs> = z.object({
  data: z.union([ AdminUserCreateManyInputSchema,AdminUserCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const AdminUserDeleteArgsSchema: z.ZodType<Prisma.AdminUserDeleteArgs> = z.object({
  select: AdminUserSelectSchema.optional(),
  where: AdminUserWhereUniqueInputSchema,
}).strict() ;

export const AdminUserUpdateArgsSchema: z.ZodType<Prisma.AdminUserUpdateArgs> = z.object({
  select: AdminUserSelectSchema.optional(),
  data: z.union([ AdminUserUpdateInputSchema,AdminUserUncheckedUpdateInputSchema ]),
  where: AdminUserWhereUniqueInputSchema,
}).strict() ;

export const AdminUserUpdateManyArgsSchema: z.ZodType<Prisma.AdminUserUpdateManyArgs> = z.object({
  data: z.union([ AdminUserUpdateManyMutationInputSchema,AdminUserUncheckedUpdateManyInputSchema ]),
  where: AdminUserWhereInputSchema.optional(),
}).strict() ;

export const AdminUserDeleteManyArgsSchema: z.ZodType<Prisma.AdminUserDeleteManyArgs> = z.object({
  where: AdminUserWhereInputSchema.optional(),
}).strict() ;

export const UserCreateArgsSchema: z.ZodType<Prisma.UserCreateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]).optional(),
}).strict() ;

export const UserUpsertArgsSchema: z.ZodType<Prisma.UserUpsertArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
  create: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
  update: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
}).strict() ;

export const UserCreateManyArgsSchema: z.ZodType<Prisma.UserCreateManyArgs> = z.object({
  data: z.union([ UserCreateManyInputSchema,UserCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const UserCreateManyAndReturnArgsSchema: z.ZodType<Prisma.UserCreateManyAndReturnArgs> = z.object({
  data: z.union([ UserCreateManyInputSchema,UserCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const UserDeleteArgsSchema: z.ZodType<Prisma.UserDeleteArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserUpdateArgsSchema: z.ZodType<Prisma.UserUpdateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserUpdateManyArgsSchema: z.ZodType<Prisma.UserUpdateManyArgs> = z.object({
  data: z.union([ UserUpdateManyMutationInputSchema,UserUncheckedUpdateManyInputSchema ]),
  where: UserWhereInputSchema.optional(),
}).strict() ;

export const UserDeleteManyArgsSchema: z.ZodType<Prisma.UserDeleteManyArgs> = z.object({
  where: UserWhereInputSchema.optional(),
}).strict() ;

export const WalletCreateArgsSchema: z.ZodType<Prisma.WalletCreateArgs> = z.object({
  select: WalletSelectSchema.optional(),
  include: WalletIncludeSchema.optional(),
  data: z.union([ WalletCreateInputSchema,WalletUncheckedCreateInputSchema ]),
}).strict() ;

export const WalletUpsertArgsSchema: z.ZodType<Prisma.WalletUpsertArgs> = z.object({
  select: WalletSelectSchema.optional(),
  include: WalletIncludeSchema.optional(),
  where: WalletWhereUniqueInputSchema,
  create: z.union([ WalletCreateInputSchema,WalletUncheckedCreateInputSchema ]),
  update: z.union([ WalletUpdateInputSchema,WalletUncheckedUpdateInputSchema ]),
}).strict() ;

export const WalletCreateManyArgsSchema: z.ZodType<Prisma.WalletCreateManyArgs> = z.object({
  data: z.union([ WalletCreateManyInputSchema,WalletCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const WalletCreateManyAndReturnArgsSchema: z.ZodType<Prisma.WalletCreateManyAndReturnArgs> = z.object({
  data: z.union([ WalletCreateManyInputSchema,WalletCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const WalletDeleteArgsSchema: z.ZodType<Prisma.WalletDeleteArgs> = z.object({
  select: WalletSelectSchema.optional(),
  include: WalletIncludeSchema.optional(),
  where: WalletWhereUniqueInputSchema,
}).strict() ;

export const WalletUpdateArgsSchema: z.ZodType<Prisma.WalletUpdateArgs> = z.object({
  select: WalletSelectSchema.optional(),
  include: WalletIncludeSchema.optional(),
  data: z.union([ WalletUpdateInputSchema,WalletUncheckedUpdateInputSchema ]),
  where: WalletWhereUniqueInputSchema,
}).strict() ;

export const WalletUpdateManyArgsSchema: z.ZodType<Prisma.WalletUpdateManyArgs> = z.object({
  data: z.union([ WalletUpdateManyMutationInputSchema,WalletUncheckedUpdateManyInputSchema ]),
  where: WalletWhereInputSchema.optional(),
}).strict() ;

export const WalletDeleteManyArgsSchema: z.ZodType<Prisma.WalletDeleteManyArgs> = z.object({
  where: WalletWhereInputSchema.optional(),
}).strict() ;

export const NarrativeCreateArgsSchema: z.ZodType<Prisma.NarrativeCreateArgs> = z.object({
  select: NarrativeSelectSchema.optional(),
  include: NarrativeIncludeSchema.optional(),
  data: z.union([ NarrativeCreateInputSchema,NarrativeUncheckedCreateInputSchema ]),
}).strict() ;

export const NarrativeUpsertArgsSchema: z.ZodType<Prisma.NarrativeUpsertArgs> = z.object({
  select: NarrativeSelectSchema.optional(),
  include: NarrativeIncludeSchema.optional(),
  where: NarrativeWhereUniqueInputSchema,
  create: z.union([ NarrativeCreateInputSchema,NarrativeUncheckedCreateInputSchema ]),
  update: z.union([ NarrativeUpdateInputSchema,NarrativeUncheckedUpdateInputSchema ]),
}).strict() ;

export const NarrativeCreateManyArgsSchema: z.ZodType<Prisma.NarrativeCreateManyArgs> = z.object({
  data: z.union([ NarrativeCreateManyInputSchema,NarrativeCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const NarrativeCreateManyAndReturnArgsSchema: z.ZodType<Prisma.NarrativeCreateManyAndReturnArgs> = z.object({
  data: z.union([ NarrativeCreateManyInputSchema,NarrativeCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const NarrativeDeleteArgsSchema: z.ZodType<Prisma.NarrativeDeleteArgs> = z.object({
  select: NarrativeSelectSchema.optional(),
  include: NarrativeIncludeSchema.optional(),
  where: NarrativeWhereUniqueInputSchema,
}).strict() ;

export const NarrativeUpdateArgsSchema: z.ZodType<Prisma.NarrativeUpdateArgs> = z.object({
  select: NarrativeSelectSchema.optional(),
  include: NarrativeIncludeSchema.optional(),
  data: z.union([ NarrativeUpdateInputSchema,NarrativeUncheckedUpdateInputSchema ]),
  where: NarrativeWhereUniqueInputSchema,
}).strict() ;

export const NarrativeUpdateManyArgsSchema: z.ZodType<Prisma.NarrativeUpdateManyArgs> = z.object({
  data: z.union([ NarrativeUpdateManyMutationInputSchema,NarrativeUncheckedUpdateManyInputSchema ]),
  where: NarrativeWhereInputSchema.optional(),
}).strict() ;

export const NarrativeDeleteManyArgsSchema: z.ZodType<Prisma.NarrativeDeleteManyArgs> = z.object({
  where: NarrativeWhereInputSchema.optional(),
}).strict() ;

export const NarrativeSnapshotCreateArgsSchema: z.ZodType<Prisma.NarrativeSnapshotCreateArgs> = z.object({
  select: NarrativeSnapshotSelectSchema.optional(),
  include: NarrativeSnapshotIncludeSchema.optional(),
  data: z.union([ NarrativeSnapshotCreateInputSchema,NarrativeSnapshotUncheckedCreateInputSchema ]),
}).strict() ;

export const NarrativeSnapshotUpsertArgsSchema: z.ZodType<Prisma.NarrativeSnapshotUpsertArgs> = z.object({
  select: NarrativeSnapshotSelectSchema.optional(),
  include: NarrativeSnapshotIncludeSchema.optional(),
  where: NarrativeSnapshotWhereUniqueInputSchema,
  create: z.union([ NarrativeSnapshotCreateInputSchema,NarrativeSnapshotUncheckedCreateInputSchema ]),
  update: z.union([ NarrativeSnapshotUpdateInputSchema,NarrativeSnapshotUncheckedUpdateInputSchema ]),
}).strict() ;

export const NarrativeSnapshotCreateManyArgsSchema: z.ZodType<Prisma.NarrativeSnapshotCreateManyArgs> = z.object({
  data: z.union([ NarrativeSnapshotCreateManyInputSchema,NarrativeSnapshotCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const NarrativeSnapshotCreateManyAndReturnArgsSchema: z.ZodType<Prisma.NarrativeSnapshotCreateManyAndReturnArgs> = z.object({
  data: z.union([ NarrativeSnapshotCreateManyInputSchema,NarrativeSnapshotCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const NarrativeSnapshotDeleteArgsSchema: z.ZodType<Prisma.NarrativeSnapshotDeleteArgs> = z.object({
  select: NarrativeSnapshotSelectSchema.optional(),
  include: NarrativeSnapshotIncludeSchema.optional(),
  where: NarrativeSnapshotWhereUniqueInputSchema,
}).strict() ;

export const NarrativeSnapshotUpdateArgsSchema: z.ZodType<Prisma.NarrativeSnapshotUpdateArgs> = z.object({
  select: NarrativeSnapshotSelectSchema.optional(),
  include: NarrativeSnapshotIncludeSchema.optional(),
  data: z.union([ NarrativeSnapshotUpdateInputSchema,NarrativeSnapshotUncheckedUpdateInputSchema ]),
  where: NarrativeSnapshotWhereUniqueInputSchema,
}).strict() ;

export const NarrativeSnapshotUpdateManyArgsSchema: z.ZodType<Prisma.NarrativeSnapshotUpdateManyArgs> = z.object({
  data: z.union([ NarrativeSnapshotUpdateManyMutationInputSchema,NarrativeSnapshotUncheckedUpdateManyInputSchema ]),
  where: NarrativeSnapshotWhereInputSchema.optional(),
}).strict() ;

export const NarrativeSnapshotDeleteManyArgsSchema: z.ZodType<Prisma.NarrativeSnapshotDeleteManyArgs> = z.object({
  where: NarrativeSnapshotWhereInputSchema.optional(),
}).strict() ;

export const ProjectCreateArgsSchema: z.ZodType<Prisma.ProjectCreateArgs> = z.object({
  select: ProjectSelectSchema.optional(),
  include: ProjectIncludeSchema.optional(),
  data: z.union([ ProjectCreateInputSchema,ProjectUncheckedCreateInputSchema ]),
}).strict() ;

export const ProjectUpsertArgsSchema: z.ZodType<Prisma.ProjectUpsertArgs> = z.object({
  select: ProjectSelectSchema.optional(),
  include: ProjectIncludeSchema.optional(),
  where: ProjectWhereUniqueInputSchema,
  create: z.union([ ProjectCreateInputSchema,ProjectUncheckedCreateInputSchema ]),
  update: z.union([ ProjectUpdateInputSchema,ProjectUncheckedUpdateInputSchema ]),
}).strict() ;

export const ProjectCreateManyArgsSchema: z.ZodType<Prisma.ProjectCreateManyArgs> = z.object({
  data: z.union([ ProjectCreateManyInputSchema,ProjectCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const ProjectCreateManyAndReturnArgsSchema: z.ZodType<Prisma.ProjectCreateManyAndReturnArgs> = z.object({
  data: z.union([ ProjectCreateManyInputSchema,ProjectCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const ProjectDeleteArgsSchema: z.ZodType<Prisma.ProjectDeleteArgs> = z.object({
  select: ProjectSelectSchema.optional(),
  include: ProjectIncludeSchema.optional(),
  where: ProjectWhereUniqueInputSchema,
}).strict() ;

export const ProjectUpdateArgsSchema: z.ZodType<Prisma.ProjectUpdateArgs> = z.object({
  select: ProjectSelectSchema.optional(),
  include: ProjectIncludeSchema.optional(),
  data: z.union([ ProjectUpdateInputSchema,ProjectUncheckedUpdateInputSchema ]),
  where: ProjectWhereUniqueInputSchema,
}).strict() ;

export const ProjectUpdateManyArgsSchema: z.ZodType<Prisma.ProjectUpdateManyArgs> = z.object({
  data: z.union([ ProjectUpdateManyMutationInputSchema,ProjectUncheckedUpdateManyInputSchema ]),
  where: ProjectWhereInputSchema.optional(),
}).strict() ;

export const ProjectDeleteManyArgsSchema: z.ZodType<Prisma.ProjectDeleteManyArgs> = z.object({
  where: ProjectWhereInputSchema.optional(),
}).strict() ;

export const ProjectSnapshotCreateArgsSchema: z.ZodType<Prisma.ProjectSnapshotCreateArgs> = z.object({
  select: ProjectSnapshotSelectSchema.optional(),
  include: ProjectSnapshotIncludeSchema.optional(),
  data: z.union([ ProjectSnapshotCreateInputSchema,ProjectSnapshotUncheckedCreateInputSchema ]),
}).strict() ;

export const ProjectSnapshotUpsertArgsSchema: z.ZodType<Prisma.ProjectSnapshotUpsertArgs> = z.object({
  select: ProjectSnapshotSelectSchema.optional(),
  include: ProjectSnapshotIncludeSchema.optional(),
  where: ProjectSnapshotWhereUniqueInputSchema,
  create: z.union([ ProjectSnapshotCreateInputSchema,ProjectSnapshotUncheckedCreateInputSchema ]),
  update: z.union([ ProjectSnapshotUpdateInputSchema,ProjectSnapshotUncheckedUpdateInputSchema ]),
}).strict() ;

export const ProjectSnapshotCreateManyArgsSchema: z.ZodType<Prisma.ProjectSnapshotCreateManyArgs> = z.object({
  data: z.union([ ProjectSnapshotCreateManyInputSchema,ProjectSnapshotCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const ProjectSnapshotCreateManyAndReturnArgsSchema: z.ZodType<Prisma.ProjectSnapshotCreateManyAndReturnArgs> = z.object({
  data: z.union([ ProjectSnapshotCreateManyInputSchema,ProjectSnapshotCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const ProjectSnapshotDeleteArgsSchema: z.ZodType<Prisma.ProjectSnapshotDeleteArgs> = z.object({
  select: ProjectSnapshotSelectSchema.optional(),
  include: ProjectSnapshotIncludeSchema.optional(),
  where: ProjectSnapshotWhereUniqueInputSchema,
}).strict() ;

export const ProjectSnapshotUpdateArgsSchema: z.ZodType<Prisma.ProjectSnapshotUpdateArgs> = z.object({
  select: ProjectSnapshotSelectSchema.optional(),
  include: ProjectSnapshotIncludeSchema.optional(),
  data: z.union([ ProjectSnapshotUpdateInputSchema,ProjectSnapshotUncheckedUpdateInputSchema ]),
  where: ProjectSnapshotWhereUniqueInputSchema,
}).strict() ;

export const ProjectSnapshotUpdateManyArgsSchema: z.ZodType<Prisma.ProjectSnapshotUpdateManyArgs> = z.object({
  data: z.union([ ProjectSnapshotUpdateManyMutationInputSchema,ProjectSnapshotUncheckedUpdateManyInputSchema ]),
  where: ProjectSnapshotWhereInputSchema.optional(),
}).strict() ;

export const ProjectSnapshotDeleteManyArgsSchema: z.ZodType<Prisma.ProjectSnapshotDeleteManyArgs> = z.object({
  where: ProjectSnapshotWhereInputSchema.optional(),
}).strict() ;

export const ProjectToNarrativeCreateArgsSchema: z.ZodType<Prisma.ProjectToNarrativeCreateArgs> = z.object({
  select: ProjectToNarrativeSelectSchema.optional(),
  include: ProjectToNarrativeIncludeSchema.optional(),
  data: z.union([ ProjectToNarrativeCreateInputSchema,ProjectToNarrativeUncheckedCreateInputSchema ]),
}).strict() ;

export const ProjectToNarrativeUpsertArgsSchema: z.ZodType<Prisma.ProjectToNarrativeUpsertArgs> = z.object({
  select: ProjectToNarrativeSelectSchema.optional(),
  include: ProjectToNarrativeIncludeSchema.optional(),
  where: ProjectToNarrativeWhereUniqueInputSchema,
  create: z.union([ ProjectToNarrativeCreateInputSchema,ProjectToNarrativeUncheckedCreateInputSchema ]),
  update: z.union([ ProjectToNarrativeUpdateInputSchema,ProjectToNarrativeUncheckedUpdateInputSchema ]),
}).strict() ;

export const ProjectToNarrativeCreateManyArgsSchema: z.ZodType<Prisma.ProjectToNarrativeCreateManyArgs> = z.object({
  data: z.union([ ProjectToNarrativeCreateManyInputSchema,ProjectToNarrativeCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const ProjectToNarrativeCreateManyAndReturnArgsSchema: z.ZodType<Prisma.ProjectToNarrativeCreateManyAndReturnArgs> = z.object({
  data: z.union([ ProjectToNarrativeCreateManyInputSchema,ProjectToNarrativeCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const ProjectToNarrativeDeleteArgsSchema: z.ZodType<Prisma.ProjectToNarrativeDeleteArgs> = z.object({
  select: ProjectToNarrativeSelectSchema.optional(),
  include: ProjectToNarrativeIncludeSchema.optional(),
  where: ProjectToNarrativeWhereUniqueInputSchema,
}).strict() ;

export const ProjectToNarrativeUpdateArgsSchema: z.ZodType<Prisma.ProjectToNarrativeUpdateArgs> = z.object({
  select: ProjectToNarrativeSelectSchema.optional(),
  include: ProjectToNarrativeIncludeSchema.optional(),
  data: z.union([ ProjectToNarrativeUpdateInputSchema,ProjectToNarrativeUncheckedUpdateInputSchema ]),
  where: ProjectToNarrativeWhereUniqueInputSchema,
}).strict() ;

export const ProjectToNarrativeUpdateManyArgsSchema: z.ZodType<Prisma.ProjectToNarrativeUpdateManyArgs> = z.object({
  data: z.union([ ProjectToNarrativeUpdateManyMutationInputSchema,ProjectToNarrativeUncheckedUpdateManyInputSchema ]),
  where: ProjectToNarrativeWhereInputSchema.optional(),
}).strict() ;

export const ProjectToNarrativeDeleteManyArgsSchema: z.ZodType<Prisma.ProjectToNarrativeDeleteManyArgs> = z.object({
  where: ProjectToNarrativeWhereInputSchema.optional(),
}).strict() ;

export const KOLCreateArgsSchema: z.ZodType<Prisma.KOLCreateArgs> = z.object({
  select: KOLSelectSchema.optional(),
  include: KOLIncludeSchema.optional(),
  data: z.union([ KOLCreateInputSchema,KOLUncheckedCreateInputSchema ]),
}).strict() ;

export const KOLUpsertArgsSchema: z.ZodType<Prisma.KOLUpsertArgs> = z.object({
  select: KOLSelectSchema.optional(),
  include: KOLIncludeSchema.optional(),
  where: KOLWhereUniqueInputSchema,
  create: z.union([ KOLCreateInputSchema,KOLUncheckedCreateInputSchema ]),
  update: z.union([ KOLUpdateInputSchema,KOLUncheckedUpdateInputSchema ]),
}).strict() ;

export const KOLCreateManyArgsSchema: z.ZodType<Prisma.KOLCreateManyArgs> = z.object({
  data: z.union([ KOLCreateManyInputSchema,KOLCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const KOLCreateManyAndReturnArgsSchema: z.ZodType<Prisma.KOLCreateManyAndReturnArgs> = z.object({
  data: z.union([ KOLCreateManyInputSchema,KOLCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const KOLDeleteArgsSchema: z.ZodType<Prisma.KOLDeleteArgs> = z.object({
  select: KOLSelectSchema.optional(),
  include: KOLIncludeSchema.optional(),
  where: KOLWhereUniqueInputSchema,
}).strict() ;

export const KOLUpdateArgsSchema: z.ZodType<Prisma.KOLUpdateArgs> = z.object({
  select: KOLSelectSchema.optional(),
  include: KOLIncludeSchema.optional(),
  data: z.union([ KOLUpdateInputSchema,KOLUncheckedUpdateInputSchema ]),
  where: KOLWhereUniqueInputSchema,
}).strict() ;

export const KOLUpdateManyArgsSchema: z.ZodType<Prisma.KOLUpdateManyArgs> = z.object({
  data: z.union([ KOLUpdateManyMutationInputSchema,KOLUncheckedUpdateManyInputSchema ]),
  where: KOLWhereInputSchema.optional(),
}).strict() ;

export const KOLDeleteManyArgsSchema: z.ZodType<Prisma.KOLDeleteManyArgs> = z.object({
  where: KOLWhereInputSchema.optional(),
}).strict() ;

export const KOLSnapshotCreateArgsSchema: z.ZodType<Prisma.KOLSnapshotCreateArgs> = z.object({
  select: KOLSnapshotSelectSchema.optional(),
  include: KOLSnapshotIncludeSchema.optional(),
  data: z.union([ KOLSnapshotCreateInputSchema,KOLSnapshotUncheckedCreateInputSchema ]),
}).strict() ;

export const KOLSnapshotUpsertArgsSchema: z.ZodType<Prisma.KOLSnapshotUpsertArgs> = z.object({
  select: KOLSnapshotSelectSchema.optional(),
  include: KOLSnapshotIncludeSchema.optional(),
  where: KOLSnapshotWhereUniqueInputSchema,
  create: z.union([ KOLSnapshotCreateInputSchema,KOLSnapshotUncheckedCreateInputSchema ]),
  update: z.union([ KOLSnapshotUpdateInputSchema,KOLSnapshotUncheckedUpdateInputSchema ]),
}).strict() ;

export const KOLSnapshotCreateManyArgsSchema: z.ZodType<Prisma.KOLSnapshotCreateManyArgs> = z.object({
  data: z.union([ KOLSnapshotCreateManyInputSchema,KOLSnapshotCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const KOLSnapshotCreateManyAndReturnArgsSchema: z.ZodType<Prisma.KOLSnapshotCreateManyAndReturnArgs> = z.object({
  data: z.union([ KOLSnapshotCreateManyInputSchema,KOLSnapshotCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const KOLSnapshotDeleteArgsSchema: z.ZodType<Prisma.KOLSnapshotDeleteArgs> = z.object({
  select: KOLSnapshotSelectSchema.optional(),
  include: KOLSnapshotIncludeSchema.optional(),
  where: KOLSnapshotWhereUniqueInputSchema,
}).strict() ;

export const KOLSnapshotUpdateArgsSchema: z.ZodType<Prisma.KOLSnapshotUpdateArgs> = z.object({
  select: KOLSnapshotSelectSchema.optional(),
  include: KOLSnapshotIncludeSchema.optional(),
  data: z.union([ KOLSnapshotUpdateInputSchema,KOLSnapshotUncheckedUpdateInputSchema ]),
  where: KOLSnapshotWhereUniqueInputSchema,
}).strict() ;

export const KOLSnapshotUpdateManyArgsSchema: z.ZodType<Prisma.KOLSnapshotUpdateManyArgs> = z.object({
  data: z.union([ KOLSnapshotUpdateManyMutationInputSchema,KOLSnapshotUncheckedUpdateManyInputSchema ]),
  where: KOLSnapshotWhereInputSchema.optional(),
}).strict() ;

export const KOLSnapshotDeleteManyArgsSchema: z.ZodType<Prisma.KOLSnapshotDeleteManyArgs> = z.object({
  where: KOLSnapshotWhereInputSchema.optional(),
}).strict() ;

export const KOLToProjectCreateArgsSchema: z.ZodType<Prisma.KOLToProjectCreateArgs> = z.object({
  select: KOLToProjectSelectSchema.optional(),
  include: KOLToProjectIncludeSchema.optional(),
  data: z.union([ KOLToProjectCreateInputSchema,KOLToProjectUncheckedCreateInputSchema ]),
}).strict() ;

export const KOLToProjectUpsertArgsSchema: z.ZodType<Prisma.KOLToProjectUpsertArgs> = z.object({
  select: KOLToProjectSelectSchema.optional(),
  include: KOLToProjectIncludeSchema.optional(),
  where: KOLToProjectWhereUniqueInputSchema,
  create: z.union([ KOLToProjectCreateInputSchema,KOLToProjectUncheckedCreateInputSchema ]),
  update: z.union([ KOLToProjectUpdateInputSchema,KOLToProjectUncheckedUpdateInputSchema ]),
}).strict() ;

export const KOLToProjectCreateManyArgsSchema: z.ZodType<Prisma.KOLToProjectCreateManyArgs> = z.object({
  data: z.union([ KOLToProjectCreateManyInputSchema,KOLToProjectCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const KOLToProjectCreateManyAndReturnArgsSchema: z.ZodType<Prisma.KOLToProjectCreateManyAndReturnArgs> = z.object({
  data: z.union([ KOLToProjectCreateManyInputSchema,KOLToProjectCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const KOLToProjectDeleteArgsSchema: z.ZodType<Prisma.KOLToProjectDeleteArgs> = z.object({
  select: KOLToProjectSelectSchema.optional(),
  include: KOLToProjectIncludeSchema.optional(),
  where: KOLToProjectWhereUniqueInputSchema,
}).strict() ;

export const KOLToProjectUpdateArgsSchema: z.ZodType<Prisma.KOLToProjectUpdateArgs> = z.object({
  select: KOLToProjectSelectSchema.optional(),
  include: KOLToProjectIncludeSchema.optional(),
  data: z.union([ KOLToProjectUpdateInputSchema,KOLToProjectUncheckedUpdateInputSchema ]),
  where: KOLToProjectWhereUniqueInputSchema,
}).strict() ;

export const KOLToProjectUpdateManyArgsSchema: z.ZodType<Prisma.KOLToProjectUpdateManyArgs> = z.object({
  data: z.union([ KOLToProjectUpdateManyMutationInputSchema,KOLToProjectUncheckedUpdateManyInputSchema ]),
  where: KOLToProjectWhereInputSchema.optional(),
}).strict() ;

export const KOLToProjectDeleteManyArgsSchema: z.ZodType<Prisma.KOLToProjectDeleteManyArgs> = z.object({
  where: KOLToProjectWhereInputSchema.optional(),
}).strict() ;

export const RewardPoolCreateArgsSchema: z.ZodType<Prisma.RewardPoolCreateArgs> = z.object({
  select: RewardPoolSelectSchema.optional(),
  include: RewardPoolIncludeSchema.optional(),
  data: z.union([ RewardPoolCreateInputSchema,RewardPoolUncheckedCreateInputSchema ]),
}).strict() ;

export const RewardPoolUpsertArgsSchema: z.ZodType<Prisma.RewardPoolUpsertArgs> = z.object({
  select: RewardPoolSelectSchema.optional(),
  include: RewardPoolIncludeSchema.optional(),
  where: RewardPoolWhereUniqueInputSchema,
  create: z.union([ RewardPoolCreateInputSchema,RewardPoolUncheckedCreateInputSchema ]),
  update: z.union([ RewardPoolUpdateInputSchema,RewardPoolUncheckedUpdateInputSchema ]),
}).strict() ;

export const RewardPoolCreateManyArgsSchema: z.ZodType<Prisma.RewardPoolCreateManyArgs> = z.object({
  data: z.union([ RewardPoolCreateManyInputSchema,RewardPoolCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const RewardPoolCreateManyAndReturnArgsSchema: z.ZodType<Prisma.RewardPoolCreateManyAndReturnArgs> = z.object({
  data: z.union([ RewardPoolCreateManyInputSchema,RewardPoolCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const RewardPoolDeleteArgsSchema: z.ZodType<Prisma.RewardPoolDeleteArgs> = z.object({
  select: RewardPoolSelectSchema.optional(),
  include: RewardPoolIncludeSchema.optional(),
  where: RewardPoolWhereUniqueInputSchema,
}).strict() ;

export const RewardPoolUpdateArgsSchema: z.ZodType<Prisma.RewardPoolUpdateArgs> = z.object({
  select: RewardPoolSelectSchema.optional(),
  include: RewardPoolIncludeSchema.optional(),
  data: z.union([ RewardPoolUpdateInputSchema,RewardPoolUncheckedUpdateInputSchema ]),
  where: RewardPoolWhereUniqueInputSchema,
}).strict() ;

export const RewardPoolUpdateManyArgsSchema: z.ZodType<Prisma.RewardPoolUpdateManyArgs> = z.object({
  data: z.union([ RewardPoolUpdateManyMutationInputSchema,RewardPoolUncheckedUpdateManyInputSchema ]),
  where: RewardPoolWhereInputSchema.optional(),
}).strict() ;

export const RewardPoolDeleteManyArgsSchema: z.ZodType<Prisma.RewardPoolDeleteManyArgs> = z.object({
  where: RewardPoolWhereInputSchema.optional(),
}).strict() ;

export const LogCreateArgsSchema: z.ZodType<Prisma.LogCreateArgs> = z.object({
  select: LogSelectSchema.optional(),
  data: z.union([ LogCreateInputSchema,LogUncheckedCreateInputSchema ]),
}).strict() ;

export const LogUpsertArgsSchema: z.ZodType<Prisma.LogUpsertArgs> = z.object({
  select: LogSelectSchema.optional(),
  where: LogWhereUniqueInputSchema,
  create: z.union([ LogCreateInputSchema,LogUncheckedCreateInputSchema ]),
  update: z.union([ LogUpdateInputSchema,LogUncheckedUpdateInputSchema ]),
}).strict() ;

export const LogCreateManyArgsSchema: z.ZodType<Prisma.LogCreateManyArgs> = z.object({
  data: z.union([ LogCreateManyInputSchema,LogCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const LogCreateManyAndReturnArgsSchema: z.ZodType<Prisma.LogCreateManyAndReturnArgs> = z.object({
  data: z.union([ LogCreateManyInputSchema,LogCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const LogDeleteArgsSchema: z.ZodType<Prisma.LogDeleteArgs> = z.object({
  select: LogSelectSchema.optional(),
  where: LogWhereUniqueInputSchema,
}).strict() ;

export const LogUpdateArgsSchema: z.ZodType<Prisma.LogUpdateArgs> = z.object({
  select: LogSelectSchema.optional(),
  data: z.union([ LogUpdateInputSchema,LogUncheckedUpdateInputSchema ]),
  where: LogWhereUniqueInputSchema,
}).strict() ;

export const LogUpdateManyArgsSchema: z.ZodType<Prisma.LogUpdateManyArgs> = z.object({
  data: z.union([ LogUpdateManyMutationInputSchema,LogUncheckedUpdateManyInputSchema ]),
  where: LogWhereInputSchema.optional(),
}).strict() ;

export const LogDeleteManyArgsSchema: z.ZodType<Prisma.LogDeleteManyArgs> = z.object({
  where: LogWhereInputSchema.optional(),
}).strict() ;