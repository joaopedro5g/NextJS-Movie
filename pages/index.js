import React, { useState } from 'react';

import Image from 'next/image';

import Modal from '../components/Modal';

import {
  Container,
  Grid,
  Card
} from '@material-ui/core';

import {
  makeStyles
} from '@material-ui/core/styles';
const useStyles = makeStyles({
  container: {
    paddingTop: '15px',
    width: '100%',
    height: '100%'
  },
  grid: {
    width: '100%',
    height: '100%'
  },
  card: {
    width: '150px',
    height: '290px',
    background: '#1f1f1f',
    borderRadius: '10px',
    boxShadow: '1px 1px 3px 1px #888888'
  }
});

const useLoader = ({ src }) => {
  return src;
}

function Home({ data }) {
  const classes = useStyles();
  const [modal,setModal] = useState('');
  return (
    <Container className={classes.container}>
      <Modal open={!!modal} id={String(modal.split(':')[0])} />
      <Grid container justiy="center" className={classes.grid} spacing={3}>
        {
          data.results.map(movie => (
            <Grid key={movie.id} item onClick={() => setModal(`${movie.id}`)}>
              <Card className={classes.card}>
                <Image
                  loader={useLoader}
                  src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
                  width="150px"
                  height="290px"
                />
              </Card>
            </Grid>
          ))
        }
      </Grid>
    </Container>
  );
}


export async function getStaticProps() {
  const data = await fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=${process.env.TMDB_API_KEY}&language=pt-BR`).then(res => res.json());
  return {
    props: { data }
  }
}

export default Home;