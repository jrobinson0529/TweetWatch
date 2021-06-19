import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import PageHeader from '../components/PageHeader';
import TopicForm from '../components/TopicForm';
import { getSingleTopic } from '../helpers/data/topicData';

function EditTopic({ setTopics }) {
  const { id } = useParams();
  const [topicObject, setTopicObject] = useState({});
  useEffect(() => {
    getSingleTopic(id).then((response) => setTopicObject((response)));
  }, [id]);
  return (
    <div>
      <PageHeader headTitle={`Edit ${topicObject?.title}`} description='' />
      <TopicForm setTopics={setTopics} topicObject={topicObject}/>
    </div>
  );
}
EditTopic.propTypes = {
  setTopics: PropTypes.func,
};

export default EditTopic;
