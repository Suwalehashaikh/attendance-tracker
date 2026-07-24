import {
  getDashboardStats,
  getSupervisorDashboard,
} from "../services/dashboardService.js";

export const dashboard = async (req, res) => {
  try {
    // Supervisor Dashboard
    if (req.user.role === "supervisor") {
      const stats = await getSupervisorDashboard(
        req.user.id
      );

      return res.status(200).json({
        success: true,
        role: "supervisor",
        stats,
      });
    }

    // Admin Dashboard
    const stats = await getDashboardStats();

    res.status(200).json({
      success: true,
      role: "admin",
      stats,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};