import React, { useState, useEffect } from 'react';
import TextInput from './TextInput';
import DescriptionTextarea from './DescriptionTextarea';
import PhotoUpload from './PhotoUpload';

const ReportForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    images: [],
  });
  const [previews, setPreviews] = useState([]);
  const [filenames, setFilenames] = useState([]);
  const [status, setStatus] = useState(null); // success or error message
  const [loading, setLoading] = useState(false);
  const [retrievingLocation, setRetrievingLocation] = useState(false);
  const [locationError, setLocationError] = useState(null);
  const [geoPermission, setGeoPermission] = useState(null); // prompt | granted | denied | unsupported
  const [lastGeoAttemptOpts, setLastGeoAttemptOpts] = useState(null);
  const [ipFallbackLoading, setIpFallbackLoading] = useState(false);
  const [coords, setCoords] = useState(null); // { lat, lon }
  const [reverseLoading, setReverseLoading] = useState(false);
  const [reverseError, setReverseError] = useState(null);

  // Check permission status if supported
  useEffect(()=>{
    let cancelled = false;
    if (navigator.permissions && navigator.permissions.query) {
      navigator.permissions.query({ name: 'geolocation' }).then(res => {
        if (!cancelled) setGeoPermission(res.state);
        res.onchange = () => !cancelled && setGeoPermission(res.state);
      }).catch(()=>{/* ignore */});
    } else {
      setGeoPermission('unsupported');
    }
    return ()=>{ cancelled = true; };
  }, []);

  const reverseGeocode = async (latitude, longitude) => {
    setReverseLoading(true);
    setReverseError(null);
    try {
      const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`;
      const res = await fetch(url, {
        headers: {
          'Accept': 'application/json'
        }
      });
      if (!res.ok) throw new Error('Reverse geocode failed');
      const data = await res.json();
      const display = data.display_name || data.name;
      if (display) {
        setFormData(prev => ({ ...prev, location: display }));
      } else {
        setReverseError('Address not found for coordinates');
      }
    } catch (e) {
      console.error('[Geo] Reverse geocode error', e);
      setReverseError('Could not convert to address');
    } finally {
      setReverseLoading(false);
    }
  };

  const runGeolocation = (options, isRetry=false) => {
    console.debug('[Geo] Requesting position', options, isRetry ? '(retry)' : '');
    setLastGeoAttemptOpts(options);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        console.debug('[Geo] Success raw position', pos);
  const { latitude, longitude, accuracy } = pos.coords;
  setCoords({ lat: latitude, lon: longitude });
  setFormData(prev => ({ ...prev, location: `${latitude.toFixed(5)}, ${longitude.toFixed(5)} (resolving address...)` }));
        setRetrievingLocation(false);
        setLocationError(null);
        console.info(`[Geo] Coordinates set (±${Math.round(accuracy)}m)`);
  reverseGeocode(latitude, longitude);
      },
      (err) => {
        console.error('[Geo] Error', err);
        let message = 'Failed to get location.';
        if (err.code === 1) message = 'Permission denied. Please allow location access in your browser.';
        else if (err.code === 2) message = 'Kindly check your location is on or not. Retrying with reduced accuracy...';
        else if (err.code === 3) message = 'Request timed out. Try again.';
        // If code 2 and not yet retried with low accuracy, retry once
        if (err.code === 2 && !isRetry) {
          console.debug('[Geo] Retrying with low accuracy');
          runGeolocation({ enableHighAccuracy: false, timeout: 8000, maximumAge: 30000 }, true);
          return;
        }
        setLocationError(`${message} (code ${err.code})`);
        setRetrievingLocation(false);
      },
      options
    );
  };

  const handleGeoClick = () => {
    console.debug('[Geo] Button clicked');
    if (!navigator.geolocation) {
      console.warn('[Geo] API not supported');
      setLocationError('Geolocation not supported by this browser.');
      setGeoPermission('unsupported');
      return;
    }
    setRetrievingLocation(true);
    setLocationError(null);
    runGeolocation({ enableHighAccuracy: true, timeout: 12000, maximumAge: 0 });
  };

  const handleIpFallback = async () => {
    setIpFallbackLoading(true);
    setLocationError(null);
    try {
      // Lightweight IP-based fallback (approximate). You may replace with your backend proxy for production.
      const res = await fetch('https://ipapi.co/json/');
      if (!res.ok) throw new Error('IP lookup failed');
      const data = await res.json();
      const approx = [data.city, data.region, data.country_name].filter(Boolean).join(', ');
      if (approx) {
        setFormData(prev => ({ ...prev, location: approx }));
      } else {
        setLocationError('Could not determine approximate location.');
      }
    } catch (e) {
      setLocationError('IP fallback failed. Enter manually.');
    } finally {
      setIpFallbackLoading(false);
    }
  };

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
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-6">
        
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
        <div>
          <label className="block font-medium mb-2 text-gray-700" htmlFor="location">Location</label>
          <div className="relative">
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Enter the address or use the locator"
              className="form-input pr-12"
            />
            <button
              type="button"
              onClick={handleGeoClick}
              className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 hover:text-blue-600 disabled:opacity-50"
              title="Use my current location"
              disabled={retrievingLocation}
            >
              {retrievingLocation ? (
                <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" strokeWidth="4"></circle>
                  <path className="opacity-75" strokeWidth="4" d="M4 12a8 8 0 018-8" />
                </svg>
              ) : (
                // Location crosshair icon
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8a4 4 0 100 8 4 4 0 000-8z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 2v2m0 16v2m10-10h-2M4 12H2m15.071 6.071l-1.414-1.414M8.343 8.343L6.929 6.929m0 10.142l1.414-1.414m7.314-7.314l1.414-1.414" />
                </svg>
              )}
            </button>
          </div>
          {locationError && <p className="mt-2 text-sm text-red-600">{locationError}</p>}
          {coords && !locationError && (
            <p className="mt-2 text-xs text-gray-500">
              Raw: {coords.lat.toFixed(5)}, {coords.lon.toFixed(5)} {reverseLoading && ' • Resolving address…'}
            </p>
          )}
          {reverseError && (
            <p className="mt-1 text-xs text-red-500">{reverseError}</p>
          )}
          {geoPermission && geoPermission !== 'unsupported' && (
            <p className="mt-1 text-[11px] text-gray-400"></p>
          )}
          {locationError && (
            <div className="mt-3 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={handleGeoClick}
                disabled={retrievingLocation}
                className="px-3 py-1.5 text-xs rounded-md bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
              >Retry GPS</button>
              <button
                type="button"
                onClick={handleIpFallback}
                disabled={ipFallbackLoading}
                className="px-3 py-1.5 text-xs rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50"
              >{ipFallbackLoading ? 'IP lookup...' : 'Use Approximate (IP)'}</button>
            </div>
          )}
          {lastGeoAttemptOpts && (
            <p className="mt-2 text-[11px] text-gray-400"></p>
          )}
          {/* Manual convert button if user pastes coordinates */}
          {!coords && !reverseLoading && !locationError && /^-?\d{1,3}\.\d{3,},\s*-?\d{1,3}\.\d{3,}/.test(formData.location) && (
            <button
              type="button"
              onClick={() => {
                const match = formData.location.match(/(-?\d+\.\d+)[^\d-]+(-?\d+\.\d+)/);
                if (match) reverseGeocode(parseFloat(match[1]), parseFloat(match[2]));
              }}
              className="mt-3 px-3 py-1.5 text-xs rounded-md bg-indigo-600 text-white hover:bg-indigo-700"
            >Convert to Address</button>
          )}
        </div>
        <PhotoUpload onChange={handleImageChange} previews={previews} onRemove={handleRemoveImage} filenames={filenames} />
        
        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full"
        >
          {loading ? 'Submitting...' : 'Submit Report'}
        </button>
        
        {status && (
          <div className={`mt-4 text-center font-medium rounded-xl p-4 ${
            status.includes('success') 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            {status}
          </div>
        )}
      </div>
    </form>
  );
};

export default ReportForm; 