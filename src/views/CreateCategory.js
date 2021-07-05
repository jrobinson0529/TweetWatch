import React from 'react';
import PropTypes from 'prop-types';
import CategoryForm from '../components/CategoryForm';
import PageHeader from '../components/PageHeader';

function CreateCategory({ setCategories }) {
  return (
    <div>
      <PageHeader headTitle="Create a new category" description="" />
      <CategoryForm setCategories={setCategories} />
    </div>
  );
}
CreateCategory.propTypes = {
  setCategories: PropTypes.func,
};

export default CreateCategory;
