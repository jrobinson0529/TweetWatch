import React from 'react';
import PropTypes from 'prop-types';
import PageHeader from '../components/PageHeader';
import TopicForm from '../components/TopicForm';

function CreateTopic({ setTopics }) {
  return (
    <div>
      <PageHeader headTitle='Create a new topic' description='' />
      <TopicForm setTopics={setTopics}/>
    </div>
  );
}
CreateTopic.propTypes = {
  setTopics: PropTypes.func,
};

export default CreateTopic;
