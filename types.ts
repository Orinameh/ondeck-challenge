// Query data types
export type QueryVars = {
  id: number;
};
export type ProjectQueryData = {
  project: Project;
};

export type UserQueryData = {
  user: User;
};


// Schema data types
export type Project = {
  id: number;
  name: string;
  description: string;
  icon_url: string;
  users: Omit<User, "bio" | "fellowship" | "projects">[];
};

export type User = {
  id: number;
  name: string;
  bio: string;
  fellowship: "fellows" | "angels" | "writers";
  avatar_url: string;
  projects: Omit<Project, "description" | "users">[];
};


export type Feed = {
  id: number;
  name: string;
  desc: string;
  type: string;
  avatar_url: string;
  created_ts: Date;
};

// For pagination
export type Edge = {
  cursor: string;
  node: Feed;
}

export type FeedConnection = {
  edges: Edge[]
  pageInfo: PageInfo
}
export type PageInfo = {
  hasNextPage: boolean;
  endCursor: string | null;
}

