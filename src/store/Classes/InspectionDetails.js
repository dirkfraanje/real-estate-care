export default class InspectionDetails {
    constructor(jsonInspectionDetails) {
        Object.assign(this, jsonInspectionDetails);
    }
    deadlineDate() {
        return new Date(this.deadline_date);
    }
    executionDate() {
        if (this.execution_date.length !== 0)
            return new Date(this.execution_date);
    }
    formattedDeadlineDate() {
        return `${this.deadlineDate().getFullYear()}-${this.deadlineDate().getMonth() + 1}-${this.deadlineDate().getDate()}`;
    }
    formattedExecutionDate() {
        if (this.executionDate() !== undefined)
            return `${this.executionDate().getFullYear()}-${this.executionDate().getMonth() + 1}-${this.executionDate().getDate()}`;
    }
}