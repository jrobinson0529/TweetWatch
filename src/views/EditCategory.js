import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import PageHeader from '../components/PageHeader';
import CategoryForm from '../components/CategoryForm';
import { getSingleCategory } from '../helpers/data/categoryData';

function EditCategory({ setCategories }) {
  const { id } = useParams();
  const [categoryObject, setCategoryObject] = useState({});
  useEffect(() => {
    getSingleCategory(id).then((response) => setCategoryObject((response)));
  }, [id]);
  return (
    <div>
      <PageHeader headTitle={`Edit ${categoryObject?.title}`} description='' />
      <CategoryForm setCategories={setCategories} categoryObject={categoryObject}/>
    </div>
  );
}
EditCategory.propTypes = {
  setCategories: PropTypes.func,
};

export default EditCategory;
