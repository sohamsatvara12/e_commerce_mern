'use client';

import React, { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import axios from 'axios';
import { toast } from 'react-toastify';
import { withSwal } from 'react-sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, unsetLoading } from '@/app/lib/features/loading/loadingSlice';
import Loader from '@/components/Loader';
import CategoryForm from './categoryForm';
import CategoryTable from './categoryTable';


const Categories = ({ swal }) => {
  const loading = useSelector((state) => state.loading.value);
  const dispatch = useDispatch();

  const [categories, setCategories] = useState([]);
  const [editingCategory, setEditingCategory] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);
  
  const fetchCategories = async () => {
    try {
      dispatch(setLoading()); 
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API}/crud/categories`);
      const resData = response.data;

      if (response.status === 200) {
        setCategories(resData.category_list);
      } else {
        throw new Error('Failed to fetch categories');
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
      toast.error('Failed to fetch categories. Please try again.', { fontSize: '14px' });
    } finally {
      dispatch(unsetLoading()); 
    }
  };

  const handleSave = () => {
    setEditingCategory(null); 
    fetchCategories(); 
  };

  return (
    <Layout>
      <h2 className="text-blue-900 text-xl font-semibold mb-2">
        {editingCategory ? 'Edit Category' : 'New Category'}
      </h2>

  <CategoryForm onSave={handleSave} editingCategory={editingCategory}   categories={categories} />

<CategoryTable
  categories={categories}
  onDelete={fetchCategories} 
  onUpdate={(cat) => setEditingCategory(cat)} 
/>

{loading && <Loader />}
</Layout>
);
};

export default withSwal(({ swal }, ref) => <Categories swal={swal} />);

