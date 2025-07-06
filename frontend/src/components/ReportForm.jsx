import React, { useState, useEffect } from 'react';
import IssueCategorySelect from './IssueCategorySelect';
import TextInput from './TextInput';
import DescriptionTextarea from './DescriptionTextarea';
import PhotoUpload from './PhotoUpload';

const ReportForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    category: 'sanitation',
    images: [],
  });
  const [previews, setPreviews] = useState([]);
  const [filenames, setFilenames] = useState([]);
  const [status, setStatus] = useState(null); // success or error message
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Clean up previews when images change or on unmount
    return () => {
      previews.forEach(url => URL.revokeObjectURL(url));
    };
  }, [previews]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('location', formData.location);
    data.append('category', formData.category);
    formData.images.forEach((img) => data.append('images', img));
    try {
      const response = await fetch('http://localhost:5000/api/issues', {
        method: 'POST',
        body: data,
      });
      if (response.ok) {
        setStatus('Report submitted successfully!');
        setFormData({
          title: '',
          description: '',
          location: '',
          category: 'sanitation',
          images: [],
        });
        setPreviews([]);
        setFilenames([]);
      } else {
        const err = await response.json();
        setStatus(err.message || 'Failed to submit report.');
      }
    } catch (error) {
      setStatus('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData(prev => ({
      ...prev,
      images: files
    }));
    // Generate previews and filenames
    const urls = files.map(file => URL.createObjectURL(file));
    setPreviews(urls);
    setFilenames(files.map(file => file.name));
  };

  const handleRemoveImage = (idx) => {
    setFormData(prev => {
      const newImages = prev.images.filter((_, i) => i !== idx);
      return { ...prev, images: newImages };
    });
    setPreviews(prevs => {
      // Revoke the object URL
      URL.revokeObjectURL(prevs[idx]);
      return prevs.filter((_, i) => i !== idx);
    });
    setFilenames(names => names.filter((_, i) => i !== idx));
  };

  return (
    <form 
      className="rounded-2xl p-8 mb-12"
      style={{ backgroundColor: '#DBE7F0' }}
      onSubmit={handleSubmit}
    >
      <div className="space-y-6">
        <IssueCategorySelect
          value={formData.category}
          onChange={handleChange}
          name="category"
        />
        <TextInput
          label="Issue Title"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Brief description of the issue"
        />
        <DescriptionTextarea
          label="Detailed Description"
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={4}
          placeholder="Provide more details about the issue..."
        />
        <TextInput
          label="Location"
          id="location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Enter the address or location details"
        />
        <PhotoUpload onChange={handleImageChange} previews={previews} onRemove={handleRemoveImage} filenames={filenames} />
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl px-6 py-3 font-medium transition-all transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-opacity-50 disabled:opacity-60"
          style={{ 
            backgroundColor: '#FFFA03', 
            color: '#212121',
            border: 'none'
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#CFDECA'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#FFFA03'}
        >
          {loading ? 'Submitting...' : 'Submit Report'}
        </button>
        {status && (
          <div 
            className={`mt-4 text-center font-medium rounded-xl p-3 ${
              status.includes('success') 
                ? 'text-green-700' 
                : 'text-red-700'
            }`}
            style={{ 
              backgroundColor: status.includes('success') ? '#CFDECA' : '#FFE6E6'
            }}
          >
            {status}
          </div>
        )}
      </div>
    </form>
  );
};

export default ReportForm; 