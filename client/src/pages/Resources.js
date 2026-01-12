import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { resourceAPI, subjectAPI } from '../services/api';
import ResourceCard from '../components/ResourceCard';
import { toast } from 'react-toastify';
import '../styles/Resources.css';

const Resources = () => {
  const { user } = useAuth();
  const [resources, setResources] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    subject: '',
    type: '',
  });

  useEffect(() => {
    fetchSubjects();
    fetchResources();
  }, [filters]);

  const fetchSubjects = async () => {
    try {
      const { data } = await subjectAPI.getAll();
      setSubjects(data);
    } catch (error) {
      console.error('Error fetching subjects:', error);
    }
  };

  const fetchResources = async () => {
    setLoading(true);
    try {
      const params = {};
      if (filters.subject) params.subject = filters.subject;
      if (filters.type) params.type = filters.type;

      const { data } = await resourceAPI.getAll(params);
      setResources(data);
    } catch (error) {
      toast.error('Failed to fetch resources');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this resource?')) {
      try {
        await resourceAPI.delete(id);
        setResources(resources.filter((r) => r._id !== id));
        toast.success('Resource deleted successfully');
      } catch (error) {
        toast.error('Failed to delete resource');
      }
    }
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const clearFilters = () => {
    setFilters({ subject: '', type: '' });
  };

  return (
    <div className="resources-container">
      <div className="resources-header">
        <h1>Resources</h1>
      </div>

      <div className="filters-section">
        <div className="filter-group">
          <label>Subject</label>
          <select
            name="subject"
            value={filters.subject}
            onChange={handleFilterChange}
          >
            <option value="">All Subjects</option>
            {subjects.map((subject) => (
              <option key={subject._id} value={subject._id}>
                {subject.name}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label>Type</label>
          <select name="type" value={filters.type} onChange={handleFilterChange}>
            <option value="">All Types</option>
            <option value="course">Course</option>
            <option value="tp">TP</option>
            <option value="td">TD</option>
            <option value="homework">Homework</option>
            <option value="exam">Exam</option>
            <option value="project">Project</option>
            <option value="other">Other</option>
          </select>
        </div>

        <button className="clear-filters-button" onClick={clearFilters}>
          Clear Filters
        </button>
      </div>

      {loading ? (
        <div className="loading">Loading resources...</div>
      ) : resources.length === 0 ? (
        <div className="no-resources">
          <p>No resources found</p>
        </div>
      ) : (
        <div className="resources-grid">
          {resources.map((resource) => (
            <ResourceCard
              key={resource._id}
              resource={resource}
              onDelete={handleDelete}
              isAdmin={user.role === 'admin'}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Resources;
