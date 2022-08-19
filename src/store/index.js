import Vue from 'vue';
import Vuex from 'vuex';
import Inspection from './Classes/Inspection';
import Damage from './Classes/Damage'
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
            fetch("https://62f2244025d9e8a2e7d7b732.mockapi.io/inspections/" + payload.id, requestOptions)
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
        fetchInspections(context) {
            fetch("https://62f2244025d9e8a2e7d7b732.mockapi.io/inspections")
                .then((res) => res.json())
                .then((data) => {
                    this.state.all_inspections = data.map(
                        inspection => new Inspection(inspection)
                    ).sort(
                        (inspection1, inspection2) => inspection1.inspection.deadlineDate() - inspection2.inspection.deadlineDate()
                    );
                    context.dispatch('setExecutedAndAssigned')
                })
                .catch((err) => alert(err.message));

        },
        setExecutedAndAssigned(context){
            let assignedInspections = this.state.all_inspections.filter(inspection => inspection.inspection.execution_date.length === 0)
            let executedInspections = this.state.all_inspections.filter(inspection => inspection.inspection.execution_date.length > 0)
            context.commit('SET_EXECUTED_INSPECTIONS', executedInspections)
            context.commit('SET_ASSIGNED_INSPECTIONS', assignedInspections)
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
        async changeInspectionDetails(context, data) {
            let inspectionId = data[0];
            let inspection = this.state.all_inspections.find(inspection => inspection.id === inspectionId)
            if (inspection === undefined)
                return false;

            inspection.inspection.location.street = data[1];
            inspection.inspection.location.number = data[2];
            inspection.inspection.location.number_addition = data[3];
            inspection.inspection.location.zip_code = data[4];
            inspection.inspection.location.city = data[5];
            inspection.inspection.execution_date = data[6];
            await context.commit('UPDATE_INSPECTION', inspection);
            
            context.dispatch('setExecutedAndAssigned')
            return true;
        },
        changeDamageDetails(context, data) {
            let inspectionId = data[0];
            let inspection = this.state.all_inspections.find(inspection => inspection.id === inspectionId)
            if (inspection === undefined)
                return false;
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

            localStorage.setItem(`damagephoto-${inspectionId}-${damage.id}`, data[8])
            context.commit('UPDATE_INSPECTION', inspection);
            return true;
        },
        deleteDamage(context, data) {
            let inspection = this.state.executed_inspections.find(inspection => inspection.id === data[0])
            if (inspection === undefined)
                return false;
            let damage = inspection.damages.find(damage => damage.id === data[1]);
            if (damage === undefined)
                return false;
            inspection.damages.splice(inspection.damages.indexOf(damage), 1)
            context.commit('UPDATE_INSPECTION', inspection)
        }
    }
})