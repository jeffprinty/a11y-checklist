import styled from 'styled-components';

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
export const F = styled.div`
  flex: ${props => props.flex}
`;

export const StyledCheckbox = styled.span`
  min-width: 20px;
  position: relative;
  height: 25px;
  line-height: 20px;

  span.check {
    cursor: pointer;
    width: 20px;
    height: 20px;
    position: absolute;
    top: 0;
    left: 0;
    background: linear-gradient(top, #222 0%, #45484d 100%);
    border-radius: 4px;
    box-shadow: inset 0px 1px 1px rgba(0,0,0,0.5), 0px 1px 0px rgba(255,255,255,.4);
    &:after {
      content: '';
      width: 9px;
      height: 5px;
      position: absolute;
      top: 4px;
      left: 4px;
      border: 3px solid #fcfff4;
      border-top: none;
      border-right: none;
      background: transparent;
      opacity: 0;
      transform: rotate(-45deg);
    }
    &:hover::after {
      opacity: 0.3;
    }
  }
  label {
    cursor: pointer;
    margin-left: 26px;
    margin-right: 12px;
  }
  input[type=checkbox] {
    opacity: 0;
    min-width: 70px;
    height: 36px;
    position: absolute;
    z-index: 999;
    &:checked + span:after {
      opacity: 1;
    }
  }
`;

export const Colors = {
  very_light_red: '#ffe7e5',
  light_red: '#ffafaf',
  medium_red: '#ef5656',
  Macmillan_red: '#da1b2c',
  dark_red: '#a51426',
  very_light_orange: '#ffe5d3',
  light_orange: '#ffc196',
  medium_orange: '#ff8a57',
  orange: '#dd5714',
  dark_orange: '#a83d0e',
  very_light_yellow: '#fffbd7',
  light_yellow: '#faf2a9',
  medium_yellow: '#e5d676',
  yellow: '#b79e25',
  dark_yellow: '#74600c',
  very_light_green: '#daf4d4',
  light_green: '#acdba2',
  medium_green: '#68b75f',
  green: '#3b822e',
  dark_green: '#2c5e20',
  very_light_teal: '#dbfff3',
  light_teal: '#aee5d3',
  medium_teal: '#5fb79c',
  teal: '#218466',
  dark_teal: '#16664b',
  very_light_aqua: '#cff3f9',
  light_aqua: '#a2d6dd',
  medium_aqua: '#45a5b5',
  aqua: '#00758e',
  dark_aqua: '#205460',
  very_light_blue: '#e0f1ff',
  light_blue: '#b0daff',
  medium_blue: '#3192d3',
  blue: '#006eb8',
  dark_blue: '#004c72',
  very_light_purple: '#ffe6fd',
  light_purple: '#e5c6e3',
  medium_purple: '#b286af',
  purple: '#865f7f',
  dark_purple: '#543b50',
  very_light_magenta: '#ffe6f3',
  light_magenta: '#edb0ce',
  medium_magenta: '#b26487',
  magenta: '#882345',
  dark_magenta: '#562135',
  pure_white: '#ffffff',
  off_white: '#f8f8f8',
  very_light_gray: '#f3f3f3',
  light_gray: '#dddddd',
  medium_light_gray: '#c8c8c8',
  medium_dark_gray: '#989898',
  dark_gray: '#686868',
  very_dark_gray: '#383838',
  blackish: '#080808'
};
