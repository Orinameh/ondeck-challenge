import {useRouter} from 'next/router'
import {useQuery } from '@apollo/client'

import Layout from 'components/Layout'
import UserCard from 'components/UserCard'
import { USER_QUERY } from 'queries'
import { QueryVars, UserQueryData } from 'types'





type User = {
  id: number;
  name: string;
  bio: string;
  fellowship: "fellows" | "angels" | "writers";
  avatar_url: string;
  projects: Project[];
}

type Project = {
  id: number;
  name: string;
  icon_url: string;
}

export default function UserPage() {
  const {query} = useRouter()

  const {data, error, loading} = useQuery<UserQueryData, QueryVars>(
    USER_QUERY,
    {
      skip: !query.id,
      variables: {id: Number(query.id)},
    }
  )
  const user = data?.user;

  if (!user || loading || error) {
    return null
  }

  return (
    <Layout>
      <UserCard user={user} />
    </Layout>
  )
}
