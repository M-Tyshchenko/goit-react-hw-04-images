import styled from 'styled-components';
import { BsSearch } from 'react-icons/bs';

export const HeaderSection = styled.header`
  top: 0;
  left: 0;
  position: sticky;
  z-index: 1100;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 64px;
  padding-right: 24px;
  padding-left: 24px;
  padding-top: 12px;
  padding-bottom: 12px;

  color: #fff;
  background-color: #3f51b5;
  box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2),
    0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);
`;
export const FormLabel = styled.label`
  position: relative;
`;

export const FormInput = styled.input`
  width: 350px;
  max-width: 600px;
  height: 35px;

  padding-left: 30px;
  border-radius: 4px;
  border-color: transparent;

  background-color: #fff;
  overflow: hidden;
`;

export const SubmitBtn = styled.button`
  position: absolute;
  top: 50%;
  left: 5px;
  transform: translateY(-50%);
  padding: 0;

  border: none;
  background-color: transparent;
`;

export const StyledIcon = styled(BsSearch)`
  fill: #4a4f6a;

  &:hover,
  &:focus {
    fill: currentColor;
  }
`;
