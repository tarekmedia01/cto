import React from 'react';
import { format } from 'date-fns';
import { resourceAPI } from '../services/api';
import { toast } from 'react-toastify';
import '../styles/ResourceCard.css';

const ResourceCard = ({ resource, onDelete, isAdmin }) => {
  const handleDownload = async () => {
    try {
      const response = await resourceAPI.download(resource._id);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', resource.fileName);
      document.body.appendChild(link);
      link.click();
      link.remove();
      toast.success('Download started');
    } catch (error) {
      toast.error('Failed to download resource');
    }
  };

  const getTypeColor = (type) => {
    const colors = {
      course: '#3b82f6',
      tp: '#10b981',
      td: '#f59e0b',
      homework: '#ef4444',
      exam: '#8b5cf6',
      project: '#ec4899',
      other: '#6b7280',
    };
    return colors[type] || colors.other;
  };

  return (
    <div className="resource-card">
      <div className="resource-header">
        <span
          className="resource-type"
          style={{ backgroundColor: getTypeColor(resource.type) }}
        >
          {resource.type.toUpperCase()}
        </span>
        {isAdmin && (
          <button
            className="delete-button"
            onClick={() => onDelete(resource._id)}
          >
            Delete
          </button>
        )}
      </div>

      <h3 className="resource-title">{resource.title}</h3>
      
      {resource.description && (
        <p className="resource-description">{resource.description}</p>
      )}

      <div className="resource-info">
        <div className="info-item">
          <strong>Subject:</strong> {resource.subject?.name}
        </div>
        <div className="info-item">
          <strong>Uploaded:</strong>{' '}
          {format(new Date(resource.uploadDate), 'dd MMM yyyy')}
        </div>
        <div className="info-item">
          <strong>By:</strong> {resource.uploadedBy?.firstName}{' '}
          {resource.uploadedBy?.lastName}
        </div>
        {resource.downloadCount > 0 && (
          <div className="info-item">
            <strong>Downloads:</strong> {resource.downloadCount}
          </div>
        )}
      </div>

      {resource.tags && resource.tags.length > 0 && (
        <div className="resource-tags">
          {resource.tags.map((tag, index) => (
            <span key={index} className="tag">
              {tag}
            </span>
          ))}
        </div>
      )}

      <button className="download-button" onClick={handleDownload}>
        Download
      </button>
    </div>
  );
};

export default ResourceCard;
