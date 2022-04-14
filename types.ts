export type QueryVars = {
    id: number;
};
export type ProjectQueryData = {
  project: Project;
};

export type Project = {
  id: number;
  name: string;
  description: string;
  icon_url: string;
  users: Omit<User, "bio" | "fellowship" | "projects" >[];
};

export type User = {
    id: number;
    name: string;
    bio: string;
    fellowship: "fellows" | "angels" | "writers";
    avatar_url: string;
    projects: Omit<Project, "description" | "users">[];
  }



export type UserQueryData = {
    user: User;
  }

  
  


