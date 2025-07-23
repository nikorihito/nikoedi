let pos1: Position = null
let pos2: Position = null
let origin: Position = null
let clipboard: string[][][] = []
let sizeX = 0
let sizeY = 0
let sizeZ = 0

namespace NikoriEdit {

    //% block="位置1を設定"
    //% blockNamespace="NikoriEdit"
    export function setPos1() {
        pos1 = player.position()
        player.say("位置1を設定しました: " + pos1)
    }

    //% block="位置2を設定"
    //% blockNamespace="NikoriEdit"
    export function setPos2() {
        pos2 = player.position()
        player.say("位置2を設定しました: " + pos2)
    }

    //% block="貼り付け起点を設定"
    //% blockNamespace="NikoriEdit"
    export function setOrigin() {
        origin = player.position()
        player.say("貼り付け基準位置を設定しました: " + origin)
    }

    //% block="範囲を $blockName ブロックで埋める"
    //% blockNamespace="NikoriEdit"
    export function fillBlocks(blockName: string) {
        if (pos1 && pos2) {
            blocks.fill(blockName, pos1, pos2, FillOperation.Replace)
        }
    }

    //% block="範囲を空気でクリア"
    //% blockNamespace="NikoriEdit"
    export function clear() {
        fillBlocks("air")
    }

    //% block="範囲の $fromBlock を $toBlock に置き換え"
    //% blockNamespace="NikoriEdit"
    export function replaceBlocks(fromBlock: string, toBlock: string) {
        if (pos1 && pos2) {
            blocks.replace(fromBlock, toBlock, pos1, pos2)
        }
    }

    //% block="範囲に壁だけ $block を設置"
    //% blockNamespace="NikoriEdit"
    export function walls(block: string) {
        if (pos1 && pos2) {
            blocks.fill(block, pos1, pos2, FillOperation.Outline)
            blocks.fill("air", pos1, pos2, FillOperation.Hollow)
        }
    }

    //% block="範囲に枠線として $block を設置"
    //% blockNamespace="NikoriEdit"
    export function outline(block: string) {
        if (pos1 && pos2) {
            blocks.fill(block, pos1, pos2, FillOperation.Outline)
        }
    }

    //% block="範囲に中空の $block ブロックを設置"
    //% blockNamespace="NikoriEdit"
    export function hollow(block: string) {
        if (pos1 && pos2) {
            blocks.fill(block, pos1, pos2, FillOperation.Hollow)
        }
    }

    //% block="範囲に $block で箱を設置"
    //% blockNamespace="NikoriEdit"
    export function box(block: string) {
        if (pos1 && pos2) {
            blocks.fill(block, pos1, pos2, FillOperation.Replace)
        }
    }

    //% block="範囲をコピー"
    //% blockNamespace="NikoriEdit"
    export function copy() {
        if (pos1 && pos2) {
            const p1 = pos1
            const p2 = pos2
            clipboard = []
            for (let x = 0; x <= Math.abs(p2.getValue(Axis.X) - p1.getValue(Axis.X)); x++) {
                clipboard[x] = []
                for (let y = 0; y <= Math.abs(p2.getValue(Axis.Y) - p1.getValue(Axis.Y)); y++) {
                    clipboard[x][y] = []
                    for (let z = 0; z <= Math.abs(p2.getValue(Axis.Z) - p1.getValue(Axis.Z)); z++) {
                        const pos = positions.add(p1, x, y, z)
                        const block = blocks.testForBlock("air", pos) ? "air" : blocks.block(pos).toString()
                        clipboard[x][y][z] = block
                    }
                }
            }
            sizeX = clipboard.length
            sizeY = clipboard[0].length
            sizeZ = clipboard[0][0].length
            player.say("コピー完了")
        }
    }

    //% block="コピーした範囲を貼り付け"
    //% blockNamespace="NikoriEdit"
    export function paste() {
        if (!origin || clipboard.length === 0) return

        for (let x = 0; x < sizeX; x++) {
            for (let y = 0; y < sizeY; y++) {
                for (let z = 0; z < sizeZ; z++) {
                    const blockName = clipboard[x][y][z]
                    if (blockName !== "air") {
                        blocks.place(blockName, positions.add(origin, x, y, z))
                    }
                }
            }
        }
        player.say("貼り付け完了")
    }
}
