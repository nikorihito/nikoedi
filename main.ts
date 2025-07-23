let pos1: Position = null
let pos2: Position = null
player.onChat("pillar", function (num1) {
    blocks.fill(
    agent.inspect(AgentInspection.Block, DOWN),
    player.position(),
    positions.add(
    player.position(),
    pos(0, num1, 0)
    ),
    FillOperation.Replace
    )
    player.say("" + blocks.nameOfBlock(agent.inspect(AgentInspection.Block, DOWN)) + "で柱を作成しました")
})
player.onChat("pos1", function () {
    pos1 = player.position()
    player.say("位置1を設定しました")
})
player.onChat("copy", function () {
    let num1 = 0
    blocks.saveStructure(
    "copy_structure",
    pos1,
    pos2
    )
})
player.onChat("pos2", function () {
    pos2 = player.position()
    player.say("位置2を設定しました")
})
player.onChat("fill", function () {
    if (pos1 && pos2) {
        blocks.fill(
        agent.inspect(AgentInspection.Block, DOWN),
        pos1,
        pos2,
        FillOperation.Replace
        )
        player.say("" + blocks.nameOfBlock(agent.inspect(AgentInspection.Block, DOWN)) + "で埋めました")
    }
})
player.onChat("tp_agent", function () {
    agent.teleportToPlayer()
})
player.onChat("paste", function () {
    blocks.loadStructure(
    "copy_structure",
    player.position()
    )
})
