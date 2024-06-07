const GenderCheckbox = ({onCheckboxChange, selectedGender}) => {
  return (
    <div className='flex'>
        <div className="form-control">
            <label className={`label gap-2 cursor-pointer ${selectedGender === "Male" ? "selected" : ""}`}>
            <span className="label-text text-amber-500">Male</span>
            <input type="checkbox" className="checkbox checkbox-warning border-slate-950" 
              checked={selectedGender === "Male"} 
              onChange={() => onCheckboxChange("Male")} 
            />
            </label>
        </div>
        <div className="form-control">
            <label className={`label gap-2 cursor-pointer ${selectedGender === "Female" ? "selected" : ""}`}>
            <span className="label-text text-amber-500">Female</span>
            <input type="checkbox" className="checkbox checkbox-warning border-slate-950" 
              checked={selectedGender === "Female"} 
              onChange={() => onCheckboxChange("Female")} 
            />
            </label>
        </div>
    </div>
  )
}

export default GenderCheckbox