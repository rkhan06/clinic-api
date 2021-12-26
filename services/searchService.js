const axios = require("axios");
const stateCodesHelper = require("../helpers/stateCodesHelper");

const filterResults = (data, query, clinicType) => {
  let filteredData = data;
  // dental and vet clinic records have different key names for states and opening times
  const stateKeyName = clinicType === "vet" ? "stateCode" : "stateName";
  const availabilityKeyName = clinicType === "vet" ? "opening" : "availability";
  const ClinicName = clinicType === "vet" ? "clinicName" : "name";

  if (query.state) {
    // get statename to search in dental records when statecode is given
    let state =
      query.state.length === 2 && clinicType === "dental"
        ? stateCodesHelper.getStateName(query.state)
        : query.state;
    // get statecode when statename is given for vet clinic records
    state =
      state.length > 2 && clinicType === "vet"
        ? stateCodesHelper.getStateCode(state)
        : state;
    filteredData = filteredData.filter(
      (clinic) => clinic[stateKeyName].toLowerCase() === state.toLowerCase()
    );
  }
  if (query.name) {
    filteredData = filteredData.filter(
      (clinic) => clinic[ClinicName].toLowerCase() === query.name.toLowerCase()
    );
  }
  if (query.from) {
    filteredData = filteredData.filter(
      (clinic) =>
        clinic[availabilityKeyName].from.toLowerCase() ===
        query.from.toLowerCase()
    );
  }
  if (query.to) {
    filteredData = filteredData.filter(
      (clinic) =>
        clinic[availabilityKeyName].to.toLowerCase() === query.to.toLowerCase()
    );
  }
  return filteredData;
};

// return filtered results for dental clinics
const getFilteredDentalClinicsData = async (query) => {
  try {
    const response = await axios.get(
      "https://storage.googleapis.com/scratchpay-code-challenge/dental-clinics.json"
    );
    return filterResults(response.data, query, "dental");
  } catch (error) {
    throw error.message;
  }
};

// return filtered results for vet clinics
const getFilteredVetClinicsData = async (query) => {
  try {
    const response = await axios.get(
      "https://storage.googleapis.com/scratchpay-code-challenge/vet-clinics.json"
    );
    return filterResults(response.data, query, "vet");
  } catch (error) {
    throw error.message;
  }
};

exports.searchClinics = async (query) => {
  const dentalClinics = await getFilteredDentalClinicsData(query);
  const vetClinics = await getFilteredVetClinicsData(query);
  return { dentalClinics, vetClinics };
};
