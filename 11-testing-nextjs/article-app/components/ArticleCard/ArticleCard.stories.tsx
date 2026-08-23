import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import ArticleCard from './index'

const meta: Meta<typeof ArticleCard> = {
  component: ArticleCard,
}
export default meta

type Story = StoryObj<typeof ArticleCard>

export const Default: Story = {
  args: {
    id: 'u12w3o0d',
    title: 'Healthy summer melon-carrot soup',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    author: { id: '93ksj19s', name: 'John Doe' },
  },
}

export const LongTitle: Story = {
  args: {
    ...Default.args,
    title:
      'A title long enough to wrap onto three lines in a narrow card layout',
  },
}
