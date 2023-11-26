import { Button, Toolbar, Typography } from '@mui/material';
import React, { useRef, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import { styled, alpha } from '@mui/material/styles';
import Link from '@mui/material/Link';
import { sections } from '../../constants/constants';
import { useNavigate } from 'react-router-dom';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }: any) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }: any) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

const Nav = () => {
  const [searchValue, setsearchValue]: any = useState('');
  const navigate = useNavigate();
  const inputRef = useRef(null);

  //Get Values in Search Text
  const handleOnChange = (ev: any) => {
    setsearchValue(ev.target.value);
  }

  //Set Text Search in URl for News Search and empty Text Field
  const handleOnClick = () => {
    if (searchValue) {
      navigate(`/news?q=${searchValue}`)
      setsearchValue('')
      if (inputRef.current) {
        let element: any = inputRef.current;
        if (element.querySelector('input')) {
          element.querySelector('input').value = '';
        }
      }
    }
  }


  return (
    <React.Fragment>
      <Toolbar sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="left"
          noWrap
          sx={{ flex: 1 }}
        >
          News Junk
        </Typography>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ 'aria-label': 'search' }}
            ref={inputRef}
            onChange={handleOnChange}
          />
        </Search>
        <Button disabled={searchValue ? false : true} variant="outlined" size="small" onClick={handleOnClick}>
          Search
        </Button>
      </Toolbar>
      <Toolbar
        component="nav"
        variant="dense"
        sx={{ justifyContent: 'space-between', overflowX: 'auto' }}
      >
        {sections.map((section: any) => (
          <Link
            color="inherit"
            noWrap
            key={section}
            style={{ cursor: 'pointer' }}
            variant="body2"
            onClick={() => navigate(`/news/${section != 'Home' ? section.toLowerCase() : ''}`)}
            sx={{ p: 1, flexShrink: 0 }}
          >
            {section}
          </Link>
        ))}
      </Toolbar>
    </React.Fragment>
  )
}

export default React.memo(Nav)