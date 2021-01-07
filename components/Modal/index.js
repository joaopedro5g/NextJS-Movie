import React, { useState, useEffect, useCallback } from 'react';

import { useAnimation } from 'framer-motion';

import { Skeleton } from '@material-ui/lab';

import {
  Typography
} from '@material-ui/core';

import {
  Container,
  Poster,
  TextContainer,
  InfoContainer,
  CloseIcon
} from './style';

function Modal({ id, onClose,open }) {
  const animation = useAnimation();
  const [data,setData] = useState(null);
  function maxLine(text, maxLength = 130) {
    const textArr = text.split('');
    let textReturn = '';
    for(var i = 0; i < maxLength; i++) {
      textReturn = textReturn + textArr[i];
    }
    return textArr.length > maxLength ? textReturn + '...' : text;
  }
  const fetchData = useCallback(async () => {
    if(!open) {
      animation.start('close');
    } else {
      await animation.start('open');
      setData(null);
      const api = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.TMDB_API_KEY}&language=pt-BR&append_to_response=releases%2Cwatch%2Fproviders`).then(res => res.json())
      setData(api);
    }
  }, [id]);
  function getCertification() {
    return data.releases.countries.filter(result => result.iso_3166_1 === 'BR')[0]?.certification
  }
  const variant = {
    open: {
      bottom: '0px',
      transition: {
        ease: 'easeIn',
        duration: .3
      }
    },
    close: {
      bottom: '-350px',
      transition: {
        ease: 'easeIn',
        duration: .3
      }
    }
  }
  useEffect(() => {
    fetchData();
  }, [open]);
  useEffect(() => {
    if(open) {
      animation.start('close');
      open = false;
      setTimeout(() => open = true, 400);
      setTimeout(() => fetchData(), 700);
    }
  }, [id]);
  return (
    <Container variants={variant} animate={animation} initial="close">
      {
        (!data ?
          <Skeleton variant="rect" animation="wave" width={150} height={290} style={{
            background: "#2c2c2c",
            borderRadius: '10px'
          }} />
          : <Poster src={`https://image.tmdb.org/t/p/w342${data.poster_path}`} />
        )
      }
      <TextContainer>
        {
          (!data ?
              <>
                <Typography variant="h3">
                  <Skeleton  style={{
                    background: "#4c4c4c"
                  }} />
                </Typography>
                <Typography variant="h6">
                  <Skeleton  style={{
                    background: "#4c4c4c"
                  }} />
                </Typography>
                <Typography variant="overline" style={{
                  marginTop: '15px'
                }}>
                  <Skeleton  style={{
                    background: "#4c4c4c"
                  }} />
                </Typography>
                <Typography variant="overline">
                  <Skeleton  style={{
                    background: "#4c4c4c"
                  }} />
                </Typography>
                <Typography variant="overline">
                  <Skeleton  style={{
                    background: "#4c4c4c"
                  }} />
                </Typography>
                <Typography variant="overline">
                  <Skeleton  style={{
                    background: "#4c4c4c"
                  }} />
                </Typography>     
              </>
            :
              <>
                <Typography variant="h4" style={{
                  color: "#fff",
                  fontWeight: 'bold'
                }}> {data.title ? data.title : data.name ? data.name : data.original_name} </Typography>
                <InfoContainer certification={getCertification()}>
                  { getCertification() && <div className="age"> { getCertification() } </div> }
                  <Typography variant="subtitle2" style={{color: "#fff", marginLeft: "10px"}}>
                    { data.genres.map(genre => genre.name).join(' ') }
                  </Typography>
                </InfoContainer>
                <Typography variant="subtitle1" style={{
                  marginTop: '10px',
                  color: "#fff"
                }}>
                  { maxLine(data.overview) }
                </Typography>
              </>
          )
        }
        <CloseIcon onClick={async () => {
          await animation.start('close');
          setData(null);
        }}/>
      </TextContainer>
    </Container>
  );
}

export default Modal;