import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import TransitionsModal from './Detail';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { formatDistance } from 'date-fns';
import '../../../assets/style/pages.css';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { checkArrayLength, getValueFromLocalStorage, removeValueFromLocalStorage, setValueInLocalStorage } from '../../../helpers/common-functions';
import { getNews } from '../../../actions/news';

const News = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const [newsData, setnewsData] = useState([]);
  const [currentNews, setcurrentNews] = useState({});
  const abc = useParams();
  const location = useLocation();

  // Set new Detail in currentNews and open the modal for news Detail
  const handleOpen = (el: any) => {
    const id = el.target.id;
    setcurrentNews(newsData[id]);
    setOpen(true)
  };


  //Get news data on load
  useEffect(() => {
    const subscribedCustomer = getValueFromLocalStorage('auth');

    const data = getValueFromLocalStorage('news');

    // Parse the query parameters from the location.search string
    const queryParams = new URLSearchParams(location.search);

    // Get the value of a specific query parameter (e.g., 'query')
    const queryValue = queryParams.get('q');

    const params = {
      q: queryValue || '',
      category: abc['*'] || ''
    }
    
    const fetchData = async () => {
      const res: any = await getNews(subscribedCustomer, params)
        .then((res) => res)
      if (res.code == 401) {
        removeValueFromLocalStorage('auth');
        navigate('/login');
      }
      else {
        if (res.code == 200) {
          setnewsData(res.data)
          setValueInLocalStorage('news', res.data)
        }
        else {
          if (data) {
            setnewsData(data)
          }
        }
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <div className='news'>
        {
          newsData.map((el: any, index: number) => {
            if(el.description){
            return (
              <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                  sx={{ height: 140 }}
                  image={el.urlToImage}
                  title="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {el.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {el.description}
                  </Typography>
                  {el.source && <Typography variant="body2" color="text.secondary">
                    Source: {el.source.name}
                  </Typography>}
                  {el.publishedAt && <Typography variant="body2" color="text.secondary">
                    {formatDistance(new Date(), new Date(el.publishedAt))}
                  </Typography>}
                </CardContent>
                <CardActions>
                  <Button size="small" onClick={handleOpen} id={index.toString()}>Learn More</Button>
                </CardActions>
              </Card>
            )
          }
          })
        }
      </div>

      <TransitionsModal open={open} handleClose={handleClose} currentNews={currentNews} />
    </>
  )
}

export default React.memo(News)