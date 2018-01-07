

module.exports =  {
    scheduledTasks : [
        {
          id : "Task_2",
          command : "echo Task_2 >> /Users/waiyan/Workspace/NodeProject/kts/test",
          from: "01:00:00",
          to: "06:59:00",
          interval : "000003"
        },
        {
          id : "Task_3",
          command : "echo Task_3 >> /Users/waiyan/Workspace/NodeProject/kts/test",
          from: "01:00:00",
          to: "06:59:00",
          interval : "000003"
        },
    ],
    eventTasks : [
        {
          id : "EventTask_1",
          fileDependency : '/app/kdts/',
          command : 'cp -rp /app/kdts/* /app/kdts_scf/'
        },
        {
          id : "EventTask_2",
          dependency: 'EventTask_1',
          command : 'echo "execute EventTask_2 after EventTask_1" >> /Users/waiyan/Workspace/NodeProject/kts/test'
        },
        {
          id : "EventTask_3",
          dependency: 'EventTask_1',
          command : 'echo "execute EventTask_3 after EventTask_1" >> /Users/waiyan/Workspace/NodeProject/kts/test'
        }
    ]
  }

