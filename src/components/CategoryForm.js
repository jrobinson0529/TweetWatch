import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { Button, Form } from 'semantic-ui-react';
import { createCategory, editCategory, getUserCategories } from '../helpers/data/categoryData';
import getCurrentUsersUid from '../helpers/data/userData';

function CategoryForm({ setCategories, categoryObject }) {
  const uid = getCurrentUsersUid();
  const history = useHistory();
  const [category, setCategory] = useState({
    id: categoryObject.id || null,
    title: categoryObject.title || '',
    iconUrl: categoryObject.iconUrl || '',
    description: categoryObject.description || '',
    uid,
  });
  useEffect(() => {
    if (categoryObject) {
      setCategory({
        id: categoryObject.id || null,
        title: categoryObject.title || '',
        iconUrl: categoryObject.iconUrl || '',
        description: categoryObject.description || '',
        uid,
      });
    }
  }, [categoryObject]);
  const handleInputChange = (e) => {
    setCategory((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };
  const handleSubmit = () => {
    if (category.id) {
      editCategory(category, category.id).then(setCategories);
    } else {
      createCategory(category).then((response) => {
        getUserCategories(uid).then(setCategories);
        history.push(`/category/${response}`);
      });
    }
  };

  return (
    <Form style={{ width: '50%', margin: 'auto' }} size='large' onSubmit={handleSubmit}>
      <Form.Group widths='equal'>
        <Form.Input label='Title' type='text' name='title' placeholder='Enter title...' value={category.title} onChange= {handleInputChange}/>
        <Form.Input label='Image' type='text' name='iconUrl' placeholder='Enter image url...' value={category.iconUrl} onChange= {handleInputChange}/>
        <Form.Input label='Description' type='text' name='description' placeholder='Enter description...' value={category.description} onChange={handleInputChange}/>
      </Form.Group>
      <Button type="submit">Submit</Button>
    </Form>
  );
}
CategoryForm.propTypes = {
  setCategories: PropTypes.func,
  categoryObject: PropTypes.object,
};

export default CategoryForm;
