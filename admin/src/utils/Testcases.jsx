import React, { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';

const TestCases = ({ handleTestCases, testCase }) => {
  const [testCases, setTestCases] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
  
    if (testCase) {
      setTestCases(testCase);
    } else {
      setTestCases([
        {
          inputs: [],
          output: '',
        },
      ]);
    }
        setLoading(false);
    
  }, [testCase]);

  useEffect(() => {
  
    if (!loading) {
      handleTestCases(testCases);
    }
  }, [testCases, loading]);

  const addTestCase = () => {
    setTestCases((prevTestCases) => [
      ...prevTestCases,
      {
        inputs: [],
        output: '',
      },
    ]);
  };

  const removeTestCase = (index) => {
    setTestCases((prevTestCases) => {
      const updatedTestCases = [...prevTestCases];
      updatedTestCases.splice(index, 1);
      return updatedTestCases;
    });
  };

  const handleInputChange = (testCaseIndex, inputIndex, value) => {
    setTestCases((prevTestCases) => {
      const updatedTestCases = [...prevTestCases];
      updatedTestCases[testCaseIndex].inputs[inputIndex].value = value;
      return updatedTestCases;
    });
  };

  const handleOutputChange = (testCaseIndex, value) => {
    setTestCases((prevTestCases) => {
      const updatedTestCases = [...prevTestCases];
      updatedTestCases[testCaseIndex].output = value;
      return updatedTestCases;
    });
  };

  const addInputField = (testCaseIndex) => {
    setTestCases((prevTestCases) => {
      const updatedTestCases = [...prevTestCases];
      updatedTestCases[testCaseIndex].inputs.push({ label: `Input ${updatedTestCases[testCaseIndex].inputs.length + 1}`, value: '' });
      return updatedTestCases;
    });
  };

  const removeInputField = (testCaseIndex, inputIndex) => {
    setTestCases((prevTestCases) => {
      const updatedTestCases = [...prevTestCases];
      updatedTestCases[testCaseIndex].inputs.splice(inputIndex, 1);
      return updatedTestCases;
    });
  };

  const renderInputs = (inputs, testCaseIndex) => {
    return inputs.map((input, inputIndex) => (
      <div key={inputIndex} className="flex items-center mb-4">
        <label className="mr-2 text-white">{input.label}:</label>
        <Input
          type="text"
          value={input.value}
          onChange={(e) => handleInputChange(testCaseIndex, inputIndex, e.target.value)}
          className="mr-2 bg-black-100 text-white border-2 border-white p-2 flex-grow"
        />
        <button
          onClick={() => removeInputField(testCaseIndex, inputIndex)}
          className="ml-2 px-2 py-1 bg-red-600 text-white rounded"
        >
          Remove
        </button>
      </div>
    ));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-8 bg-black-100 h-auto">
      <h2 className="text-2xl text-white mb-6">Test Cases</h2>
      {testCases.map((testCase, testCaseIndex) => (
        <div key={testCaseIndex} className="mb-8 p-6 bg-black-300 rounded-lg">
          <h3 className="text-xl text-white mb-4">Test Case {testCaseIndex + 1}</h3>
          {renderInputs(testCase.inputs, testCaseIndex)}
          <button
            onClick={() => addInputField(testCaseIndex)}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
          >
            Add Input Field
          </button>
          <div className="mt-4">
            <label className="text-white mr-2">Expected Output:</label>
            <Input
              type="text"
              value={testCase.output}
              onChange={(e) => handleOutputChange(testCaseIndex, e.target.value)}
              className="bg-black-100 text-white border-2 border-white p-2 w-full"
            />
          </div>
          <button
            onClick={() => removeTestCase(testCaseIndex)}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded"
          >
            Remove Test Case
          </button>
        </div>
      ))}
      <button
        onClick={addTestCase}
        className="mt-8 px-4 py-2 bg-green-600 text-white rounded"
      >
        Add Test Case
      </button>
    </div>
  );
};

export default TestCases;
