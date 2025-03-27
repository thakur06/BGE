import React, { useState } from "react";

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
    unknown: "",
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

  const [max_xp1, setMaxexp1] = useState(0);
  const [max_xp2, setMaxexp2] = useState(0);

  const [selectedGas, setSelectedGas] = useState("");
  const [mass, setMass] = useState(null);

  const handleGasChanges = (e) => {
    const gas = e.target.value;
    setSelectedGas(gas);
    setMass(gasMasses[gas]);
  };

  const gasDensity = () => {
    const result = (
      (1 * maxFormData.methane * fx1 / stat) +
      (1 * maxFormData.carbonDioxide * fx2 / stat) +
      (1 * maxFormData.nitrogen * fx3 / stat) +
      (1 * maxFormData.oxygen * fx4 / stat) +
      (1 * maxFormData.h2s * fx5 / stat) +
      (1 * maxFormData.water * fx6 / stat)) / 1;

    setAns("gas density - " + result);
  }



  const flowCV = () => {
    const result = 0;
  }



  const handleMaxRadioChange = (event) => {
    setMaxRadio(event.target.checked ? 'required flow' : 'required cv');
  };


  const handleMaxChange = (e) => {
    const { name, value } = e.target;
    const numericValue = parseFloat(value);

    if (name === "unknown") setMaxexp1(numericValue + 14.7);
    if (name === "downstreamPressure") setMaxexp2(numericValue + 14.7);
    console.log(max_xp1)
    setMaxFormData((prev) => ({ ...prev, [name]: value }));
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    gasDensity();
    console.log("Max CV Data:", maxFormData);
  };

  return (
    <div className="p-2 sm:p-4 flex items-center justify-center">
          <div className="p-4 max-w-md mx-auto">
      <label htmlFor="gas" className="block text-sm font-medium text-gray-700 mb-2">
        Select a Gas
      </label>
      <select
        name="gas"
        id="gas"
        value={selectedGas}
        onChange={handleGasChanges}
        className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">-- Choose a gas --</option>
        {Object.keys(gasMasses).map((gas) => (
          <option key={gas} value={gas}>
            {gas}
          </option>
        ))}
      </select>

      {mass !== null && (
        <div className="mt-4 text-gray-800">
          <strong>Selected Gas:</strong> {selectedGas} <br />
          <strong>Molecular Mass:</strong> {mass} g/mol
        </div>
      )}
    </div>
      <form
        onSubmit={handleSubmit}
        className=" p-2  sm:p-4 w-full "
      >

        <div className="flex w-full flex-col gap-16 md:flex-row md:justify-evenly">
          {/* Max CV Column */}
          <div className="space-y-1 sm:space-y-2  float-start p-3 rounded-4xl shadow shadow-green-600  border-2 border-green-600 ">
            <h3 className="text-sm sm:text-md font-semibold text-green-600 text-center">
              Max CV Model
            </h3>
            <div>
              <label className="toggle-label">
                <input
                  type="checkbox"
                  checked={maxRadio === 'required flow'}
                  onChange={handleMaxRadioChange}
                  className="toggle-input"
                />

              </label>

              <p>Current state: {maxRadio}</p>
            </div>
            <div className="grid grid-cols-2 gap-1 sm:gap-2">
              <div>
                <label
                  htmlFor="maxUnknown"
                  className="block text-[10px] sm:text-xs font-medium text-gray-700"
                >
                  unknown
                </label>
                <input
                  type="number"
                  id="maxUnknown"
                  name="unknown"
                  value={maxFormData.unknown}
                  onChange={handleMaxChange}
                  className="mt-0.5 sm:mt-1 w-full px-1 sm:px-2 py-0.5 sm:py-1 text-xs sm:text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                  placeholder="unknown"
                  step="0.001"
                />
              </div>
              <div>
                <label
                  htmlFor="maxDownstreamPressure"
                  className="block text-[10px] sm:text-xs font-medium text-gray-700"
                >
                  P2 (bar)
                </label>
                <input
                  type="number"
                  id="maxDownstreamPressure"
                  name="downstreamPressure"
                  value={maxFormData.downstreamPressure}
                  onChange={handleMaxChange}
                  className="mt-0.5 sm:mt-1 w-full px-1 sm:px-2 py-0.5 sm:py-1 text-xs sm:text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                  placeholder="Pressure"
                  step="0.01"
                />
              </div>
              <div>
                <label
                  htmlFor="maxflow"
                  className="block text-[10px] sm:text-xs font-medium text-gray-700"
                >
                  Flow
                </label>
                <input
                  type="number"
                  id="maxflow"
                  name="flow"
                  value={maxFormData.flow}
                  onChange={handleMaxChange}
                  className="mt-0.5 sm:mt-1 w-full px-1 sm:px-2 py-0.5 sm:py-1 text-xs sm:text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                  placeholder="Flow"
                  step="0.001"
                />
              </div>
              <div>
                <label
                  htmlFor="maxFlowCondition"
                  className="block text-[10px] sm:text-xs font-medium text-gray-700"
                >
                  Flow Condition
                </label>
                <input
                  type="number"
                  id="maxFlowCondition"
                  name="flowCondition"
                  value={maxFormData.flowCondition}
                  onChange={handleMaxChange}
                  className="mt-0.5 sm:mt-1 w-full px-1 sm:px-2 py-0.5 sm:py-1 text-xs sm:text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                  placeholder="Flow condition"
                  step="0.001"
                />
              </div>

              <div>
                <label
                  htmlFor="maxControlValve"
                  className="block text-[10px] sm:text-xs font-medium text-gray-700"
                >
                  Control Valve CV
                </label>
                <input
                  type="number"
                  id="maxControlValve"
                  name="controlValve"
                  value={maxFormData.controlValve}
                  onChange={handleMaxChange}
                  className="mt-0.5 sm:mt-1 w-full px-1 sm:px-2 py-0.5 sm:py-1 text-xs sm:text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                  placeholder="CV"
                  step="0.001"
                />
              </div>

              <div>
                <label
                  htmlFor="maxInletTemp"
                  className="block text-[10px] sm:text-xs font-medium text-gray-700"
                >
                  Inlet Temp (°C)
                </label>
                <input
                  type="number"
                  id="maxInletTemp"
                  name="inletTemp"
                  value={maxFormData.inletTemp}
                  onChange={handleMaxChange}
                  className="mt-0.5 sm:mt-1 w-full px-1 sm:px-2 py-0.5 sm:py-1 text-xs sm:text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                  placeholder="Temp"
                  step="0.001"
                />
              </div>
            </div>

            {/* Max CV Gas Composition */}
            <h4 className="text-xs sm:text-sm font-semibold text-gray-800 mt-1 sm:mt-2 mb-0.5 sm:mb-1">
              Gas Composition (%)
            </h4>
            <div className="grid grid-cols-3 gap-1 sm:gap-2">
              <div>
                <label
                  htmlFor="maxMethane"
                  className="block text-[10px] sm:text-xs font-medium text-gray-700"
                >
                  CH4
                </label>
                <input
                  type="number"
                  id="maxMethane"
                  name="methane"
                  value={maxFormData.methane}
                  onChange={handleMaxChange}
                  className="mt-0.5 sm:mt-1 w-full px-1 sm:px-2 py-0.5 sm:py-1 text-xs sm:text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                  placeholder="0-100"
                  min="0"
                  max="100"
                  step="0.001"
                />
              </div>
              <div>
                <label
                  htmlFor="maxCarbonDioxide"
                  className="block text-[10px] sm:text-xs font-medium text-gray-700"
                >
                  CO2
                </label>
                <input
                  type="number"
                  id="maxCarbonDioxide"
                  name="carbonDioxide"
                  value={maxFormData.carbonDioxide}
                  onChange={handleMaxChange}
                  className="mt-0.5 sm:mt-1 w-full px-1 sm:px-2 py-0.5 sm:py-1 text-xs sm:text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                  placeholder="0-100"
                  min="0"
                  max="100"
                  step="0.001"
                />
              </div>
              <div>
                <label
                  htmlFor="maxNitrogen"
                  className="block text-[10px] sm:text-xs font-medium text-gray-700"
                >
                  N2
                </label>
                <input
                  type="number"
                  id="maxNitrogen"
                  name="nitrogen"
                  value={maxFormData.nitrogen}
                  onChange={handleMaxChange}
                  className="mt-0.5 sm:mt-1 w-full px-1 sm:px-2 py-0.5 sm:py-1 text-xs sm:text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                  placeholder="0-100"
                  min="0"
                  max="100"
                  step="0.001"
                />
              </div>
              <div>
                <label
                  htmlFor="maxOxygen"
                  className="block text-[10px] sm:text-xs font-medium text-gray-700"
                >
                  O2
                </label>
                <input
                  type="number"
                  id="maxOxygen"
                  name="oxygen"
                  value={maxFormData.oxygen}
                  onChange={handleMaxChange}
                  className="mt-0.5 sm:mt-1 w-full px-1 sm:px-2 py-0.5 sm:py-1 text-xs sm:text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                  placeholder="0-100"
                  min="0"
                  max="100"
                  step="0.001"
                />
              </div>
              <div>
                <label
                  htmlFor="maxH2s"
                  className="block text-[10px] sm:text-xs font-medium text-gray-700"
                >
                  H2S
                </label>
                <input
                  type="number"
                  id="maxH2s"
                  name="h2s"
                  value={maxFormData.h2s}
                  onChange={handleMaxChange}
                  className="mt-0.5 sm:mt-1 w-full px-1 sm:px-2 py-0.5 sm:py-1 text-xs sm:text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                  placeholder="0-100"
                  min="0"
                  max="100"
                  step="0.001"
                />
              </div>
              <div>
                <label
                  htmlFor="maxWater"
                  className="block text-[10px] sm:text-xs font-medium text-gray-700"
                >
                  H2O
                </label>
                <input
                  type="number"
                  id="maxWater"
                  name="water"
                  value={maxFormData.water}
                  onChange={handleMaxChange}
                  className="mt-0.5 sm:mt-1 w-full px-1 sm:px-2 py-0.5 sm:py-1 text-xs sm:text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                  placeholder="0-100"
                  min="0"
                  max="100"
                  step="0.001"
                />
              </div>
            </div>
          </div>


        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="mt-2 sm:mt-4 w-full md:w-2/6 bg-green-500 text-white py-1 px-4 rounded-md hover:bg-green-600 transition-colors text-xs sm:text-sm"
        >
          Calculate
        </button>
      </form>
    </div>
  );
}