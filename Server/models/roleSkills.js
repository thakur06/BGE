const mongoose = require('mongoose');

const roleSkillsSchema = new mongoose.Schema({
    dept:{
type:String,
required:true,
unique:true
    },
    role: {
        type: [String],
        required: true,
        enum: [
          'Head of the Department',
          'Overall Project Engineer Lead',
          'Design Engineer',
          'Supervisor/Checker',
          'Senior Engineer',
          'Drafts Person'
        ]
      },
  skills: {
    softSkills: {
      verbalCommunication: {
        type: [Number],
        required: true,
        min: 1,
        max: 5
      },
      emailCommunication: {
        type: [Number],
        required: true,
        min: 1,
        max: 5
      },
      businessEtiquetteAndProfessionalism: {
        type: [Number],
        required: true,
        min: 1,
        max: 5
      },
      presentationSkills: {
        type: [Number],
        required: true,
        min: 1,
        max: 5
      }
    },
    technicalSkills: {
      asmeB313Piping: { type: [Number], required: true, min: 1, max: 5 },
      asmeB1634ValvesFlangedThreaded: { type: [Number], required: true, min: 1, max: 5 },
      asmeB165PipeFlangesFittings: { type: [Number], required: true, min: 1, max: 5 },
      asmeB169FactoryMadeWrought: { type: [Number], required: true, min: 1, max: 5 },
      asmeB361019WeldedSeamlessWrought: { type: [Number], required: true, min: 1, max: 5 },
      asmeB1610FaceToFace: { type: [Number], required: true, min: 1, max: 5 },
      asmeB1201EndConnectionsThreadedValve: { type: [Number], required: true, min: 1, max: 5 },
      api594StdForCheckValve: { type: [Number], required: true, min: 1, max: 5 },
      api598ValveInspectionTesting: { type: [Number], required: true, min: 1, max: 5 },
      api602StdForGateValve: { type: [Number], required: true, min: 1, max: 5 },
      api609StdForButterflyValve: { type: [Number], required: true, min: 1, max: 5 },
      pipeThicknessCalculation: { type: [Number], required: true, min: 1, max: 5 },
      flareToxSafetyZoneCalculation: { type: [Number], required: true, min: 1, max: 5 },
      pipingMaterialSpecification: { type: [Number], required: true, min: 1, max: 5 },
      skidConceptItsRequirement: { type: [Number], required: true, min: 1, max: 5 },
      skidWeightCalculation: { type: [Number], required: true, min: 1, max: 5 },
      truckDetailMovementRequirement: { type: [Number], required: true, min: 1, max: 5 },
      plotPlanEquipmentLayoutPreparation: { type: [Number], required: true, min: 1, max: 5 },
      areaClassificationLayout: { type: [Number], required: true, min: 1, max: 5 },
      equipmentDetailsRequirement: { type: [Number], required: true, min: 1, max: 5 },
      undergroundPipingLayoutRequirementDetailing: { type: [Number], required: true, min: 1, max: 5 },
      pipeSupports: { type: [Number], required: true, min: 1, max: 5 }
    },
    softwareSkills: {
      autoCAD2D: { type: [Number], required: true, min: 1, max: 5 },
      autoCAD3D: { type: [Number], required: true, min: 1, max: 5 },
      database: { type: [Number], required: true, min: 1, max: 5 },
      autoCADPId: { type: [Number], required: true, min: 1, max: 5 }
    },
    crossFunctionalSkills: {
      process: { type: [Number], required: true, min: 1, max: 5 },
      electrical: { type: [Number], required: true, min: 1, max: 5 },
      instrumentationControlSystems: { type: [Number], required: true, min: 1, max: 5 }
    }
  }
});

module.exports = mongoose.model('RoleSkills', roleSkillsSchema);