import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import React, { useEffect, useState } from 'react';
import { formatDistance } from 'date-fns';

const Headline = () => {
  const [headlinesNews, setheadlinesNews] = useState([]);

  useEffect(() => {
    const headlines = localStorage.getItem('headlines');
    if (headlines && JSON.parse(headlines).news && JSON.parse(headlines).news.articles.length > 0) {
      setheadlinesNews(JSON.parse(headlines).news.articles.slice(0, 5));
    }
  }, []);

  return (
    <List
      sx={{
        width: '100%',
        maxWidth: 360,
        bgcolor: 'background.paper',
      }}
    >
      {
        headlinesNews.map((el: any, index: number) => {
          return (<><ListItem>
            <ListItemAvatar>
              <Avatar>
                <Avatar alt={el.title} src={el.urlToImage} />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={el.title} secondary={formatDistance(new Date(), new Date(el.publishedAt))} />
          </ListItem>
            <Divider variant="inset" component="li" /></>)
        })
      }
    </List>
  )
}

export default React.memo(Headline)