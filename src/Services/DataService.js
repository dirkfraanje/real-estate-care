const InspectionStore = {
    data: {
        executed_inspections: [],
        assigned_inspections: []
    },
    methods: {
        fetchExecutedInspections() {
            //Fetch executed inspections
            fetch("http://localhost:3000/executed_inspections")
                .then((res) => res.json())
                .then((data) => {
                    InspectionStore.data.executed_inspections = data.map(
                        inspection => new Inspection(inspection)
                    );
                    InspectionStore.data.executed_inspections.sort(
                        (inspection1, inspection2) => inspection1.details.deadlineDate() - inspection2.details.deadlineDate()
                    );
                })
                .catch((err) => alert(err.message));
        },
        fetchAssignedInspections() {
            //Fetch assigned inspections
            fetch("http://localhost:3000/assigned_inspections")
                .then((res) => res.json())
                .then((data) => {
                    InspectionStore.data.assigned_inspections = data.map(
                        inspection => new Inspection(inspection)
                    );
                    InspectionStore.data.assigned_inspections.sort(
                        (inspection1, inspection2) => inspection1.details.deadlineDate() - inspection2.details.deadlineDate()
                    );
                })
                .catch((err) => alert(err.message));
        },
    }
}


export default InspectionStore;

class Inspection {
    constructor(jsonInspection) {
        //Details
        this.details = new InspectionDetails(jsonInspection.inspection);
        //Location details
        this.location = new Location(jsonInspection.inspection.location);
        //Damages
        this.damages = jsonInspection.damages.map(
            damage => new Damage(damage)
        );
        //Defered maintenance
        this.deferedMaintenance = jsonInspection.deferred_maintenance.map(
            maintenance => new DeferedMaintenance(maintenance)
        );
        //Technical installations
        this.technicalInstallations = jsonInspection.technical_installations.map(
            installation => new TechnicalInstallation(installation)
        );
        //Already documented modifications
        this.documentedModifications = jsonInspection.modifications.already_documented_modifications.map(
            modification => new Modification(modification)
        );
        //Newly inventoried modifications during inspection
        this.inventoriedModifications = jsonInspection.modifications.newly_inventoried_modifications_during_inspection.map(
            modification => new Modification(modification)
        );
    }
}

class Damage {
    constructor(jsonDamage) {
        Object.assign(this, jsonDamage);
    }
}

class DeferedMaintenance {
    constructor(jsonDamage) {
        Object.assign(this, jsonDamage);
    }
}

class TechnicalInstallation {
    constructor(jsonDamage) {
        Object.assign(this, jsonDamage);
    }
}

class Modification {
    constructor(jsonDamage) {
        Object.assign(this, jsonDamage);
    }
}

class InspectionDetails {
    constructor(jsonInspectionDetails) {
        Object.assign(this, jsonInspectionDetails);
    }

    exectued() {
        this.execution_date !== null;
    }
    deadlineDate() {
        return new Date(this.deadline_date);
    }
    executionDate() {
        if (this.execution_date.length !== 0)
            return new Date(this.execution_date);
    }
    formattedDeadlineDate() {
        return `${this.deadlineDate().getDate()}-${this.deadlineDate().getMonth() + 1}-${this.deadlineDate().getFullYear()}`;
    }
    formattedExecutionDate() {
        if (this.executionDate() !== undefined)
            return `${this.executionDate().getDate()}-${this.executionDate().getMonth() + 1}-${this.executionDate().getFullYear()}`;
    }
}

class Location {
    constructor(jsonLocation) {
        Object.assign(this, jsonLocation);
    }
}
