import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
export default new Vuex.Store({
    state: {
        isAuthenticated: false,
        executed_inspections: [],
        assigned_inspections: [],
        executed_count: 0,
        assigned_count: 0,
        notifications: []
    },
    mutations: {
        SET_EXECUTED_INSPECTIONS(state, payload) {
            state.executed_inspections = payload;
            state.executed_count = state.executed_inspections.length;
        },
        SET_ASSIGNED_INSPECTIONS(state, payload) {
            state.assigned_inspections = payload;
            state.assigned_count = state.assigned_inspections.length;
        },
        SET_NOTIFICATIONS(state, payload) {
            state.notifications = payload;
        },
        SET_AUTHENTICATION(state) {
            //For this prototype we just check for demo/password
            state.isAuthenticated =
                localStorage.getItem('username') === 'demo' &&
                localStorage.getItem('password') === 'password'
        },
        UPDATE_INSPECTION(state, payload) {

            const requestOptions = {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            };
            fetch("https://62f2244025d9e8a2e7d7b732.mockapi.io/executed_inspections/" + payload.id, requestOptions)
                .then(res => {
                    if (!res.ok)
                        res.json().then((data) => alert('Inspection could not be updated: ' + data))
                })
                .catch((err) => alert(err.message))
        }
    },
    actions: {
        authenticate(context) {
            //For prototype only 
            context.commit('SET_AUTHENTICATION')
        },
        //Fetch executed inspections
        fetchExecutedInspections(context) {
            fetch("https://62f2244025d9e8a2e7d7b732.mockapi.io/executed_inspections")
                .then((res) => res.json())
                .then((data) => {
                    context.commit('SET_EXECUTED_INSPECTIONS', data.map(
                        inspection => new Inspection(inspection)
                    ).sort(
                        (inspection1, inspection2) => inspection1.inspection.deadlineDate() - inspection2.inspection.deadlineDate()
                    ))
                })
                .catch((err) => alert(err.message));

        },
        fetchAssignedInspections(context) {
            //Fetch assigned inspections
            fetch("https://62f2244025d9e8a2e7d7b732.mockapi.io/assigned_inspections")
                .then((res) => res.json())
                .then((data) => {
                    context.commit('SET_ASSIGNED_INSPECTIONS', data.map(
                        inspection => new Inspection(inspection)
                    ).sort(
                        (inspection1, inspection2) => inspection1.inspection.deadlineDate() - inspection2.inspection.deadlineDate()
                    ))
                })
                .catch((err) => alert(err.message));
        },
        fetchNotifications(context) {
            //Fetch notifications for inspector
            fetch("https://62f2244025d9e8a2e7d7b732.mockapi.io/notifications")
                .then((res) => res.json())
                .then((data) => {
                    context.commit('SET_NOTIFICATIONS', data.map(
                        notification => new Notification(notification)
                    ))
                })
                .catch((error) => alert(error.message));
        },
        dismissNotification(context, notification) {
            //Reload notifications
            this.state.notifications.splice(this.state.notifications.indexOf(notification), 1)
        },
        changeInspectionDetails(context, data) {
            let inspectionId = data[0];
            let inspection = this.state.executed_inspections.find(inspection => inspection.id === inspectionId)
            if (inspection === undefined) 
                return false;
            
            inspection.inspection.location.street = data[1];
            inspection.inspection.location.number = data[2];
            inspection.inspection.location.number_addition = data[3];
            inspection.inspection.location.zip_code = data[4];
            inspection.inspection.location.city = data[5];
            inspection.inspection.execution_date = data[6];
            context.commit('UPDATE_INSPECTION', inspection);
            return true;
        },
        changeDamageDetails(context, data) {
            let inspectionId = data[0];
            let inspection = this.state.executed_inspections.find(inspection => inspection.id === inspectionId)
            if (inspection === undefined) 
                return false;
            let damage = inspection.damages.find(damage => damage.id === data[1])
            if (damage === undefined)
                return false;
                
            damage.location = data[2]
            damage.description = data[3];
            damage.new_damage = data[4];
            damage.type_of_damage = data[5];
            damage.acute_action_required = data[6];
            damage.date = data[7];
            localStorage.setItem(`damagephoto-${inspectionId}-${damage.id}`, data[8])
            context.commit('UPDATE_INSPECTION', inspection);
            return true;
        }
    }
})

class Inspection {
    constructor(jsonInspection) {
        this.id = jsonInspection.id;
        //Details
        this.inspection = new InspectionDetails(jsonInspection.inspection);
        //Location details
        this.inspection.location = new Location(jsonInspection.inspection.location);
        //Damages
        this.damages = jsonInspection.damages.map(
            damage => new Damage(damage, this.id)
        );
        //Defered maintenance
        this.deferred_maintenance = jsonInspection.deferred_maintenance.map(
            maintenance => new DeferedMaintenance(maintenance)
        );
        //Technical installations
        this.technical_installations = jsonInspection.technical_installations.map(
            installation => new TechnicalInstallation(installation)
        );
        //Already documented modifications
        this.already_documented_modifications = jsonInspection.already_documented_modifications.map(
            modification => new Modification(modification)
        );
        //Newly inventoried modifications during inspection
        this.newly_inventoried_modifications_during_inspection = jsonInspection.newly_inventoried_modifications_during_inspection.map(
            modification => new Modification(modification)
        );
    }
}

class Notification {
    constructor(jsonNotification) {
        Object.assign(this, jsonNotification);
    }
}

class Damage {
    constructor(jsonDamage, inspectionId) {
        Object.assign(this, jsonDamage);
        this.inspectionId = inspectionId;
    }
}

class DeferedMaintenance {
    constructor(jsonDeferedMaintenance) {
        Object.assign(this, jsonDeferedMaintenance);
    }
}

class TechnicalInstallation {
    constructor(jsonTechnicalInstallation) {
        Object.assign(this, jsonTechnicalInstallation);
    }
}

class Modification {
    constructor(jsonModification) {
        Object.assign(this, jsonModification);
    }
}

class InspectionDetails {
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

class Location {
    constructor(jsonLocation) {
        Object.assign(this, jsonLocation);
    }
}