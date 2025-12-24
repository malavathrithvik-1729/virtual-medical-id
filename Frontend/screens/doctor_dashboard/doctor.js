function openPatient(vmid, name) {
  localStorage.setItem("selectedPatientVMID", vmid);
  localStorage.setItem("selectedPatientName", name);
  window.location.href = "patient_history.html";
}
document.addEventListener("DOMContentLoaded", () => {
  const vmid = localStorage.getItem("selectedPatientVMID");
  const name = localStorage.getItem("selectedPatientName");

  if (vmid && document.getElementById("patientVMID")) {
    document.getElementById("patientName").innerText = name;
    document.getElementById("patientVMID").innerText = "VMED ID: " + vmid;

    document.getElementById("aiSummary").innerText =
      "Patient shows stable condition with no critical alerts.";

    document.getElementById("visitList").innerHTML = `
      <tr>
        <td>10 Feb 2025</td>
        <td>OPD</td>
        <td>Fever</td>
        <td>
          <button class="action-btn"
            onclick="openVisit('VISIT001')">
            View
          </button>
        </td>
      </tr>
    `;
  }
});

function openVisit(visitId) {
  localStorage.setItem("selectedVisit", visitId);
  window.location.href = "visit_detail.html";
}
document.addEventListener("DOMContentLoaded", () => {
  const vmid = localStorage.getItem("selectedPatientVMID");
  const name = localStorage.getItem("selectedPatientName");

  if (vmid && document.getElementById("patientVMID")) {
    document.getElementById("patientName").innerText = name;
    document.getElementById("patientVMID").innerText = "VMED ID: " + vmid;

    document.getElementById("aiSummary").innerText =
      "Patient shows stable condition with no critical alerts.";

    document.getElementById("visitList").innerHTML = `
      <tr>
        <td>10 Feb 2025</td>
        <td>OPD</td>
        <td>Fever</td>
        <td>
          <button class="action-btn"
            onclick="openVisit('VISIT001')">
            View
          </button>
        </td>
      </tr>
    `;
  }
});

function openVisit(visitId) {
  localStorage.setItem("selectedVisit", visitId);
  window.location.href = "visit_detail.html";
}
