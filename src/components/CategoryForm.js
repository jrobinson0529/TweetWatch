import React, { useState } from 'react';
import { Button, Form } from 'semantic-ui-react';
import getCurrentUsersUid from '../helpers/data/userData';

function CategoryForm() {
  const uid = getCurrentUsersUid();
  const [category, setCategory] = useState({
    title: '',
    iconUrl: '',
    description: '',
    uid,
  });
  const handleInputChange = (e) => {
    setCategory((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };
  return (
    <Form style={{ width: '50%', margin: 'auto' }} size='large'>
      <Form.Group widths='equal'>
        <Form.Input label='Title' type='text' name='title' placeholder='Enter title...' value={category.title} onChange= {handleInputChange}/>
        <Form.Input label='Image' type='text' name='iconUrl' placeholder='Enter image url...' value={category.iconUrl} onChange= {handleInputChange}/>
        <Form.Input label='Description' type='text' name='description' placeholder='Enter description...' value={category.description} onChange={handleInputChange}/>
      </Form.Group>
      <Button type="submit">Submit</Button>
    </Form>
  );
}

export default CategoryForm;
