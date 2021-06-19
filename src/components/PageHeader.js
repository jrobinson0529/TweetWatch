import React from 'react';
import PropTypes from 'prop-types';
import { Container } from 'semantic-ui-react';
import StyledHeader from './styled_components/StyledHeader';

function PageHeader({ headTitle, description }) {
  return (
    <Container textAlign='center' style={{ width: '50%', margin: '5em' }}>
      <StyledHeader as='h1'>{headTitle}</StyledHeader>
      <p className='header-subtext'><i>{description || 'Nanos gigantium humeris insidentes'}</i></p>
    </Container>
  );
}
PageHeader.propTypes = {
  headTitle: PropTypes.string,
  description: PropTypes.string
};
export default PageHeader;
