
const fileUtil = require('../plugins/file.util')

module.exports =  {
    scheduledTasks : [
        {
          id : "Task_2",
          command : "touch /app/out/task_2_file",
          from: "00:00:00",
          to: "23:59:00",
          interval : "000003"
        },
        {
          id : "Task_3",
          command : "echo Task_3 >> /Users/waiyan/Workspace/NodeProject/kts/test",
          from: "00:00:00",
          to: "06:59:00",
          interval : "000010"
        },
    ],
    eventTasks : [
        {
          id : "EventTask_1",
          fileDependency : '/app/kdts/',
          command : 'cp -rp /app/kdts/* /app/kdts_scf/'
        },
        {
          id : "CRCTRFILEARP",
          dependency: 'Task_2',
          command : 'echo "Execute CRCTRFILEARP after Task_2" >> /Users/waiyan/Workspace/NodeProject/kts/test'
        },
        {
          id : "EventTask_2",
          dependency : 'Task_3',
          command : 'echo "Execute EventTask_2 after Task_3" >> /Users/waiyan/Workspace/NodeProject/kts/test'
        }
    ]
  }

