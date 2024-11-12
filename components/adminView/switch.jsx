export function Switch({ checked, onChange, label }) {
    return (
      <label className="inline-flex items-center cursor-pointer">
        <span className="sr-only">{label}</span>
        <div className={`relative w-11 h-6 rounded-full transition-colors duration-200 ease-in-out ${checked ? 'bg-green-500' : 'bg-gray-300'}`}>
          <div
            className={`absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full transition-transform duration-200 ease-in-out ${
              checked ? 'transform translate-x-5' : ''
            }`}
          ></div>
        </div>
        <input
          type="checkbox"
          className="sr-only"
          checked={checked}
          onChange={onChange}
          aria-label={label}
        />
      </label>
    )
  }