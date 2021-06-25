import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { Button, Dropdown, Form } from 'semantic-ui-react';
import { getUserCategories } from '../helpers/data/categoryData';
import { getCategoryTopics, createTopic, editTopic } from '../helpers/data/topicData';
import { getCurrentUsersUid } from '../helpers/data/userData';

function TopicForm({ setTopics, topicObject }) {
  const uid = getCurrentUsersUid();
  const [topic, setTopic] = useState({
    id: topicObject?.id || null,
    title: topicObject?.title || '',
    iconUrl: topicObject?.iconUrl || '',
    searchParams: topicObject?.searchParams || [],
    description: topicObject?.description || '',
    categoryId: topicObject?.categoryId || '',
    uid,
  });
  const history = useHistory();
  const [categories, setCategories] = useState();
  useEffect(() => {
    if (topicObject) {
      setTopic({
        id: topicObject?.id || null,
        title: topicObject?.title || '',
        iconUrl: topicObject?.iconUrl || '',
        searchParams: topicObject?.searchParams || [],
        description: topicObject?.description || '',
        categoryId: topicObject?.categoryId || '',
        uid,
      });
    }
    getUserCategories(uid).then((response) => {
      setCategories(response.map((category) => ({
        key: category.id,
        text: category.title,
        value: category.id,
        image: { avatar: true, src: category.iconUrl }
      })));
    });
  }, [topicObject]);
  const handleInputChange = (e) => {
    setTopic((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.name === 'searchParams' ? e.target.value.split(',') : e.target.value
    }));
  };
  const handleDropdownChange = (e, data) => {
    setTopic((prevState) => ({
      ...prevState,
      categoryId: data.value
    }));
  };
  const handleSubmit = () => {
    if (topic.id) {
      editTopic(topic, topic.id).then(setTopics);
    } else {
      createTopic(topic).then((response) => {
        getCategoryTopics(topic.categoryId).then(setTopics);
        history.push(`/topic/${response}`);
      });
    }
  };

  return (
    <Form style={{ width: '50%', margin: 'auto' }} size='large' onSubmit={handleSubmit}>
      <Form.Group widths='equal'>
        <Form.Input label='Title' type='text' name='title' placeholder='Enter title...' value={topic.title} onChange={handleInputChange}/>
        <Form.Input label='Image' type='text' name='iconUrl' placeholder='Enter image url...' value={topic.iconUrl} onChange={handleInputChange}/>
        <Form.Input label='Description' type='text' name='description' placeholder='Enter description...' value={topic.description} onChange={handleInputChange}/>
      </Form.Group>
      <Form.Input label='Search Paramaters' type='text' name='searchParams' placeholder='Enter search paramaters seperated by comma and no space. IE. dog,cat,etc' value={topic.searchParams} onChange={handleInputChange}/>
      <Form.Group>
      <Dropdown
         placeholder='Select a category'
         fluid
         selection
         onChange={handleDropdownChange}
         options={categories}
       />
      </Form.Group>
      <Button type="submit">Submit</Button>
    </Form>
  );
}
TopicForm.propTypes = {
  setTopics: PropTypes.func,
  topicObject: PropTypes.object,
};

export default TopicForm;
