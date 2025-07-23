let pos1: Position = null
let pos2: Position = null
let origin: Position = null
let clipboard: string[][][] = []
let sizeX = 0
let sizeY = 0
let sizeZ = 0

namespace NikoriEdit {

    export function say( {
        player.say("いやっほ")
    }

    //% block="位置1を設定"
    //% blockNamespace="NikoriEdit"
    export function setPos1() {
        pos1 = player.position()
        player.say("位置1を設定しました: " + pos1.toString())
    }

    //% block="位置2を設定"
    //% blockNamespace="NikoriEdit"
    export function setPos2() {
        pos2 = player.position()
        player.say("位置2を設定しました: " + pos2.toString())
    }

    //% block="貼り付け起点を設定"
    //% blockNamespace="NikoriEdit"
    export function setOrigin() {
        origin = player.position()
        player.say("貼り付け起点を設定しました: " + origin.toString())
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
        fillBlocks(block)
    }

    //% block="範囲をコピー"
    //% blockNamespace="NikoriEdit"
    export function copy() {
        if (pos1 && pos2) {
            clipboard = []
            sizeX = Math.abs(pos2.getValue(Axis.X) - pos1.getValue(Axis.X)) + 1
            sizeY = Math.abs(pos2.getValue(Axis.Y) - pos1.getValue(Axis.Y)) + 1
            sizeZ = Math.abs(pos2.getValue(Axis.Z) - pos1.getValue(Axis.Z)) + 1

            for (let x = 0; x < sizeX; x++) {
                clipboard[x] = []
                for (let y = 0; y < sizeY; y++) {
                    clipboard[x][y] = []
                    for (let z = 0; z < sizeZ; z++) {
                        let pos = positions.add(pos1, x, y, z)
                        let blockName = blocks.block(pos).toString()
                        clipboard[x][y][z] = blockName
                    }
                }
            }
            player.say("コピー完了")
        }
    }

    //% block="コピーした範囲を貼り付け"
    //% blockNamespace="NikoriEdit"
    export function paste() {
        if (clipboard.length === 0 || origin == null) {
            player.say("貼り付けできません。")
            return
        }

        for (let x = 0; x < sizeX; x++) {
            for (let y = 0; y < sizeY; y++) {
                for (let z = 0; z < sizeZ; z++) {
                    let blockName = clipboard[x][y][z]
                    blocks.place(blockName, positions.add(origin, x, y, z))
                }
            }
        }
        player.say("貼り付け完了")
    }
}
