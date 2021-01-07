import styled, { css } from 'styled-components';

import { motion } from 'framer-motion';

import {
  Close
} from '@material-ui/icons';

export const Container = styled(motion.div)`
  width: 100%;
  height: 350px;
  background: #1f1f1f;
  position: fixed;
  display: flex;
  padding: 0 40px;
  align-items:center;
  right: 0;
  left: 0;
  z-index: 10;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
`;

export const Poster = styled.img`
  width: 150px;
  height: 290px;
  border-radius: 10px;
`;

export const TextContainer = styled.div`
  margin-left: 30px;
  display: flex;
  justify-content:center;
  height: 100%;
  width: 450px;
  flex-direction: column;
`;

export const InfoContainer = styled.div`
  width: 100%;
  height: 30px;
  display: flex;
  align-items:center;
  margin-top: 3px;
  .age {
    width: 25px;
    height: 25px;
    border-radius: 5px;
    ${ props => props.certification === '18' ? css`background: #000;` : props.certification === '16' ? css`background: rgb(255,20,0);` : props.certification === '14' ? css`background: orange;` : props.certification === '12' ? css`background: yellow;` : props.certification === '10' ? css`background: blue;` : css`background: green;` }
    display: flex;
    justify-content:center;
    align-items:center;
    color: #fff;
    font-weight: bold;
  }
`;

export const CloseIcon = styled(Close)`
  position: absolute;
  top: 40px;
  right: 50px;
  z-index: 10;
  color: #fff;
  cursor:pointer;
`;