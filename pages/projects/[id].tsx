import {useRouter} from 'next/router'
import {useQuery} from '@apollo/client'

import Layout from 'components/Layout'
import ProjectCard from 'components/ProjectCard'
import { PROJECT_QUERY } from 'queries'
import { ProjectQueryData, QueryVars } from 'types'

export default function ProjectPage() {
  const {query} = useRouter()

  const {data, error, loading} = useQuery<ProjectQueryData, QueryVars>(
    PROJECT_QUERY,
    {
      skip: !query.id,
      variables: {id: Number(query.id)},
    }
  )
  const project = data?.project;

  if (!project || loading || error) {
    return null
  }

  return (
    <Layout>
      <ProjectCard project={project} />
    </Layout>
  )
}