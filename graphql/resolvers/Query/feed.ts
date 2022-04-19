import { ApolloError } from "@apollo/client";
import db from "graphql/db";
import { Feed } from "types";

type Args = {
  after: string;
  fellowshipType: string;
};

const generateFeedByQuery = (
  hashCursor: string | null,
  fellowshipType: string
): Promise<Feed[]> => {
  let query: string;
  switch (fellowshipType) {
    case "writers":
      query = `
            select *
            FROM (
                select id, name, bio as desc, created_ts, avatar_url, 'User' AS type
                from users
                where fellowship = 'writers'
                union all
                select id, title, body as desc, created_ts, '' as avatar_url, 'Announcement' AS type
                from announcements
                where fellowship = 'writers' or fellowship = 'all'
            )
            ${hashCursor ? " where (created_ts) < (?)" : ""}
            order by created_ts desc, id desc
            limit 5;
            `;
      break;
    case "founders":
    case "angels":
      query = `
        select *
        FROM (
          select id, name, bio as desc, created_ts, avatar_url, 'User' AS type
          from users
          where fellowship = 'founders' or fellowship = 'angels'
          union all
          select id, name, description as desc, created_ts, icon_url as avatar_url, 'Project' AS type
          from projects
          union all
          select id, title, body as desc, created_ts, '' as avatar_url, 'Announcement' AS type
          from announcements
          where fellowship != 'writers'
        )
        ${hashCursor ? " where (created_ts) < (?)" : ""}
        order by created_ts desc, id desc
        limit 5;
        `;
      break;
    default:
      query = `
            select *
            FROM (
                select id, name, bio as desc, created_ts, avatar_url, 'User' AS type
                from users
                union all
                select id, name, description as desc, created_ts, icon_url as avatar_url, 'Project' AS type
                from projects
                union all
                select id, title, body as desc, created_ts, '' as avatar_url, 'Announcement' AS type
                from announcements
            )
            ${hashCursor ? " where (created_ts) < (?)" : ""}
            order by created_ts desc, id desc
            limit 5;
            `;
      break;
  }
  return hashCursor ? db.getAll(query, [hashCursor]) : db.getAll(query);
};

export default async function feed(_root: unknown, args: Args) {
  let next: string | null = null;
  let hasMore = false;
  
  let hashCursor: string | null = null;
  
  if(args.after) {
    hashCursor = Buffer.from(args.after, "base64").toString("ascii")
  }

  let feedsArr: Feed[] = [];

  try {
    feedsArr = await generateFeedByQuery(hashCursor, args?.fellowshipType);
  } catch (error) {
    throw new Error("Bad query");
  }

  if (feedsArr.length === 5) {
    hasMore = true
    
    const last = feedsArr[feedsArr.length - 1].created_ts
    next = Buffer.from(last).toString('base64')
  }


  return {
    pageInfo: {
      endCursor: next,
      hasNextPage: hasMore,
    },
    edges: feedsArr.map((feed) => {
      const cursor = Buffer.from(
        `${feed.id}:${feed.name}:${feed.type}`
      ).toString("base64");
      return {
        node: feed,
        cursor,
      };
    }),
  };
}
