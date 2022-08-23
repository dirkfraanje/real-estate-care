export default class DeferedMaintenance {
    constructor(jsonDeferedMaintenance, inspectionId, newid) {
        if (jsonDeferedMaintenance)
            Object.assign(this, jsonDeferedMaintenance);
        this.inspectionId = inspectionId;
        if (newid)
            this.id = newid
    }
}