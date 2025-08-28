import React from "react";

const DescriptionTextarea = ({
    label,
    id,
    name,
    value,
    onChange,
    rows,
    placeholder,
}) => (
    <div>
        <label className="block font-medium mb-2 text-gray-700" htmlFor={id}>
            {label}
        </label>
        <textarea
            id={id}
            name={name}
            value={value}
            onChange={onChange}
            rows={rows}
            placeholder={placeholder}
            className="form-textarea resize-none"
        ></textarea>
    </div>
);

export default DescriptionTextarea;
