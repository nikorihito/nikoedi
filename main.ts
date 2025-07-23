let pos1: Position = null
let pos2: Position = null

/**
 * 柱を作成します。エージェントの足元のブロックを使用して、指定された高さで柱を作ります。
 */
//% block="柱を作成 | 高さ: %height"
//% group="ニコリエディット"
//% height.defl=5
//% blockId=make_pillar
//% weight=100
export function makePillar(height: number): void {
    blocks.fill(
        agent.inspect(AgentInspection.Block, DOWN),
        player.position(),
        positions.add(player.position(), pos(0, height, 0)),
        FillOperation.Replace
    )
    player.say(blocks.nameOfBlock(agent.inspect(AgentInspection.Block, DOWN)) + "で柱を作成しました")
}

/**
 * 現在のプレイヤーの位置を位置1として記録します。
 */
//% block="位置1を記録"
//% group="ニコリエディット"
//% blockId=set_pos1
//% weight=95
export function setPos1(): void {
    pos1 = player.position()
    player.say("位置1を設定しました")
}

/**
 * 現在のプレイヤーの位置を位置2として記録します。
 */
//% block="位置2を記録"
//% group="ニコリエディット"
//% blockId=set_pos2
//% weight=94
export function setPos2(): void {
    pos2 = player.position()
    player.say("位置2を設定しました")
}

/**
 * 位置1と位置2で囲まれた範囲を、エージェントの足元のブロックで埋めます。
 */
//% block="範囲を埋める"
//% group="ニコリエディット"
//% blockId=fill_area
//% weight=90
export function fillArea(): void {
    if (pos1 && pos2) {
        blocks.fill(
            agent.inspect(AgentInspection.Block, DOWN),
            pos1,
            pos2,
            FillOperation.Replace
        )
        player.say(blocks.nameOfBlock(agent.inspect(AgentInspection.Block, DOWN)) + "で埋めました")
    }
}

/**
 * 位置1と位置2で囲まれた構造物を保存します。
 */
//% block="構造を保存"
//% group="ニコリエディット"
//% blockId=save_structure
//% weight=80
export function saveStructure(): void {
    blocks.saveStructure("copy_structure", pos1, pos2)
}

/**
 * 直前に保存された構造物を現在のプレイヤーの位置に貼り付けます。
 */
//% block="構造を貼り付け"
//% group="ニコリエディット"
//% blockId=paste_structure
//% weight=70
export function pasteStructure(): void {
    blocks.loadStructure("copy_structure", player.position())
}

/**
 * エージェントをプレイヤーの位置にテレポートさせます。
 */
//% block="エージェントをプレイヤーにテレポート"
//% group="ニコリエディット"
//% blockId=tp_agent
//% weight=60
export function teleportAgent(): void {
    agent.teleportToPlayer()
}
