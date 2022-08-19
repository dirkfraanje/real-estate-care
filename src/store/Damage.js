export default class Damage {
    constructor(jsonDamage, inspectionId, newid) {
        if (jsonDamage)
            Object.assign(this, jsonDamage);
        this.inspectionId = inspectionId;
        if (newid)
            this.id = newid
    }
}