import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import TransitionsModal from './Detail';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { formatDistance } from 'date-fns';

function News() {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const [newsData, setnewsData] = useState([]);
  const [currentNews, setcurrentNews] = useState({});

  const handleOpen = (el: any) => {
    const id = el.target.id;
    setcurrentNews(newsData[id]);
    setOpen(true)
  };

  useEffect(() => {
    const data: any = localStorage.getItem('news');
    if (data && JSON.parse(data).status == 'ok') {
      setnewsData(JSON.parse(data).articles)
    }
  }, []);

  return (
    <>
      <div>
        <div>
          <div>
            <div>
              {
                newsData.map((el: any, index: number) => {
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
                })
              }

            </div>

          </div>
        </div>
      </div>

      <TransitionsModal open={open} handleClose={handleClose} currentNews={currentNews} />
    </>
  )
}

export default React.memo(News)