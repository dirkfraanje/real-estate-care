export default class Modification {
    constructor(jsonModification, inspectionId, newid) {
        if (jsonModification)
            Object.assign(this, jsonModification);
        this.inspectionId = inspectionId;
        if (newid)
            this.id = newid
    }
}

