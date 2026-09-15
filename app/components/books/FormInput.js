export default function FormInput({
  id,
  name,
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  min,
  required = true,
 
}) {
  return (
    <div className="mb-5">
      <label
        htmlFor={id}
        className="block text-xs font-medium text-gray-700 mb-2"
      >
        {label}
      </label>

      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        min={min}
        required={required}
        className="w-full h-9 border border-gray-400 px-3 text-sm outline-none focus:border-gray-700"
        
      />
    </div>
  );
}