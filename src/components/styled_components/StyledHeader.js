import { Header } from 'semantic-ui-react';
import styled from 'styled-components';

const StyledHeader = styled(Header)`
  &&& {
    font-size: ${(props) => props.inputfontsize || '6em'};
    color: white;
  }
`;

export default StyledHeader;
