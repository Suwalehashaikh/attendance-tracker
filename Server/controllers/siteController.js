import {
  createSite,
  getSites,
  getSiteById,
  updateSite,
  deleteSite,
} from "../services/siteService.js";

export const addSite = async (req, res) => {
  try {
    const site = await createSite(req.body);

    res.status(201).json({
      success: true,
      message: "Site created successfully",
      site,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllSites = async (req, res) => {
  try {
    const sites = await getSites();

    res.status(200).json({
      success: true,
      count: sites.length,
      sites,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getSite = async (req, res) => {
  try {
    const site = await getSiteById(req.params.id);

    if (!site) {
      return res.status(404).json({
        success: false,
        message: "Site not found",
      });
    }

    res.status(200).json({
      success: true,
      site,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const editSite = async (req, res) => {
  try {
    const site = await updateSite(req.params.id, req.body);

    if (!site) {
      return res.status(404).json({
        success: false,
        message: "Site not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Site updated successfully",
      site,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const removeSite = async (req, res) => {
  try {
    const site = await deleteSite(req.params.id);

    if (!site) {
      return res.status(404).json({
        success: false,
        message: "Site not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Site deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};