import React from 'react';
import CategoryForm from '../components/CategoryForm';
import PageHeader from '../components/PageHeader';

function CreateCategory() {
  return (
    <div>
      <PageHeader headTitle='Create a new category' description='' />
      <CategoryForm />
    </div>
  );
}

export default CreateCategory;
