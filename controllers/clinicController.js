const searchService = require("../services/searchService");

/**
 * GET Clinic records
 */
exports.getClinics = async (req, res) => {
  try {
    const data = await searchService.searchClinics(req.query);
    const successResponse = {
      success: true,
      message: "Retrieved all clinics data",
      data,
    };
    res.json(successResponse);
  } catch (error) {
    const errorResponse = { success: false, message: error };
    res.json(errorResponse);
  }
};
