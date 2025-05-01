import React, { useState,useEffect } from "react";

export function PLCV() {
  const stat = 379.49;
  const fx1 = 16.04;
  const fx2 = 44.01;
  const fx3 = 28.014;
  const fx4 = 31.99;
  const fx5 = 34.02;
  const fx6 = 18.02;

  const gasMasses = {
    acetylene: 0.907,
    air: 1.000,
    ammonia: 0.588,
    argon: 1.379,
    carbonDioxide: 1.529,
    carbonMonoxide: 0.965,
    helium: 0.138,
    hydrogen: 0.070,
    hydrogenChloride: 1.268,
    methane:0.554,
    methylChloride:1.736,
    nitrogen:0.967,
    nitrousOxide:1.517,
    oxygen:1.105,
    sulfurDioxide: 2.264,
  };

  const [ans, setAns] = useState("");
  const [maxFormData, setMaxFormData] = useState({
    upstreamPressure: "",
    downstreamPressure: "",
    flow: "",
    flowCondition: "",
    controlValve: "",
    inletTemp: "",
    methane: "",
    carbonDioxide: "",
    nitrogen: "",
    oxygen: "",
    h2s: "",
    water: "",
  });

  const [maxRadio, setMaxRadio] = useState('required cv');
const [FlowType, setFlowType] = useState("");
  const [max_xp1, setMaxexp1] = useState(0);
  const [max_xp2, setMaxexp2] = useState(0);
  const [selectedGas, setSelectedGas] = useState("");
  const [gasMassInput, setGasMassInput] = useState("");

  const handleGasSelection = (e) => {
    const gas = e.target.value;
    setSelectedGas(gas);
    // Set the corresponding mass to the input box
    setGasMassInput(gasMasses[gas] || "");
  };
  const gasDensity = () => {
    const result = (
      (1 * maxFormData.methane * fx1 / stat) +
      (1 * maxFormData.carbonDioxide * fx2 / stat) +
      (1 * maxFormData.nitrogen * fx3 / stat) +
      (1 * maxFormData.oxygen * fx4 / stat) +
      (1 * maxFormData.h2s * fx5 / stat) +
      (1 * maxFormData.water * fx6 / stat)) / 1;

    setAns("gas density - " + result/100);
  }



  const flowCV = () => {
    const result = 0;
  }



  const handleMaxRadioChange = (event) => {
    setMaxRadio(event.target.checked ? 'required flow' : 'required cv');
  };


  const handleMaxChange = (e) => {
    const { name, value } = e.target;
    const numericValue = parseFloat(value) || 0; // Ensure numeric value
    
    setMaxFormData((prev) => ({ ...prev, [name]: value }));
  
    if (name === "upstreamPressure") {
      setMaxexp1(numericValue + 14.7);
    } else if (name === "downstreamPressure") {
      setMaxexp2(numericValue + 14.7);
    }
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    gasDensity();
    console.log("Max CV Data:", maxFormData);
  };
  useEffect(() => {
    if (max_xp1 > max_xp2 * 2) {
      setMaxFormData((prev) => ({ ...prev, flowCondition: "Critical Flow" }));
    } else {
      setMaxFormData((prev) => ({ ...prev, flowCondition: "Sub-Critical Flow" }));
    }
  }, [max_xp1, max_xp2]); // Runs whenever max_xp1 or max_xp2 changes
  
  return (
<div className="min-h-screen bg-gray-50 py-4 px-3 sm:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header optimized for mobile */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-xl sm:text-2xl font-bold text-amber-900">Control Valve Calculator</h1>
          <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-green-600">
            Calculate gas density and flow parameters
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          <div className="bg-white shadow-sm sm:shadow rounded-lg overflow-hidden">
            {/* Max CV Model Section */}
            <div className="p-4 sm:p-6 border-b border-gray-200">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 sm:mb-4 gap-2">
                <h3 className="text-base sm:text-lg font-medium text-green-600">Max CV Model</h3>
                <div className="flex items-center justify-center sm:justify-start">
                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={maxRadio === 'required flow'}
                      onChange={handleMaxRadioChange}
                      className="sr-only peer"
                    />
                    <div className="relative w-10 h-5 sm:w-11 sm:h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 sm:after:h-5 sm:after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                    <span className="ms-2 text-xs sm:text-sm font-medium text-gray-700">
                      {maxRadio === 'required flow' ? 'Required Flow' : 'Required CV'}
                    </span>
                  </label>
                </div>
              </div>

              {/* Input Grid - optimized for mobile */}
              <div className="grid grid-cols-1 gap-3 mb-4 sm:mb-6 sm:grid-cols-2 sm:gap-4">
                {[
                  { name: "upstreamPressure", label: "P1 (bar)", step: "0.00000001" ,readonly:false, type:"number",custom:""},
                  { name: "downstreamPressure", label: "P2 (bar)", step: "0.000000001" , readonly:false ,type:"number",custom:""},
                  { name: "flow", label: "Flow", step: "0.00000001" , readonly:false,type:"number",custom:""},
                  { name: "flowCondition", label: "Flow Condition", step: "" , readonly:true, type:"text",custom:"text-red-500 font-bold"},
                  { name: "controlValve", label: "Control Valve CV", step: "0.00000001",readonly:false ,type:"number",custom:""},
                  { name: "inletTemp", label: "Inlet Temp (°C)", step: "0.00000001",readonly:false ,type:"number",custom:""}
                ].map((field) => (
                  <div key={field.name} className="space-y-1 sm:space-y-2">
                    <label className="block text-xs sm:text-sm font-medium text-gray-700">
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      name={field.name}
                      value={maxFormData[field.name]}
                      onChange={handleMaxChange}
                      className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 text-xs sm:text-sm p-2 border h-8 sm:h-auto ${field.custom}`}
                      placeholder={field.label}
                      step={field.step}
                      readOnly={field.readonly}
                    />
                  </div>
                ))}
              </div>

              {/* Gas Composition Section - optimized for mobile */}
              <div>
                <h4 className="text-xs sm:text-sm font-medium text-gray-700 mb-2 sm:mb-3">
                  Gas Composition (%)
                </h4>
                <div className="grid grid-cols-2 gap-2 sm:gap-3 sm:grid-cols-3">
                  {[
                    { name: "methane", label: "CH4" },
                    { name: "carbonDioxide", label: "CO2" },
                    { name: "nitrogen", label: "N2" },
                    { name: "oxygen", label: "O2" },
                    { name: "h2s", label: "H2S" },
                    { name: "water", label: "H2O" }
                  ].map((gas) => (
                    <div key={gas.name} className="space-y-1">
                      <label className="block text-xs sm:text-sm font-medium text-gray-700">
                        {gas.label}
                      </label>
                      <input
                        type="number"
                        name={gas.name}
                        value={maxFormData[gas.name]}
                        onChange={handleMaxChange}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 text-xs sm:text-sm p-2 border h-8 sm:h-auto"
                        placeholder="0-100"
                        min="0"
                        max="100"
                        step="0.00000001"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
<div className="bg-white shadow-sm sm:shadow rounded-lg overflow-hidden p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-medium text-green-600 mb-3 sm:mb-4">
              Gas Selection
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1 sm:space-y-2">
                <label className="block text-xs sm:text-sm font-medium text-gray-700">
                  Select Gas
                </label>
                <select
                  value={selectedGas}
                  onChange={handleGasSelection}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 text-xs sm:text-sm p-2 border h-8 sm:h-auto"
                >
                  <option value="">-- Select a gas --</option>
                  {Object.keys(gasMasses).map((gas) => (
                    <option key={gas} value={gas}>
                      {gas.charAt(0).toUpperCase() + gas.slice(1).replace(/([A-Z])/g, ' $1')}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-1 sm:space-y-2">
                <label className="block text-xs sm:text-sm font-medium text-gray-700">
                  Gas Mass (kg/m³)
                </label>
                <input
                  type="number"
                  value={gasMassInput}
                  onChange={(e) => setGasMassInput(e.target.value)}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 text-xs sm:text-sm p-2 border h-8 sm:h-auto"
                  placeholder="Gas mass will appear here"
                  step="0.00000001"
                />
              </div>
            </div>
          </div>

          {/* Results and Submit Button - mobile optimized */}
          <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-3">
            <button
              type="submit"
              className="w-full sm:w-auto px-4 py-2 sm:px-6 sm:py-2 border border-transparent rounded-md shadow-sm text-xs sm:text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Calculate
            </button>
            {ans && (
              <div className="w-full sm:w-auto px-3 py-2 bg-green-50 rounded-md">
                <p className="text-xs sm:text-sm font-medium text-green-800 text-center sm:text-left">
                  {ans}
                </p>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>

  );
}