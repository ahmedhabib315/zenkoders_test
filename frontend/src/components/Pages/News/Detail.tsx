import React, { useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { newsDetailStyle } from '../../../helpers/constants';
import { TransitionModalProps } from '../../../helpers/interfaces';
import { getSummary } from '../../../actions/news';
import { getValueFromLocalStorage } from '../../../helpers/common-functions';

const TransitionsModal = (props: TransitionModalProps) => {
  const news = props.currentNews;
  const [summary, setsummary] = useState({ error: '', description: '' });
  const [disabled, setdisabled] = useState(false);

  //Summarize the News for the user
  const summarize = async () => {
    setdisabled(true);

    const subscribedCustomer = getValueFromLocalStorage('auth');
    const res: any = await getSummary(subscribedCustomer, news.description)
      .then((res) => res)
    if (res.code == 401) {
      setsummary({ description: '', error: 'Some Error Occurred. Please Try Again Later' })
    }
    else {
      setsummary({ description: res.data.content, error: '' })

    }
    setdisabled(false);
  }

  //Close Detail Modal and empty summary as well
  const setOnclose = () => {
    props.handleClose();
    setsummary({ error: '', description: '' });
  }

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={props.open}
        onClose={setOnclose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={props.open}>
          <Box sx={newsDetailStyle}>
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                sx={{ height: 140 }}
                image={news.urlToImage}
                title={news.title}
                component='img'
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {news.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {news.description ? news.description : ''}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {news.content.split('[+')[0]}
                </Typography>
              </CardContent>
              <CardActions>
                <a href={news.url} target='_blank' rel='noopener noreferrer'><Button size="small">Visit News Page</Button></a>
                <Button size="small" disabled={disabled} onClick={summarize}>Summarize</Button>
              </CardActions>

              {summary.error && <Typography variant="body2" color="red">
                {summary.error}
              </Typography>}
              {summary.description &&
                <Fade in={summary.description ? true : false}>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Summary:</strong> {summary.description}
                  </Typography>
                </Fade>
              }
            </Card>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

export default React.memo(TransitionsModal);