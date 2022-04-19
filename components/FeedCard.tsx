import { Feed } from 'types';
import Card from './Card';
import { Avatar, ColumnLeft, ColumnRight, Columns } from './UserCard';

type Props = {
    feed: Feed
}
export default function FeedCard({feed}: Props) {
    return (
      <Card>
        <Columns>
          <ColumnLeft>
            <Avatar src={feed.avatar_url || 'https://avatars.dicebear.com/api/avataaars/a30.svg'} loading="lazy"/>
          </ColumnLeft>
          <ColumnRight>
            <h2>{feed.name}</h2>
            <p>{feed.desc}</p>
            <h3>Type: {feed.type.toUpperCase()}</h3>
          </ColumnRight>
        </Columns>
      </Card>
    )
  }