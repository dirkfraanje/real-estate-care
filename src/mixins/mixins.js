export default {
    methods:{
        noActionDefinedMessage(message){
            alert('No action yet defined for '+ message)
          }
    },
    data(){
        return{
            damageType:['Willfully', 'Wear', 'Violence', 'Normal usage', 'Calamity', 'Other']
        }
    }
}