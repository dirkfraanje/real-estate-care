export default class InspectionDetails {
    constructor(jsonInspectionDetails) {
        Object.assign(this, jsonInspectionDetails);
    }
    deadlineDate() {
        return new Date(this.deadline_date);
    }
}