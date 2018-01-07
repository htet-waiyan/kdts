const EventEmitter = require('events')
const childProcess = require('child_process')

class TaskHandler extends EventEmitter {
  execute(){
    this.on('TimeForTask', task => {
        if(task.pre){
          console.log("Executing Pre-Task of "+taskId);
          task.pre();
        }

        childProcess.spawn(task.command);

        if(post){
          console.log("Executing Post-Task of "+taskId);
          post();
        }
    })
  }
}
