import Site from "../models/Site.js";

export const createSite = async (siteData) => {
  const count = await Site.countDocuments();

  const siteCode = `SITE-${String(count + 1).padStart(3, "0")}`;

  const site = await Site.create({
    siteCode,
    ...siteData,
  });

  return site;
};

export const getSites = async () => {
  return await Site.find().sort({ createdAt: -1 });
};

export const getSiteById = async (id) => {
  return await Site.findById(id);
};

export const updateSite = async (id, siteData) => {
  return await Site.findByIdAndUpdate(id, siteData, {
    new: true,
    runValidators: true,
  });
};

export const deleteSite = async (id) => {
  return await Site.findByIdAndDelete(id);
};