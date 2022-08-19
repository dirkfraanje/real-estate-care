export default {
    methods:{
        noActionDefinedMessage(message){
            alert('No action yet defined for '+ message)
          },
          photoSelected(event) {
            if (!event) return;
            const reader = new FileReader();
            reader.readAsDataURL(event);
            reader.onload = () => {
              const imgElement = document.createElement("img");
              imgElement.src = reader.result;
      
              imgElement.onload = (e) => {
                const canvas = document.createElement("canvas");
                const MAX = 300;
                const scale = MAX / e.target.width;
                canvas.width = MAX;
                canvas.height = e.target.height * scale;
      
                const ctx = canvas.getContext("2d");
                ctx.drawImage(e.target, 0, 0, canvas.width, canvas.height);
                this.photo = ctx.canvas.toDataURL(e.target.result);
              };
            };
          },
    },
    data(){
        return{
            damageType:['Willfully', 'Wear', 'Violence', 'Normal usage', 'Calamity', 'Other']
        }
    }
}