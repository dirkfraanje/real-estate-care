import Vue from 'vue';
import Vuex from 'vuex';
import Inspection from './Classes/Inspection';
import Damage from './Classes/Damage'
import Maintenance from './Classes/DeferedMaintenance'
import TechnicalInstallation from './Classes/TechnicalInstallation';
import Modification from './Classes/Modification';

import Notification from './Classes/Notification';

Vue.use(Vuex);
export default new Vuex.Store({
    state: {
        isAuthenticated: false,
        executed_inspections: [],
        assigned_inspections: [],
        all_inspections: [],
        executed_count: 0,
        assigned_count: 0,
        notifications: [],
        showMainSnackbar: false,
        mainSnackbarText: '',
        snackbarcolor: 'accent'
    },
    mutations: {
        SHOW_SNACKBAR(state, payload) {
            state.showMainSnackbar = true;
            state.mainSnackbarText = payload[0]
            state.snackbarcolor = payload[1]
        },
        HIDE_SNACKBAR(state) {
            state.showMainSnackbar = false;
        },
        SET_ALL_INSPECTIONS(state, payload) {
            localStorage.setItem('offline_all_inspections', JSON.stringify(payload))
            state.all_inspections = payload;
        },
        SET_ALL_INSPECTIONS_OFFLINE(state) {
            if (localStorage.offline_all_inspections !== undefined)
                state.all_inspections = JSON.parse(localStorage.offline_all_inspections)
        },
        SET_EXECUTED_INSPECTIONS(state, payload) {
            state.executed_inspections = payload;
            state.executed_count = state.executed_inspections.length;
        },
        SET_ASSIGNED_INSPECTIONS(state, payload) {
            state.assigned_inspections = payload;
            state.assigned_count = state.assigned_inspections.length;
        },
        SET_NOTIFICATIONS(state, payload) {
            localStorage.setItem('offline_notifications', JSON.stringify(payload));
            state.notifications = payload;
        },
        SET_OFFLINE_NOTIFICATIONS(state) {
            if (localStorage.offline_notifications !== undefined)
                state.notifications = JSON.parse(localStorage.offline_notifications);
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
            fetch("https://62f2244025d9e8a2e7d7b732.mockapi.io/inspections/" + payload.id, requestOptions)
                .then(res => {
                    if (!res.ok) {
                        res.json().then((data) => {
                            this.dispatch('showSnackbarFailed', [data, 6000])
                        })
                    }
                    else {
                        this.dispatch('showSnackbarSucces', 'Update inspection succeeded');
                        this.dispatch('setExecutedAndAssigned')
                    }
                })
                //In the prototype, when offline, CRUD operations are not available
                .catch(() => this.dispatch('showSnackbarFailed', ['In the prototype, when you are offline, you can only view data', 6000]))
        }
    },
    actions: {
        authenticate(context) {
            //For prototype only
            context.commit('SET_AUTHENTICATION')
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
                //If the notifications cannot be fetched we set them from the localstorage
                .catch(() => context.commit('SET_OFFLINE_NOTIFICATIONS'));

        },
        //Fetch executed inspections
        fetchInspections(context) {
            fetch("https://62f2244025d9e8a2e7d7b732.mockapi.io/inspections")
                .then((res) => res.json())
                .then((data) => {
                    context.commit('SET_ALL_INSPECTIONS', data.map(
                        inspection => new Inspection(inspection)
                    ).sort(
                        (inspection1, inspection2) => inspection1.inspection.deadlineDate() - inspection2.inspection.deadlineDate()
                    ));
                    context.dispatch('setExecutedAndAssigned')
                })
                //If the inspections cannot be fetched we set them from the localstorage
                .catch(() => {
                    context.commit('SET_ALL_INSPECTIONS_OFFLINE')
                    context.dispatch('setExecutedAndAssigned')
                });

        },
        setExecutedAndAssigned(context) {
            let assignedInspections = this.state.all_inspections.filter(inspection => inspection.inspection.execution_date.length === 0)
            let executedInspections = this.state.all_inspections.filter(inspection => inspection.inspection.execution_date.length > 0)
            context.commit('SET_EXECUTED_INSPECTIONS', executedInspections)
            context.commit('SET_ASSIGNED_INSPECTIONS', assignedInspections)
        },

        dismissNotification(context, notification) {
            //Reload notifications
            this.state.notifications.splice(this.state.notifications.indexOf(notification), 1)
        },

        //Change actions
        changeInspectionDetails(context, data) {
            let inspectionId = data[0];
            let inspection = this.state.all_inspections.find(inspection => inspection.id === inspectionId)

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
            let inspection = this.state.all_inspections.find(inspection => inspection.id === inspectionId)

            let damage = inspection.damages.find(damage => damage.id === data[1])
            if (damage === undefined) {
                //If the damage is not found then this is a new damage
                damage = new Damage(null, inspectionId, `${inspection.damages.length !== 0 ? Math.max(...inspection.damages.map(o => o.id)) + 1 : 1}`)
                inspection.damages.push(damage);
            }

            damage.location = data[2]
            damage.description = data[3];
            damage.new_damage = data[4];
            damage.type_of_damage = data[5];
            damage.acute_action_required = data[6];
            damage.date = data[7];
            if (data[8] !== null)
                localStorage.setItem(`damagephoto-${inspectionId}-${damage.id}`, data[8])
            context.commit('UPDATE_INSPECTION', inspection);
        },
        changeMaintenanceDetails(context, data) {
            let inspectionId = data[0];
            let inspection = this.state.all_inspections.find(inspection => inspection.id === inspectionId)
            let maintenance = inspection.deferred_maintenance.find(maintenance => maintenance.id === data[1])

            if (maintenance === undefined) {
                //If the maintenance is not found then this is a new maintenance
                maintenance = new Maintenance(null, inspectionId, `${inspection.deferred_maintenance.length !== 0 ? Math.max(...inspection.deferred_maintenance.map(o => o.id)) + 1 : 1}`)
                inspection.deferred_maintenance.push(maintenance);
            }

            maintenance.location = data[2]
            maintenance.description = data[3];
            maintenance.type_of_maintenance = data[4];
            maintenance.cost_indication = data[5]
            maintenance.acute_action_required = data[6];
            if (data[7] !== null)
                localStorage.setItem(`maintenancephoto-${inspectionId}-${maintenance.id}`, data[7])
            context.commit('UPDATE_INSPECTION', inspection);
        },
        changeInstallationDetails(context, data) {
            let inspectionId = data[0];
            let inspection = this.state.all_inspections.find(inspection => inspection.id === inspectionId)
            let installation = inspection.technical_installations.find(installation => installation.id === data[1])

            if (installation === undefined) {
                //If the installation is not found then this is a new installation
                installation = new TechnicalInstallation(null, inspectionId, `${inspection.technical_installations.length !== 0 ? Math.max(...inspection.technical_installations.map(o => o.id)) + 1 : 1}`)
                inspection.technical_installations.push(installation);
            }

            installation.location = data[2]
            installation.installation_type = data[3]
            installation.reported_malfunctions = data[4]
            installation.test_procedure = data[5]
            installation.approved = data[6]
            installation.remarks = data[7]
            if (data[8] !== null)
                localStorage.setItem(`installationphoto-${inspectionId}-${installation.id}`, data[8])
            context.commit('UPDATE_INSPECTION', inspection);
        },
        changeModificationDetails(context, data) {
            let inspectionId = data[0];
            let inspection = this.state.all_inspections.find(inspection => inspection.id === inspectionId)
            let modification = inspection.modifications.find(modification => modification.id === data[1])

            if (modification === undefined) {
                //If the installation is not found then this is a new installation
                modification = new Modification(null, inspectionId, `${inspection.modifications.length !== 0 ? Math.max(...inspection.modifications.map(o => o.id)) + 1 : 1}`)
                inspection.modifications.push(modification);
            }

            modification.location = data[2]
            modification.performed_by = data[3]
            modification.description = data[4]
            modification.action_to_take = data[5]
            modification.remarks = data[6]
            if (data[7] !== null)
                localStorage.setItem(`modificationphoto-${inspectionId}-${modification.id}`, data[7])
            context.commit('UPDATE_INSPECTION', inspection);
        },
        //Delete actions
        deleteDamage(context, data) {
            let inspection = this.state.executed_inspections.find(inspection => inspection.id === data[0])

            let damage = inspection.damages.find(damage => damage.id === data[1]);
            if (damage === undefined)
                return false;
            inspection.damages.splice(inspection.damages.indexOf(damage), 1)
            context.commit('UPDATE_INSPECTION', inspection)
            localStorage.removeItem(`damagephoto-${inspection.id}-${damage.id}`)
        },
        deleteMaintenance(context, data) {
            let inspection = this.state.executed_inspections.find(inspection => inspection.id === data[0])
            let maintenance = inspection.deferred_maintenance.find(maintenance => maintenance.id === data[1]);
            if (maintenance === undefined)
                return false;
            inspection.deferred_maintenance.splice(inspection.deferred_maintenance.indexOf(maintenance), 1)
            context.commit('UPDATE_INSPECTION', inspection)
            localStorage.removeItem(`maintenancephoto-${inspection.id}-${maintenance.id}`)
        },
        deleteTechnicalInstallation(context, data) {
            let inspection = this.state.executed_inspections.find(inspection => inspection.id === data[0])
            let installation = inspection.technical_installations.find(installation => installation.id === data[1]);
            if (installation === undefined)
                return false;
            inspection.technical_installations.splice(inspection.technical_installations.indexOf(installation), 1)
            context.commit('UPDATE_INSPECTION', inspection)
            localStorage.removeItem(`installationphoto-${inspection.id}-${installation.id}`)
        },
        deleteModification(context, data) {
            let inspection = this.state.executed_inspections.find(inspection => inspection.id === data[0])
            let modification = inspection.modifications.find(modification => modification.id === data[1]);
            if (modification === undefined)
                return false;
            inspection.modifications.splice(inspection.modifications.indexOf(modification), 1)
            context.commit('UPDATE_INSPECTION', inspection)
            localStorage.removeItem(`modificationphoto-${inspection.id}-${modification.id}`)
        },
        //Snackbar actions
        showSnackbarSucces(context, data = 'Success') {
            context.commit('SHOW_SNACKBAR', [data, 'accent']);
            setTimeout(() => {
                context.commit('HIDE_SNACKBAR')
            }, 2000);
        },
        showSnackbarFailed(context, data = ['Failed', 2000]) {
            context.commit('SHOW_SNACKBAR', [data[0], 'orange accent-4']);
            setTimeout(() => {
                context.commit('HIDE_SNACKBAR')
            }, data[1]);
        },
        closeSnackbar(context) {
            context.commit('HIDE_SNACKBAR')
        }
    }
})