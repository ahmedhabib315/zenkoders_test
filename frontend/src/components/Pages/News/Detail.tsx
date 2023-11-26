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
import { newsDetailStyle } from '../../../constants/constants';
import { TransitionModalProps } from '../../../constants/interfaces';

const TransitionsModal = (props: TransitionModalProps) => {
  const news = props.currentNews;
  const [summary, setsummary] = useState({ error: '', description: '' });
  const [disabled, setdisabled] = useState(false);

  const summarize = async () => {
    setdisabled(true);
    setsummary({ description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur', error: '' })
    setdisabled(false);

  }

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
                  {news.description}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {news.content}
                </Typography>
              </CardContent>
              <CardActions>
                <a href={news.url} target='_blank' rel='noopener noreferrer'><Button size="small">Visit News Page</Button></a>
                <Button size="small" disabled={disabled} onClick={summarize}>Summarize</Button>
              </CardActions>

              {summary.error && <Typography variant="body2" color="text.secondary">
                {summary.error}
              </Typography>}
              {summary.description &&
                <Fade in={summary.description ? true : false}>
                  <Typography variant="body2" color="text.secondary">
                    {summary.description}
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