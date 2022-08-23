export default class TechnicalInstallation {
    constructor(jsonTechnicalInstallation, inspectionId, newid) {
        if (jsonTechnicalInstallation)
            Object.assign(this, jsonTechnicalInstallation);
        this.inspectionId = inspectionId;
        if (newid)
            this.id = newid
    }
}