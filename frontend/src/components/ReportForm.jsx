import React, { useState, useEffect, useCallback } from "react";
import TextInput from "./TextInput";
import DescriptionTextarea from "./DescriptionTextarea";
import PhotoUpload from "./PhotoUpload";
import { CITIES } from "./locationService";

const ReportForm = () => {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        coordinates: [],
        issueImg: [],
        tags: "",
        fullAddress: "",
        state: "",
        district: "",
        pincode: "",
    });

    const [previews, setPreviews] = useState([]);
    const [filenames, setFilenames] = useState([]);
    const [status, setStatus] = useState(null); // success or error message
    const [loading, setLoading] = useState(false);
    const [retrievingLocation, setRetrievingLocation] = useState(false);
    const [locationError, setLocationError] = useState(null);
    const [geoPermission, setGeoPermission] = useState(null); // prompt | granted | denied | unsupported
    const [coords, setCoords] = useState(null); // { lat, lon }
    const [districtOptions, setDistrictOptions] = useState([]); // Changed from cityOptions

    const indianStates = [
        "Andhra Pradesh",
        "Arunachal Pradesh",
        "Assam",
        "Bihar",
        "Chhattisgarh",
        "Delhi",
        "Goa",
        "Gujarat",
        "Haryana",
        "Himachal Pradesh",
        "Jharkhand",
        "Karnataka",
        "Kerala",
        "Madhya Pradesh",
        "Maharashtra",
        "Manipur",
        "Meghalaya",
        "Mizoram",
        "Nagaland",
        "Odisha",
        "Punjab",
        "Rajasthan",
        "Sikkim",
        "Tamil Nadu",
        "Telangana",
        "Tripura",
        "Uttar Pradesh",
        "Uttarakhand",
        "West Bengal",
    ];

    // Check permission status if supported
    useEffect(() => {
        let cancelled = false;
        if (navigator.permissions && navigator.permissions.query) {
            navigator.permissions
                .query({ name: "geolocation" })
                .then((res) => {
                    if (!cancelled) setGeoPermission(res.state);
                    if (res.state === "granted") {
                        requestLocation();
                    }
                    res.onchange = () => {
                        !cancelled && setGeoPermission(res.state);
                        if (res.state === "granted") {
                            requestLocation();
                        }
                    };
                })
                .catch(() => {
                    setGeoPermission("unsupported");
                });
        } else {
            setGeoPermission("unsupported");
        }
        if (navigator.geolocation && !cancelled) {
            requestLocation();
        }
        return () => {
            cancelled = true;
        };
    }, []);

    // useEffect(() => {
    //     setSuggestions((prev) => ({ ...prev, state: indianStates }));
    // }, []);

    const requestLocation = () => {
        if (!navigator.geolocation) {
            setLocationError("Geolocation not supported by this browser");
            setGeoPermission("unsupported");
            return;
        }
        setRetrievingLocation(true);
        setLocationError(null);

        navigator.geolocation.getCurrentPosition(
            (pos) => {
                const { latitude, longitude } = pos.coords;
                const coordsArray = [latitude, longitude];

                setCoords({ lat: latitude, lon: longitude });
                setFormData((prev) => ({ ...prev, coordinates: coordsArray }));
                setRetrievingLocation(false);
                setLocationError(null);
            },
            (err) => {
                let message = "Failed to get location";
                setLocationError(`${message}`);
                setRetrievingLocation(false);
            },
            { enableHighAccuracy: true, timeout: 12000, maximumAge: 0 }
        );
    };

    // const fetchStates = useCallback(async (query = "") => {
    //     setLoading((prev) => ({ ...prev, states: true }));
    //     try {
    //         const filtered = query
    //             ? indianStates.filter((state) =>
    //                   state.toLowerCase().includes(query.toLowerCase())
    //               )
    //             : indianStates;

    //         setSuggestions((prev) => ({ ...prev, states: filtered }));
    //     } catch (error) {
    //         setError("Failed to load states");
    //     }
    //     setLoading((prev) => ({ ...prev, states: false }));
    //     setDistrictOptions(CITIES[filtered] || [])
    // }, []);

    const handleStateChange = (e) => {
        const selectedState = e.target.value;
        setFormData((prev) => ({
            ...prev,
            state: selectedState,
            district: "",
        })); // Reset district
        setDistrictOptions(CITIES[selectedState] || []); // Set cities for selected state
    };

    // const fetchDistrictsForState = useCallback(async (query = "") => {
    //     setLoading((prev) => ({ ...prev, states: true }));
    //     try {
    //         const filtered = query
    //             ? CITIES.filter((state) =>
    //                   state.toLowerCase().includes(query.toLowerCase())
    //               )
    //             : indianStates;

    //         setSuggestions((prev) => ({ ...prev, states: filtered }));
    //     } catch (error) {
    //         // setError("Failed to load states");
    //     }
    //     setLoading((prev) => ({ ...prev, states: false }));
    // }, []);

    const handleDistrictChange = (e) => {
        const selectedDistrict = e.target.value;
        setFormData((prev) => ({ ...prev, district: selectedDistrict }));
    };

    const runGeolocation = (options, isRetry = false) => {
        console.debug(
            "[Geo] Requesting position",
            options,
            isRetry ? "(retry)" : ""
        );
        setLastGeoAttemptOpts(options);
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                console.debug("[Geo] Success raw position", pos);
                const { latitude, longitude, accuracy } = pos.coords;
                setCoords({ lat: latitude, lon: longitude });
                setFormData((prev) => ({
                    ...prev,
                    location: `${latitude.toFixed(5)}, ${longitude.toFixed(5)} (resolving address...)`,
                }));
                setRetrievingLocation(false);
                setLocationError(null);
                console.info(
                    `[Geo] Coordinates set (±${Math.round(accuracy)}m)`
                );
                reverseGeocode(latitude, longitude);
            },
            (err) => {
                console.error("[Geo] Error", err);
                let message = "Failed to get location.";
                if (err.code === 1)
                    message =
                        "Permission denied. Please allow location access in your browser.";
                else if (err.code === 2)
                    message =
                        "Kindly check your location is on or not. Retrying with reduced accuracy...";
                else if (err.code === 3)
                    message = "Request timed out. Try again.";
                // If code 2 and not yet retried with low accuracy, retry once
                if (err.code === 2 && !isRetry) {
                    console.debug("[Geo] Retrying with low accuracy");
                    runGeolocation(
                        {
                            enableHighAccuracy: false,
                            timeout: 8000,
                            maximumAge: 30000,
                        },
                        true
                    );
                    return;
                }
                setLocationError(`${message} (code ${err.code})`);
                setRetrievingLocation(false);
            },
            options
        );
    };
    // const handleGeoClick = () => {
    //     console.debug("[Geo] Button clicked");
    //     if (!navigator.geolocation) {
    //         console.warn("[Geo] API not supported");
    //         setLocationError("Geolocation not supported by this browser.");
    //         setGeoPermission("unsupported");
    //         return;
    //     }
    //     setRetrievingLocation(true);
    //     setLocationError(null);
    //     runGeolocation({
    //         enableHighAccuracy: true,
    //         timeout: 12000,
    //         maximumAge: 0,
    //     });
    // };

    // const handleIpFallback = async () => {
    //     setIpFallbackLoading(true);
    //     setLocationError(null);
    //     try {
    //         // Lightweight IP-based fallback (approximate). You may replace with your backend proxy for production.
    //         const res = await fetch("https://ipapi.co/json/");
    //         if (!res.ok) throw new Error("IP lookup failed");
    //         const data = await res.json();
    //         const approx = [data.city, data.region, data.country_name]
    //             .filter(Boolean)
    //             .join(", ");
    //         if (approx) {
    //             setFormData((prev) => ({ ...prev, location: approx }));
    //         } else {
    //             setLocationError("Could not determine approximate location.");
    //         }
    //     } catch (e) {
    //         setLocationError("IP fallback failed. Enter manually.");
    //     } finally {
    //         setIpFallbackLoading(false);
    //     }
    // };

    useEffect(() => {
        // Clean up previews when images change or on unmount
        return () => {
            previews.forEach((url) => URL.revokeObjectURL(url));
        };
    }, [previews]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus(null);
        if (
            !formData.title ||
            !formData.description ||
            !formData.state ||
            !formData.district
        ) {
            setStatus("Please fill in all required fields.");
            setLoading(false);
            return;
        }
        if (formData.images.length === 0) {
            setStatus("Please upload at least one image.");
            setLoading(false);
            return;
        }
        if (formData.coordinates.length === 0) {
            setStatus("Please provide location coordinates.");
            setLoading(false);
            return;
        }
        const data = new FormData();
        data.append("title", formData.title);
        data.append("description", formData.description);
        data.append("coordinates", JSON.stringify(formData.coordinates));
        const addressData = {
            state: formData.state,
            district: formData.district,
            pincode: formData.pincode,
            fullAddress: formData.fullAddress,
        };
        data.append("address", JSON.stringify(addressData));
        formData.images.forEach((img) => data.append("issueImg", img));
        try {
            const response = await fetch(
                "http://localhost:8000/citizen/createIssue",
                {
                    method: "POST",
                    body: data,
                    credentials: "include",
                }
            );
            if (response.ok) {
                setStatus("Report submitted successfully!");
                setFormData({
                    title: "",
                    description: "",
                    coordinates: [],
                    images: [],
                    state: "",
                    district: "",
                    pincode: "",
                    fullAddress: "",
                });
                setPreviews([]);
                setFilenames([]);
                setCoords(null);
            } else {
                const err = await response.json();
                setStatus(err.message || "Failed to submit report.");
            }
        } catch (error) {
            setStatus("Only registered users can report an issue");
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        handleInputChange(name, value);
    };

    const handleInputChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        // if (field === "state") {
        //     const filtered = indianStates.filter((state) =>
        //         state.toLowerCase().includes(value.toLowerCase())
        //     );
        //     setSuggestions((prev) => ({ ...prev, state: filtered }));
        //     setShowSuggestions((prev) => ({
        //         ...prev,
        //         state: value.length > 0 && filtered.length > 0,
        //     }));
        //     setFormData((prev) => ({ ...prev, district: "" }));
        //     setDistrictOptions([]);
        //     setSuggestions((prev) => ({ ...prev, district: "" }));
        //     if (indianStates.includes(value)) {
        //         fetchDistrictsForState(value);
        //     } else if (field === "district") {
        //         const filtered = districtOptions.filter((district) =>
        //             district.toLowerCase().includes(value.toLowerCase())
        //         );
        //         setSuggestions((prev) => ({ ...prev, district: filtered }));
        //         setShowSuggestions((prev) => ({
        //             ...prev,
        //             district: value.length > 0 && filtered.length > 0,
        //         }));
        //     }
        // }
    };

    // const selectSuggestion = (field, value) => {
    //     setFormData((prev) => ({ ...prev, [field]: value }));
    //     setShowSuggestions((prev) => ({ ...prev, [field]: false }));

    //     if (field === "state") {
    //         fetchDistrictsForState(value);
    //         setFormData((prev) => ({ ...prev, district: "" })); // Reset district
    //     }
    // };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setFormData((prev) => ({
            ...prev,
            images: files,
        }));
        // Generate previews and filenames
        const urls = files.map((file) => URL.createObjectURL(file));
        setPreviews(urls);
        setFilenames(files.map((file) => file.name));
    };

    const handleRemoveImage = (idx) => {
        setFormData((prev) => {
            const newImages = prev.images.filter((_, i) => i !== idx);
            return { ...prev, images: newImages };
        });
        setPreviews((prevs) => {
            // Revoke the object URL
            URL.revokeObjectURL(prevs[idx]);
            return prevs.filter((_, i) => i !== idx);
        });
        setFilenames((names) => names.filter((_, i) => i !== idx));
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

                <div className="">
                    <label
                        className="block font-medium mb-2 text-gray-700"
                        htmlFor="location"
                    >
                        Location
                    </label>
                    <div className="grid grid-row-2 gap-4">
                        <div className="grid grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    State
                                </label>
                                <select
                                    value={formData.state}
                                    onChange={handleStateChange}
                                    className="form-input"
                                    required
                                >
                                    <option value="">Select State</option>
                                    {indianStates.map((state) => (
                                        <option key={state} value={state}>
                                            {state}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    City
                                </label>
                                <select
                                    value={formData.district}
                                    onChange={handleDistrictChange}
                                    disabled={!formData.state}
                                    className="form-input"
                                    required
                                >
                                    <option value="">Select City</option>
                                    {districtOptions.map((city) => (
                                        <option key={city} value={city}>
                                            {city}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="relative">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Pincode
                                </label>
                                <input
                                    type="text"
                                    name="pincode"
                                    value={formData.pincode}
                                    onChange={handleChange}
                                    placeholder="Enter pincode"
                                    className="form-input"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Exact Location & Nearby Landmarks
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    id="fullAddress"
                                    name="fullAddress"
                                    value={formData.fullAddress}
                                    onChange={handleChange}
                                    placeholder="Enter the address"
                                    className="form-input pr-12"
                                />
                            </div>
                            {locationError && (
                                <p className="mt-2 text-sm text-red-600">
                                    {locationError}
                                </p>
                            )}
                            {coords && !locationError && (
                                <p className="mt-2 text-xs text-gray-500">
                                    Raw: {coords.lat.toFixed(5)},{" "}
                                    {coords.lon.toFixed(5)}
                                </p>
                            )}
                            {/* {reverseError && (
            <p className="mt-1 text-xs text-red-500">{reverseError}</p>
          )} */}
                            {geoPermission &&
                                geoPermission !== "unsupported" && (
                                    <p className="mt-1 text-[11px] text-gray-400"></p>
                                )}
                            {locationError && (
                                <div className="mt-3 flex flex-wrap gap-2">
                                    <button
                                        type="button"
                                        // onClick={handleGeoClick}
                                        // disabled={retrievingLocation}
                                        className="px-3 py-1.5 text-xs rounded-md bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
                                    >
                                        Retry GPS
                                    </button>
                                    <button
                                        type="button"
                                        // onClick={handleIpFallback}
                                        // disabled={ipFallbackLoading}
                                        className="px-3 py-1.5 text-xs rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50"
                                    >
                                        {/* {ipFallbackLoading
                                            ? "IP lookup..."
                                            : "Use Approximate (IP)"} */}
                                    </button>
                                </div>
                            )}
                            {/* {lastGeoAttemptOpts && (  
            <p className="mt-2 text-[11px] text-gray-400"></p>
          )} */}
                            {/* Manual convert button if user pastes coordinates */}
                            {!coords &&
                                !locationError &&
                                /^-?\d{1,3}\.\d{3,},\s*-?\d{1,3}\.\d{3,}/.test(
                                    formData.location
                                ) && (
                                    <button
                                        type="button"
                                        onClick={() => {
                                            const match =
                                                formData.location.match(
                                                    /(-?\d+\.\d+)[^\d-]+(-?\d+\.\d+)/
                                                );
                                            if (match)
                                                reverseGeocode(
                                                    parseFloat(match[1]),
                                                    parseFloat(match[2])
                                                );
                                        }}
                                        className="mt-3 px-3 py-1.5 text-xs rounded-md bg-indigo-600 text-white hover:bg-indigo-700"
                                    >
                                        Convert to Address
                                    </button>
                                )}
                        </div>
                    </div>
                </div>
                <PhotoUpload
                    onChange={handleImageChange}
                    previews={previews}
                    onRemove={handleRemoveImage}
                    filenames={filenames}
                />

                <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary w-full"
                >
                    {loading ? "Submitting..." : "Submit Report"}
                </button>

                {status && (
                    <div
                        className={`mt-4 text-center font-medium rounded-xl p-4 ${
                            status.includes("success")
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                        }`}
                    >
                        {status}
                    </div>
                )}
            </div>
        </form>
    );
};

export default ReportForm;
