import React from 'react';
import PageHeader from '../components/PageHeader';
import TopicForm from '../components/TopicForm';

function CreateTopic() {
  return (
    <div>
      <PageHeader headTitle='Create a new topic' description='' />
      <TopicForm />
    </div>
  );
}

export default CreateTopic;
