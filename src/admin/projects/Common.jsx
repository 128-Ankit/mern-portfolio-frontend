export const InputField = ({ Title, type, name, value, onChange, placeholder }) => {
    return (
        <div>
            <label className="block text-sm font-medium mb-2">{Title}</label>
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="w-full p-2 rounded bg-gray-800 border border-gray-700 focus:border-blue-500 focus:outline-none"
            />
        </div>
    )
};

export const Textarea = ({ Title, name, value, onChange }) => {
    return (
        <div>
            <label className="block text-sm font-medium mb-2">{Title}</label>
            <textarea
                name={name}
                value={value}
                onChange={onChange}
                className="w-full p-2 rounded bg-gray-800 border border-gray-700 focus:border-blue-500 focus:outline-none h-32"
            />
        </div>
    )
};


export const Select = ({ label, name, value, onChange, options, className = '' }) => {
    return (
        <div className="space-y-1">
            <label htmlFor={name} className="block text-sm font-medium text-white">
                {label}
            </label>
            <select
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                className={`w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-800${className}`}
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};