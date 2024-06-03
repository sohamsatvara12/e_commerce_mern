'use client';


import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { setLoading, unsetLoading } from '@/app/lib/features/loading/loadingSlice';
import axios from 'axios';
import { toast } from 'react-toastify';

const CategoryTable = ({ categories, onDelete, onUpdate }) => {
  const dispatch = useDispatch();

  const handleDelete = async (category) => {
    try {
      dispatch(setLoading()); 

      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/api/crud/category/${category.id}`
      );

      if (response.status === 200) {
        onDelete(); 
        toast.success(response.data.message, { fontSize: '14px' });
      } else {
        throw new Error(response.data.message || 'Failed to delete category');
      }
    } catch (error) {
      console.error('Error deleting category:', error);
      toast.error('Failed to delete category. Please try again.', { fontSize: '14px' });
    } finally {
      dispatch(unsetLoading()); 
    }
  };

  return (
    <table className="basic mt-4">
      <thead>
        <tr>
          <th className="text-left w-1/3 flex-1 max-md:w-1/4">Category name</th>
          <th className="text-left w-1/3 flex-1 max-md:w-1/4">Parent</th>
          <th className="text-left flex-1 max-[870px]:w-1/3 max-md:w-1/4"></th>
        </tr>
      </thead>

      <tbody>
        {categories.map((cat) => (
          <tr key={cat.id}>

            <td className="w-1/3 max-[870px]:w-1/3 flex-1">{cat.name}</td>
            <td className="w-1/3 max-[870px]:w-1/3 flex-1">{cat.parent ? cat.parent : '-'}</td>
            <td className="flex gap-2 flex-1">
              <button
                type="button"
                className="btn-primary bg-blue-900 text-white px-1 py-1 rounded-md flex-1 shadow-xl hover:bg-orange-300 flex justify-center md:flex md:items-center md:px-2"
                onClick={() => onUpdate(cat)}
              >
                <FontAwesomeIcon icon={faPenToSquare} className="text-white mr-2 max-md:mr-0 max-md:px-1" />
                <span className="max-md:hidden">Edit</span>
              </button>
              <button
                type="button"
                className="btn-primary bg-blue-900 text-white px-1 py-1 rounded-md flex-1 shadow-xl hover:bg-red-500 flex justify-center md:flex md:items-center md:px-2"
                onClick={() => handleDelete(cat)}
              >
                <FontAwesomeIcon icon={faTrash} className="text-white mr-2 max-md:mr-0 max-md:px-1" />
                <span className="max-md:hidden">Delete</span>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CategoryTable;
