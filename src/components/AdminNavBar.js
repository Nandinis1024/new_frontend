import React, { useState } from 'react';
import CreateProduct from './createProduct';
import CreateFeatures from './createFeatures';
import DisplayProducts from './displayProducts';

function AdminNavBar() {
  const [selectedOption, setSelectedOption] = useState('');

  const renderComponent = () => {
    switch (selectedOption) {
      case 'a':
        return <CreateProduct />;
      case 'b':
        return <CreateFeatures />;
      case 'c':
        return <DisplayProducts />;
      default:
        return null;
    }
  };

  return (
    <div className="w-screen mx-auto bg-white rounded-lg shadow-md overflow-x-hidden">
      <nav className="flex justify-center mb-4 h-10 w-40">
        <ul className="flex">
          <li
            className={`mx-2 py-1 px-3 cursor-pointer rounded-full ${selectedOption === 'a' ? 'bg-blue-500 text-white' : 'bg-transparent text-black'}`}
            onClick={() => setSelectedOption('a')}
          >
            Option A
          </li>
          <li
            className={`mx-2 py-1 px-3 cursor-pointer rounded-full ${selectedOption === 'b' ? 'bg-blue-500 text-white' : 'bg-transparent text-black'}`}
            onClick={() => setSelectedOption('b')}
          >
            Option B
          </li>
          <li
            className={`mx-2 py-1 px-3 cursor-pointer rounded-full ${selectedOption === 'c' ? 'bg-blue-500 text-white' : 'bg-transparent text-black'}`}
            onClick={() => setSelectedOption('c')}
          >
            Option C
          </li>
        </ul>
      </nav>
      <div className=" w-screen text-center">
        {renderComponent()}
      </div>
    </div>
  );
}

export default AdminNavBar;
