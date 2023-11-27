import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import React, { useEffect, useState } from 'react';
import { formatDistance } from 'date-fns';
import { checkArrayLength, getValueFromLocalStorage, removeValueFromLocalStorage, setValueInLocalStorage } from '../../../helpers/common-functions';
import { getHeadlines } from '../../../actions/news';
import { useNavigate } from 'react-router-dom';

const Headline = () => {
  const [headlinesNews, setheadlinesNews] = useState([]);
  const navigate = useNavigate();

  //Get headline data on load only for logged in customer
  useEffect(() => {
    const subscribedCustomer = getValueFromLocalStorage('auth');
    const headlines = getValueFromLocalStorage('headlines');

    //Check if headlines are less than 30 minutes old
    if (headlines && headlines.expiry && new Date() < new Date(headlines.expiry)) {
      setheadlinesNews(headlines.data);
    }
    else {
      const fetchData = async () => {
        const res: any = await getHeadlines(subscribedCustomer)
          .then((res) => res)
        if (res.code == 401) {
          removeValueFromLocalStorage('auth');
          navigate('/login');
        }
        else {
          if (res.code == 200) {
            setheadlinesNews(res.data)
            //Set Headlines in local storage and get them from there for 30 minutes
            setValueInLocalStorage('headlines', {expiry: new Date(new Date().getTime() + 30 * 60000), data:res.data})
          }
          else {
            if (headlines && checkArrayLength(headlines.data)) {
              setheadlinesNews(headlines.data);
            }
          }
        }
      }
      fetchData()
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