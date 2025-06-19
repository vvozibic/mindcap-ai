export interface Project {
  id: string;
  name: string;
  category: string;
  website: string;
  description: string;
  marketCap?: string;
  launchDate?: string;
}

export interface KOL {
  id: string;
  name: string;
  platform: string;
  handle: string;
  followers: string;
  expertise: string;
  bio: string;
  profileUrl?: string;
}
