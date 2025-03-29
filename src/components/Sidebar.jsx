// src/components/Sidebar.jsx
import React, { useState } from "react";
import Tag from './Tag';
import '../css/Sidebar.css';

export default function Sidebar({
  selectedFlavor,
  setSelectedFlavor,
  selectedDessert,
  setSelectedDessert,
  selectedDietary,
  setSelectedDietary,
  selectedDegreeRequirement,
  setSelectedDegreeRequirement,
  showLabCourses,
  setShowLabCourses,
  showNoPrerequisites,
  setShowNoPrerequisites
}) {

  console.log(selectedFlavor);
  const [flavorOpen, setFlavorOpen] = useState(false);
  const [dessertOpen, setDessertOpen] = useState(false);
  const [dietaryOpen, setDietaryOpen] = useState(false);
  /*const [courseLevelOpen, setCourseLevelOpen] = useState(false);
  const [departmentOpen, setDepartmentOpen] = useState(false);
  const [requirementOpen, setRequirementOpen] = useState(false);*/
  const [allFilters, setAllFilters] = useState(true);

  const toggleFlavor = () => setFlavorOpen(!flavorOpen);
  const toggleDessert = () => setDessertOpen(!dessertOpen);
  const toggleDietary = () => setDietaryOpen(!dietaryOpen);
  /*const toggleCourseLevel = () => setCourseLevelOpen(!courseLevelOpen);
  const toggleDepartment = () => setDepartmentOpen(!departmentOpen);
  const toggleRequirement = () => setRequirementOpen(!requirementOpen);*/

  const dropdownAll = () => {
    setFlavorOpen(allFilters);
    setDessertOpen(allFilters);
    setDietaryOpen(allFilters);
    /*setCourseLevelOpen(allFilters);
    setDepartmentOpen(allFilters);
    setRequirementOpen(allFilters);*/
    setAllFilters(!allFilters)
  }

  const handleReset = () => {
    setSelectedFlavor([]);
    setSelectedDessert([]);
    setSelectedDietary([]);
    /*setSelectedCourseLevel([]);
    setSelectedDepartment([]);
    setSelectedDegreeRequirement([]);
    setShowLabCourses(false);
    setShowNoPrerequisites(false);*/
    setFlavorOpen(false);
    setDessertOpen(false);
    setDietaryOpen(false);
    /*setCourseLevelOpen(false);
    setDepartmentOpen(false);
    setRequirementOpen(false);*/
  };

  const handleCheckboxChange = (value, selectedValues, setSelectedValues) => {
    if (selectedValues.includes(value)) {
      setSelectedValues(selectedValues.filter((v) => v !== value));
    } else {
      setSelectedValues([...selectedValues, value]);
    }
  };

  return (
    <aside className="sidebar">
      <div className="filter-header">
        <h3>Filters</h3>
        <button className="dropdown-all" onClick={dropdownAll}>
          {allFilters ? "+" : "-"}
        </button>
      </div>
      <hr/>

      <div className="buffer">
        <button onClick={toggleFlavor} className="dropdown-button">
          <div>Flavor</div>
          <i className={`dropper ${flavorOpen ? "down" : "up"}`}></i> 
        </button>
        {flavorOpen && (
          <div className="filter-type">
            {["Almond", "Banana", "Blueberry", "Caramel", "Chocolate", "Cinnamon", 
            "Coconut", "Cookies and Cream", "Lemon", "Mango", "Mint", "Peanut Butter", "Pistachio", 
            "Raspberry", "Strawberry", "Toffee", "Ube", "Vanilla"].map((flavor) => (
              <label key={flavor} className="dropdown-items">
                <input
                  type="checkbox"
                  checked={selectedFlavor?.includes(flavor)}
                  onChange={() => {
                    handleCheckboxChange(flavor, selectedFlavor, setSelectedFlavor);
                  }}
                />
                {flavor}
              </label>
          ))}
          </div>
          )}
      </div>
      <hr/>

      <div className="buffer">
        <button onClick={toggleDessert} className="dropdown-button">
          <div>Dessert Type</div>
          <i className={`dropper ${dessertOpen ? "down" : "up"}`}></i> 
        </button>
        {dessertOpen && (
          <div className="filter-type">
            {["Bread", "Brownie", "Cake", "Cookie", "Crepe", "Donut", "Fudge", 
            "Ice Cream", "Pie", "Pudding", "Soda"].map((type) => (
              <label key={type} className="dropdown-items">
                <input
                  type="checkbox"
                  checked={selectedDessert?.includes(type)}
                  onChange={() => {
                    handleCheckboxChange(type, selectedDessert, setSelectedDessert);
                  }}
                />
                {type}
              </label>
          ))}
          </div>
          )}
      </div>
      <hr/>

      <div className="buffer">
        <button onClick={toggleDietary} className="dropdown-button">
          <div>Dietary Preferences</div>
          <i className={`dropper ${dietaryOpen ? "down" : "up"}`}></i> 
        </button>
        {dietaryOpen && (
          <div className="filter-type">
            {["dairy-free", "egg-free", "gluten-free", "nut-free"].map((diet) => (
              <label key={diet} className="dropdown-items">
                <input
                  type="checkbox"
                  checked={selectedDietary?.includes(diet)}
                  onChange={() => {
                    handleCheckboxChange(diet, selectedDietary, setSelectedDietary);
                  }}
                />
                {diet}
              </label>
          ))}
          </div>
          )}
      </div>
      <hr/>
{/*
      <div className="buffer">
      <button onClick={toggleModality} className="dropdown-button">
        <div>Modality</div>
        <i className={`dropper ${modalityOpen ? "down" : "up"}`}></i> 
      </button>
      {modalityOpen && (
        <div className="filter-type">
          {["Online", "In-Person", "Hybrid"].map((modality) => (
            <label key={modality} className="dropdown-items">
              <input
                type="checkbox"
                checked={selectedModality.includes(modality)}
                onChange={(e) => {
                  handleCheckboxChange(modality, selectedModality, setSelectedModality);
                }}
              />
              {modality}
            </label>
        ))}
        </div>
        )}
      </div>
      <hr/>
      
      <div className="buffer">
        <button onClick={toggleSemester} className="dropdown-button">
          <div>Semester</div>
          <i className={`dropper ${semesterOpen ? "down" : "up"}`}></i> 
        </button>
        {semesterOpen && (
        <div className="filter-type">
          {["Fall/Winter", "Fall", "Winter", "Spring", "Ongoing", "Varies"].map((semester) => (
            <label key={semester} className="dropdown-items">
              <input
                type="checkbox"
                checked={selectedSemester.includes(semester)}
                onChange={(e) => {
                  handleCheckboxChange(semester, selectedSemester, setSelectedSemester);
                }}
              />
              {semester}
            </label>
        ))}
        </div>
        )}
      </div>
      <hr/>
      
      <div className="buffer">
        <button onClick={toggleCreditHours} className="dropdown-button">
          <div>Credit Hours</div>
          <i className={`dropper ${creditHoursOpen ? "down" : "up"}`}></i> 
        </button>
        {creditHoursOpen && (
        <div className="filter-type">
          {[1,2,3,4, 5].map((creditHours) => (
            <label key={creditHours} className="dropdown-items">
              <input
                type="checkbox"
                checked={selectedCreditHours.includes(creditHours)}
                onChange={(e) => {
                  handleCheckboxChange(creditHours, selectedCreditHours, setSelectedCreditHours);
                }}
              />
              {creditHours}
            </label>
        ))}
        </div>
        )}
      </div>
      <hr/>

      <div className="buffer">
        <button onClick={toggleCourseLevel} className="dropdown-button">
          <div>Course Level</div>
          <i className={`dropper ${courseLevelOpen ? "down" : "up"}`}></i> 
        </button>
        {courseLevelOpen && (
        <div className="filter-type">
          {["100 Level", "200 Level", "300 Level", "400 Level", "500 Level"].map((courseLevel) => (
            <label key={courseLevel} className="dropdown-items">
              <input
                type="checkbox"
                checked={selectedCourseLevel.includes(courseLevel)}
                onChange={(e) => {
                  handleCheckboxChange(courseLevel, selectedCourseLevel, setSelectedCourseLevel);
                }}
              />
              {courseLevel}
            </label>
        ))}
        </div>
        )}
      </div>
      <hr/>

      <div className="buffer">
      <button onClick={toggleRequirement} className="dropdown-button">
        <div>Requirement</div>
        <i className={`dropper ${requirementOpen ? "down" : "up"}`}></i> 
      </button>
      {requirementOpen && (
        <div className="filter-type">
          {["Major", "General", "Elective"].map((requirement) => (
            <label key={requirement} className="dropdown-items">
              <input
                type="checkbox"
                checked={selectedDegreeRequirement.includes(requirement)}
                onChange={(e) => {
                  handleCheckboxChange(requirement, selectedDegreeRequirement, setSelectedDegreeRequirement);
                }}
              />
              {requirement}
            </label>
        ))}
        </div>
        )}
      </div>
      <hr/>

      <div className="buffer">
        <label>Lab Hours Required</label>
        <input
          type="checkbox"
          checked={showLabCourses}
          onChange={() => setShowLabCourses(!showLabCourses)}
        />
      </div>

      <hr/>

      <div className="buffer">
        <label>No Prerequisites</label>
        <input
          type="checkbox"
          checked={showNoPrerequisites}
          onChange={() => setShowNoPrerequisites(!showNoPrerequisites)}
        />
      </div>

      <hr/>*/}

      {/* Reset Button */}
      <button
        onClick={handleReset}
        className="filter-reset"
      >
        Reset Filters
      </button>

    </aside>
  );
}

