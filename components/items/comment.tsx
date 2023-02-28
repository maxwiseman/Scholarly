import {
  createStyles,
  Text,
  Avatar,
  Group,
  TypographyStylesProvider,
  Paper,
} from '@mantine/core'

const useStyles = createStyles((theme) => ({
  comment: {
    padding: `${theme.spacing.lg}px ${theme.spacing.xl}px`,
  },

  body: {
    paddingLeft: 54,
    paddingTop: theme.spacing.sm,
    fontSize: theme.fontSizes.sm,
  },

  content: {
    '& > p:last-child': {
      marginBottom: 0,
    },
  },
}))

interface CommentHtmlProps {
  postedAt: string
  body: string
  author: {
    name: string
    image: string | undefined
  }
}

export function CommentHtml({ postedAt, body, author }: CommentHtmlProps) {
  const { classes } = useStyles()
  return (
    <Paper shadow={'sm'} withBorder radius='md' className={classes.comment}>
      <Group>
        <Avatar
          src={!author ? '' : author.image}
          alt={!author ? '' : author.name}
          radius='xl'
        />
        <div>
          <Text size='sm'>{!author ? 'Deleted' : author.name}</Text>
          <Text size='xs' color='dimmed'>
            {postedAt}
          </Text>
        </div>
      </Group>
      <TypographyStylesProvider className={classes.body}>
        <div
          className={classes.content}
          dangerouslySetInnerHTML={{ __html: body }}
        />
      </TypographyStylesProvider>
    </Paper>
  )
}
