import Titlebar from 'components/titlebar'
import Assignment from 'components/items/assignment'
import Page from 'components/items/page'
import { useRouter } from 'next/router'
import LogIn from 'components/logIn'
import { useSession } from '@supabase/auth-helpers-react'
import useToken from 'components/lib/useToken'
import useSWR from 'swr'
import { LoadingOverlay } from '@mantine/core'
import Discussion from '@/components/items/discussion'

export default function Index() {
  const router = useRouter()
  const { token } = useToken()
  // @ts-ignore
  const fetcher = (...args) => fetch(...args).then((res) => res.json())
  const { data, error, isLoading } = useSWR(
    '/canvas/courses/' +
      router.query.className +
      '/modules/' +
      router.query.moduleName +
      '/items/' +
      router.query.itemName +
      '?access_token=' +
      token,
    fetcher
  )

  const session = useSession()
  if (!session) {
    return <LogIn />
  }

  if (isLoading) {
    return <LoadingOverlay visible />
  }

  if (data.type == 'Assignment') {
    return (
      <>
        <Titlebar
          title={data.title}
          backURL={('/class/' + router.query.className + '/module') as unknown as URL}
        />
        <Assignment content_id={data.content_id} />
      </>
    )
  } else if (data.type == 'Page') {
    return (
      <>
        <Titlebar
          title={data.title}
          backURL={('/class/' + router.query.className) as unknown as URL}
        />
        <Page page_url={data.page_url} />
      </>
    )
  } else if (data.type == 'Discussion') {
    return (
      <>
        <Titlebar
          title={data.title}
          backURL={('/class/' + router.query.className) as unknown as URL}
        />
        <Discussion content_id={data.content_id} />
      </>
    )
  }
}
