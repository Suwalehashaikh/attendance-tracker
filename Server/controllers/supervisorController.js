import {
  getSupervisorWorkers,
  getSupervisorLeaves,
  supervisorLeaveAction,
} from "../services/supervisorService.js";

// ================= Leave List =================

export const supervisorLeaves = async (req, res) => {
  try {
    const leaves = await getSupervisorLeaves(req.user.id);

    res.status(200).json({
      success: true,
      count: leaves.length,
      leaves,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= Approve / Reject =================

export const approveRejectSupervisorLeave = async (
  req,
  res
) => {
  try {
    const leave = await supervisorLeaveAction(
      req.user.id,
      req.params.id,
      req.body.status,
      req.body.adminRemark
    );

    res.status(200).json({
      success: true,
      message: `Leave ${leave.status} successfully`,
      leave,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};;

export const supervisorWorkers = async (req, res) => {
  try {
    const workers = await getSupervisorWorkers(req.user.id);

    res.status(200).json({
      success: true,
      count: workers.length,
      workers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};