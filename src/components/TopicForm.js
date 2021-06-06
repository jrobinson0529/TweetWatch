import React, { useState } from 'react';
import { Button, Form } from 'semantic-ui-react';
import getCurrentUsersUid from '../helpers/data/userData';

function TopicForm() {
  const uid = getCurrentUsersUid();
  const [topic, setTopic] = useState({
    title: '',
    iconUrl: '',
    searchParams: [],
    description: '',
    uid,
  });
  const handleInputChange = (e) => {
    setTopic((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.name === 'searchParams' ? e.target.value.split(',') : e.target.value
    }));
  };
  return (
    <Form style={{ width: '50%', margin: 'auto' }} size='large'>
      <Form.Group widths='equal'>
        <Form.Input label='Title' type='text' name='title' placeholder='Enter title...' value={topic.title} onChange= {handleInputChange}/>
        <Form.Input label='Image' type='text' name='iconUrl' placeholder='Enter image url...' value={topic.iconUrl} onChange= {handleInputChange}/>
        <Form.Input label='Description' type='text' name='description' placeholder='Enter description...' value={topic.description} onChange={handleInputChange}/>
      </Form.Group>
      <Form.Input label='Search Paramaters' type='text' name='searchParams' placeholder='Enter search paramaters seperated by comma and no space. IE. dog,cat,etc' value={topic.searchParams} onChange={handleInputChange}/>
      <Button type="submit">Submit</Button>
    </Form>
  );
}

export default TopicForm;
