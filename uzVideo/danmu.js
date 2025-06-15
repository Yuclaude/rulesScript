//@name:弹幕扩展
//@version:3
//@remark:
//@order: A02
// ignore
import {} from '../../core/uz3lib.js'
import {} from '../../core/uzUtils.js'
// ignore

const appConfig = {
    _uzTag: '',
    /**
     * 扩展标识，初次加载时，uz 会自动赋值，请勿修改
     * 用于读取环境变量
     */
    get uzTag() {
        return this._uzTag
    },
    set uzTag(value) {
        this._uzTag = value
    },
}

class DanMu {
    constructor() {
        /**
         * 弹幕内容
         * @type {string}
         */
        this.content = ''

        /**
         * 弹幕出现时间 单位秒
         * @type {number}
         */
        this.time = 0
    }
}

class BackData {
    constructor() {
        /**
         * 弹幕数据
         * @type {DanMu[]}
         */
        this.data = []
        /**
         * 错误信息
         * @type {string}
         */
        this.error = ''
    }
}

/**
 * 搜索弹幕
 * @param {Object} item - 包含搜索参数的对象
 * @param {string} item.name - 动画或影片的名称
 * @param {number} item.episode - 动画或影片的集数
 * @param {boolean} item.isMovie - 是否是电影
 * @returns {Promise<BackData>} backData - 返回一个 Promise 对象
 */
async function searchDanMu(item) {
    let backData = new BackData()
    let ddpList = []
    try {
        let all = []
        //MARK: - 实现你的弹幕搜索逻辑
        ddpList = await searchByDocker(item)

        all = all.concat(ddpList)
        backData.data = all
    } catch (error) {
        backData.error = error.toString()
    }
    if (backData.data.length == 0) {
        backData.error = '未找到弹幕:'
    }
    return formatBackData(backData)
}

async function searchByDocker(item) {
    let list = []
    try {
	    let title = item.name
	    let episode = item.episode
	    //let movie = item.isMovie ? True : False
	    var danmuResult = await req(
			`https://zrctyhdlcrvo.ap-northeast-1.clawcloudrun.com/danmu/get?type=uz&title=${title}&episode_number=${episode}&movie=${item.isMovie}`
		)
	    const dmdata =danmuResult.data
	    let dmnum = dmdata.length
	    //const danmuku = dmdata.danmuku
	    //list = dmnum
	    for (
		let index = 0;
                index < dmnum;
                index++
             ) {
                let element = dmdata[index]
                let danMu = new DanMu()
                danMu.content = element[1]
                danMu.time = element[0]
                list.push(danMu)
              }
    } catch (error) {}
    return list
}
