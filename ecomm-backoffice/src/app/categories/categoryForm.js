'use client';


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFloppyDisk, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { setLoading, unsetLoading } from '@/app/lib/features/loading/loadingSlice';

const CategoryForm = ({ onSave, editingCategory, categories }) => {
  const dispatch = useDispatch();

  const [formState, setFormState] = useState({
    name: "",
    parent: "",
  });

  useEffect(() => {
    if (editingCategory) {
      setFormState({
        name: editingCategory.name,
        parent: editingCategory.parent || "",
      });
    } else {
      setFormState({
        name: "",
        parent: "",
      });
    }
  }, [editingCategory]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, parent } = formState;

    try {
      dispatch(setLoading()); 

      let response;
      if (editingCategory) {
        response = await axios.put(
          `${process.env.NEXT_PUBLIC_BACKEND_API}/crud/category/${editingCategory.id}`,
          { name, parent }
        );
      } else {
        response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_API}/crud/category`, { name, parent });
      }

      if (response.status === 200) {
        toast.success(response.data.message, { fontSize: '14px' });
        onSave(); 
      } else {
        throw new Error('Failed to create or update category');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to save category. Please try again.', { fontSize: '14px' });
    } finally {
      dispatch(unsetLoading()); 
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-3 items-center max-md:flex-col max-md:gap-4">
      <input
        id="categoryName"
        name="categoryName"
        type="text"
        className="border-2 border-gray-300 rounded-md px-1 mb-0 w-1/3 max-md:w-full"
        value={formState.name}
        placeholder="Enter category name"
        onChange={(e) =>
          setFormState({ ...formState, name: e.target.value })
        }
      />

      <select
        name="parentCategory"
        id="parentCategory"
        className="border-2 border-gray-300 rounded-md px-1 mb-0 w-1/3 max-md:w-full"
        value={formState.parent}
        onChange={(e) =>
          setFormState({ ...formState, parent: e.target.value })
        }
      >
        <option value="" disabled>
          Select a parent category
        </option>
        <option value="-">
          no option
        </option>
        {categories.map((category) => (
          <option key={category.id} value={category.name}>
            {category.name}
          </option>
        ))}
      </select>

      <div className="btn-wrapper flex gap-4">
        <button
          type="submit"
          className="btn-primary bg-blue-900 text-white px-2 py-1 rounded-md max-md:flex max-md:items-center max-md:pl-3"
        >
          <FontAwesomeIcon icon={faFloppyDisk} className="text-white" />
          <span className="ml-2 max-[870px]:hidden max-[870px]:px-2 max-md:block">
            {editingCategory ? 'Update' : 'Save'}
          </span>
        </button>
        {editingCategory && (
          <button
            type="button"
            className="btn-primary bg-blue-900 text-white px-2 py-1 rounded-md hover:bg-red-500 max-md:flex max-md:items-center max-md:pl-3"
            onClick={() => onSave()}
          >
            <FontAwesomeIcon icon={faTimes} className="text-white" />
            <span className="ml-2 max-[870px]:hidden max-[870px]:px-2 max-md:block">Cancel</span>
          </button>
        )}
      </div>
    </form>
  );
};

export default CategoryForm;
